import Card from "./Card";
import "../styles/cards.scss";

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
	return <div className="cards-component">
		{parse(cards).map((value, i) => <Card key={i} index={i} value={value} flipped={flipped[i]} />)}
	</div>
}
