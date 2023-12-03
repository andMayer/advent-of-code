const { syncReadFile } = require("../utils/fileReader");
const rucksacks = syncReadFile("./rucksacks.txt");

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const items = alphabet + alphabet.toUpperCase();

let totalPriority = 0;
let totalBadgePriority = 0;
let group = [];

rucksacks.forEach((rucksack, index) => {
  const compartment1 = rucksack.slice(0, rucksack.length / 2);
  const compartment2 = rucksack.slice(rucksack.length / 2);

  const duplicateItem = getDuplicateItem(compartment1, compartment2);
  totalPriority += getItemPriority(duplicateItem);

  group.push(rucksack);
  if ((index + 1) % 3 === 0) {
    const badgeItem = findBadgeItem(...group);
    totalBadgePriority += getItemPriority(badgeItem);
    group = [];
  }
});

console.log("total priority", totalPriority);
console.log("total badge priority", totalBadgePriority);

function findBadgeItem(rucksack1, rucksack2, rucksack3) {
  return rucksack1
    .split("")
    .find((char) => rucksack2.includes(char) && rucksack3.includes(char));
}

function getDuplicateItem(comp1, comp2) {
  let duplicateItem;
  comp1.split("").forEach((item) => {
    if (comp2.includes(item)) {
      duplicateItem = item;
      return;
    }
  });
  return duplicateItem;
}

function getItemPriority(character) {
  return items.indexOf(character) + 1;
}
