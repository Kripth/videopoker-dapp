// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Videopoker.sol";

contract VideopokerImplHarmony is Videopoker {

	function prepareRandomnessStart(uint gameId, Game storage game) internal override {
		handleRandomnessStart(gameId, game, randomness());
	}

	function prepareRandomnessEnd(uint gameId, Game storage game) internal override {
		handleRandomnessEnd(gameId, game, randomness());
	}

	function randomness() internal view returns (uint256 result) {
		bytes32 input;
		assembly {
			let memPtr := mload(0x40)
			if iszero(staticcall(not(0), 0xff, input, 32, memPtr, 32)) {
				invalid()
			}
			result := mload(memPtr)
		}
	}

}
