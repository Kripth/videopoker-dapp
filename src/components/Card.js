import { card } from "../util/audio";
import { Suit } from "../util/const";

const values = {
	"10": "J",
	"11": "Q",
	"12": "K",
	"13": "A"
};

const classNames = {
	[Suit.hearts]: "hearts",
	[Suit.diamonds]: "diamonds",
	[Suit.clubs]: "clubs",
	[Suit.spades]: "spades",
};

export default function Card({index, value, flipped = false}){

	const type = value & 0b110000;
	const number = value & 0b001111;

	const name = `card${index}`;

	return <div className={flipped ? "card flipped" : "card"}>
		<input id={name} type="checkbox" name={name} onChange={card} />
		<label htmlFor={name} className={classNames[type]}>
			<span className="value">{values[number] || (1 + number)}</span>
			<span className="suit" />
		</label>
	</div>

}
