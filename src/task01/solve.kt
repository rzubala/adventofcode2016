package task01

import utils.readInput
import java.lang.Integer.max
import java.lang.Integer.min
import java.lang.Math.abs

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
    fun hashStr():String = toHashStr(this.x, this.y)

    fun distance(): Int = toDistance(this.x, this.y)
}

fun toHashStr(x:Int, y:Int): String = "$x-$y"

fun toDistance(x:Int, y:Int): Int = abs(x)+abs(y)

fun main() {
    val lines:List<String> = readInput("src/task01/input.data")
    val point = Point(0 ,0)
    val visited:MutableSet<String> = mutableSetOf(point.hashStr())
    var dir:Direction = Direction.UP
    var foundDuplication = false

    parse(lines[0]).forEach{
        val fromX = point.x
        val fromY = point.y
        val regex = """([LR])(\d+)""".toRegex()
        val matchResult = regex.find(it)
        val (turn, steps) = matchResult!!.destructured
        dir = when (turn) {
            "L" -> point.goLeft(steps.toInt(), dir)
            "R" -> point.goRight(steps.toInt(), dir)
            else -> dir
        }

        //part 2
        if (!foundDuplication) {
            foundDuplication = checkDuplication(visited, fromX, fromY, point);
        }
    }

    println("part1: went to ${point.x}, ${point.y}, the total distance: ${point.distance()}")
}

fun checkDuplication (visited:MutableSet<String>, fromX: Int, fromY: Int, point: Point): Boolean {
    if (fromX == point.x) {
        for (i in min(fromY, point.y)..max(fromY, point.y)) {
            if (i == fromY) {
                continue
            }
            if (!visited.add(toHashStr(fromX, i))) {
                println("part2: again at the same location $fromX,$i, distance: ${toDistance(fromX, i)}")
                return true
            }
        }
    } else {
        for (i in min(fromX, point.x)..max(fromX, point.x)) {
            if (i == fromX) {
                continue
            }
            if (!visited.add(toHashStr(i, fromY))) {
                println("part2: again at the same location $i,$fromY, distance: ${toDistance(i, fromY)}")
                return true
            }
        }
    }
    return false;
}

fun parse(line: String):List<String> = line.split(", ")
