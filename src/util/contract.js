import Web3 from "web3";
import json from "../assets/abi.json";
import { random } from "./util";

export class Contract {

	/**
	 * @param {Web3} web3
	 * @param {string} address
	 * @param contract
	 */
	constructor(web3, address, contract) {
		this.web3 = web3;
		this.address = address;
		this.contract = contract;
		//this.contract.events.allEvents({toBlock: 'latest'}, console.log);
	}

	call(method, ...args) {
		return this.contract.methods[method](...args).call({from: this.address});
	}

	/**
	 * @param {string} method
	 * @param {bigint} value
	 * @param {*} args
	 */
	send(method, value, ...args) {
		return this.contract.methods[method](...args).send({from: this.address, value: value.toString()});
	}

	/**
	 * @param {string} eventName
	 * @param {function} callback
	 */
	event(eventName, callback) {
		const provider = this.contract.events[eventName]({filter: {gameId: this.gameId}}).on("data", event => {
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

	async getGame(id) {
		const { bet, deck, cards } = await this.call("getGame", id);
		if(+deck) {
			// game is still playable
			return {
				id,
				playable: true,
				bet: BigInt(bet),
				cards
			};
		} else {
			// game has ended
			const result = BigInt(bet);
			return {
				id,
				result: Number(result >> 252n),
				payout: result & (2n ** 252n - 1n),
				cards
			};
		}
	}

	getGames() {
		return this.call("getGames", this.address);
	}

	/**
	 * @param {bigint} bet
	 * @returns {Promise<{bet, cards}>}
	 */
	start(bet) {
		const gameId = this.gameId = random();
		return new Promise((success, fail) => {
			this.send("start", bet, gameId).catch(fail);
			this.event("Start", success);
		});
	}

	/**
	 * @param {number} replace
	 * @returns {Promise<{cards, result, payout}>}
	 */
	end(replace) {
		return new Promise((success, fail) => {
			this.send("end", 0, this.gameId, replace).catch(fail);
			this.event("End", success);
		});
	}

}

/**
 *
 * @param {string} contractAddress
 * @returns {Promise<Contract> | undefined}
 */
export async function createContract(contractAddress) {
	const eth = window.ethereum;
	if(eth) {
		const [ address ] = await window.ethereum.request({ method: 'eth_requestAccounts' });
		const web3 = new Web3(eth);
		const contract = new web3.eth.Contract(json, contractAddress);
		return new Contract(web3, address, contract);
	}
}
