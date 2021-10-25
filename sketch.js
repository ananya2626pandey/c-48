var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg ,zombieGrp;
var bullet,bulletImg,bulletGrp,bullets=80;
var score=0;
var life=3;
var heart1,heart2,heart3,heart1Img,heart2Img,heart3Img;
var gameState="play";


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png")

  bulletImg = loadImage ("assets/bulletImg.png")

  heart1Img = loadImage ("assets/heart_1.png")

  heart2Img= loadImage ("assets/heart_2.png")

  heart3Img= loadImage ("assets/heart_3.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

 zombieGrp=new Group();
 bulletGrp=new Group();

 heart1=createSprite(windowWidth-150,windowHeight-630,20,20);
 heart1.addImage(heart1Img);
 heart1.visible=false;
 heart1.scale=0.30;

 heart2=createSprite(windowWidth-150,windowHeight-630,20,20);
 heart2.addImage(heart2Img);
 heart2.visible=false;
 heart2.scale=0.30;

 heart3=createSprite(windowWidth-150,windowHeight-630,20,20);
 heart3.addImage(heart3Img);
 heart3.visible=false;
 heart3.scale=0.30;



}

function draw() {
  background(0); 

if(gameState==="play"){
//moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite (player.x+200 ,player.y-25,20,20);
 bullet.addImage(bulletImg);
 bulletGrp.add(bullet);
 player.addImage(shooter_shooting)

 bullet.velocityX = 10;
 bullet.scale = 0.05;
 bullets=bullets-1;
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGrp.isTouching(player)){
  for(var i=0;i<zombieGrp.length; i++){
    if(zombieGrp[i].isTouching(player)){
      zombieGrp[i].destroy();
      life=life-1;

    }
  }
}

if(zombieGrp.isTouching(bulletGrp)){
  for(var i=0;i<zombieGrp.length; i++){
    if(zombieGrp[i].isTouching(bulletGrp)){
      zombieGrp[i].destroy();
      bulletGrp.destroyEach();
      score= score+1;

    }
  }
}

if(life===3){
  heart1.visible=false;
  heart2.visible=false;
  heart3.visible=true;

}

if(life===2){
  heart1.visible=false;
  heart2.visible=true;
  heart3.visible=false;

}

if(life===1){
  heart1.visible=true;
  heart2.visible=false;
  heart3.visible=false;

}

if(life===0||bullets===0){
 gameState="lost";
}

if(score===70){
  gameState="won";
}

enemy();

}


  
drawSprites();

textSize(25);
fill("red");
text ("Score: "+ score,windowWidth-200, windowHeight-580);
text ("Life: "+ life, windowWidth-200, windowHeight-550);
text ("Bullets: "+bullets,windowWidth-200,windowHeight-520);

if(gameState==="lost"){
  fill("white");
  textSize(40);
  text("You Lost",windowWidth/2,windowHeight/2);
  zombieGrp.destroyEach();
  player.destroy();
}

if(gameState==="won"){
  fill("white");
  textSize(40);
  text("You Won",windowWidth/2,windowHeight/2);
  zombieGrp.destroyEach();
  player.destroy();
}

}

function enemy(){
 if(frameCount%60===0){
  zombie = createSprite(windowWidth+50,random(windowHeight-600,windowHeight-150),40,40);
  zombie.addImage(zombieImg);

  zombie.scale=0.15;
  zombie.velocityX=-3;

  zombie.lifetime = 400;

  zombieGrp.add(zombie);
 }
  


}
