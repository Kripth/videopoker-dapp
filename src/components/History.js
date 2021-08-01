import { useEffect, useState } from "react";
import Cards from "./Cards";
import ContractForm from "./ContractForm";
import { Results } from "../util/const";
import { format } from "../util/util";

export default function History({ address = "", page = 1 }) {

	const pageSize = 5;

	const [ contract, setContract ] = useState(null);
	const [ unit, setUnit ] = useState("");

	const [ pages, setPages ] = useState(null);
	const [ games, setGames ] = useState(null);
	const [ loaded, setLoaded ] = useState(null);

	useEffect(() => {
		if(contract && games) {
			load(contract, page - 1, games);
		}
	}, [page]);

	async function load(contract, page, games) {
		// load pages from games
		const i = page * pageSize;
		setLoaded(await Promise.all(games.slice(i, i + pageSize).map(gameId => contract.getGame(gameId))));
	}

	function updateOrder(event) {
		console.log(event);
	}

	async function initContract(contract, info) {
		if(contract) {
			// load history of played games
			//setGames(await contract.getGames());
			const games = (await contract.getGames()).slice().reverse();
			setGames(games);
			setPages(Math.ceil(games.length / pageSize));
			setUnit(info.unit || "");
			await load(contract, page - 1, games);
			// update hash
			window.history.replaceState({}, "", `#history/${info.address}/${page}`);
		} else {
			setLoaded(null);
			setGames(null);
			setUnit(null);
		}
		setContract(contract);
	}

	return <>
		<ContractForm address={address} setError={console.warn} setContract={initContract} />
		<div className="row">
			<label className="label">Order by</label>
			<div className="value">
				<select disabled onChange={updateOrder}>
					<option value="desc">Newest</option>
					<option value="asc">Oldest</option>
				</select>
			</div>
		</div>
		{loaded && <>
			<div className="row">
				<table className="history">
					<thead>
						<tr>
							<th>Cards</th>
							<th>Result</th>
						</tr>
					</thead>
					<tbody>
						{loaded.map(game => <tr key={game.id}>
							<td><fieldset disabled><Cards cards={game.cards} /></fieldset></td>
							<td className="result">
								{game.playable ? <a href={`/#play/${address}/${game.id}`}>
									<button type="button">Resume</button>
								</a> : game.result ? <>
									<div>{Results[game.result - 1]}</div>
									<div>{format(game.payout, 10)} {unit}</div>
								</> : ""}
							</td>
						</tr>)}
					</tbody>
				</table>
			</div>
			<div className="row history-footer">
				<span>Page {page} of {pages}</span>
				<div style={{flexGrow: 1}} />
				{page > 1 && pages > 1 && <a href={`#history/${address}/${page - 1}`}><button>Previous</button></a>}
				{page < pages && <a href={`#history/${address}/${+page + 1}`}><button>Next</button></a>}
			</div>
		</>}
	</>

}
