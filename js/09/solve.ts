import { FileReader } from "../common";

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
    this.process();
  };

  private process = () => {
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
