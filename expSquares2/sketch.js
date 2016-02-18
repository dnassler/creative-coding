var main;
var camera;
var stateSnapshot;
var timeZero;
var isRecording = false;
var recordedHistory;

var numGridColumns = 20;
var numGridRows = 20;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  rectMode(CENTER);

  timeZero = millis();
  camera = new Camera();
  main = _main();
  main.setup();
  camera.autoMove();
}

function draw() {
  background(255);
  push();
  camera.update();
  main.update();
  main.draw();
  pop();
}

function keyTyped() {
  var g = main.grid();
  if (key === ' ') {
    g.resetPattern();
  } else if ( key === '=' ) {
    var i;
    for ( i=0; i<10; i++ ) {
      g.addShape();
    }
  } else if ( key === '-' ) {
    var i;
    for ( i=0; i<10; i++ ) {
      g.removeShape();
    }
  } else if ( key === '0' ) {
    g.changeAlignment( 0 );
  } else if ( key === '1' ) {
    g.changeAlignment( 1 );
  } else if ( key === '2' ) {
    g.changeAlignment( 2 );
  } else if ( key === '3' ) {
    g.changeAlignment( 3 );
  } else if ( key === '4' ) {
    g.changeAlignment( 4 );
  } else if ( key === '5' ) {
    g.changeAlignment( 5 );
  } else if ( key === 'a' ) {
    camera.autoMove();
  } else if ( key === 's' ) {
    camera.startMoving(1,0,0);
  } else if ( key === 'd' ) {
    camera.startMoving(4,0,0);
  } else if ( key === 'f' ) {
    camera.startMoving(1, (numGridColumns-1)*(g.getCellWidth()), (numGridRows-1)*(g.getCellWidth()));
  } else if ( key === 'g' ) {
    camera.startMoving(4, (numGridColumns-1)*(g.getCellWidth())*4, (numGridRows-1)*(g.getCellWidth())*4);
    //camera.stopAutoMove =  true;
  } else if ( key === 'k' ) {
    stateSnapshot = g.getState();
    var snapshotJSON = JSON.stringify(stateSnapshot);
    console.log(snapshotJSON);
  } else if ( key === 'l' ) {
    if ( stateSnapshot != undefined ) {
      g.restoreState( stateSnapshot );
    }
  } else if ( key === 'v' ) {
    g.resetShapesOnly();
  } else if ( key === 'c' ) {
    g.resetColorsOnly();
  } else if ( key === 'r' ) {
    console.log('*** REC START ***');
    timeZero = millis();
    isRecording = true;
    recordedHistory = [];
    recordedHistory.push({time:0, grid: g.getState()});
    recordedHistory.push({time:0, camera:camera.getState()});
  } else if ( key === 't' ) {
    console.log('--- REC STOP ---');
    isRecording = false;
    var recordedHistoryJSON = JSON.stringify(recordedHistory);
    console.log(recordedHistoryJSON);
  } else if ( keyCode === LEFT_ARROW ) {
    console.log('left arrow');
  } else if ( keyCode === RIGHT_ARROW ) {
    console.log('right arrow');
  } else if ( key === 'u' ) {
    // _destScale = destScale != undefined ? destScale : random(0.5,4);
    // _destOffsetX = destOffsetX != undefined ? destOffsetX : random(-width,width*0.5/_destScale);
    // _destOffsetY = destOffsetY != undefined ? destOffsetY : random(-height,height*0.5/_destScale);
    camera.startMoving(4,-width,-height);
  } else if ( key === 'i' ) {
    camera.startMoving(4,width*0.5,-height);
  } else if ( key === 'o' ) {
    camera.startMoving(4,width*0.5,height*0.5);
  } else if ( key === 'p' ) {
    camera.startMoving(4,-width,height*0.5);
  }
}

var _main = function(){

  var _g;

  var _setup = function(){
    _g = new Grid(numGridColumns, numGridRows);
  };

  var _update = function(){
    _g.update();
  };

  var _draw = function() {
    _g.draw();
  };

  return {
    grid: function(){return _g;},
    setup: _setup,
    update: _update,
    draw: _draw
  };

};

