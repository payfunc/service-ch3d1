import * as isoly from "isoly"

export interface Request {
	amount: string
	currency: isoly.Currency
	order_id: string
	cardholder_ip: string
	// Merchant and Card properties added in cardfunc
}

export namespace Request {
	export function orderIdLimit(data: string): string {
		return limit(data, 1, 20, "0")
	}
	export function is(value: Request | any): value is Request {
		return (
			typeof value == "object" &&
			typeof value.amount == "string" &&
			isoly.Currency.is(value.currency) &&
			typeof value.order_id == "string" &&
			typeof value.cardholder_ip == "string"
		)
	}
}

function limit(data: string, minimum: number, maximum: number, padding: string): string {
	return data.length < minimum
		? data.padStart(minimum, padding)
		: data.length > maximum
		? data.substr(data.length - 20, 20)
		: data
}
