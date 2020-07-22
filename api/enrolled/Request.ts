import * as isoly from "isoly"

export interface Request {
	amount: string
	currency: isoly.Currency
	order_id: string
	card: {
		number: string,
		expire_month: string,
		expire_year: string,
	}
	merchant: {
		id: string,
		name: string,
		acquirer_bin: string,
		country: isoly.CountryCode.Alpha2,
		url: string,
	}
	cardholder_ip: string
}

// tslint:disable-next-line: no-namespace
export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object" &&
			typeof value.amount == "string" &&
			isoly.Currency.is(value.currency) &&
			typeof value.order_id == "string" &&
			typeof value.card == "object" &&
			typeof value.card.number == "string" &&
			typeof value.card.expire_month == "string" &&
			typeof value.card.expire_year == "string" &&
			typeof value.merchant == "object" &&
			typeof value.merchant.id == "string" &&
			typeof value.merchant.name == "string" &&
			typeof value.merchant.acquirer_bin == "string" &&
			isoly.CountryCode.Alpha2.is(value.merchant.country) &&
			typeof value.merchant.url == "string" &&
			typeof value.cardholder_ip == "string"
	}
}
