import Matter from 'matter-js';

import * as SoundMgr from './soundMgr.js';

// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

var p; // holds reference to the p5 sketch object

var engine;
var bodies;
var things;
var ground;

var bgColor;
var pg;

var controlAttr;

var bodyOptions;

var timeScaleTarget;
var timeToChangeTimeScale;
var timeToResetWorld;

var sceneEvents;
var hitGroundCount;

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

  sceneEvents = [];

  sceneEvents.push(

    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          if ( pair.bodyA === ground || pair.bodyB === ground ) {
            console.log('hit ground');
            hitGroundCount += 1;
            if ( hitGroundCount < 10 ) {
              SoundMgr.playSound();
            }
          }
          // pair.bodyA.render.fillStyle = '#bbbbbb';
          // pair.bodyB.render.fillStyle = '#bbbbbb';
      }
    })

  );

  resetWorld();

  bgColor = p.color('#aaa');
  pg = p.createGraphics(p.width,p.height);

  timeScaleTarget = 1;
  timeToChangeTimeScale = p.millis() + p.random(5000,15000);
  timeToResetWorld = p.millis() + p.random(3000,15000);

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
    _self.y = p.random(-p.height*4-p.height/2);

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

  ground = Bodies.rectangle(p.width/2, p.height, p.width*1.5, 10, { isStatic: true });
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

  hitGroundCount = 0;

}

function resetThingPos() {
  things.forEach(function(thing){
    thing.resetPos();
  });
}

function update() {
  if ( timeToChangeTimeScale < p.millis() ) {
    if ( engine.timing.timeScale < 0.1 ) {
      if ( p.random(10) < 1 ) {
        engine.timing.timeScale = 0.5;
      } else {
        engine.timing.timeScale = 1;
      }
    } else if ( engine.timing.timeScale > 0.9 ){
      if ( p.random(10) < 1 ) {
        engine.timing.timeScale = 0.5;
      } else {
        engine.timing.timeScale = 0.05;
      }
    } else {
      if ( p.random(10) < 5 ) {
        engine.timing.timeScale = 0.05;
      } else {
        engine.timing.timeScale = 1;
      }
    }
    timeToChangeTimeScale = p.millis() + p.random(2000,6000);
  }
  if ( timeToResetWorld < p.millis() ) {
    resetWorld();
    timeToResetWorld = p.millis() + p.random(8000,40000);
  }
  //engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.001;

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
