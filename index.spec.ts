import * as service from "./index"

describe("service-ch3d1", () => {
	it("test accessibility", () => {
		service.ch3d1.Eci.is({})
		const pareqFunctions = [service.ch3d1.Pareq.decode, service.ch3d1.Pareq.encode, service.ch3d1.Pareq.is]
		const paresFunctions = [service.ch3d1.Pares.decode, service.ch3d1.Pares.encode, service.ch3d1.Pares.is]
		const cardFunctions = [service.ch3d1.api.Card.from, service.ch3d1.api.Card.to, service.ch3d1.api.Card.is]
		service.ch3d1.api.Configuration.is({})
		const checkFunctions = [service.ch3d1.api.check.Request.is, service.ch3d1.api.check.Response.is, service.ch3d1.api.check.Response.verify, service.ch3d1.api.check.post]
		const enrolledFunctions = [service.ch3d1.api.enrolled.Request.is, service.ch3d1.api.enrolled.Response.is, service.ch3d1.api.enrolled.post]
	})
})
