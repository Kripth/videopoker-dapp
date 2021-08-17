export async function getPrice(symbol: string): Promise<number | null> {
	try {
		const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + symbol);
		const [ data ] = await response.json();
		return data.current_price;
	} catch(e) {
		return null;
	}
}
