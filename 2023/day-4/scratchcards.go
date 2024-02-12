package main

import (
	"aoc-2023/utils"
	"fmt"
	"math"
	"slices"
	"strings"
)

func main() {
	// lines := utils.ReadFile("./test-input.txt")
	lines := utils.ReadFile("./puzzle-input.txt")

	solvePartOne(lines)
	solvePartTwo(lines)
}

func solvePartOne(lines []string) {
	var totalPoints float64

	for _, line := range lines {
		card := strings.Split(line, ": ")
		numbers := strings.Split(card[1], " | ")

		winningNumbers := strings.Split(numbers[0], " ")
		myNumbers := strings.Split(numbers[1], " ")

		matchingNumbers := 0
		for _, myNumber := range myNumbers {
			if len(myNumber) > 0 {
				isWinningNumber := slices.Contains(winningNumbers, myNumber)
				if isWinningNumber {
					matchingNumbers += 1
				}
			}
		}

		var points float64
		if matchingNumbers > 0 {
			points = math.Pow(2, float64(matchingNumbers-1))
		}

		totalPoints += points
	}
	fmt.Println("Your pile of scratchcards is worth: ", totalPoints)
}

func solvePartTwo(lines []string) {
	scratchcards := make([]int, len(lines))

	for cardNumber, line := range lines {
		card := strings.Split(line, ": ")
		numbers := strings.Split(card[1], " | ")

		winningNumbers := strings.Split(numbers[0], " ")
		myNumbers := strings.Split(numbers[1], " ")

		// add original card
		scratchcards[cardNumber] = scratchcards[cardNumber] + 1

		matchingNumbers := 0
		for _, myNumber := range myNumbers {
			if len(myNumber) > 0 {
				isWinningNumber := slices.Contains(winningNumbers, myNumber)
				if isWinningNumber {
					matchingNumbers += 1
					// add copies
					scratchcards[cardNumber+matchingNumbers] = scratchcards[cardNumber+matchingNumbers] + scratchcards[cardNumber]
				}
			}
		}
	}

	fmt.Println("Scratchcards: ", scratchcards)
	fmt.Println("Total number of scratchcards: ", utils.Sum(scratchcards...))
}
