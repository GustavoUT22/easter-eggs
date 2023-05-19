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
