import TWEEN from 'tween.js';

var Thing = function( p, mgr, cm, pm ) {
  var _self = this;
  var _color;
  var _pos;
  var _offsetHeight;
  var _rotationAngle;
  var _isInitialized = false;
  var _attr = {rotationAngle:0};
  var _inTransit = false;

  var _getAngle = function() {
    return p.floor(p.random(4)) * p.PI/2;
  };

  var _init = function() {
    _color = cm.getNewColor();
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
    var dur = p.floor(p.random(1000,3000));
    var newAngle = _getAngle();
    var newPos = pm.getFreePosition();
    pm.reservePos( newPos, _self );
    pm.clearReservedPos( _pos );
    _inTransit = true;
    var tween = new TWEEN.Tween( _pos )
      .delay(delay)
      .easing(TWEEN.Easing.Cubic.InOut)
      .to({ col: newPos.col, row: newPos.row }, dur)
      .onComplete(function(){
        _inTransit = false;
      });
    var tweenRotate = new TWEEN.Tween( _attr )
      .delay(delay)
      .easing(TWEEN.Easing.Cubic.InOut)
      .to({ rotationAngle: newAngle }, dur );
    tween.start();
    tweenRotate.start();
  };

};

export default Thing;
