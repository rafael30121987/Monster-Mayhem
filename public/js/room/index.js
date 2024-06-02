const room = document.getElementById("game-room")
const boxes = document.querySelectorAll(".box")
const playerRed = document.getElementById("player-red")
const playerBlue = document.getElementById("player-blue")
const waitingMessage = document.getElementById("waiting-message")
const playerRedTimer = playerRed.querySelector(".timer")
const playerBlueTimer = playerBlue.querySelector(".timer")
const redCapturedPieces = document.getElementById("red-captured-pieces")
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
    addPieceListeners();
}

const onClickPiece = (e) => {
    if(!myTurn || gameOver){
        return;
    }

    hidePossibleMoves()

    let element = e.target.closest(".piece");
    let position = element.parentNode.id;
    let piece = element.dataset.piece;

    if(selectedPiece && selectedPiece.piece === piece && selectedPiece.position === position){
        hidePossibleMoves()
        selectedPiece = null
        return;
    }

    selectedPiece = {position, piece}

    let possibleMoves = findPossibleMoves(position, piece);

    showPossibleMoves(possibleMoves)
}

const addPieceListeners = () => {
    document.querySelectorAll(`.piece.${player}`).forEach(piece => {
        piece.addEventListener("click", onClickPiece)
    })

    document.querySelectorAll(`.piece.${enemy}`).forEach(piece => {
        piece.style.cursor = "default"
    })
}


//possible moves logic

const showPossibleMoves = (possibleMoves) => {
    possibleMoves.forEach(box => {
        let possibleMoveBox = document.createElement('div')
        possibleMoveBox.classList.add("possible-move");

        possibleMoveBox.addEventListener("click", move)

        box.appendChild(possibleMoveBox)
    })
}

const hidePossibleMoves = () => {
    document.querySelectorAll('.possible-move').forEach(possibleMoveBox => {
        let parent = possibleMoveBox.parentNode;
        possibleMoveBox.removeEventListener('click', move)
        parent.removeChild(possibleMoveBox)
    })
}

const findPossibleMoves = (position, piece) => {
    let splittedPos = position.split("-");
    let yAxisPos = +splittedPos[1]
    let xAxisPos = splittedPos[0]

    let yAxisIndex = yAxis.findIndex(y => y === yAxisPos)
    let xAxisIndex = xAxis.findIndex(x => x === xAxisPos)

    switch(piece){
        case 'ghost':
            return Array.prototype.concat(
                getRookPossibleMoves(xAxisPos, yAxisPos, xAxisIndex, yAxisIndex),
                getBishopPossibleMoves(xAxisIndex, yAxisIndex)
            )
        case 'vampire':
            return Array.prototype.concat(
                getRookPossibleMoves(xAxisPos, yAxisPos, xAxisIndex, yAxisIndex),
                getBishopPossibleMoves(xAxisIndex, yAxisIndex)
            )
        case 'werewolf':
            return Array.prototype.concat(
                getRookPossibleMoves(xAxisPos, yAxisPos, xAxisIndex, yAxisIndex),
                getBishopPossibleMoves(xAxisIndex, yAxisIndex)
            )
        default:
            return []
    }
}



// Timer Logic
const updateTimer = (currentPlayer, minutes, seconds) => {
    //if(currentPlayer === 'light'){
    //    playerLightTimer.innerText = 
    //        `${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`
    //}else{
    //    playerBlueTimer.innerText = 
    //        `${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}` 
    //}
}

const timerEndedCallback = () => {
    //socket.emit('timer-ended', roomId, user.username, gameStartedAtTimestamp)
}

// Game Logic
const setCursor = (cursor) => {
    document.querySelectorAll(`.piece.${player}`).forEach(piece => {
        piece.getElementsByClassName.cursor = cursor
    })
}

const startGame = (playerTwo) => {
    playerBlue.querySelector(".username").innerText = playerTwo.username;

    waitingMessage.classList.add("hidden")
    playerBlue.classList.remove("hidden")

    displayMayhemPieces();

}

const endMyTurn = (newPieceBox, pawnPromoted = false, castlingPerformed = false) => {

    myTurn = false;
    setCursor("default")

    saveMove(newPieceBox, pawnPromoted, castlingPerformed);

}

//move logic
const move = (e) => {
    let currentBox = document.getElementById(selectedPiece.position);
    let boxToMove = e.target.parentNode;
    let piece = currentBox.querySelector(".piece");

    hidePossibleMoves();

    let pieceToRemove = null;
    let pieceToRemovePieceImg = null;

    if(boxToMove.children.length > 0){
        if(boxToMove.children[0].classList.contains(player)){
            // performCastling(player, currentBox.id, boxToMove.id)

            return;
        }

        pieceToRemove = boxToMove.children[0];
        pieceToRemovePieceImg = pieceToRemove.children[0]
    }

    currentBox.innerHTML = "";

    if(pieceToRemove){
        capturePiece(pieceToRemove)
        boxToMove.innerHTML = ""
    }

    boxToMove.appendChild(piece)

    let boxesNeededForCheck = {
        currentBox, boxToMove
    }

    let piecesNeededForCheck = {
        piece, pieceToRemove, pieceToRemovePieceImg
    }

    let isMovePossible = canMakeMove(boxesNeededForCheck, piecesNeededForCheck);

    if(!isMovePossible){
        return;
    }

    //

    //if(checkForDraw()){
    //    endGame();
    //    socket.emit("draw", roomId)
    //}

    endMyTurn(boxToMove)
}

