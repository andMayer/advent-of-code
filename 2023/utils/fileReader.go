package utils

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func ReadFile(filename string) []string {
    file, err := os.Open(filename)
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

		var lines []string
    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        lines = append(lines, scanner.Text())
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }
		return lines
}

func WriteLines(filename string, lines []string) {
	file, err := os.Create(filename)
	if err != nil {
			log.Fatal(err)
	}
	defer file.Close()

	writer := bufio.NewWriter(file)
	for _, line := range lines {
			fmt.Fprintln(writer, line)
	}

	if err := writer.Flush(); err != nil {
		log.Fatal(err)
	}
}

