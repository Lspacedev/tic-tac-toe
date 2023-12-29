function gameInterface() {
    let playerOne = '';
    const submit = document.querySelector('#submit');
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        playerOne = document.querySelector("#playerOne").value;
        console.log('dsf')
        console.log('dsf')
    
    });
s
}

function Game(){
   const statusDisplay = document.querySelector('.status');

    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    function Gameboard(){

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return {winningConditions }

    }
    let playerOneName = "Player One";
    let playerTwoName = "Player Two";


    const players = [
        {
        name: playerOneName,
        token: 'O'
        },
        {
        name: playerTwoName,
        token: 'X'
        }
    ];

    let activePlayer = players[0];
    let playerToken = activePlayer.token;
    let playerName = activePlayer.name;

    const winningMessage = () => `${playerName} has won!`;
    const drawMessage = () => `Its a draw!`;
    const currentPlayerTurn = () => `It's ${playerName}'s turn`;
    statusDisplay.innerHTML = currentPlayerTurn();

    function addCell(cell, index) {
    
        gameState[index] = playerToken;
        cell.innerHTML = playerToken;
    }


    function switchPlayer() {
    
        playerToken = playerToken === players[0].token ? players[1].token : players[0].token;
        playerName = playerName === players[0].name ? players[1].name : players[0].name;
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    function gameOutcome() {
    
        const winningConditions = Gameboard().winningConditions;
    
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        switchPlayer();
    }

    function cellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.getAttribute('data-cell-index'));

        if (gameState[index] !== "" || !gameActive) {
            return;
        }

        addCell(cell, index);
        gameOutcome();
    }

    function resetGame() {
        gameActive = true;
        let activePlayer = players[0];
        let playerToken = activePlayer.token;
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
    document.querySelector('.reset').addEventListener('click', resetGame);
}
Game();