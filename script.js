const players = ['O', 'X']

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
]

const cells = document.querySelectorAll(".cell")

let currPlayer = players[0]
let origBoard = []

startGame()

function startGame() {
    //origBoard = []
    for (i = 0; i < cells.length; i++) {
        cells[i].innerText = ""
        cells[i].style.removeProperty("background-color")
        cells[i].addEventListener("click", turnClick, false)
        origBoard[i] = 0
    }
}

function switchPlayer() {
    if (currPlayer == players[0]) 
    {
        currPlayer = players[1] 
    } else { 
        currPlayer = players[0]
    }
}

function turnClick(square) {
    if(origBoard[square.target.id] == 0)
    {
        turn(square.target.id, currPlayer)
        switchPlayer()
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player
    document.getElementById(squareId).innerText = player
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, [])
    let gameWon = null
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player }
            break
        }
    }
    return gameWon
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == players[0] ? "green" : "red"
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", turnClick, false)
    }
}