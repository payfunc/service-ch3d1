import { Pares } from "./Pares"

describe("Pares sim encoding and decoding", () => {
	it("Pares", () => {
		const pares: Pares = {
			amount: "1337",
			currency: "SEK",
			cavv: "",
			cavv_algorithm: "test",
			eci: "1",
			merchant_id: "test",
			last4: "0000",
			status: "Y",
			xid: "test",
		}
		const encoded = Pares.encode(pares)
		expect(Pares.decode(encoded)).toEqual(pares)
	})
})
