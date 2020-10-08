var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Player, ground, groundImage, playerImage, playerFlippedImage, playerAttack, playerAttackFlipped, platformImage;
var platform1;
var enemy, enemyImage;
var enemyGroup, platformGroup;
var enemyAnimation, enemyAttack;
var block;

function preload(){
playerImage = loadImage("Game/Player/Player.png")
groundImage = loadImage("Game/Ground1600.png")
playerFlippedImage = loadImage("Game/Player/PlayerFlippesd.png");
playerAttack = loadImage("Game/Player/PlayerBasicAttack0 (1).png");
playerAttackFlipped = loadImage("Game/Player/PlayerBasicAttack0 (2).png");
platformImage = loadImage("Game/Platform.png");
enemyImage = loadImage("Game/Enemy/Enemy.png");
enemyAnimation = loadAnimation("Game/Enemy/EnemyBasicAttack1-0 (1).png","Game/Enemy/EnemyBasicAttack2-0 (1).png","Game/Enemy/EnemyBasicAttack3-0 (1).png");
}


function setup() {
  createCanvas(displayWidth,displayHeight-143);

  block = createSprite(180,539,10,900);
  block.visible = false;
  
  ground = createSprite(displayWidth/2+3100,displayHeight/2+180);
  ground.addImage(groundImage);
  ground.scale = 5;
  ground.setCollider("rectangle",0,10,ground.width,ground.height-110);
  //ground.debug = true;

  Player = createSprite(displayWidth/2-500, displayHeight/2+50, 50, 50);
  Player.addImage(playerImage);
  Player.scale = 2;

  enemyGroup = new Group();
  platformGroup = new Group();
  
  Player.setCollider("rectangle",0,0,100,50);
  //Player.debug = true;

    
}

function draw() {
  background("black");  
  //camera.position.x = Player.x;
  //console.log(Player.y);

  //text(Player.x+","+Player.y, 200,200);
  

  Player.collide(block);

  if(gameState === PLAY){
    
    ground.velocityX = -9;
    ground.velocityX = -(9 + 2 * frameCount/150);
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    Player.velocityY = Player.velocityY + 1.3;

    if(keyDown("SPACE") && Player.y === 539){
      Player.velocityY = -30;
      //Player.y = Player.y-20;
     // Player.velocityX = 0;
    }
    
    if(Player.y === 539){
      Player.velocityX = -10;

      if(Player.x ===183){
        Player.velocityX = 0;
      }
    }

    if(touches.length > 0 || keyDown("SPACE") && Player.y === 340){
      Player.velocityX = 8;
      Player.velocityY = -25;
      touches=[];
     }

     
     
    

    platformSpawn();
    enemySpawn();
    if(enemyGroup.isTouching(Player)){
      enemyGroup.setColliderEach("circle", 0, 0, 40);
      enemyAttack = createSprite(displayWidth/2-450,displayHeight/2+120,10,10);
      enemyAttack.addAnimation("Attack",enemyAnimation);
      enemyAttack.scale = 3;
      enemyAttack.velocityX = -5;
      enemyAttack.lifetime = 50;
      Player.lifetime = 70;
      enemyGroup.destroyEach();
      platformGroup.destroyEach();
      gameState = END;
    }
    

if(Player.isTouching(enemyGroup)){
  gameState = END;
}
    
  }
  else if(gameState === END){
    Player.y = 539;
    fill("red");
    textSize(50);
    textFont("Times New Roman");
    text("You Have Died!", 600,400);
    ground.velocityX = 0;
    enemyGroup.setVelocityXEach(0);
    
    platformGroup.setVelocityXEach(0);
  }

  camera.position.y = Player.y-100;

  Player.collide(ground);
 Player.collide(platformGroup);

  
  

//if(Player.isTouching(ground)){

//console.log(Player.y);
//}

// if(keyDown("A")){
//   Player.x = Player.x-10;
//   Player.addImage(playerFlippedImage);
//   //Player.velocityY = 0;
  
// }

// if(keyDown("D")){
//   Player.x = Player.x+10;
//   Player.addImage(playerImage);
//   //Player.velocityY = 0;
  
// }




  drawSprites();
}
function enemySpawn(){
if(frameCount % 150 ===0){

enemy = createSprite(displayWidth,random(450,550),50,50);
// if(frameCount % 100 ===0){
  enemy.velocityX = -(15 + 2 * frameCount/150);
// }
//enemy.velocityX = -15;
  enemy.addImage(enemyImage);
  enemy.scale = 3;
  enemyGroup.add(enemy);
  //enemy.debug = true;
  enemy.lifetime = 120;
  enemy.setCollider("circle",-1,-4,15);
}
}

function platformSpawn(){
  if(frameCount % 200 ===0){
    platform1 = createSprite(displayWidth,430);
    platform1.velocityX = -(10 + 1.5 * frameCount/100);
    platform1.velocityX = -10;
    platform1.addImage(platformImage);
    platform1.scale = 4;
    //platform1.debug = true;
    platform1.lifetime = 170;
    platform1.setCollider("rectangle",0,0,65,20);
    platformGroup.add(platform1);

  
  }
  
  }