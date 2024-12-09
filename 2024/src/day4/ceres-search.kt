package day4

import utils.Puzzle
import kotlin.math.abs

class CeresSearch(day: Int) : Puzzle(day) {
    override fun solvePuzzleOne(file: List<String>) {
        val verticalLines = getVerticals(file)

        val numDiagonals = file.size + verticalLines.size - 1
        val diagonalsFalling = getDiagonalFalling(file, numDiagonals)
        val diagonalsRising = getDiagonalRising(file, numDiagonals)

        val occurrences = getOccurrences(file) +
                getOccurrences(verticalLines) +
                getOccurrences(diagonalsFalling) +
                getOccurrences(diagonalsRising)

        println("Occurrences: $occurrences")
    }

    private fun getDiagonalFalling(file: List<String>, numDiagonals: Int): List<String> {
        val diagonals = List(numDiagonals) { "" }.toMutableList()

        for ((row, line) in file.withIndex()) {
            for (col in line.indices) {
                var diagonalIndex = col - row
                if (diagonalIndex < 0) {
                    diagonalIndex = line.length - 1 + abs(diagonalIndex)
                }
                diagonals[diagonalIndex] = diagonals[diagonalIndex] + line[col]
            }

        }
        return diagonals
    }

    private fun getDiagonalRising(horizontals: List<String>, numDiagonals: Int): List<String> {
        val diagonals = List(numDiagonals) { "" }.toMutableList()

        for ((row, line) in horizontals.withIndex()) {
            for (col in line.indices) {
                val diagonalIndex = col + row
                diagonals[diagonalIndex] = diagonals[diagonalIndex] + line[col]
            }

        }
        return diagonals
    }

    private fun getVerticals(file: List<String>): List<String> {
        val verticalLines = List(file[0].length) { "" }.toMutableList()
        for (line in file) {
            for (i in line.indices) {
                verticalLines[i] = verticalLines[i] + line[i]
            }
        }
        return verticalLines
    }

    private fun searchCodeword(line: String): Int {
        val xmas = Regex("XMAS")
        return xmas.findAll(line + line.reversed()).count()
    }

    private fun getOccurrences(grid: List<String>): Int {
        var occurrences = 0
        for (line in grid) {
            occurrences += searchCodeword(line)
        }
        return occurrences
    }

    override fun solvePuzzleTwo(file: List<String>) {
        var occurrences = 0
        for (lines in file.asSequence().windowed(3, 1)) {
            for ((j, entries) in lines[1].asSequence().windowed(3, 1).withIndex()) {
                if (entries[1] == 'A') {
                    val topLeft = lines[0][j]
                    val topRight = lines[0][j + 2]
                    val bottomLeft = lines[2][j]
                    val bottomRight = lines[2][j + 2]
                    val charArr = charArrayOf(topLeft, topRight, bottomLeft, bottomRight)
                    if (charArr.count { it == 'M' } == 2 && charArr.count { it == 'S' } == 2) {
                        // also check if characters are not opposite of each other
                        if (topLeft != bottomRight && topRight != bottomLeft) {
                            occurrences += 1
                        }
                    }
                }
            }
        }
        println("\nOccurrences: $occurrences")
    }
}

fun main() {
    CeresSearch(4).solve()
}