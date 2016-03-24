import Matter from 'matter-js';

// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

var p; // holds reference to the p5 sketch object

var engine;
var bodies;
var things;

var bgColor;
var pg;

var controlAttr;

var bodyOptions;

function init(pIn, controlAttrIn) {
  p = pIn;
  controlAttr = controlAttrIn;

  bodyOptions = {
      frictionAir: controlAttr.frictionAir,
      friction: controlAttr.friction,
      restitution: controlAttr.restitution
  };

  // create a Matter.js engine
  //var engine = Engine.create(document.body);
  engine = Engine.create();

  resetWorld();

  bgColor = p.color('#aaa');
  pg = p.createGraphics(p.width,p.height);

  // run the engine
  Engine.run(engine);
}

// var bodyOptions = {
//     frictionAir: 0,
//     friction: 0.0001,
//     restitution: 1
// };

function Thing() {
  var MIN_WIDTH = p.width/10;
  var MAX_WIDTH = p.width/2;
  var _self = this;
  this.x = p.random(p.width);
  this.y = p.random(p.height*0.8);
  this.w = p.random(MIN_WIDTH, MAX_WIDTH);
  this.h = p.random(MIN_WIDTH, MAX_WIDTH);
  this.angle = p.random(-p.PI, p.PI);
  this.scale = 1;
  this.body = _initPhysics();

  //things.push( this );

  function _initPhysics() {
    var box = Bodies.rectangle(_self.x, _self.y, _self.w, _self.h, bodyOptions);
    //box.setAngle( _self.angle );
    Body.rotate(box, _self.angle);
    return box;
  }

  this.resetPos = function() {
    _self.x = p.random(p.width);
    _self.y = p.random(-p.height*4);

    Body.setPosition( _self.body, {x:_self.x, y:_self.y});
    Body.rotate(_self.body, p.random(-p.PI,p.PI));
  };
  _self.resetPos();

  this.update = function(){
    _self.x = _self.body.position.x;
    _self.y = _self.body.position.y;
    _self.angle = _self.body.angle;
  };

  this.draw = function(){
    var g = pg;
    g.push();
    g.blendMode(p.EXCLUSION);
    g.fill(255);
    g.noStroke();
    g.rectMode(p.CENTER);
    g.translate(_self.x, _self.y);
    g.rotate(_self.angle);
    g.rect(0, 0, _self.w, _self.h);
    g.pop();
  };

}

function resetWorld() {

  World.clear(engine.world);
  things = [];
  bodies = [];

  var ground = Bodies.rectangle(p.width/2, p.height, p.width*1.5, 10, { isStatic: true });
  bodies.push(ground);

  var wallLeft = Bodies.rectangle(-p.width/4,p.height/2,10,p.height+20, { isStatic: true });
  var wallRight = Bodies.rectangle(p.width*1.25,p.height/2,10,p.height+20, { isStatic: true });
  bodies.push( wallLeft );
  bodies.push( wallRight );

  var numThings = controlAttr.numBox;
  for ( var i=0; i < numThings; i++ ) {
    var t = new Thing();
    things.push( t );
    bodies.push( t.body );
  }

  for ( i=0; i<numThings; i++ ) {
    t = things[i];
    //Body.set( t.body, 'collisionFilter.group', -1 );
    if ( i < numThings ) {
      t.body.collisionFilter.group = -1;
    } else {
      t.body.collisionFilter.group = -2;
    }
  }

  // add all of the bodies to the world
  World.add(engine.world, bodies);

}

function resetThingPos() {
  things.forEach(function(thing){
    thing.resetPos();
  });
}

function update() {
  things.forEach(function(thing){
    thing.update();
  });
};

function draw() {
  pg.clear();
  p.background(bgColor);
  things.forEach(function(thing){
    thing.draw();
  });
  p.image(pg,0,0);
}

export {init, update, draw, resetThingPos, resetWorld};
