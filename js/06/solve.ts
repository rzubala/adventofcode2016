import { FileReader } from "../common";

class Solve6 extends FileReader {
  private data: string[] = [];
  private stat = new Array<object>(8)

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
    for (let line of this.data) {
      line.split('').forEach((l, i) => {
        const letterStat = this.stat[i] || {}
        const cnt = letterStat[l] || 0
        letterStat[l] = cnt + 1
        this.stat[i] = letterStat
      })
    }
    let result1 = '', result2 = ''
    for (let position of this.stat) {
      let max = 0, min = -1
      let c1 = '', c2 = ''      
      for (let letter of Object.keys(position)) {
        if (position[letter] > max) {
          max = position[letter]
          c1 = letter
        }
        if (min === -1 || position[letter] < min) {
          min = position[letter]
          c2 = letter
        }
      }
      max = 0
      min = -1

      result1 += c1
      result2 += c2
    }
    console.log(result1, result2)
  };
}

new Solve6().run();
