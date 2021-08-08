// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Videopoker.sol";

contract TestVideopoker is Videopoker {

	uint private constant ACE = 13;
	uint private constant TWO = 1;
	uint private constant THREE = 2;
	uint private constant FOUR = 3;
	uint private constant FIVE = 4;
	uint private constant SIX = 5;
	uint private constant SEVEN = 6;
	uint private constant EIGHT = 7;
	uint private constant NINE = 8;
	uint private constant TEN = 9;
	uint private constant JACK = 10;
	uint private constant QUEEN = 11;
	uint private constant KING = 12;

	uint private constant HEARTS = 0;
	uint private constant DIAMONDS = 16;
	uint private constant CLUBS = 32;
	uint private constant SPADES = 48;

	uint private constant JACKS_OR_BETTER = 1;
	uint private constant TWO_PAIR = 2;
	uint private constant THREE_OF_A_KIND = 3;
	uint private constant STRAIGHT = 4;
	uint private constant FLUSH = 5;
	uint private constant FULL_HOUSE = 6;
	uint private constant FOUR_OF_A_KIND = 7;
	uint private constant STRAIGHT_FLUSH = 8;
	uint private constant ROYAL_FLUSH = 9;

	uint public initialBalance = 1 ether;

	uint private currentGameId = 0;

	uint private randomness = 0;

	function prepareRandomnessStart(uint gameId) internal override {
		handleRandomnessStart(gameId, randomness);
	}

	function prepareRandomnessEnd(uint gameId) internal override {
		handleRandomnessEnd(gameId, randomness);
	}

	function nextGameId() private returns (uint) {
		return ++currentGameId;
	}

	function deck(uint card0, uint card1, uint card2, uint card3, uint card4) private pure returns (uint) {
		return card0 | (card1 << 6) | (card2 << 12) | (card3 << 18) | (card4 << 24);
	}

	function random(uint card0, uint card1, uint card2, uint card3, uint card4) private pure returns (uint) {
		return deck(card0 - 1, card1 - 1, card2 - 1, card3 - 1, card4 - 1);
	}

	function random(uint card0, uint card1, uint card2, uint card3, uint card4, uint card5) private pure returns (uint) {
		return random(card0, card1, card2, card3, card4) | ((card5 - 1) << 30);
	}

	function random(uint card0, uint card1, uint card2, uint card3, uint card4, uint card5, uint card6) private pure returns (uint) {
		return random(card0, card1, card2, card3, card4, card5) | ((card6 - 1) << 36);
	}

	function getResult(uint gameId) private returns (uint) {
		return (getGame(gameId).bet & 13569385457497991651199724805705614201555076328004753598373935625927319879680) >> 249;
	}

	function testNormalGame() public {
		uint gameId = nextGameId();
		uint cards = deck(ACE | HEARTS, TWO | HEARTS, THREE | SPADES, FOUR | CLUBS, FIVE | CLUBS);
		randomness = random(ACE | HEARTS, TWO | HEARTS, THREE | SPADES, FOUR | CLUBS, FIVE | CLUBS);
		games[gameId] = Game(getMinBet(), msg.sender, 0, 0);
		prepareRandomnessStart(gameId);
		Assert.equal(getGame(gameId).cards, cards, "Generated cards are different from expected");
		end(gameId, 0);
		Assert.equal(getResult(gameId), STRAIGHT, "Unexpected result");
	}

	function testDeckReplacementWithDuplicatesAndInvalid() public {
		uint gameId = nextGameId();
		uint cards = deck(ACE | HEARTS, TWO | HEARTS, THREE | SPADES, SEVEN | CLUBS, SIX | CLUBS);
		randomness = random(ACE | HEARTS, ACE | HEARTS, 62, TWO | HEARTS, THREE | SPADES, SEVEN | CLUBS, SIX | CLUBS);
		games[gameId] = Game(getMinBet(), msg.sender, 0, 0);
		prepareRandomnessStart(gameId);
		Assert.equal(getGame(gameId).cards, cards, "Generated cards are different from expected");
		cards = deck(ACE | HEARTS, TWO | HEARTS, THREE | SPADES, FOUR | CLUBS, FIVE | CLUBS);
		randomness = random(63, ACE | HEARTS, SIX | CLUBS, FOUR | CLUBS, FOUR | CLUBS, FIVE | CLUBS);
		end(gameId, 24); // 0b11000 => last 2 cards
		Assert.equal(getGame(gameId).cards, cards, "Changed cards are different from expected");
		Assert.equal(getResult(gameId), STRAIGHT, "Unexpected result");
	}

}
