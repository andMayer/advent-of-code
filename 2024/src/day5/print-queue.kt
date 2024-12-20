package day5

import utils.Puzzle

/**
 * A rule defines that page1 always needs to be printed before page2
 */
data class Rule(val page1: Int, val page2: Int)

class RuleSet {
    /** Set of all rules */
    private val rules = mutableSetOf<Rule>()

    /** Defines a list of pages that are not allowed to be printed after the key page */
    private val bannedOrders: MutableMap<Int, List<Int>> = mutableMapOf()

    private fun addRule(rule: Rule) {
        rules.add(rule)

        val banList = bannedOrders.getOrDefault(rule.page2, listOf())
        bannedOrders[rule.page2] = (banList + rule.page1)
    }

    fun addRule(rule: String) {
        val (page1, page2) = rule.split("|").map { it.toInt() }
        addRule(Rule(page1, page2))
    }

    fun getAllBannedOrders(): MutableMap<Int, List<Int>> {
        return bannedOrders
    }

    fun getBannedOrders(keyPage: Int): List<Int> {
        return bannedOrders.getOrDefault(keyPage, listOf())
    }
}

class PageUpdate {
    private val pageUpdate: List<Int>

    constructor(pageProduction: String) {
        pageUpdate = pageProduction.split(",").map { it.toInt() }
    }

    private constructor(pageUpdate: List<Int>) {
        this.pageUpdate = pageUpdate
    }

    fun getMiddlePage(): Int {
        return pageUpdate[(pageUpdate.size / 2)]
    }

    fun getPages(): List<Int> {
        return pageUpdate
    }

    fun getSwapped(i: Int, j: Int): PageUpdate {
        val swapList = pageUpdate.toMutableList()
        swapList[i] = swapList[j].also { swapList[j] = swapList[i] }
        return PageUpdate(swapList)
    }

    override fun toString(): String {
        return pageUpdate.joinToString(",")
    }
}

class Printer(private val ruleSet: RuleSet) {
    private val validPages = mutableListOf<PageUpdate>()
    private val invalidPages = mutableListOf<PageUpdate>()

    fun checkOrder(pageUpdate: PageUpdate) {
        val pages = pageUpdate.getPages()
        pages.forEachIndexed { i, page ->
            run {
                val remainingPages = pages.subList(i + 1, pages.size)
                val bannedOrder = ruleSet.getBannedOrders(page)

                if (remainingPages.any { bannedOrder.contains(it) }) {
                    invalidPages.add(pageUpdate)
                    return
                }
            }
        }
        validPages.add(pageUpdate)
    }

    fun getValidPageUpdates(): MutableList<PageUpdate> {
        return validPages
    }

    fun getInvalidPageUpdates(): MutableList<PageUpdate> {
        return invalidPages
    }

    fun getMiddlePageSum(pages: List<PageUpdate>): Int {
        return pages.sumOf { it.getMiddlePage() }
    }

    fun getFixedPageUpdates(): List<PageUpdate> {
        return invalidPages.map { applyRules(it) }
    }

    private fun applyRules(pageUpdate: PageUpdate): PageUpdate {
        val pages = pageUpdate.getPages()
        pages.forEachIndexed { i, page ->
            run {
                val remainingPages = pages.subList(i + 1, pages.size)
                val bannedOrder = ruleSet.getBannedOrders(page)

                val bannedIndex =
                    remainingPages.indexOfFirst { remainingPage -> bannedOrder.find { remainingPage == it } != null }
                if (bannedIndex >= 0) {
                    val swappedPageUpdate = pageUpdate.getSwapped(i, bannedIndex + i + 1)
                    return applyRules(swappedPageUpdate)
                }
            }
        }
        return pageUpdate
    }
}


class PrintQueue(day: Int) : Puzzle(day) {
    override fun solvePuzzleOne(file: List<String>): Int {
        val printer = parseFile(file)
        return printer.getMiddlePageSum(printer.getValidPageUpdates())
    }

    override fun solvePuzzleTwo(file: List<String>): Int {
        val printer = parseFile(file)
        return printer.getMiddlePageSum(printer.getFixedPageUpdates())
    }

    private fun parseFile(file: List<String>): Printer {
        val ruleSet = RuleSet()
        val printer = Printer(ruleSet)

        file.forEach { line ->
            if (line.contains("|")) {
                ruleSet.addRule(line)
            } else {
                printer.checkOrder(PageUpdate(line))
            }
        }
        return printer
    }

}

fun main() {
    PrintQueue(5).solve()
}