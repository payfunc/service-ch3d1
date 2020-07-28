import * as authly from "authly"
import * as gracely from "gracely"
import { Request as enrolledRequest } from "./Request"
import { Response as enrolledResponse } from "./Response"
import { Configuration } from "../Configuration"
import { post as cardfuncPost } from "../Cardfunc"

export namespace enrolled {
	export async function post(configuration: Configuration, request: Request, token: authly.Token): Promise<Response | gracely.Error> {
		return cardfuncPost(configuration, `card/${ token }/ch3d1/enrolled`, request)
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
