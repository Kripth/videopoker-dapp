import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { parse } from "./Cards";
import ContractForm from "./ContractForm";
import { WEI, Results } from "../util/const";
import { format } from "../util/util";

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
	const [ min, setMin ] = useState(0);
	const [ max, setMax ] = useState(0);

	const [ cards, setCards ] = useState(null);
	const [ flipped, setFlipped ] = useState([]);

	const [ result, setResult ] = useState(null);
	const [ error, setError ] = useState(null);

	function updateImpl(contract) {
		return Promise.all([
			contract.updateBalance().then(setBalance),
			contract.updateMin().then(setMin),
			contract.updateMax().then(setMax)
		]);
	}

	function update() {
		return updateImpl(contract);
	}

	useEffect(() => {
		const interval = setInterval(() => contract && update(), 30000);
		return () => clearInterval(interval);
	}, []);

	async function initContract(contract, info) {
		if(contract) {
			await updateImpl(contract);
			const { unit, coingecko } = info;
			setUnit(unit || "");
			//TODO convert prices with coingecko API
			// calculate optimal bet
			const best = Math.min(Math.max(contract.balance / 10, contract.min), contract.max);
			bet.current.value = best / WEI;
			// update hash
			window.history.replaceState({}, "", `#play/${info.address}`);
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
		await update();
		bet.current.value = format(Math.min(contract.max, contract.balance));
	}

	async function start(data) {
		const bet = Math.floor(data.get("bet") * WEI);
		await update();
		if(bet > contract.max) {
			setError("Bet too high");
		} else if(bet < contract.min) {
			setError("Bet too low");
		} else if(bet > contract.balance) {
			setError("Insufficient balance");
		} else {
			setCards(null);
			setFlipped([]);
			setResult(null);
			const { cards } = await contract.start(bet);
			setCards(cards);
			setBalance(balance - bet);
			setPlaying(true);
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
				setBalance(balance + +payout);
			}
			setResult({ index, payout });
		} else {
			setResult(null);
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
			//FIXME improve error message
			console.warn(e.receipt);
			setError(e.message);
		}
		setLoading(false);
	}

	return <>
		<ContractForm address={address} setError={setError} setContract={initContract} />
		<form onSubmit={submit}>
			<fieldset disabled={loading || !contract}>
				<div className="row">
					<label className="label">Balance</label>
					<div className="value">
						<input disabled={true} value={balance >= 0 ? `${format(balance)} ${unit}` : ""} />
					</div>
				</div>
				<div className="row">
					<label className="label">Bet</label>
					<div className="value group">
						<input ref={bet} type="number" name="bet" step={1 / WEI} min={format(min)} max={format(max)} disabled={playing} spellCheck={false} />
						<button type="button" onClick={setMinBet}>Min</button>
						<button type="button" onClick={setMaxBet}>Max</button>
					</div>
				</div>
				<div className="row cards-wrapper">
					<div className="cards">
						{cards ?
							parse(cards).map((value, i) => <Card key={"" + i + playing} index={i} value={value} flipped={flipped[i]} />) :
							Array(5).fill().map((_, i) => <Card key={"flipped" + i} index={i} value={0} flipped />)
						}
					</div>
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
