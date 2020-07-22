import * as gracely from "gracely"
import { Request as checkRequest } from "./Request"
import { Response as checkResponse } from "./Response"

export namespace check {
	export type Request = checkRequest
	export namespace Request {
		export const is = checkRequest.is
	}
	export type Response = checkResponse
	export namespace Response {
		export const is = checkResponse.is
	}
}
