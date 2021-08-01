import { WEI } from "./const";

export function format(amount, maxLength = 18) {
	if(amount > WEI) {
		// greater than 0
		return amount / WEI;
	} else {
		let str = amount.toString()
			.padStart(maxLength, "0")
			.replace(/0+$/, "")
			.substr(0, maxLength);
		return `0.${str}`;
	}
}
