package day1

import utils.Puzzle
import kotlin.math.abs

class HistorianHysteria(day: Int) : Puzzle(day) {
    override fun solvePuzzleOne(file: List<String>): Int {
        val (groupOne, groupTwo) = createGroups(file)
        groupOne.sort()
        groupTwo.sort()

        var totalDistance = 0
        for (i in groupOne.indices) {
            totalDistance += abs(groupOne[i] - groupTwo[i])
        }
        return totalDistance
    }

    override fun solvePuzzleTwo(file: List<String>): Int {
        val (groupOne, groupTwo) = createGroups(file)

        var similarity = 0
        for (i in groupOne) {
            similarity += i * groupTwo.count { it == i }
        }
        return similarity
    }

    private fun createGroups(file: List<String>): Pair<ArrayList<Int>, ArrayList<Int>> {
        val groupOne = ArrayList<Int>()
        val groupTwo = ArrayList<Int>()

        for (line in file) {
            val list = line.trim().split("\\s+".toRegex())
            assert(list.size == 2)

            groupOne.add(list[0].toInt())
            groupTwo.add(list[1].toInt())
        }
        return groupOne to groupTwo
    }
}

fun main() {
    HistorianHysteria(1).solve()
}