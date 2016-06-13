//Create the renderer
var renderer = PIXI.autoDetectRenderer(1024,1024);

//renderer.view.style.border = "1px dashed black";
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.backgroundColor = 0x808080;

// var footer = document.querySelector("#mainFooter");
// console.log("#mainFooter.width="+footer.offsetWidth+", height="+footer.offsetHeight);
// renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

var scale = scaleToWindow(renderer.view);

//Create a container object called the 'stage'
var stage = new PIXI.Container();
var shadowContainer = new PIXI.Container();
var shapeContainer = new PIXI.Container();

//Tell the 'renderer' to 'render' the 'stage'
renderer.render(stage);


window.addEventListener("resize", function(event){
  scaleToWindow(renderer.view);
});

//---
//---

var count = 0;

function animate() {
  requestAnimationFrame( animate );
  updateState();
  renderer.render(stage);
}

var graphics;
var graphics2;
var shadow1, shadow2;
var shadow1OffsetMax, shadow2OffsetMax;
var shadowOffsetBasis;
var shadowOffsetBasis;
var texture, ctx;
var moveSmall = true;

var s1, s2;
var shapesArr;

function setup() {

  shadowOffsetBasis = new PIXI.Point(1, 1);

  var h = renderer.height;
  var w = renderer.width;

  shapesArr = [];

  s1 = new Shape(
    Math.random() * w,
    Math.random() * h, h/2, h/2,
    100, '#2a52be',
    shapeContainer, shadowContainer
  );
  shapesArr.push( s1 );

  s2 = new Shape(
    Math.random() * w,
    h * 0.5, h/3, h/3,
    200, '#1E90FF',
    shapeContainer, shadowContainer
  );
  shapesArr.push( s2 );

  // s3 = new Shape(
  //   Math.random() * w,
  //   Math.random() * h, h * 0.1, h * 0.1,
  //   250, '#FFFFFF',
  //   shapeContainer, shadowContainer
  // );
  // shapesArr.push( s3 );

  s4 = new Shape(
    Math.random() * w,
    Math.random() * h, h * 0.1, h * 0.1,
    150, '#FFFFFF',
    shapeContainer, shadowContainer
  );
  shapesArr.push( s4 );

  // s5 = new Shape(
  //   Math.random() * w,
  //   Math.random() * h, h * 0.2, h * 0.2,
  //   300, '#1E90FF',
  //   shapeContainer, shadowContainer
  // );
  // shapesArr.push( s5 );

  s6 = new Shape(
    Math.random() * w,
    Math.random() * h, h * 0.2, h * 0.2,
    50, '#2a52be',
    shapeContainer, shadowContainer
  );
  shapesArr.push( s6 );

  stage.addChild(shadowContainer);
  stage.addChild(shapeContainer);

  var changeThings = function() {
    window.setTimeout(function(){
      moveSmall = !moveSmall;

      //shadowOffsetBasis.set( Math.random()*8-4, Math.random()*8-4);

      shapesArr.forEach( function( shape ) {
        shape.setPosX( Math.random() * w );
        shape.setPosY( Math.random() * h );
      });

      // s1.setPosX( Math.random() * w );
      // s1.setPosY( h * (0.25 + Math.random()*0.25) );
      //
      // s2.setPosX( Math.random() * w );
      // s2.setPosY( h * (0.5 + Math.random()*0.5) );

      changeThings();
    }, 5000);
  }
  changeThings();

}

