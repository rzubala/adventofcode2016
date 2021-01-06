import { FileReader } from "../common";

const getLength = (input: string): number => {
  return input.replace(' ', '').length
}

class Solve9 extends FileReader {
  private data: string[] = [];

  private init = async () => {
    try {
      const rawData = await this.readData("input.data");
      this.data = rawData.split("\n");
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };

  run = async () => {
    await this.init();
    this.process1();
    this.process2();
  };

  private process2 = () => {
    let result = 0    
    for (let test of this.data) {
      result += this.decompress(test, 1)
    }
    console.log(result)
  }

  private decompress = (sequence: string, repeat: number): number => {
    let index = 0;
    let result = 0;
    while (true) {
      let nextIndex = sequence.indexOf("(", index);
      if (nextIndex === -1) {
        break;
      }
      if (index !== nextIndex) {
        result += getLength(sequence.slice(index, nextIndex)) * repeat;
      }
      nextIndex++;
      const to = sequence.indexOf(")", nextIndex);
      const cmd = sequence.slice(nextIndex, to).split("x");
      result += this.decompress(sequence.slice(to + 1, to + 1 + +cmd[0]), +cmd[1]) * repeat     
      index = to + 1 + +cmd[0];
    }
    if (index < sequence.length) {
      result += getLength(sequence.slice(index)) * repeat;
    }
    return result
  }

  private process1 = () => {
    for (let test of this.data) {
      let index = 0;
      let result = "";
      while (true) {
        let nextIndex = test.indexOf("(", index);
        if (nextIndex === -1) {
          break;
        }
        result += test.slice(index, nextIndex);
        nextIndex++;
        const to = test.indexOf(")", nextIndex);
        const cmd = test.slice(nextIndex, to).split("x");
        result += test.slice(to + 1, to + 1 + +cmd[0]).repeat(+cmd[1]);
        index = to + 1 + +cmd[0];
      }
      result += test.slice(index);
      console.log(result.replace(' ', '').length)
    }
  };
}

new Solve9().run();
