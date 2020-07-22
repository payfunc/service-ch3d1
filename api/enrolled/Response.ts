import { Eci } from "../Eci"

export interface Response {
	acs_url: string
	pareq: string
	enrolled: "Y" | "N"
	eci: Eci
}

// tslint:disable-next-line: no-namespace
export namespace Response {
	export function is(value: Response | any): value is Response {
		return typeof value == "object" &&
			typeof value.acs_url == "string" &&
			typeof value.pareq == "string" &&
			(value.enrolled == "Y" || value.enrolled == "N") &&
			Eci.is(value.eci)
	}
}
