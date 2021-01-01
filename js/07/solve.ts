import { FileReader } from "../common";

class Solve7 extends FileReader {
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
    let cnt = 0
    for (let ip of this.data) {
      let index = 0
      let hyper = undefined
      let len = ip.length
      let abba1 = false
      let abba2 = false
      while (index < len) {
        if (hyper) {
          index = ip.indexOf(']', hyper)
          if (index === -1) {
            throw new Error('something went wron')
          }
          abba1 = abba1 || hasAbba(ip.slice(hyper, index))
          hyper = undefined
          index++
        } else {
          const from = index
          index = ip.indexOf('[', from)                    
          if (index === -1) {
            index = len
          } else {
            hyper = index + 1
          }
          abba2 = abba2 || hasAbba(ip.slice(from, index))
        }        
      }
      if (!abba1 && abba2) {
        cnt++
      }
    }
    console.log(cnt)
  };
}

const hasAbba = (input: string): boolean => {
  const len = input.length
  let pos = 0
  while (pos + 3 < len) {
    if (input[pos] === input[pos+1]) {
      pos++
      continue
    }
    if (input[pos] === input[pos+3] && input[pos+1] === input[pos+2]) {
      return true
    }
    pos++
  }
  return false
}

new Solve7().run();
