
//---------PARTICLE CLASSES----------------


//Base code taken from "Coding Challenge #78: Simple Particle System" at https://www.youtube.com/watch?v=UcdigVaIYAk
class Particle{

  constructor(origin, velocity, size){
    this.x = origin;
    this.y= origin;
    this.z=origin;
    this.xRotation=0;
    this.vx=random(-velocity,velocity);
    this.vy = random(-velocity,velocity);
    this.vz = random(-velocity,velocity);
    this.myColor=255;
    this.mySize=size;
  }

  setPosition(xVal, yVal, zVal){
    this.x=xVal;
    this.y=yVal;
    this.z=zVal;
  }

  show(){
    push()
    specularMaterial(this.myColor,this.myColor,this.myColor);
    translate(this.x,this.y,this.z);
    noStroke();
  // rotate(this.xRotation);
    sphere(this.mySize);
    pop();
  }

  updatePosition(xVal, yVal, zVal){
    this.x+=xVal;
    this.y+=yVal;
    this.z+=zVal;
  }

  update(){
    this.updatePosition(this.vx, this.vy, this.vz);
  //  this.reduceSize();
  }

  reduceSize(){
      if(this.mySize>0){
        this.mySize-=1;
      }
  }

  // Make sure that spheres that are of size 0 get deleted
  finished(){
    return this.mySize==0;
  }

  setVelocity(xleft, xright, yleft, yright, zleft,zright){
    this.vx=random(-xleft,xright);
    this.vy = random(-yleft,yright);
    this.vz = random(-zleft,zright);
  }

  multVelocity(velocity){
    this.vx=this.vx*velocity;
    this.vy=this.vy*velocity;
    this.vz=this.vz*velocity;
  }



}




class ParticleA extends Particle{


  show(){
    push()
    specularMaterial(this.myColor,this.myColor,this.myColor);
    translate(this.x,this.y,this.z);
    noStroke();
  // rotate(this.xRotation);
    sphere(this.mySize);
    pop();
  }

  update(){
    this.updatePosition(this.vx, this.vy, this.vz);
    this.reduceSize();
  }


}

class torusParticle extends Particle{


  show(){
    push()
    specularMaterial(this.myColor,this.myColor,this.myColor);
    translate(this.x,this.y,this.z);
    noStroke();
  // rotate(this.xRotation);
    torus(this.mySize);
    pop();
  }

  update(){
    this.updatePosition(this.vx, this.vy, this.vz);
    this.reduceSize();
  }

}



//---------PARTICLE SYSTEM CLASSES----------------

class ParticleSystem{
  constructor(){
    this.particles =[];
    this.addParticles(10);
  }

  addParticles(val){
    for (var i=0;i<val;i++){
      let p=new ParticleA(0,5,50);
      this.particles.push(p);
    }

  }


  show(){

    this.addParticles(2);
    for (let i=0; i<this.particles.length; i++){
      if (this.particles[i].finished()){
            this.particles.splice(i,1);
      }
      if(step2)this.particles[i].update();
      this.particles[i].show();
    }
  }

  updateParticleScatter(val){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){
      this.particles[i][j].multVelocity(val);
      }
    }

  }

  pulse(){

  }
}

class sphereSystem extends ParticleSystem{


  constructor(velocity, rownum, colnum, radius, particleSize){
    super();
    this.col=colnum;
    this.row=rownum;
    this.r=radius;
    this.particles= new Array(this.col);

    for (var i = 0; i < this.col; i++){
      this.particles[i]=new Array(this.row);
      var lon=  map(i,0,this.col,-PI, PI);
      for (var j = 0; j < this.row; j++){
        var lat = map(j,0,row, -PI/2, PI/2);
        var xVal= this.r*sin(lon)*cos(lat);
        var yVal= this.r*sin(lon)*sin(lat);
        var zVal= this.r*cos(lon);
        this.particles[i][j] = new Particle(0, velocity, particleSize);
        this.particles[i][j].setPosition(xVal,yVal,zVal);
        this.particles[i][j].show();
      }
    }
  }

  show(){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){

      if(step2)this.particles[i][j].update();
      this.particles[i][j].show();
      }
    }
  }


  updateParticleScatter(val){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){
      this.particles[i][j].multVelocity(val);
      }
    }

  }


}


class squareSystem extends ParticleSystem{

  constructor(velocity, rownum, spacing, size){
    super();
    this.row=rownum;
    this.size=size;
    this.spacing=spacing;
    this.particles= new Array(this.col);
    this.currentX=0;
    this.currentY=0;
    this.currentZ=0;
    for (var i = 0; i < this.row; i++){
      this.particles[i]=new Array(this.row);
      for (var j = 0; j < this.row; j++){
        this.particles[i][j]=new Array(this.row);
        for (var k = 0; k < this.row; k++){
          push();
          this.particles[i][j][k] = new Particle(0, velocity, size);
          this.particles[i][j][k].updatePosition(i*this.spacing-rownum*spacing/2,j*this.spacing-rownum*spacing/2,k*this.spacing);
          this.particles[i][j][k].show();
          pop();
        }
      }
    }
  }

  show(){
    this.currentX=0;
    this.currentY=0;
    this.currentZ=0;
    for (var i = 0; i < this.row; i++){
      for (var j = 0; j < this.row; j++){
        for (var k = 0; k < this.row; k++){
          push();
          if(step2)this.particles[i][j][k].update();
          this.particles[i][j][k].show();
          pop();
        }
      }
    }
  }

  updateParticleScatter(val){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){
      this.particles[i][j][k].multVelocity(val);
      }
    }

  }

}


class sunSystem extends ParticleSystem{

  constructor(velocity, numOfTrails,numOfStars, size){
    super();
    this.numOfTrails=numOfTrails;
    this.numOfStars=numOfStars;
    this.size=size;
    this.particles= new Array(this.numOfTrails);
    for (var i = 0; i < this.numOfTrails; i++){
      this.particles[i]= new Array(this.numOfStars);
      for (var j = 0; j < this.numOfStars; j++){
        this.particles[i][j]= new Particle(-size/2-30, velocity, 1);
        this.particles[i][j].updatePosition(j*-10,j*-10,j*-10);
        this.particles[i][j].show();
      }

      /*
      this.particles[i]=new Array(this.row);
      for (var j = 0; j < this.row; j++){
        this.particles[i][j]=new Array(this.row);
          push();
          this.particles[i][j][k] = new Particle(1, velocity, 1);
          this.particles[i][j][k].setPosition(i*this.spacing,j*this.spacing,k*this.spacing);
          this.particles[i][j][k].show();
      }*/
    }
  }

  show(){
    for (var i = 0; i < this.particles.length; i++){
      for (var j = 0; j < this.numOfStars; j++){
        this.particles[i][j].show();
      }

    }
  }

}


class torusSystem extends ParticleSystem{

  constructor(){
    super();
    this.particles =[];
    this.addParticles(5);
  }

  addParticles(val){
    for (var i=0;i<val;i++){
      let p=new torusParticle(0,1,60);
      this.particles.push(p);
    }

  }


  show(){

    this.addParticles(1);
    for (let i=0; i<this.particles.length; i++){
      if (this.particles[i].finished()){
            this.particles.splice(i,1);
      }
      if(step2)this.particles[i].update();
      this.particles[i].show();
    }
  }

  updateParticleScatter(val){
    for (var i = 0; i < this.col; i++){
      for (var j = 0; j < this.row; j++){
      this.particles[i][j].multVelocity(val);
      }
    }

  }

  pulse(){

  }

}
