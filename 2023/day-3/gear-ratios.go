package main

import (
	"aoc-2023/utils"
	"fmt"
	"strconv"
	"unicode"
)

func main() {
	// lines := utils.ReadFile("./test-input.txt")
	lines := utils.ReadFile("./puzzle-input.txt")

	solvePartOne(lines)
	solvePartTwo(lines)
}

func solvePartOne(lines []string) {
	var prevLine, nextLine string
	var sumPartNumbers int

	for index, line := range lines {
		if index == 0 {
			prevLine = ""
			nextLine = lines[index+1]
		} else if index == len(lines)-1 {
			prevLine = lines[index-1]
			nextLine = ""
		} else {
			prevLine = lines[index-1]
			nextLine = lines[index+1]
		}

		partNumber := ""
		partOfEngine := false

		for pos, char := range line {
			if unicode.IsNumber(char) {
				partNumber += string(char)
				if !partOfEngine {
					partOfEngine = isAdjacentToSymbol(pos, prevLine, line, nextLine)
				}

				// is last char in line
				if (pos == (len(line) - 1)) && partOfEngine {
					realPartNumber, _ := strconv.Atoi(partNumber)
					sumPartNumbers += realPartNumber
				}

			} else {
				if partOfEngine {
					realPartNumber, _ := strconv.Atoi(partNumber)
					sumPartNumbers += realPartNumber
				}

				partNumber = ""
				partOfEngine = false
			}
		}

	}
	println("Sum of all of the part numbers in the engine schematic:", sumPartNumbers)
}

func isAdjacentToSymbol(pos int, prevLine, currentLine, nextLine string) bool {
	neighbours := ""

	minIndex := pos - 1
	if pos == 0 {
		minIndex = pos
	} else {
		neighbours += string(currentLine[minIndex])
	}

	maxIndex := pos + 1
	if pos == len(currentLine)-1 {
		maxIndex = pos
	} else {
		neighbours += string(currentLine[maxIndex])
	}

	if len(prevLine) > 0 {
		neighbours += prevLine[minIndex : maxIndex+1]
	}
	if len(nextLine) > 0 {
		neighbours += nextLine[minIndex : maxIndex+1]
	}

	for _, char := range neighbours {
		if !(unicode.IsNumber(char) || char == '.') {
			return true
		}
	}
	return false
}

func solvePartTwo(lines []string) {
	potentialGears := []Star{}

	for i, line := range lines {
		minI := i
		if i > 0 {
			minI = i - 1
		}
		maxI := i
		if i < len(lines)-1 {
			maxI = i + 1
		}

		partNumber := ""
		adjacentStars := []Star{}

		for j, char := range line {
			minJ := j
			if j > 0 {
				minJ = j - 1
			}
			maxJ := j
			if j < len(line)-1 {
				maxJ = j + 1
			}

			if unicode.IsNumber(char) {
				partNumber += string(char)
				addNewStars(&adjacentStars, lines, minI, maxI, minJ, maxJ)
				// fmt.Printf("%v\n", stars)

				// is last in line
				if j == maxJ && len(adjacentStars) > 0 {
					addStarPartNumber(adjacentStars, partNumber)
					mergeStars(&potentialGears, adjacentStars)
					partNumber = ""
					adjacentStars = []Star{}
				}
			} else {
				if len(partNumber) > 0 && len(adjacentStars) > 0 {
					addStarPartNumber(adjacentStars, partNumber)
					mergeStars(&potentialGears, adjacentStars)
				}
				partNumber = ""
				adjacentStars = []Star{}
			}
		}
	}

	sumGearRatio := 0

	for _, potentialGear := range potentialGears {
		if len(potentialGear.partNumbers) == 2 {
			partNumber1, _ := strconv.Atoi(potentialGear.partNumbers[0])
			partNumber2, _ := strconv.Atoi(potentialGear.partNumbers[1])
			gearRatio := partNumber1 * partNumber2
			sumGearRatio += gearRatio
		}
	}

	fmt.Println("Sum of gear ratio:", sumGearRatio)
}

type Star struct {
	i, j        int
	partNumbers []string
}

func containsStar(stars []Star, star Star) bool {
	for _, s := range stars {
		if s.i == star.i && s.j == star.j {
			return true
		}
	}
	return false
}

/**
 * Adds new stars to the existing star list if adjacent to a part number.
 */
func addNewStars(stars *[]Star, lines []string, minI, maxI, minJ, maxJ int) {
	for i := minI; i <= maxI; i++ {
		for j := minJ; j <= maxJ; j++ {
			if lines[i][j] == '*' {
				star := Star{i, j, []string{}}
				if !containsStar(*stars, star) {
					*stars = append(*stars, star)
				}
			}
		}
	}
}

func addStarPartNumber(stars []Star, partNumber string) {
	for i := range stars {
		star := &stars[i]
		star.partNumbers = append(star.partNumbers, partNumber)
	}
}

func mergeStars(potentialGears *[]Star, stars []Star) {
	potentialGearsValue := *potentialGears

	for i := range stars {
		star := &stars[i]
		mergedStar := false
		for j := range potentialGearsValue {
			potentialGear := &potentialGearsValue[j]
			if star.i == potentialGear.i && star.j == potentialGear.j {
				potentialGear.partNumbers = append(potentialGear.partNumbers, star.partNumbers...)
				mergedStar = true
			}
		}
		if !mergedStar {
			*potentialGears = append(*potentialGears, *star)
		}
	}
}
