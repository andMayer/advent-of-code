const { syncReadFile } = require("../utils/fileReader");

function getSignalStrength(program, numSamples = 6) {
  // countains Xth cylce to read the signal strength
  const samples = [20];
  for (let i = 1; i < numSamples; i++) {
    samples.push(samples.at(-1) + 40);
  }

  let cycle = 0;
  let register = 1;
  const signalStrengths = [];
  const crt = [];
  const crtWidth = 40;
  let crtLine = 0;

  function doCycle(numCicles) {
    for (let i = 0; i < numCicles; i++) {
      drawOnCrt();
      cycle += 1;
      if (samples.includes(cycle)) {
        signalStrengths.push(cycle * register);
      }
    }
  }

  function drawOnCrt() {
    const crtPosition = cycle % crtWidth;
    if (cycle > 0 && crtPosition === 0) {
      crtLine += 1;
    }
    if (!crt[crtLine]) {
      crt[crtLine] = [];
    }
    const pixelToDraw = isCycleInRegisterRange() ? "#" : ".";
    crt[crtLine][crtPosition] = pixelToDraw;
  }

  function isCycleInRegisterRange() {
    const crtPosition = cycle % crtWidth;
    return (
      crtPosition === register - 1 ||
      crtPosition === register ||
      crtPosition === register + 1
    );
  }

  program.forEach((operation) => {
    const [instruction, rawValue] = operation.split(" ");

    if (instruction === "noop") {
      doCycle(1);
    } else if (instruction === "addx") {
      const value = parseInt(rawValue);
      doCycle(2);
      register += value;
    }
  });

  console.log(`Meassured signal strenghts: ${signalStrengths}`);
  const sum = signalStrengths.reduce((acc, cur) => acc + cur, 0);
  console.log(`Sum of meassured signal strenghts: ${sum}`);
  console.log(
    `Programm finished after ${cycle} cycles, register is ${register}`
  );

  console.log("\nOutput of the crt:\n");
  crt.forEach((line) => {
    console.log(line.join(""));
  });
}

const exampleCycle = syncReadFile("./example-cycle.txt");
const puzzleCylce = syncReadFile("./puzzle-cycle.txt");

getSignalStrength(puzzleCylce); // 13680
getSignalStrength(puzzleCylce); // PZGPKPEB
