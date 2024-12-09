package utils

abstract class Puzzle(
    day: Int,
    path: String = "2024/src/day",
    testFilename: String = "test.txt",
    puzzleFileName: String = "puzzle.txt"
) {
    private var testFile: List<String> = readFile(path + "$day/" + testFilename)
    private var puzzleFile: List<String> = readFile(path + "$day/" + puzzleFileName)

    protected abstract fun solvePuzzleOne(file: List<String>)
    protected abstract fun solvePuzzleTwo(file: List<String>)

    fun solve(runTest: Boolean = true, runPuzzle: Boolean = true) {
        if (runTest) {
            println("Solving example:")
            solvePuzzleOne(testFile)
            solvePuzzleTwo(testFile)
        }
        if (runPuzzle) {
            println("\nSolving puzzle input:")
            solvePuzzleOne(puzzleFile)
            solvePuzzleTwo(puzzleFile)
        }
    }
}