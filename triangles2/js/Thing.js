import TWEEN from 'tween.js';
// import 'p5' from 'p5;'
import SoundMgr from './SoundMgr';
import * as ColorMgr from './ColorMgr';
// import {p, pm} from './main.js';

var Thing = function(p, pm) {
  var _self = this;
  //var _color;
  var _pos;
  var _offsetHeight;
  var _isInitialized = false;
  var _stationaryAngle;
  var _attr = {rotationAngle:0, color:0};
  var _inTransit = false;
  var _isMoving = false;
  var _onlyRotate = false;
  var _tweenPos;
  var _tweenAngle;
  var _justStopped;
  var _kill;

  var _getNewAngle = function() {
    return p.floor(p.random(4)) * p.PI/2;
  };

  var _init = function() {
    _attr.flashColor = false;
    _attr.color = ColorMgr.getNewColor();
    _stationaryAngle = _getNewAngle();
    _attr.rotationAngle = _stationaryAngle;
    _pos = pm.getFreePosition();
    if ( _pos ) {
      _isInitialized = true;
    }
  };
  _init();

  this.kill = function() {
    _kill = true;
  };

  this.isValid = function(){
    return _isInitialized;
  };

  this.isMoving = function() {
    return _isMoving;
  };

  this.getColor = function() {
    return _attr.color;
  };

  this.getStationaryAngle = function() {
    return _stationaryAngle;
  };

  this.getGridPoint = function() {
    return _pos;
  };

  this.update = function() {
    //_offsetHeight = p.TWO_PI * p.sin((mgr.clock + _pos.row*100+_pos.col*100)/p.PI/100.0);
  };

  this.draw = function() {
    p.push();
    pm.translateToThingPos( _self );
    if ( !_isMoving ) {
      p.fill(_attr.color);
    } else {
      if ( _onlyRotate ) {
        // p.fill(_attr.color);
        p.fill(200,200,0);
      } else {
        if ( _attr.flashColor ) {
          p.fill(_attr.color);
        } else {
          p.fill(ColorMgr.movingColor);
        }
      }
    }
    p.noStroke();
    //p.rectMode(p.CENTER);
    //p.rect( 0,0, pm.cellWidth, pm.cellHeight);
    p.translate(pm.cellWidth/2,pm.cellWidth/2);
    //p.rotate(_offsetHeight);
    p.rotate(_attr.rotationAngle);

    p.triangle(
      -pm.cellWidth/2, -pm.cellWidth/2,
      pm.cellWidth/2, pm.cellWidth/2,
      -pm.cellWidth/2, pm.cellWidth/2 );

    if ( _justStopped ) {
      p.fill(200,_attr.stopTriangleAlpha);
      p.triangle(
        -pm.cellWidth/2, -pm.cellWidth/2,
        pm.cellWidth/2, pm.cellWidth/2,
        -pm.cellWidth/2, pm.cellWidth/2 );
    }

    p.pop();
  };

  this.isWaitingBeforeMoveStart = function() {
    return _isMoving;
  };

  //<<<TODO:fix below to clear/reserve positions in the grid like how move() does
  // returns a promise that will resolve when move completed
  this.moveInSpecifiedDirection = function( dir, dur ) {
    _isMoving = true;
    _tweenPos = undefined;
    var newPos = {row:_pos.row, col:_pos.col};
    if ( dir === pm.Directions.UP ) {
      newPos.row -= 1;
    } else if ( dir === pm.Directions.DOWN ) {
      newPos.row += 1;
    } else if ( dir === pm.Directions.LEFT ) {
      newPos.col -= 1;
    } else if ( dir === pm.Directions.RIGHT ) {
      newPos.col += 1;
    }
    pm.reservePos( newPos, _self );
    var easing = TWEEN.Easing.Cubic.InOut;
    var p = new Promise(function(resolve,reject){
      _tweenPos = new TWEEN.Tween( _pos )
        .easing(easing)
        .to({ col: newPos.col, row: newPos.row }, dur)
        .onStart(function(){
          _inTransit = true;
        })
        .onComplete(function(){
          _inTransit = false;
          _isMoving = false;
          SoundMgr.playBlip1();
          resolve(_self);
        })
        .start();
    });
    return p;
  };

  this.move = function(delay, duration, onlyRotate, easing) {
    if ( _isMoving ) {
      return; // ignore move request
    }
    // if ( !pm.isAnyPositionFree() ) {
    //   return; // ignore the move request because there is nowhere to move to
    // }
    _isMoving = true;
    _onlyRotate = false;

    if ( !onlyRotate && pm.isAnyPositionFree() ) {
      if ( p.random(10) < 1.8 ) {
        _onlyRotate = true;
      } else {
        var flashTween = new TWEEN.Tween( _attr )
          .to({flashColor:true},500).repeat(2).yoyo(true);
        flashTween.start();
      }
    } else {
      _onlyRotate = true;
    }

    var wait = window.setTimeout( function() {

      if ( _kill ) {
        // killed while waiting
        return;
      }

      var newPos, dur, newAngle;

      newPos = undefined;
      if ( !_onlyRotate ) {
        newPos = pm.getFreePosition();
      }
      if ( !newPos ) {
        // there is nowhere to move to
        //_isMoving = false;
        newPos = {row:_pos.row, col:_pos.col};
      }

      dur = duration || p.floor(p.random(1000,3000));
      newAngle = (newPos.freeAngleAtPos === undefined) ? _getNewAngle() : newPos.freeAngleAtPos;
      if ( !_onlyRotate ) {
        pm.reservePos( newPos, _self );
        pm.clearReservedPos( _pos );
      } else {
        if ( Math.abs(newAngle - _stationaryAngle) < 0.01 ) {
          if ( p.random(10) < 5 ) {
            newAngle += p.PI/2;
          } else {
            newAngle -= p.PI/2;
          }
        }
      }

      _tweenPos = undefined;
      easing = easing || TWEEN.Easing.Cubic.InOut;
      if ( !_onlyRotate ) {
        _tweenPos = new TWEEN.Tween( _pos )
          .easing(easing)
          .to({ col: newPos.col, row: newPos.row }, dur)
          .onStart(function(){
            _inTransit = true;
          })
          .onComplete(function(){
            _inTransit = false;
          });
      }
      _tweenAngle = new TWEEN.Tween( _attr )
        .easing(easing)
        .to({ rotationAngle: newAngle }, dur )
        .onComplete(function(){
          _justStopped = true;
          _attr.stopTriangleAlpha = 255;
          var tweenToRegularColor = new TWEEN.Tween( _attr )
            .easing(TWEEN.Easing.Cubic.Out)
            .to({stopTriangleAlpha: 0}, 500)
            .onComplete(function(){
              _justStopped = false;
            })
            .start();
          _stationaryAngle = _attr.rotationAngle;
          _isMoving = false;
          _onlyRotate = false;
          SoundMgr.playBlip1();
        });
      if ( _tweenPos ) {
        _tweenPos.start();
      }
      _tweenAngle.start();

    }, delay);

  };

};

export default Thing;
