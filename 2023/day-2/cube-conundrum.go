package main

import (
	"aoc-2023/utils"
	"strconv"
	"strings"
)

func main() {
	lines := utils.ReadFile("./puzzle-input.txt")

	solvePartOne(lines)
	solvePartTwo(lines)
}

func solvePartOne(lines []string) {
	const maxRed = 12
	const maxGreen = 13
	const maxBlue = 14

	sumGameIds := 0

	for _, line := range lines {
		game := strings.Split(line, ": ")
		gameId, _ := strconv.Atoi(strings.SplitAfter(game[0], "Game ")[1])

		rounds := strings.Split(game[1], "; ")
		validGame := true

		for _, round := range rounds {
			cubes := strings.Split(round, ", ")
			for _, cube := range cubes {
				drawResult := strings.Split(cube, " ")
				numberCubes, _ := strconv.Atoi(drawResult[0])
				cubeColor := drawResult[1]

				if numberCubes > maxBlue {
					validGame = false
				} else if numberCubes > maxGreen && cubeColor != "blue" {
					validGame = false
				} else if numberCubes > maxRed && cubeColor != "green" && cubeColor != "blue" {
					validGame = false
				}
			}
		}

		if validGame {
			sumGameIds += gameId
		}

	}
	println("Sum of game IDs that are possible", sumGameIds)
}

func solvePartTwo(lines []string) {
	sumPower := 0

	for _, line := range lines {
		game := strings.Split(line, ": ")
		// gameId, _ := strconv.Atoi(strings.SplitAfter(game[0], "Game ")[1])

		rounds := strings.Split(game[1], "; ")

		// minimum required number of cubes to play the game
		var minRed, minGreen, minBlue int

		for _, round := range rounds {
			cubes := strings.Split(round, ", ")

			for _, cube := range cubes {
				drawResult := strings.Split(cube, " ")
				numberCubes, _ := strconv.Atoi(drawResult[0])
				cubeColor := drawResult[1]

				if cubeColor == "red" {
					minRed = utils.Max(minRed, numberCubes)
				} else if cubeColor == "green" {
					minGreen = utils.Max(minGreen, numberCubes)
				} else if cubeColor == "blue" {
					minBlue = utils.Max(minBlue, numberCubes)
				}
			}
		}

		power := minRed * minGreen * minBlue
		sumPower += power
	}
	println("Sum of power of sets", sumPower)
}
