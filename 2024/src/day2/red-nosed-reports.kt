package day2

import utils.Puzzle
import kotlin.math.abs

class RedNosedReports(day: Int) : Puzzle(day) {
    override fun solvePuzzleOne(file: List<String>) {
        val validReports = file.fold(0) { acc, it -> acc + getReportValue(it) }
        println("Valid reports: $validReports")
    }

    private fun getReportValue(report: String, useDampener: Boolean = false): Int {
        val levels = report.split(" ").map { it.toInt() }
        return if (isValidReport(levels, useDampener)) 1 else 0
    }

    private fun isValidReport(levels: List<Int>, useDampener: Boolean = false): Boolean {
        val isAscending = levels[0] < levels[1]
        for ((l1, l2) in levels.asSequence().windowed(2, 1)) {
            val diff = abs(l1 - l2)
            if (diff !in 1..3 || (isAscending && l1 > l2) || (!isAscending && l2 > l1)) {
                return useDampener && dampenedReport(levels)
            }
        }
        return true
    }

    private fun dampenedReport(levels: List<Int>): Boolean {
        for (i in levels.indices) {
            val dampenedLevels = levels.filterIndexed { index, _ -> index != i }
            if (isValidReport(dampenedLevels)) {
                return true
            }
        }
        return false
    }

    override fun solvePuzzleTwo(file: List<String>) {
        val validReports = file.fold(0) { acc, it -> acc + getReportValue(it, true) }
        println("Valid reports using dampener: $validReports")
    }
}

fun main() {
    RedNosedReports(2).solve()
}