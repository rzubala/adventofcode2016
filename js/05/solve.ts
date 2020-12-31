import MD5 from './md5.js'

class Solve5 {
  private id = 'uqwqemis'
  //private id = 'abc'
  private password = []

  public process = () => {
    let iter = 0
    while (this.password.length < 8) {
      const hash = MD5(this.id + iter)
      if (hash.slice(0,5) === '00000') {
        console.log('found', iter)
        this.password.push(hash[5])
      }      
      iter++;
    }
    console.log(this.password.join(''))
  };
}

new Solve5().process();
