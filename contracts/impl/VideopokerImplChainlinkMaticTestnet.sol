// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VideopokerImplChainlink.sol";

contract VideopokerImplChainlinkMaticTestnet is VideopokerImplChainlink {

	address private constant COORDINATOR_ADDRESS = 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255;
	address private constant TOKEN_ADDRESS = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
	bytes32 private constant KEY_HASH = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
	uint private constant FEE = 0.1 * 10 ** 15;

	constructor() VideopokerImplChainlink(COORDINATOR_ADDRESS, TOKEN_ADDRESS, KEY_HASH, FEE) {}

}
