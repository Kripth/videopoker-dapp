import { card } from "../util/audio";

const JACK = 9;
const QUEEN = 10;
const KING = 11;
const ACE = 12;

const values = {
	[JACK]: "J",
	[QUEEN]: "Q",
	[KING]: "K",
	[ACE]: "A"
};

const HEARTS = 0b000000;
const DIAMONDS = 0b010000;
const CLUBS = 0b100000;
const SPADES = 0b110000;

const classNames = {
	[HEARTS]: "hearts",
	[DIAMONDS]: "diamonds",
	[CLUBS]: "clubs",
	[SPADES]: "spades",
};

export default function Card({index, value, flipped = false}){

	const type = value & 0b110000;
	const number = value & 0b001111;

	const name = `card${index}`;

	return <div className={flipped ? "card flipped" : "card"}>
		<input id={name} type="checkbox" name={name} onChange={card} />
		<label htmlFor={name} className={classNames[type]}>
			<span className="value">{values[number] || (2 + number)}</span>
			<span className="suit" />
		</label>
	</div>

}
