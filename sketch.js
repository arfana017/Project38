
var monkey , monkey_running, monkeyStop;
var ground, groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;

var PLAY;
var END;
var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyStop = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(100,300);
  monkey.scale = 0.15;
  monkey.addAnimation("monkey",monkey_running);
  monkey.x = camera.position.x+100
  monkey.y = camera.position.y

  ground = createSprite(300,350,600,10);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("lightgreen");
  
  textSize(30);
  text("Score: " + score,400,100);
  
  if (gameState === PLAY) {

     ground.velocityX = -2;
    monkey.collide(ground);
    monkey.velocityY = monkey.velocityY + 0.8;
  
    spawnBanana();
    spawnObstacles();
    
  if (ground.x < 300) {
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && monkey.y>=100) {
      
      monkey.velocityY = -12;
      
    }
    
    if (monkey.isTouching(FoodGroup)) {
      
      FoodGroup.destroyEach();
      score = score + 1;
      
    }
    
   if (obstacleGroup.isTouching(monkey)) { 
     
    textSize(30);
    text("Game Over!",200,200);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
   }
        
    
  }
  
  //else if (gameState === END) {
    
    
  //}
  
  drawSprites();
  
}

function spawnBanana() {
  
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(370,100));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 300;
    
    FoodGroup.add(banana);
  }
  
  
}

function spawnObstacles() {
  
  if (frameCount % 300 === 0){
   var obstacle = createSprite(600,310,10,40);
    obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(6 + score/100);
           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    obstacleGroup.add(obstacle);
 }
}






