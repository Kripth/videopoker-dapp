import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { parse } from "./Cards";
import ContractForm from "./ContractForm";
import * as audio from "../util/audio";
import { Results } from "../util/const";
import { toBigInt, format } from "../util/util";

/**
 * @param {string} address
 * @param {number} resume
 * @returns {JSX.Element}
 */
export default function Play({ address, resume }) {

	const bet = useRef();

	const [ contract, setContract ] = useState(null);

	const [ playing, setPlaying ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	const [ unit, setUnit ] = useState("");
	const [ balance, setBalance ] = useState(undefined);

	const [ cards, setCards ] = useState(null);
	const [ flipped, setFlipped ] = useState([]);

	const [ result, setResult ] = useState(null);
	const [ error, setError ] = useState(null);

	function updateImpl(contract) {
		return Promise.all([
			contract.updateBalance().then(value => {
				setBalance(value);
				return value;
			}),
			contract.updateMin(),
			contract.updateMax()
		]);
	}

	function update() {
		return updateImpl(contract);
	}

	async function initContract(contract, info) {
		if(contract) {
			await updateImpl(contract);
			const { unit, coingecko } = info;
			setUnit(unit || "");
			//TODO convert prices with coingecko API
			// calculate optimal bet
			let best = contract.balance / 10n;
			if(best > contract.max) best = contract.max;
			else if(best < contract.min) best = contract.min;
			bet.current.value = format(best, 5);
			// update hash
			window.location.hash = `#play/${info.address}`;
			// resume game
			if(resume) {
				const game = await contract.getGame(resume);
				if(game.playable) {
					contract.gameId = game.id;
					bet.current.value = format(game.bet);
					setCards(game.cards);
					setPlaying(true);
				}
			}
		} else {
			bet.current.value = "";
		}
		setContract(contract);
	}

	async function setMinBet() {
		await update();
		bet.current.value = format(contract.min);
	}

	async function setMaxBet() {
		const [ gas ] = await Promise.all([contract.getGasPrice(), update()]);
		const balance = contract.balance - gas * 310000n;
		bet.current.value = format(contract.max < balance ? contract.max : balance);
	}

	async function start(data) {
		const bet = toBigInt(data.get("bet"));
		await update();
		if(bet > contract.max) {
			throw new Error("Bet too high");
		} else if(bet < contract.min) {
			throw new Error("Bet too low");
		} else if(bet > contract.balance) {
			throw new Error("Insufficient balance");
		} else {
			setCards(null);
			setFlipped([]);
			setResult(null);
			const { cards } = await contract.start(bet);
			setCards(cards);
			setBalance(balance - bet);
			setPlaying(true);
			audio.draw();
		}
	}

	async function end(data) {
		let replace = 0;
		const flipped = [];
		for(let i=0; i<5; i++) {
			if(!data.get("card" + i)) {
				replace |= 1 << i;
				flipped[i] = 1;
			}
		}
		setFlipped(flipped);
		const { cards, result, payout } = await contract.end(replace).finally(() => {
			// all cards must be visible again when the transaction ends, is cancelled or fails
			setFlipped([]);
		});
		const index = +result;
		if(index) {
			if(payout > 0) {
				// update balance
				setBalance(balance + BigInt(payout));
			}
			setResult({ index, payout });
			audio.win();
		} else {
			setResult(null);
			audio.loss();
		}
		setCards(cards);
		setPlaying(false);
	}

	async function submit(event) {
		event.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await (playing ? end : start)(new FormData(event.target));
		} catch(e) {
			//FIXME improve error message for contract errors
			setError(e.message);
			audio.error();
		}
		setLoading(false);
	}

	useEffect(() => {
		if(contract) {
			const interval = setInterval(update, 30000);
			return () => clearInterval(interval);
		}
	}, [contract]);

	return <>
		<ContractForm address={address} setError={setError} setContract={initContract} />
		<form onSubmit={submit}>
			<fieldset disabled={loading || !contract}>
				<div className="row">
					<label htmlFor="input-balance" className="label">Balance</label>
					<div className="value">
						<input id="input-balance" disabled={true} value={balance >= 0n ? `${format(balance)} ${unit}` : ""} />
					</div>
				</div>
				<div className="row">
					<label htmlFor="input-bet" className="label">Bet</label>
					<fieldset className="value group" disabled={playing}>
						<input ref={bet} id="input-bet" name="bet" spellCheck={false} />
						<button type="button" onClick={setMinBet}>Min</button>
						<button type="button" onClick={setMaxBet}>Max</button>
					</fieldset>
				</div>
				<div className="row cards-wrapper">
					<fieldset className="cards" disabled={!playing}>
						{cards ?
							parse(cards).map((value, i) => <Card key={"" + i + playing} index={i} value={value} flipped={flipped[i]} />) :
							Array(5).fill().map((_, i) => <Card key={"flipped" + i} index={i} value={0} flipped />)
						}
					</fieldset>
				</div>
				<div className="row">
					<button type="submit" id="play-button" className={loading ? "loading" : ""}>
						{playing ? "Draw" : "Deal"}
					</button>
				</div>
				{result && <div className="row">
					<div id="result">
						<div>{Results[result.index - 1]}</div>
						<div className="amount">+{format(result.payout)} {unit}</div>
					</div>
				</div>}
				{error && <div className="row error">{error}</div>}
			</fieldset>
		</form>
	</>

}
