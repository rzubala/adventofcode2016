import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { threadId } from "worker_threads";
import { FileReader } from "../common";

const isTriang = (a: number, b: number, c: number): boolean => a+b>c && a+c>b && c+b>a

class Solve3 extends FileReader {
  private data: number[][] = [];

  private init = async () => {
    try {
      const rawData = await this.readData("input.data");
      for (let line of rawData.split("\n")) {
        const nums = line.split(/\s+/).filter(e => +e).map(e => +e)
        this.data.push(nums)
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
    console.log(this.data.reduce((a,v) => {
      if (isTriang(v[0], v[1], v[2])) {
        a++
      }
      return a
    }, 0))

    let cnt = 0
    for (let c=0;c<3;c++) {
      for (let r=0;r<this.data.length;r+=3) {
        if (isTriang(this.data[r][c], this.data[r+1][c], this.data[r+2][c])) {
          cnt++
        }
      }
    }
    console.log(cnt, this.data.length)
  };
}

new Solve3().run();
