var mic, recorder, soundFile;
var state = 0;
var delay;

function setup(){
  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn()
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();


  fill(255);
  text('keyPress to record', 20, 20);

  delayCheck = millis() + delay0;

  rectMode( CENTER );
}

var delay0 = 1000;
var speedFactor = 1;
var delayCheck;
var micHistory = [];
var maxLevelInDelayInterval = 0;
var levelIndicatorWidth = 100;

// function mouseMoved() {
//   console.log('mouseX = '+mouseX);
// }
function draw(){
  background(0);
  micLevel = mic.getLevel();
  if ( micLevel > maxLevelInDelayInterval ) {
    maxLevelInDelayInterval = micLevel;
  }
  speedFactor = mouseX/width;
  if ( delayCheck < millis() ) {
    delayCheck = millis() + delay0 * speedFactor;
    micHistory.unshift( maxLevelInDelayInterval );
    maxLevelInDelayInterval = 0;
  }
  if ( micHistory.length > 10 ) {
    micHistory.pop();
  }
  var i = 1;
  micHistory.forEach(function(level){
    // draw historical level
    fill( 255 - 30*i );
    drawLevel( level, i );
    // ellipse(width/2-i*levelIndicatorWidth, constrain(height-level*height*5, 0, height), levelIndicatorWidth, 10);
    // ellipse(width/2+i*levelIndicatorWidth, constrain(height-level*height*5, 0, height), levelIndicatorWidth, 10);
    i += 1;
  });
  fill(255,0,0);
  //ellipse(width/2, constrain(height-maxLevelInDelayInterval*height*5, 0, height), 100, 10);
  if ( maxLevelInDelayInterval ) {
    drawLevel( maxLevelInDelayInterval, 0, false );
    //rect(width/2, constrain(height-maxLevelInDelayInterval*height*5, 0, height), 100, 10);
  }
  fill(255);
  drawLevel( micLevel, 0, false );
  //ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 100, 10);
  //rect(width/2, constrain(height-micLevel*height*5, 0, height), 100, 10);

  if ( state === 0 ) {
    text('keyPress to record', 20, 20);
  } else if ( state === 1 ) {
    text('recording!', 20, 20);
  } else if ( state === 2 ) {
    text('stopped recording', 20, 20);
  }
}

function drawLevel(level, i, fillUnderneath) {

  if ( fillUnderneath === undefined || fillUnderneath === true ) {
    rect(
      width/2-i*levelIndicatorWidth, constrain(height-level*height*5/2, 0, height),
      levelIndicatorWidth, level*height*5
    );
  }
  rect(
    width/2-i*levelIndicatorWidth, constrain(height-level*height*5, 0, height),
    levelIndicatorWidth, 10
  );

  if ( i === 0 ) {
    return;
  }
  rect(
    width/2+i*levelIndicatorWidth, constrain(height-level*height*5, 0, height),
    levelIndicatorWidth, 10
  );
}

function keyPressed() {
  // make sure user enabled the mic
  if ( key === ' ' ) {

    if (state === 0 && mic.enabled) {

      // record to our p5.SoundFile
      recorder.record(soundFile);

      background(255,0,0);
      fill(255);
      text('Recording!', 20, 20);
      state++;
    }
    else if (state === 1) {
      background(0,255,0);

      // stop recorder and
      // send result to soundFile
      recorder.stop();

      delay = new p5.Delay();
      delay.process( soundFile, 1, 0.9, 1000 );

      text('Stopped', 20, 20);
      state++;
    }

    else if (state === 2) {
      soundFile.play(); // play the result!
      //save(soundFile, 'mySound.wav');
      state++;
      window.setTimeout(function(){ state = 0; },2000);
    }

  } else if ( key === 'Q' ) {
    soundFile.play();
  }

}


function listDevices() {
  navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    devices.forEach(function(device) {
      console.log(device.kind + ": " + device.label +
                  " id = " + device.deviceId);
    });
  })
  .catch(function(err) {
    console.log(err.name + ": " + err.message);
  });
}
