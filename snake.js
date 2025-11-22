const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const scoreText = document.getElementById("compteur");
const resetButton = document.getElementById("reset");
const gameHeight=canvas.height;
const gameWidth=canvas.width;
let snakeColor="green";
let foodColor="red";
let snakeBorder="black"
const unit=25;
let xVelocity=unit;
let yVelocity=0;
let running=false;
let foodX;
let foodY;
let score=0;
let snake=[
    {x:unit*4,y:0},
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}
]
startGame()
function startGame(){
    running=true;
    scoreText.textContent=score
    createFood();
    drawFood();
    nextTick();
}
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearcanvas();
            drawFood()
            drawSnake();
            moveSnake();
            checkGameOver();
            nextTick();
        },100)
    }
    else{
        displayGameOver()
    }
}
function createFood(){
    function randomFood(min,max){
        const randNum=Math.round((Math.random() * (max-min)+min)/unit)*unit
        return randNum;
    };
    foodX=randomFood(0,gameWidth-unit);
    foodY=randomFood(0,gameHeight-unit);
}
function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unit,unit)
}
function drawSnake(){
    snake.forEach((snakePart)=>{
        ctx.fillStyle=snakeColor;
        ctx.fillStroke=snakeBorder;
        ctx.fillRect(snakePart.x,snakePart.y,unit,unit);
        ctx.strokeRect(snakePart.x,snakePart.y,unit,unit)
    })
}
function moveSnake(){
    const head={x:snake[0].x+xVelocity,y:snake[0].y+yVelocity};
    snake.unshift(head)
    if(snake[0].x===foodX&&snake[0].y===foodY){
        score++;
        scoreText.textContent=score;
        createFood()
    }
    else{
        snake.pop()
    }
}
function clearcanvas(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,gameWidth,gameHeight);
}
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=gameWidth):
        case(snake[0].y<0):
        case(snake[0].y>=gameHeight):
            running=false;
            break;
    }
    for(let i=1;i<snake.length;i++){
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y){
            running=false;
        }
    }
}
function displayGameOver(){
    ctx.font="50px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("Game Over!",gameWidth/2,gameHeight/2);
    running=false;
}
window.addEventListener("keydown",changeDirection);
function changeDirection(e){
    const key=e.keyCode;
    const left=37;
    const up=38;
    const right=39;
    const down=40;
    const goingUp=yVelocity===-unit;
    const goingDown=yVelocity===unit;
    const goingRight=xVelocity===unit;
    const goingLeft=xVelocity===-unit;
    switch(true){
        case(key===right&&!goingLeft):
            xVelocity=unit;
            yVelocity=0;
            break;
        case(key===left&&!goingRight):
            xVelocity=-unit;
            yVelocity=0;
            break;
        case(key===up&&!goingDown):
            xVelocity=0;
            yVelocity=-unit;
            break;
        case(key===down&&!goingUp):
            xVelocity=0;
            yVelocity=unit;
            break;
    }
}
function resetGame(){
    score=0;
    xVelocity=unit;
    yVelocity=0;
    snake=[
        {x:unit*4,y:0},
        {x:unit*3,y:0},
        {x:unit*2,y:0},
        {x:unit,y:0},
        {x:0,y:0}, 
    ]
}
resetButton.addEventListener("click",()=>{
    resetGame();
})