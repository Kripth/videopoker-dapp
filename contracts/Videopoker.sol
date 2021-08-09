// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./VideopokerLogic.sol";

abstract contract Videopoker is Ownable, VideopokerLogic {

	uint private constant MASK_BET_0 = 1 << 249;
	uint private constant MASK_BET_1 = 1 << 250;
	uint private constant MASK_BET_2 = 1 << 251;
	uint private constant MASK_BET_3 = 1 << 252;
	uint private constant MASK_BET_4 = 1 << 253;
	uint private constant MASK_BET = ~uint256(63 << 249);

	uint private constant GAME_STARTED_FLAG = 1 << 254;
	uint private constant GAME_ENDED_FLAG = 2 << 254;

	struct DeckBuilder {
		uint256 random;
		uint cards;
	}

	// awaiting start randomness: cards = 0
	// started: flag == 0
	// awaiting end randomness: flag == GAME_STARTED
	// ended: flag == GAME_ENDED
	struct Game {
		uint bet; // 2 bits to indicate the game state, 5 bits used to indicate which cards to change or result, 249 used for bet or payout
		address player; // 160 bits
		uint32 cards; // 30 bits used for cards
		uint64 timestamp;
	}

	event Start(uint indexed gameId, uint cards);

	event End(uint indexed gameId, uint cards, uint result, uint payout);

	uint private min = 10000000000;
	uint private risk = 800;

	mapping(uint => Game) internal games;
	mapping(address => uint[]) private history;

	function getGame(uint gameId) public view returns (Game memory) {
		return games[gameId];
	}

	function getGames(address player) public view returns (uint[] memory) {
		return history[player];
	}

	function getMinBet() public view returns (uint) {
		return min;
	}

	function getMaxBet() public view returns (uint) {
		return address(this).balance / risk;
	}

	function deposit() public payable {}

	function withdraw(uint amount) public onlyOwner {
		payable(owner()).transfer(amount);
	}

	function kill() public onlyOwner {
		selfdestruct(payable(owner()));
	}

	function setRisk(uint _risk) public onlyOwner {
		risk = _risk;
	}

	function start(uint gameId) public payable {
		// check whether bet is possible
		uint bet = msg.value;
		require(bet <= getMaxBet(), "Bet too high");
		require(bet >= getMinBet(), "Bet too low");
		// init
		Game storage game = games[gameId];
		require(game.player == address(0) && gameId < 452312848583266388373324160190187140051835877600158453279131187530910662656, "Invalid game id");
		game.bet = bet;
		game.player = msg.sender;
		game.timestamp = uint64(block.timestamp);
		// add to history
		history[msg.sender].push(gameId);
		// call abstract randomness handler
		prepareRandomnessStart(gameId);
	}

	function end(uint gameId, uint change) public {
		// check whether there is a valid game
		Game storage game = games[gameId];
		require(game.player == msg.sender, "Unplayable game");
		// check whether the game is the correct state
		uint bet = game.bet;
		require(bet < 904625697166532776746648320380374280103671755200316906558262375061821325312, "Game already played or awaiting randomness"); // 1 << 249
		// change cards
		if(change != 0) {
			// need more randomness
			game.bet = bet | GAME_STARTED_FLAG | ((change & 63) << 249);
			prepareRandomnessEnd(gameId);
		} else {
			// simply check result
			endImpl(gameId, bet, game.cards, game);
		}
	}

	function endImpl(uint gameId, uint bet, uint cards, Game storage game) private {
		// check whether the player has won
		(uint result, uint payout) = win(bet, cards);
		if(payout != 0) {
			uint max = address(this).balance >> 1; // divide by 2
			if(payout > max) {
				payout = max;
			}
			// use the bet field to store payout and result for statistics
			game.bet = GAME_ENDED_FLAG | (result << 249) | payout;
			// transfer funds to player
			payable(game.player).transfer(payout);
		} else {
			// update bet to indicate that the game is over
			game.bet = GAME_ENDED_FLAG;
		}
		// event for frontend
		emit End(gameId, cards, result, payout);
	}

	function prepareRandomnessStart(uint gameId) virtual internal;

	function prepareRandomnessEnd(uint gameId) virtual internal;

	function handleRandomnessStart(uint gameId, uint256 randomness) internal {
		Game storage game = games[gameId];
		DeckBuilder memory builder = DeckBuilder(randomness, 0);
		nextCard(builder, 0);
		nextCard(builder, 6);
		nextCard(builder, 12);
		nextCard(builder, 18);
		nextCard(builder, 24);
		// store for change/check
		game.cards = uint32(builder.cards);
		// event for frontend
		emit Start(gameId, builder.cards);
	}

	function handleRandomnessEnd(uint gameId, uint256 randomness) internal {
		Game storage game = games[gameId];
		uint bet = game.bet;
		// update required cards
		DeckBuilder memory builder = DeckBuilder(randomness, game.cards);
		if((bet & MASK_BET_0) != 0) {
			changeCard(builder, 0);
		}
		if((bet & MASK_BET_1) != 0) {
			changeCard(builder, 6);
		}
		if((bet & MASK_BET_2) != 0) {
			changeCard(builder, 12);
		}
		if((bet & MASK_BET_3) != 0) {
			changeCard(builder, 18);
		}
		if((bet & MASK_BET_4) != 0) {
			changeCard(builder, 24);
		}
		// cards are updated for statistics
		uint cards = builder.cards & 68719476735;
		game.cards = uint32(cards);
		// check result
		endImpl(gameId, bet & MASK_BET, cards, game);
	}

	function nextCard(DeckBuilder memory builder, uint position) internal pure {
		do {
			uint card = builder.random & 63; // 0b111111;
			builder.random >>= 6;
			if((card & 15) < 13) {
				card++;
				// check whether card has already been dealt
				if(
					(builder.cards & 63) != card &&
					(builder.cards & 4032) != (card << 6) &&
					(builder.cards & 258048) != (card << 12) &&
					(builder.cards & 16515072) != (card << 18)
				) {
					builder.cards |= card << position;
					return;
				}
			}
		} while(builder.random > 0);
		// very low chance of happening
		revert("Invalid random number");
	}

	function changeCard(DeckBuilder memory builder, uint position) internal pure {
		do {
			uint card = builder.random & 63; // 0b111111;
			builder.random >>= 6;
			if((card & 15) < 13) {
				card++;
				// check whether card has already been dealt
				if(
					(builder.cards & 63) != card &&
					(builder.cards & 4032) != (card << 6) &&
					(builder.cards & 258048) != (card << 12) &&
					(builder.cards & 16515072) != (card << 18) &&
					(builder.cards & 1056964608) != (card << 24) &&
					(builder.cards & 67645734912) != (card << 30) &&
					(builder.cards & 4329327034368) != (card << 36) &&
					(builder.cards & 277076930199552) != (card << 42) &&
					(builder.cards & 17732923532771328) != (card << 48)
				) {
					// shift the previous card before replacing it
					uint mask = 63 << position;
					uint old = builder.cards & mask;
					builder.cards = (builder.cards & ~mask) | (old << (position + 5)) | (card << position);
					return;
				}
			}
		} while(builder.random > 0);
		// very low chance of happening
		revert("Invalid random number");
	}

}
