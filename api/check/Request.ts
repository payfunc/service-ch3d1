export interface Request {
	pares: string
}

// tslint:disable-next-line: no-namespace
export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof(value) == "object" &&
			typeof(value.pares) == "string"
	}
}
