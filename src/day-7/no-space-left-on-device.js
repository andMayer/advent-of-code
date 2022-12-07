const { syncReadFile } = require("../utils/fileReader");
const { File, Directory } = require("./filesystem");

const filesystem = syncReadFile("./filesystem.txt");

const rootDir = new Directory("/");
let currentPath = [];

filesystem.forEach((line) => {
  if (line.startsWith("$")) {
    const [dollar, command, argument] = line.split(" ");
    executeCommand(command, argument);
  } else {
    parseOutput(line);
  }
});

function executeCommand(command, argument) {
  if (command === "cd") {
    moveToDirectory(argument);
  } else if (command === "ls") {
    // list file system (actually do nothing)
    // we will parse the next lines that don't start with '$'
  } else {
    console.log("unkown command", command);
  }
}

// we assume that moving through the file system will only happen to exising directories
function moveToDirectory(argument) {
  if (argument === "/") {
    currentPath = [];
  } else if (argument === "..") {
    currentPath.pop();
  } else {
    currentPath.push(argument);
  }
}

// create files or directories
function parseOutput(line) {
  const currentDir = getCurrentDir();

  if (line.startsWith("dir")) {
    const [dir, dirName] = line.split(" ");
    currentDir.createDirectory(dirName);
  } else if (startsWithNumber(line)) {
    const [filesize, filename] = line.split(" ");
    currentDir.createFile(filename, parseInt(filesize));
  } else {
    console.log("unkown list output", line);
  }
}

function getCurrentDir() {
  let currentDir = rootDir;
  currentPath.forEach((dirName) => {
    currentDir = currentDir.getDirectory(dirName);
  });
  return currentDir;
}

function startsWithNumber(str) {
  return /^\d/.test(str);
}

// do once the fileSystem got parsed
rootDir.calculateSize();

// rootDir.print();

const allDirectories = rootDir.getAllDirectories();
const maxSizeLimit = 100000;
const filteredDirectories = allDirectories.filter(
  (dir) => dir.getSize() < maxSizeLimit
);
const totalSum = filteredDirectories.reduce((acc, dir) => {
  return acc + dir.getSize();
}, 0);
console.log(
  `Total sum of directories that are smaller than ${maxSizeLimit}: ${totalSum}` // 2061777
);

const totalDiskSpace = 70000000;
const requiredFreeDiskSpace = 30000000;
const currentlyUsedDiskSpace = rootDir.getSize();
const currentlyUnusedDiskSpace = totalDiskSpace - currentlyUsedDiskSpace;
const requiredSizeToFree = requiredFreeDiskSpace - currentlyUnusedDiskSpace;

console.log("total disk space:", totalDiskSpace);
console.log("required free disk space:", requiredFreeDiskSpace);
console.log("currently used disk space:", currentlyUsedDiskSpace);
console.log("currently unused disk space:", currentlyUnusedDiskSpace);
console.log("required size to free:", requiredSizeToFree);

const smallestDirToDelete = allDirectories.reduce((prevSize, cur) => {
  const dirSize = cur.getSize();
  return dirSize >= requiredSizeToFree && dirSize < prevSize
    ? dirSize
    : prevSize;
}, currentlyUsedDiskSpace); // start maximmal freeable disk space

console.log(
  `Smallest directory that frees enough storage: ${smallestDirToDelete}` // 4473403
);
