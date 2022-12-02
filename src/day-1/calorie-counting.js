const { readFileSync, promises: fsPromises } = require("fs");

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
}

const lines = syncReadFile("./elf-inventory.txt");

const elfCalories = [];
let calorieSum = 0;

lines.forEach((line) => {
  if (line.length === 0) {
    elfCalories.push(calorieSum);
    calorieSum = 0;
  } else {
    calorieSum += parseInt(line);
  }
});

// sort descending
elfCalories.sort((a, b) => b - a);

console.log("Top elf calories:", elfCalories[0]);

const numberOfElves = 3;
const topElves = elfCalories.splice(0, numberOfElves);
const sum = topElves.reduce((prev, cur) => prev + cur, 0);
console.log(`Sum of top ${numberOfElves} elves:`, sum);
