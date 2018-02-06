
// // Varible Declarations
// --------------------------------------------------------------------------------------
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];

var names = ["cecil", "cid", "edward", "kain", "terra", "celes", "locke", "edgar", "sabin", "cloud", "yuffie", "tifa", "barret", "aeris", "squall", "rinoa", "edea", "tidus", "yuna", "wakka", "rikku", "paine", "claire", "hope", "serah", "ramza", "chocobo"];

hints = ["Main protagonist of Final Fantasy IV", "Master engineer who designs airships", "Crown prince of Damcyan", "He is a Dragoon from the kingdom of Baron", "Heroine of Final Fantasy VI", "A genetically enhanced Magitek Knight", "Prefers to be called a treasure hunter", "The young king of Figaro Castle", "Edgar's twin brother", "Former member of SOLDIER", "Wields a large shuriken", "She is a member of resistance group AVALANCHE", "Leader of an eco-terrorist group", "She is the last of the Cetra", "SeeD mercenary", "Daughter of Galbadia's military commander", "Possessed by Ultimecia", "Blitzball player from Zanarkand", "Daughter of High Summoner Braska", "One of Yuna's guardians in Final Fantasy X", "A young Al Bhed girl", "One-handed sword and a lukewarm attitude", "She is known to others simply as 'Lightning'", "Director of the research institute called the Academy", "First Pulse l'Cie in Cocoon", "Member of the respected House Beoulve", "A breed of flightless birds"];

var wordHolder = "";
var numOfLetters = [];
var numBlank = 0;
var blanksAndLetters = []; // C _ C _ L eg Cecil
var incorrect = [];

var wins = 0;
var losses = 0;
var guessesRemaining = 0;

// 	var messages = {
// 			start: "Press the Enter key to get Started...",
// 			hint:  "hintIndex"
// 	};


// Functions
// --------------------------------------------------------------------------------------

function startTheGame() {
	wordHolder = names[Math.floor(Math.random() * names.length)];
	numOfLetters = wordHolder.split("");
	numBlank = numOfLetters.length;


	// resets
	guessesRemaining = 9;
	incorrect = [];
	blanksAndLetters = [];


	for (var i = 0; i < numBlank; i++) {
		blanksAndLetters.push("_");
	}

	document.getElementById("display").innerHTML = blanksAndLetters.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesRemaining;

	// Console tests
	console.log(wordHolder);
	console.log(numOfLetters);
	console.log(numBlank);
	console.log(blanksAndLetters);
};

function checkLetter(letter) {
	// if exists
	var isInWord = false;
	for (var i = 0; i < numBlank; i++) {
		if(wordHolder[i] == letter) {
			isInWord = true;
		}
	}

	if(isInWord){
		for (var i = 0; i < numBlank; i++) {
			if(wordHolder[i] == letter) {
				blanksAndLetters[i] = letter;
			}
		}
	}else {
		incorrect.push(letter);
		guessesRemaining--;
	}
	// testing
	console.log(blanksAndLetters);
}

function roundAndRound() {
	console.log("Wins: " + wins + " | Losses: " + losses + " | Guesses Left " + guessesRemaining);

	document.getElementById("display").innerHTML = blanksAndLetters.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesRemaining;
	document.getElementById("incorrect").innerHTML = incorrect.join(" ");

	/// is winner
	if(numOfLetters.toString() == blanksAndLetters.toString()) {
		wins++;
		alert("winner!");

		document.getElementById("winCounter").innerHTML = wins;

		startTheGame();
	}
	
	/// is loser
		else if(guessesRemaining == 0) {
			losses++;
			alert("bummer, man... Try again?");

			document.getElementById("lossCounter").innerHTML = losses;
			
			animate();

			startTheGame();
		}
}

	

// Process
// --------------------------------------------------------------------------------------

// starts the game
startTheGame();

// "on" click
// create keyboard buttons
for (var i = 0; i < alphabet.length; i++) {
	var letterBtn = $("<button>");
	letterBtn.addClass("letter-button letter btn-link letter-button-color");
	letterBtn.attr("data-alphabet", alphabet[i]);
	letterBtn.text(alphabet[i]);
	$("#keyboard").append(letterBtn);
}

// letter buttons 'on-click'

//  option 1
// $('.letter-button').on("click", function (e) {
// 	var letterGuessed = String.fromCharCode(e.keyCode).toLowerCase();
// 	// letterGuessed.text($(this).attr("data-alphabet"));
// 	checkLetter(letterGuessed);
// 	roundAndRound();

// 	// testing
// 	console.log(letterGuessed);
// });

// option 2
// document.onclick = function(e) {
// 	var letterGuessed = String.fromCharCode(e.keyCode).toLowerCase();
// 	checkLetter(letterGuessed);
// 	roundAndRound();

// 	// testing
// 	console.log(letterGuessed);
// }

// "onKeyUp"
document.onkeyup = function(e) {
	var letterGuessed = String.fromCharCode(e.keyCode).toLowerCase();

	checkLetter(letterGuessed);
	roundAndRound();

	canvas();

	// testing
	console.log(letterGuessed);
}

// // Hint
	// var getHint = document.getElementById("hint");

	// hint.onclick = function () {
	// 	var hintIndex = indexOf(names);
	// 	showClue.innerHTML = hints[hintIndex];
	// };

	// Animate man
	var animate = function () {
		var drawMe = guessesRemaining;
		drawArray[drawMe]();
	}

	// Hangman
	canvas = function () {

		myStickman = document.getElementById("doomTrain");
		context = myStickman.getContext('2d');
		context.beginPath();
		context.strokeStyle = "#fff";
		context.lineWidth = 2;
	};

	head = function () {
		myStickman = document.getElementById("doomTrain");
		context = myStickman.getContext('2d');
		context.beginPath();
		context.arc(60, 25, 10, 0, Math.PI * 2, true);
		context.stroke();
	}

	draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

		context.moveTo($pathFromx, $pathFromy);
		context.lineTo($pathTox, $pathToy);
		context.stroke();
	}

	frame1 = function () {
		draw(0, 150, 150, 150);
	};

	frame2 = function () {
		draw(10, 0, 10, 600);
	};

	frame3 = function () {
		draw(0, 5, 70, 5);
	};

	frame4 = function () {
		draw(60, 5, 60, 15);
	};

	torso = function () {
		draw(60, 36, 60, 70);
	};

	rightArm = function () {
		draw(60, 46, 100, 50);
	};

	leftArm = function () {
		draw(60, 46, 20, 50);
	};

	rightLeg = function () {
		draw(60, 70, 100, 100);
	};

	leftLeg = function () {
		draw(60, 70, 20, 100);
	};

	drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];




