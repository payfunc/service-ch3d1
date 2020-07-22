import * as isoly from "isoly"
import * as authly from "authly"

// naming of properties according to standard
export interface Pareq {
	version: string
	cardType: string
	PAN: string
	expiry: string
	deviceCategory: string
	purchAmount: string
	exponent: string
	currency: isoly.Currency
	merchantID: string
	xid: string
	okUrl: string
	failUrl: string
}

// tslint:disable-next-line: no-namespace
export namespace Pareq {
	export function is(value: Pareq | any): value is Pareq {
		return typeof value == "object" &&
			typeof value.version == "string" &&
			typeof value.cardType == "string" &&
			typeof value.PAN == "string" &&
			typeof value.expiry == "string" &&
			typeof value.deviceCategory == "string" &&
			typeof value.purchAmount == "string" &&
			typeof value.exponent == "string" &&
			isoly.Currency.is(value.currency) &&
			typeof value.merchantID == "string" &&
			typeof value.xid == "string" &&
			typeof value.okUrl == "string" &&
			typeof value.failUrl == "string"
		}
	export function encode(pareq: Pareq): string {
		return authly.Base64.encode(JSON.stringify(pareq), "url")
	}
	export function decode(encoded: string): Pareq | undefined {
		const result = JSON.parse(new authly.TextDecoder().decode(authly.Base64.decode(encoded, "url")))
		return is(result) ? result : undefined
	}
}
