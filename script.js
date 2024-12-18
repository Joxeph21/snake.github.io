var blockSize = 25;
var rows = 20;
var cols = 20; 
var block;



var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var foodX ;
var foodY ;

var snakeBody = [];

var gameOver = false;

var context;

var velocityX = 0;
var velocityY = 0;

window.onload = ()=>{
   
  

    block = document.getElementById('world');
    block.height = rows * blockSize;
    block.width = cols * blockSize;
    context= block.getContext('2d');

    document.addEventListener("keyup", snakeMove);

    makeFood();

    setInterval(update, 1000/10);


    
}
var gameOverpage = document.getElementById('gameover');


function newGame(){
    gameOverpage.style.display = 'none';
    window.location.reload()
}

function restartGame(){
    gameOverpage.style.display = 'flex';
}

function update(){
   
    if(gameOver){
        
        return;
    }
    
    context.fillStyle="white";
    context.fillRect(0,0, block.height, block.width);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    

    if(snakeX == foodX && snakeY == foodY ){
        snakeBody.push([foodX, foodY]);
        makeFood();
        eatFood();
      
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
   

    context.fillStyle="black";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    };
    
    if(snakeX < 0 || snakeX > 499 || snakeY < 0 || snakeY > 499){
        gameOver = true;
        restartGame();
    }
    
    for(let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            restartGame();
        }
    }


    
    
}



function makeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
 }




function snakeMove(e){
    if(e.code == 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function eatFood(){
   scoreTab = document.getElementById('scoretab');
    
    var final = parseInt(scoreTab.innerText) + 1;

    scoreTab.innerText = final;

}