function setup0() {

  graphics = new PIXI.Graphics();
  graphics.scale = new PIXI.Point(1,1);
  graphics.beginFill(0x2a52be);
  //graphics.lineStyle(4, 0xFFFFFF, 1);
  graphics.lineStyle(0);
  var h = renderer.height;//header.offsetHeight;
  var w = renderer.width;
  var h3 = h/4;
  var sw = h3;

  shadowOffsetBasis = new PIXI.Point(2, 1.5);
  // graphics.moveTo(-h3,-h3);
  // graphics.lineTo(h3, -h3);
  // graphics.lineTo(0, h3);
  // graphics.lineTo(-h3, -h3);
  // graphics.endFill();
  graphics.drawRect(-h3,-h3,h3*2,h3*2);
  // graphics.blendMode = PIXI.BLEND_MODES.MULTIPLY;
  graphics.alpha = 0.8;
  graphics.position.set( Math.random() * w, h * 0.25);
  graphics.sw = sw;

  shadow1 = new PIXI.Graphics();
  // shadow1.scale = new PIXI.Point();
  // shadow1.scale.copy( graphics.scale );
  shadow1.lineStyle(0);
  shadow1.beginFill(0x000000);
  shadow1.drawRect(-sw,-sw,sw*2,sw*2);
  //shadow1.blendMode = PIXI.BLEND_MODES.MULTIPLY;
  shadow1.alpha = 0.5;
  shadow1OffsetMax = new PIXI.Point( shadowOffsetBasis.x, shadowOffsetBasis.y );
  //shadow1.position.set( graphics.position.x + shadow1OffsetMax.x, graphics.position.y + shadow1OffsetMax.y );
  shadowContainer.addChild(shadow1);

  shapeContainer.addChild(graphics);

  if (true) {
    sw = sw*2;
    var cb = new PIXI.CanvasBuffer(sw*2,sw*2);
    var c = cb.canvas;
    ctx = c.getContext("2d");
    ctx.rect(0,0,sw*2,sw*2);
    ctx.clip();

    // graphics2.beginFill(0x3030C0);
    ctx.fillStyle = '#1E90FF';
    ctx.fillRect(0,0,sw*2,sw*2);
    texture = PIXI.Texture.fromCanvas(c);
    graphics2 = new PIXI.Sprite(texture);
    graphics2.sw = sw;

    graphics2.anchor.set( 0.5, 0.5 );
    // var g2mask = new PIXI.Graphics();
    // g2mask.beginFill(0xFFFFFF);
    // g2mask.drawRect(-200,0,500,1000);
    // graphics2.mask = g2mask;
    //graphics2.lineStyle(4, 0xFFFFFF, 1);
    // graphics2.lineStyle(0);
    // graphics2.moveTo(-h3,-h3);
    // graphics2.lineTo(h3, -h3);
    // graphics2.lineTo(0, h3);
    // graphics2.lineTo(-h3, -h3);
    // graphics2.endFill();
    //graphics2.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    graphics2.alpha = 0.8;
    graphics2.position.set(Math.random() * w, h * 0.5);

    // window.setTimeout(function(){
    //   console.log('******1');
    //   ctx.fillStyle = '#000000';
    //   ctx.fillRect(0,0,sw/2,sw/2);
    //   texture.update();
    //   window.setTimeout(function(){
    //     console.log('******2');
    //     ctx.fillStyle = '#1E90FF';
    //     ctx.fillRect(0,0,sw*2,sw*2);
    //     texture.update();
    //   }, 5000);
    // }, 5000);

    shadow2 = new PIXI.Graphics();
    // shadow1.scale = new PIXI.Point();
    // shadow1.scale.copy( graphics.scale );
    shadow2.lineStyle(0);
    shadow2.beginFill(0x202020);
    shadow2.drawRect(-sw,-sw,sw*2,sw*2);
    //shadow1.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    //shadow2.blendMode = PIXI.BLEND_MODES.ADD;
    shadow2.alpha = 0.5;
    //shadow2.position.set( sw, sw*1.5);
    shadow2OffsetMax = new PIXI.Point( shadowOffsetBasis.x, shadowOffsetBasis.y );
    //shadow2.position.set( shadow2OffsetMax.x, shadow2OffsetMax.y );
    // shadow2.position.set( graphics2.position.x + shadow2OffsetMax.x, graphics2.position.y + shadow2OffsetMax.y );

    shadowContainer.addChild(shadow2);

    shapeContainer.addChild(graphics2);
  }


  stage.addChild(shadowContainer);
  stage.addChild(shapeContainer);

  var changeThings = function() {
    window.setTimeout(function(){
      moveSmall = !moveSmall;

      shadowOffsetBasis.set( Math.random()*8-4, Math.random()*8-4);
      // shadowOffsetBasis = new PIXI.Point(2, 1.5);

      graphics2.position.set(Math.random() * w, h * (0.5 + Math.random()*0.5));


      graphics.position.set( Math.random() * w, h * 0.25);
      changeThings();
    }, 5000);
  }
  changeThings();

  // var bottom = new PIXI.Graphics();
  // bottom.beginFill(0xFFFFFF);
  // bottom.lineStyle(0);
  // var rh = renderer.height;
  // var rh0 = rh*0.7;
  // bottom.drawRect(0,rh0,w,rh);
  // bottom.endFill();
  // bottom.beginFill(0x000000);
  // bottom.moveTo(0,rh0);
  // bottom.lineTo(w/2,rh);
  // bottom.lineTo(w/2,rh0);
  // bottom.lineTo(0,rh0);
  // bottom.endFill();
  // bottom.beginFill(0x000000);
  // bottom.moveTo(w,rh0);
  // bottom.lineTo(w/2,rh);
  // bottom.lineTo(w/2,rh0);
  // bottom.lineTo(w,rh0);
  // bottom.endFill();
  // bottom.beginFill(0xFFFFFF);
  // bottom.drawRect(100,50,50,50);
  // bottom.endFill();

  // bottom.position.set(0,0);
  // stage.addChild(bottom);

}

