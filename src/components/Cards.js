import { card as cardClick } from "../util/audio";
import { parse } from "../util/cards";
import "../styles/cards.scss";

function Card({card, name, flipped = false}){
	return <div className={flipped ? "card flipped" : "card"}>
		<input id={name} type="checkbox" name={name} onChange={cardClick} />
		<label htmlFor={name} className={card.className}>
			<span className="value">{card.value}</span>
			<span className="suit" />
		</label>
	</div>
}

export default function Cards({ cards, flipped = [] }) {
	return <div className="cards-component">
		{parse(cards).map((card, i) => <Card key={i} card={card} name={`card${i}`} flipped={flipped[i]} />)}
	</div>
}
