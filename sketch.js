//Name spacing
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//creating game objects
var canvas,ground,vGround;
var bgImg,backImage;
var bhoviyaImg,bhoviya;
var jImg,jButton;
var rImg,rButton;
var bhoviya_running;
var k1,k2,k3,k4,k5,k6;
var virus_Img, coin_Img, vaccine_Img;
var keysGroup, coinsGroup, virusGroup, virus1Group, vaccineGroup,coins1Group,coins2Group;
var keyCount = 0;
var lifeCount = 3;
var coinCount = 0;
//var life = [];
//var scoreCount = 0;
var fLifeImg;
var lifeCount_Img,fLife;
var coincount_Img,coincount_Obj;
var keycount_Img,keycount_obj;
var bhoviya_Img;

//Gamestates
var PLAY = 1;
var END = 0;
var WAIT = 2;
var gameState = PLAY;

//restart images and objects
var restart_Img, restart;
var gameover_IMg, gameOver;


function preload(){
    bgImg = loadImage("b1.png");
    jImg = loadImage("jumpButton.png");
    rImg = loadImage("runButton.png");
    bhoviya_running = loadAnimation("g1.png","g2.png","g3.png","g4.png","g5.png","g6.png");
    k1 = loadImage("1.png");
    k2 = loadImage("2.png");
    k3 = loadImage("3.png");
    k4 = loadImage("4.png");
    k5 = loadImage("5.png");
    k6 = loadImage("6.png");
    k7 = loadImage("7.png");
    virus_Img = loadImage("Corona.png");
    coin_Img = loadImage("coins.png");
    vaccine_Img = loadImage("vaccine.png");
    lifeCount_Img = loadImage("lifeCount.png");
    fLifeImg = loadImage("lifeWined.png");
    coincount_Img = loadImage("coinCount.png")
    keycount_Img = loadImage("keyCount.png");
    gameover_Img = loadImage("gameOver.png");
    restart_Img = loadImage("restart.png");

}

function setup(){
   canvas = createCanvas(displayWidth - 50, displayHeight - 200);
   backImage = createSprite((displayWidth - 50)/2, (displayHeight - 450)/2);
   backImage.addImage(bgImg);
   backImage.scale = 1.5;
  
  //backImage.x = backImage.width/2;

    bhoviya = createSprite((displayWidth - 50)/8,(displayHeight - 450),50,50);
    bhoviya.addAnimation("bhoviya",bhoviya_running);
    bhoviya.scale = 0.8;
    //bhoviya.debug = true;
    bhoviya.setCollider("rectangle",0,0,80,175);

    gameOver = createSprite((displayWidth - 50)/2, (displayHeight - 200)/2);
    gameOver.addImage("gameOver",gameover_Img);

    restart = createSprite((displayWidth - 50)/2, (displayHeight - 100)/2);
    restart.addImage("restart",restart_Img);

    
    fLife = createSprite((displayWidth - 50)/12,displayHeight - 780);
    fLife.addImage("freeLife",lifeCount_Img);
    fLife.scale = 0.1;
    //fLife.visible = false;

    coincount_Obj = createSprite((displayWidth - 50)/12,displayHeight - 810 );
    coincount_Obj.addImage("coinscount",coincount_Img);
    coincount_Obj.scale = 0.5;

    keycount_obj = createSprite((displayWidth - 50)/12,displayHeight - 840 );
    keycount_obj.addImage("keycount",keycount_Img);
    keycount_obj.scale = 0.1;



    ground = createSprite((displayWidth - 50)/2,(displayHeight - 20),(displayWidth - 50)+(displayWidth - 50),20);
    //ground.visible = false;

    vGround = createSprite((displayWidth-50)/2,(displayHeight - 200),(displayWidth - 50),20);
    vGround.visible = false;

    jButton = createSprite((displayWidth - 50)/1.5 + 300,(displayHeight - 300),50,50);
    jButton.addImage("jumpButton",jImg);
    jButton.scale = 0.8;

    //rButton = createSprite((displayWidth - 50)/1.5+275,(displayHeight - 250));
    //rButton.addImage("runButton",rImg);
    //rButton.scale = 0.8;

    keysGroup = new Group();
    coinsGroup = new Group();
    eLifeGroup = new Group();
    virusGroup = new Group();
    virus1Group = new Group();
    coins1Group = new Group();
    coins2Group = new Group();

    

    
}

