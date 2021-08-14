import { WEI } from "./const";

/**
 * Parses a decimal number into a bigint.
 *
 * @throws {SyntaxError} When the input contains invalid characters or the format is invalid.
 */
export function toBigInt(value: string): bigint {
	const match = value.match(/^(0|[1-9]\d*)(?:\.(\d{1,18}))?$/);
	if(match) {
		if(match[2]) {
			// has a comma
			return BigInt(match[1]) * WEI + BigInt(match[2].padEnd(18, "0"));
		} else {
			return BigInt(value) * WEI;
		}
	} else {
		throw new SyntaxError("Invalid number");
	}
}

/**
 * Formats an integer used by the network into a decimal representation without
 * losing precision.
 */
export function formatNumber(amount: string | bigint): string {
	const formatEnd = (str: string) => str.replace(/0+$/, "");
	const str = amount.toString();
	if(str === "0") {
		return str;
	} else if(str.length > 18) {
		// greater than 1 eth
		const start = str.slice(0, -18);
		const end = formatEnd(str.substr(str.length - 18));
		return end === "" ? start : `${start}.${end}`;
	} else {
		return `0.${formatEnd(str.padStart(18, "0"))}`
	}
}

export function formatDate(date: Date): string {
	const year = date.getFullYear().toString().padStart(4, "0");
	const month = pad2(date.getMonth() + 1);
	const day = pad2(date.getDate());
	const hours = pad2(date.getHours());
	const minutes = pad2(date.getMinutes());
	const seconds = pad2(date.getSeconds());
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function pad2(value: number): string {
	return value.toString().padStart(2, "0");
}
