import * as gracely from "gracely"
import * as isoly from "isoly"
import { Eci } from "../Eci"

export interface Response {
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
export namespace Response {
	export function is(value: Response | any): value is Response {
		return (
			typeof value == "object" &&
			typeof value.amount == "string" &&
			isoly.Currency.is(value.currency) &&
			typeof value.cavv == "string" &&
			typeof value.cavv_algorithm == "string" &&
			Eci.is(value.eci) &&
			typeof value.merchant_id == "string" &&
			typeof value.last4 == "string" &&
			value.last4.length == 4 &&
			(value.status == "Y" || value.status == "A" || value.status == "U" || value.status == "N") &&
			typeof value.xid == "string"
		)
	}
	export function verify(value: Response): gracely.Error | true {
		let result: gracely.Error | true
		switch (value.eci) {
			case "2": // Authenticated
			case "5": // Authenticated
			case "6": // Attempt: Don't generate an error now.
			case "1": // Attempt: Don't generate an error now.
				result = true
				break
			case "0": // Authentication failed or error
			case "7": // Authentication failed, couldn't be performed or error
				result = gracely.client.malformedContent("pares", "string", "3D Secure Failed.")
				break
		}
		return result
	}
}
