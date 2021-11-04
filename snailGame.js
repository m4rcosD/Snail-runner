let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '1px solid black';
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')
let butBackR = document.querySelector('.bottonRestart')
let butBackS = document.querySelector('.bottonStart')
let mute = document.querySelector('#mute')
//image and audios
let bgDay = new Image();
bgDay.src = './image/fundodia.png'
let snail = new Image();
snail.src = './image/caracolVeloz.png'
let guard = new Image();
guard.src = './image/plane2again.png'
let tank = new Image();
tank.src = './image/tank.png'
let impossible = new Audio()
impossible.src = './musics/ImpossibleThemefulltheme.mp3'
let dadadadadada = new Audio()
dadadadadada.src = './musics/dadadadadada.mp3'
let ahhh = new Audio()
ahhh.src = './musics/AHHHHH.mp3'

//end of images and audios

//positions
let guardX = 2100, guardY = 400, guardH = 200, guardW = 200
let snailY = 700, snailX = 300, snaileH = 150, snaileW = 166
let tankX = 1400, tankY = 750, tankH = 200, tankW = 200
let intervalId = 0;
let isGameOver = false;
let score = 0;
let falling = false;
let speed = 8
jump = false
//end vars and positions

function move (){
if(jump && snailY >= 420){
   snailY = snailY -16
}
if(jump == false && snailY <= 690){
    snailY = snailY +13
}
}
let tanks = [
    {x: tankX, y: tankY},
    {x: tankX + 1400, y: tankY}
]
let guards = [
    {x: guardX, y: guardY}
]

function gameOver (){
    cancelAnimationFrame(intervalId)
    impossible.pause()
    ahhh.play()
    ahhh.volume = 0.2

    canvas.style.display = 'none'
    butBackS.style.display = 'none'
    startBtn.style.display = 'none' 
    restartBtn.style.display = 'block'
    speed = 10
        isGameOver = false;
        snailY = 700
        score = 0;
        tanks = [
            {x: tankX, y: tankY},
            {x: tankX + 1400, y: tankY}
        ]
        guards = [
            {x: 2100, y: 400}
        ]
}
function splash(){
    restartBtn.style.display = 'none'
    startBtn.style.display = 'block'
    canvas.style.display = 'none'
    butBackR.style.display = 'none'
}
function draw(){
    ahhh.pause()
    dadadadadada.pause()
    console.log(score)
    impossible.play()
    impossible.volume = 0.1
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
        tanks[i].x = tanks[i].x - speed
    if(tanks[i].x + tankW < 0 ) {
            tanks[i].x = 2900
        }
        if (tanks[i].x <= snailX && tanks[i].x >=snailX - speed) {
            score++
        }
    if(snailX - 20 + snaileW - 20 >= tanks[i].x + 50 && snailX <= tanks[i].x + 50 + tankW -50 && (snailY - 15 <= tanks[i].y + 50 + tankH -50 && snailY -15+snaileH >= tanks[i].y + 50)){
            isGameOver = true
}
    }
    for(let i = 0; i< guards.length; i++){
        ctx.drawImage(guard, guards[i].x, guards[i].y, guardW, guardH)
        guards[i].x = guards[i].x - speed -0.3
    if(guards[i].x + guardW < 0 ){
        guards[i].x = 1400
       }
        if (guards[i].x <= snailX && guards[i].x >=snailX - speed) {
            score++
        }
    if(snailX -20 + snaileW - 20 >= guards[i].x - 30  && snailX <= guards[i].x - 30 + guardW -50 && (snailY -50 <= guards[i].y -50 + guardH -50 && snailY - 35 +snaileH >= guards[i].y -50)){
            isGameOver = true
}
}
if(score > 5) {
    speed = 13
}
if(score > 10) {
    speed = 16
}
if(score > 15) {
    speed = 20
}
if(score > 23) {
    speed = 25
}
if(score > 30) {
    speed = 30
}
if(score > 34) {
    speed = 34
}

    if (isGameOver) {
        gameOver()
        butBackR.style.display = 'block'
    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
    ctx.font = '64px Verdana'
    ctx.fillText(`Score: ${score}`, 30, 90 )
}

// if(score >= 30){
//     return =
// }else{
//     return =
// }
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
    dadadadadada.play()
    dadadadadada.volume = 0.5
    splash()
    startBtn.addEventListener('click', () => {
        draw()
        console.log('heeeereeee')
    })
    restartBtn.addEventListener('click', () => {
        draw()
    })
    })


    // $ git add .
    // $ git commit -m "Solved lab"
    // $ git push origin master