import Thing from './Thing';
import SoundMgr from './SoundMgr';
import * as ColorMgr from './ColorMgr';
import TWEEN from 'tween.js';

var ThingMgr = function() {

  var _self = this;
  var p;
  var pm;

  var _thingArr;
  var _holdFrameCount;
  this.clock;
  var _clockHiddenDelta;
  this.speed;
  this.mouseControlsSpeed;
  this.paused;
  this.frameJumpFactor;
  var _moveSomethingAt;

  this.init = function(p0, pm0) {
    p = p || p0;
    pm = pm || pm0;
    _thingArr = [];
    _holdFrameCount = 0;
    this.clock = 0;
    _clockHiddenDelta = 0;
    this.speed = 1;
    this.mouseControlsSpeed = false;
    this.paused = false;
    this.frameJumpFactor = 0;
    _moveSomethingAt = p.millis() + p.random(5000);

    pm.clearAllReservedPos();
  };

  this.createNewThing = function() {
    var t = new Thing( p, pm );
    if ( t.isValid() ) {
      pm.reservePos( t.getGridPoint(), t );
      _thingArr.push( t );
    }
  };

  this.update = function() {
    if ( !this.paused ) {
      if ( this.frameJumpFactor > 0 ) {
        _holdFrameCount += 1;
        _holdFrameCount %= this.frameJumpFactor;
      }
      if ( this.mouseControlsSpeed ) {
        _clockHiddenDelta += 15 * ((p.mouseX*6)/p.width - 3);
      } else {
        _clockHiddenDelta += 15 * this.speed;//+(random(-5,10));
      }
      if ( this.frameJumpFactor === 0 || _holdFrameCount === 0 ) {
        this.clock += _clockHiddenDelta;
        _clockHiddenDelta = 0;
      }
    }
    if ( p.millis() > _moveSomethingAt ) {
      if ( _thingArr.length < 1 ) {
        console.log('nothing to move');
      } else {
        var i = p.floor(p.random(_thingArr.length));
        var t = _thingArr[i];
        var delay = p.random(10000);
        t.move(delay);
      }
      _moveSomethingAt = p.millis() + p.random(5000);
    }
    _thingArr.forEach( function(thing) {
      thing.update();
    });
  };

  this.draw = function() {
    // if ( _self.frameJumpFactor > 0 && _holdFrameCount > 0 ) {
    //   return;
    // }

    //p.translate(-pm.getGridWidth()/2,0,-pm.getGridWidth()/2);
    pm.translateToGridPos();
    _thingArr.forEach( function(thing) {
      thing.draw();
    });
  };

  this.resetThings = function(numThings) {
    ColorMgr.reset();
    TWEEN.removeAll();
    _thingArr.forEach( function(thing) {
      thing.kill();
    });
    _self.init();
    numThings = p.floor(numThings) || p.floor(p.random(10,50));
    var i;
    for ( i=0; i<numThings; i++ ) {
      _self.createNewThing();
    }
  };

  this.getColors = function(){
    var colorArr = _thingArr.map(function(thing){
      return thing.getColor();
    });
    return colorArr;
  };

  this.moveSomeThings = function() {
    if ( _thingArr.length < 1 ) {
      console.log('nothing to move');
      return;
    }
    var numThings = p.floor(p.random(1,1+_thingArr.length/10));
    for (var a=0; a < numThings; a++) {
      var i = p.floor(p.random(_thingArr.length));
      var t = _thingArr[i];
      var delay = p.random(10000);
      t.move(delay);
    }
  };

};

export default (new ThingMgr());
