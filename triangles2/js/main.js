import 'babel-polyfill';
import dat from 'dat-gui';
import TWEEN from 'tween.js';
import Stats from 'stats.js';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.js';

import * as ColorMgr from './ColorMgr';
import PositionMgr from './PositionMgr';
import ThingMgr from './ThingMgr';
import SoundMgr from './SoundMgr';

var sketch = function( p ) {

  var controlAttr;
  var stats;
  var cm, pm, tm;
  var sm;

  p.preload = function() {
    SoundMgr.init();
    // blip1 = new p5.SoundFile('Blip_Select7.wav',function(){
    //   blip1.setVolume(1);
    // });
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    //p.noLoop();

    controlAttr = new function () {
      this.speed = 1;
      this.numBlocksOnReset = 42;
      this.blockSize = 112;
      this.maxWidthFraction = 1;
      this.maxHeightFraction = 0.7;
      this.muteSounds = false;
      this.resetScene = function() {
        var resetPosMgrAttr = {
          cellWidth:controlAttr.blockSize,
          maxWidthFraction: controlAttr.maxWidthFraction,
          maxHeightFraction: controlAttr.maxHeightFraction
        };
        pm.reset(resetPosMgrAttr);
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
    gui.add( controlAttr, 'maxWidthFraction', 0.01, 1 );
    gui.add( controlAttr, 'maxHeightFraction', 0.01, 1 );
    gui.add( controlAttr, 'muteSounds' ).onChange(function(v){ SoundMgr.mute(v); });
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

    ColorMgr.init(p);
    cm = ColorMgr;
    var initialPosMgrAttr = {
      cellWidth:controlAttr.blockSize,
      maxWidthFraction: controlAttr.maxWidthFraction,
      maxHeightFraction: controlAttr.maxHeightFraction
    };
    pm = new PositionMgr(p, initialPosMgrAttr);
    ThingMgr.init(p,pm);
    tm = ThingMgr;
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

export { myp5 };
