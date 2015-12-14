

var ColorMgr = function() {
  var _colorIndex = 0;
  var _fromColor = color(50,100,250);
  var _toColor = color(150,150,100);
  var _lastColor;

  this.getNewColor = function( colorIndex ) {
    _colorIndex = colorIndex !== undefined ? colorIndex : random(0,1);
    _lastColor = lerpColor(_fromColor,_toColor,_colorIndex);
    return _lastColor;
  };

};


var PositionMgr = function() {

  var _gridRows;
  var maxRows = 10;
  var maxCols = 10;

  var _init = function() {
    _gridRows = [];
    var i;
    for ( i=0; i<maxRows; i++ ) {
      _gridRows.push( [] );
    }
  };
  _init();

  this.getGridWidth = function() {
    return maxCols * 30*4;
  };

  this.translateToThingPos = function( thing ) {
    var gridPoint = thing.getGridPoint();
    translate(gridPoint.col * 30*4, 0, gridPoint.row * 30 * 4);
  };

  this.reservePos = function( pos, thing ) {
    //var pos = thing.getGridPoint();
    _gridRows[pos.row][pos.col] = thing;
  };

  this.reset = function() {
    _init();
  };

  // accepts input col and row as a starting point
  this.getFreePosition = function( i, j ) {
    var r;
    var limitToColumn = false;
    var limitToRow = false;
    if ( i && j ) {
      r = j * maxCols + i;
    } else if ( i ) {
      limitToColumn = true;
      r = floor(random(maxRows)) * maxCols + i;
    } else if ( j ) {
      limitToRow = true;
      r = j * maxCols + floor(random(maxCols));
    } else {
      r = floor(random(maxRows*maxCols));
    }
    var roffset = 0;
    var maxIndex = maxRows * maxCols;
    var maxOffset = maxIndex;
    while ( roffset < maxOffset ) {
      var rIndex = (r + roffset) % maxIndex;
      var rowIndex = floor(rIndex / maxCols);
      var colIndex = rIndex % maxCols;
      var row = _gridRows[ rowIndex ];
      var gridElement = row[colIndex];
      if ( !gridElement ) {
        var pos = {row:rowIndex, col:colIndex};
        return pos;
      }
      if ( limitToColumn ) {
        // check next row since input specified column
        roffset += maxCols;
      } else if ( limitToRow ) {
        roffset += 1;
        if ( floor((r + roffset) / maxCols) > j ) {
          // fell off the end of the row
          roffset += (maxOffset - (r % maxCols));
        }
      } else {
        roffset += 1;
      }
    }
    return null;
  };

};

var Thing = function() {
  var _self = this;
  var _color;
  var _pos;
  var _size;
  var _offsetHeight;
  var _showLight;

  var _randomShowLight = function() {
    _showLight = floor(random(2)) >= 1 ? true : false;
  };

  var _init = function() {
    _color = cm.getNewColor();
    _randomShowLight();
    _pos = pm.getFreePosition();
    pm.reservePos( _pos, _self );
    _size = {w:1, h:floor(random(1,3))};
  };
  _init();

  this.randomShowLight = _randomShowLight;

  this.getGridPoint = function() {
    return _pos;
  };

  this.update = function() {
    //_offsetHeight = 5*sin((millis()+_pos.row*100+_pos.col*100)/PI/100.0); //frameCount * 0.01
    _offsetHeight = 5*sin((frameCount+_pos.row*8+_pos.col*8)*0.05); //frameCount * 0.01

  };

  this.draw = function() {
    push();
    //translate(i*30*4,j*30*4,0);
    pm.translateToThingPos( _self );

    ambientMaterial(_color);

    //ambientMaterial(b0+random(-100,100),random(100,120),random(200,220));
    //specularMaterial(b0+random(-100,100),random(100,120),random(200,220));

    translate( 0, -30*(_size.h + _offsetHeight - 1), 0 );
    var h = 30 * (_size.h + _offsetHeight);
    box( 30 * _size.w, h, 30 * _size.w);

    if ( h > 0 ) {

      translate( 0, -h-10, 0 );
      if ( _showLight ) {
        basicMaterial(_color);
      }
      box( 30 * _size.w, 10, 30 * _size.w );

    }
    pop();

  };

};

