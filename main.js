class Gameboard {
  constructor() {
    this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }
  //each cell on array/table has a value of 0, 1 or 2 (available, player1 player2)}
}

class Player {
  constructor(name, number) {
    this.name = String(name);
    this.number = Number(number);
    this.isTurn = Boolean(0);
    this.turn;
  }
  turn() {
    //what happens when it is a players turn.
    //1. prompt a cell selection
    let testPrompt = prompt("choose a cell # 0-9");
    //2. validate and update the cell
    let selection = this.play(testPrompt);
    game.board.cells[selection] = this.number;
    //3. display the board
    showBoard();
    //4. end this player's turn and begin other player's turn
    this.isTurn = false;
  }
  play(cell) {
    //check if cell is available
    game.board.availableCells.forEach((x) => {
      if (x == cell) {
        console.log(game.board.availableCells.splice[x]);
    } else {
        //try this.play again
    }
    });

    if (cell > -1 && cell < 9) {
      //if available, place token
      console.log(name + " placed a token on cell " + cell);
      return cell;
    } else {
      alert("invalid input. must be an integer 0-8");
      //try this.play again
    }
  }
}

function newGame() {
  return {
    p1: new Player(prompt("Player 1, enter your name", "Player 1"), 1),
    p2: new Player(prompt("Player 2, enter your name", "Player 2"), 2),
    board: new Gameboard(),
  };
}

function showBoard() {
  console.log(`${game.p1.name} | ${game.p2.name}
${game.board.cells[0]} ${game.board.cells[1]} ${game.board.cells[2]}
${game.board.cells[3]} ${game.board.cells[4]} ${game.board.cells[5]}
${game.board.cells[6]} ${game.board.cells[7]} ${game.board.cells[8]}`);
}

//app loads and prompts player for names to get started
let game = newGame();
showBoard();
game.p1.isTurn = true;

for (let i = 0; i < 3; i++) {
  if (game.p1.isTurn) {
    game.p1.turn();
    game.p2.isTurn = true;
  } else if (game.p2.isTurn) {
    game.p2.turn();
    game.p1.isTurn = true;
  } else {
    console.log("turn loop error");
  }
}
