import 'babel-polyfill';
import dat from 'dat-gui';
import TWEEN from 'tween.js';
import Stats from 'stats.js';
import p5 from 'p5';

import ColorMgr from './ColorMgr';
import PositionMgr from './PositionMgr';
import ThingMgr from './ThingMgr';

var sketch = function( p ) {

  var controlAttr;
  var stats;
  var cm, pm, tm;

  p.preload = function() {

  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    //p.noLoop();

    controlAttr = new function () {
      this.speed = 1;
      this.numBlocksOnReset = 10;
      this.blockSize = 10;
      this.resetScene = function() {
        pm.reset({cellWidth:controlAttr.blockSize});
        tm.resetThings( controlAttr.numBlocksOnReset );
      };
      this.moveSomeThings = function() {
        tm.moveSomeThings();
      };
      this.saveColors = function() {
        var colorArr = tm.getColors();
        var json = JSON.stringify(colorArr);
        console.log( json );
      };
    };
    var gui = new dat.GUI();
    gui.add( controlAttr, 'speed', 0.001, 1).onChange(function(v){ tm.speed = v; });
    gui.add( controlAttr, 'numBlocksOnReset', 1, 200 );
    gui.add( controlAttr, 'blockSize', 10,200 );
    gui.add( controlAttr, 'resetScene' );
    gui.add( controlAttr, 'moveSomeThings' );
    gui.add( controlAttr, 'saveColors' );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    cm = new ColorMgr(p);
    pm = new PositionMgr(p, {cellWidth:controlAttr.blockSize});
    tm = new ThingMgr(p,cm,pm);
    tm.resetThings( controlAttr.numBlocksOnReset );

  };

  p.draw = function() {
    p.background(255);
    TWEEN.update();
    tm.update();
    tm.draw();
    // p.background(0);
    // p.fill(255);
    // var x=100, y=100;
    // var i;
    // for ( i = 0; i < controlAttr.numBlocksOnReset; i++ ) {
    //   p.rect(x,y,20,20);
    //   x += p.random(0,20);
    //   y += p.random(0,20);
    // }
    stats.update();
  };

};
var myp5 = new p5(sketch);
