import { default as fetch } from "node-fetch"
import * as authly from "authly"
import * as gracely from "gracely"
import * as isoly from "isoly"
import * as model from "@payfunc/model"
import * as api from "./api"
import * as card from "@cardfunc/model"

async function check(
	key: authly.Token,
	merchant: model.Key,
	token: authly.Token
): Promise<api.check.Response | api.check.Error | gracely.Error> {
	return !merchant.card ? gracely.client.unauthorized() : api.check.post({ url: merchant.card.url, key }, {}, token)
}

async function enrolled(
	key: authly.Token,
	merchant: model.Key,
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
		force?: boolean,
		logFunction?: (step: string, level: "trace" | "debug" | "warning" | "error" | "fatal", content: any) => void
	): Promise<model.PaymentVerifier.Response> {
		let result: model.PaymentVerifier.Response | gracely.Error
		const merchant = await model.Key.unpack(key, "public", "private")
		if (!merchant)
			result = gracely.client.unauthorized()
		else {
			const token: authly.Token | undefined =
				request.payment.type == "account"
					? request.payment.token
					: request.payment.type == "card"
					? request.payment.card
					: undefined
			const cardToken = token ? await card.Card.Token.verify(token) : undefined
			if (!token || !cardToken)
				result = gracely.client.malformedContent("request.payment.card", "model.Card.Token", "not a card token")
			else {
				if (!force) {
					const checkResponse = await check(key, merchant, token)
					if (logFunction)
						logFunction("ch3d1.check", "trace", { token, response: checkResponse })
					if (gracely.Error.is(checkResponse))
						result =
							checkResponse.type == "missing property" && (checkResponse as any).content?.property == "pares"
								? model.PaymentVerifier.Response.unverified()
								: checkResponse
					else if (!api.check.Error.is(checkResponse) && api.check.Response.is(checkResponse)) {
						const verifyResponse = api.check.Response.verify(checkResponse)
						result = gracely.Error.is(verifyResponse) ? verifyResponse : model.PaymentVerifier.Response.verified()
					} else
						result = gracely.server.backendFailure("Unexpected answer from cardfunc")
				} else {
					// enrolled
					const currency = request.currency
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
							(request.reference.number ?? request.reference.id ?? "0").toString().replace(/[^\x20-\x7E]/g, "") // Only visible ASCII characters allowed
						),
						cardholder_ip: request.client.ip ?? "",
					}
					const enrolledResponse = await enrolled(key, merchant, enrolledRequest, token)
					if (logFunction)
						logFunction("ch3d1.enrolled", "trace", {
							token,
							request: enrolledRequest,
							response: enrolledResponse,
						})
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
		return !gracely.Error.is(result) ? result : model.PaymentVerifier.Response.error(result)
	}
}

export { api, check, enrolled }
