import 'babel-polyfill';

import dat from 'dat-gui';
import TWEEN from 'tween.js';
import Stats from 'stats.js';
import p5 from 'p5';

import * as Scene from './scene.js';

var sketch = function( p ) {

  var controlAttr;
  var stats;

  p.preload = function() {

  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    //p.noLoop();

    controlAttr = new function () {
      this.numBox = 4;
      this.resetThingPos = function() {
        Scene.resetThingPos();
      };
      this.resetWorld = function() {
        Scene.resetWorld();
      };
      // this.resetScene = function() {
      //   p.redraw();
      // };
    };
    var gui = new dat.GUI();
    gui.add( controlAttr, 'numBox', 1, 10 );
    gui.add( controlAttr, 'resetThingPos' );
    gui.add( controlAttr, 'resetWorld' );
    // gui.add( controlAttr, 'resetScene' );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    Scene.init(p, controlAttr);

  };

  p.draw = function() {

    Scene.update();
    Scene.draw();
    //p.background(0);
    //p.fill(255);
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