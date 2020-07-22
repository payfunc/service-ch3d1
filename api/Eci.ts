export type Eci =
	"0" |
	"1" |
	"2" |
	"5" |
	"6" |
	"7"

	// tslint:disable-next-line: no-namespace
export namespace Eci {
	export function is(value: Eci | any): value is Response {
		return typeof value == "string" &&
			(value == "0" || value == "1" || value == "2" || value == "5" || value == "6" || value == "7")
	}
}
