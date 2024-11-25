package utils

import (
	"strconv"

	"golang.org/x/exp/constraints"
)

func ReverseIntArray(numbers []int) []int {
	newNumbers := make([]int, len(numbers))
	for i, j := 0, len(numbers)-1; i <= j; i, j = i+1, j-1 {
		newNumbers[i], newNumbers[j] = numbers[j], numbers[i]
	}
	return newNumbers
}

func ReverseString(input string) string {
	runes := []rune(input)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func StringToIntArray(arr []string) ([]int, error) {
	mappedArr := make([]int, 0, len(arr))
	for _, entry := range arr {
		mappedEntry, err := strconv.Atoi(entry)
		if err != nil {
			return mappedArr, err
		}
		mappedArr = append(mappedArr, mappedEntry)
	}
	return mappedArr, nil
}

type Number interface {
	constraints.Integer | constraints.Float
}

func Sum[T Number](args ...T) T {
	var sum T
	for _, valueInt := range args {
		sum += valueInt
	}
	return sum
}

func Min[T constraints.Ordered](args ...T) T {
	min := args[0]
	for _, x := range args {
		if x < min {
			min = x
		}
	}
	return min
}

func Max[T constraints.Ordered](args ...T) T {
	max := args[0]
	for _, x := range args {
		if x > max {
			max = x
		}
	}
	return max
}
