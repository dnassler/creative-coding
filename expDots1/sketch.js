var max_distance;
var dm;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();

  max_distance = dist(0, 0, width, height);

  dm = new DarkMatter();
  dm.moveLoop();
}

function draw() {
  background(0);
  var size2;

  for(var i = 0; i <= width; i += 20) {
    for(var j = 0; j <= height; j += 20) {
      //var size = dist(mouseX, mouseY, i, j)/2;//abs(mouseX-i)/2;
      var size = dist(dm.position.x, dm.position.y, i, j)/2;//abs(mouseX-i)/2;

      size = size/max_distance * 30+1;
      size2 = size/2;
      //ellipse(i, j, size, size);
      var c;
      var outline;
      outline = false;
      noStroke();
      if ( random(100) < 3 ) {
        c = color(255);
        fill(c);
        outline = random(100)<2 ? true : false;
      } else {
        c = color(50,random(100,200),random(100,200));
        fill(c);
      }
      rect(i-size2,j-size2,size,size);
      if ( outline ) {
        size2 *= 3;
        size *= 3;
        push();
        noFill();
        stroke(c);
        strokeWeight(4);
        rect(i-size2,j-size2,size,size);
        pop();
        if ( random(5) < 1 ) {
          explodingSquares.push( new ExplodingSquare(createVector(i,j), size));
        }
      }
    }
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
