package main

import (
	"aoc-2023/utils"
	"fmt"
	"strings"
)

func main() {
	// lines := utils.ReadFile("./test-input.txt")
	lines := utils.ReadFile("./puzzle-input.txt")

	solvePartOne(lines)
	solvePartTwo(lines)
}

func solvePartOne(lines []string) {
	var seedNumbers []int
	almanac := make(map[string][][]int)
	steps := make([]string, 0)
	var mappingId string

	for _, line := range lines {
		if strings.Contains(line, "map:") {
			mappingId = strings.Split(line, " ")[0]
			steps = append(steps, mappingId) // assuming steps are in correct order
		} else if strings.Contains(line, ":") {
			seeds := strings.Split(line, ": ")
			seedNumbers, _ = utils.StringToIntArray(strings.Split(seeds[1], " "))
		} else if len(line) > 0 && len(mappingId) > 0 {
			mappings, _ := utils.StringToIntArray(strings.Split(line, " "))
			destinationStart, sourceStart, rangeLength := mappings[0], mappings[1], mappings[2]
			rangeMapping := []int{sourceStart, sourceStart + rangeLength - 1, destinationStart, destinationStart + rangeLength - 1}
			almanac[mappingId] = append(almanac[mappingId], rangeMapping)
		}
	}

	categoryMapping := make([]int, len(seedNumbers))
	copy(categoryMapping, seedNumbers)

	for _, step := range steps {
		for i, category := range categoryMapping {
			categoryMapping[i] = getMapping(almanac[step], category)
		}
	}

	// 265018614
	fmt.Println("Lowest location of seeds: ", utils.Min(categoryMapping...))
}

func getMapping(mapping [][]int, category int) int {
	result := category
	for _, entry := range mapping {
		if category >= entry[0] && category <= entry[1] {
			result = category - entry[0] + entry[2]
		}
	}
	return result
}

func solvePartTwo(lines []string) {
	var seedNumbers [][]int
	almanac := make(map[string][][]int)
	steps := make([]string, 0)
	var mappingId string

	for _, line := range lines {
		if strings.Contains(line, "map:") {
			mappingId = strings.Split(line, " ")[0]
			steps = append(steps, mappingId) // assuming steps are in correct order
		} else if strings.Contains(line, ":") {
			seeds := strings.Split(line, ": ")
			seedRanges, _ := utils.StringToIntArray(strings.Split(seeds[1], " "))

			for i := 0; i < len(seedRanges); i = i + 2 {
				seedNumbers = append(seedNumbers, []int{seedRanges[i], seedRanges[i] + seedRanges[i+1] - 1})
			}

		} else if len(line) > 0 && len(mappingId) > 0 {
			mappings, _ := utils.StringToIntArray(strings.Split(line, " "))
			destinationStart, sourceStart, rangeLength := mappings[0], mappings[1], mappings[2]
			rangeMapping := []int{sourceStart, sourceStart + rangeLength - 1, destinationStart, destinationStart + rangeLength - 1}
			almanac[mappingId] = append(almanac[mappingId], rangeMapping)
		}
	}

	categoryMapping := make([][]int, len(seedNumbers))
	copy(categoryMapping, seedNumbers)

	fmt.Println("ranges", categoryMapping)

	for _, step := range steps {
		fmt.Println(step, almanac[step])
		// for _, category := range categoryMapping {
		// }
	}

	// 79753136 (too high)
	// fmt.Println("Lowest location of seeds in range: ", utils.Min(categoryMapping...))
}

// func getLowestMappingsOfRanges(mapping [][]int, category []int) int {
// 	result := category
// 	for _, entry := range mapping {
// 		if category[0]+category[1]-1 >= entry[0] || category[0]+category[1]-1 <= entry[1] {
// 			result = category - entry[0] + entry[2]
// 		}
// 	}
// 	return result
// }
