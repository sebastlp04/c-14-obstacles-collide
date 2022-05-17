var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obs, obsGroup, obsImage1,obsImage2,obsImage3,obsImage4,obsImage5,obsImage6;
var score = 0;

var newImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 obsImage1 = loadImage("obstacle1.png");
 obsImage2 = loadImage("obstacle2.png");
 obsImage3 = loadImage("obstacle3.png");
 obsImage4 = loadImage("obstacle4.png");
 obsImage5 = loadImage("obstacle5.png");
 obsImage6 = loadImage("obstacle6.png");

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
obsGroup = new Group();
cloudsGroup = new Group();
  
}

function draw() {
  background(180);

  if(gameState === PLAY)
  {
    ground.velocityX = -4;
    score = score + Math.round(frameCount / 60);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8

    spawnClouds();
    spawnObstacles();

if(obsGroup.isTouching(trex))
{
  gameState = END
}

  } else if(gameState === END)
  {
    ground.velocityX = 0;
    obsGroup.setVelocityEach(0);
    cloudsGroup.setVelocityEach(0);
  }

  text ("Score = " + score,520,20 );
  
  trex.collide(invisibleGround);

 
  //aparecer nubes

  drawSprites();
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud);
    
    //asignar tiempo de vida a una variable
    cloud.lifetime = 210
    
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    }
  }

    function spawnObstacles()
    {
      if(frameCount % 60 === 0)
      {
obs = createSprite(600,165,10,40);
obs.velocityX = -5;
obs.scale = 0.5
obs.lifetime = 210;
obsGroup.add(obs);
trex.depth = obs.depth;
var rand = Math.round(random(1,6));
switch(rand)
{
  case 1 : obs.addImage(obsImage1);
  break;
  case 2 : obs.addImage(obsImage2);
  break;
  case 3 : obs.addImage(obsImage3);
  break;
  case 4 : obs.addImage(obsImage4);
  break;
  case 5 : obs.addImage(obsImage5);
  break;
  case 6 : obs.addImage(obsImage6);
  break;
  default : break;
}
      }
    }


