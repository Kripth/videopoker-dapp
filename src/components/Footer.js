export default function Footer({ address }) {

	const ref = name => `/#${name}${address ? `/${address}` : ""}`;

	return <div className="footer-component">
		<div className="links">
			<a href={ref("play")}>Play</a>
			<a href={ref("history")}>History</a>
			<a href="/#howtoplay">How to play</a>
		</div>
		<div className="suits">
			<div className="suit hearts" />
			<div className="suit spades" />
			<div className="suit diamonds" />
			<div className="suit clubs" />
		</div>
	</div>
}
