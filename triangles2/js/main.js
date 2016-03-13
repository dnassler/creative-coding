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

    ColorMgr.init(p);

    controlAttr = new function () {
      var _self = this;
      this.speed = 1;
      this.scale = 1;
      this.numBlocksOnReset = 42;
      this.blockSize = 112;
      this.maxWidthFraction = 1;
      this.maxHeightFraction = 0.7;
      this.colorMode = 'SOME_RED';
      this.soundVolume = 0.1;
      this.muteSounds = false;
      this.resetScene = function() {
        var resetPosMgrAttr = {
          cellWidth:controlAttr.blockSize,
          maxWidthFraction: controlAttr.maxWidthFraction,
          maxHeightFraction: controlAttr.maxHeightFraction
        };
        pm.reset(resetPosMgrAttr);
        pm.setScale( controlAttr.scale );
        tm.resetThings( controlAttr.numBlocksOnReset );
      };
      this.moveSomeThings = function() {
        tm.moveSomeThings();
      };
      this.randomConfiguration = function() {
        if ( p.random(10) < 5 ) {
          controlAttr.colorMode = 'BLACK_AND_WHITE';
        } else {
          controlAttr.colorMode = 'SOME_RED';
        }
        ColorMgr.setColorMode(ColorMgr.colorMode[controlAttr.colorMode]);
        controlAttr.blockSize = p.floor(p.random(87,500));
        var r = p.random(10);
        if ( p < 3 ) {
          controlAttr.maxWidthFraction = 1;
          controlAttr.maxHeightFraction = p.random(0.3,1.2);
        } else if ( p < 6 ) {
          controlAttr.maxWidthFraction = p.random(0.3,1.2);
          controlAttr.maxHeightFraction = 1;
        } else {
          controlAttr.maxWidthFraction = p.random(0.3,1.2);
          controlAttr.maxHeightFraction = p.random(0.3,1.2);
        }
        var resetPosMgrAttr = {
          cellWidth:controlAttr.blockSize,
          maxWidthFraction: controlAttr.maxWidthFraction,
          maxHeightFraction: controlAttr.maxHeightFraction
        };
        pm.reset( resetPosMgrAttr );
        controlAttr.scale = 1;
        pm.setScale( controlAttr.scale );
        controlAttr.numBlocksOnReset = 1 + p.floor(p.random(0.4*pm.getNumCells(),pm.getNumCells()));
        tm.resetThings( controlAttr.numBlocksOnReset );
        // update the dat.gui display to synch it with the modified controlAttrInfo
        for (var i in gui.__controllers) {
          gui.__controllers[i].updateDisplay();
        }
      };
      this.saveColors = function() {
        var colorArr = ColorMgr.getAllColorsSinceLastReset();
        var json = JSON.stringify(colorArr);
        console.log( json );
      };
      this.saveConfiguration = function() {
        var controlAttrInfo = {
          scale: _self.scale,
          numBlocksOnReset: _self.numBlocksOnReset,
          blockSize: _self.blockSize,
          maxWidthFraction: _self.maxWidthFraction,
          maxHeightFraction: _self.maxHeightFraction,
          colorMode: _self.colorMode,
          soundVolume: _self.soundVolume,
          muteSounds: _self.muteSounds
        };
        var json = JSON.stringify(controlAttrInfo);
        console.log( json );
      };
    };
    var gui = new dat.GUI();
    //gui.add( controlAttr, 'speed', 0.001, 1).onChange(function(v){ tm.speed = v; });
    gui.add( controlAttr, 'scale', 0.1, 4).onChange( function(v){
      pm.setScale(v);
    });
    gui.add( controlAttr, 'numBlocksOnReset', 1, 200 );
    gui.add( controlAttr, 'blockSize', 10,1000 );
    gui.add( controlAttr, 'maxWidthFraction', 0.01, 2 );
    gui.add( controlAttr, 'maxHeightFraction', 0.01, 2 );
    gui.add( controlAttr, 'colorMode', Object.keys(ColorMgr.colorMode) ).onChange(function(v){ ColorMgr.setColorMode(ColorMgr.colorMode[v])});
    gui.add( controlAttr, 'soundVolume', 0, 0.1 ).onChange(function(v){ SoundMgr.setVolume(v); });
    gui.add( controlAttr, 'muteSounds' ).onChange(function(v){ SoundMgr.mute(v); });
    gui.add( controlAttr, 'resetScene' );
    gui.add( controlAttr, 'moveSomeThings' );
    gui.add( controlAttr, 'saveColors' );
    gui.add( controlAttr, 'saveConfiguration' );
    gui.add( controlAttr, 'randomConfiguration' );

    // controlAttr settings saved:
    // {"scale":0.6072312974716473,"numBlocksOnReset":24.724985259945214,"blockSize":246.05764228488204,"maxWidthFraction":1,"maxHeightFraction":1.433499115596713,"colorMode":1,"soundVolume":0.1,"muteSounds":false}
    // {"scale":1.2412704193112065,"numBlocksOnReset":2,"blockSize":444,"maxWidthFraction":0.7541469816505819,"maxHeightFraction":0.7575294284947146,"colorMode":"BLACK_AND_WHITE","soundVolume":0.1,"muteSounds":false}
    // {"scale":1,"numBlocksOnReset":2,"blockSize":391,"maxWidthFraction":0.5925450718014058,"maxHeightFraction":0.9184697768847572,"colorMode":"BLACK_AND_WHITE","soundVolume":0.1,"muteSounds":false}
    
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    cm = ColorMgr;
    controlAttr.colorMode = 'SOME_RED';
    ColorMgr.setColorMode(ColorMgr.colorMode[controlAttr.colorMode]);
    SoundMgr.setVolume( controlAttr.soundVolume );
    var initialPosMgrAttr = {
      cellWidth:controlAttr.blockSize,
      maxWidthFraction: controlAttr.maxWidthFraction,
      maxHeightFraction: controlAttr.maxHeightFraction
    };
    pm = new PositionMgr(p, initialPosMgrAttr);
    pm.setScale( controlAttr.scale );
    ThingMgr.init(p,pm);
    tm = ThingMgr;
    tm.resetThings( controlAttr.numBlocksOnReset );

  };

  p.draw = function() {
    p.background(255);
    TWEEN.update();
    tm.update();
    p.push();
    // p.translate( p.width/2, p.height/2 );
    // p.scale( controlAttr.scale );
    // p.translate( -pm.getGridWidth() / 2, -pm.getGridHeight() / 2 );
    tm.draw();
    p.pop();
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
