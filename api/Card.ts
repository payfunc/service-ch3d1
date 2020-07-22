import * as model from "@cardfunc/model"

export interface Card {
	number: string
	expire_month: string
	expire_year: string
}

// tslint:disable-next-line: no-namespace
export namespace Card {
	export function is(value: any | Card): value is Card {
		return typeof value == "object" &&
			typeof value.number == "string" &&
			typeof value.expire_month == "string" &&
			typeof value.expire_year == "string"
	}
	export function from(card: model.Card.Creatable): Card {
		return {
			number: card.pan,
			expire_month: card.expires[0].toString().padStart(2, "0"),
			expire_year: (2000 + card.expires[1]).toString(),
		}
	}
	export function to(input: Card): model.Card.Creatable {
		return {
			pan: input.number,
			expires: [
				Number.parseInt(input.expire_month) as model.Card.Expires.Month,
				Number.parseInt(input.expire_year) - 2000 as model.Card.Expires.Year
			],
		}
	}
}
