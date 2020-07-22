import { Pareq } from "./Pareq"

describe("Pareq sim encoding and decoding", () => {
	it("Pareq", () => {
		const pareq: Pareq = {
			version: "0.0.1",
			cardType: "VISA",
			PAN: "4111111111111111",
			expiry: "02/2029",
			deviceCategory: "browser?",
			purchAmount: "1337",
			exponent: "2",
			currency: "SEK",
			merchantID: "test",
			xid: "test",
			okUrl: "www.example.com/ok",
			failUrl: "www.example.com/fail",
		}
		const encoded = Pareq.encode(pareq)
		expect(Pareq.decode(encoded)).toEqual(pareq)
	})
})
