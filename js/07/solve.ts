import { FileReader } from "../common";

class Solve7 extends FileReader {
  private data: string[] = [];
  private parsed: Array<Array<Array<string>>> = []

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
    let cnt = 0
    for (let line of this.parsed) {
      for (let hyper of line[0]) {
        if (hasAba(hyper, line[1])) {
          cnt++
        }
      }
    }
    console.log(cnt)
  }

  private process1 = () => {
    let cnt = 0
    for (let ip of this.data) {
      const parsedIp = []
      let index = 0
      let hyper = undefined
      let len = ip.length
      let abba1 = false
      let abba2 = false
      const parsedNormal = []
      const parsedHyper = []
      while (index < len) {
        if (hyper) {
          index = ip.indexOf(']', hyper)
          if (index === -1) {
            throw new Error('something went wrong')
          }
          const part = ip.slice(hyper, index)
          abba1 = abba1 || hasAbba(part)
          parsedHyper.push(part)
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
          const part = ip.slice(from, index)
          parsedNormal.push(part)
          abba2 = abba2 || hasAbba(part)
        }        
      }
      if (!abba1 && abba2) {
        cnt++
      }
      parsedIp.push(parsedHyper)
      parsedIp.push(parsedNormal)
      this.parsed.push(parsedIp)
    }
    console.log(cnt)
  };
}

const hasAba = (hyper: string, parts: string[]): boolean => {
  const len = hyper.length
  let pos = 0
  while (pos + 2 < len) {
    if (hyper[pos] === hyper[pos+2] && hyper[pos] !== hyper[pos+1]) {
      if (checkBab(hyper.slice(pos, pos+2), parts)) {
        return true
      }
    }
    pos++
  }
}

const checkBab = (input: string, parts: string[]): boolean => {
  const bab = input[1] + input[0] + input[1]
  for (let part of parts) {
    if (part.includes(bab)) {
      return true
    }
  }
  return false
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
