const  playBoard = document.querySelector(".tokon-tany");
const  scoreElement = document.querySelector(".score");
const  highScoreElement = document.querySelector(".high-score");

let gameOver = false ;
let PomaX , PomaY;
let snakeX = 5 , snakeY = 10;
let snakeBody = [];
let velocityX = 0 , velocityY = 0 ;
let setIntervalId;
let score = 0 ;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Meilleur-score : ${highScore}`;

const changePomaPosition = () => {
    PomaX = Math.floor(Math.random() * 30 ) +1 ;
    PomaY = Math.floor(Math.random() * 30 ) +1 ;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Vous avez perdu la partie !Appuyez sur OK pour recommencez.... ");
    location.reload();
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
if (gameOver) return handleGameOver();

     let htmlMarkup =  `<div class="Poma" style="grid-area: ${PomaY} / ${PomaX} "></div>`;

    if (snakeX === PomaX && snakeY === PomaY){
        changePomaPosition();
        snakeBody.push([PomaX,PomaY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score",highScore);

        scoreElement.innerText = `Score : ${score}`;
        highScoreElement.innerText = `Meilleur-score : ${highScore}`;

    }

    for (let i = snakeBody.length -1; i > 0 ; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX , snakeY];

     snakeX += velocityX;
     snakeY += velocityY;

     if( snakeX <= 0 || snakeX >30 || snakeY <=0  || snakeY > 30  ){
        gameOver = true ; 
     }

     for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup +=  `<div class="loha" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
        if (i!== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true ;
        }
     }
     
     playBoard.innerHTML = htmlMarkup;
}


changePomaPosition();
setIntervalId = setInterval(initGame , 175);
document.addEventListener("keydown", changeDirection);