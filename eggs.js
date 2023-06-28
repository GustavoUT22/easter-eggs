LOADER_TIME = 4000

function TicTacToe() {
  this.board = [[" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]]

  let players = ["O", "X"]
  let isThereAWinner = false
  let isDraw = false
  let currentPlayer = 0
  
  this.snippet = {
    play: (x, y) => {
      isThereAWinner = this.verifyWinner()
      if (isThereAWinner) {
        console.log(`There is already a winner, ${players[currentPlayer]}`)
        return
      }
      if((x > 2 || x < 0) || (y > 2 || y < 0)) {
        console.log("This position doesn't exist")
        return 
      }
      if (this.board[x][y] !== " ") {
        isDraw = this.verifyDraw()
        if(isDraw) {
          console.log("It's a draw")
        } else {
          console.log("This space is already taken")
        }
        return
      }
      this.board[x][y] = players[currentPlayer] 
      isThereAWinner = this.verifyWinner()
      isDraw = this.verifyDraw()
      if(!isThereAWinner) currentPlayer = currentPlayer === 0 ? 1 : 0
      console.clear()
      this.draw()
      if (isThereAWinner) {
        console.log(`The winner is ${players[currentPlayer]}`)
        return
      }
      if(isDraw) {
        console.log("It's a draw")
        return
      }
    }
  }

  this.verifyDraw = () => {
    let countFilled = 0 
    for(let row of this.board) {
      for(let box of row) {
        if (box != " ") countFilled += 1
      }
    }
    return countFilled == 9
  }

  this.verifyWinner = () => {
    if ((this.board[0][0] == this.board[0][1] && this.board[0][1]  == this.board[0][2]) && this.board[0][2] !== " ") {
      return true
    }
    else if ((this.board[1][0] == this.board[1][1] && this.board[1][1] == this.board[1][2]) && this.board[1][2] != " ") {
      return true
    }
    else if ((this.board[2][0] == this.board[2][1] && this.board[2][1] == this.board[2][2]) && this.board[2][2] != " ") {
      return true
    }
    else if ((this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) && this.board[2][2] != " ") {
      return true
    }
    else if ((this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) && this.board[2][0] != " ") {
      return true
    }
    else if ((this.board[0][0] == this.board[1][0] && this.board[1][0] == this.board[2][0]) && this.board[2][0] != " ") {
      return true
    }
    else if ((this.board[0][1] == this.board[1][1] && this.board[1][1] == this.board[2][1]) && this.board[2][1] != " ") {
      return true
    }
    else if ((this.board[0][2] == this.board[1][2] && this.board[1][2] == this.board[2][2]) && this.board[2][2] != " ") {
      return true
    }
    return false
  }

  this.draw = () => {
    let currentBoard = `It's ${players[currentPlayer]} turn!\n\n`
    currentBoard += `${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}\n`
    currentBoard += `----------\n`
    currentBoard += `${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}\n`
    currentBoard += `----------\n`
    currentBoard += `${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}\n\n`
    console.log(currentBoard)
  }

  this.reset = () => {
    isThereAWinner = false
    currentPlayer = 0
    this.board = [[" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]]
    console.clear()
    this.draw()
  }
}

function Loader(frames = ["loading", "loading.", "loading..", "loading..."]) {
  this.frames = ["👶🏾", "👦🏾", "🧑🏾", "👨🏾", "👨🏾‍🦳", "👴🏾", "💀"];
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

  this.load = function (callback) {
    const intervalId = this.render();
    setTimeout(() => {
      clearInterval(intervalId);
      console.log(callback)
      if (callback) {
      this.execute = callback(); }
      console.clear();
    }, LOADER_TIME);
  };
}

function Clock() {
  let intervalId
  this.run = () => {
    intervalId = setInterval(() =>{
      this.date = new Date()
      this.hh = this.date.getHours()
      this.mm = this.date.getMinutes()
      this.ss = this.date.getSeconds()
      console.clear()
      this.format(this.hh, this.mm, this.ss)
    } , 1000)
  }

  this.format = (hh, mm, ss) => {
    let hours = hh < 10 ? "0" + hh : hh
    let minutes = mm < 10 ? "0" + mm : mm
    let seconds = ss < 10 ? "0" + ss : ss
    console.log(`${hours}:${minutes}:${seconds}`)
  }

  window.addEventListener("click", () => {
    clearInterval(intervalId)
    console.clear()
    console.log("Let's keep playing!")
  })
}

function numberFormatter(baseUnit, suffix) {
    this.format = (quantity) => {
        for (let i = 0; 1 < suffix.length; i++) {
            if (quantity < baseUnit) {
                console.log(quantity + suffix[i])
                return
            }
            quantity = Math.trunc(quantity / baseUnit)
        }
        console.log(quantity + suffix[suffix.length - 1])
        return
    }
}

function Marquee() {
  let sentence
  let spaces
  this.frames = [];
  pos = 0

  this.fill = () => {
    for (let i = spaces; i >= 0; i--) {
      let frame = " ".repeat(i) + sentence
      this.frames.push(frame)
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
      pos += 1;
    }, 500)
  };

  this.load = () => {
    sentence = prompt("Enter your message: ")
    spaces = parseInt(prompt("Space it:"))
    this.fill()
    this.erase()
    const intervalId = this.render();

    setTimeout(() => {
      clearInterval(intervalId);
      console.clear();
    }, (spaces + sentence.length + 1) * 500);
  };

}

function EasterEgg(egg = "", ...args) {
  egg = egg.toLowerCase()
  const loader = new Loader
  const marquee = new Marquee
  const clock = new Clock
  const tictactoe = new TicTacToe
  switch (egg) {
    case "marquee":
      loader.load(marquee.load)
      break
    case "tic tac toe":
      loader.load()
      setTimeout(()=> tictactoe.draw(), LOADER_TIME)
      return tictactoe
    case "number formatter":
      loader.load()  
      return new numberFormatter(args[0], args[1])
    case "clock":
      loader.load(clock.run)
      break
    default:
      setTimeout(() => console.log("You need to select a valid EasterEgg"), LOADER_TIME)
  }
}
