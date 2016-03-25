import p5 from 'p5';

var p;
var controlAttr;

var soundMode;
var MODE_NOISE = 1;
var MODE_BLEEP = 2;

var isMuted;

var noise, env, delay;


function init(pIn, controlAttrIn) {
  p = pIn;
  controlAttr = controlAttrIn;
  soundMode = controlAttrIn.soundMode || MODE_NOISE;
  isMuted = controlAttrIn.isMuted;

  noise = new p5.Noise('brown');
  noise.amp(0);
  noise.start();

  delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime, feedback, filter frequency
  // play with these numbers!!
  delay.process(noise, 1, .9, 2300);

  // play the noise with an envelope,
  // a series of fades ( time / value pairs )
  env = new p5.Env(.01, 0.2, .2, .1);

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
  env.play(noise);
}

export {init, setSoundMode, playSound, setMute};
