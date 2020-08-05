import * as ch3d1 from "./index"

describe("service-ch3d1", () => {
	it("test accessibility", () => {
		ch3d1.api.Eci.is({})
		const checkFunctions = [ch3d1.check, ch3d1.api.check.Request.is, ch3d1.api.check.Response.verify, ch3d1.api.check.Response.is, ch3d1.api.check.Error.is]
		const enrolledFunctions = [ch3d1.enrolled, ch3d1.api.enrolled.Request.orderIdLimit, ch3d1.api.enrolled.Request.is, ch3d1.api.enrolled.Response.is, ch3d1.api.enrolled.Response.isOk, ch3d1.api.enrolled.Response.error]
	})
})
