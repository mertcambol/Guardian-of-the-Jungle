var introImg;
var page2Img;
var gameState = "intro";
var bgImg;
var meteorImg;
var treeImg;
var loseImg;
var treeX = [];
var treeY = [];
var treeBurned = [];
var enemyX = [];
var enemyY = [];
var saved = 0;
var burned = 0;

var playBtn = { x: 300, y: 420, w: 200, h: 80 };

function preload() {
  introImg = loadImage("intro.png");
  page2Img = loadImage("page2.png");
  bgImg = loadImage("bg.jpg");
  meteorImg = loadImage("meteor.png");
  treeImg = loadImage("tree.png");
  loseImg = loadImage("lose.jpeg");
}
// -----------------------------------------------------
// SCENE1 Properties
// -----------------------------------------------------
let s1; 																// Scene1 Class variable
let s1_Game_Bg = "start_bg.jpg";				// Background image of the scene1
let s1_StartBtn_Src = "btn_start.png";	// Start Button image of the scene1

// -----------------------------------------------------
// SCENE2 Properties
// -----------------------------------------------------
let s2; 																// Scene 2 Class variable
let s2_GameBg_Src = "bg.jpg";						// Background image of the scene1
let s2_Hero_Src = "monkey.gif";					// Hero image for the HeroClass
let s2_Banana_Src = "banana.png";				// Banana image for the BananaClass
let s2_GameTime = 30;										// Game Time

// -----------------------------------------------------
// SCENE3 Properties
// -----------------------------------------------------
let s3; // Scene 3
let s3_Fail_Bg = "bg_fail.jpg";						// Background image of the scene3 -> fail
let s3_Success_Bg = "bg_success.png";			// Background image of the scene3 -> success
let s3_ReStartBtn_Src = "btn_restart.png";// Restart Button image of the scene3

// -----------------------------------------------------
// Global Game Variables
// -----------------------------------------------------
let currentScene = 1;										// Variable stores the current game scene 1=Scene1, 2=Scene2, 3=Scene3 
let totalScore = 0;											// Variable stores the current score

function setup() {
  createCanvas(800, 800);
  textAlign(CENTER, CENTER);

  for (var i = 0; i < 10; i++) {
    treeX[i] = random(100, 700);
    treeY[i] = random(500, 750);
    treeBurned[i] = false;
  }
}

function draw() {
  if (gameState == "intro") drawIntro();
  if (gameState == "page2") drawPage2();
  if (gameState == "play") drawGame();
  if (gameState == "lose") drawLose();
}

//Homepage
function drawIntro() {
  image(introImg, 0, 0, width, height);

  if (
    mouseX > playBtn.x &&
    mouseX < playBtn.x + playBtn.w &&
    mouseY > playBtn.y &&
    mouseY < playBtn.y + playBtn.h
  ) {
    fill(255, 255, 255, 150);
    cursor(HAND);
  } else {
    fill(0, 0, 0, 0);
    cursor(ARROW);
  }

  noStroke();
  rect(playBtn.x - 79, playBtn.y + 13, playBtn.w * 3 / 2 + 75, playBtn.h * 3 / 2 + 5, 40);
}

//Instructions Page
function drawPage2() {
  image(page2Img, 0, 0, width, height);

  if (
    mouseX > playBtn.x &&
    mouseX < playBtn.x + playBtn.w &&
    mouseY > playBtn.y &&
    mouseY < playBtn.y + playBtn.h
  ) {
    fill(255, 255, 255, 150);
    cursor(HAND);
  } else {
    fill(0, 0, 0, 0);
    cursor(ARROW);
  }

  noStroke();
  rect(playBtn.x - 65, playBtn.y + 17, playBtn.w * 3 / 2 + 75, playBtn.h * 3 / 2 + 8, 40);
}

//Game
function drawGame() {
 image(bgImg, 0, 0, width, height);

 if (frameCount % 40 == 0) {
 let meteorW = 220;
  enemyX.push(random(meteorW / 2, width - meteorW / 2));
  enemyY.push(0);

  }

for (var i = 0; i < treeX.length; i++) {
if (!treeBurned[i]) {
    image(treeImg, treeX[i] - 80, treeY[i] - 140, 220, 200);
} 
else {
    tint(255, 100, 100);
    image(treeImg, treeX[i] - 40, treeY[i] - 140, 220, 200);
    noTint();
    }
  }

for (var j = enemyY.length - 1; j >= 0; j--) {
    enemyY[j] += 3;
    image(meteorImg, enemyX[j] - 40, enemyY[j] - 40, 220, 180);

   
for (var k = 0; k < treeX.length; k++) {
if (!treeBurned[k] &&
    dist(enemyX[j], enemyY[j], treeX[k], treeY[k]) < 60
) {
    treeBurned[k] = true;
    burned++;
    enemyX.splice(j, 1);
    enemyY.splice(j, 1);
break;
      }
    }

if (enemyY[j] > height) {
      enemyX.splice(j, 1);
      enemyY.splice(j, 1);
    }
  }

  fill(0, 100);
  rect(20, 20, 260, 50, 20);
  rect(width - 280, 20, 260, 50, 20);

  fill(255);
  textSize(22);
  text("Destroyed Meteors: " + saved, 150, 45);
  text("Burned Trees: " + burned, width - 150, 45);


if (burned >= 3) gameState = "lose";
}

function drawLose() {
  image(loseImg, 0, 0, width, height);

  textSize(50);
  fill(255);
  stroke(0);
  strokeWeight(3);
  text("YOU LOSE!", width / 2, 400);

  textSize(25);
  text("Click to try again", width / 2, 480);
}

//mouse
function mousePressed() {
  if (gameState == "intro") {
    if (
      mouseX > playBtn.x &&
      mouseX < playBtn.x + playBtn.w &&
      mouseY > playBtn.y &&
      mouseY < playBtn.y + playBtn.h
    ) {
      gameState = "page2";
    }
  } else if (gameState == "page2") {
    if (
      mouseX > playBtn.x &&
      mouseX < playBtn.x + playBtn.w &&
      mouseY > playBtn.y &&
      mouseY < playBtn.y + playBtn.h
    ) {
      gameState = "play";
    }
  } else if (gameState == "play") {
   for (var j = enemyX.length - 1; j >= 0; j--) {
  let meteorW = 240;
  let meteorH = 200;
  
  if (
    mouseX > enemyX[j] - meteorW / 2 &&
    mouseX < enemyX[j] + meteorW / 2 &&
    mouseY > enemyY[j] - meteorH / 2 &&
    mouseY < enemyY[j] + meteorH / 2
  ) {
    enemyX.splice(j, 1);
    enemyY.splice(j, 1);
    saved++;
  }
}
  } else if (gameState == "win" || gameState == "lose") {
    saved = 0;
    burned = 0;
    enemyX = [];
    enemyY = [];

    for (var i = 0; i < treeBurned.length; i++) {
      treeBurned[i] = false;
    }

    gameState = "intro";
  }
}
