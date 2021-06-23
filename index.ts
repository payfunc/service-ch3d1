import * as gracely from "gracely"
import * as authly from "authly"
import * as model from "@payfunc/model"
import * as api from "./api"

async function check(
	key: authly.Token,
	merchant: model.Key,
	token: authly.Token
): Promise<api.check.Response | api.check.Error | gracely.Error> {
	return !merchant.card ? gracely.client.unauthorized() : api.check.post({ url: merchant.card.url, key }, {}, token)
}

async function enrolled(
	key: authly.Token,
	merchant: model.Key,
	request: api.enrolled.Request,
	token: authly.Token
): Promise<api.enrolled.Response | gracely.Error> {
	return !merchant.card
		? gracely.client.unauthorized()
		: api.enrolled.post({ url: merchant.card.url, key }, request, token)
}

export { api, check, enrolled }
