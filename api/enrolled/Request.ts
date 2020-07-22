import * as isoly from "isoly"

export interface Request {
	amount: string
	currency: isoly.Currency
	order_id: string
	cardholder_ip: string
	// Merchant and Card properties added in cardfunc
}

// tslint:disable-next-line: no-namespace
export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object" &&
			typeof value.amount == "string" &&
			isoly.Currency.is(value.currency) &&
			typeof value.order_id == "string" &&
			typeof value.cardholder_ip == "string"
	}
}
