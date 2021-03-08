import * as gracely from "gracely"
import * as authly from "authly"
import * as card from "@payfunc/model-card"
import { Configuration } from "../Configuration"
import { post as genericPost } from "../post"
import { Request as enrolledRequest } from "./Request"
import { Response as enrolledResponse } from "./Response"

export namespace enrolled {
	export async function post(
		configuration: Configuration,
		request: Request,
		token: authly.Token
	): Promise<Response | gracely.Error> {
		const path = (await card.Card.Token.verify(token)) ? `card/ch3d1/${token}/` : `card/${token}/ch3d1/`
		return genericPost(configuration, `${path}enrolled`, request)
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
