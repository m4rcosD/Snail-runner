let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '1px solid black';
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')
let butBackR = document.querySelector('.bottonRestart')
let butBackS = document.querySelector('.bottonStart')
//image and audios

let bgDay = new Image();
bgDay.src = './image/fundodia.png'

let snail = new Image();
snail.src = './image/caracolVeloz.png'

let guard = new Image();
guard.src = './image/108-1086679_svg-freeuse-stock-tiny-sam-game-art-partners.png'

let tank = new Image();
tank.src = './image/tank.png'

//end of images and audios

// let guardX = 750, guardY = 690
let snailY = 700, snailX = 300, snaileH = 150, snaileW = 166
let tankX = 750, tankY = 750, tankH = 200, tankW = 200
let intervalId = 0;
let isGameOver = false;
let score = 0;
let falling = false;
let guardX = 600
jump = false

function move (){
if(jump && snailY > 520){
   snailY = snailY -10
}
if(jump == false && snailY <= 690){
    snailY = snailY +8
}
}
let tanks = [
    {x: tankX, y: tankY},
    {x: tankX + 850, y: tankY}
]

function gameOver (){
    cancelAnimationFrame(intervalId)
    canvas.style.display = 'none'
    butBackS.style.display = 'none'
    startBtn.style.display = 'none' 
    restartBtn.style.display = 'block'
        isGameOver = false;
        snailY = 700
        score = 0;
        tanks = [
            {x: tankX, y: tankY},
            {x: tankX + 850, y: tankY}
        ]

}
/*
let guard = [
    {x: guardX, y: guardY},
    {x: guardX + 850, y: guardY}
]
*/

function splash(){
    restartBtn.style.display = 'none'
    startBtn.style.display = 'block'
    canvas.style.display = 'none'
}
function draw(){
    console.log('check')
    canvas.style.display = 'block'
    butBackS.style.display = 'none'
    butBackR.style.display = 'none'
    startBtn.style.display = 'none'
    restartBtn.style.display = 'none'
    ctx.drawImage(bgDay, 0, 0, 1400, 850)
    ctx.drawImage(snail, snailX, snailY, snaileW, snaileH )
    move() 
    for(let i = 0; i< tanks.length; i++){
        ctx.drawImage(tank, tanks[i].x, tanks[i].y, tankW, tankH)
        tanks[i].x = tanks[i].x - 8
    if(tanks[i].x + tankW < 0 ) {
            tanks[i].x = 1400
        }
        if (snailX == tanks[i].x +  tankW) {
            score++
        }
    if(snailX + snaileW >= tanks[i].x && snailX <= tanks[i].x + tankW && (snailY <= tanks[i].y + tankH && snailY+snaileH >= tanks[i].y)){
            isGameOver = true
}
    }
    if (isGameOver) {
        gameOver()
        butBackR.style.display = 'block'
        
    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
}
document.addEventListener('keydown', (event) => {
if(event.key == ' '){
jump = true
} 
})
document.addEventListener('keyup', (event) => {
    if(event.key == ' '){
    jump = false
    } 
    })
window.addEventListener('load', () => {
splash()
    startBtn.addEventListener('click', () => {
        draw()
        console.log('heeeereeee')
    })
    restartBtn.addEventListener('click', () => {
        draw()
    })

})