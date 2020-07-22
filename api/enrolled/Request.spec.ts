import { Request } from "./Request"

describe("service.ch3d1.api.enrolled.Request", () => {
	const request = {
		amount: "2050",
		currency: "EUR",
		order_id: "1234567890",
		card: {
			number: "4111111111111111",
			expire_month: "12",
			expire_year: "2020",
		},
		merchant: {
			id: "123456789012345",
			name: "Best Merchant Inc",
			acquirer_bin: "411111",
			country: "DK",
			url: "http://www.bestmerchantinc.com/",
		},
		cardholder_ip: "8.8.8.8",
	}
	it("is", () => expect(Request.is(request)).toBe(true))
})
