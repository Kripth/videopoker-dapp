// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VideopokerImplChainlink.sol";

contract VideopokerImplChainlinkMatic is VideopokerImplChainlink {

	address private constant COORDINATOR_ADDRESS = 0x3d2341ADb2D31f1c5530cDC622016af293177AE0;
	address private constant TOKEN_ADDRESS = 0xb0897686c545045aFc77CF20eC7A532E3120E0F1;
	bytes32 private constant KEY_HASH = 0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da;
	uint private constant FEE = 0.1 * 10 ** 15;

	constructor() VideopokerImplChainlink(COORDINATOR_ADDRESS, TOKEN_ADDRESS, KEY_HASH, FEE) {}

}
