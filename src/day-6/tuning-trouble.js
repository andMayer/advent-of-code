const { syncReadFile } = require("../utils/fileReader");
const datastream = syncReadFile("./datastream-buffer.txt");

function findFirstMarker(stream, numDistinctChars) {
  let marker = [];
  let index = 0;

  while (marker.length < numDistinctChars) {
    if (marker.includes(stream[index])) {
      marker = marker.slice(marker.indexOf(stream[index]) + 1);
    }
    marker.push(stream[index]);
    index++;
  }

  return index;
}

console.log("Example 1", findFirstMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14)); // 19
console.log("Example 2", findFirstMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 14)); // 23
console.log("Example 3", findFirstMarker("nppdvjthqldpwncqszvftbrmjlhg", 14)); // 23
console.log(
  "Example 4",
  findFirstMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14)
); // 29
console.log(
  "Example 5",
  findFirstMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14)
); // 26

datastream.forEach((stream) => {
  console.log(
    "First 'start-of-packet' marker after character " +
      findFirstMarker(stream, 4) // 1647
  );
  console.log(
    "First 'start-of-message' marker after character " +
      findFirstMarker(stream, 14) // 2447
  );
});
