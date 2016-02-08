var dm;
var ds;
var horizon;
var showBottomMarker;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();

  showBottomMarker = true;

  dotField = new DotField(height);

  dm = new DarkMatter();
  dm.moveLoop();


  ds = new DotSizeControl(dotField);
  ds.moveLoop();

  horizon = new Horizon(height- height/10, ds);


}

function draw() {
  background(0);

  dotField.draw();
  if ( showBottomMarker ) {
    horizon.draw();
  }

  if ( explodingSquares.length > 0 ) {
    explodingSquares.forEach(function( item ){
      item.draw();
    });
    explodingSquares = explodingSquares.filter( function(item){
      return !item.kill;
    });
  }

}

function DotField( horizonY ) {

  var _self = this;
  var dotSpacing = 50;
  var dotSpacingMin = 5;
  _self.dotSize = createVector(dotSpacing,dotSpacing);
  this.xOffset = width/3;

  var sizeFactor = 2;
  var dotOffsetY = 0;
  var _timeToResetColors = 0;
  var _resetColors = true;
  var maxI = ceil(width/dotSpacingMin)+1;
  var maxJ = ceil(height/dotSpacingMin)+1;
  var _dotColors = new Array(maxI);
  for (var i = 0; i < _dotColors.length; i++) {
    _dotColors[i] = new Array(maxJ);
  }
  var _dotOutline = new Array(maxI);
  for (var i = 0; i < _dotOutline.length; i++) {
    _dotOutline[i] = new Array(maxJ);
  }

  var max_distance = dist(0, 0, width, height);
  if (horizonY === undefined) {
    horizonY = height;
  }

  this.draw = function() {
    dotSpacingX = _self.dotSize.x;
    dotSpacingY = _self.dotSize.y;
    var size2;
    //dotOffsetY += 1;
    if ( dotOffsetY > dotSpacing ) {
      dotOffsetY = 0;
    }
    if ( millis() > _timeToResetColors ) {
      _timeToResetColors = millis() + 250;
      _resetColors = true;
    }
    var iCount = 0;
    var jCount = 0;
    var xOffset = this.xOffset;
    for(var i0 = 0; i0 <= 2*width + dotSpacingX; i0 += dotSpacingX, iCount++ ) {
      i = i0 + xOffset - dotSpacingX*40
      if ( i < 0 || i > width + dotSpacingX ) {
        continue;
      }
      for(var j = 0; j <= horizonY + dotSpacingY; j += dotSpacingY, jCount++ ) {
        //var size = dist(mouseX, mouseY, i, j)/2;//abs(mouseX-i)/2;
        var size = dist(dm.position.x, dm.position.y, i, j)/2;//abs(mouseX-i)/2;

        size = size/max_distance * dotSpacingX*sizeFactor + 1;
        size2 = size/2;
        //ellipse(i, j, size, size);
        var c;
        var outline;
        noStroke();
        if ( _resetColors ) {
          _dotOutline[iCount][jCount] = false;
          outline = false;
          if ( random(100) < 3 ) {
            c = color(255);
            outline = random(100)<2 ? true : false;
            // if ( outline && random(5) < 2 ) {
            //   outline = false; // no outline because there will be explosion instead
            //   explodingSquares.push( new ExplodingSquare(createVector(i,j), size));
            // }
            _dotOutline[iCount][jCount] = outline;
          } else {
            c = color(50,random(100,200),random(100,200));
          }
          _dotColors[iCount][jCount] = c;
        } else {
          c = _dotColors[iCount][jCount];
          outline = _dotOutline[iCount][jCount];
          if ( !c ) {
            c = color(50,random(100,200),random(100,200));
            _dotColors[iCount][jCount] = c;
          }
        }
        fill(c);
        //rect(i-size2,j-size2-dotOffsetY,size,size);
        rect(i-size2,j-size2-dotOffsetY,size,size);

        if ( outline ) {
          size2 *= 3;
          size *= 3;
          push();
          noFill();
          stroke(c);
          strokeWeight(4);
          //rect(i-size2,j-size2,size,size);
          rect(i-size2,j-size2,size,size);

          pop();
        }
      }
    }
    _resetColors = false;
  };
}

var explodingSquares = [];
function ExplodingSquare( position, size0 ) {
  var _self = this;
  this.kill = false;
  var _attr = {size : size0, alpha:255};
  var maxSizeFactor = random(10)<1 ? 20 : 5;
  createjs.Tween.get(_attr).to({size:size0*maxSizeFactor,alpha:0}, random(2000,5000), createjs.Ease.cubicOut).call(function() {
    _self.kill = true;
  });

  this.draw = function(){
    push();
    noFill();
    stroke(255, _attr.alpha);
    strokeWeight(4);
    var size = _attr.size;
    var size2 = size/2;
    rect(position.x-size2,position.y-size2,size,size);
    pop();
  };
}

