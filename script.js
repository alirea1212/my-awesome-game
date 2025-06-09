const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 700;

let score = 0;
let gameOver = false;

const ship = {
  x: 100,
  y: canvas.height / 2,
  width: 60,
  height: 40,
  vy: 0,
  gravity: 0.6,
  jumpPower: -12,
  color: '#00fff7'
};

const obstacles = [];
const colors = ['#ff4e50','#f9d423','#24fe41','#00fff7','#ffde59','#ff66c4'];

const keys = {};

document.addEventListener('keydown', e => {
  keys[e.code] = true;
  if(e.code === 'Space' && !gameOver){
    ship.vy = ship.jumpPower;
  }
  if(gameOver && e.code === 'Enter'){
    restartGame();
  }
});
document.addEventListener('keyup', e => {
  keys[e.code] = false;
});

function createObstacle() {
  const height = 100 + Math.random() * 150;
  const gap = 180;
  const yTop = 0;
  const yBottom = height + gap;
  obstacles.push({
    x: canvas.width,
    width: 70,
    topHeight: height,
    bottomY: yBottom,
    bottomHeight: canvas.height - yBottom,
    colorTop: colors[Math.floor(Math.random() * colors.length)],
    colorBottom: colors[Math.floor(Math.random() * colors.length)]
  });
}

function drawShip() {
  ctx.fillStyle = ship.color;
  ctx.shadowColor = ship.color;
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(ship.x, ship.y);
  ctx.lineTo(ship.x - ship.width, ship.y - ship.height / 2);
  ctx.lineTo(ship.x - ship.width, ship.y + ship.height / 2);
  ctx.closePath();
  ctx.fill();

  // پنجره سفینه
  ctx.fillStyle = '#022024';
  ctx.beginPath();
  ctx.arc(ship.x - ship.width / 2.5, ship.y, 10, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacles() {
  obstacles.forEach(ob => {
    // مانع بالا
    ctx.fillStyle = ob.colorTop;
    ctx.shadowColor = ob.colorTop;
    ctx.shadowBlur = 15;
    ctx.fillRect(ob.x, 0, ob.width, ob.topHeight);
    // مانع پایین
    ctx.fillStyle = ob.colorBottom;
    ctx.shadowColor = ob.colorBottom;
    ctx.shadowBlur = 15;
    ctx.fillRect(ob.x, ob.bottomY, ob.width, ob.bottomHeight);
  });
}

function update() {
  if(gameOver) return;

  ship.vy += ship.gravity;
  ship.y += ship.vy;

  if(ship.y + ship.height / 2 > canvas.height) {
    gameOver = true;
  }
  if(ship.y - ship.height / 2 < 0){
    ship.y = ship.height / 2;
    ship.vy = 0;
  }

  if(frameCount % 90 === 0) {
    createObstacle();
  }

  obstacles.forEach(ob => ob.x -= 5);

  if(obstacles.length && obstacles[0].x + obstacles[0].width < 0){
    obstacles.shift();
    score++;
    document.getElementById('score').textContent = 'امتیاز: ' + score;
  }

  // چک برخورد
  for(let ob of obstacles){
    if(ship.x + ship.width/3 > ob.x && ship.x - ship.width/3 < ob.x + ob.width){
      if(ship.y - ship.height/2 < ob.topHeight || ship.y + ship.height/2 > ob.bottomY){
        gameOver = true;
        break;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawObstacles();
}

let frameCount = 0;
function gameLoop() {
  update();
  draw();
  if(!gameOver){
    frameCount++;
    requestAnimationFrame(gameLoop);
  } else {
    showRestart();
  }
}

function showRestart(){
  const btn = document.getElementById('restart');
  btn.style.display = 'block';
  btn.onclick = () => {
    restartGame();
  };
}

function restartGame(){
  score = 0;
  frameCount = 0;
  ship.y = canvas.height / 2;
  ship.vy = 0;
  obstacles.length = 0;
  gameOver = false;
  document.getElementById('score').textContent = 'امتیاز: 0';
  document.getElementById('restart').style.display = 'none';
  gameLoop();
}

gameLoop();
