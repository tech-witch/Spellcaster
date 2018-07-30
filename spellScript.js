function setParams(){
  resetSketch();
  calculateSpeed();
  calculateYRotation();
  console.log("spell for "+coreItemID+" with "+wordObjects.length+" words and "+ myItems.length+" items."+ "Speed of "+speed+", Y rotation of "+yRotation);
}

function resetSketch(){
}
//The speed of the spinning shape depends on the amount of words
function calculateSpeed(){
  if (wordObjects.length<5){
    speed=0.001;
  } else if (wordObjects.length<25){
    speed=0.003;
  } else if (wordObjects.length<45){
    speed=0.006;
  } else if (wordObjects.length<75){
    speed=0.01;
  } else if (wordObjects.length<90){
    speed=0.015;
  } else if (wordObjects.length<110){
    speed=0.020;
  } else if (wordObjects.length<150){
    speed=0.025;
  } else if (wordObjects.length<200){
    speed=0.030;
  } else if (wordObjects.length<250){
    speed=0.035;
  } else if (wordObjects.length<300){
    speed=0.04;
  }
}

function calculateYRotation(){
  if(myItems.length<2){
    yRotation=0.1;
  } else if(myItems.length<3){
    yRotation=0.2;
  } else if(myItems.length<4){
    yRotation=0.3;
  } else if(myItems.length<5){
    yRotation=0.4;
  } else if(myItems.length<6){
    yRotation=0.5;
  } else if(myItems.length<7){
    yRotation=0.6;
  } else if(myItems.length<8){
    yRotation=0.7;
  } else if(myItems.length<9){
    yRotation=0.8;
  } else{
    yRotation=0.8;
  }
}

function setLights(){

}


//Returns new val of the color, where val1 is the original and val2 is the desired ultimate color
function colorTransition(val1, val2){
  /*if (val1<val2){
    return ++val1;
  }
  if (val1>val2){
    return --val1;
  }
  if (val1==val2){
    return val1;
  }*/
}

function keyPressed() {
  if (keyCode > 48 && keyCode <60 ){
      currentState=keyCode;
  }
}


function initVariables(){

  switch(coreItemID){
    case "file":
    console.log("file");
      mySpell = new ParticleSystem();
      break;
    case "link":
    console.log("link");
      mySpell = new sphereSystem(0.1,20, 10, 150, 5);
      break;
    case "place":
    console.log("place");
      mySpell = new squareSystem(0.3,4,height/15, 5);
      break;
    case "infinity":
    console.log("infinity");
      mySpell = new sphereSystem(0.1, 40, 20, 200, 1);
      break;
     case "time":
     console.log("time");
       mySpell = new torusSystem;
       break;
  }

  angle=0;
  xRotation=5;
  zRotation=0;
  row=10;
  col=10;

}

//FUNCTION TO SEE IF MOUSE WAS MOVED FROM TOP TO BOTTOM
var mouseCounter=0;
var completedTop=false;
var currentTop; //Is the mouse currently in the top half?
var wasTop; //Was the mouse previous in the top half?
function mouseMvmtTop(){
  if(!completedTop){
        document.getElementById("headerInstruction").innerHTML="CLICK THE CENTER YOUR SPELL & MOVE CURSOR FROM TOP TO BOTTOM";
    if (mouseY<height/3){
      currentTop=true;
      wasTop=true;
    }
    if (mouseY>height/3*2 && wasTop){
      currentTop=false;
      completedTop=true;
    }
    if (completedTop){
      console.log("completed");
      step1=true;
      completedSide=false;
    }
    mouseCounter++;
      if (mouseCounter>300){
        mouseCounter=0;
        wasTop=false;
        console.log("'reset'");
      }
  }

}

//FUNCTION TO SEE IF MOUSE WAS MOVED FROM LEFT TO RIGHT
var completedSide=true;
var currentLeft; //Is the mouse currently in the top half?
var wasLeft; //Was the mouse previous in the top half?
function mouseMvmtLeft(){

  if(!completedSide){
      document.getElementById("headerInstruction").innerHTML="MOVE CURSOR FROM LEFT TO RIGHT";
    if (mouseX<width/4){
      currentLeft=true;
      wasLeft=true;
    }
    if (mouseX>width/4*3 && wasLeft){
      currentLeft=false;
      completedSide=true;
    }
    if (completedSide){
      console.log("completed 2");
      step2 =true;
      document.getElementById("headerInstruction").innerHTML="YOUR SPELL IS CASTED - IT LIVES FOREVER IN THE BLOCKCHAIN - LET PROPAGATE FOR MAXIMUM EFFECT";
    }
    mouseCounter++;
      if (mouseCounter>300){
        mouseCounter=0;
        wasLeft=false;
        console.log("'reset'");
      }
  }

}


//FUNCTION TO SEE IF MOUSE WAS MOVED FROM LEFT TO RIGHT
var completedDiag=true;
var currentTopRight; //Is the mouse currently in the top half?
var wasTopRight; //Was the mouse previous in the top half?
function mouseMvmtDiag(){
  if(!completedDiag){
    document.getElementById("headerInstruction").innerHTML="Move cursor in diagonal from top left to bottom right";
    if (mouseX>width/2 && mouseY<height/2){
        console.log("TR");
      currentTopRight=true;
      wasTopRight=true;
    }
    if (mouseX<width/2 && mouseY>height/2 && wasTopRight){
              console.log("TL");
      currentTopRight=false;
      completedDiag=true;
    }
    if (completedDiag){
      console.log("completed 3");
      step3 =true;
            document.getElementById("headerInstruction").innerHTML="YOUR SPELL IS CASTED - IT LIVES FOREVER IN THE BLOCKCHAIN - LET PROPAGATE FOR MAXIMUM EFFECT";
    }
    mouseCounter++;
      if (mouseCounter>300){
        mouseCounter=0;
        wasTopRight=false;
        console.log("'reset'");
      }
  }

}
