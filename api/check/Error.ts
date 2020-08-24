import { Eci } from "../Eci"

export interface Error {
	error?:
		| {
				param?: string
				type?: string
				message?: string
		  }
		| any
}

export namespace Error {
	export function is(value: any | Error): value is Error {
		return typeof value != "object" || (typeof value == "object" && (value.eci == undefined || !Eci.is(value.eci))) // All responses that contains a value.eci property of Eci type can be handled, assume anything else is an error.
	}
}
