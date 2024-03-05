class Gameboard {
  constructor() {
    //each cell on array/table has a value of 0, 1 or 2 (available, player1 or player2)}
    this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    // this.availableCells = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    //used to access each cell via DOM
    this.cellDOM = [
      document.getElementById(0),
      document.getElementById(1),
      document.getElementById(2),
      document.getElementById(3),
      document.getElementById(4),
      document.getElementById(5),
      document.getElementById(6),
      document.getElementById(7),
      document.getElementById(8),
    ];
  }
}

class Player {
  constructor(name, number) {
    this.name = String(name);
    this.number = Number(number);
    this.isTurn = Boolean(0);
    this.turn;
    this.play;
    this.endTurn;
  }

  turn(selectedCell) {
    //what happens when a player selects a cell
    //1. take in a cell selection [via listen()]
    //2. validate selection
    let selection = this.play(this.number, selectedCell);
    if (selection == "err") {
      console.log("error");
    } else {
      //3. update the gameboard array
      game.board.cells[selection] = this.number;
      //4. Check if the game is over
      if (isGameOver(game)[0]) {
        gameOver();
      }
      //5. end player's turn, begin other player's turn
      this.endTurn();
      //6. display the board
      showBoard();
    }
    //7. await next player's selection
    listen();
  }

  endTurn() {
    if (this.number == 1) {
      this.isTurn = false;
      game.p2.isTurn = true;
    } else if (this.number == 2) {
      this.isTurn = false;
      game.p1.isTurn = true;
    }
  }

  play(playerNumber, cell) {
    const cellIndex = game.board.availableCells.findIndex((x) => x == cell);

    if (cellIndex > -1) {
      //console.log(`${this.name} placed a token on cell ${cell} which is item ${cellIndex} in availableCells[].`);
      //console.log(cellIndex);
      game.board.availableCells.splice(cellIndex, 1);
    } else {
      //console.log("err. this cell is already taken. try again.");
      cell = "err";
    }

    return cell;
  }
}

function newGame() {
  //prompt players for their name and update the DOM
  document.querySelector(".popup").style.visibility = "visible";

  //create a game object
  return {
    p1: new Player("Player 1", 1),
    p2: new Player("Player 2", 2),
    board: new Gameboard(),
  };
}

function newGamePopup() {
  //create game over / start new game popup
  const gameSetupPopup = document.querySelector(".popup");
  gameSetupPopup.style.visibility = "visible";
  gameSetupPopup.innerHTML = `<form>
    <label for="p1name">Enter a nickname for Player 1 (Xs):</label><br>
    <input type="text" id="p1name" name="p2name" placeholder="Player 1"><br>
    <label for="p1name">Enter a nickname for Player 2 (Os):</label><br>
    <input type="text" id="p2name" name="p2name" placeholder="Player 2"><br><br>
    <input class="button" value="Start Game" id="formBtn">
    </form>`;

  const formBtn = document.querySelector("#formBtn");
  formBtn.addEventListener(`click`, startGame);
}

function startGame() {
  //populate the gameboard with data from the Form input
  const form = new FormData(document.querySelector("form"));
  const formArr = [];
  for (const value of form.values()) {
    formArr.push(value);
  }
  document.getElementById(`p1`).textContent = `${formArr[0]} | X`;
  document.querySelector(`#p2`).textContent = `O | ${formArr[1]}`;
  game.p1.name = `${formArr[0]}`;
  game.p2.name = `${formArr[1]}`;

  //remove the popup and add a reset button
  const gameSetupPopup = document.querySelector(".popup");
  gameSetupPopup.style.visibility = "hidden";
  document.querySelector(`#newGameBtn`).addEventListener(`click`, resetGame);
  //showBoard();
}

function showBoard() {
  let p1Marker = "X";
  let p2Marker = "O";
  //display player names on console/DOM

  if (game.p1.isTurn) {
    //console.log(`It is ${game.p1.name}'s Turn`);
    document.getElementById("p1").style.backgroundColor = "yellow";
    document.getElementById("p2").style.backgroundColor = "white";
  }
  if (game.p2.isTurn) {
    //console.log(`It is ${game.p2.name}'s Turn`);
    document.getElementById("p1").style.backgroundColor = "white";
    document.getElementById("p2").style.backgroundColor = "yellow";
  }

  //display board on console
  console.log(`${game.p1.name} | ${game.p2.name}
${game.board.cells[0]} ${game.board.cells[1]} ${game.board.cells[2]}
${game.board.cells[3]} ${game.board.cells[4]} ${game.board.cells[5]}
${game.board.cells[6]} ${game.board.cells[7]} ${game.board.cells[8]}`);

  //display board on DOM
  game.board.cells.forEach((value, index) => {
    if (document.getElementById(index).childNodes.length == 0) {
      if (value == 1) {
        const cellText = document.createTextNode(`${p1Marker}`);
        document.getElementById(index).appendChild(cellText);
      } else if (value == 2) {
        const cellText = document.createTextNode(`${p2Marker}`);
        document.getElementById(index).appendChild(cellText);
      }
    }
  });
}

function listen() {
  //add eventListeners to the DOM to check for a click for cell selection
  game.board.cells.forEach((value, index) =>
    game.board.cellDOM[index].addEventListener(`click`, selected)
  );
  //return this.id;
}

function selected() {
  game.board.cells.forEach((value, index) =>
    game.board.cellDOM[index].removeEventListener(`click`, selected)
  );
  if (game.p1.isTurn) {
    game.p1.turn(this.id);
  } else if (game.p2.isTurn) {
    game.p2.turn(this.id);
  }
}

function isGameOver(game) {
  //checks a game for all possible rows, column and diagonal match and returns an array
  //the first item of the array is a boolean representing whether the game is over (true) or not (false)
  //the other three items are the matching cells which won the game
  const winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winArr.length; i++) {
    let a = winArr[i];
    if (
      game.board.cells[a[0]] == game.board.cells[a[1]] &&
      game.board.cells[a[1]] == game.board.cells[a[2]] &&
      game.board.cells[a[0]] + game.board.cells[a[1]] + game.board.cells[a[2]] >
        0
    ) {
      const win1 = a[0];
      const win2 = a[1];
      const win3 = a[2];
      return [true, win1, win2, win3];
    }
  }
  return [false, null, null, null];
}

function gameOver() {
  let winningTiles = isGameOver(game).slice(1);
  winningTiles.forEach((e) => document.getElementById(`${e}`).style.backgroundColor = "yellow");
  //create game over / start new game popup
  document.querySelector("#newGameBtn").style.backgroundColor = "white";
  const gameOverPopup = document.querySelector(".popup");
  gameOverPopup.innerHTML = `<button class="button" id="newGameBtn">New Game</button>`;

  if (game.p1.isTurn) {
    //console.log(`${game.p1.name} won!`);
    gameOverPopup.innerHTML = `<p>${game.p1.name} won!</p>
    <button class="button" id="newGameBtnPopup">New Game</button>`;
  } else {
    //console.log(`${game.p2.name} won!`);
    gameOverPopup.innerHTML = `<p>${game.p2.name} won!</p>
    <button class="button" id="newGameBtnPopup">New Game</button>`;
  }

  const newButton = document.querySelector("#newGameBtnPopup");
  newButton.addEventListener(`click`, resetGame);

  gameOverPopup.style.visibility = "visible";
}

function resetGame() {
  location.reload();
}

//triggers the popup prompting input to start a game
newGamePopup();

const game = newGame();
game.p1.isTurn = true;
showBoard();
listen();
