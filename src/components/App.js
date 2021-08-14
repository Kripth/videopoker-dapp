import { useEffect, useState } from "react";
import Payouts from "./Payouts";
import History from "./History";
import Play from "./Play";
import Footer from "./Footer";
import "../styles/app.scss";

export default function App() {

	function parse() {
		return window.location.hash.substr(1).split("/");
	}

	const [ page, setPage ] = useState(parse());

	useEffect(() => {
		const fn = () => setPage(parse());
		window.addEventListener("hashchange", fn);
		return () => window.removeEventListener("hashchange", fn);
	});

	return <div className="app-component">
		<div className="app-component-title">videopoker-dapp</div>
		<div className="app-component-content">
			{page[0] === "history" ?
				<History address={page[1]} page={page[2]} /> :
			page[0] === "payouts" ?
				<Payouts address={page[1]} /> :
				<Play address={page[1]} resume={page[2]} />}
		</div>
		<Footer address={page[1]} />
	</div>

}
