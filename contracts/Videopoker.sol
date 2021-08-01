// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VideopokerLogic.sol";

abstract contract Videopoker is VideopokerLogic {

	uint private constant CHANGE_OFFSET = 31 << 59;
	uint private constant CHANGE_OFFSET_0 = ~uint(63);
	uint private constant CHANGE_OFFSET_1 = ~uint(63 << 6);
	uint private constant CHANGE_OFFSET_2 = ~uint(63 << 12);
	uint private constant CHANGE_OFFSET_3 = ~uint(63 << 18);
	uint private constant CHANGE_OFFSET_4 = ~uint(63 << 24);

	struct DeckBuilder {
		uint256 random;
		uint deck;
	}

	struct Game {
		uint bet;
		address player;
		uint64 deck; // 52 bits used
		uint32 cards; // 30 bits used
	}

	event Start(uint indexed gameId, uint cards);

	event End(uint indexed gameId, uint cards, uint result, uint payout);

	address private immutable owner;

	uint private min = 10000000000;
	uint private risk = 800;

	mapping(uint => Game) private games;
	mapping(address => uint[]) private history;

	constructor() {
		owner = msg.sender;
	}

	function deposit() public payable {}

	function withdraw(uint amount) public {
		require(msg.sender == owner);
		payable(msg.sender).transfer(amount);
	}

	function kill() public {
		require(msg.sender == owner);
		selfdestruct(payable(owner));
	}

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

	function setRisk(uint _risk) public {
		require(msg.sender == owner);
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
		uint deck = game.deck;
		require(deck != 0, "Game already played");
		require(deck < 4503599627370495, "Game is awaiting randomness"); // leftmost bits are used to store the changed cards
		// change cards
		if(change != 0) {
			// need more randomness
			game.deck = uint64(deck | (change << 59));
			prepareRandomnessEnd(gameId);
		} else {
			// simply check result
			endImpl(gameId, game.cards, game);
		}
	}

	function endImpl(uint gameId, uint cards, Game storage game) private {
		// empty deck to indicate that the game is finished
		game.deck = 0;
		// check whether the player has won
		(uint result, uint payout) = win(game.bet, cards);
		if(payout != 0) {
			uint max = address(this).balance >> 1; // divide by 2
			if(payout > max) {
				payout = max;
			}
			// transfer funds to player
			payable(game.player).transfer(payout);
			// use the bet field to store payout and result for statistics
			game.bet = payout | (result << 252);
		}
		emit End(gameId, cards, result, payout);
	}

	function prepareRandomnessStart(uint gameId) virtual internal;

	function prepareRandomnessEnd(uint gameId) virtual internal;

	function handleRandomnessStart(uint gameId, uint256 randomness) internal {
		Game storage game = games[gameId];
		DeckBuilder memory builder = DeckBuilder(randomness, 0);
		uint cards = nextCard(builder) |
			nextCard(builder) << 6 |
			nextCard(builder) << 12 |
			nextCard(builder) << 18 |
			nextCard(builder) << 24;
		// store somewhere
		game.deck = uint64(builder.deck);
		game.cards = uint32(cards);
		//games[player] = Game(bet, player, uint64(builder.deck), uint32(cards));
		emit Start(gameId, cards);
	}

	function handleRandomnessEnd(uint gameId, uint256 randomness) internal {
		Game storage game = games[gameId];
		uint deck = game.deck;
		uint change = deck >> 59;
		// update required cards
		DeckBuilder memory builder = DeckBuilder(randomness, deck); // bits used by `change` are ignored
		uint cards = game.cards;
		if((change & 1) != 0) {
			cards &= CHANGE_OFFSET_0;
			cards |= nextCard(builder);
		}
		if((change & 2) != 0) {
			cards &= CHANGE_OFFSET_1;
			cards |= nextCard(builder) << 6;
		}
		if((change & 4) != 0) {
			cards &= CHANGE_OFFSET_2;
			cards |= nextCard(builder) << 12;
		}
		if((change & 8) != 0) {
			cards &= CHANGE_OFFSET_3;
			cards |= nextCard(builder) << 18;
		}
		if((change & 16) != 0) {
			cards &= CHANGE_OFFSET_4;
			cards |= nextCard(builder) << 24;
		}
		// cards are updated for statistics
		game.cards = uint32(cards);
		// check result
		endImpl(gameId, cards, game);
	}

	function nextCard(DeckBuilder memory builder) private pure returns (uint) {
		uint hash;
		uint bit;
		do {
			hash = builder.random & 63; // 0b111111;
			builder.random >>= 6;
			if(hash < 52) {
				bit = 1 << hash;
				if((builder.deck & bit) == 0) {
					builder.deck |= bit;
					return (hash / 4) | ((hash % 4) << 4);
				}
			}
		} while(builder.random > 0);
		// very low chance of happening
		revert("Fuck");
	}

}