function updateAnim2() {

  if ( moveSmall ) {
    s1.setPosX( renderer.width/2 + (Math.sin(count))*(renderer.width/3) );
  } else {
    s2.setPosX( renderer.width/2 + (Math.sin(count+2))*(renderer.width/3) );
  }

  //s1.setZIndex( 100 * (Math.sin(count)+1) );
  //s2.setZIndex( 100 );

  shapeContainer.children.sort(function(obj1, obj2) { return obj1.zHeight - obj2.zHeight; });

  count += 0.01;

  shapesArr.forEach(function(shape){
    shape.update( shadowOffsetBasis, shapesArr );
  });

}

function updateAnim1() {
  if ( moveSmall ) {
    graphics.position.x = renderer.width/2 + (Math.sin(count))*(renderer.width/3);

  } else {
    graphics2.position.x = renderer.width/2 + (Math.sin(count+2))*(renderer.width/3);

  }

  graphics.zHeight = 100 * (Math.sin(count)+1);
  graphics2.zHeight = 100;// * (Math.sin(count+2)+1);

  shapeContainer.children.sort(function(obj1, obj2) { return obj1.zHeight - obj2.zHeight; });

  shadow1OffsetMax.set( graphics.zHeight * shadowOffsetBasis.x, graphics.zHeight * shadowOffsetBasis.y );
  shadow2OffsetMax.set( graphics2.zHeight * shadowOffsetBasis.x, graphics2.zHeight * shadowOffsetBasis.y );

  // shadow1.position.x = shadow1OffsetMax.x * Math.sin(count);
  // shadow2.position.x = shadow2OffsetMax.x * Math.sin(count+2);
  shadow1.position.set( graphics.position.x + shadow1OffsetMax.x, graphics.position.y + shadow1OffsetMax.y );
  shadow2.position.set( graphics2.position.x + shadow2OffsetMax.x, graphics2.position.y + shadow2OffsetMax.y );

  ctx.fillStyle = '#1E90FF';
  ctx.fillRect(0,0,graphics2.sw*2,graphics2.sw*2);

  if ( graphics.zHeight - graphics2.zHeight > 0 ) {
    var dh = graphics.zHeight - graphics2.zHeight;
    var sx = graphics.position.x + dh * shadowOffsetBasis.x;
    var sy = graphics.position.y + dh * shadowOffsetBasis.y;
    var dx = sx - graphics2.position.x;
    var dy = sy - graphics2.position.y;
    ctx.fillStyle = '#1E90FF';
    ctx.fillRect(0,0,graphics2.sw*2,graphics2.sw*2);
    ctx.fillStyle = '#000000';
    ctx.fillRect(dx+graphics.sw,dy+graphics.sw,graphics.sw*2,graphics.sw*2);
  }
  texture.update();

  //shadow1.position.copy( shadow1OffsetMax );
  //shadow2.position.copy( shadow2OffsetMax );

  count += 0.01;


}

var updateState = updateAnim2;

setup();
animate();

