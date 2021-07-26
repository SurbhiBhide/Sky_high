var balloon,balloonImage;
var balloonPosition;
var database;
var height;

function preload(){
   bg =loadImage("city1.jpg");
   balloonImage=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
   diamondI = loadImage("diamond1.png");
  }
function setup() {
  createCanvas(1500,700);

  database = firebase.database();

  balloon=createSprite(200,200,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale = 0.7; 

  balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readHeight, showError);
}

function draw(){
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.x = balloon.x-10;
  }

 if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.x = balloon.x+10;
  }

  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.y = balloon.y-10;
    balloon.scale = balloon.scale -0.01;
  }

  if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.y = balloon.y+10;
    balloon.scale = balloon.scale +0.01;
  }

  drawSprites();

  fill("white");
  stroke("white");
  textSize(40);
  textFont('Monotype Corsiva');
  text("Use arrow keys to move the hot air balloon!",40,50);
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}