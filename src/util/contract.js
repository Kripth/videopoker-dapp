/* global BigInt */
import Web3 from "web3";
import json from "../assets/abi.json";
import { WEI } from "./const";

function random() {
	let value = 0n;
	for(let i=0; i<8; i++) {
		value |= BigInt(Math.floor(Math.random() * 2147483648)) << BigInt(i * 31);
	}
	return value;
}

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

	send(method, value, ...args) {
		return this.contract.methods[method](...args).send({from: this.address, value});
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
		return this.balance = await this.web3.eth.getBalance(this.address);
	}

	async updateMin() {
		return this.min = +(await this.call("getMinBet"));
	}

	async updateMax() {
		return this.max = +(await this.call("getMaxBet"));
	}

	deposit(amount) {
		return this.send("deposit", amount * WEI);
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
	 * @param {number} bet
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
		await eth.send("eth_requestAccounts");
		const web3 = new Web3(eth);
		//console.log(await web3.eth.net.getId());
		const [ address ] = await web3.eth.getAccounts();
		const contract = new web3.eth.Contract(json, contractAddress);
		return new Contract(web3, address, contract);
	}
}
