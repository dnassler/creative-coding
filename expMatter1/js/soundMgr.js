import p5 from 'p5';

var p;
var controlAttr;

var soundMode;
var MODE_NOISE = 1;
var MODE_BLEEP = 2;

var isMuted;

var noise, env, delay;
var pulse, delay2, env2;

var crickets;
var cricketVolume;

function preload(pIn) {
  p = pIn;
  crickets = p.loadSound('Sep_27_2014-003_crickets1b.mp3');
}

function init(pIn, controlAttrIn) {
  p = pIn;
  controlAttr = controlAttrIn;
  soundMode = controlAttrIn.soundMode || MODE_NOISE;
  isMuted = controlAttrIn.isMuted;
  cricketVolume = 1.0;
  setMute(isMuted);

  noise = new p5.Noise('brown');
  noise.amp(0);
  noise.start();

  pulse = new p5.Pulse();
  pulse.amp(0.5);
  pulse.freq(55);
  pulse.width(0.5);
  pulse.amp(0);
  pulse.start();

  delay = new p5.Delay();
  delay2 = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime, feedback, filter frequency
  // play with these numbers!!
  // delay.process(noise, 0.99, .9, 2300);
  // delay2.process(pulse, 0.99, .9, 1000);

  // play the noise with an envelope,
  // a series of fades ( time / value pairs )
  env = new p5.Env(.01, 0.2, .2, .1);
  env2 = new p5.Env(.01, 0.2, .2, .1);

}

function setSoundMode( newMode ) {
  soundMode = newMode;
}

function setMute( flag ) {
  isMuted = flag;
  if ( !isMuted ) {
    cricketVolume = 1.0;
    crickets.setVolume(cricketVolume);
    crickets.loop();
  } else {
    crickets.stop();
  }
}

function playSound() {
  if ( isMuted ) {
    return;
  }
  if ( !controlAttr.hitsMakeSound ) {
    return;
  }
  if ( soundMode === MODE_NOISE ) {
    env.play(noise);
  } else {
    pulse.width(p.random(1));
    env2.play(pulse);
  }
}

function adjustBackgroundVolume() {
  cricketVolume = p.random( 0.1, 1.0 );
  if ( cricketVolume > 0.85 ) {
    cricketVolume = 1.0;
  }
  crickets.setVolume( cricketVolume, 1.0 );
  console.log('cricketVolume = '+cricketVolume);
}

export {preload, init, setSoundMode, playSound, adjustBackgroundVolume, setMute, MODE_NOISE, MODE_BLEEP};
