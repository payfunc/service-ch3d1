import * as authly from "authly"
import * as gracely from "gracely"
import * as isoly from "isoly"
import * as model from "@payfunc/model"
import * as api from "./api"
import * as card from "@cardfunc/model"

async function check(
	key: authly.Token,
	merchant: model.Merchant.Key.KeyInfo,
	token: authly.Token
): Promise<api.check.Response | api.check.Error | gracely.Error> {
	return !merchant.card ? gracely.client.unauthorized() : api.check.post({ url: merchant.card.url, key }, {}, token)
}

async function enrolled(
	key: authly.Token,
	merchant: model.Merchant.Key.KeyInfo,
	request: api.enrolled.Request,
	token: authly.Token
): Promise<api.enrolled.Response | gracely.Error> {
	return !merchant.card
		? gracely.client.unauthorized()
		: api.enrolled.post({ url: merchant.card.url, key }, request, token)
}

export class Verifier extends model.PaymentVerifier {
	public constructor() {
		super()
	}

	public async verify(
		key: authly.Token,
		request: model.PaymentVerifier.Request,
		force?: boolean
	): Promise<model.PaymentVerifier.Response> {
		let result: model.PaymentVerifier.Response | gracely.Error
		const merchant =
			(await model.Merchant.Key.KeyInfo.unpack(key, "public")) ??
			(await model.Merchant.Key.KeyInfo.unpack(key, "private"))
		if (!merchant)
			result = gracely.client.unauthorized()
		else {
			let token: authly.Token | gracely.Error | undefined =
				request.payment.type == "account"
					? request.payment.token
					: request.payment.type == "card"
					? request.payment.account ?? request.payment.card ?? request.payment.reference
					: undefined
			if (!token)
				result = gracely.client.malformedContent(
					"request.payment.card | request.payment.account",
					"model.Card.Token | model.Account.",
					"not a card or account token"
				)
			else {
				const method =
					request.payment.type == "card" && request.payment.account
						? await model.Account.Method.Card.Creatable.verify(request.payment.account)
						: undefined
				if (method)
					token = method.card ?? method.reference
				if ((await card.Card.Token.verify(token))?.type == "single use" || (await card.Account.verify(token)))
					token = await accountToCardToken(key, merchant as model.Merchant.Key.KeyInfo, token)
				if (gracely.Error.is(token))
					result = token
				else {
					const cardToken = await card.Card.Token.verify(token)
					if (!cardToken)
						result = gracely.client.malformedContent(
							"request.payment.card | request.payment.account",
							"model.Card.Token | model.Account.",
							"not a card or account token"
						)
					else {
						if (!force) {
							// check
							if (!cardToken.verification || cardToken.verification.type != "pares")
								result = model.PaymentVerifier.Response.unverified()
							else {
								const checkResponse = await check(key, merchant, token)
								if (gracely.Error.is(checkResponse))
									result = checkResponse
								else if (!api.check.Error.is(checkResponse) && api.check.Response.is(checkResponse)) {
									const verifyResponse = api.check.Response.verify(checkResponse)
									result = gracely.Error.is(verifyResponse) ? verifyResponse : model.PaymentVerifier.Response.verified()
								} else
									result = gracely.server.backendFailure("Unexpected answer from cardfunc")
							}
						} else {
							// enrolled
							const currency =
								request.payment.type == "card" ? request.payment.currency ?? merchant.currency ?? "EUR" : "EUR"
							const decimals = isoly.Currency.decimalDigits(currency) || 0
							const amount = Math.round(
								model.Item.amount(
									request.payment.type == "card" ? request.payment.amount ?? request.items : request.items
								) *
									10 ** decimals
							)
							const enrolledRequest: api.enrolled.Request = {
								amount: amount.toString(),
								currency,
								order_id: api.enrolled.Request.orderIdLimit(
									(request.reference.number ?? request.reference.id ?? "0").toString()
								),
								cardholder_ip: request.client.ip ?? "",
							}
							const enrolledResponse = await enrolled(key, merchant, enrolledRequest, token)
							result = gracely.Error.is(enrolledResponse)
								? enrolledResponse
								: api.enrolled.Response.isOk(enrolledResponse)
								? model.PaymentVerifier.Response.verificationRequired(true, "GET", enrolledResponse.acs_url, {
										pareq: enrolledResponse.pareq,
								  })
								: gracely.server.backendFailure(
										typeof enrolledResponse.error == "object"
											? enrolledResponse.error?.message ?? enrolledResponse.error?.detail
											: undefined
								  )
						}
					}
				}
			}
		}
		return !gracely.Error.is(result) ? result : model.PaymentVerifier.Response.error(result)
	}
}

export async function accountToCardToken(
	key: authly.Token,
	merchant: model.Merchant.Key.KeyInfo,
	previous: authly.Token
): Promise<authly.Token | gracely.Error> {
	let result: authly.Token | gracely.Error
	if (!merchant.card)
		result = gracely.client.unauthorized()
	else if (!card.Card.Token.verify(previous) && !card.Account.verify(previous))
		result = gracely.client.invalidContent(
			"token",
			"authly.Token",
			'Need a valid card token or an old account token to sign a new "recurring" card Token.'
		)
	else {
		const accountTokenResponse = await fetch(merchant.card.url + "/card/" + previous + "/account", {
			method: "GET",
			headers: { authorization: `Bearer ${key}`, "content-type": "application/json; charset=utf-8" },
		})
		let accountTokenResponseBody
		switch (accountTokenResponse.headers.get("content-type")) {
			case "application/jwt; charset=utf-8":
				result = await accountTokenResponse.text()
				break
			case "application/json; charset=utf-8":
				accountTokenResponseBody = await accountTokenResponse.json()
				result = gracely.Error.is(accountTokenResponseBody)
					? accountTokenResponseBody
					: gracely.client.invalidContent("token", "authly.Token")
				break
			default:
				result = gracely.server.backendFailure("Unexpected answer from CardFunc.")
				break
		}
	}
	return result
}

export { api, check, enrolled }
