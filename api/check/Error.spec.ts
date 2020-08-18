import * as gracely from "gracely"
import { Response } from "./Response"
import { Error } from "./Error"

describe("service.ch3d1.api.checked.Error", () => {
	it("is real errors", () => {
		const realFailed1 = {
			error: {
				param: "pares",
				type: "invalid_param",
				message: null,
			},
		}
		expect(Error.is(realFailed1)).toBeTruthy()
		const realFailed2 = {
			error: {
				param: "pares",
				type: "presence",
				message: null,
			},
		}
		expect(Error.is(realFailed2)).toBeTruthy()
	})
	it("isn't an error, but a failed check.", () => {
		const noErrorFailResult = {
			amount: "0",
			currency: "EUR",
			cavv: "",
			cavv_algorithm: "",
			eci: "0",
			merchant_id: "testtest",
			last4: "1111",
			status: "N",
			xid: "",
		}
		expect(!Error.is(noErrorFailResult)).toBeTruthy()
		expect(Response.is(noErrorFailResult)).toBeTruthy()
		expect(Response.is(noErrorFailResult) && gracely.Error.is(Response.verify(noErrorFailResult))).toBeTruthy()
	})
	it("isn't an error, with non-failing check.", () => {
		const simulationResult = {
			amount: "0",
			currency: "EUR",
			cavv: "",
			cavv_algorithm: "",
			eci: "2",
			merchant_id: "testtest",
			last4: "1111",
			status: "Y",
			xid: "",
		}
		expect(!Error.is(simulationResult)).toBeTruthy()
		expect(Response.is(simulationResult)).toBeTruthy()
		expect(Response.is(simulationResult) && !gracely.Error.is(Response.verify(simulationResult))).toBeTruthy()
	})
})
