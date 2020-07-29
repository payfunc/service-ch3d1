import * as authly from "authly"
import * as gracely from "gracely"
import * as model from "@payfunc/model"
import * as api from "./api"

async function check(key: authly.Token, merchant: model.Merchant.Key, token: authly.Token): Promise<api.check.Response | gracely.Error> {
	return (!merchant.card || merchant.card.emv3d?.protocol != "ch3d1") ? gracely.client.unauthorized() : api.check.post({ url: merchant.card.url, key }, {}, token)
}

async function enrolled(key: authly.Token, merchant: model.Merchant.Key, request: api.enrolled.Request, token: authly.Token): Promise<api.enrolled.Response | gracely.Error> {
	return (!merchant.card || merchant.card.emv3d?.protocol != "ch3d1") ? gracely.client.unauthorized() : api.enrolled.post({ url: merchant.card.url, key }, request, token)
}

export {
	api,
	check,
	enrolled,
}
