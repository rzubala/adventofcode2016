import { FileReader } from "../common";

const WIDTH = 50;
const HEIGHT = 6;

enum INS {
  RECT,
  COL,
  ROW,
}
interface Instruction {
  key: INS;
  a: number;
  b: number;
}

const mark = (x: number, y: number, display: Array<Array<boolean>>): Array<Array<boolean>> => {
  return display.map((line, lineY) => {
    if (lineY <= y) {
      return line.map((pixel, pixelX) => {
        if (pixelX <= x) {
          return true;
        }
        return pixel;
      });
    }
    return line;
  });
};

const print = (display: Array<Array<boolean>>) => {
  display.forEach(line => console.log(line.map(v => v?'#':' ').join('')))
}

const rotateCol = (
  col: number,
  by: number,
  display: Array<Array<boolean>>
):Array<Array<boolean>> => {
  return display
};

const rotateRow = (
  row: number,
  by: number,
  display: Array<Array<boolean>>
):Array<Array<boolean>> => {
  return display
};

interface FunctionMap {
  [key: string]: (x: number, y: number, display: Array<Array<boolean>>) => Array<Array<boolean>>
}
const functions: FunctionMap = {
  [INS.RECT]: mark,
  [INS.COL]: rotateCol,
  [INS.ROW]: rotateRow,
};

class Solve8 extends FileReader {
  private instructions: Instruction[] = [];
  private display: Array<Array<boolean>> = new Array(HEIGHT);

  private init = async () => {
    this.display = Array.from({length: HEIGHT}, (v,k) => Array.from({length: WIDTH}, (v2, k2) => false))

    try {
      const rawData = await this.readData("test.data");
      for (let line of rawData.split("\n")) {
        if (line.match(/rect/)) {
          const [x, y] = line.split(" ")[1].split("x");
          this.instructions.push({ key: INS.RECT, a: x, b: y });
        } else {
          const tmp = line.split(" by ");
          const by = tmp[1];
          const col = tmp[0].split("=")[1];
          this.instructions.push({
            key: line.match(/column/) ? INS.COL : INS.ROW,
            a: col,
            b: by,
          });
        }
      }
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };

  run = async () => {
    await this.init();
    this.process();
  };

  private process = () => {
    let display = this.display
    for (let instruction of this.instructions) {
      display = functions[instruction.key](instruction.a, instruction.b, this.display);
      print(display)
    }
  };
}

new Solve8().run();
