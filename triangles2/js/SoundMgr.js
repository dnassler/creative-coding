import p5 from 'p5';
// import 'p5/lib/addons/p5.sound.js';
// import {p} from './main.js';

var SoundMgr = (function() {

  var p;

  var _blipSounds = [];
  var _altBlipSounds = [];
  var _muteOn;
  var _volume;
  var _soundMode = 0;

  var _init = function(p0) {
    p = p0;
    _muteOn = false;
    _volume = 1;
    _blipSounds.push( new p5.SoundFile('Blip_Select7.wav') );
    _blipSounds.push( new p5.SoundFile('Blip_Select10.wav') );
    _blipSounds.push( new p5.SoundFile('Blip_Select18.wav') );

    _altBlipSounds.push( new p5.SoundFile('blip-2.mp3') );
    _altBlipSounds.push( new p5.SoundFile('blip-3.mp3') );
    _altBlipSounds.push( new p5.SoundFile('blip-4.mp3') );
    _altBlipSounds.push( new p5.SoundFile('blip-5.mp3') );

    // var reverb = new p5.Reverb();
    // _blipSounds.forEach(function(sf){
    //   sf.disconnect();
    //   // connect soundFile to reverb, process w/
    //   // 3 second reverbTime, decayRate of 2%
    //   reverb.process(sf, 3,10);
    // });

  };

  var _playBlip1 = function(){
    if ( _muteOn ) {
      return;
    }
    var blip1;
    if ( _soundMode === 1 ) {
      blip1 = _altBlipSounds[Math.floor(Math.random()*_altBlipSounds.length)];
      blip1.play(0,1,_volume,0,1);
    } else if ( _soundMode === 2 ) {
      blip1 = _altBlipSounds[Math.floor(Math.random()*_altBlipSounds.length)];
      blip1.play(0,1,_volume,2);
    } else {
      blip1 = _blipSounds[Math.floor(Math.random()*_blipSounds.length)];
      blip1.setVolume(_volume);
      blip1.play();
    }

    //main.test1();
    // console.log('myp5.PI = '+p.PI);
    // p.noStroke();
    // p.fill(255,0,0);
    // p.rect(100,100,100,100);
  };

  var _mute = function( muteOn ) {
    _muteOn = muteOn;
  };

  var _setVolume = function( v ) {
    _volume = v;
  };

  var _setAlternateSoundMode = function( v ) {
    _soundMode = v;
  };

  return {
    init: _init,
    playBlip1: _playBlip1,
    mute: _mute,
    setVolume: _setVolume,
    setAlternateSoundMode: _setAlternateSoundMode
  };
}());

export default SoundMgr;