function draw(){
    background(0);
    fill ("White")
    textSize(25);
    
    if(gameState === PLAY){
      ground.velocityX = -2;
      backImage.velocityX = -3;

      
    if(keysGroup.isTouching(bhoviya)){
      keysGroup.destroyEach();
      keyCount = keyCount+1;

    }

    if(virusGroup.isTouching(bhoviya)){
      virusGroup.destroyEach();
      lifeCount = lifeCount-1;
      text(" 1 life deducted ", (displayWidth - 50)/8,displayHeight - 770);

    }

    if(virus1Group.isTouching(bhoviya)){
      virus1Group.destroyEach();
      lifeCount = lifeCount-1;
    }

    if(coinsGroup.isTouching(bhoviya)){
       coinsGroup.destroyEach();
       coinCount = coinCount+1;
     }

     if(coins1Group.isTouching(bhoviya)){
      coins1Group.destroyEach();
      coinCount = coinCount+1;
    }

    if(coins2Group.isTouching(bhoviya)){
      coins2Group.destroyEach();
      coinCount = coinCount+1;
    }

    if(eLifeGroup.isTouching(bhoviya)){
      eLifeGroup.destroyEach();
      lifeCount++
    }

    // if(frameCount%100 === 0 && frameCount > 0 ){
      // fLife.visible = true;
     //} else {
       //fLife.visible = false;
     //}
     gameOver.visible = false;
  restart.visible = false;
  
      
     if(mousePressedOver(jButton) ) {
        bhoviya.velocityY = -20;
    }
    bhoviya.velocityY = bhoviya.velocityY + 0.8;
    bhoviya.collide(vGround);
    
    if(lifeCount === 0 || keyCount === 7){
      gameState = END;

    }

      

    //if(mousePressedOver(rButton)) {
       // bhoviya.velocityX = +5;
        //bhoviya.velocityY = 0;
    //}

    if(ground.x<0){
       ground.x = ground.width/2;
    }
    if(backImage.x<0){
      backImage.x = backImage.width/2;
    }
    //console.log(frameCount);
    //scoreCount = scoreCount + Math.round(getFrameRate()/60);
    //console.log(scoreCount);
    
    spawnKeys();
    spawnVirus();
    spawnLife();
    spawnCoins();
       
    }
    if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    vGround.velocityX = 0;
    bhoviya.velocityY = 0;
    backImage.velocityX = 0;
    keysGroup.setVelocityXEach(0);
    eLifeGroup.setVelocityXEach(0);
    coins1Group.setVelocityXEach(0);
    coins2Group.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    virusGroup.setVelocityXEach(0);
    virus1Group.setVelocityXEach(0);
    
    
   
    bhoviya.changeAnimation("collided",bhoviya_Img);
    //bhoviya.y = (displayHeight - 400);
    bhoviya.collide(vGround);
    
    
    //set lifetime of the game objects so that they are never destroyed
    keysGroup.setLifetimeEach(-1);
    eLifeGroup.setLifetimeEach(-1);
    coins1Group.setLifetimeEach(-1);
    coins2Group.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    virusGroup.setLifetimeEach(-1);
    virus1Group.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    


    }
    

    
    drawSprites();
    text(" : "+ keyCount, (displayWidth - 50)/10,displayHeight - 825);
    text(" : "+ coinCount, (displayWidth - 50)/10,displayHeight - 800);
    text(" : "+ lifeCount, (displayWidth - 50)/10,displayHeight - 770);
    text("Press jump to make bhoviya jump and catch, beware of the virus as it will reduce your life",(displayWidth - 50)/6,displayHeight - 825)
    text("catch 7 keys to win a heart for a life",(displayWidth - 50)/3,displayHeight - 225)
    
    
}   

function reset(){
  gameState = PLAY;
  //ground.velocityX = -2;
  //backImage.velocityX = -3;
   gameOver.visible = false;
   restart.visible = false;
  
    
    keysGroup.destroyEach();;
    eLifeGroup.destroyEach();
    coins1Group.destroyEach();
    coins2Group.destroyEach();
    coinsGroup.destroyEach();
    virusGroup.destroyEach();
    virus1Group.destroyEach();
    
  
  bhoviya.changeAnimation("running",bhoviya_running);
  
  
  keyCount = 0;
  coinCount = 0;
  lifeCount = 3;
  
}


