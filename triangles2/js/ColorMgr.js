
var p;
var _colorIndex;
var _fromColor;
var _toColor;
var _lastColor;

var init = function( pIn ) {
  p = pIn;

  _colorIndex = 0;
  _fromColor = p.color(50,100,250);
  _toColor = p.color(150,150,100);
  _lastColor = undefined;

};

var getNewColor = function( colorIndex ) {

  _colorIndex = colorIndex !== undefined ? colorIndex : p.random(0,1);
  // _lastColor = p.color(p.random(255),p.random(255),p.random(255));//p.lerpColor(_fromColor,_toColor,_colorIndex);
  _lastColor = p.color(p.random(220));//p.lerpColor(_fromColor,_toColor,_colorIndex);
  return _lastColor;
};

export { init, getNewColor };

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