const canMakeMove = ({currentBox, boxToMove}, {piece, pieceToRemove, pieceToRemovePieceImg}) => {
    // TODO: Check if move is valid
    let moveIsNotValid = false;

    if(moveIsNotValid){
        selectedPiece = null;

        if(pieceToRemove){
            pieceToRemove.appendChild(pieceToRemovePieceImg)

            boxToMove.removeChild(piece);
            boxToMove.appendChild(pieceToRemove);

            if(pieceToRemove.classList.contains("blue")){
                blueCapturedPieces.removeChild(blueCapturedPieces.lastChild)
            }else{
                redCapturedPieces.removeChild(redCapturedPieces.lastChild)
            }
        }

        currentBox.appendChild(piece);

        return false
    }

    return true
}

const capturePiece = (pieceToRemove) => {
    let pawnImg = pieceToRemove.children[0];

    let li = document.createElement('li')
    li.appendChild(pawnImg);

    if(pieceToRemove.classList.contains('blue')){
        blueCapturedPieces.appendChild(li);

        if(!gameOver){
            if(player === 'red'){
                myScore += parseInt(pieceToRemove.dataset.points)
            }else{
                enemyScore += parseInt(pieceToRemove.dataset.points)
            }
        }
    }else{
        redCapturedPieces.appendChild(li);

        if(!gameOver){
            if(player === 'blue'){
                myScore += parseInt(pieceToRemove.dataset.points)
            }else{
                enemyScore += parseInt(pieceToRemove.dataset.points)
            }
        }
    }
}

const saveMove = (newPieceBox, castlingPerformed) => {
    let move = {from: selectedPiece.position, to: newPieceBox.id, piece: selectedPiece.piece, pieceColor: player}
    selectedPiece = null

    if(gameHasTimer){
        let currentTime;

        if(player === 'red'){
            currentTime = playerRedTimer.innerText
        }else{
            currentTime = playerBlueTimer.innerText
        }

        move.time = currentTime

        timer.stop()
    }

    if(castlingPerformed){
        socket.emit('move-made', roomId, move, null, castling)
    }else{
        socket.emit('move-made', roomId, move)
    }
}

const moveEnemy = (move) => {
    pawnsToPerformElPassant = {}
    elPassantPositions = {}

    const {from , to, piece} = move;

    let boxMovedFrom = document.getElementById(from);
    let boxMovedTo = document.getElementById(to);

    if(boxMovedTo.children.length > 0){
        let pieceToRemove = boxMovedTo.children[0];

        capturePiece(pieceToRemove)
    }

    boxMovedTo.innerHTML = "";

    let enemyPiece = boxMovedFrom.children[0];

    boxMovedFrom.innerHTML = ""
    boxMovedTo.appendChild(enemyPiece);

    myTurn = true;
    setCursor('pointer')

    if(gameHasTimer){
        timer.start()
    }
}

displayMayhemPieces()

// Socket Listeners

socket.on("receive-game-details", (details) => {
    gameDetails = details;

    let playerOne = gameDetails.players[0];

    gameHasTimer = gameDetails.time > 0

    if(!gameHasTimer){
        playerRedTimer.classList.add("hidden")
        playerBlueTimer.classList.add("hidden")
    }else{
        playerRedTimer.innerText = gameDetails.time + ":00";
        playerBlueTimer.innerText = gameDetails.time + ":00";
    }

    playerRed.querySelector(".username").innerText = playerOne.username;

    if(playerOne.username === user.username){
        player = 'red'
        enemy = 'blue'

        myTurn = true
    }else{
        gameStartedAtTimestamp = new Date().toISOString().slice(0, 19).replace("T", ' ')

        player = 'blue'
        enemy = 'red'

        setCursor('default')
        startGame(user)
    }

    if(gameHasTimer){
        timer = new Timer(player, roomId, gameDetails.time, 0, updateTimer, timerEndedCallback)
    }

    hideSpinner();
    room.classList.remove("hidden")
})

socket.on("game-started", (playerTwo) => {
    gameStartedAtTimestamp = new Date().toISOString().slice(0, 19).replace("T", ' ')
    startGame(playerTwo)

    if(gameHasTimer){
        timer.start()
    }
})

socket.on("enemy-moved", (move) => {
    moveEnemy(move)
})