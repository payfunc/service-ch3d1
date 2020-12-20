import * as gracely from "gracely"
import * as authly from "authly"
import { post as cardfuncPost } from "../Cardfunc"
import { Configuration } from "../Configuration"
import { Error as checkError } from "./Error"
import { Request as checkRequest } from "./Request"
import { Response as checkResponse } from "./Response"

export namespace check {
	export async function post(
		configuration: Configuration,
		request: Request,
		token: authly.Token
	): Promise<Response | Error | gracely.Error> {
		return cardfuncPost(configuration, `card/${token}/ch3d1/check`, request)
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
	export type Error = checkError
	export namespace Error {
		export const is = checkError.is
	}
}
