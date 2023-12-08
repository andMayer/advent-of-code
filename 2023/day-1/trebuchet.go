package main

import (
	"aoc-2023/utils"
	"log"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	var lines = utils.ReadFile("./puzzle-input.txt")

	solvePartOne(lines)
	solvePartTwo(lines)
}

func solvePartOne(lines []string) {
	var sum = 0
	for _, line := range lines {
		re := regexp.MustCompile("[0-9]")
		allDigits := re.FindAllString(line, len(line))
		firstDigit := allDigits[0]
		lastDigit := allDigits[len(allDigits)-1]
		calibrationValue, _ := strconv.Atoi(firstDigit + lastDigit)
		sum += calibrationValue
	}
	log.Println("Sum of calibration values is: ", sum)
}

func solvePartTwo(lines []string) {
	writtenNumbers := map[string]string{
		"one":   "1",
		"two":   "2",
		"three": "3",
		"four":  "4",
		"five":  "5",
		"six":   "6",
		"seven": "7",
		"eight": "8",
		"nine":  "9",
	}

	var sum = 0
	for _, line := range lines {
		re := regexp.MustCompile("[0-9]")
		allDigits := re.FindAllString(line, len(line))

		firstDigit := allDigits[0]
		firstDigitIndex := strings.Index(line, firstDigit)

		lastDigit := allDigits[len(allDigits)-1]
		lastDigitIndex := strings.LastIndex(line, lastDigit)

		for writtenNumber, writtenDigit := range writtenNumbers {
			firstWrittenNumberIndex := strings.Index(line, writtenNumber)
			if firstWrittenNumberIndex >= 0 && firstWrittenNumberIndex < firstDigitIndex {
				firstDigit = writtenDigit
				firstDigitIndex = firstWrittenNumberIndex
			}

			lastWrittenNumberIndex := strings.LastIndex(line, writtenNumber)
			if lastWrittenNumberIndex > lastDigitIndex {
				lastDigit = writtenDigit
				lastDigitIndex = lastWrittenNumberIndex
			}
		}
		calibrationValue, _ := strconv.Atoi(firstDigit + lastDigit)
		sum += calibrationValue

		log.Println(line, firstDigit, lastDigit)
	}
	log.Println("Sum of calibration values is: ", sum)
}
