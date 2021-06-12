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

const vowels = ["A","E","I","O","U","a","e","i","o","u"];

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

function scrabbleScore (word){
  word = word.toLowerCase();
  let points = 0;
  for(i = 0; i<word.length; i++){
    points = points + newPointStructure[word[i]];
  }
  return points;
  //return console.log(`Score for '${word}':  ${score}`);;
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

function simpleScore(word) {
  let points = 0;
 	for (let i = 0; i < word.length; i++) {
 	  	if(word[i] === ' '){
         points = points + 0;
       } else{
         points = points +1;
       }
	  }
	return points;
  //return console.log(`Score for '${word}':  ${points}`);
 }

//let simpleScore = simpleScore (initialPrompt());


function vowelBonusScore (word){
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
   //return console.log(`Score for '${word}':  ${points}`);
   return points;
}

let simple = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: function (word){return simpleScore(word);}
  /*scoringFunction: function (word){
      let points = 0;
 	    for (let i = 0; i < word.length; i++) {
 	  	if(word[i] === ' '){
         points = points + 0;
       } else{
         points = points +1;
       }
	  }
    return points;
  //return console.log(`Score for '${word}':  ${points}`);
  }*/
};

let vowelBonus = {
  name: "Bonus Vowels",
  description:"Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: function (word){return vowelBonusScore(word);}
 /*scoringFunction: function (word){
   let points = 0;
  //word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
 	  	if (vowels.includes(word[i]) ) {
        points = points + 3;
       } else if (word[i] === ' ') {
         points = points + 0;
       } else {
          points = points + 1;
       }
	 }
   return points;
   //return console.log(`Score for '${word}':  ${points}`);
 }*/
};

let scrabble = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  //scorerFunction: function (word){return oldScrabbleScorer (word)}
  scoringFunction: function (word){
    //console.log(word)
   // console.log(scrabbleScorer(word));
    return scrabbleScore(word);
   /* word = word.toLowerCase();
    let points = 0;
   for(i = 0; i<word.length; i++){
    points = points + newPointStructure[word[i]];
    }
    return points;
    //return console.log(`Score for '${word}':  ${points}`);;*/
  }
};

const scoringAlgorithms = [simple,vowelBonus,scrabble];
//console.log(scoringAlgorithms[2].scorerFunction("jupiter"));

function scorerPrompt(word) {

  let scoreType = input.question("Which scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ");

    while (isNaN(scoreType) || scoreType > 2 || scoreType < 0 ){
      scoreType = input.question("\nWhich scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ");
    }
  
  //console.log(scoringAlgorithms[scoreType].scorerFunction(word));
   scoringAlgorithms[scoreType].scoringFunction(word);
   return console.log(`Score for '${word}': ${scoringAlgorithms[scoreType].scoringFunction(word)}`)
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

