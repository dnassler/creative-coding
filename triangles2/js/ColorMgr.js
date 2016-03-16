
var p;
var _colorIndex;
var _fromColor;
var _toColor;
var _lastColor;
var _mode;

var colorMode = { BLACK_AND_WHITE: 1, SOME_RED: 2 };
var _currentColorMode;

var _colorArr;

var reset = function() {
  _colorArr = [];
};

var setColorMode = function( mode ) {
  _currentColorMode = mode;
};

var init = function( pIn ) {
  p = pIn;

  _colorArr = [];
  _currentColorMode = colorMode.BLACK_AND_WHITE;
  _colorIndex = 0;
  _fromColor = p.color(50,100,250);
  _toColor = p.color(150,150,100);
  _lastColor = undefined;

};

var getNewColor = function() {

  //_colorIndex = colorIndex !== undefined ? colorIndex : p.random(0,1);
  // _lastColor = p.color(p.random(255),p.random(255),p.random(255));//p.lerpColor(_fromColor,_toColor,_colorIndex);
  var newColor;
  if ( _currentColorMode && _currentColorMode === colorMode.SOME_RED ) {
    if ( p.random(10) < 5 ) {
      newColor = p.color(p.random(220),0,0);
    } else {
      newColor = p.color(p.random(220));
    }
  } else {
    newColor = p.color(p.random(220));
  }
  _colorArr.push( newColor );
  _lastColor = newColor;//p.lerpColor(_fromColor,_toColor,_colorIndex);
  return _lastColor;
};

var getAllColorsSinceLastReset = function() {
  var colorInfoArr = _colorArr.map(function(c){
    return {r: p.red(c), g:p.green(c), b:p.blue(c), alpha:p.alpha(c)};
  });
  return colorInfoArr;
};

export { init, reset, getNewColor, colorMode, setColorMode, getAllColorsSinceLastReset };

// var ColorMgr = function() {
//
//   var p;
//   var _colorIndex;
//   var _fromColor;
//   var _toColor;
//   var _lastColor;
//
//   this.init = function( pIn ) {
//     p = pIn;
//
//     _colorIndex = 0;
//     _fromColor = p.color(50,100,250);
//     _toColor = p.color(150,150,100);
//     _lastColor = undefined;
//
//   };
//
//   this.getNewColor = function( colorIndex ) {
//
//     _colorIndex = colorIndex !== undefined ? colorIndex : p.random(0,1);
//     // _lastColor = p.color(p.random(255),p.random(255),p.random(255));//p.lerpColor(_fromColor,_toColor,_colorIndex);
//     _lastColor = p.color(p.random(220));//p.lerpColor(_fromColor,_toColor,_colorIndex);
//     return _lastColor;
//   };
//
// };
//
// export default (new ColorMgr());
