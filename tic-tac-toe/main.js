// 
// state
// 
var ticTacToeBoard = [
	["-","-","-"],
	["-","-","-"],
	["-","-","-"]
];

var isPlayerXTurn = true;  // true is X, false is O
var winner = null; 

//
// main
//
var content = document.getElementById('content');
content.innerHTML = renderGame(ticTacToeBoard);


//
// functions
//
function buttonClicked(event) {
    let clickedButton = event.target;
    let clickedButtonId = clickedButton.id;
    let row = clickedButtonId[0];
    let column = clickedButtonId[2];

    if (ticTacToeBoard[row][column] === '-') {
        if (isPlayerXTurn) {
            ticTacToeBoard[row][column] = 'X';
            isPlayerXTurn = false;
        } else {
            ticTacToeBoard[row][column] = 'O';
            isPlayerXTurn = true;
        }

        winner = getWinner();

        renderCell(row,column);
        renderWinner();
        renderPlayerTurn();
    }
}

function getWinner() {
  var winConditions = [
    ticTacToeBoard[0][0] + ticTacToeBoard[0][1] + ticTacToeBoard[0][2], //row1
    ticTacToeBoard[1][0] + ticTacToeBoard[1][1] + ticTacToeBoard[1][2], //row2
    ticTacToeBoard[2][0] + ticTacToeBoard[2][1] + ticTacToeBoard[2][2], //row3

    ticTacToeBoard[0][0] + ticTacToeBoard[1][0] + ticTacToeBoard[2][0], //col1
    ticTacToeBoard[0][1] + ticTacToeBoard[1][1] + ticTacToeBoard[2][1], //col2
    ticTacToeBoard[0][2] + ticTacToeBoard[1][2] + ticTacToeBoard[2][2], //col3

    ticTacToeBoard[0][0] + ticTacToeBoard[1][1] + ticTacToeBoard[2][2], //diag1
    ticTacToeBoard[0][2] + ticTacToeBoard[1][1] + ticTacToeBoard[2][0] //diag2
  ];

  for (var i = 0; i < 8; i++) {
    if (winConditions[i] == "XXX") {
        return "X"
    } else if (winConditions[i] == "OOO") {
        return "O"
    }
  }

  return null;
}

//
// render functions
//

function renderGame(game) {
    // Change this render function to use the "game" parameter
    return `
        <div class="container d-flex flex-column justify-content-start align-items-center">
            <h4>It's player <span id="next-player">${isPlayerXTurn ? "X":"O"}</span>'s turn!</h4>
            <div class="w-50 text-center">
                <button id="0,0" onClick="buttonClicked(event)">${game[0][0]}</button>
                <button id="0,1" onClick="buttonClicked(event)">${game[0][1]}</button>
                <button id="0,2" onClick="buttonClicked(event)">${game[0][2]}</button>
            </div>
            <div class="w-50 text-center">
                <button id="1,0" onClick="buttonClicked(event)">${game[1][0]}</button>
                <button id="1,1" onClick="buttonClicked(event)">${game[1][1]}</button>
                <button id="1,2" onClick="buttonClicked(event)">${game[1][2]}</button>
            </div>
            <div class="w-50 text-center">
                <button id="2,0" onClick="buttonClicked(event)">${game[2][0]}</button>
                <button id="2,1" onClick="buttonClicked(event)">${game[2][1]}</button>
                <button id="2,2" onClick="buttonClicked(event)">${game[2][2]}</button>
            </div>
        </div>
    `
}

function renderCell(row, column) {
    document.getElementById(`${row},${column}`).innerHTML = 
        ticTacToeBoard[row][column];
}

function renderPlayerTurn() {
    if (winner === null) {
        document.getElementById("next-player").innerHTML = 
            isPlayerXTurn ? "X" : "O";
    }
}

function renderWinner() {
    if (winner !== null) {
        let h1 = document.createElement("h1");
        h1.innerHTML = `<h1 class="winner">Player ${winner}</span> WON!</h1>`;
      
        document.getElementsByClassName("container")[0].appendChild(h1);
        
    }
}