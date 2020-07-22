import * as gracely from "gracely"
import { Request as checkRequest } from "./Request"
import { Response as checkResponse } from "./Response"
import { Configuration } from "../Configuration"
import * as connection from "../post"

export namespace check {
	export async function post(configuration: Configuration, request: Request): Promise<Response | gracely.Error> {
		return connection.post(configuration, "check", request)
	}
	export type Request = checkRequest
	export namespace Request {
		export const is = checkRequest.is
	}
	export type Response = checkResponse
	export namespace Response {
		export const is = checkResponse.is
		export const verify = checkResponse.verify
	}
}
