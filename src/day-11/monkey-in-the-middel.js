const { syncReadFile } = require("../utils/fileReader");

class Monkey {
  items = [];
  inspectedItems = 0;
  inspectExpression;
  testConstant;
  positiveTarget;
  negativeTarget;

  /**
   * Monkey takes the first item in his inventory and starts inspecting it.
   * This increases the items worry level.
   */
  inspectNextItem(reliefFactor, commonDivider) {
    const item = this.removeItem();
    this.inspectedItems += 1;
    const evalFunction = this.inspectExpression.replaceAll("old", item);
    const newItem = eval(evalFunction);

    return reliefFactor === 0
      ? newItem % commonDivider
      : Math.floor(newItem / reliefFactor);
  }

  /**
   * Function that check if a the items worry level is divsible by a given number.
   */
  test(worryLevel) {
    return worryLevel % this.testConstant === 0;
  }

  addItem(item) {
    this.items.push(item);
  }

  addItems(items) {
    this.items.push(...items);
  }

  /**
   * Removes first item from list and returns it.
   */
  removeItem() {
    return this.items.shift();
  }

  getThrowTarget(worryLevel) {
    return this.test(worryLevel) ? this.positiveTarget : this.negativeTarget;
  }
}

function getMonkeys(monkeyAttributes) {
  const monkeys = [];
  let monkey;

  function getMonkeyId(searchString) {
    const monkeyNumber = searchString.match(/\d+/);
    return parseInt(monkeyNumber);
  }

  monkeyAttributes.forEach((line) => {
    const attribute = line.trim();

    if (attribute.startsWith("Monkey")) {
      monkey = new Monkey();
      monkeys.push(monkey);
    } else if (attribute.startsWith("Starting items")) {
      const [_, itemString] = attribute.split(": ");
      const items = itemString.split(", ").map((item) => parseInt(item));
      monkey.addItems(items);
    } else if (attribute.startsWith("Operation")) {
      const [_, expression] = attribute.split("= ");
      monkey.inspectExpression = expression;
    } else if (attribute.startsWith("Test")) {
      const [_, constant] = attribute.split("divisible by ");
      monkey.testConstant = parseInt(constant);
    } else if (attribute.startsWith("If true")) {
      monkey.positiveTarget = getMonkeyId(attribute);
    } else if (attribute.startsWith("If false")) {
      monkey.negativeTarget = getMonkeyId(attribute);
    }
  });

  return monkeys;
}

function playMonkeyInTheMiddle(rounds, monkeys, reliefFactor) {
  const commonDivider = monkeys
    .map((monkey) => monkey.testConstant)
    .reduce((res, cur) => res * cur, 1);

  for (let i = 1; i <= rounds; i++) {
    monkeys.forEach((monkey, index) => {
      const numItems = monkey.items.length;
      for (let j = 0; j < numItems; j++) {
        const newItem = monkey.inspectNextItem(reliefFactor, commonDivider);
        const target = monkey.getThrowTarget(newItem);
        monkeys[target].addItem(newItem);
      }
    });
    // if (i % 1000 === 0) {
    //   printMonkeyItems(monkeys, i);
    // }
  }
}

function printMonkeyItems(monkeys, i) {
  console.log("\nround " + i);
  monkeys.forEach((monkey, j) => {
    console.log(
      j + ": " + monkey.items.join(", ") + " (" + monkey.inspectedItems + ")"
    );
  });
}

function getMonkeyBusiness(monkeys) {
  const inspectedItems = monkeys.map((monkey) => monkey.inspectedItems);
  inspectedItems.sort((a, b) => b - a);
  const monkeyBusiness = inspectedItems[0] * inspectedItems[1];
  console.log("Monkey business:", monkeyBusiness);
  return monkeyBusiness;
}

const monkeyAttributes = syncReadFile("./monkey-attributes.txt");
const monkeys = getMonkeys(monkeyAttributes);

playMonkeyInTheMiddle(20, monkeys, 3);
getMonkeyBusiness(monkeys); // 119715
playMonkeyInTheMiddle(10000, monkeys, 0);
getMonkeyBusiness(monkeys); // 18085004878
