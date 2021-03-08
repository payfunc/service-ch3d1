import * as gracely from "gracely"
import * as isoly from "isoly"
import * as authly from "authly"
import { Eci } from "../Eci"

export interface Response {
	amount: string | number
	currency: isoly.Currency
	cavv: string
	cavv_algorithm: string
	eci: Eci
	merchant_id: string
	last4: string
	status: "Y" | "A" | "U" | "N"
	xid: string
	payfunc?: { token?: authly.Token }
}
export namespace Response {
	export function is(value: Response | any): value is Response {
		return typeof value == "object" && Eci.is(value.eci) // Only important property
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
