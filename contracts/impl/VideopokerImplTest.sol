// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Videopoker.sol";

contract VideopokerImplTest is Videopoker {

	function prepareRandomnessStart(uint gameId, Game storage game) internal override {
		handleRandomnessStart(gameId, game, randomness());
	}

	function prepareRandomnessEnd(uint gameId, Game storage game) internal override {
		handleRandomnessEnd(gameId, game, randomness());
	}

	function randomness() internal view returns (uint256) {
		return uint256(keccak256(abi.encodePacked(msg.sender, block.difficulty, block.timestamp)));
	}

}
