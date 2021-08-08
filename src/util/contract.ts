import Web3 from "web3";
import { Contract as Web3Contract, EventData } from "web3-eth-contract";
import json from "../assets/abi.json";

interface Game {
	id: bigint;
	playable: boolean;
	bet: bigint;
	result?: number;
	payout?: bigint;
	cards: number;
	change?: number;
	date: Date
}

/**
 * Creates a random number to be used as game id.
 */
function random(): bigint {
	let value = 0n;
	for(let i=0; i<8; i++) {
		value |= BigInt(Math.floor(Math.random() * 2147483648)) << BigInt(i * 31);
	}
	return value;
}

export class Contract {

	private balance = 0n;
	private min = 0n;
	private max = 0n;

	private gameId = 0n;

	constructor(private web3: Web3, private address: string, private contract: Web3Contract) {}

	call(method: string, ...args: any) {
		return this.contract.methods[method](...args).call({from: this.address});
	}

	send(method: string, value: number | bigint, ...args: any) {
		return this.contract.methods[method](...args).send({from: this.address, value: value.toString()});
	}

	event(eventName: string, callback: (values: {[key: string]: any}) => any) {
		const provider = this.contract.events[eventName]({filter: {gameId: this.gameId}}).on("data", (event: EventData) => {
			callback(event.returnValues);
			provider.off("data");
		});
	}

	async updateBalance() {
		return this.balance = BigInt(await this.web3.eth.getBalance(this.address));
	}

	async updateMin() {
		return this.min = BigInt(await this.call("getMinBet"));
	}

	async updateMax() {
		return this.max = BigInt(await this.call("getMaxBet"));
	}

	async getGasPrice() {
		return BigInt(await this.web3.eth.getGasPrice());
	}

	async getGame(id: bigint | string): Promise<Game> {
		const game = await this.call("getGame", id);
		const ret = {
			id,
			playable: false,
			bet: BigInt(game.bet),
			cards: +game.cards,
			date: new Date(game.timestamp * 1000)
		} as Game;
		if(ret.cards === 0) {
			// awaiting randomness at start
			ret.change = 0b11111;
		} else {
			const flag = (ret.bet & (0b11n << 254n)) >> 254n;
			if(flag === 0n) {
				// game started but not finished
				ret.playable = true;
				ret.bet &= (1n << 249n) - 1n;
			} else if(flag === 1n) {
				// awaiting randomness at end
				ret.change = Number((ret.bet & (0b11111n << 249n)) >> 249n);
			} else {
				// ended
				ret.result = Number((ret.bet & (0b11111n << 249n)) >> 249n);
				ret.payout = ret.bet & ((1n << 249n) - 1n);
			}
		}
		return ret;
	}

	getGames(): Promise<string[]> {
		return this.call("getGames", this.address);
	}

	/**
	 * @param {bigint} bet
	 * @returns {Promise<{bet, cards}>}
	 */
	start(bet: bigint) {
		const gameId = this.gameId = random();
		return new Promise((success, fail) => {
			this.send("start", bet, gameId).catch(fail);
			this.event("Start", success);
		});
	}

	end(replace: number) {
		return new Promise((success, fail) => {
			this.send("end", 0, this.gameId, replace).catch(fail);
			this.event("End", success);
		});
	}

}

/**
 *
 * @param {string} contractAddress
 * @returns {Promise<Contract>}
 */
export async function createContract(contractAddress: string) {
	// @ts-ignore
	const eth = window.ethereum;
	if(eth) {
		const [ address ] = await eth.request({ method: "eth_requestAccounts" });
		const web3 = new Web3(eth);
		// @ts-ignore
		const contract = new web3.eth.Contract(json, contractAddress);
		return new Contract(web3, address, contract);
	} else {
		throw new Error("Could not detect wallet extension");
	}
}
