const { syncReadFile } = require("../utils/fileReader");
const sectionAssignmentPairs = syncReadFile("./section-assignment-pairs.txt");

let fullyContainedPairs = 0;
let someOverlap = 0;
let noOverlaps = 0;

sectionAssignmentPairs.forEach((pair) => {
  const [elf1, elf2] = pair.split(",");

  const [start1, end1] = elf1.split("-").map((num) => parseInt(num));
  const [start2, end2] = elf2.split("-").map((num) => parseInt(num));

  if (
    (start1 >= start2 && end1 <= end2) ||
    (start2 >= start1 && end2 <= end1)
  ) {
    fullyContainedPairs += 1;
  } else if (
    (start1 <= end2 && end1 >= start2) ||
    (end1 >= start2 && start1 <= end2)
  ) {
    someOverlap += 1;
  }

  if (start2 > end1 || end2 < start1) {
    noOverlaps += 1;
  }
});

console.log("Number of pairs", sectionAssignmentPairs.length);

console.log(
  "Number of pairs that fully contain anothers assigments:",
  fullyContainedPairs
);
console.log(
  "Number of pairs with overlapping assigments:",
  fullyContainedPairs + someOverlap,
  sectionAssignmentPairs.length - noOverlaps // alternative
);
console.log("Number of pairs with no overlapping assigments:", noOverlaps);