var ThingMgr = function() {

  var _self = this;
  var _thingArr;

  var _init = function() {
    _thingArr = [];
    _resetShowLightsAt = millis() + 1000;//random(1000,5000);
  };
  _init();

  var _resetShowLights = function() {
    _thingArr.forEach( function(thing) {
      thing.randomShowLight();
    });
    _resetShowLightsAt = millis() + 1000;//random(1000,5000);
  };

  this.createNewThing = function() {
    _thingArr.push( new Thing() );
  };

  this.update = function() {
    if ( _resetShowLightsAt < millis() ) {
      _resetShowLights();
    }
    _thingArr.forEach( function(thing) {
      thing.update();
    });
  };

  this.draw = function() {
    translate(-pm.getGridWidth()/2,0,-pm.getGridWidth()/2);
    _thingArr.forEach( function(thing) {
      thing.draw();
    });
  };

  this.resetThings = function() {
    _init();
    var numThings = random(15,70);
    var i;
    for ( i=0; i<numThings; i++ ) {
      _self.createNewThing();
    }
  };

};

var Camera = function() {

  var _self = this;
  var _pos;
  var _angle;

  function _init() {
    camera(0,0,0);
    _pos = {x:0,y:0,z:0};
    _angle = {x:0,y:0,z:0};
    _angle.x = PI/6;
    _beginAnimationRotationY( random(-TWO_PI,TWO_PI) );
    _beginAnimationRotationX( random(-TWO_PI,TWO_PI) );
    _beginAnimationMoveZ( random(-1000) );
  }
  _init();

  function _beginAnimationRotationY( newAngleDelta ) {
    // _animateRotationY( -TWO_PI, 5000 ).then( _animateRotationY( -PI, 2500 ).then( _beginAnimationRotationY() ) );
    _animateRotationY( newAngleDelta, random(100,500) ).then( function() {
        _beginAnimationRotationY( random(-TWO_PI,TWO_PI) );
    });
  }

  function _beginAnimationRotationX( newAngleDelta ) {
    _animateRotationX( newAngleDelta, random(100,500) ).then( function() {
        _beginAnimationRotationX( random(-TWO_PI,TWO_PI) );
    });

  }

  function _beginAnimationMoveZ( newPosZ ) {
    createjs.Tween.get( _pos, {override:true,useTicks:true}).to({z:newPosZ}, random(100,500), createjs.Ease.sineInOut ).call(function() {
      _beginAnimationMoveZ( random(-1000) );
    });
  }

  function _animateRotationY( newAngleDelta, duration ) {
    return new Promise( function( resolve, reject ) {
      var newAngle = _angle.y + newAngleDelta;
      createjs.Tween.get(_angle, {useTicks:true}).to({y:newAngle}, duration, createjs.Ease.sineInOut).call(function() {
        resolve();
      });
    });
  }

  function _animateRotationX( newAngleDelta, duration ) {
    return new Promise( function( resolve, reject ) {
      var newAngle = _angle.x + newAngleDelta;
      createjs.Tween.get(_angle, {useTicks:true}).to({x:newAngle}, duration, createjs.Ease.sineInOut).call(function() {
        resolve();
      });
    });
  }


  this.update = function() {
    //camera(0,0,sin(frameCount * 0.01) * 500 + 500);
    //camera( _pos.x, _pos.y, _pos.z );
    //rotateX(PI/6);
    //rotateY(-TWO_PI * mouseX/width);
    translate( 0, 0, _pos.z );

    rotateX( _angle.x );
    rotateY( _angle.y );
  };
};

var cm;
var pm;
var tm;
var cam;

function setup() {
  // uncomment this line to make the canvas the full size of the window
  createCanvas(windowWidth, windowHeight, WEBGL);
  //ortho(-width/2, width/2, height/2, -height/2, 0.1, 100);
  //b0Change();

  cm = new ColorMgr();
  pm = new PositionMgr();
  tm = new ThingMgr();

  var i;
  for ( i=0; i<20; i++ ) {
    tm.createNewThing();
  }

  cam = new Camera();

}

function draw() {

  tm.update();
  cam.update();

  background(0);
  orbitControl();

  //ortho(-width, width, height, -height/2, 0.1, 100);
  push();

  //pointLight(255, 255, 255, mouseX, mouseY, 0);
  //specularMaterial(250,0,0);
  // var dirY = (mouseY / height - 0.5) *2;
  // var dirX = (mouseX / width - 0.5) *2;
  ambientLight(20,20,20);
  //pointLight(255, 255, 255, width/2, height, 100);
  //directionalLight(250, 250, 250, dirX, dirY, -0.5);
  directionalLight(250, 250, 250, 1, 0, 0.2);

  //basicMaterial(250,0,0);

  //rotateX(PI/6);
  // rotateY(-PI/3);

  tm.draw();

  // translate(100,100,-100);
  // rotate(PI/4, [1,1,0]);
  // box(30);
  // translate(200,200,0);
  // sphere(50, 64);
  //
  // //ambientMaterial(250);
  // translate(200,200,0);
  // sphere(50, 64);

  pop();

}

function mouseClicked() {

}

function keyTyped() {
  if (key === 'a') {
    pm.reset();
    tm.resetThings();
  }
  return false; // prevent any default behavior
}
