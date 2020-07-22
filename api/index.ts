import { Card as apiCard } from "./Card"
import { check as apiCheck } from "./check"
import { enrolled as apiEnrolled } from "./enrolled"
import { Configuration as apiConfiguration } from "./Configuration"

export type Configuration = apiConfiguration
export namespace Configuration {
	export const is = apiConfiguration.is
}
export type Card = apiCard
export namespace Card {
	export const is = apiCard.is
	export const from = apiCard.from
	export const to = apiCard.to
}
// tslint:disable-next-line: no-shadowed-variable
export namespace check {
	export const post = apiCheck.post
	export type Request = apiCheck.Request
	export namespace Request {
		export const is = apiCheck.Request.is
	}
	export type Response = apiCheck.Response
	export namespace Response {
		export const is = apiCheck.Response.is
		export const verify = apiCheck.Response.verify
	}
}
// tslint:disable-next-line: no-shadowed-variable
export namespace enrolled {
	export const post = apiEnrolled.post
	export type Request = apiEnrolled.Request
	export namespace Request {
		export const is = apiEnrolled.Request.is
	}
	export type Response = apiEnrolled.Response
	export namespace Response {
		export const is = apiEnrolled.Response.is
	}
}
