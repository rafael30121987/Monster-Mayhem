const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const yAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let player = null;
let enemy = null;

let selectedPiece = null;

const redPieces = [
    {
        position: "A-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "B-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "C-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "D-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "E-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "F-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "G-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "H-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "I-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "J-10",
        icon: "../assets/mayhem-icons/red/mayhem-ghost-red.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "A-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "B-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "C-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "D-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "E-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "F-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "G-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "H-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "I-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "J-9",
        icon: "../assets/mayhem-icons/red/mayhem-vampire-red.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "A-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "B-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "C-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "D-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "E-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "F-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "G-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "H-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "I-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "J-8",
        icon: "../assets/mayhem-icons/red/mayhem-werewolf-red.svg",
        points: 5,
        piece: 'werewolf'
    }
]

const bluePieces = [
    {
        position: "A-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "B-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "C-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "D-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "E-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "F-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "G-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "H-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "I-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "J-1",
        icon: "../assets/mayhem-icons/blue/mayhem-ghost-blue.svg",
        points: 5,
        piece: 'ghost'
    },
    {
        position: "A-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "B-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "C-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "D-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "E-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "F-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "G-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "H-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "I-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "J-2",
        icon: "../assets/mayhem-icons/blue/mayhem-vampire-blue.svg",
        points: 5,
        piece: 'vampire'
    },
    {
        position: "A-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "B-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "C-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "D-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "E-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "F-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "G-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "H-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "I-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
    {
        position: "J-3",
        icon: "../assets/mayhem-icons/blue/mayhem-werewolf-blue.svg",
        points: 5,
        piece: 'werewolf'
    },
]

const getRookPossibleMoves = (xAxisPos, yAxisPos, xAxisIndex, yAxisIndex) => {
    let possibleMoves = []

    let topCollision = false;
    let bottomCollision = false;
    let rightCollision = false;
    let leftCollision = false;
    let yInc = 1;
    let xInc = 1;

    while(!topCollision || !bottomCollision || !leftCollision || !rightCollision){
        if(!topCollision || !bottomCollision){
            if(yAxisIndex + yInc < yAxis.length){
                if(!topCollision){
                    let topBlock = document.getElementById(`${xAxisPos}-${yAxis[yAxisIndex + yInc]}`);

                    if(topBlock.childElementCount > 0){
                        if(topBlock.children[0].classList.contains(enemy)){
                            possibleMoves.push(topBlock)
                        }

                        topCollision = true
                    }else{
                        possibleMoves.push(topBlock)
                    }
                }
            }else{
                topCollision = true
            }

            if(yAxisIndex - yInc > -1){
                if(!bottomCollision){
                    let bottomBlock = document.getElementById(`${xAxisPos}-${yAxis[yAxisIndex - yInc]}`);
    
                    if(bottomBlock.childElementCount > 0){
                        if(bottomBlock.children[0].classList.contains(enemy)){
                            possibleMoves.push(bottomBlock)
                        }
    
                        bottomCollision = true
                    }else{
                        possibleMoves.push(bottomBlock)
                    }
                }
            }else{
                bottomCollision = true
            }

            yInc++
        }

        if(!leftCollision || !rightCollision){
            if(xAxisIndex + xInc < xAxis.length){
                if(!rightCollision){
                    let rightBlock = document.getElementById(`${xAxis[xAxisIndex + xInc]}-${yAxisPos}`);

                    if(rightBlock.childElementCount > 0){
                        if(rightBlock.children[0].classList.contains(enemy)){
                            possibleMoves.push(rightBlock)
                        }
                        rightCollision = true;
                    }else{
                        possibleMoves.push(rightBlock)
                    }
                }
            }else{
                rightCollision = true
            }

            if(xAxisIndex - xInc > -1){
                if(!leftCollision){
                    let leftBlock = document.getElementById(`${xAxis[xAxisIndex - xInc]}-${yAxisPos}`);

                    if(leftBlock.childElementCount > 0){
                        if(leftBlock.children[0].classList.contains(enemy)){
                            possibleMoves.push(leftBlock)
                        }
                        leftCollision = true;
                    }else{
                        possibleMoves.push(leftBlock)
                    }
                }
                
            }else{
                leftCollision = true
            }

            xInc++;
        }
    }

    return possibleMoves
}

const getBishopPossibleMoves = (xAxisIndex, yAxisIndex) => {
    let possibleMoves = []

    let topLeftCollision = false;
    let topRightCollision = false;
    let bottomLeftCollision = false;
    let bottomRightCollision = false;

    let yInc = 1;
    let xInc = 1;

    while(!topLeftCollision || !topRightCollision || !bottomLeftCollision || !bottomRightCollision){
        if(!topLeftCollision || !topRightCollision){
            if(yAxisIndex + yInc < yAxis.length && xAxisIndex - xInc > -1){
                if(!topLeftCollision){
                    let topLeftBlock = document.getElementById(`${xAxis[xAxisIndex - xInc]}-${yAxis[yAxisIndex + yInc]}`);

                    if(topLeftBlock.childElementCount > 0){
                        if(topLeftBlock.children[0].classList.contains(enemy)){
                            possibleMoves.push(topLeftBlock)
                        }

                        topLeftCollision = true
                    }else{
                        possibleMoves.push(topLeftBlock)
                    }
                }
            }else{
                topLeftCollision = true
            }
            
            if(yAxisIndex + yInc < yAxis.length && xAxisIndex + xInc < xAxis.length){
                if(!topRightCollision){
                    let topRightBlock = document.getElementById(`${xAxis[xAxisIndex + xInc]}-${yAxis[yAxisIndex + yInc]}`);

                    if(topRightBlock.childElementCount > 0){
                        if(topRightBlock.children[0].classList.contains(enemy)){
                            possibleMoves.push(topRightBlock)
                        }

                        topRightCollision = true
                    }else{
                        possibleMoves.push(topRightBlock)
                    }
                }
            }else{
                topRightCollision = true
            }
        }

        if(!bottomLeftCollision || !bottomRightCollision){
            if(yAxisIndex - yInc > -1 && xAxisIndex - xInc > -1){
                if(!bottomLeftCollision){
                    let bottomLeftBlock = document.getElementById(`${xAxis[xAxisIndex - xInc]}-${yAxis[yAxisIndex - yInc]}`);

                    if(bottomLeftBlock.childElementCount > 0){
                        if(bottomLeftBlock.children[0].classList.contains(enemy)){
                            possibleMoves.push(bottomLeftBlock)
                        }

                        bottomLeftCollision = true
                    }else{
                        possibleMoves.push(bottomLeftBlock)
                    }
                }
            }else{
                bottomLeftCollision = true
            }
            
            if(yAxisIndex - yInc > -1 && xAxisIndex + xInc < xAxis.length){
                if(!bottomRightCollision){
                    let bottomRightBlock = document.getElementById(`${xAxis[xAxisIndex + xInc]}-${yAxis[yAxisIndex - yInc]}`);

                    if(bottomRightBlock.childElementCount > 0){
                        if(bottomRightBlock.children[0].classList.contains(enemy)){
                            possibleMoves.push(bottomRightBlock)
                        }

                        bottomRightCollision = true
                    }else{
                        possibleMoves.push(bottomRightBlock)
                    }
                }
            }else{
                bottomRightCollision = true
            }
        }

        xInc++;
        yInc++;
    }

    return possibleMoves
}

const switchPlayerAndEnemy = () => {
    if(player === 'red'){
        player = 'blue'
        enemy = 'red'
    }else{
        player = 'red'
        enemy = 'blue'
    }
}