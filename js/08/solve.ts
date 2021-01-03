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

const mark = (x: number, y: number, display: Array<Array<boolean>>) => {
  for (let iy=0;iy<y;iy++) {
    for (let ix=0;ix<x;ix++) {
      display[iy][ix] = true
    }
  }
};

const print = (display: Array<Array<boolean>>) => {
  console.log('---')
  display.forEach(line => console.log(line.map(v => v?'#':' ').join('')))
}

const rotateCol = (
  col: number,
  by: number,
  display: Array<Array<boolean>>
) => {
  const tmp = []
  for (let h=0;h<HEIGHT;h++) {
    tmp.push(display[h][col])
  }
  for (let h=0;h<HEIGHT;h++) {
    display[(h + by)%HEIGHT][col] = tmp[h]
  }
};

const rotateRow = (
  row: number,
  by: number,
  display: Array<Array<boolean>>
) => {  
  const tmp = [...display[row]]
  for (let i=0;i<WIDTH;i++) {
    display[row][(i+by)%WIDTH] = tmp[i]    
  }
};

interface FunctionMap {
  [key: string]: (x: number, y: number, display: Array<Array<boolean>>) => void
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
      const rawData = await this.readData("input.data");
      for (let line of rawData.split("\n")) {
        if (line.match(/rect/)) {
          const [x, y] = line.split(" ")[1].split("x");
          this.instructions.push({ key: INS.RECT, a: +x, b: +y });
        } else {
          const tmp = line.split(" by ");
          const by = tmp[1];
          const col = tmp[0].split("=")[1];
          this.instructions.push({
            key: line.match(/column/) ? INS.COL : INS.ROW,
            a: +col,
            b: +by,
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
    for (let instruction of this.instructions) {
      functions[instruction.key](instruction.a, instruction.b, this.display);      
    }
    print(this.display)
    console.log(this.display.reduce((a, line) => {
      return a + line.filter(Boolean).length
    }, 0))
  };
}

new Solve8().run();
