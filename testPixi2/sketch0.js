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

function setup() {

  graphics = new PIXI.Graphics();
  graphics.scale = new PIXI.Point(1,1);
  graphics.beginFill(0x2a52be);
  //graphics.lineStyle(4, 0xFFFFFF, 1);
  graphics.lineStyle(0);
  var h = renderer.height;//header.offsetHeight;
  var w = renderer.width;
  var h3 = h/10;
  var sw = h3;

  shadowOffsetBasis = new PIXI.Point(2, 1);
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

  if (false) {
    sw = sw*2;
    graphics2 = new PIXI.Graphics();
    graphics2.sw = sw;
    // graphics2.beginFill(0x3030C0);
    graphics2.beginFill(0x1E90FF);
    graphics2.drawRect(-sw,-sw,sw*2,sw*2);
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

function updateAnim1() {
  //graphics.position.x = renderer.width/2 + (Math.sin(count))*(renderer.width/3);
  graphics2.position.x = renderer.width/2 + (Math.sin(count+2))*(renderer.width/3);

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

var updateState = updateAnim1;

setup();
animate();

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
