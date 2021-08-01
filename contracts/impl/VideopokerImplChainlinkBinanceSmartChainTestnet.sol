// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VideopokerImplChainlink.sol";

contract VideopokerImplChainlinkBinanceSmartChainTestnet is VideopokerImplChainlink {

	address private constant COORDINATOR_ADDRESS = 0xa555fC018435bef5A13C6c6870a9d4C11DEC329C;
	address private constant TOKEN_ADDRESS = 0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06;
	bytes32 private constant KEY_HASH = 0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186;
	uint private constant FEE = 100000000000000000;

	constructor() VideopokerImplChainlink(COORDINATOR_ADDRESS, TOKEN_ADDRESS, KEY_HASH, FEE) {}

}
