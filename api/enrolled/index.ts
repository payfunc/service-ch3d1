import * as gracely from "gracely"
import { Request as enrolledRequest } from "./Request"
import { Response as enrolledResponse } from "./Response"
import { Configuration } from "../Configuration"
import * as connection from "../post"

export namespace enrolled {
	export async function post(configuration: Configuration, request: Request): Promise<Response | gracely.Error> {
		return connection.post(configuration, "enrolled", request)
	}
	export type Request = enrolledRequest
	export namespace Request {
		export const is = enrolledRequest.is
	}
	export type Response = enrolledResponse
	export namespace Response {
		export const is = enrolledResponse.is
	}
}
