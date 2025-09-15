const boardEl = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let playCells = [];
let isGameActive = true;


for (let i = 0; i < 9  ; i++ ){
    playCells.push('');
}

const winningCombos = [[0,1,2], [3,4,5], [6,7,8],
                        [0,3,6], [1,4,7], [2,5,8],
                        [0,4,8], [2,4,6]
                    ];


cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;

    if (playCells[index] !== '' || isGameActive === false){

        return;
    }

    playCells[index] = currentPlayer;
    
    

    cell.textContent = currentPlayer;
    if (checkWin()) {
        isGameActive = false;
        return;
    }

    if (checkDraw()) {
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.textContent = `It's ${currentPlayer}'s turn!`;
  });
});

function autoRestart() {
    
        setTimeout(() => {
            currentPlayer = 'X';
            isGameActive = true;
            statusEl.textContent = `It's ${currentPlayer}'s turn!`;
            playCells = Array(9).fill('');
            cells.forEach(cell => cell.textContent = '');
        }, 5000)
    }


function checkWin () {
    for (const combo of winningCombos) {
        const [a,b,c] = combo;
        if (
            isGameActive === true &&
            playCells[a] !== "" &&
            playCells[a] === playCells[b] &&
            playCells[b] === playCells[c]
          ) {
            statusEl.textContent = `Player ${currentPlayer} won! \n Click restart or wait 5 seconds to start a new game!`;
            
            autoRestart();
            return true;
            

          }
    }
    return false;
}

function checkDraw () {
    if (playCells.every(cell => cell !== '') ) {
        statusEl.textContent = "It's a draw! \n Click restart or wait 5 seconds to start a new game!";
        autoRestart();
        return true;
    }

    return false;
}


restartBtn.addEventListener('click', () => {
    isGameActive = true;
    statusEl.textContent = `It's ${currentPlayer}'s turn!`;
    playCells = Array(9).fill('');
    cells.forEach(cell => cell.textContent = '');


})