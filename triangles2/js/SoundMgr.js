import p5 from 'p5';
import 'p5/lib/addons/p5.sound.js';

var SoundMgr = (function() {

  var _blipSounds = [];
  var _muteOn;

  var _init = function() {
    _muteOn = false;
    _blipSounds.push( new p5.SoundFile('Blip_Select7.wav') );
    _blipSounds.push( new p5.SoundFile('Blip_Select10.wav') );
    _blipSounds.push( new p5.SoundFile('Blip_Select18.wav') );
  };

  var _playBlip1 = function(){
    if ( _muteOn ) {
      return;
    }
    var blip1 = _blipSounds[Math.floor(Math.random()*_blipSounds.length)];
    blip1.setVolume(0.1);
    blip1.play();
  };

  var _mute = function( muteOn ) {
    _muteOn = muteOn;
  };

  return {
    init: _init,
    playBlip1: _playBlip1,
    mute: _mute
  };
}());

export default SoundMgr;