var Camera = function(){

  var _self = this;
  this.attr = { scale: 1, offsetX: 0, offsetY: 0 };
  var _destScale;
  var _destOffsetX, _destOffsetY, _destTransitTime;
  var _startedMovingAt;
  this.stopAutoMove = false;

  var _autoMove = function(){
    _startMoving().then(function(){
      if ( !_self.stopAutoMove ) {
        var wait = random(10)<5 ? 0 : random(2000);
        if ( isRecording ) {
          recordedHistory.push({time:millis()-timeZero, wait:wait});
        }
        window.setTimeout(function(){
          _autoMove();
        }, wait);
      } else {
        _self.stopAutoMove = false;
      }
    });
  };
  this.autoMove = _autoMove;

  this.getState = function(){
    var state;
    if ( _destScale != undefined ) {
      state = {startedMovingAt: _startedMovingAt, scale: _destScale, offsetX: _destOffsetX, offsetY: _destOffsetY, transitTime: _destTransitTime};
    } else {
      state = {scale: _self.attr.scale, offsetX: _self.attr.offsetX, offsetY: _self.attr.offsetY};
    }
  };

  var _nextMoveFastCount = 5;
  var _numMovesCounter = 0;
  var _moveFastCount = 0;
  var _startMoving = function(destScale, destOffsetX, destOffsetY){
    return new Promise(function(resolve,reject){
      _numMovesCounter += 1;
      if ( _moveFastCount === 0 && _numMovesCounter > _nextMoveFastCount ) {
        _moveFastCount = 4;
      }
      _startedMovingAt = millis() - timeZero;
      _destScale = destScale != undefined ? destScale : random(0.6,4);
      // _destOffsetX = destOffsetX != undefined ? destOffsetX : random(-width*0.5,width/_destScale);
      // _destOffsetY = destOffsetY != undefined ? destOffsetY : random(-height*0.5,height/_destScale);
      var grid = main.grid();
      var numCols = grid.getNumColumns();
      var numRows = grid.getNumRows();
      var cellWidth = grid.getCellWidth();

      // var moveAcross = false;
      // var moveVertical = false;
      // var moveMode = random(10);
      // if ( moveMode < 4 ) {
      //   moveAcross = true;
      // } else if ( moveMode < 8 ) {
      //   moveVertical = true;
      // } else {
      //   moveAcross = true;
      //   moveVertical = true;
      // }

      var destRow, destCol;
      var rShape = grid.pickShape();
      destRow = rShape.getStartRow();
      destCol = rShape.getStartCol();

      if ( destOffsetX !== undefined ) {
        _destOffsetX = destOffsetX;
      } else {
        // if ( moveAcross ) {
        //   _destOffsetX = random(numCols)*cellWidth*_destScale;
        // }
        _destOffsetX = destCol * cellWidth * _destScale;
      }

      if ( destOffsetY !== undefined ) {
        _destOffsetY = destOffsetY;
      } else {
        // if ( moveVertical ) {
        //   _destOffsetY = random(numRows)*cellWidth*_destScale;
        // }
        _destOffsetY = destRow * cellWidth * _destScale;
      }

      var transitTimeMode;

      if ( _moveFastCount > 0 ) {
        _moveFastCount -= 1;
        if ( _moveFastCount === 0 ) {
          _nextMoveFastCount = _numMovesCounter + random(5,10);
        }
        transitTimeMode = 10;
      } else {
        transitTimeMode = random(10);
      }

      if ( transitTimeMode < 6 ) {
        _destTransitTime = random(5000,10000);
      } else if ( transitTimeMode < 8 ) {
        _destTransitTime = random(1000,5000);
      } else {
        _destTransitTime = 500;
      }

      if ( isRecording ) {
        recordedHistory.push({time:_startedMovingAt, camera:_self.getState()});
      }
      createjs.Tween.get(_self.attr,{override:true}).to({scale:_destScale, offsetX:_destOffsetX, offsetY:_destOffsetY},
         _destTransitTime, createjs.Ease.cubicInOut).call(function() {
           resolve();
      });
    });
  };
  this.startMoving = _startMoving;

  var _moveToOrigin = function(){
    _startMoving(1,0,0);
  };
  this.moveToOrigin = _moveToOrigin;

  this.update = function(){
    translate(width/2,height/2);
    translate(-_self.attr.offsetX, -_self.attr.offsetY);
    scale(_self.attr.scale);

  };

}

