import { Eci } from "../Eci"

export interface Response {
	acs_url?: string
	pareq?: string
	enrolled?: "Y" | "N"
	eci: Eci
	error?: {
		message?: string,
		detail?: string,
	}
}

// tslint:disable-next-line: no-namespace
export namespace Response {
	export function is(value: Response | any): value is Response {
		return typeof value == "object" &&
			(value.acs_url == undefined || typeof value.acs_url == "string") &&
			(value.pareq == undefined || typeof value.pareq == "string") &&
			(value.enrolled == undefined || value.enrolled == "Y" || value.enrolled == "N") &&
			Eci.is(value.eci) &&
			(value.error == undefined || typeof value.error == "object" &&
				(value.error.message == undefined || typeof value.error.message == "string") &&
				(value.error.detail == undefined || typeof value.error.detail == "string")
			)
	}
	export function isOk(value: Response | any): value is { acs_url: string, pareq: string } {
		return typeof value == "object" &&
			typeof value.acs_url == "string" && value.acs_url.length > 1 &&
			typeof value.pareq == "string"
	}
	export function error(value: Response | any): boolean {
		return typeof value == "object" &&
			value.acs_url == undefined || value.acs_url == "" ||
			value.pareq == undefined
	}
}
