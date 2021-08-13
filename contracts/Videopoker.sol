// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./VideopokerLogic.sol";

abstract contract Videopoker is Ownable, VideopokerLogic {

	uint8 private constant STATE_AWAITING_RANDOMNESS_AT_START = 0;
	uint8 private constant STATE_STARTED = 1;
	uint8 private constant STATE_AWAITING_RANDOMNESS_AT_END = 2;
	uint8 private constant STATE_ENDED = 3;

	struct DeckBuilder {
		uint256 random;
		uint cards;
	}

	struct Game {
		uint bet;
		address player; // 160 bits
		uint32 timestamp; // safe until year 2106
		uint32 cards; // 30 bits used for cards
		uint8 state;
		uint8 change;
		uint8 result;
	}

	event Created(uint indexed searchId, address indexed player, uint gameId);

	event Start(uint indexed gameId, uint cards);

	event End(uint indexed gameId, uint cards, uint result, uint payout);

	uint private min = 10000000000;
	uint private risk = 500;

	uint[9] private payouts = [ 1, 2, 3, 4, 6, 9, 25, 50, 250 ];

	uint private currentGameId = 0;

	mapping(uint => Game) internal games;
	mapping(address => uint[]) private history;

	function getGame(uint gameId) public view returns (Game memory) {
		return games[gameId];
	}

	function getGames(address player) public view returns (uint[] memory) {
		return history[player];
	}

	function getPlayedGames() public view returns (uint) {
		return currentGameId;
	}

	function getMinBet() public view returns (uint) {
		return min;
	}

	function getMaxBet() public view returns (uint) {
		return address(this).balance / risk;
	}

	function getPayouts() public view returns (uint[9] memory) {
		return payouts;
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

	function setPayout(uint result, uint multiplier) public onlyOwner {
		require(result > 0 && result < 10, "Invalid result");
		require(multiplier > 0, "Multiplier must be greater than 0");
		payouts[result - 1] = multiplier;
	}

	function setPayouts(uint[9] calldata _payouts) public onlyOwner {
		payouts = _payouts;
	}

	function start(uint searchId) external payable {
		// check whether bet is possible
		uint bet = msg.value;
		require(bet <= getMaxBet(), "Bet too high");
		require(bet >= getMinBet(), "Bet too low");
		// init
		uint gameId = ++currentGameId;
		games[gameId] = Game(bet, msg.sender, uint32(block.timestamp), 0, STATE_AWAITING_RANDOMNESS_AT_START, 0, 0);
		// add to history
		history[msg.sender].push(gameId);
		// event
		emit Created(searchId, msg.sender, gameId);
		// call abstract randomness handler
		prepareRandomnessStart(gameId);
	}

	function end(uint gameId, uint8 change) public {
		// check whether there is a valid game
		Game storage game = games[gameId];
		require(game.player == msg.sender, "Unplayable game");
		// check whether the game is the correct state
		require(game.state == STATE_STARTED, "Game already played or awaiting randomness");
		// change cards
		if(change != 0) {
			// need more randomness
			game.state = STATE_AWAITING_RANDOMNESS_AT_END;
			game.change = change;
			prepareRandomnessEnd(gameId);
		} else {
			// simply check result
			endImpl(gameId, game.cards, game);
		}
	}

	function endImpl(uint gameId, uint cards, Game storage game) private {
		// change state before sending
		game.state = STATE_ENDED;
		// check whether the player has won
		uint result = win(cards);
		uint payout = 0;
		if(result != 0) {
			payout = payouts[result - 1] * game.bet;
			uint max = address(this).balance >> 1; // divide by 2
			if(payout > max) {
				payout = max;
			}
			// use the bet field to store payout and result for statistics
			game.bet = payout;
			game.result = uint8(result);
			// transfer funds to player
			payable(game.player).transfer(payout);
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
		// update state
		game.state = STATE_STARTED;
		// event for frontend
		emit Start(gameId, builder.cards);
	}

	function handleRandomnessEnd(uint gameId, uint256 randomness) internal {
		Game storage game = games[gameId];
		// update required cards
		uint change = game.change;
		DeckBuilder memory builder = DeckBuilder(randomness, game.cards);
		if((change & 1) != 0) {
			changeCard(builder, 0);
		}
		if((change & 2) != 0) {
			changeCard(builder, 6);
		}
		if((change & 4) != 0) {
			changeCard(builder, 12);
		}
		if((change & 8) != 0) {
			changeCard(builder, 18);
		}
		if((change & 16) != 0) {
			changeCard(builder, 24);
		}
		// cards are updated for statistics
		uint cards = builder.cards & 68719476735;
		game.cards = uint32(cards);
		// check result
		endImpl(gameId, cards, game);
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
					builder.cards = (builder.cards & ~mask) | (old << (position + 30)) | (card << position);
					return;
				}
			}
		} while(builder.random > 0);
		// very low chance of happening
		revert("Invalid random number");
	}

}
