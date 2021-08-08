import Card from "./Card";

/**
 * @param {number} cards
 * @returns {number[]}
 */
export function parse(cards) {
	return Array(5).fill().map((_, i) => {
		const offset = i * 6;
		return (cards & (0b111111 << offset)) >> offset;
	});
}

export default function Cards({ cards, flipped = [] }) {
	return <div className="cards">
		{parse(cards).map((value, i) => <Card key={i} index={i} value={value} flipped={flipped[i]} />)}
	</div>
}
