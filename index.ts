import { Eci as apiEci } from "./Eci"
import { Pareq as apiPareq } from "./Pareq"
import { Pares as apiPares } from "./Pares"
import { Card as apiCard } from "./api/Card"
import { check as apiCheck } from "./api/check"
import { enrolled as apiEnrolled } from "./api/enrolled"
import { Configuration as apiConfiguration } from "./api/Configuration"

export namespace ch3d1 {
	export type Eci = apiEci
	export namespace Eci {
		export const is = apiEci.is
	}
	export type Pareq = apiPareq
	export namespace Pareq {
		export const is = apiPareq.is
		export const encode = apiPareq.encode
		export const decode = apiPareq.decode
	}
	export type Pares = apiPares
	export namespace Pares {
		export const is = apiPares.is
		export const encode = apiPares.encode
		export const decode = apiPares.decode
	}
	export namespace api {
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
	}
}
