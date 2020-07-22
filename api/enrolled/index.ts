import { Request as enrolledRequest } from "./Request"
import { Response as enrolledResponse } from "./Response"

export namespace enrolled {
	export type Request = enrolledRequest
	export namespace Request {
		export const is = enrolledRequest.is
	}
	export type Response = enrolledResponse
	export namespace Response {
		export const is = enrolledResponse.is
	}
}
