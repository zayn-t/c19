var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop(); 
  spookySound.setVolume(0.2)
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1; 
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3 
  doorsGroup=new Group();
  climbersGroup=new Group();
  invBlockGroup=new Group();
}

function draw() {
  background(0);
  if(gameState == "play") {
    if(tower.y > 400){
      tower.y = 300
    } 
    if (keyDown("left")) {
      ghost.x-=2
    } 
    if (keyDown("right")) {
      ghost.x+=2 
    } 
    if(keyDown("space")) {
      ghost.velocityY = -12;
      
  }
  
  //add gravity
  ghost.velocityY = ghost.velocityY + 0.8
    drawSprites(); 
  spawnDoors(); 
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0
  }
    if(ghost.y>600 || ghost.isTouching(invBlockGroup)) {
      gameState="end"
    }
  }
  else if(gameState == "end") { 
    textSize(35) 
    fill ("red") 
    stroke("yellow") 
    strokeWeight(5)
    text('Game Over!', 200, 300) 
  }
  

 
} 
function spawnDoors() {
  //write code here to spawn the clouds
  if (frameCount % 250 === 0) {
    var door = createSprite(200,-50); 
    var climber = createSprite(200,10); 
    var invBlock = createSprite(200,15); 
    invBlock.width=climber.width 
    invBlock.height=2
    invBlock.debug=true
    door.x = Math.round(random(120,400)); 
    climber.x=door.x 
    invBlock.x=door.x
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1; 
    invBlock.velocityY = 1;
     //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invBlock.lifetime = 800;

    //adjust the depth
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    //add each cloud to the group
    doorsGroup.add(door); 
    climbersGroup.add(climber);
    invBlockGroup.add(invBlock);
  }
}
