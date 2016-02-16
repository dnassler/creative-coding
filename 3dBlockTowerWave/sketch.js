
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

var b0 = 0;
function b0Change() {
  b0 = random(0,255);
  window.setTimeout(b0Change,1000);
}

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

var Thing = function( mgr ) {
  var _self = this;
  var _color;
  var _pos;
  var _size;
  var _offsetHeight;

  var _init = function() {
    _color = cm.getNewColor();
    _pos = pm.getFreePosition();
    pm.reservePos( _pos, _self );
    _size = {w:1, h:floor(random(1,3))};
  };
  _init();

  this.getGridPoint = function() {
    return _pos;
  };

  this.update = function() {
    // _offsetHeight = 5*sin((millis()+_pos.row*100+_pos.col*100)/PI/100.0);
    _offsetHeight = 5*sin((mgr.clock + _pos.row*100+_pos.col*100)/PI/100.0);
  };

  this.draw = function() {
    push();
    //translate(i*30*4,j*30*4,0);
    pm.translateToThingPos( _self );

    ambientMaterial(_color);
    //ambientMaterial(b0+random(-100,100),random(100,120),random(200,220));
    //specularMaterial(b0+random(-100,100),random(100,120),random(200,220));

    translate( 0, -30*(_size.h + _offsetHeight - 1), 0 );
    box( 30 * _size.w, 30 * (_size.h + _offsetHeight), 30 * _size.w);
    pop();

  };

};

var ThingMgr = function() {

  var _self = this;
  var _thingArr;
  var _holdFrameCount = 0;
  this.clock = 0;
  var _clockHiddenDelta = 0;
  this.speed = 1;
  this.mouseControlsSpeed = false;
  this.paused = false;
  this.frameJumpFactor = 0;

  var _init = function() {
    _thingArr = [];
  };
  _init();

  this.createNewThing = function() {
    _thingArr.push( new Thing( _self ) );
  };

  this.update = function() {
    if ( !this.paused ) {
      if ( this.frameJumpFactor > 0 ) {
        _holdFrameCount += 1;
        _holdFrameCount %= this.frameJumpFactor;
      }
      if ( this.mouseControlsSpeed ) {
        _clockHiddenDelta += 15 * ((mouseX*6)/width - 3);
      } else {
        _clockHiddenDelta += 15 * this.speed;//+(random(-5,10));
      }
      if ( this.frameJumpFactor === 0 || _holdFrameCount === 0 ) {
        this.clock += _clockHiddenDelta;
        _clockHiddenDelta = 0;
      }
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

var cm;
var pm;
var tm;

function setup() {
  // uncomment this line to make the canvas the full size of the window
  createCanvas(windowWidth, windowHeight, WEBGL);
  //ortho(-width/2, width/2, height/2, -height/2, 0.1, 100);
  b0Change();

  cm = new ColorMgr();
  pm = new PositionMgr();
  tm = new ThingMgr();

  var i;
  for ( i=0; i<20; i++ ) {
    tm.createNewThing();
  }

}

function draw() {

  tm.update();

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

  rotateX(PI/6);
  //rotateY(-PI/3);

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
  if (key === 'r') {
    pm.reset();
    tm.resetThings();
  } else if ( key === '=' || key === '+' ) {
    // faster
    tm.speed += 0.1;
  } else if ( key === '-' || key === '_' ) {
    // slower
    tm.speed -= 0.1;
  } else if ( key === 'p' ) {
    tm.paused = !tm.paused;
  } else if ( key === 'm' ) {
    tm.mouseControlsSpeed = !tm.mouseControlsSpeed;
  } else if ( key === '2') {
    tm.frameJumpFactor += 5;
  } else if ( key === '1' ) {
    tm.frameJumpFactor -= 5;
    if ( tm.frameJumpFactor < 0 ) {
      tm.frameJumpFactor = 0;
    }
  }
  return false; // prevent any default behavior
}
