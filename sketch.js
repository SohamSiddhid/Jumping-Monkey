//declaring the variables
var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;
var collideSound,jumpSound;

var gameOverImg,gameOver;

function preload() {
  
//preloading the images and animations
  monkey_running = loadAnimation ("sprite_0.png",
                                  "sprite_1.png",
                                  "sprite_2.png",
                                  "sprite_3.png",
                                  "sprite_4.png",
                                  "sprite_5.png",
                                  "sprite_6.png",
                                  "sprite_7.png",
                                  "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
  collideSound=loadSound("collide with banana.mp3");
  jumpSound=loadSound("jump.aac");
  gameOverImg=loadImage("gameOver.png");
  
  
}

function setup () {
//creating the monkey sprite
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

//creating the ground sprite
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;

//calling the fruit and obstacle group   
  FoodGroup=createGroup();
  obstacleGroup=createGroup();

//making the survival time
  survivalTime=0;

  score=0;
  
  gameOver=createSprite(180,150,20,20);
  gameOver.addImage("gameOver.png",gameOverImg);
  gameOver.scale=0.6;
}

function draw () {

//setting the background colour  
      background("lavender");
  
   text("score:"+score,300,50)

  if(gameState===PLAY){
    gameOver.visible=false;
    
//adding survival time  
  textSize(20);
  fill("black");
  survivalTime =survivalTime+ Math.ceil(frameCount/60);
  text("Survival Time:"+survivalTime,100,50);
    
//resetting the ground  
  if (ground.x < 0) {
      ground.x = ground.width / 2;
  }
    
//making the monkey jump when space is pressed  
  if (keyDown("space")) {
      monkey.velocityY = -12;    
  }
    
//adding gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

//calling the function
  createFood();
  createObstacles();

  
//making the monkey eat banana  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1;
  }
    
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }    
  
  }  
  else if(gameState===END){
    gameOver.visible=true;
      
    if(mousePressedOver(gameOver)){
      reset();
    }
    
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    ground.velocityX=0;
    monkey.velocityY=0;
  }
  



    
  
  drawSprites();

}

//creating function for making bananas
function createFood () {
  if(frameCount % 80 === 0) {
    banana=createSprite(400,200,20,20);
    banana.y=Math.round(random(120,200))
    banana.velocityX=-6;
    banana.addImage(bananaImage); 
    banana.scale=0.1;
    banana.lifetime=60;
  
    FoodGroup.add(banana);  
    
  }
}

//creating function for making the obstacles
function createObstacles () {
  if(frameCount % 300 === 0){
    obstacle=createSprite(400,330,20,20);
    obstacle.x=Math.round(random(50,400));
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-6;
    obstacle.lifetime=60;
    
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState=PLAY;
  
  gameOver.visible=false;
  
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  score=0;
  
  survivalTime=0;
   
}

