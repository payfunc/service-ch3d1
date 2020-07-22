export interface Configuration {
	url: string
	key: string
}

export namespace Configuration {
	export function is(value: any | Configuration): value is Configuration {
		return typeof value == "object" &&
			typeof value.url == "string" &&
			typeof value.key == "string"
	}
}
