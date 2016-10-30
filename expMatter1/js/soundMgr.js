import p5 from 'p5';

var p;
var controlAttr;

var soundMode;
var MODE_NOISE = 1;
var MODE_BLEEP = 2;

var isMuted;

var noise, env, delay;
var pulse, delay2, env2;

function init(pIn, controlAttrIn) {
  p = pIn;
  controlAttr = controlAttrIn;
  soundMode = controlAttrIn.soundMode || MODE_NOISE;
  isMuted = controlAttrIn.isMuted;

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
  delay.process(noise, 0.99, .9, 2300);
  delay2.process(pulse, 0.99, .9, 1000);

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
}

function playSound() {
  if ( isMuted ) {
    return;
  }
  if ( soundMode === MODE_NOISE ) {
    env.play(noise);
  } else {
    pulse.width(p.random(1));
    env2.play(pulse);
  }
}

export {init, setSoundMode, playSound, setMute, MODE_NOISE, MODE_BLEEP};
