package task01

import utils.readInput

enum class Direction {UP, RIGHT, DOWN, LEFT}

class Point(var x:Int, var y:Int) {
    fun goLeft(steps:Int, dir: Direction):Direction =
        when(dir) {
            Direction.UP -> {
                this.x -= steps
                Direction.LEFT
            }
            Direction.DOWN -> {
                this.x += steps
                Direction.RIGHT
            }
            Direction.RIGHT -> {
                this.y += steps
                Direction.UP
            }
            Direction.LEFT -> {
                this.y -= steps
                Direction.DOWN
            }
        }

    fun goRight(steps:Int, dir: Direction):Direction =
        when(dir) {
            Direction.UP -> {
                this.x += steps
                Direction.RIGHT
            }
            Direction.DOWN -> {
                this.x -= steps
                Direction.LEFT
            }
            Direction.LEFT -> {
                this.y += steps
                Direction.UP
            }
            Direction.RIGHT -> {
                this.y -= steps
                Direction.DOWN
            }
        }

    fun distance(): Int = this.x + this.y
}

fun main() {
    println ("task 01")
    val lines:List<String> = readInput("src/task01/input.data")
    val point = Point(0 ,0)
    var dir:Direction = Direction.UP
    parse(lines[0]).forEach{
        val regex = """([LR])(\d+)""".toRegex()
        val matchResult = regex.find(it)
        val (turn, steps) = matchResult!!.destructured
        dir = when (turn) {
            "L" -> point.goLeft(steps.toInt(), dir)
            "R" -> point.goRight(steps.toInt(), dir)
            else -> dir
        }
    }
    println("part1: went to ${point.x}, ${point.y}, distance: ${point.distance()}")
}

fun parse(line: String):List<String> = line.split(", ")