function DarkMatter() {

  var _self = this;
  var _v = createVector(random(width),random(height));
  var _dv;

  this.position = _v;

  var _move = function(){
    _dv = createVector(random(width),random(height));
    return new Promise(function(resolve, reject) {
      createjs.Tween.get(_v).to({x:_dv.x,y:_dv.y}, random(500,2000), createjs.Ease.cubicInOut).call(function() {
        //explodingSquares.push( new ExplodingSquare(_dv, 10));
        window.setTimeout(function(){
          resolve();
        }, random(2000));
      });
    });
  };

  var _moveLoop = function(){
    _move().then(function(){
      _moveLoop();
    });
  };

  this.moveLoop = _moveLoop;

}

function DotSizeControl(df) {

  var _self = this;
  var _v = df.dotSize;//createVector(50,50);
  var _dv;
  var _destXOffset;
  this.dotSizeVec = _v;
  this.dotSizeMaxX = 50;
  this.dotSizeMinX = 20;

  var _move = function(){
    var r = random(20,50);
    var r2 = random(20,50);
    _dv = createVector(r,r2);
    _destXOffset = random(width/3,width/2);
    return new Promise(function(resolve, reject) {
      var d = random(5000,10000);
      createjs.Tween.get(df).to({xOffset:_destXOffset}, d, createjs.Ease.cubicInOut);
      createjs.Tween.get(_v).to({x:_dv.x,y:_dv.y}, d, createjs.Ease.cubicInOut).call(function() {
        window.setTimeout(function(){
          resolve();
        }, random(2000));
      });
    });
  };

  var _moveLoop = function(){
    _move().then(function(){
      _moveLoop();
    });
  };

  this.moveLoop = _moveLoop;

}


function Horizon( horizonY, dotSizeControl ) {
  if (horizonY === undefined) {
    horizonY = height/2;
  }
  // var _attr = { lightSlice : 0, darkSlice : 0 };
  // var _startLightSlice = millis() + 5000;
  // var _endLightSlice;
  //
  var aspect = width/height;
  function update() {

  }
  //   if (_startLightSlice && millis() > _startLightSlice) {
  //     createjs.Tween.get(_attr).to({lightSlice:height-horizonY}, 10000, createjs.Ease.sineIn).call(function() {
  //       _endLightSlice = millis() + 10000;
  //     });
  //     _startLightSlice = 0;
  //   }
  //   if (_endLightSlice && millis() > _endLightSlice) {
  //     createjs.Tween.get(_attr).to({darkSlice:height-horizonY}, 10000, createjs.Ease.sineIn).call(function() {
  //       _startLightSlice = millis() + 10000;
  //       _attr.lightSlice = 0;
  //       _attr.darkSlice = 0;
  //     });
  //     _endLightSlice = 0;
  //   }
  // }


  this.draw = function() {
    noStroke();

    fill(50,50,50);
    var mw = height-horizonY;
    rect(0, horizonY, width, mw);
    //rect(0,0, mw,height);
    update();
    // if ( _attr.lightSlice > 0 ) {
    //   fill(0);
    //   rect(0, horizonY, width, _attr.lightSlice);
    // }
    // if ( _attr.darkSlice > 0 ) {
    //   fill(50,50,100);
    //   rect(0, horizonY, width, _attr.darkSlice);
    // }
    var numMarks = 100/aspect/1.2;
    var markSpacing = height/numMarks;

    // for (i=0; i<numMarks; i++){
    //   if ( i % 5 === 0 ) {
    //     fill(100);
    //     rect(0,i*markSpacing,mw/2,2);
    //   } else {
    //     fill(75);
    //     rect(0,i*markSpacing,mw/4,2);
    //   }
    // }
    fill(200,50,50);
    var dotSizeScale =
      (height - mw ) * (dotSizeControl.dotSizeVec.x - dotSizeControl.dotSizeMinX)
      / (dotSizeControl.dotSizeMaxX - dotSizeControl.dotSizeMinX);
    rect(0, dotSizeScale, mw, 5);

    var numMarks = 100;
    var markSpacing = width/numMarks;
    for (i=0; i<numMarks; i++){
      if ( i % 10 === 0 ) {
        fill(100);
        rect(i*markSpacing,horizonY+(height-horizonY)/4,2,height-horizonY);
      } else {
        fill(75);
        rect(i*markSpacing,horizonY+(height-horizonY)/2,2,height-horizonY);
      }
    }
    fill(200,50,50);
    rect(dm.position.x, horizonY, 5, height-horizonY);
  };


}

function keyPressed() {
  if (key === ' ') {
    showBottomMarker = !showBottomMarker;
  }
}