function Shape( x, y, w, h, zIndex, color, shapeContainer, shadowContainer ) {

  var _self = this;

  var _w = w || renderer.width * 0.075 + renderer.width * 0.3 * Math.random(); //width of shape default
  var _h = h || renderer.height * 0.075 + renderer.width * 0.3 * Math.random(); //height of shape default
  var _x = x || renderer.width * 0.8 * Math.random() + renderer.width * 0.1;
  var _y = y || renderer.height * 0.8 * Math.random() + renderer.height * 0.1;
  var _zIndex = zIndex || 200 * Math.random();
  var _color = color || '#1E90FF';

  var _canvasBuffer = new PIXI.CanvasBuffer(_w,_h);
  var _canvas = _canvasBuffer.canvas;
  var _ctx = _canvas.getContext("2d");
  _ctx.rect(0,0,_w,_h);
  _ctx.clip();
  _ctx.fillStyle = _color;
  _ctx.fillRect(0,0,_w,_h);

  var _texture = PIXI.Texture.fromCanvas(_canvas);
  var _sprite = new PIXI.Sprite(_texture);
  _sprite.anchor.set( 0.5, 0.5 );
  _sprite.alpha = 0.8;
  _sprite.position.set(_x,_y);
  _sprite.zHeight = _zIndex;

  var _shadow = new PIXI.Graphics();
  _shadow.lineStyle(0);
  _shadow.beginFill(0x000000);
  // _shadow.drawRect(-_w/2,-_h/2,_w,_h);
  _shadow.drawRect(0,0,_w,_h);

  _shadow.alpha = 0.5;
  //_shadow.anchor.set( 0.5, 0.5 );

  var _addToContainers = function( shapeContainer, shadowContainer ) {
    shapeContainer.addChild( _sprite );
    shadowContainer.addChild( _shadow );
  };
  _addToContainers( shapeContainer, shadowContainer );

  var _getSprite = function() {
    return _sprite;
  };
  var _getZIndex = function() {
    return _zIndex;
  };
  var _setZIndex = function( z ) {
    _zIndex = z;
    _sprite.zHeight = z;
  };
  var _getPosX = function() {
    return _sprite.position.x;
  };
  var _setPosX = function( xIn ) {
    _sprite.position.x = xIn;
  };
  var _getPosY = function() {
    return _sprite.position.y;
  };
  var _setPosY = function( yIn ) {
    _sprite.position.y = yIn;
  };

  var _getWidth = function() {
    return _w;
  };
  var _getHeight = function() {
    return _h;
  };

  var _updateShadowsOnSprite = function( shadowOffsetBasis, shapesArr ) {
    // loop through all shapes given and draw their shadows if/as appropriate
    // onto this shape's sprite
    shapesArr.forEach( function( shape ) {
      if ( shape === _self ) {
        return; // skip self
      }
      var zIndexDiff = shape.getZIndex() - _zIndex;
      if ( zIndexDiff > 0 ) {
        // _ctx.fillStyle = "#ffffff";
        // _ctx.fillRect(0,0,_w,_h);
        // shape is above _self so calc shape's shadow absolute position
        // and relative position so that we can draw the shape shadow onto
        // _self sprite.
        var sx = shape.getPosX() + zIndexDiff * shadowOffsetBasis.x;
        var sy = shape.getPosY() + zIndexDiff * shadowOffsetBasis.y;
        var dx = sx - _sprite.position.x;
        var dy = sy - _sprite.position.y;
        _ctx.fillStyle = '#202020'; // grey with 50% alpha
        _ctx.fillRect(
          dx - shape.getWidth()/2 + _self.getWidth()/2,
          dy - shape.getHeight()/2 + _self.getHeight()/2,
          shape.getWidth(), shape.getHeight() );

        // _ctx.fillRect(
        //   dx + shape.getWidth()/2 + _self.getWidth()/2,
        //   dy + shape.getHeight()/2 + _self.getWidth()/2,
        //   shape.getWidth(), shape.getHeight() );

      }
    });
  };

  var _updateShadowFromSprite = function( shadowOffsetBasis ) {
    _shadow.position.set(
      _sprite.position.x - _w/2 + shadowOffsetBasis.x * _zIndex,
      _sprite.position.y - _h/2 + shadowOffsetBasis.y * _zIndex
     );
  };

  var _update = function( shadowOffsetBasis, shapesArr ) {
    _ctx.fillStyle = _color;
    _ctx.fillRect(0,0,_w,_h);
    _updateShadowsOnSprite( shadowOffsetBasis, shapesArr );
    _updateShadowFromSprite( shadowOffsetBasis );
    _texture.update();
  };

  // public functions
  _self.getZIndex = _getZIndex;
  _self.setZIndex = _setZIndex;
  _self.getPosX = _getPosX;
  _self.setPosX = _setPosX;
  _self.getPosY = _getPosY;
  _self.setPosY = _setPosY;
  _self.getSprite = _getSprite;
  _self.getWidth = _getWidth;
  _self.getHeight = _getHeight;
  _self.addToContainers = _addToContainers;
  _self.update = _update;

}

//---
//---

//// var socket = io.connect('http://localhost:8081');
// var socket = io.connect('https://limitless-spire-83390.herokuapp.com/');
// socket.on('tweet', function(data) {
//   if ( data.place !== null ) {
//     if ( data.place.full_name ) {
//       console.log('data.place.full_name = '+ data.place.full_name);
//     }
//   }
// });

// socket = io.connect('https://whispering-atoll-45779.herokuapp.com');
//
// p.mouseDragged = function() {
//   // Make a little object with mouseX and mouseY
//   var data = {
//     x: p.mouseX,
//     y: p.mouseY
//   };
//   // Send that object to the socket
//   socket.emit('mouse',data);
// };
//
// // We make a named event called 'mouse' and write an
// // anonymous callback function
// socket.on('mouse',
//   function(data) {
//     // Draw a blue circle
//     p.fill(0,0,255);
//     p.noStroke();
//     p.ellipse(data.x,data.y,80,80);
//   }
// );
