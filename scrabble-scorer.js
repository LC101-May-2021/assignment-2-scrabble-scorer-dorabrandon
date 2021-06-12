// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(oldPointingSystem) {
  let newStructure = { };
  for (item in oldPointingSystem){
    for(i=0; i<oldPointingSystem[item].length;i++){
      let letter = oldPointingSystem[item][i].toLowerCase();
      newStructure[letter] = Number(item);
    }
  }
 // console.log(newStructure);
  return newStructure;
}

let newPointStructure = transform (oldPointStructure);
//console.log(newPointStructure);
newPointStructure[' '] = 0;
//console.log(newPointStructure);

function scrabbleScorer (word){
  word = word.toLowerCase();
  let score = 0;
  for(i = 0; i<word.length; i++){
    score = score + newPointStructure[word[i]];
  }
  return console.log(`Score for '${word}':  ${score}`);;
}

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]/;
function initialPrompt() {
   let userWord = input.question("Let's play some scrabble! \n \nEnter a word to score: ");
   while (specialChars.test(userWord)){
      userWord = input.question("Let's play some scrabble! \n \nEnter a word to score: ");
    }
   return userWord;
};

function simple(word) {
  let points = 0;
 	for (let i = 0; i < word.length; i++) {
 	  	if(word[i] === ' '){
         points = points + 0;
       } else{
         points = points +1;
       }
	  }
	//return points;
  return console.log(`Score for '${word}':  ${points}`);
 }

//let simpleScore = simpleScore (initialPrompt());
let vowels = ["A","E","I","O","U","a","e","i","o","u"];

function bonusVowels (word){
  let points = 0;
  //word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
 	  	if ( vowels.includes(word[i]) ) {
        points = points + 3;
       } else if (word[i] === ' ') {
         points = points + 0;
       } else {
          points = points + 1;
       }
	 }
   return console.log(`Score for '${word}':  ${points}`);
   //return points;
}

let simpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: function (word){return simple(word);}
};

let vowelBonusScore = {
  name: "Bonus Vowels",
  description:"Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: function (word){return bonusVowels(word);}
};

let scrabbleScore = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  //scorerFunction: function (word){return oldScrabbleScorer (word)}
  scorerFunction: function (word){
    //console.log(word)
   // console.log(scrabbleScorer(word));
    return scrabbleScorer(word);
    }
};

const scoringAlgorithms = [simpleScore,vowelBonusScore,scrabbleScore];
//console.log(scoringAlgorithms[2].scorerFunction("jupiter"));

function scorerPrompt(word) {

  let scoreType = input.question("Which scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ");

    while (isNaN(scoreType) || scoreType > 2 || scoreType < 0 ){
      scoreType = input.question("\nWhich scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ");
    }
  
  //console.log(scoringAlgorithms[scoreType].scorerFunction(word));
  return scoringAlgorithms[scoreType].scorerFunction(word);
}
/*
function transform(oldPointingSystem) {
  let newStructure = { };
  for (item in oldPointingSystem){
    for(i=0; i<oldPointingSystem[item].length;i++){
      let letter = oldPointingSystem[item][i].toLowerCase();
      newStructure[letter] = Number(item);
    }
  }
 // console.log(newStructure);
  return newStructure;
}

let newPointStructure = transform (oldPointStructure);
//console.log(newPointStructure);
newPointStructure[' '] = 0;
//console.log(newPointStructure);

function scrabbleScorer (word){
  word = word.toLowerCase();
  let score = 0;
  for(i = 0; i<word.length; i++){
    score = score + newPointStructure[word[i]];
  }
  return score;
}
//console.log(scrabbleScorer("Jupiter"));
*/
function runProgram() {
   //initialPrompt();
   //console.log(oldScrabbleScorer (initialPrompt()));
   //console.log(simple(initialPrompt()));
   //console.log(bonusVowels(initialPrompt()));
   scorerPrompt(initialPrompt());
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

