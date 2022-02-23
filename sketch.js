//var marks = [12, 100, 56, 97,54,545,54,5,4,44];
//initialization, condition,increment
//for(varj =0;j<marks.length ; i=i+3){
//}


var PLAY = 1;
var END = 0;

var gameState = PLAY;
var trex ,trex_running,cloud,cloudImg,obstacle;
var edges,ground,groundImg;
var invisbleGround;
var ob1,ob2,ob3,ob4,ob5,ob6;
var score = 0;
var obstaclesGroup, cloudsGroup;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200)
   
  //create a trex sprite
  trex = createSprite(50,163 ,20, 50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground",groundImg);


  // create a invisble Ground
  invisbleGround = createSprite(200,190 , 400, 20);
  invisbleGround.visible = false;
  //create edgeSprite
  edges=createEdgeSprites();
 
  var num = Math.round(random(1,100))
  //Concatenation method- adding var and text by using +
console.log(num + " is the random number")

//creating group
obstaclesGroup = new Group()   //createGroup()
cloudsGroup = new Group()
 

}



  function draw(){
    background("white");

    //text("string",x,y)
    text("SCORE = "+score,500,50);
    
    
//=== isequalto operator
   if(gameState === PLAY){
     //moving the ground
    ground.velocityX=-2;

    //increasing the score
     score = score + Math.round(frameCount/60)


    //infinetly moving ground
    if(ground.x<0){
      ground.x= ground.width/2 //ground.x=200
      }

      //adding gravity
      trex.velocityY = trex.velocityY + 0.5;



         //console.log(ground.x)
      if(keyDown("SPACE") && trex.y >= 157){
      trex.velocityY=-8
      }
      //calling spawn cloud
      spawnClouds();
      //calling spawn obstacles
      spawnObstacles();

      if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      }

   }else if(gameState === END){
     //stopping the ground
    ground.velocityX=0;


    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);




   }






    
 

 

  

  //collide on ground
  trex.collide(invisbleGround);

  //Calling funtion Spawnclouds
  drawSprites();
  
}

function spawnClouds(){

if(frameCount % 60 === 0){
  cloud = createSprite(600, 100, 40, 10);
  cloud.addImage("cloud",cloudImg);
  cloud.velocityX = -3
  cloud.scale= 0.5;
  cloud.y = Math.round(random(10,160))

  //assign lifetime to variable
  cloud.lifetime = 200;


  trex.depth = cloud.depth;
  trex.depth = trex.depth+1
 
  //add cloud sprite in group
  cloudsGroup.add(cloud)
}

}

function spawnObstacles(){
  
if(frameCount % 60 ===0){
obstacle = createSprite(600,165,10,40)
obstacle.velocityX = -6

var rnd = Math.round(random(1,6))


switch(rnd){

  case 1: obstacle.addImage("obstacle",ob1);
  break;
  case 2: obstacle.addImage("obstacle",ob2);
  break;
  case 3: obstacle.addImage("obstacle",ob3);
  break;
  case 4: obstacle.addImage("obstacle",ob4);
  break;
  case 5: obstacle.addImage("obstacle",ob5);
  break;
  case 6: obstacle.addImage("obstacle",ob6);
  break;
  default:break;

}
obstacle.scale = 0.5
obstacle.lifetime = 100;


//add obstacle sprite in group
obstaclesGroup.add(obstacle)




}
  
}
