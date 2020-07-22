import { default as fetch } from "node-fetch"
import formUrlEncoded from "form-urlencoded"
import * as gracely from "gracely"
import { Configuration } from "./Configuration"

export async function post<Request, Response>(configuration: Configuration, endpoint: string, request: Request): Promise<Response | gracely.Error> {
	const body = formUrlEncoded(request)
	const response = await fetch(configuration.url + "/" + endpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Basic ${ new Buffer(configuration.key + ":").toString("base64") }` }, body })
	if (!response.ok)
		console.log("service.ch3d1.api.post", configuration, endpoint, response.status, await response.text())
	return response.ok ? response.json() : gracely.server.backendFailure(response.headers.get("Content-Type")?.startsWith("application/json") ? await response.json() : await response.text())
}
