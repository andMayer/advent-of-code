package utils

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
