const room = document.getElementById("game-room")
const boxes = document.querySelectorAll(".box")
const playerRed = document.getElementById("player-red")
const playerBlue = document.getElementById("player-blue")
const waitingMessage = document.getElementById("waiting-message")
const playerRedTimer = playerRed.querySelector(".timer")
const playerBlueTimer = playerBlue.querySelector(".timer")
const ledCapturedPieces = document.getElementById("red-captured-pieces")
const blueCapturedPieces = document.getElementById("blue-captured-pieces")

//const gameOverMessageContainer = document.getElementById("game-over-message-container")
//const winnerUsername = gameOverMessageContainer.querySelector("p strong")
//const myScoreElement = document.getElementById("my-score")
//const enemyScoreElement = document.getElementById("enemy-score")

// Game Variables
let user = null;

let search = window.location.search.split("&")

let roomId = null;
let password = null;

let gameDetails = null;

let gameHasTimer = false;
let timer = null;
let myTurn = false;
let kingIsAttacked = false;
let pawnToPromotePosition = null;
let castling = null;

let gameOver = false;
let myScore = 0;
let enemyScore = 0;

let gameStartedAtTimestamp = null

if(search.length > 1){
    roomId = search[0].split("=")[1]
    password = search[1].split("=")[1]
}else{
    roomId = search[0].split("=")[1]
}


// Functions
const fetchUserCallback = (data) => {
    user = data;

    if(password){
        socket.emit("user-connected", user, roomId, password);
    }else{
        socket.emit("user-connected", user, roomId);
    }

    socket.emit("get-game-details", roomId, user)
}

fetchData("/api/user-info", fetchUserCallback)

// Display mayhem board logic
const displayMayhemPieces = () => {
    boxes.forEach(box => {
        box.innerHTML = ""
    })

    redPieces.forEach(piece => {
        let box = document.getElementById(piece.position)

        box.innerHTML += `
            <div class="piece red" data-piece="${piece.piece}" data-points="${piece.points}">
                <img src="${piece.icon}" alt="Mayhem Piece" >
            </div>
        `
    })

    bluePieces.forEach(piece => {
        let box = document.getElementById(piece.position)

        box.innerHTML += `
            <div class="piece blue" data-piece="${piece.piece}" data-points="${piece.points}">
                <img src="${piece.icon}" alt="Mayhem Piece" >
            </div>
        `
    })

}

displayMayhemPieces()