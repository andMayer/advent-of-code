const { syncReadFile } = require("../utils/fileReader");

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  moveUp() {
    this.y += 1;
  }

  moveDown() {
    this.y -= 1;
  }

  moveLeft() {
    this.x -= 1;
  }

  moveRight() {
    this.x += 1;
  }

  follow(otherPosition) {
    if (this.getDistance(otherPosition) > 1) {
      if (otherPosition.x < this.x) {
        this.moveLeft();
      }
      if (otherPosition.x > this.x) {
        this.moveRight();
      }
      if (otherPosition.y > this.y) {
        this.moveUp();
      }
      if (otherPosition.y < this.y) {
        this.moveDown();
      }
    }
  }

  getDistance(otherPosition) {
    const xDistance = Math.abs(otherPosition.x - this.x);
    const yDistance = Math.abs(otherPosition.y - this.y);
    return Math.max(xDistance, yDistance);
  }

  equals(otherPosition) {
    return otherPosition.x === this.x && otherPosition.y === this.y;
  }

  getPosition() {
    return new Position(this.x, this.y);
  }
}

/**
 * Lets you iterate pairwise through an array.
 * Callback function has params: currentElement, nextElement, currentIndex, isLastPair
 */
function pairwise(arr, callBack) {
  for (let i = 0; i < arr.length - 1; i++) {
    const isLastPair = i === arr.length - 2;
    callBack(arr[i], arr[i + 1], i, isLastPair);
  }
}

function ropeBridge(numberOfKnots, motions) {
  const knots = [];
  for (let i = 0; i < numberOfKnots; i++) {
    knots.push(new Position(0, 0));
  }
  const head = knots.at(0);
  const tail = knots.at(-1);

  // fields that tail visite
  const tailPositions = [];
  tailPositions.push(tail.getPosition());

  motions.forEach((motion) => {
    const [direction, rawSteps] = motion.split(" ");
    const steps = parseInt(rawSteps);

    for (let i = 0; i < steps; i++) {
      const lastTailPosition = tail.getPosition();

      if (direction === "U") {
        head.moveUp();
      } else if (direction === "D") {
        head.moveDown();
      } else if (direction === "L") {
        head.moveLeft();
      } else if (direction === "R") {
        head.moveRight();
      } else {
        console.log(`Unkown direction '${direction}'`);
      }

      pairwise(knots, (knot, nextKnot, index, isLastPair) => {
        nextKnot.follow(knot);
      });

      if (!lastTailPosition.equals(tail)) {
        const currentTailPosition = tail.getPosition();

        if (
          !tailPositions.find((position) =>
            position.equals(currentTailPosition)
          )
        ) {
          tailPositions.push(currentTailPosition);
        }
      }
    }
  });

  console.log(
    `Rope with ${numberOfKnots} knots, tail visited ${tailPositions.length} unique positions.`
  );
}

const smallMotions = syncReadFile("./example-motions-small.txt");
const largeMotions = syncReadFile("./example-motions-large.txt");
const puzzleMotions = syncReadFile("./puzzle-motions.txt");

const fewKnots = 2;
const manyKnots = 10;

console.log("Using small motion example:");
ropeBridge(fewKnots, smallMotions); // 13
ropeBridge(manyKnots, smallMotions); // 1

console.log("Using large motion example:");
ropeBridge(fewKnots, largeMotions); // 88
ropeBridge(manyKnots, largeMotions); // 36

console.log("Using puzzle motions:");
ropeBridge(fewKnots, puzzleMotions); // 6406
ropeBridge(manyKnots, puzzleMotions); // 2643
