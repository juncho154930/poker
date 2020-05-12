// check for duplicate cards

// allow to pick your own hands
// allow to pick cards on table
// calculate chances of winning with variable amount of people
// how much to bet call raise or fold




// 10=jack, 11=q, 12=k, 13=A
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var suits = ['H', 'S', 'C', 'D'];

var countHands = 0;
var myHand = [];

var cardOnTable = [];

var deltHands = false;
var flopped = false;
var turned = false;
var rivered = false;

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

//pick a random card
function pickACard() {
	// check for duplicate cards
	let card = [];

	card[0] = numbers[Math.floor(Math.random() * 12) + 1];
	card[1] = suits[Math.floor(Math.random() * 3) + 1];
	
	return card;
}

function getTwoCards () {
	if(!deltHands){
		myHand[0] = pickACard();
		myHand[1] = pickACard();
		console.log('myHand:');
		console.log(myHand[0]);
		console.log(myHand[1]);
		deltHands = true;
	} else {
		console.log('you already have cards');
	}
	
}

function dealNextCards() {
	if(rivered) {
		showHands();
	}
	else if(turned) {
		console.log('river!');
		console.log(cardOnTable[4] = pickACard());
		rivered = true;
	}
	else if(flopped) {
		console.log('turn!');
		console.log(cardOnTable[3] = pickACard());
		turned = true;
	}
	else if(deltHands) {
		console.log('flop!');
		console.log(cardOnTable[2] = pickACard());
		console.log(cardOnTable[1] = pickACard());
		console.log(cardOnTable[0] = pickACard());
		flopped = true;
	} 
	else {
		console.log('needs to deal hands first');
	}
}

function winningHand(){
	// check of the players who won
	return 'me';
}

function showHands() {
	let allCards = myHand.concat(cardOnTable); // allcards = AC
	let ACNumbers = [];
	let ACSuits = [];

	// allCards = [[9,'S'],[9,'S'],[12, "C"],[13, "S"],[7, "C"],[4, "C"],[13, "D"]]

	// console.log('allcards: ' + allCards);
	allCards.forEach(function (card, i) {
		// put all numbers into 1 array
		ACNumbers[i] = card[0];
		// put all suits into 1 array
		ACSuits[i] = card[1];
	});

	// temp set array
	// ACNumbers = [2, 3, 4, 5, 6, 8, 12];
    // ACSuits = ['H', 'H', 'H', 'H', 'H', 'H', 'H'];

	ACNumbers = ACNumbers.sort(function(a, b){return a-b});
	ACSuits = ACSuits.sort();
	// console.log(ACNumbers);
	
	var uniqueACNumbers = [];
	var uniqueACSuits = [];
	var pairedCards = [];

	var biggestCard = ACNumbers.slice(-1).pop();
	var countCardOccurance = 1;
	var biggestHand = 'High Card: ' + biggestCard;
	var hasThree = false;
	var hasTwo = false;
	var flushSuit = false;
	var hasFullHouse = false;
	var highestStraight = 0; // 0 is also false

	$.each(ACNumbers, function(i, el){
	    if($.inArray(el, uniqueACNumbers) === -1) uniqueACNumbers.push(el);
	});
	$.each(ACSuits, function(i, el){
	    if($.inArray(el, uniqueACSuits) === -1) uniqueACSuits.push(el);
	});

	function checkHighestStraightLength(arr, i){
		// i should be highest number first
		let length = 0;
		if (arr[i] - 1 == arr[i-1]) {
			length = checkHighestStraightLength(arr, i-1);
			length++;
		}
		return length;
	}
	// console.log(uniqueACNumbers);
	//check for straight when ace 2, 3, 4, 5
	if(uniqueACNumbers.includes('13') && 
		uniqueACNumbers.includes('1') && 
		uniqueACNumbers.includes('2') && 
		uniqueACNumbers.includes('3') && 
		uniqueACNumbers.includes('4')) {
		// in this case ace is used as '1' and is the LOWEST card and highest is '5'
		highestStraight = '4';
		biggestCard = highestStraight;
		biggestHand = 'Straight';
	}
	uniqueACNumbers.forEach(function (num, i) {
		//check for straight
		if(checkHighestStraightLength(uniqueACNumbers, i) >= 4) {
			if(num > highestStraight){
				highestStraight = num;
				biggestCard = highestStraight;
				biggestHand = 'Straight';
			}
		}
		var cardOccurance = getOccurrence(ACNumbers, num);
		if(cardOccurance >= countCardOccurance) {
			countCardOccurance = cardOccurance
			if(cardOccurance == 4){
				biggestHand = 'Four of a kind';
				biggestCard = num;
			}
			else if(cardOccurance == 3 && !flushSuit && !highestStraight){
				biggestHand = 'Three of a kind';
				biggestCard = num;
				if(hasThree) {
					hasFullHouse = true;
				}
			}
			else if(cardOccurance == 2 && !flushSuit && !highestStraight){
				biggestHand = 'Two of a kind';
				biggestCard = num;
				if(hasTwo) {
					biggestHand = 'Two Pair';
					biggestCard = num;
				}
			}
		}
		if(cardOccurance == 2) hasTwo = true;
		if(cardOccurance == 3) hasThree = true;
		if(cardOccurance > 1) {
			pairedCards.push([num, cardOccurance]);
		}
	})
	// flush beats straight
	var cardsNumsWithFlush = [];
	ACSuits.forEach(function (suit, i) {
		var suitOccurance = getOccurrence(ACSuits, suit);
		if(suitOccurance >= 5 && countCardOccurance != 4) {
			flushSuit = suit;
			biggestHand = 'Flush';
			biggestCard = 0; //reset biggest card to find biggestCard in flush in the next function
		}
	})
	allCards.forEach(function(card, i) {
		if(card[1] == flushSuit){
			cardsNumsWithFlush.push(card[0]);
			if(card[0] > biggestCard) {
				biggestCard = card[0];
			}
		} 
	})
	// FH beats flush and straight
	if(countCardOccurance != 4 && 
		(hasFullHouse || (hasTwo && hasThree))) {
		biggestHand = 'Full house';		
	}
	//straight flush
	if(highestStraight && flushSuit) {
		var highestStraightFlush = 0;
		cardsNumsWithFlush.forEach(function (card, i) {
			if(checkHighestStraightLength(cardsNumsWithFlush, i) >= 4) {
				if(card > highestStraightFlush){
					highestStraightFlush = card;
					biggestCard = highestStraightFlush;
					biggestHand = 'Straight Flush';
				}
			}
		})
	}
	// console.log('pairedCards: ' + pairedCards);
	console.log('cardOccurance: ' + countCardOccurance);
	console.log('biggestCard: ' + biggestCard + ' biggestHand: ' + biggestHand);
}







