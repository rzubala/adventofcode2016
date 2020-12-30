import { FileReader } from "../common";

class Solve4 extends FileReader {
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
    console.log(this.data.reduce((a,i) => {
      return a +this.check(i)
    }, 0))
  };

  private check = (door: string): number => {
    const parts = door.split('-')
    const letters = parts.slice(0, parts.length - 1).reduce((s, p) => {
      for (let c of p.split('')) {
        const cnt = s[c] || 0
        s[c] = cnt + 1        
      }
      return s
    }, {})

    
    const stats = {}
    for (let letter of Object.keys(letters)) {
      const count = letters[letter]
      const values = stats[count] || []
      values.push(letter)
      stats[count] = values
    }
    
    const checksum = Object.keys(stats).map(k => +k).sort((a,b)=>b-a).reduce((a, k) => {
      if (a.length >= 5) {
        return a
      }
      const rest = 5 - a.length
      const letters = stats[k].sort().join('').slice(0, rest)
      return a + letters
    }, '')

    const checkpart = parts[parts.length - 1].replace(']', '').split('[') 
    if (checksum === checkpart[1]) {
      return +checkpart[0]
    }
    return 0
  }
}

new Solve4().run();
