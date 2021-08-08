import { WEI } from "./const";

/**
 * Creates a random number to be used as game id.
 */
export function random(): bigint {
	let value = 0n;
	for(let i=0; i<8; i++) {
		value |= BigInt(Math.floor(Math.random() * 2147483648)) << BigInt(i * 31);
	}
	return value;
}

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
 * @returns {string}
 */
export function format(amount: string | bigint, digits = 18): string {
	const formatEnd = (str: string) => str.slice(0, digits).replace(/0+$/, "");
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
