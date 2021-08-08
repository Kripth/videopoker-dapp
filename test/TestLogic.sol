// SPDX-License-Identifier: MIT
pragma solidity >=0.4.15 <0.9.0;

import "truffle/Assert.sol";
import "../contracts/VideopokerLogic.sol";

contract TestLogic is VideopokerLogic {

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

	function deck(uint card0, uint card1, uint card2, uint card3, uint card4) private pure returns (uint) {
		return card0 | (card1 << 6) | (card2 << 12) | (card3 << 18) | (card4 << 24);
	}

	function test(uint cards, uint expectedResult) private {
		uint result = 0;
		(result, ) = win(0, cards);
		Assert.equal(result, expectedResult, "");
	}

	function testRoyalFlush() public {
		test(deck(TEN | CLUBS, JACK | CLUBS, QUEEN | CLUBS, KING | CLUBS, ACE | CLUBS), ROYAL_FLUSH);
		test(deck(QUEEN | HEARTS,  ACE | HEARTS, TEN | HEARTS, JACK | HEARTS, KING | HEARTS), ROYAL_FLUSH);
	}

	function testStraightFlush() public {
		test(deck(NINE | SPADES, TEN | SPADES, JACK | SPADES, QUEEN | SPADES, KING | SPADES), STRAIGHT_FLUSH);
		test(deck(THREE | CLUBS, TWO | CLUBS, FOUR | CLUBS, ACE | CLUBS, FIVE | CLUBS), STRAIGHT_FLUSH);
	}

	function testFourOfAKind() public {
		test(deck(ACE | HEARTS, ACE | DIAMONDS, ACE | CLUBS, ACE | SPADES, QUEEN | HEARTS), FOUR_OF_A_KIND);
		test(deck(ACE | HEARTS, QUEEN | DIAMONDS, QUEEN | CLUBS, QUEEN | SPADES, QUEEN | HEARTS), FOUR_OF_A_KIND);
		test(deck(ACE | HEARTS, TWO | DIAMONDS, TWO | CLUBS, TWO | SPADES, TWO | HEARTS), FOUR_OF_A_KIND);
	}

	function testFullHouse() public {
		test(deck(TWO | CLUBS, TWO | HEARTS, FIVE | HEARTS, FIVE | DIAMONDS, FIVE | SPADES), FULL_HOUSE);
	}

	function testFlush() public {
		test(deck(KING | HEARTS, ACE | HEARTS, THREE | HEARTS, FIVE | HEARTS, SIX | HEARTS), FLUSH);
		test(deck(SEVEN | DIAMONDS, ACE | DIAMONDS, QUEEN | DIAMONDS, TWO | DIAMONDS, TEN | DIAMONDS), FLUSH);
		test(deck(ACE | CLUBS, THREE | CLUBS, FOUR | CLUBS, FIVE | CLUBS, SIX | CLUBS), FLUSH);
		test(deck(QUEEN | SPADES, JACK | SPADES, TEN | SPADES, NINE | SPADES, THREE | SPADES), FLUSH);
	}

	function testStraight() public {
		test(deck(ACE | SPADES, TWO | SPADES, THREE | SPADES, FOUR | HEARTS, FIVE | HEARTS), STRAIGHT);
		test(deck(FIVE | CLUBS, SIX | HEARTS, SEVEN | HEARTS, EIGHT | SPADES, NINE | DIAMONDS), STRAIGHT);
		test(deck(TEN | CLUBS, JACK | HEARTS, QUEEN | CLUBS, KING | CLUBS, ACE | CLUBS), STRAIGHT);
	}

	function testThreeOfAKind() public {
		test(deck(TWO | SPADES, KING | HEARTS, KING | DIAMONDS, THREE | SPADES, KING | SPADES), THREE_OF_A_KIND);
	}

	function testTwoPair() public {
		test(deck(TWO | SPADES, TWO | HEARTS, KING | DIAMONDS, THREE | SPADES, KING | SPADES), TWO_PAIR);
	}

	function testJacksOrBetter() public {
		test(deck(ACE | SPADES, TWO | HEARTS, KING | DIAMONDS, THREE | SPADES, KING | SPADES), JACKS_OR_BETTER);
	}

	function testNone() public {
		test(deck(ACE | SPADES, TWO | HEARTS, TWO | DIAMONDS, JACK | HEARTS, QUEEN | HEARTS), 0);
		test(deck(TEN | SPADES, JACK | SPADES, QUEEN | SPADES, KING | SPADES, TEN | CLUBS), 0);
	}

}
