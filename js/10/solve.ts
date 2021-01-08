import { FileReader } from "../common";

interface Bot {
  id: number;
  val1?: number;
  val2?: number;
}

interface Instruction {
  bot: number;
  low: Destination;
  high: Destination;
}

interface Destination {
  bot?: number;
  output?: number;
}

const giveToBot = (value: number, bots: Bot[], id: number) => {
  let bot: Bot = bots.find(b => b.id === id)
  if (bot === undefined) {
    bot = {id}
    bots.push(bot)
  }
  if (bot.val1 === undefined) {
    bot.val1 = value
  } else if (bot.val2 === undefined) {
    bot.val2 = value
  }
}

class Solve10 extends FileReader {
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
    const bots: Bot[] = []
    const instructions: Instruction[] = []
    const outputs = []

    for (let line of this.data) {      
      if (line.includes('goes to bot')) {
        const tmp = line.split(' goes to bot ')
        giveToBot(+tmp[0].slice(5), bots, +tmp[1])
      } else {        
        const tmp = line.split(' and high to ')
        const lowPart = tmp[0].split(' ')
        const highPart = tmp[1].split(' ')
        const from = +lowPart[1]
        let low: Destination
        if (lowPart[5] === 'output') {
          low = {output: +lowPart[6]}
        } else {
          low = {bot: +lowPart[6]}
        }
        let high: Destination
        if (highPart[0] === 'output') {
          high = {output: +highPart[1]}
        } else {
          high = {bot: +highPart[1]}
        }
        instructions.push({bot: from, low, high})
      }
    }

    while(true) {
      let process = false
      for (let instruction of instructions) {
        const bot = bots.find(bot => instruction.bot === bot.id)
        if (bot === undefined) {
          continue
        }        
        if (bot.val1 !== undefined && bot.val2 !== undefined) {          
          const low = Math.min(bot.val1, bot.val2)
          const high = Math.max(bot.val1, bot.val2)            
          
          if (low === 17 && high === 61) {
            console.log('compare id', bot.id)
          }

          if (instruction.low.bot !== undefined) {
            giveToBot(low, bots, instruction.low.bot)
          } else if (instruction.low.output !== undefined) {
            if (instruction.low.output === 0 || instruction.low.output === 1 || instruction.low.output === 2) {
              outputs.push(low)
            }
          }

          if (instruction.high.bot !== undefined) {
            giveToBot(high, bots, instruction.high.bot)
          } else if (instruction.high.output !== undefined) {
            if (instruction.high.output === 0 || instruction.high.output === 1 || instruction.high.output === 2) {
              outputs.push(high)
            }
          }

          bot.val1 = undefined
          bot.val2 = undefined
          process = true
        }
      }
      if (!process) {
        break
      }
    }    
    console.log(outputs.reduce((a, v) => {
      return a * v
    }, 1))
  };
}

new Solve10().run();
