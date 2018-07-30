/*
Global variables that matter to the sketch:

coreItemID: ID of the cauldron item which is the most important of the spells
  Affects the basic shape of the spells

wordObjects: array containing all the words of the spell
  Must be read out (using annyang) to activate different parts of the spells




*/




var y=30;
var index=0;
var myblue =255;
var mygreen=255;
var myred=255;
var desiredBlue=0;
var desiredRed=0;
var desiredGreen=0;
var angle=0;
var counter=0;
var yRotation=5;
var zRotation=5;

var particleSystem;
var system2;
var system3;

var mySpell;
var init;

var randomCol;
var randomCol2;
var randomCol3;

//These vars keep track of the iteraction with the user
var step1=false;
var step2=false;
var step3=false;

var currentState=0;

//Var for my DIY sphere
var col=40; //Amount of detail (nmb of points) on the spherical point map
var row=10;


function setup() {
  var canvas = createCanvas(windowWidth, windowHeight/100*80, WEBGL);
  particleSystem= new ParticleSystem();
  system2 = new squareSystem(0.1,3,100, 2);
  system3= new sunSystem(0.5,1,5,200);

  mySpell = new sphereSystem(0.1, 40, 20, 200, 1);

  background(255);
  var x = 0;
  var y = (windowHeight/10);
  canvas.id("myCanvas");

  var index =0;
  canvas.position(x, y);

  init=false;
  setParams();

  randomCol=random(0,255);
  randomCol2=random(0,255);
  randomCol3=random(0,255);
}

function draw() {




  /*if (casted){

    y = y - 1;
    if (y < 0) {
      y = 40;
    }
    if (y==0){
      console.log("change");
      if (index>wordObjects.length){
        index=0;
    }
    var myWord = wordObjects[index];

    //    console.log(wordObjects[index]);
    desiredBlue = (myWord.sorrow)/3*255;
    desiredRed = (myWord.anger)/3*255;
    desiredGreen = (myWord.joy)/3*255;
    myblue=colorTransition(myblue, desiredBlue);
    myred=colorTransition(myred, desiredRed);
    mygreen=colorTransition(mygreen, desiredGreen);
    }

    myblue=colorTransition(myblue, desiredBlue);
    myred=colorTransition(myred, desiredRed);
    mygreen=colorTransition(mygreen, desiredGreen);

    console.log(myblue,myred,mygreen);

    background(myred,mygreen,myblue);
    ellipse(mouseX, mouseY, 80, 80);

  }
  */

  if(casted){

  if (!init){
    initVariables();
    init=true;
  }


  //pointLight(0, 0, 255, -200, -200, 200);
  //pointLight(0, 255, 0, 200, 200, 200);

  let fov = PI/3; //Field of view
  let cameraZ = (height/2)/tan(fov/2);
  perspective(fov,width/height, cameraZ/10, cameraZ*10);

  let x = map(mouseX,0,width,-200,200);
  let y = map(mouseY,0,height,-200,200);

//  camera(0,0,(height/2)/tan(PI/6), -x,-y,0, 0, 1,0);

  push();
//  ambientLight(0,100,0);
  directionalLight(randomCol,randomCol2,randomCol3,1,0,0);
  directionalLight(255-randomCol,255-randomCol,255-randomCol3,0,1,-0.5);
  background(255);

  specularMaterial(255);

  //drawSphere();
  if(step1){
    rotateX(angle);
    rotateY(angle*yRotation);
    rotateZ(angle*zRotation);
    angle+=0.002;
  }

  mySpell.show();
  //system3.show();

  pop();
  stroke(220);
  strokeWeight(1);
  if(!completedTop){
    mouseMvmtTop();
  }

  if (!completedSide){
    mouseMvmtLeft();
  }

  if (!completedDiag){
    mouseMvmtDiag();
  }

  if (step3){
    mySpell.updateParticleScatter(1.05);
  }

}
}
