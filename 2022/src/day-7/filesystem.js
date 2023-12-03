class File {
  constructor(name, size = 0) {
    this.name = name;
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  print(ident = 0) {
    console.log(
      " ".repeat(ident * 2) + `- ${this.name} (file, size=${this.size})`
    );
  }
}

class Directory extends File {
  constructor(name) {
    super(name, 0);
    this.files = [];
    this.subDirectories = [];
  }

  /**
   * Add a new file to the files list if the name does not exist yet.
   */
  createFile(filename, filesize) {
    if (this.files.some((file) => file.name === filename)) {
      console.log(`File with name '${file.name}' already exists`);
    } else {
      this.files.push(new File(filename, filesize));
    }
  }

  /**
   * Add a new directory to the sub directory list if the name does not exist yet.
   */
  createDirectory(dirName) {
    if (this.subDirectories.some((dir) => dir.name === dirName)) {
      console.log(`Directory with name '${dirName}' already exists`);
    } else {
      this.subDirectories.push(new Directory(dirName));
    }
  }

  /**
   * Returns the directory with the passed name or undefined if no directory exists with that name.
   */
  getDirectory(dirName) {
    const dir = this.subDirectories.find((dir) => dir.name === dirName);
    if (dir === undefined) {
      console.log(
        "Unable to find directory " +
          dirName +
          " in current sub directories" +
          this.subDirectories
      );
    }
    return dir;
  }

  /**
   * Returns a list of all directories and sub directories.
   */
  getAllDirectories() {
    const directories = [...this.subDirectories];
    this.subDirectories.forEach((dir) => {
      directories.push(...dir.getAllDirectories());
    });
    return directories;
  }

  /**
   * Iterates over all files and sub directories to calculate the current size of this dir.
   */
  calculateSize() {
    const totalFileSize = this.files.reduce((acc, file) => {
      return acc + file.getSize();
    }, 0);
    const totalDirSize = this.subDirectories.reduce((acc, dir) => {
      return acc + dir.calculateSize();
    }, 0);
    this.size = totalFileSize + totalDirSize;
    return this.size;
  }

  /**
   * Prints a human readable version of the directory.
   * The get the correct size of the directories `calculateSize()` should be executed first.
   */
  print(ident = 0) {
    console.log(
      " ".repeat(ident * 2) + `- ${this.name} (dir, size=${this.getSize()})`
    );

    this.files.forEach((file) => {
      file.print(ident + 1);
    });
    this.subDirectories.forEach((dir) => {
      dir.print(ident + 1);
    });
  }
}

module.exports = {
  File,
  Directory,
};
