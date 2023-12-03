const { syncReadFile } = require("../utils/fileReader");
const forestFile = syncReadFile("./forest.txt");

const forest = [];
const treeVisibility = [];

// quickly seperate the trees in each row
forestFile.forEach((row) => {
  forest.push(row.split("").map((treeHeight) => parseInt(treeHeight)));
  treeVisibility.push([]);
});

let numVisibleTrees = 0;

// top left to bottom right
let highestTreesInRow = [];
let highestTreesInColumn = [];

for (let i = 0; i < forest.length; i++) {
  for (let j = 0; j < forest[i].length; j++) {
    const tree = forest[i][j];

    let treeIsVisible = false;

    // tree is part of outer border
    if (
      i === 0 ||
      i === forest.length - 1 ||
      j === 0 ||
      j === forest[i].length - 1
    ) {
      treeIsVisible = true;
    }

    // check if tree is visible from the left side
    if (tree > highestTreesInRow[i] || highestTreesInRow[i] === undefined) {
      highestTreesInRow[i] = tree;
      treeIsVisible = true;
    }

    // check if tree is visible from the top side
    if (
      tree > highestTreesInColumn[j] ||
      highestTreesInColumn[j] === undefined
    ) {
      highestTreesInColumn[j] = tree;
      treeIsVisible = true;
    }

    treeVisibility[i][j] = treeIsVisible;
  }
}

// bottom right to top left
highestTreesInRow = [];
highestTreesInColumn = [];

for (let i = forest.length - 1; i >= 0; i--) {
  for (let j = forest[i].length - 1; j >= 0; j--) {
    const tree = forest[i][j];

    let treeIsVisible = false;

    // check if tree is visible from the right side
    if (tree > highestTreesInRow[i] || highestTreesInRow[i] === undefined) {
      highestTreesInRow[i] = tree;
      treeIsVisible = true;
    }

    // check if tree is visible from the bottom side
    if (
      tree > highestTreesInColumn[j] ||
      highestTreesInColumn[j] === undefined
    ) {
      highestTreesInColumn[j] = tree;
      treeIsVisible = true;
    }

    treeVisibility[i][j] = treeVisibility[i][j] || treeIsVisible;

    if (treeVisibility[i][j]) {
      numVisibleTrees += 1;
    }
  }
}

let bestScenicScore = 0;

for (let i = 0; i < forest.length; i++) {
  for (let j = 0; j < forest[i].length; j++) {
    const up = getLineOfSightUp(i, j);
    const left = getLineOfSightLeft(i, j);
    const right = getLineOfSightRight(i, j);
    const down = getLineOfSightDown(i, j);

    const score = up * left * right * down;
    if (score > bestScenicScore) {
      bestScenicScore = score;
    }
  }
}

function getLineOfSightUp(row, column) {
  let sight = 0;
  if (row > 0) {
    for (let i = row - 1; i >= 0; i--) {
      sight += 1;
      if (forest[i][column] >= forest[row][column]) {
        return sight;
      }
    }
  }
  return sight;
}

function getLineOfSightDown(row, column) {
  let sight = 0;
  if (row < forest.length - 1) {
    for (let i = row + 1; i <= forest.length - 1; i++) {
      sight += 1;
      if (forest[i][column] >= forest[row][column]) {
        return sight;
      }
    }
  }
  return sight;
}

function getLineOfSightLeft(row, column) {
  let sight = 0;
  if (column > 0) {
    for (let i = column - 1; i >= 0; i--) {
      sight += 1;
      if (forest[row][i] >= forest[row][column]) {
        return sight;
      }
    }
  }
  return sight;
}

function getLineOfSightRight(row, column) {
  let sight = 0;
  if (column < forest[row].length - 1) {
    for (let i = column + 1; i <= forest[row].length - 1; i++) {
      sight += 1;
      if (forest[row][i] >= forest[row][column]) {
        return sight;
      }
    }
  }
  return sight;
}

console.log("Number of trees that are visible from outside: ", numVisibleTrees); // 1715
console.log("Tree with the highest scenic score: ", bestScenicScore); // 374400
