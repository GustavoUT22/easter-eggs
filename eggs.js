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
    pos = 0;
  
    this.fill = () => {
      for (let i = spaces; i >= 0; i--) {
        let a = " ".repeat(i) + sentence;
        this.frames.push(a);
      }
    };
  
    this.erase = () => {
      let size = sentence.length;
      let arr = sentence.split("");
  
      for (let i = 0; i < size; i++) {
        arr.shift();
        this.frames.push(arr.join(""));
      }
    };
  
    this.render = function () {
      return setInterval(() => {
        if (pos >= this.frames.length) pos = 0;
        console.clear();
        console.log(this.frames[pos]);
        pos += 1;
      }, 500);
    };
  
    this.run = () => {
      this.fill();
      this.erase();
      const intervalId = this.render();
  
      setTimeout(() => {
        clearInterval(intervalId);
        console.clear();
      }, (spaces + sentence.length + 1) * 500);
    };
  }
  
//Number Formatter
function numberFormatter(divider, array) {
  this.snippet = function (number) {
    let count = 0;
    let quotient = number;
    if (number >= divider) {
      do {
        count += 1;
        quotient = quotient / divider;
      } while (quotient >= divider);
    }
    return `${Math.floor(quotient)} ${array[count]}`;
  };
}
//Clocks
function Clock() {
  this.displayCurrentTime = function () {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    console.clear(); // Limpia la consola en cada actualización
    console.log(formattedTime);
  };

  this.start = function () {
    this.displayCurrentTime();
    this.intervalId = setInterval(this.displayCurrentTime.bind(this), 1000);

    window.addEventListener("click", () => {
      this.stop();
      console.log("Let's keep playing!");
    });
  };

  this.stop = function () {
    clearInterval(this.intervalId);
    console.clear();
  };

  if (typeof this.start === "function") {
    this.start();
  }
}
