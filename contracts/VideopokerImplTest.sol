// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Videopoker.sol";

contract VideopokerImplTest is Videopoker {

	constructor() Videopoker() payable {}

	function prepareRandomnessStart(uint gameId) internal override {
		handleRandomnessStart(gameId, randomness());
	}

	function prepareRandomnessEnd(uint gameId) internal override {
		handleRandomnessEnd(gameId, randomness());
	}

	function randomness() internal view returns (uint256) {
		return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
	}

}
