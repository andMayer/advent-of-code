package day6

import utils.Puzzle

enum class FieldType(val id: Char) {
    OBSTACLE('#'),
    GUARD('^'),
    FREE('.'),
    VISITED('X'),
    LOOP_OBSTACLE('O'),
}

enum class Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

open class Field(var x: Int = 0, var y: Int = 0, var fieldType: FieldType = FieldType.FREE) {
    fun setPosition(x: Int, y: Int) {
        this.x = x
        this.y = y
    }

    override fun toString(): String {
        return "($x,$y)"
    }
}

class Guard(x: Int = 0, y: Int = 0, var direction: Direction = Direction.NORTH) : Field(x, y, FieldType.GUARD) {
    val path = mutableListOf<Guard>()
}

class Lab(private val width: Int, private val height: Int) {
    private val fields = mutableListOf<Field>()
    private var guard = Guard()

    init {
        for (y in 0 until height) {
            for (x in 0 until width) {
                fields.add(Field(x, y))
            }
        }
    }

    private fun getField(x: Int, y: Int): Field? {
        return fields.find { it.x == x && it.y == y }
    }

    fun getVisitedFields(): Int {
        return fields.count { it.fieldType == FieldType.VISITED }
    }

    fun addObstacle(x: Int, y: Int) {
        getField(x, y)!!.fieldType = FieldType.OBSTACLE
    }

    fun setGuardPosition(x: Int, y: Int) {
        guard.setPosition(x, y)
    }

    fun setLoopObstruction(x: Int, y: Int) {
        getField(x, y)!!.fieldType = FieldType.LOOP_OBSTACLE
    }

    fun moveGuard(): Boolean {
        while (isGuardInside()) {
            val targetPosition = getTargetPosition()
            if (canGuardMove(targetPosition)) {
                moveGuard(targetPosition)
            } else {
                turnGuard()
            }
            if (isGuardLooping()) {
                return true
            }
        }
        return false
    }

    private fun isGuardLooping(): Boolean {
        return guard.path.any { it.x == guard.x && it.y == guard.y && it.direction == guard.direction }
    }

    private fun moveGuard(targetPosition: Field?) {
        getField(guard.x, guard.y)!!.fieldType = FieldType.VISITED
        if (targetPosition != null) {
            guard.path.add(Guard(guard.x, guard.y, guard.direction))
            guard.setPosition(targetPosition.x, targetPosition.y)
        } else {
            guard.setPosition(-1, -1)
        }
    }

    private fun turnGuard() {
        when (guard.direction) {
            Direction.NORTH -> guard.direction = Direction.EAST
            Direction.EAST -> guard.direction = Direction.SOUTH
            Direction.SOUTH -> guard.direction = Direction.WEST
            Direction.WEST -> guard.direction = Direction.NORTH
        }
    }

    private fun getTargetPosition(): Field? {
        return when (guard.direction) {
            Direction.NORTH -> getField(guard.x - 1, guard.y)
            Direction.EAST -> getField(guard.x, guard.y + 1)
            Direction.SOUTH -> getField(guard.x + 1, guard.y)
            Direction.WEST -> getField(guard.x, guard.y - 1)
        }
    }

    /** Checks whether the guard is positioned within the lab boundaries */
    private fun isGuardInside(): Boolean {
        return (guard.x in 0..<width) && (guard.y in 0..<height)
    }

    private fun canGuardMove(targetPosition: Field?): Boolean {
        return targetPosition == null || (targetPosition.fieldType != FieldType.OBSTACLE && targetPosition.fieldType != FieldType.LOOP_OBSTACLE)
    }
}

class GuardGallivant(day: Int) : Puzzle(day) {
    override fun solvePuzzleOne(file: List<String>): Int {
        val lab = parseInput(file)
        lab.moveGuard()
        return lab.getVisitedFields()
    }

    override fun solvePuzzleTwo(file: List<String>): Int {
        var loopsCreated = 0

        // brute force lol
        file.forEachIndexed { i, line ->
            line.forEachIndexed { j, field ->
                if (field != FieldType.OBSTACLE.id && field != FieldType.GUARD.id) {
                    val lab = parseInput(file)
                    lab.setLoopObstruction(i, j)
                    if (lab.moveGuard()) {
                        loopsCreated++
                    }
                }
            }
        }
        return loopsCreated
    }

    private fun parseInput(file: List<String>): Lab {
        assert(file.isNotEmpty())
        val lab = Lab(file[0].length, file.size)

        file.forEachIndexed { i, line ->
            line.forEachIndexed { j, field ->
                when (field) {
                    FieldType.OBSTACLE.id -> lab.addObstacle(i, j)
                    FieldType.GUARD.id -> lab.setGuardPosition(i, j)
                }
            }
        }
        return lab
    }

}


fun main() {
    GuardGallivant(6).solve()
}