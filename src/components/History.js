import { useEffect, useState } from "react";
import Cards from "./Cards";
import ContractForm from "./ContractForm";
import { changedToFlipped } from "../util/cards";
import { Results } from "../util/const";
import { formatDate, formatNumber } from "../util/format";
import "../styles/history.scss";
import "../styles/results.scss";

export default function History({ address = "", page = 1 }) {

	const pageSize = 5;

	const [ contract, setContract ] = useState(null);
	const [ unit, setUnit ] = useState("");

	const [ pages, setPages ] = useState(null);
	const [ games, setGames ] = useState(null);
	const [ loaded, setLoaded ] = useState(null);
	const [ changed, setChanged ] = useState(null);

	useEffect(() => {
		if(contract && games) {
			load(contract, page - 1, games);
		}
	}, [page]);

	useEffect(() => {
		const interval = setInterval(() => changed && load(contract, page - 1, games), 5000);
		return () => clearInterval(interval);
	});

	async function load(contract, page, games) {
		// load pages from games
		const i = page * pageSize;
		const loaded = await Promise.all(games.slice(i, i + pageSize).map(gameId => contract.getGame(gameId)));
		setChanged(loaded.some(game => game.change > 0));
		setLoaded(loaded);
	}

	async function initContract(contract, info) {
		if(contract) {
			// load history of played games
			//setGames(await contract.getGames());
			const games = (await contract.getGames()).slice().reverse();
			setGames(games);
			setPages(Math.ceil(games.length / pageSize));
			setUnit(info.chain?.nativeCurrency.symbol ?? "");
			await load(contract, page - 1, games);
			// update hash
			window.location.hash = `#history/${info.address}/${page}`;
		} else {
			setLoaded(null);
			setGames(null);
			setUnit(null);
		}
		setContract(contract);
	}

	return <div className="history-component">
		<ContractForm address={address} setError={console.warn} setContract={initContract} />
		{loaded ? (loaded.length ? <>
			<div className="row">
				<div style={{width: "100%"}}>
					{loaded.map(game => <div key={game.id} className="history-component-game">
						<div className="date">{formatDate(game.date)}</div>
						<div className="results">
							<fieldset className="cards" disabled>
								<Cards cards={game.cards} flipped={changedToFlipped(game.change || 0)} />
							</fieldset>
							<div className="result">
								{game.playable || game.change > 0 ? <a href={`/#play/${address}/${game.id}`}>
									<button type="button">Resume</button>
								</a> : game.result ? <>
									<div>{Results[game.result - 1]}</div>
									<div className="amount">{formatNumber(game.payout, 8)} {unit}</div>
								</> : ""}
							</div>
						</div>
					</div>)}
				</div>
			</div>
			<div className="row history-component-footer">
				<span>Page {page} of {pages}</span>
				<div className="spacer" />
				<Page enabled={page > 1 && pages > 1} href={`#history/${address}/${page - 1}`}>&lsaquo;</Page>
				<Page enabled={page < pages} href={`#history/${address}/${+page + 1}`}>&rsaquo;</Page>
			</div>
		</> : <div className="history-component-empty">You haven't played any games yet</div>) :
		<div className="history-component-empty">Select a contract to view your playing history</div>}
	</div>

}

function Page({ enabled, href, children }) {
	if(enabled) {
		return <a className="nav" href={href}><button>{children}</button></a>
	} else {
		return <button className="nav" disabled>{children}</button>
	}
}
