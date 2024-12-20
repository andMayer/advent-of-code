package day5

import utils.Puzzle

/**
 * A rule defines that page1 always needs to be printed before page2
 */
data class Rule(val page1: Int, val page2: Int)

class RuleSet {
    /** Set of all rules */
    val rules = mutableSetOf<Rule>()

    /** Defines a list of pages that are not allowed to be printed after the key page */
    var bannedOrders: MutableMap<Int, List<Int>> = mutableMapOf()

    private fun addRule(rule: Rule) {
        rules.add(rule)

        val banList = bannedOrders.getOrDefault(rule.page2, listOf())
        bannedOrders[rule.page2] = (banList + rule.page1)
    }

    fun addRule(rule: String) {
        val (page1, page2) = rule.split("|").map { it.toInt() }
        addRule(Rule(page1, page2))
    }
}

class PageUpdate(pageProduction: String) {
    private val pageUpdate: List<Int> = pageProduction.split(",").map { it.toInt() }

    fun getMiddlePage(): Int {
        return pageUpdate[(pageUpdate.size / 2)]
    }

    fun getPages(): List<Int> {
        return pageUpdate
    }
}

class Printer(private val ruleSet: RuleSet) {
    val validPages = mutableListOf<PageUpdate>()
    private val invalidPages = mutableListOf<PageUpdate>()

    fun checkOrder(pageUpdate: PageUpdate) {
        val pages = pageUpdate.getPages()
        pages.forEachIndexed { i, page ->
            run {
                val remainingPages = pages.subList(i + 1, pages.size)
                val bannedOrder = ruleSet.bannedOrders.getOrDefault(page, listOf())

                if (remainingPages.any { bannedOrder.contains(it) }) {
                    invalidPages.add(pageUpdate)
                    return
                }
            }
        }
        validPages.add(pageUpdate)
    }

    fun fixInvalidOrders() {

    }

    fun getMiddlePageSum(pages: List<PageUpdate>): Int {
        return pages.sumOf { it.getMiddlePage() }
    }

    fun printPages() {
        println("Number of valid updates: ${validPages.size}")
        println(validPages.joinToString { it.getPages().toString() })
        println("Valid updates - sum of middle pages: ${getMiddlePageSum(validPages)}")

        println("Number of invalid updates: ${invalidPages.size}")
        println(invalidPages.joinToString { it.getPages().toString() })
        println("Invalid updates - sum of middle pages: ${getMiddlePageSum(invalidPages)}")
    }
}


class PrintQueue(day: Int) : Puzzle(day) {

    override fun solvePuzzleOne(file: List<String>) {
        val ruleSet = RuleSet()
        var printer: Printer? = null

        file.forEach { line ->
            if (line.contains("|")) {
                ruleSet.addRule(line)
            } else {
                if (printer == null) {
                    printer = Printer(ruleSet)
                }
                printer?.checkOrder(PageUpdate(line))
            }
        }
        printer?.printPages()
    }

    override fun solvePuzzleTwo(file: List<String>) {
        /** Requires puzzle part One to solve part Two */
//        printer.fixInvalidOrders()
    }

}

fun main() {
    PrintQueue(5).solve()
}