var Grid = function(numX,numY){
  var _self = this;
  var _gridArr;
  var _eventArr;
  var _cellWidth;
  var _cellAlignmentMode = 0;

  this.getCellWidth = function(){
    return _cellWidth;
  };
  this.getNumColumns = function() {
    return numX;
  }
  this.getNumRows = function() {
    return numY;
  }

  var _init = function(){
    var i;
    _cellWidth = width/numX;
    _eventArr = [];
    _resetPattern();

    var periodicRemoveShapes = function(){
      _removeShape( floor(random(10,20)) );
      _addEvent( random(2000,5000), periodicRemoveShapes );
    };
    _addEvent( random(2000,5000), periodicRemoveShapes );

    var periodicAddShapes = function(){
      _addShape( floor(random(10,20)) );
      _addEvent( random(2000,5000), periodicAddShapes );
    };
    _addEvent( random(2000,5000), periodicAddShapes );

    var periodicChangeColors = function(){
      _resetColorsOnly();
      _addEvent( random(20000,40000), periodicChangeColors );
    };
    _addEvent( random(20000,40000), periodicChangeColors );

    var periodicResetPattern = function(){
      _changeAlignment();
      _resetPattern();
      _addEvent( random(45000,60000), periodicResetPattern );
    };
    _addEvent( random(45000,60000), periodicResetPattern );

  }
  this.init = _init;

  this.getState = function(){
    var shapeStateArr = [];
    _gridArr.forEach( function(shape){
      shapeStateArr.push( shape.getState() );
    });
    return {shapeStateArr: shapeStateArr};
  };

  this.restoreState = function( state ) {
    _gridArr = [];
    state.shapeStateArr.forEach(function(shapeState){
      _gridArr.push( new GridShape(shapeState) );
    });
  };

  var _pickShape = function() {
    var rIndex = floor(random(_gridArr.length));
    return _gridArr[rIndex];
  };
  this.pickShape = _pickShape;

  var _isNearShape = function( col, row ){
    var newShape = _gridArr.find( function( cell ){
      var cDiff, rDiff;
      cDiff = cell.getCol() - col;
      rDiff = cell.getRow() - row;
      if ( cDiff < 3 && rDiff < 3 ) {
        return true;
      }
    });
    return newShape !== undefined;
  };
  this.isNearShape = _isNearShape;

  var _addShape = function(numShapes){
    var i;
    if ( numShapes === undefined ) {
      numShapes = 1;
    }
    for ( i=0; i<numShapes; i++ ) {
      _gridArr.push( new GridShape() );
    }
    return;
  };
  this.addShape = _addShape;

  var _removeShape = function( numShapes ) {
    if ( _gridArr.length === 0 ) {
      return;
    }
    var i;
    if ( numShapes === undefined ) {
      numShapes = 1;
    }
    for ( i=0; i<numShapes; i++ ) {
      var randomIndex = floor(random(_gridArr.length));
      _gridArr.splice(randomIndex,1);
    }
    return;
  };
  this.removeShape = _removeShape;

  var _changeAlignment = function( newAlignment ){
    _cellAlignmentMode = newAlignment === undefined ? floor(random(6)) : newAlignment;
  };
  this.changeAlignment = _changeAlignment;

  var _resetPattern = function(numShapes){

    if ( isRecording ) {
      recordedHistory.push({time:millis()-timeZero, grid:_self.getState()});
    }

    var i, j;
    var c, size, length;
    _gridArr = [];

    var n = numShapes ? numShapes : random(100,250);
    for ( i=0; i<n; i++ ) {
      _gridArr.push( new GridShape() );
    }

  };
  this.resetPattern = _resetPattern;

  var _resetShapesOnly = function(){
    _gridArr.forEach( function(shape){
      shape.resetShapeOnly();
    });
  };
  this.resetShapesOnly = _resetShapesOnly;

  var _resetColorsOnly = function(){
    _gridArr.forEach( function(shape){
      shape.resetColorOnly();
    });
  };
  this.resetColorsOnly = _resetColorsOnly;

  var _gridEventId = 0;
  var _newGridEventId = function() {
    _gridEventId += 1;
    return _gridEventId;
  };

  var GridEvent = function( delay, action ) {
    this.id = _newGridEventId();
    this.time = millis() + delay;
    this.doAction = action;
  };

  var _addEvent = function( delay, action ) {
    _eventArr.push( new GridEvent(delay, action) );
  };

  var _removeEvent = function( event ) {
    var i = _eventArr.findIndex(function(element){
      if ( element.id === event.id ) {
        return true;
      }
      return false;
    });
    _eventArr.splice(i,1);
  };

  var _doExpiredEvents = function(){
    var expiredEvents = [];
    _eventArr.forEach( function(event) {
      if ( millis() > event.time ) {
        event.doAction();
        expiredEvents.push( event );
      }
    });
    if ( expiredEvents.length > 0 ) {
      expiredEvents.forEach(function(event){
        _removeEvent( event );
      });
    }
  };

  var _update = function(){
    _doExpiredEvents();
    _gridArr.forEach( function(shape){
      shape.update();
    });
  };
  this.update = _update;

  var _draw = function() {
    _gridArr.forEach( function(shape){
      shape.draw();
    });
  };
  this.draw = _draw;

  var GridShape = function(shapeState){

    var _cells;
    var c, length, size, shapeAlignMode, i, j, isHorizontal, nextCellIncrement;
    var maxLength;

    this.getStartRow = function(){
      return j;
    };
    this.getStartCol = function(){
      return i;
    };

    var _init = function(colorIn) {

      _cells = [];
      maxLength = 5;
      c = (colorIn === undefined) ? color(random(255),random(255),random(255),200) : colorIn;
      length = floor(random(1,maxLength+1));
      size = (floor(random(8))+1) * _cellWidth/8;//random(_cellWidth/10, _cellWidth*1.2);
      shapeAlignMode = _cellAlignmentMode < 5 ? _cellAlignmentMode : floor(random(5));//random(10) < 5;

      // i = floor(random(-numX/2,numX));
      // j = floor(random(-numY/2,numY));
      i = floor(random(0,numX));
      j = floor(random(0,numY));

      isHorizontal = random(10)<5 ? true : false;
      nextCellIncrement = floor(random(-2,3));

      if ( shapeState != undefined ) {
        c = shapeState.color;
        length = shapeState.length;
        size = shapeState.size;
        shapeAlignMode = shapeState.shapeAlignMode;
        i = shapeState.i;
        j = shapeState.j;
        isHorizontal = shapeState.isHorizontal;
        nextCellIncrement = shapeState.nextCellIncrement;
      }

      var x = i;
      var y = j;
      var a;
      for ( a=0; a<length; a++ ) {
        _cells.push(new GridCell(x,y,c,_cellWidth,size, shapeAlignMode) );
        if ( isHorizontal ) {
          x += nextCellIncrement;
        } else {
          y += nextCellIncrement;
        }
      }

    };
    _init();

    this.resetShapeOnly = function() {
      _init(c); // reuse original color
    };

    this.resetColorOnly = function() {
      c = color(random(255),random(255),random(255),200);
      _cells.forEach(function(cell){
        cell.setColor( c );
      });
    };

    this.getState = function(){
      return {
        color: c, length: length, size: size, shapeAlignMode: shapeAlignMode,
        i: i, j: j,
        isHorizontal: isHorizontal, nextCellIncrement: nextCellIncrement
      };
    };

    var _update = function(){
      _cells.forEach(function(cell){
        cell.update();
      });
    };
    this.update = _update;

    var _draw = function(){
      _cells.forEach(function(cell){
        cell.draw();
      });
    };
    this.draw = _draw;

  };

  var GridCell = function(i,j,c,w,size,alignMode) {

    this.setColor = function( colorIn ) {
      c = colorIn;
    };

    var _update = function(){

    };
    this.update = _update;

    var _draw = function(){
      noStroke();
      fill( c );
      push();

      if ( alignMode === 1 ) {
        translate(-(w-size)/2,-(w-size)/2);
      } else if ( alignMode === 2 ) {
        translate((w-size)/2,-(w-size)/2);
      } else if ( alignMode === 3 ) {
        translate((w-size)/2,(w-size)/2);
      } else if ( alignMode === 4 ) {
        translate(-(w-size)/2,(w-size)/2);
      }

      rect( i*w, j*w, size, size );


      pop();

    };
    this.draw = _draw;
  };

  _init();

};
