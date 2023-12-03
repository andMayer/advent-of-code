// Opponent (1st colomn) = A, B, C
// Response (2nd column) = X, Y, Z
// A = X = Rock = 1pt
// B = Y = Paper = 2pt
// C = Z = Scissors = 3pt

// loose = 0pt
// draw = 3pt
// win = 6pt

// score:
// selected shape + outcome of the round

const { syncReadFile } = require("../utils/fileReader");

const strategies = syncReadFile("./strategy-guide.txt");

let score = 0;

// first part challange
// strategies.forEach((strategy) => {
//   const [opponentShape, playerShape] = strategy.split(" ");
//   if (playerShape === "X") {
//     score += 1;
//   } else if (playerShape === "Y") {
//     score += 2;
//   } else if (playerShape === "Z") {
//     score += 3;
//   }

//   if (
//     (playerShape === "X" && opponentShape === "A") ||
//     (playerShape === "Y" && opponentShape === "B") ||
//     (playerShape === "Z" && opponentShape === "C")
//   ) {
//     score += 3;
//   } else if (
//     (playerShape === "X" && opponentShape === "C") ||
//     (playerShape === "Y" && opponentShape === "A") ||
//     (playerShape === "Z" && opponentShape === "B")
//   ) {
//     score += 6;
//   } else {
//     score += 0;
//   }
// });

// console.log(score);

// second challange
// X = loose = 0 pt
// Y = draw = 3 pt
// z = win = 6 pt
strategies.forEach((strategy) => {
  const [opponentShape, playerShape] = strategy.split(" ");
  if (playerShape === "X") {
    if (opponentShape === "A") {
      score += 3;
    } else if (opponentShape === "B") {
      score += 1;
    } else if (opponentShape === "C") {
      score += 2;
    }
  } else if (playerShape === "Y") {
    score += 3;
    if (opponentShape === "A") {
      score += 1;
    } else if (opponentShape === "B") {
      score += 2;
    } else if (opponentShape === "C") {
      score += 3;
    }
  } else if (playerShape === "Z") {
    score += 6;
    if (opponentShape === "A") {
      score += 2;
    } else if (opponentShape === "B") {
      score += 3;
    } else if (opponentShape === "C") {
      score += 1;
    }
  }
});

console.log(score);
