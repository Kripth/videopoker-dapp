// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VideopokerImplChainlink.sol";

contract VideopokerImplChainlinkBinanceSmartChain is VideopokerImplChainlink {

	address private constant COORDINATOR_ADDRESS = 0x747973a5A2a4Ae1D3a8fDF5479f1514F65Db9C31;
	address private constant TOKEN_ADDRESS = 0x404460C6A5EdE2D891e8297795264fDe62ADBB75;
	bytes32 private constant KEY_HASH = 0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c;
	uint private constant FEE = 200000000000000000;

	constructor() VideopokerImplChainlink(COORDINATOR_ADDRESS, TOKEN_ADDRESS, KEY_HASH, FEE) {}

}
