// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Request {
	// pares: string <- added in Cardfunc
}

// tslint:disable-next-line: no-namespace
export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object"
	}
}