function spawnKeys() {
    if(frameCount % 700 === 0) {
      var keys = createSprite(displayWidth/1,displayHeight/4,10,40);
      keys.velocityX = -4;
      keys.y = Math.round(random(displayHeight - 650,displayHeight - 800));
      var rand = Math.round(random(1,7));
      switch(rand) {
        case 1: keys.addImage(k1);
                break;
        case 2: keys.addImage(k2);
                break;
        case 3: keys.addImage(k3);
                break;
        case 4: keys.addImage(k4);
                break;
        case 5: keys.addImage(k5);
                break;
        case 6: keys.addImage(k6);
                break;
        case 7: keys.addImage(k7);
                break;
        default: break;
      }          
      keys.scale = 0.5;
      keys.lifetime = 600;
      //keys.debug = true;
      keysGroup.add(keys);
    }
  }

  function spawnVirus() {
    if (frameCount % 593 === 0) {
      var virus = createSprite(displayWidth/1,displayHeight/4,10,40);
      virus.y = Math.round(random(displayHeight - 550,displayHeight - 750));
      virus.addImage(virus_Img);
      virus.scale = 0.3;
      virus.velocityX = -3;
      virus.lifetime = 600;
      virus.depth = bhoviya.depth;
      bhoviya.depth = bhoviya.depth + 1;
      virusGroup.add(virus);
    }
    if (frameCount % 459  === 0) {
      var virus1 = createSprite(displayWidth/1,displayHeight/4,10,40);
      virus1.y = Math.round(random(displayHeight - 550,displayHeight - 750));
      virus1.addImage(virus_Img);
      virus1.scale = 0.3;
      virus1.velocityX = -3;
      virus1.lifetime = 600;
      virus1.depth = bhoviya.depth;
      bhoviya.depth = bhoviya.depth + 1;
      virus1Group.add(virus1);
    }
    
  }

  function spawnLife() {
        if (frameCount % 1000 === 0) {
          var eLife = createSprite(displayWidth/1,displayHeight/4,10,40);
          eLife.y = (displayHeight-200)/2;
          eLife.addImage(fLifeImg);
          eLife.scale = 0.3;
          eLife.velocityX =-3;
          eLife.lifetime = 600;
          eLife.depth = bhoviya.depth;
          eLife.depth = bhoviya.depth + 1;
          eLifeGroup.add(eLife);
        }
        
        
      }


      function spawnCoins() {
        if (frameCount % 409 === 0) {
          var coins = createSprite(displayWidth/1,displayHeight/4,10,40);
          coins.y = Math.round(random(displayHeight - 600,displayHeight - 750));
          coins.addImage(coin_Img);
          coins.scale = 1;
          coins.velocityX = -3;
          coins.lifetime = 600;
          coins.depth = bhoviya.depth;
          bhoviya.depth = bhoviya.depth + 1;
          coinsGroup.add(coins);
        }
        if (frameCount % 623 === 0){
          var coins1 = createSprite(displayWidth/1,displayHeight/4,10,40);
          coins1.y = Math.round(random(displayHeight - 600,displayHeight - 750));
          coins1.addImage(coin_Img);
          coins1.scale = 1;
          coins1.velocityX = -3;
          coins1.lifetime = 600;
          coins1.depth = bhoviya.depth;
          bhoviya.depth = bhoviya.depth + 1;
          coins1Group.add(coins1);
        }

       // if (frameCount % 900 === 0){
         // var coins2 = createSprite(displayWidth/1,displayHeight/4,10,40);
          //coins2.y = Math.round(random(displayHeight - 600,displayHeight - 750));
          //coins2.addImage(coin_Img);
          //coins2.scale = 1;
          //coins2.velocityX = -3;
          //coins2.lifetime = 600;
          //coins2.depth = bhoviya.depth;
          //bhoviya.depth = bhoviya.depth + 1;
          //coins2Group.add(coins2);
        //}
        
      }

