let cells = document.querySelectorAll(".cell");

let statusText = document.getElementById("status");

let restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";

let gameActive = true;

let gameState = ["","","","","","","","",""];

let winningConditions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

function handleCellClick(event){

    let clickedCell = event.target;

    let clickedIndex =
    Array.from(cells).indexOf(clickedCell);

    if(gameState[clickedIndex] !== "" || !gameActive){

        return;
    }

    gameState[clickedIndex] = currentPlayer;

    clickedCell.innerText = currentPlayer;

    checkWinner();
}

function checkWinner(){

    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++){

        let condition = winningConditions[i];

        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if(a === "" || b === "" || c === ""){

            continue;
        }

        if(a === b && b === c){

            roundWon = true;

            break;
        }
    }

    if(roundWon){

        statusText.innerText =
        `Player ${currentPlayer} Wins!`;

        gameActive = false;

        return;
    }

    if(!gameState.includes("")){

        statusText.innerText = "Game Draw!";

        gameActive = false;

        return;
    }

    currentPlayer =
    currentPlayer === "X" ? "O" : "X";

    statusText.innerText =
    `Player ${currentPlayer} Turn`;
}

function restartGame(){

    currentPlayer = "X";

    gameActive = true;

    gameState = ["","","","","","","","",""];

    statusText.innerText = "Player X Turn";

    cells.forEach(function(cell){

        cell.innerText = "";
    });

}

cells.forEach(function(cell){

    cell.addEventListener("click", handleCellClick);

});

restartBtn.addEventListener("click", restartGame);
