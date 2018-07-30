




draw(){



  //Dot based sphere
    for (i = 0; i < total; i++){
      for (j = 0; j < total; j++){
        var myVector1=sphereArray[i][j];
        push();
        vertex(myVector1.x,myVector1.y,myVector1.z);
        sphere(1,2);
        pop();
      }
    }

    //Half-moon layers
      for (i = 0; i < total; i++){
        beginShape();
        for (j = 0; j < total; j++){
          var myVector1=sphereArray[i][j];
          vertex(myVector1.x,myVector1.y,myVector1.z);
        }
        endShape();
      }




//Origami-like sphere with interesting light reflection.
for (i = 0; i < total; i++){
  beginShape();
  for (j = 0; j < total; j++){
    var myVector1=sphereArray[i][j];
    vertex(myVector1.x,myVector1.y,myVector1.z);
    if (i+1<total){
      var myVector2=sphereArray[i+1][j];
      vertex(myVector2.x,myVector2.y,myVector2.z);
    } else{
      var myVector2=sphereArray[0][j];
      vertex(myVector2.x,myVector2.y,myVector2.z);
      }
  }
  endShape();
}






}

function drawSphere(){

switch(coreItemID){
  case "file":
  for (i = 0; i < col; i++){
    for (j = 0; j < row; j++){
      var myVector1=sphereArray[i][j];
      push();
      translate(myVector1.x,myVector1.y,myVector1.z);
      sphere(1,2);
      pop();
    }
  }
  break;
  case "link":
  for (i = 0; i < col; i++){
    beginShape();
    for (j = 0; j < row; j++){
      var myVector1=sphereArray[i][j];
      vertex(myVector1.x,myVector1.y,myVector1.z);
    }
    endShape();
  }
  break;
  case "place":
  for (i = 0; i < col; i++){
    beginShape();
    for (j = 0; j < row; j++){
      var myVector1=sphereArray[i][j];
      vertex(myVector1.x,myVector1.y,myVector1.z);
      if (i+1<col){
        var myVector2=sphereArray[i+1][j];
        vertex(myVector2.x,myVector2.y,myVector2.z);
      } else{
        var myVector2=sphereArray[0][j];
        vertex(myVector2.x,myVector2.y,myVector2.z);
        }
    }
    endShape();
  }
  break;
  case "profile":
    sphere(200);
  break;
  case "planet":
  for (i = 0; i < col; i++){
    for (j = 0; j < row; j++){
      var myVector1=sphereArray[i][j];
      sphereArray[i][j]=createVector(myVector1.x+random(-1,1),myVector1.y+random(-1,1),myVector1.z+random(-1,1));
      push();
      translate(myVector1.x,myVector1.y,myVector1.z);
      var size=map(mouseX, 0, width, 0.000001, 5);
      noStroke();
      sphere(1);
      pop();
    }
  }
  break;
  case "infinity":
    noStroke();
    torus(200, 30);
  break;
  case "emoji":
  for (i = 0; i < col; i++){
    beginShape();
    for (j = 0; j < row; j++){
      var myVector1=sphereArray[i][j];
      sphereArray[i][j]=createVector(myVector1.x+random(-2,2),myVector1.y+random(-2,2),myVector1.z+random(-2,2));
      vertex(myVector1.x,myVector1.y,myVector1.z);
    }
    endShape();
  }
  break;
  case "password":
  for(var j = 0; j < 5; j++){
   push();
   for(var i = 0; i < 12; i++){
     translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
     rotateZ(frameCount * 0.002);
     push();
     sphere(8, 6, 4);
     pop();
   }
   pop();
 }
 for(var j = 0; j < 5; j++){
  push();
  for(var i = 0; i < 40; i++){
    translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
    rotateZ(frameCount * 0.01);
    rotateY(90);
    rotateX(180);
    push();
    sphere(1,2);
    pop();
  }
  pop();
}
for(var j = 0; j < 5; j++){
 push();
 for(var i = 0; i < 20; i++){
   translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
   rotateZ(frameCount * 0.01);
   push();
   sphere(3,2);
   pop();
 }
 pop();
}

  break;
   case "time":
   for(var j = 0; j < 1; j++){
    var sizeCount1=100;
    var sizeCount2=100;
    var sizeCount;
    push();
    for(var i = 0; i < 2; i++){
      noStroke();
      translate(sin(frameCount * 0.001 + j) * 100, cos(frameCount * 0.001 + j) * 100, i * 0.4);
      rotateZ(frameCount * 0.03);
      push();
      sizeCount1+=3;
      sizeCount2+=20;
      sizeCount=sizeCount2;
      if(i==0){
        rotateX(180);
        rotateY(180);
        sizeCount=sizeCount1;
      }
      torus(sizeCount,20);
      pop();
    }
    pop();
   }
   break;


}



}
