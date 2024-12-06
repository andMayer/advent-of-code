package utils

import java.io.File

fun readFile(filename: String): List<String> {
    return File(filename).absoluteFile.readLines().filter { it.isNotEmpty() }
}