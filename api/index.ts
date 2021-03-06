import { check as apiCheck } from "./check"
import { Eci as apiEci } from "./Eci"
import { enrolled as apiEnrolled } from "./enrolled"

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
	export type Error = apiCheck.Error
	export namespace Error {
		export const is = apiCheck.Error.is
	}
}
export type Eci = apiEci
export namespace Eci {
	export const is = apiEci.is
}
export namespace enrolled {
	export const post = apiEnrolled.post
	export type Request = apiEnrolled.Request
	export namespace Request {
		export const orderIdLimit = apiEnrolled.Request.orderIdLimit
		export const is = apiEnrolled.Request.is
	}
	export type Response = apiEnrolled.Response
	export namespace Response {
		export const is = apiEnrolled.Response.is
		export const isOk = apiEnrolled.Response.isOk
		export const error = apiEnrolled.Response.error
	}
}
