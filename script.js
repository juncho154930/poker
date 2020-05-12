// 11=jack, 12=q, 13=k, 14=A
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var suits = ['H', 'S', 'C', 'D'];

var countHands = 0;
var myHand = [];

var cardOnTable = [];

var deltHands = false;
var flopped = false;
var turned = false;
var rivered = false;

//pick a random card
function pickACard() {
	let card = [];

	card[0] = numbers[Math.floor(Math.random() * 12) + 1];
	card[1] = suits[Math.floor(Math.random() * 3) + 1];
	
	return card;
}

function getTwoCards () {
	// if(pickACard()[0] > 10 && pickACard()[0] > 10) {
	// 	alert('play this hand')
	// }
	// console.log('hands: ' + ++countHands);
	if(!deltHands){
		myHand[0] = pickACard();
		myHand[1] = pickACard();
		console.log('myHand: ' + myHand);
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

function showHands() {
	console.log('myHand: ' + myHand + ' card on table: ' + cardOnTable);
	// check did we get a winning
	// need to make sure we only get top 5 cards

	// check for straight flush
	// check for 4 of a kind - done
	// check for full house - done
	// check for flush
	// check for straight
	// check for three of a kind - done
	// check for 2 pair - done
	// check for pair - done
	let allCards = myHand.concat(cardOnTable); // allcards = AC
	let ACNumbers = [];
	let ACSuits = [];

	console.log('allcards: ' + allCards);
	allCards.forEach(function (card, i) {
		// put all numbers into 1 array
		ACNumbers[i] = card[0];
		// put all suits into 1 array
		ACSuits[i] = card[1];
	});

	// temp set array
	// ACNumbers = [1, 4, 3, 3, 5, 1, 6];

	ACNumbers = ACNumbers.sort(function(a, b){return a-b});
	ACSuits = ACSuits.sort();
	console.log(ACNumbers);
	console.log(ACSuits);

	var biggestCard = ACNumbers.slice(-1).pop();
	var countCardOccurance = 1;
	
	var uniqueACNumbers = [];
	var pairedCards = [];

	var biggestHand = 'High Card: ' + biggestCard;
	var hasThree = false;
	var hasTwo = false;

	$.each(ACNumbers, function(i, el){
	    if($.inArray(el, uniqueACNumbers) === -1) uniqueACNumbers.push(el);
	});

	function getOccurrence(array, value) {
	    var count = 0;
	    array.forEach((v) => (v === value && count++));
	    return count;
	}
	uniqueACNumbers.forEach(function (num, i) {
		var cardOccurance = getOccurrence(ACNumbers, num);
		if(cardOccurance >= countCardOccurance) {
			countCardOccurance = cardOccurance
			biggestCard = num;
			if(cardOccurance == 4){
				biggestHand = 'Four of a kind';
			}
			else if(cardOccurance == 3){
				biggestHand = 'Three of a kind';
			}
			else if(cardOccurance == 2){
				biggestHand = 'Two of a kind';
				if(hasTwo) {
					biggestHand = 'Two Pair';
				}
			}
		}
		
		if(cardOccurance == 2) hasTwo = true;
		if(cardOccurance == 3) hasThree = true;
		if(cardOccurance > 1) {
			pairedCards[i] = [num, cardOccurance];
		}
	})
	if(countCardOccurance < 4 && hasTwo && hasThree) {
		biggestHand = 'Full house';		
	}
	console.log('pairedCards: ' + pairedCards);
	console.log('cardOccurance: ' + countCardOccurance + ' biggestCard: ' + biggestCard + ' biggestHand: ' + biggestHand);
}
// cardread=0
// cardread2=0
// for (i++ i<10) {
// 	cardsave=ACNumbers[i]
// 	y=0
// 	z=0
// 	for (y<10,y++) {
// 	  if (cardsave==ACNumbers[y]) {
// 	  	++
// 	  	cardread=cardsave
// 	  }







