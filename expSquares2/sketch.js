var main;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  main = _main();
  main.setup();
}

function draw() {
  background(255);
  main.update();
  main.draw();
}

function keyTyped() {
  var g = main.grid();
  if (key === ' ') {
    g.resetPattern();
  } else if ( key === '=' ) {
    g.addShape();
  } else if ( key === '-' ) {
    g.removeShape();
  }
}

var _main = function(){

  var _g;

  var _setup = function(){
    _g = new Grid(16,10);
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

var Grid = function(numX,numY){
  var _gridArr;
  var _cellWidth;
  var _init = function(){
    var i;
    _cellWidth = width/numX;
    // for ( i=0; i<numX; i++ ) {
    //   _grid.push([]);
    // }
    _resetPattern();
  }
  this.init = _init;

  var _addShape = function(){
    return _gridArr.push( new GridShape() );
  };
  this.addShape = _addShape;

  var _removeShape = function() {
    return _gridArr.pop();
  };
  this.removeShape = _removeShape;

  var _resetPattern = function(numShapes){
    var i, j;
    var c, size, length;
    _gridArr = [];

    var n = numShapes ? numShapes : random(5,100);
    for ( i=0; i<n; i++ ) {
      _gridArr.push( new GridShape() );
    }
    // for ( i=0; i<numX; i++ ) {
    //   for ( j=0; j<numY; j++ ) {
    //     if ( !c ) {
    //       if ( random(10) < 2 ) {
    //         c = color(random(255),random(255),random(255),200);
    //         length = floor(random(1,6));
    //         size = random(_cellWidth/10, _cellWidth);
    //       }
    //     }
    //     if ( c ) {
    //       try {
    //         //_grid[i][j] = ;
    //         _gridArr.push(new GridCell(i,j,c,_cellWidth,size));
    //
    //       } catch (e) {
    //         console.log('error: i='+i+', j='+j);
    //       }
    //     }
    //
    //     length -= 1;
    //     if ( length === 0 ) {
    //       c = undefined;
    //     }
    //
    //   }
    // }

  };
  this.resetPattern = _resetPattern;

  var _update = function(){
    _gridArr.forEach( function(shape){
      shape.update();
    });
  };
  this.update = _update;

  var _draw = function() {
    _gridArr.forEach( function(shape){
      shape.draw();
    });
    // for ( j=0; j<numY; j++ ) {
    //   for ( i=0; i<numX; i++ ) {
    //     cell = _grid[i][j];
    //     if ( cell ) {
    //       cell.draw(i,j);
    //     }
    //   }
    // }
  };
  this.draw = _draw;

  var GridShape = function(){

    var c = color(random(255),random(255),random(255),200);
    var length = floor(random(1,6));
    var size = random(_cellWidth/10, _cellWidth);
    var _cells = [];
    var a;
    var i = floor(random(numX));
    var j = floor(random(numY));
    var isHorizontal = random(10)<5 ? true : false;
    for ( a=0; a<length; a++ ) {
      _cells.push(new GridCell(i,j,c,_cellWidth,size) );
      if ( isHorizontal ) {
        i += 1;
      } else {
        j += 1;
      }
    }

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

  var GridCell = function(i,j,c,w,size) {
    var _update = function(){

    };
    this.update = _update;

    var _draw = function(){
      noStroke();
      fill( c );
      rect( i*w+(w-size)/2, j*w+(w-size)/2, size, size );
    };
    this.draw = _draw;
  };

  _init();

};
