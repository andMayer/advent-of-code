const { syncReadFile } = require("../utils/fileReader");
const cargo = syncReadFile("./cargo.txt");

function getTopOfStacks(crateMoverModel = 9000) {
  const stacks = {};

  cargo.forEach((line) => {
    if (line.includes("[")) {
      line.split("").forEach((char, index) => {
        if (char.match(/[a-z]/i)) {
          const stackIndex = Math.floor(index / 4) + 1;
          stacks[stackIndex] = [char, ...(stacks[stackIndex] || [])];
        }
      });
    }

    if (line.startsWith("move")) {
      const [quantity, fromStack, toStack] = line.match(/\d+/g);
      const currentStack = [...stacks[fromStack]];

      let movingItems = currentStack.splice(currentStack.length - quantity);
      if (crateMoverModel === 9000) {
        movingItems = movingItems.reverse();
      }
      stacks[toStack] = [...stacks[toStack], ...movingItems];
      stacks[fromStack] = currentStack;
    }
  });

  let topOfStacks = "";
  Object.entries(stacks).forEach(([stackIndex, stack]) => {
    topOfStacks += stack.at(-1);
  });
  return topOfStacks;
}

console.log("Top of stacks for crateModel 9000:", getTopOfStacks()); // ZSQVCCJLL
console.log("Top of stacks for crateModel 9001:", getTopOfStacks(9001)); // QZFJRWHGS
