var ColorMgr = function(p) {
  var _colorIndex = 0;
  var _fromColor = p.color(50,100,250);
  var _toColor = p.color(150,150,100);
  var _lastColor;

  this.getNewColor = function( colorIndex ) {
    _colorIndex = colorIndex !== undefined ? colorIndex : p.random(0,1);
    // _lastColor = p.color(p.random(255),p.random(255),p.random(255));//p.lerpColor(_fromColor,_toColor,_colorIndex);
    _lastColor = p.color(p.random(220));//p.lerpColor(_fromColor,_toColor,_colorIndex);
    return _lastColor;
  };

};

export default ColorMgr;
