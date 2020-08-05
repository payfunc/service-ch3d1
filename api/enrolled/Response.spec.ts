import { Response } from "./Response"

describe("service.ch3d1.api.enrolled.Response", () => {
	it("is", () => {
		const realFailed = {
			acs_url: null,
			eci: '0',
			enrolled: null,
			error: {
				message: 'Acquirer not participating',
				detail: 'Acquirer not participating',
			},
			pareq: null,
		}
		expect(Response.is(realFailed)).toBeTruthy()
		expect(Response.error(realFailed)).toBeTruthy()
		const success =
		{
			acs_url: "www.example.com/example",
			eci: '2',
			enrolled: 'Y',
			error: null,
			pareq: "codecodecode",
		}
		expect(Response.is(success)).toBeTruthy()
		expect(Response.isOk(success)).toBeTruthy()
	})
})
