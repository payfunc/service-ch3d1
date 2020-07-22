import { Request } from "./Request"

describe("service.ch3d1.api.enrolled.Request", () => {
	const request = {
		amount: "2050",
		currency: "EUR",
		order_id: "1234567890",
		cardholder_ip: "8.8.8.8",
	}
	it("is", () => expect(Request.is(request)).toBe(true))
})
