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

function initialPrompt(word) {
   word = input.question("Let's play some scrabble!\n\nEnter a word: ");

   return word;
};


let simpleScore = function(word){
  let score = word.length;

  return score;
};

let vowelBonusScore = function(word){
  let score = 0;
  let vowelsArray = ['a', 'e', 'i', 'o', 'u'];
  let scoredLetters = [];
  word = word.toLowerCase();
  for(let i = 0; i < word.length; i++){
    for(let j = 0; j < vowelsArray.length; j++){
      if(word[i].includes(vowelsArray[j])){
        score += 3;
        scoredLetters.push(word[i]);
      }
    }
  } 
  for(let i = 0; i < word.length; i++){
    let j = 0;
    while(scoredLetters.length < word.length){
      j++;
      if(!word[i].includes(scoredLetters[j])){
          score += 1;
          scoredLetters.push(word[i]);
      }
    }
  }
  return score;
};

let scrabbleScore = function(word){
  let score = 0;
  for(i = 0; i < word.length; i++){
    for(letter in newPointStructure){
      if(letter.toLowerCase() === word[i].toLowerCase()){
        score += newPointStructure[letter]
      }
    }
  }
  return score;
};

const scoringAlgorithms = [
  simpleScoring = {
    name: 'Simple Score', 
    description: 'Each letter is worth 1 point.', 
    scoringFunction: simpleScore
    },
  bonusVowels = {
    name: 'Bonus Vowels', 
    description: 'Vowels are 3 pts, consonants are 1 pt.', 
    scoringFunction: vowelBonusScore
    },
  scrabble = {
    name: 'Scrabble', 
    description: 'The traditional scoring algorithm.', 
    scoringFunction: scrabbleScore
    }
];


function scorerPrompt(word){
  console.log(`Which scoring algorithm would you like to use?\n`)
  for(let i = 0; i < scoringAlgorithms.length; i++){
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
  }
  let scoringChoice = Number(input.question(`Enter 0, 1, or 2: `));
  return console.log(`Score for '${word}': ${scoringAlgorithms[scoringChoice].scoringFunction(word)}`);
};


function transform(oldPointStructure){
  let newObj = {};
  let groupedLettersArray = [];
  let possiblePoints = [1,2,3,4,5,8,10];

  for(key in oldPointStructure){
    groupedLettersArray.push(oldPointStructure[key])
  }

  for(let i = 0; i < groupedLettersArray.length; i++){
    groupedLettersArray[i] = groupedLettersArray[i].join(',').toLowerCase().split(',')
  }
  
  for(let i = 0; i < groupedLettersArray.length; i++){
    for(let j = 0; j < groupedLettersArray[i].length; j++){
      newObj[groupedLettersArray[i][j]] = possiblePoints[i]
    }
  }
  return newObj;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   scorerPrompt(initialPrompt());
};



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

