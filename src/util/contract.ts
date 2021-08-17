import Web3 from "web3";
import { Contract as Web3Contract, EventData } from "web3-eth-contract";
import { abi } from "../contracts/Videopoker.json";

interface Game {
	id: bigint;
	bet: bigint;
	date: Date;
	cards: number;
	change?: number;
	result?: number;
	payout?: bigint;
	playable: boolean;
}

interface StartEvent {
	gameId: string;
	player: string;
	searchId: string;
	cards: string;
}

interface EndEvent {
	gameId: string;
	cards: string;
	result: string;
	payout: string;
}

export class Contract {

	private balance = 0n;
	private min = 0n;
	private max = 0n;

	constructor(private web3: Web3, private address: string, private contract: Web3Contract) {}

	call(method: string, ...args: any) {
		return this.contract.methods[method](...args).call({from: this.address});
	}

	send(method: string, value: number | bigint, ...args: any) {
		return this.contract.methods[method](...args).send({from: this.address, value: value.toString()});
	}

	event<T>(eventName: string, filter: any, callback: (values: T) => any) {
		const provider = this.contract.events[eventName]({ filter }).on("data", (event: EventData) => {
			callback(event.returnValues as T);
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

	async getPayouts() {
		return (await this.call("getPayouts")).map(BigInt);
	}

	async getGame(id: bigint | string): Promise<Game> {
		const game = await this.call("getGame", id);
		const state = +game.state;
		const ret = {
			id,
			bet: BigInt(game.bet),
			cards: Number(game.cards),
			date: new Date(game.timestamp * 1000)
		} as Game;
		if(state === 0) {
			// awaiting randomness at start
			ret.change = 0b11111;
		} else if(state === 1) {
			// game started
			ret.playable = true;
		} else if(state === 2) {
			// awaiting randomness at end
			ret.change = +game.change;
		} else {
			// ended
			ret.result = +game.result;
			ret.payout = ret.bet;
		}
		return ret;
	}

	getGames(): Promise<string[]> {
		return this.call("getGames", this.address);
	}

	start(bet: bigint): Promise<StartEvent> {
		const searchId = Math.floor(Math.random() * 4294967296);
		return new Promise((success, fail) => {
			this.event<StartEvent>("Start", { searchId, player: this.address }, success);
			this.send("start", bet, searchId).catch(fail);
		});
	}

	startEvent(gameId: bigint): Promise<StartEvent> {
		return new Promise(success => {
			this.event<StartEvent>("Start", { gameId }, success);
		});
	}

	end(gameId: bigint, replace: number): Promise<EndEvent> {
		return new Promise((success, fail) => {
			this.endEvent(gameId).then(success);
			this.send("end", 0, gameId, replace).catch(fail);
		});
	}

	endEvent(gameId: bigint): Promise<EndEvent> {
		return new Promise(success => {
			this.event<EndEvent>("End", { gameId }, success);
		});
	}

}

/**
 *
 * @param {string} contractAddress
 * @returns {Promise<Contract>}
 */
export async function createContract(contractAddress: string, chain?: any) {
	// @ts-ignore
	const eth = window.ethereum;
	if(eth) {
		if(chain) {
			try {
				await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chain.chainId }]});
			} catch(e) {
				if(e.code === 4902) {
					await eth.request({ method: "wallet_addEthereumChain", params: [ chain ]});
				} else {
					throw e;
				}
			}
		}
		const [ address ] = await eth.request({ method: "eth_requestAccounts" });
		const web3 = new Web3(eth);
		// @ts-ignore
		const contract = new web3.eth.Contract(abi, contractAddress);
		return new Contract(web3, address, contract);
	} else {
		throw new Error("Could not detect wallet extension");
	}
}
