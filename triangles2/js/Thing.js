import TWEEN from 'tween.js';
// import 'p5' from 'p5;'
import SoundMgr from './SoundMgr';
import * as ColorMgr from './ColorMgr';

var Thing = function( p, pm ) {
  var _self = this;
  var _color;
  var _pos;
  var _offsetHeight;
  var _isInitialized = false;
  var _stationaryAngle;
  var _attr = {rotationAngle:0};
  var _inTransit = false;
  var _isMoving = false;
  var _tweenPos;
  var _tweenAngle;
  var _kill;

  var _getNewAngle = function() {
    return p.floor(p.random(4)) * p.PI/2;
  };

  var _init = function() {
    _attr.flashColor = false;
    _color = ColorMgr.getNewColor();
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

  this.getColor = function() {
    return _color;
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
      p.fill(_color);
    } else {
      if ( _attr.flashColor ) {
        p.fill(_color);
      } else {
        p.fill(255,0,0);
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

    p.pop();
  };

  this.isWaitingBeforeMoveStart = function() {
    return _isMoving;
  };

  this.move = function(delay) {
    if ( _isMoving ) {
      return; // ignore move request
    }
    if ( !pm.isAnyPositionFree() ) {
      return; // ignore the move request because there is nowhere to move to
    }
    _isMoving = true;

    var flashTween = new TWEEN.Tween( _attr )
      .to({flashColor:true},500).repeat(2).yoyo(true);
    flashTween.start();

    var wait = window.setTimeout( function() {

      if ( _kill ) {
        // killed while waiting
        return;
      }

      var newPos, dur, newAngle;

      newPos = pm.getFreePosition();
      if ( !newPos ) {
        // abort move becuase there is nowhere to move to
        // note that this case should not happen because a free position
        // check was done before this call (assuming the number of shapes
        // in the grid has not changed)
        _isMoving = false;
        return;
      }

      dur = p.floor(p.random(1000,3000));
      newAngle = (newPos.freeAngleAtPos === undefined) ? _getNewAngle() : newPos.freeAngleAtPos;
      pm.reservePos( newPos, _self );
      pm.clearReservedPos( _pos );

      _tweenPos = new TWEEN.Tween( _pos )
        .easing(TWEEN.Easing.Cubic.InOut)
        .to({ col: newPos.col, row: newPos.row }, dur)
        .onStart(function(){
          _inTransit = true;
        })
        .onComplete(function(){
          _inTransit = false;
          _isMoving = false;
          _stationaryAngle = _attr.rotationAngle;
          SoundMgr.playBlip1();
        });
      _tweenAngle = new TWEEN.Tween( _attr )
        .easing(TWEEN.Easing.Cubic.InOut)
        .to({ rotationAngle: newAngle }, dur );
      _tweenPos.start();
      _tweenAngle.start();

    }, delay);

  };

};

export default Thing;
