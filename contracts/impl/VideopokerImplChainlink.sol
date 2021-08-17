// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "../Videopoker.sol";

contract VideopokerImplChainlink is Videopoker, VRFConsumerBase {

	uint private constant GAME_START = 57896044618658097711785492504343953926634992332820282019728792003956564819968; // 1 << 255
	uint private constant GAME_START_MASK = 57896044618658097711785492504343953926634992332820282019728792003956564819967; // (1 << 255) - 1

	bytes32 private immutable _keyHash;
	uint private immutable _fee;

	mapping(bytes32 => uint) private requests;

	constructor(address coordinatorAddress, address tokenAddress, bytes32 keyHash, uint fee) Videopoker() VRFConsumerBase(coordinatorAddress, tokenAddress) {
		_keyHash = keyHash;
		_fee = fee;
	}

	function prepareRandomnessStart(uint gameId, Game storage game) internal override {
		prepareRandomness(gameId | GAME_START);
	}

	function prepareRandomnessEnd(uint gameId, Game storage game) internal override {
		prepareRandomness(gameId);
	}

	function prepareRandomness(uint gameId) internal {
		require(LINK.balanceOf(address(this)) >= _fee, "Not enough LINK to pay fee");
		bytes32 requestId = requestRandomness(_keyHash, _fee);
		requests[requestId] = gameId;
	}

	function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
		uint gameId = requests[requestId];
		if(gameId != 0) {
			if((gameId & GAME_START) == GAME_START) {
				gameId &= GAME_START_MASK;
				handleRandomnessStart(gameId, games[gameId], randomness);
			} else {
				handleRandomnessEnd(gameId, games[gameId], randomness);
			}
		}
	}

}
