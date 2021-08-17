import { useRef, useState } from "react";
import Cards from "./Cards";
import SelectContract from "./SelectContract";
import { getLastBet } from "../util/cache";
import { Value, Suit, Results } from "../util/const";
import { formatCurrency, formatNumber, toBigInt } from "../util/format";
import { getPrice } from "../util/priceprovider";
import "../styles/results.scss";

const combinations = [
	[Suit.hearts | Value.jack, Suit.clubs | Value.jack],
	[Suit.clubs | Value.two, Suit.spades | Value.two, Suit.clubs | Value.king, Suit.diamonds | Value.king],
	[Suit.hearts | Value.three, Suit.diamonds | Value.three, Suit.spades | Value.three],
	[Suit.clubs | Value.ace, Suit.clubs | Value.two, Suit.spades | Value.three, Suit.hearts | Value.four, Suit.clubs | Value.five],
	[Value.seven, Value.ace, Value.king, Value.three, Value.ten],
	[Suit.hearts | Value.two, Suit.clubs | Value.two, Suit.hearts | Value.ace, Suit.clubs | Value.ace, Suit.diamonds | Value.ace],
	[Suit.hearts | Value.ace, Suit.diamonds | Value.ace, Suit.clubs | Value.ace, Suit.spades | Value.ace],
	[Value.ace, Value.two, Value.three, Value.four, Value.five],
	[Value.ten, Value.jack, Value.queen, Value.king, Value.ace]
].map(deck => {
	const pad = 5 - deck.length;
	return {
		cards: Array(pad).fill(0).concat(deck),
		flipped: Array(pad).fill(1)
	};
});

export default function Payouts({ address }) {

	const betInput = useRef();

	const [ payouts, setPayouts ] = useState(null);
	const [ bet, setBet ] = useState(0n);
	const [ unit, setUnit ] = useState("");
	const [ price, setPrice ] = useState(null);

	async function initContract(contract, { address, chain, coingecko } = {}) {
		if(contract) {
			const promises = [contract.getPayouts().then(setPayouts)];
			if(coingecko) {
				promises.push(getPrice(coingecko).then(setPrice))
			}
			await promises;
			setBet(getLastBet(address) || 1000000000000000000n);
			setUnit(chain?.nativeCurrency.symbol);
		} else {
			setPayouts(null);
		}
	}

	function updateBet(event) {
		try {
			setBet(toBigInt(event.target.value));
		} catch(e) {
			//TODO mark as invalid number
		}
	}

	return <div>
		<SelectContract address={address} setError={console.warn} setContract={initContract} />
		{payouts && <>
			<div className="row">
				<label htmlFor="input-bet" className="label">Bet</label>
				<div className="value">
					<input ref={betInput} id="input-bet" autoComplete="off" spellCheck={false} value={formatNumber(bet)} onChange={updateBet} />
				</div>
			</div>
			<fieldset disabled>
				{payouts && combinations.map(({ cards, flipped }, i) => <div key={i} className="row results">
					<div className="cards">
						<Cards cards={cards} flipped={flipped} />
					</div>
					<div className="result">
						<span>{bet - 1n} {payouts[i]}</span>
						<div>{Results[i]}</div>
						<div className="amount">{formatNumber(bet * payouts[i])} {unit}</div>
						{price && <span className="currency">${formatCurrency(bet * payouts[i], price)}</span>}
					</div>
				</div>)}
			</fieldset>
		</>}
	</div>

}
