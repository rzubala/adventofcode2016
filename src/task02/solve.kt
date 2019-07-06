package task02

import utils.readInput

enum class Direction {U, L, D, R}

fun getNumber(num: Int, dir: Direction): Int = when(dir) {
    Direction.U -> if (num - 3 < 1) num else num - 3
    Direction.D -> if (num + 3 > 9) num else num + 3
    Direction.L -> if (num != 1 && num != 4 && num != 7) num - 1 else num
    Direction.R -> if (num != 3 && num != 6 && num != 9) num + 1 else num
}

fun main() {
    var number: Int = 5
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
    };
}