// import {p} from './main.js';

var p;

var _lastColor;

var colorMode = { BLACK_AND_WHITE: 1, SOME_RED: 2,
  MULTICOLOUR: 3,
  REVERSE_B_AND_W: 4, REVERSE_SOME_RED: 5,
  REVERSE_SOME_BLUE: 6, REVERSE_LIGHT_BLUE: 7
 };
var _currentColorMode;

var _colorArr;

var _bgColor;
var _movingColor;

var reset = function() {
  _colorArr = [];
  _lastColor = undefined;
  if ( _currentColorMode === colorMode.REVERSE_B_AND_W
    || _currentColorMode === colorMode.REVERSE_SOME_RED
    || _currentColorMode === colorMode.REVERSE_SOME_BLUE
    || _currentColorMode === colorMode.REVERSE_LIGHT_BLUE
  ) {
    _bgColor = p.color(0);
  } else {
    _bgColor = p.color(255);
  }
  if ( _currentColorMode === colorMode.REVERSE_SOME_BLUE
    || _currentColorMode === colorMode.REVERSE_LIGHT_BLUE
  ) {
    _movingColor = p.color(0,0,255);
  } else if ( _currentColorMode === colorMode.MULTICOLOUR ) {
    _movingColor = p.color(0,0,0);
  } else {
    _movingColor = p.color(255,0,0);
  }
};

var setColorMode = function( mode ) {
  _currentColorMode = mode;
};

var init = function(p0) {
  p = p0;
  // _currentColorMode = colorMode.BLACK_AND_WHITE;
  // _bgColor = p.color(255);
  reset();
};

var getNewColor = function() {

  //_colorIndex = colorIndex !== undefined ? colorIndex : p.random(0,1);
  // _lastColor = p.color(p.random(255),p.random(255),p.random(255));//p.lerpColor(_fromColor,_toColor,_colorIndex);
  var newColor;
  if ( _currentColorMode === colorMode.SOME_RED ) {
    if ( p.random(10) < 5 ) {
      newColor = p.color(p.random(220),0,0);
    } else {
      newColor = p.color(p.random(220));
    }
  } else if ( _currentColorMode === colorMode.MULTICOLOUR ) {
    if ( p.random(10) < 5 ) {
      newColor = p.color(p.random(150),p.random(150),p.random(150));
    } else {
      newColor = p.color(p.random(10,240));
    }
  } else if ( _currentColorMode === colorMode.REVERSE_B_AND_W ) {
    newColor = p.color(p.random(200,255));
  } else if ( _currentColorMode === colorMode.REVERSE_SOME_RED ) {
    if ( p.random(10) < 5 ) {
      newColor = p.color(p.random(30,220),0,0);
    } else {
      newColor = p.color(p.random(10,240));
    }
  } else if ( _currentColorMode === colorMode.REVERSE_SOME_BLUE ) {
    if ( p.random(10) < 5 ) {
      newColor = p.color(0,0,p.random(30,220));
    } else {
      newColor = p.color(p.random(10,240));
    }
  } else if ( _currentColorMode === colorMode.REVERSE_LIGHT_BLUE ) {
    if ( p.random(10) < 5 ) {
      newColor = p.color(0,p.floor(p.random(150,200)),255);
    } else {
      newColor = p.color(p.random(200,255));
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

export { init, reset, getNewColor, colorMode, setColorMode, getAllColorsSinceLastReset,
  _bgColor as bgColor, _movingColor as movingColor };

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
