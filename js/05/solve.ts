import MD5 from './md5.js'

class Solve5 {
  private id = 'uqwqemis'
  private password1 = []
  private password2 = new Array<string>(8)

  public process1 = () => {
    let iter = 0
    while (this.password1.length < 8) {
      const hash = MD5(this.id + iter)
      if (hash.slice(0,5) === '00000') {
        this.password1.push(hash[5])
      }      
      iter++;
    }
    console.log(this.password1.join(''))
  };

  public process2 = () => {
    let iter = 0
    let cnt = 0    
    while (cnt < 8) {
      const hash = MD5(this.id + iter)
      if (hash.slice(0,5) === '00000') {
        const position = +hash[5]
        if (!isNaN(position) && position < 8 && this.password2[position] === undefined) {
          this.password2[position] = hash[6]
          cnt++
        }
      }      
      iter++;
    }
    console.log(this.password2.join(''))
  };
}

new Solve5().process2();
