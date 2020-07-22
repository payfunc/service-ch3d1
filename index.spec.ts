import * as ch3d1 from "./index"

describe("service-ch3d1", () => {
	it("test accessibility", () => {
		ch3d1.Eci.is({})
		const pareqFunctions = [ch3d1.Pareq.decode, ch3d1.Pareq.encode, ch3d1.Pareq.is]
		const paresFunctions = [ch3d1.Pares.decode, ch3d1.Pares.encode, ch3d1.Pares.is]
		const cardFunctions = [ch3d1.api.Card.from, ch3d1.api.Card.to, ch3d1.api.Card.is]
		ch3d1.api.Configuration.is({})
		const checkFunctions = [ch3d1.api.check.Request.is, ch3d1.api.check.Response.is, ch3d1.api.check.Response.verify, ch3d1.api.check.post]
		const enrolledFunctions = [ch3d1.api.enrolled.Request.is, ch3d1.api.enrolled.Response.is, ch3d1.api.enrolled.post]
	})
})
