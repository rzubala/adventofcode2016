package task02

import utils.readInput

enum class Direction {U, L, D, R}

fun getNumber(num: Int, dir: Direction): Int = when(dir) {
    Direction.U -> if (num - 3 < 1) num else num - 3
    Direction.D -> if (num + 3 > 9) num else num + 3
    Direction.L -> if (num != 1 && num != 4 && num != 7) num - 1 else num
    Direction.R -> if (num != 3 && num != 6 && num != 9) num + 1 else num
}

val maxLeft: Set<Int> = setOf(1, 2, 5, 0xA, 0xD)
val maxRight: Set<Int> = setOf(1, 4, 9, 0xC, 0xD)
val upMap: Map<Int, Int> = mapOf(3 to 1, 6 to 2, 7 to 3, 8 to 4, 0xA to 6, 0xB to 7, 0xC to 8, 0xD to 0xB)
val downMap: Map<Int, Int> = mapOf(1 to 3, 2 to 6, 3 to 7, 4 to 8, 6 to 0xA, 7 to 0xB, 8 to 0xC, 0xB to 0xD)

fun getNumber2(num: Int, dir: Direction): Int = when(dir) {
    Direction.U -> upMap[num] ?: num
    Direction.D -> downMap[num] ?: num
    Direction.L -> if (maxLeft.contains(num)) num else num - 1
    Direction.R -> if (maxRight.contains(num)) num else num + 1
}

fun main() {
    var number = 5

    //part 1
    readInput("src/task02/input.data").forEach{
        it.split("").forEach{
            number = when(it) {
                "U" -> getNumber(number, Direction.U)
                "D" -> getNumber(number, Direction.D)
                "L" -> getNumber(number, Direction.L)
                "R" -> getNumber(number, Direction.R)
                else -> number
            }
        }
        print(number)
    }

    println()

    //part 2
    number = 5
    readInput("src/task02/input.data").forEach {
        it.split("").forEach {
            number = when(it) {
                "U" -> getNumber2(number, Direction.U)
                "D" -> getNumber2(number, Direction.D)
                "L" -> getNumber2(number, Direction.L)
                "R" -> getNumber2(number, Direction.R)
                else -> number
            }
        }
        print(number.toString(16).toUpperCase())
    }

}