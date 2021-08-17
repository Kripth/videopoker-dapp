interface Cache {
	value: number;
	expires: number;
}

const cache: Record<string, Cache> = {};

export async function getPrice(symbol: string): Promise<number | null> {
	const cached = cache[symbol];
	if(cached && cached.expires < performance.now()) {
		return cached.value;
	}
	try {
		const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + symbol);
		const [ { current_price: value } ] = await response.json();
		cache[symbol] = { value, expires: performance.now() + 60000 };
		return value;
	} catch(e) {
		return null;
	}
}
