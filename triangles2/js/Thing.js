import TWEEN from 'tween.js';
// import 'p5' from 'p5;'
import SoundMgr from './SoundMgr';
import {getNewColor} from './ColorMgr';

var Thing = function( p, pm ) {
  var _self = this;
  var _color;
  var _pos;
  var _offsetHeight;
  var _rotationAngle;
  var _isInitialized = false;
  var _attr = {rotationAngle:0};
  var _inTransit = false;
  var _tweenPos;
  var _tweenAngle;

  var _getAngle = function() {
    return p.floor(p.random(4)) * p.PI/2;
  };

  var _init = function() {
    _color = getNewColor();
    _attr.rotationAngle = _getAngle();
    _pos = pm.getFreePosition();
    if ( _pos ) {
      _isInitialized = true;
    }
  };
  _init();

  this.isValid = function(){
    return _isInitialized;
  };

  this.getColor = function() {
    return _color;
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
    p.fill(_color);
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

  this.move = function(delay) {
    if ( _inTransit ) {
      return; // ignore move request
    }
    var newPos = pm.getFreePosition();
    if ( !newPos ) {
      return; // ignore move
    }
    var dur = p.floor(p.random(1000,3000));
    var newAngle = _getAngle();
    pm.reservePos( newPos, _self );
    pm.clearReservedPos( _pos );
    _inTransit = true;
    _tweenPos = new TWEEN.Tween( _pos )
      .delay(delay)
      .easing(TWEEN.Easing.Cubic.InOut)
      .to({ col: newPos.col, row: newPos.row }, dur)
      .onComplete(function(){
        _inTransit = false;
        SoundMgr.playBlip1();
      });
    _tweenAngle = new TWEEN.Tween( _attr )
      .delay(delay)
      .easing(TWEEN.Easing.Cubic.InOut)
      .to({ rotationAngle: newAngle }, dur );
    _tweenPos.start();
    _tweenAngle.start();
  };

};

export default Thing;
