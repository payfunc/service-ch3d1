import * as gracely from "gracely"
import * as authly from "authly"
import * as card from "@payfunc/model-card"
import { Configuration } from "../Configuration"
import { post as genericPost } from "../post"
import { Error as checkError } from "./Error"
import { Request as checkRequest } from "./Request"
import { Response as checkResponse } from "./Response"

export namespace check {
	export async function post(
		configuration: Configuration,
		request: Request,
		token: authly.Token
	): Promise<Response | Error | gracely.Error> {
		const path = (await card.Card.Token.verify(token)) ? `card/ch3d1/${token}/` : `card/${token}/ch3d1/`
		return genericPost(configuration, `${path}check`, request)
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
