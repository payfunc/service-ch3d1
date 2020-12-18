import * as gracely from "gracely"
import * as authly from "authly"
import { post as cardfuncPost } from "../Cardfunc"
import { Configuration } from "../Configuration"
import { Request as enrolledRequest } from "./Request"
import { Response as enrolledResponse } from "./Response"

export namespace enrolled {
	export async function post(
		configuration: Configuration,
		request: Request,
		token: authly.Token
	): Promise<Response | gracely.Error> {
		return cardfuncPost(configuration, `card/${token}/ch3d1/enrolled`, request)
	}
	export type Request = enrolledRequest
	export namespace Request {
		export const orderIdLimit = enrolledRequest.orderIdLimit
		export const is = enrolledRequest.is
	}
	export type Response = enrolledResponse
	export namespace Response {
		export const is = enrolledResponse.is
		export const isOk = enrolledResponse.isOk
		export const error = enrolledResponse.error
	}
}
