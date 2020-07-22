import * as gracely from "gracely"

export type Response = gracely.Error | true

export namespace Response {
	export function is(value: Response | any): value is Response {
		return gracely.Error.is(value) || value == true
	}
}
