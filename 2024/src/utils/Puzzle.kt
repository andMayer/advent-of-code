package utils

abstract class Puzzle(
    day: Int,
    path: String = "2024/src/day",
    testFilename: String = "test.txt",
    puzzleFileName: String = "puzzle.txt"
) {
    private var testFile: List<String> = readFile(path + "$day/" + testFilename)
    private var puzzleFile: List<String> = readFile(path + "$day/" + puzzleFileName)

    protected abstract fun solvePuzzleOne(file: List<String>): Int
    protected abstract fun solvePuzzleTwo(file: List<String>): Int

    fun solve(runTest: Boolean = true, runPuzzle: Boolean = true) {
        if (runTest) {
            println("Solving example:")
            println("Part One: ${solvePuzzleOne(testFile)}")
            println("Part Two: ${solvePuzzleTwo(testFile)}")
        }
        if (runPuzzle) {
            println("\nSolving puzzle input:")
            println("Part One: ${solvePuzzleOne(puzzleFile)}")
            println("Part Two: ${solvePuzzleTwo(puzzleFile)}")
        }
    }
}