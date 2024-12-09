package day3

import utils.Puzzle

class MullItOver(day: Int) : Puzzle(day) {
    override fun solvePuzzleOne(file: List<String>) {
        var result = 0
        val regex = Regex("mul\\((\\d+),(\\d+)\\)")
        for (line in file) {
            val matches = regex.findAll(line)
            for (match in matches) {
                result += match.groupValues[1].toInt() * match.groupValues[2].toInt()
            }
        }
        println("Sum of multiplications: $result")
    }

    override fun solvePuzzleTwo(file: List<String>) {
        var result = 0
        val multiplications = Regex("mul\\((\\d+),(\\d+)\\)")
        val doConditions = Regex("do\\(\\)")
        val dontConditions = Regex("don't\\(\\)")

        val oneLiner = file.joinToString("")

        val matches = multiplications.findAll(oneLiner)
        var cacheIndex = 0

        for (match in matches) {
            val startIndex = match.range.first
            val sequence = oneLiner.substring(cacheIndex, startIndex)
            val allowed = doConditions.findAll(sequence)
            val disallowed = dontConditions.findAll(sequence)

            var validMatch = true
            if (disallowed.any()) {
                validMatch = false
                cacheIndex = disallowed.last().range.first

                if (allowed.any()) {
                    if (allowed.last().range.first > disallowed.last().range.first) {
                        validMatch = true
                        cacheIndex = match.range.last
                    }
                }
            }

            if (validMatch) {
                result += match.groupValues[1].toInt() * match.groupValues[2].toInt()
            }
        }

        println("Sum of enabled multiplications: $result")
    }
}

fun main() {
    MullItOver(3).solve()
}