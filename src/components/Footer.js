import "../styles/footer.scss";

export default function Footer({ address }) {

	const ref = (name, address, ...args) => `#${name}${address ? [address, ...args].map(v => "/" + v).join("") : ""}`;

	return <div className="footer-component">
		<div className="links">
			<a href={ref("play", address)}>Play</a>
			<a href={ref("history", address, "1")}>History</a>
			<a href="#howtoplay">How to play</a>
			<a href="https://github.com/Kripth/videopoker-dapp" target="_blank" rel="noreferrer">GitHub</a>
		</div>
		<div className="suits">
			<div className="suit hearts" />
			<div className="suit spades" />
			<div className="suit diamonds" />
			<div className="suit clubs" />
		</div>
	</div>
}
