// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Videopoker.sol";

contract VideopokerImplHarmony is Videopoker {

	function prepareRandomnessStart(uint gameId, Game storage game) internal override {
		handleRandomnessStart(gameId, game, randomness(gameId));
	}

	function prepareRandomnessEnd(uint gameId, Game storage game) internal override {
		handleRandomnessEnd(gameId, game, randomness(gameId));
	}

	function randomness(uint gameId) internal view returns (uint256 result) {
		return uint256(vrf() ^ keccak256(abi.encodePacked(gameId)));
	}

	function vrf() internal view returns (bytes32 result) {
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
