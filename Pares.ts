import * as isoly from "isoly"
import * as authly from "authly"
import { Eci } from "./Eci"

export interface Pares {
	amount: string
	currency: isoly.Currency
	cavv: string
	cavv_algorithm: string
	eci: Eci
	merchant_id: string
	last4: string
	status: "Y" | "A" | "U" | "N"
	xid: string
}
// tslint:disable-next-line: no-namespace
export namespace Pares {
	export function is(value: Pares | any): value is Pares {
		return typeof value == "object" &&
			typeof value.amount == "string" &&
			isoly.Currency.is(value.currency) &&
			typeof value.cavv == "string" &&
			typeof value.cavv_algorithm == "string" &&
			Eci.is(value.eci) &&
			typeof value.merchant_id == "string" &&
			typeof value.last4 == "string" && value.last4.length == 4 &&
			(value.status == "Y" || value.status == "A"  || value.status == "U" || value.status == "N") &&
			typeof value.xid == "string"
	}
	export function encode(pares: Pares): string {
		return authly.Base64.encode(JSON.stringify(pares), "url")
	}
	export function decode(encoded: string): Pares | undefined {
		const result = JSON.parse(new authly.TextDecoder().decode(authly.Base64.decode(encoded, "url")))
		return is(result) ? result : undefined
	}
}
