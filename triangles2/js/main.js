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
    p.createCanvas(window.innerWidth, window.innerHeight);
    //p.createCanvas(p.windowWidth, p.windowHeight);
    //p.noLoop();
    p.frameRate(45);

    ColorMgr.init(p);

    controlAttr = new function () {
      var _self = this;
      this.showStats = false;
      this.speed = 1;
      this.scale = 1;
      //this.blockSize = 112;
      if ( p.windowWidth > p.windowHeight ) {
        this.maxCols = 5;
        this.maxRows = 7;
        this.maxWidthFraction = 1;
        this.maxHeightFraction = 0.7;
      } else {
        this.maxCols = 3;
        this.maxRows = 5;
        this.maxWidthFraction = 0.8;
        this.maxHeightFraction = 0.8;
      }
      this.numBlocksOnReset = p.floor(this.maxCols*this.maxRows*0.5);
      this.colorMode = 'SOME_RED';
      this.soundVolume = 0.1;
      this.muteSounds = false;
      this.useAlternateSound = 0;
      this.resetScene = function() {
        var resetPosMgrAttr = {
          //cellWidth:controlAttr.blockSize,
          maxCols: controlAttr.maxCols,
          maxRows: controlAttr.maxRows,
          maxWidthFraction: controlAttr.maxWidthFraction,
          maxHeightFraction: controlAttr.maxHeightFraction
        };
        pm.reset(resetPosMgrAttr);
        pm.setScale( controlAttr.scale );
        //controlAttr.numBlocksOnReset = p.max( 1, p.floor(pm.getNumCells() * p.random(0.5,0.8)) );
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
        //controlAttr.blockSize = p.floor(p.random(87,500));
        var r = p.random(10);
        if ( r < 2 ) {
          controlAttr.maxWidthFraction = 1;
          controlAttr.maxHeightFraction = p.random(0.3,1.2);
        } else if ( r < 4 ) {
          controlAttr.maxWidthFraction = p.random(0.3,1.2);
          controlAttr.maxHeightFraction = 1;
        } else if ( r < 8 ) {
          controlAttr.maxWidthFraction = 1;
          controlAttr.maxHeightFraction = 1;
        } else {
          controlAttr.maxWidthFraction = p.random(0.3,1.2);
          controlAttr.maxHeightFraction = p.random(0.3,1.2);
        }

        r = p.random(10);
        if ( r < 3 ) {
          controlAttr.maxCols = p.max(1, p.floor(p.random(1,6) ));
          controlAttr.maxRows = p.max(1, p.floor(p.random(1,6) ));
        } else if ( r < 8 ) {
          controlAttr.maxCols = p.max(1, p.floor(p.random(4,10) ));
          controlAttr.maxRows = p.max(1, p.floor(p.random(4,10) ));
        } else {
          // controlAttr.maxCols = p.max(1, p.floor(p.random(13,18) * controlAttr.maxHeightFraction));
          // controlAttr.maxRows = p.max(1, p.floor(p.random(13,18) * controlAttr.maxWidthFraction));
          controlAttr.maxCols = p.max(1, p.floor(p.random(2,10) ));
          controlAttr.maxRows = p.max(1, p.floor(p.random(2,10) ));
        }

        var resetPosMgrAttr = {
          maxCols: controlAttr.maxCols,
          maxRows: controlAttr.maxRows,
          //cellWidth:controlAttr.blockSize,
          maxWidthFraction: controlAttr.maxWidthFraction,
          maxHeightFraction: controlAttr.maxHeightFraction
        };
        pm.reset( resetPosMgrAttr );
        controlAttr.scale = 1;
        pm.setScale( controlAttr.scale );
        controlAttr.numBlocksOnReset = p.max( 1, p.floor(pm.getNumCells() * p.random(0.4,0.8)) );//1 + p.floor(p.random(0.4*pm.getNumCells(),pm.getNumCells()));
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
          //blockSize: _self.blockSize,
          maxCols: _self.maxCols,
          maxRows: _self.maxRows,
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
    gui.add( controlAttr, 'showStats').onChange(function(v){
      stats.domElement.style.display = (v) ? 'block' : 'none';
    });
    gui.add( controlAttr, 'scale', 0.1, 4).onChange( function(v){
      pm.setScale(v);
    });
    gui.add( controlAttr, 'numBlocksOnReset', 1, 200 ).step(1);
    //gui.add( controlAttr, 'blockSize', 10,1000 );
    gui.add( controlAttr, 'maxCols', 1,25 ).step(1);
    gui.add( controlAttr, 'maxRows', 1,25 ).step(1);
    gui.add( controlAttr, 'maxWidthFraction', 0.01, 2 );
    gui.add( controlAttr, 'maxHeightFraction', 0.01, 2 );
    gui.add( controlAttr, 'colorMode', Object.keys(ColorMgr.colorMode) ).onChange(function(v){ ColorMgr.setColorMode(ColorMgr.colorMode[v])});
    gui.add( controlAttr, 'soundVolume', 0, 1 ).onChange(function(v){ SoundMgr.setVolume(v); });
    gui.add( controlAttr, 'useAlternateSound', 0, 1 ).step(1).onChange(function(v){ SoundMgr.setAlternateSoundMode(v)});
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
    // {"scale":1,"numBlocksOnReset":5,"blockSize":488,"maxWidthFraction":0.7865965577234517,"maxHeightFraction":0.9251221720666409,"colorMode":"SOME_RED","soundVolume":0.1,"muteSounds":false}
    // {"scale":4,"numBlocksOnReset":6,"blockSize":392,"maxWidthFraction":0.8675304830021173,"maxHeightFraction":0.911913024631376,"colorMode":"SOME_RED","soundVolume":0.03901779211320364,"muteSounds":false}
    // {"scale":0.9876547705753829,"numBlocksOnReset":5.313633683626403,"blockSize":256.78753511601303,"maxWidthFraction":0.41979519994450826,"maxHeightFraction":1.1315447577428648,"colorMode":"BLACK_AND_WHITE","soundVolume":0.1,"muteSounds":true}

    stats = new Stats();
    stats.domElement.style.display = 'none';
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
      maxCols: controlAttr.maxCols,
      maxRows: controlAttr.maxRows,
      //cellWidth:controlAttr.blockSize,
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
