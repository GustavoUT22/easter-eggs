//loader
function Loader(frames = loaderClocks) {
    this.frames = frames;
    this.execute;
    let index = 0;
  
    const animate = () => {
      if (index >= this.frames.length) index = 0;
      console.clear();
      console.log(this.frames[index]);
      index += 1;
    };
  
    this.render = function () {
      return setInterval(animate, 500);
    };
  
    this.load = function () {
      const intervalId = this.render();
      setTimeout(() => {
        clearInterval(intervalId);
        console.clear();
        console.log("Load Game!");
      }, 6000);
    };
  }

  //Marquee
  function Marquee(sentence, spaces) {
    this.frames = [];
    pos = 0

    this.fill = () => { for (let i = spaces; i >= 0; i--) {
     let a = " ".repeat(i) + sentence
     this.frames.push(a)
    };
    }

    this.erase = () => { 
        let size = sentence.length
        let arr = sentence.split("")

        for (let i = 0; i < size; i++) {
          arr.shift()
          this.frames.push(arr.join(""))
        }
    }

  this.render = function () {
    return setInterval(() => {
    if (pos >= this.frames.length) pos = 0;
    console.clear();
    console.log(this.frames[pos]);
    pos += 1;}, 500)
  };

  this.run = () => {
    this.fill()
    this.erase()
    const intervalId = this.render();

    setTimeout(() => {
      clearInterval(intervalId);
      console.clear();
    }, (spaces + sentence.length + 1) * 500);
  };

}