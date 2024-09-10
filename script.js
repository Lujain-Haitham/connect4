var playerRed ="r";
var playerYellow = "y";
var currentPlayer = playerRed;
var currentCol;
var gameOver = false;
var board;
var rows =6;
var cols =7;

window.onload = function(){
    startGame();
}

function startGame(){
    board = [];
    currentCol = [5,5,5,5,5,5,5];
    for(let r =0 ; r<rows ; r++){
        let row =[]
        for(let c =0 ; c<cols ; c++){
            row.push(' ');

            let circle =document.createElement("div");
            circle.id = r.toString() + '-' + c.toString();
            circle.classList.add("circle");
            circle.addEventListener("click",play)
            document.getElementById("board").append(circle);
        }
        board.push(row);
    }
}

function play(){
    if(gameOver){
        return
    }
    else{
        let place = this.id.split("-");
        let c = place[1];
        let r = currentCol[c];
        
        if(r<0){
            return;
        }

        board[r][c]= currentPlayer;
        let circle = document.getElementById(r.toString() + '-' + c.toString());
        if(currentPlayer == playerRed){
            circle.classList.add("red");
            currentPlayer = playerYellow;
        }
        else if (currentPlayer == playerYellow){
            circle.classList.add("yellow");
            currentPlayer = playerRed;
        }

        r-=1;
        currentCol[c] =r;

        winner();
    }
}

function winner(){
    // horizontal
    for (let r =0; r <rows; r++){
        for(let c =0; c<cols-3; c++){
            if(board[r][c]!=' '){
                if(board[r][c]== board[r][c+1] && board[r][c+1]== board[r][c+2] && board[r][c+2]== board[r][c+3] ){
                    winnerColor(r,c);
                    return;
                }
            }
        }
    }

    //vertical
    for (let c=0 ; c<cols; c++){
        for(let r=0; r<rows-3; r++){
            if(board[r][c]!=' ')
                {if(board[r][c]== board[r+1][c] && board[r+1][c]== board[r+2][c] && board[r+2][c]== board[r+3][c] ){
                 winnerColor(r,c);
                 return;
                }
            }
        }
    }

    //diagonal
    for( let r=3 ; r<rows; r++){
        for(let c=0; c<cols-3; c++){
            if(board[r][c]!= ' '){
                if(board[r][c]==board[r-1][c+1] && board[r-1][c+1] ==board[r-2][c+2] && board[r-2][c+2]==board[r-3][c+3] ){
                    winnerColor(r,c);
                    return;
                }
            }
        }
    }

    //anti-diagonal
    for( let r=0 ; r<rows-3; r++){
        for(let c=0; c<cols-3; c++){
            if(board[r][c]!= ' '){
                if(board[r][c]==board[r+1][c+1] && board[r+1][c+1] ==board[r+2][c+2] && board[r+2][c+2]==board[r+3][c+3] ){
                    winnerColor(r,c);
                    return;
                }
            }
        }
    }
}

function winnerColor(r,c){
    let winner = document.getElementById("winner")
    if(board[r][c]== playerRed) {
        winner.innerText= "Red wins!"
    }
    if(board[r][c]== playerYellow) {
        winner.innerText= "Yellow wins!"
    }
    gameOver=true;
}