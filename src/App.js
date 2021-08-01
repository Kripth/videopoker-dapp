import { useEffect, useState } from "react";
import History from "./components/History";
import Play from "./components/Play";
import Footer from "./components/Footer";

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

	return <>
		<div id="title">videopoker-dapp</div>
		<div className="app-component">
			{page[0] === "history" ?
				<History address={page[1]} page={page[2]} /> :
				<Play address={page[1]} resume={page[2]} />}
		</div>
		<Footer address={page[1]} />
	</>

}
