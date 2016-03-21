import Thing from './Thing';
import SoundMgr from './SoundMgr';
import * as ColorMgr from './ColorMgr';
import TWEEN from 'tween.js';

// import {p, pm} from './main.js';

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
  var _moveMultipleThingsAt;
  var _waitingToMoveMultipleThings;
  var _isMovingMultipleThings;

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
    _moveMultipleThingsAt = p.millis() + p.random(5000);
    _waitingToMoveMultipleThings = false;
    _isMovingMultipleThings = false;

    pm.clearAllReservedPos();
  };

  this.createNewThing = function() {
    var t = new Thing(p, pm);
    if ( t.isValid() ) {
      pm.reservePos( t.getGridPoint(), t );
      _thingArr.push( t );
    }
  };

  var _pickThing = function() {
    var notMovingThingsArr = _thingArr.filter(function(thing){
      return !thing.isMoving();
    });
    if ( notMovingThingsArr.length === 0 ) {
      return;
    }
    var i = p.floor(p.random(notMovingThingsArr.length));
    var t = notMovingThingsArr[i];
    return t;
  }

  var _findThingsWithFreeAdjacentSpace = function() {
    var thingsWithAdjacentSpace = _thingArr.filter(function(thing){
      return pm.getAdjacentFreeDirections( thing.getGridPoint() ) !== null;
    });
    return thingsWithAdjacentSpace;
  };

  var _moveMultipleThings = function() {
    var thingsToMoveInfo = _pickMultipleThings();
    if ( !thingsToMoveInfo ) {
      return Promise.reject();
    }
    var thingsToMoveArr = thingsToMoveInfo.things;
    var dir = thingsToMoveInfo.dir;
    var pArr = [];
    var dur = 1000;
    thingsToMoveArr.forEach( function(thing) {
      pm.clearReservedPos( thing.getGridPoint() );
    });
    thingsToMoveArr.forEach( function(thing) {
      pArr.push( thing.moveInSpecifiedDirection( dir, dur ) );
    });
    var p = Promise.all(pArr);
    return p;
  };

  // returns things array and direction e.g. {things: [t1,t2], dir: UP}
  var _pickMultipleThings = function() {

    if ( p.random(10) < 10 ) {

      var tArr = _findThingsWithFreeAdjacentSpace();
      if ( tArr.length === 0 ) {
        return null;
      }
      var r = p.floor(p.random(tArr.length));
      var thing = tArr[r];
      var adjacentDirections = pm.getAdjacentFreeDirections( thing.getGridPoint() );
      if ( !adjacentDirections ) {
        console.log('!!!!!!!!!!!');
        return;
      }
      var rDirIndex = p.floor(p.random(adjacentDirections.length));
      var rDir = adjacentDirections[rDirIndex];
      var gridPointFreeSpace = pm.getGridPointPlusDirection( thing.getGridPoint(), rDir );
      var gridPointsFreeNearby = pm.getGridPointsNearbyPerpendicularToDirection(
        gridPointFreeSpace, rDir
      );
      var freeGridPointsGivenDirectionArr = [gridPointFreeSpace];
      if ( gridPointsFreeNearby.length > 0 ) {
        freeGridPointsGivenDirectionArr.push( ...gridPointsFreeNearby);
      }

      var thingsToMoveArr = [];
      freeGridPointsGivenDirectionArr.forEach(function(gridPointFree){
        var otherThings = pm.getOtherThingsToMoveInSpecifiedDirection( gridPointFree, rDir, _thingArr );
        thingsToMoveArr.push( ...otherThings );
      });

    } else {

      // find things to move by first locating adjacent rows of blank spaces


    }

    return {
      things: thingsToMoveArr,
      dir: rDir
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

    if ( !_isMovingMultipleThings ) {

      if ( !_waitingToMoveMultipleThings ) {

        if ( p.millis() > _moveSomethingAt ) {
          if ( _thingArr.length < 1 ) {
            console.log('nothing to move');
          } else {
            var t = _pickThing();
            if ( t ) {
              var delay = p.random(10000);
              t.move(delay);
            }
          }
          _moveSomethingAt = p.millis() + p.random(5000);
        }

        if ( p.millis() > _moveMultipleThingsAt ) {
          if ( _thingArr.length < 1 ) {
            console.log('nothing to move');
          } else {
            _waitingToMoveMultipleThings = true;
          }
        }

      }

      if ( _waitingToMoveMultipleThings ) {

        var movingThingsArr = _thingArr.filter(function(thing){
          return thing.isMoving();
        });
        if ( movingThingsArr.length === 0 ) {
          _waitingToMoveMultipleThings = false;
          _isMovingMultipleThings = true;

          console.log('move multiple things now...');
          // pick some things that are next to a vacant space
          // then move them all at once with the same duration
          _moveMultipleThings().then(function(thingsMovedArr){
            console.log('moved multiple things');
            if ( p.random(10) < 5 ) {
              return _moveMultipleThings();
            }
          })
          .catch( function(err) {
            console.log('Catch Error moving things: ' + err);
          })
          .then( function() {
            console.log('moved multiple things DONE');
            _isMovingMultipleThings = false;
            _moveMultipleThingsAt = p.millis() + p.random(5000,6000);
          });
        }
      }

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

  this.peakDetected = function() {
    var t = _pickThing();
    var delay = 0;
    var onlyRotate = true;
    t.move(0, 1000, onlyRotate, TWEEN.Easing.Cubic.Out);
  };

};

export default (new ThingMgr());
