function get(key: string) {
	return window.localStorage.getItem(key);
}

function set(key: string, value: string) {
	window.localStorage.setItem(key, value);
}

export function getLastAddress() {
	return get("address");
}

export function setLastAddress(address: string) {
	set("address", address);
}

export function getLastBet(address: string): bigint | null {
	const bet = get("bet_" + address);
	return bet ? BigInt(bet) : null;
}

export function setLastBet(address: string, bet: bigint) {
	return window.localStorage.setItem("bet_" + address, bet.toString());
}
