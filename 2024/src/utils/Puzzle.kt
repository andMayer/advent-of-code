package utils

abstract class Puzzle(dir: String, testFilename: String = "test.txt", puzzleFileName: String = "puzzle.txt") {

    private var testFile: List<String> = readFile(dir + testFilename)
    private var puzzleFile: List<String> = readFile(dir + puzzleFileName)

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