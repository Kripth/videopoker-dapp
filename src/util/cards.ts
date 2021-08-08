import { Suit } from "./const";

export class Card {

	constructor(private _value: number, private _suit: number) {}

	get value(): string {
		switch(this._value) {
			case 10: return "J";
			case 11: return "Q";
			case 12: return "K";
			case 13: return "A";
			default: return (1 + this._value).toString();
		}
	}

	get className(): string {
		switch(this._suit) {
			case Suit.hearts: return "hearts";
			case Suit.diamonds: return "diamonds";
			case Suit.clubs: return "clubs";
			case Suit.spades: return "spades";
			default: return "";
		}
	}

}

export function parse(cards: number): Card[] {
	const ret = Array(5);
	for(let i=0; i<ret.length; i++) {
		const offset = i * 6;
		const encoded = (cards & (0b111111 << offset)) >> offset;
		ret[i] = new Card(encoded & 0b001111, encoded & 0b110000);
	}
	return ret;
}
