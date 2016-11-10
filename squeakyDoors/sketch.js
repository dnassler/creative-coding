var debug = false;
// var img;
var doorOpen;
var doorClose;

var doorSlideOpen1;
var doorSlideClose1;

var doorSqueak1;
var doorSqueak2;
var doorCloseHard1;

var doorSounds = [];
var doorSoundsByType = {};

var doorMgr;

var DOOR_WIDTH = 100;
var DOOR_HEIGHT = 100;

var introText;
var showIntroText = false;

function preload() {

  doorOpen = loadSound("doorOpen.mp3");
  doorClose = loadSound("doorClose.mp3");

  doorSlideOpen1 = loadSound("doorSlideOpen1.mp3");
  doorSlideClose1 = loadSound("doorSlideClose1.mp3");

  doorSqueak2 = loadSound("doorSqueak2.mp3");
  doorSqueak1 = loadSound("doorSqueak1.mp3");
  doorCloseHard1 = loadSound("doorCloseHard1b.mp3");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  console.log("displayWidth="+displayWidth+", displayHeight="+displayHeight+", windowWidth="+windowWidth+", windowHeight="+windowHeight+", window.innerWidth="+window.innerWidth+", window.innerHeight="+window.innerHeight+", width="+width+", height="+height);

  if ( width > height ) {
    DOOR_WIDTH = min(floor(width/15)+1,100);
    DOOR_HEIGHT = DOOR_WIDTH;
  } else {
    DOOR_HEIGHT = min(floor(height/15)+1,100);
    DOOR_WIDTH = DOOR_HEIGHT;
  }

  // var pg = createGraphics(width,height);
  // pg.clear();
  // pg.fill(0,0,255,255);
  // pg.rect(0,0,width,10);
  // img.mask(pg);
  // image( img, 0, 0 );
  // noLoop();

  //a = Tom().play( Rndf(80, 160), 1/2 );
  //a.fx.add(Delay());

  //rectMode(CENTER);

  var reverb = new p5.Reverb();
  reverb.process( doorOpen );
  reverb.process( doorClose );
  reverb.process( doorSlideOpen1 );
  reverb.process( doorSlideClose1 );
  reverb.process( doorSqueak1 );
  reverb.process( doorSqueak2 );
  reverb.process( doorCloseHard1 );

  doorOpen.setVolume(5);
  //doorOpen.rate(.5);
  doorClose.setVolume(5);
  //doorClose.rate(.5);
  var doorOpenDur = doorOpen.duration(); // / .5;// / .5;// * .8;
  var doorCloseDur = doorClose.duration(); // / .5;// / .5;// * .8;

  doorSlideOpen1.setVolume(5);
  // doorSlideOpen1.rate(.75);
  doorSlideClose1.setVolume(5);
  // doorSlideClose1.rate(.75);
  var doorSlideOpen1Dur = doorSlideOpen1.duration(); // / .75;// / .75;// * .8;
  var doorSlideClose1Dur = doorSlideClose1.duration(); // / .75;// / .75;// * .8;

  //doorSqueak1.rate(.5);
  doorSqueak1.setVolume(2);

  //doorSqueak2.rate(.5);
  doorSqueak2.setVolume(2);

  //doorCloseHard1.rate(.5);
  doorCloseHard1.setVolume(.5);

  //doorSqueak2.play();
  // doorOpen.play();
  // window.setTimeout( function(){
  //   doorSqueak1.play();
  // }, 5000 );
  // window.setTimeout( function(){
  //   doorSqueak2.play();
  // }, 10000 );
  // window.setTimeout( function(){
  //   doorCloseHard1.play();
  // }, 15000 );


  doorSounds.push({
    doorType: 'horizontal',
    open: {file:doorOpen,duration:doorOpenDur},
    close: {file:doorClose,duration:doorCloseDur}
    });
  doorSounds.push({
    doorType: 'horizontal2',
    //open: {file:doorSqueak2,duration:doorSqueak2.duration()/.3},//Math.easeOutQuint

    // open: {file:doorSqueak2,duration:doorSqueak2.duration()/.5},//Math.easeOutQuint
    // close: {file:doorCloseHard1,duration:doorCloseHard1.duration()/.5*.7}

    open: {file:doorSqueak2,duration:doorSqueak2.duration()},//Math.easeOutQuint
    close: {file:doorCloseHard1,duration:doorCloseHard1.duration()}
    });

  doorSounds.push({
    doorType: 'vertical',
    open: {file:doorSlideOpen1,duration:doorSlideOpen1Dur},
    close: {file:doorSlideClose1,duration:doorSlideClose1Dur}
    });

  // create a map to door sounds by doorType (i.e. horizontal/vertical)
  for (var i=0; i<doorSounds.length; i++) {
    var doorSound = doorSounds[i];
    var doorType = doorSound.doorType;
    if ( !doorSoundsByType[doorType] ) {
      doorSoundsByType[doorType] = [];
    }
    doorSoundsByType[doorType].push( doorSound );
  }

  doorMgr = new DoorMgr();

  // doorOpen.play();
  // window.setTimeout( function(){
  //   doorClose.play();
  // }, 5000 );

  // doorSlideOpen1.play();
  // window.setTimeout( function(){
  //   doorSlideClose1.play();
  // }, 5000 );

  if ( window.orientation === undefined ) {
    // only start automatically if not mobile
    showIntroText = true;
    introText = "";
    var startup = new Promise( function(resolve) {
      window.setTimeout(function(){
        resolve();
      }, 1000);
    }).then(function(){
      return new Promise( function(resolve){
        introText = "Squeaky Doors";
        window.setTimeout(function(){
          introText = "";
          resolve();
        }, 3000);
      });
    }).then(function(){
      return new Promise( function(resolve){
        window.setTimeout(function(){
          resolve();
        }, 3000);
      });
    }).then(function(){
      // start show
      SceneMgr.instance().start();
      //scene0();
    });
  }

}

function draw() {
  background(255);

  if ( !debug && !SceneMgr.instance().isStarted() ) {
    stroke(0);
    fill(0);
    textAlign(CENTER);
    textSize(50);
    if ( showIntroText ) {
      if ( introText ) {
        text(introText, window.innerWidth/2,window.innerHeight/2);
      }
    } else {
      text("touch to start on mobile/tablet",window.innerWidth/2,window.innerHeight/2);
    }
    return;
  }

  doorMgr.update();
  doorMgr.draw();

  // var doors = getActiveDoors();
  // for ( var i=0; i<doors.length; i++ ) {
  //
  // }
  // if ( isOpeningDoor ) {
  //   rect()
  // }
}

// TODO (maybe/maybenot):
// add more sounds to project
// for example sounds that might have the sound of pulling a heavy thing
// or sounds of shuffling feet on a smoth hallway
// or sounds of a plate pulling around a table or a glass of water

// function mousePressed() {
//   //toggleDoor();
//   doorMgr.openNewDoor( function( door ) {
//     //console.log("a new door has finished opening: id="+door.doorId+", x="+door.x+", y="+door.y);
//     window.setTimeout(function() {
//       //console.log("about to close door:"+door.doorId);
//       door.close();
//     }, 3000);
//   }, 'horizontal2');
// }

function mousePressed() {
  if ( !SceneMgr.instance().isStarted() ) {
    SceneMgr.instance().start();
  }
  //testScene();
}

function scene0() {
  //scene7();
  scene6a();
  //scene10();
  //scene8();
  //scene11();
  //testScene();
}

function testScene() {
  doorMgr.openNewDoor( function( door ) {
    window.setTimeout(function() {
      door.close( function() {
        window.setTimeout(function(){
          testSceneDone();
        },3000);
      });
    }, 3000);
  }, 'vertical');

}
function testSceneDone() {
  console.log('testScene is DONE');
}


// ===
// ===

function scene1() {
  var d1 = doorMgr.openNewDoor();
  var d2 = doorMgr.openNewDoor();
  if ( random(10) < 7 ) {
    window.setTimeout(function() {
      var d3 = doorMgr.openNewDoor(
        function() {
          window.setTimeout(function() {
            var d4 = doorMgr.openNewDoor( function() {
              window.setTimeout(function() {d3.close();},random(1000));
              window.setTimeout(function() {d4.close();},random(1000));
            } );
          },random(1000));
        }, 'vertical'
      );
      var d5 = doorMgr.openNewDoor(
        function() {
          window.setTimeout(function() {
            var d6 = doorMgr.openNewDoor( function() {
              window.setTimeout(function() {d5.close();},random(1000));
              window.setTimeout(function() {d6.close();},random(1000));
            });
          },random(1000));
        }, 'vertical'
      );
    }, random(0,4000) );
  }
  window.setTimeout( function() {
    d1.close();
    d2.close( scene1done );
  }, 5000);
}
function scene1done() {
  pickNextScene('scene1');
  // var r = random(7);
  // if ( r < 1 ) {
  //   scene1();
  // } else if ( r < 2 ) {
  //   scene2();
  // } else if ( r < 3 ){
  //   scene3();
  // } else if ( r < 4 ){
  //   scene4();
  // } else if ( r < 5 ){
  //   scene5();
  // } else {
  //   scene6a();
  // }
}

function scene2() {
  var d1 = doorMgr.openNewDoor( function(door) {
    window.setTimeout( function() {
      door.close( scene2done );
    },random(2000));
  });
}
function scene2done() {
  if ( random(2) < 1 ) {
    scene1();
    return;
  }
  pickNextScene('scene2');
  // var r = random(10);
  // if ( r < 1 ) {
  //   scene3();
  // } else if ( r < 2 ) {
  //   scene4();
  // } else if ( r < 3 ) {
  //   scene6();
  // } else {
  //   scene1();
  // }
}

function scene3() {
  var numDoors = random(5,10);
  var dArr = [];
  for ( var i=0; i<numDoors; i++ ) {
    var d = doorMgr.openNewDoor();
    if ( d ) {
      dArr.push( d );
    }
  }
  window.setTimeout( function() {
    for ( var i=0; i<numDoors; i++ ) {
      var d = dArr[i];
      (function(door){
        window.setTimeout( function() {
          door.close();
        }, random(1000,5000) );
      })(d);
    }
  }, 3000);
  // TODO: improve the transition to scene3 by keeping track of when the last door closes (which is random but max 5000ms)
  window.setTimeout( function() {
    scene3done();
  }, random(5000,9000));
}
function scene3done() {
  if ( random(5) < 2 ) {
    scene1();
    return;
  }
  pickNextScene('scene9');
  // var r = random(6);
  // if ( r < 1 ) {
  //   scene4();
  // } else if ( r < 2 ) {
  //   scene5();
  // } else if ( r < 3 ){
  //   scene2();
  // } else if ( r < 4 ){
  //   scene6a();
  // } else {
  //   scene1();
  // }
}

function scene4() {
  var d1,d2,d3,d4,d5;
  d1 = doorMgr.openNewDoor(function() {
    d2 = doorMgr.openNewDoor(function() {
      d3 = doorMgr.openNewDoor(function() {
        d4 = doorMgr.openNewDoor(function() {
          d5 = doorMgr.openNewDoor(
            function() {

              if ( random(2) < 1 ) {
                d1.close( function() {
                  d2.close( function() {
                    d3.close( function() {
                      d4.close( function() {
                        window.setTimeout(function(){
                          d5.close( function() {
                            scene4done();
                          });
                        }, random(1000));
                      });
                    });
                  });
                });
              } else {
                d1.close();
                d2.close( function() {
                  d3.close();
                  d4.close();
                  d5.close( function() {
                    scene4done();
                  });
                });

              }

            }
          );
        });
      });
    });
  });
}
function scene4done() {
  if ( random(5) < 2 ) {
    scene1();
    return;
  }
  pickNextScene('scene4');
  // var r = random(6);
  // if ( r < 1 ) {
  //   scene4();
  // } else if ( r < 2 ) {
  //   scene5();
  // } else if ( r < 3 ){
  //   scene2();
  // } else if ( r < 4 ){
  //   scene3();
  // } else {
  //   scene1();
  // }
}
function scene5() {

  var numDoors = floor(random(10,20)); // TODO: this value MIGHT not match the final number of doors added to dArr (if the doors don't all fit for example)
  var scene5variantCode = floor(random(2));
  var scene5doorType = random(10)<5 ? 'vertical' : 'horizontal2';
  var openCount = 0;
  var closedCount = 0;
  var lastOpenTurnCount = 0;
  //var closeTimeRandom = random(2)<1 ? true:false;
  var dArr = [];
  for ( var i=0; i<numDoors; i++ ) {
    window.setTimeout(function() {
      var keepAlive = floor(random(2,5));
      var d = doorMgr.openNewDoor( scene5doorOpenEvent
        // function() {
        //   openCount += 1;
        //   window.setTimeout(function() {
        //     d.close( scene5doorCloseEvent
        //       // function() {
        //       //   // check if everything is done
        //       //   closedCount += 1;
        //       //   if ( closedCount == numDoors && openCount == closedCount ) {
        //       //     scene5done();
        //       //   }
        //       // }
        //     );
        //   } , random(2000,4000));
        // }
        , scene5doorType, keepAlive);
      if ( d ) {
        dArr.push( d );
      }
    }, random(3000));
  }

  var scene5doorOpenEvent = function ( door ) {

    openCount += 1;

    if ( scene5variantCode == 1 && door.keepAlive <= 1) {

      // this door is open but the next time it closes, it will be dead
      // so do not set a timeout to close it and instead wait until the
      // scene done signal occurs
      lastOpenTurnCount += 1;
      if ( lastOpenTurnCount == numDoors ) {
        window.setTimeout(function() {
          for (var i=0; i<numDoors; i++) {
            var d = dArr[i];
            if ( i == numDoors-1 ) {
              d.close( function() {
                scene5done();
              });
            } else {
              d.close();
            }
          }
        }, random(5000,10000));

      }

    } else {

      window.setTimeout( function() {
        door.close( function() {

          closedCount += 1;

          // check if everything is done
          if ( door.keepAlive ) {
            door.keepAlive -= 1;
            if ( door.keepAlive < 0 ) {
              door.keepAlive = 0;
            } else if ( door.keepAlive > 0 ) {
              // reopen in random time
              openCount -= 1;
              closedCount -= 1;
              window.setTimeout(function(){
                door.open( scene5doorOpenEvent
                  // function() {
                  // openCount += 1;
                  // window.setTimeout(function(){
                  //   door.close( scene5doorCloseEvent );
                  // }, random(2000,4000));
                  // }
                  );
              }, random(500,4000));
            }
          }

          console.log("numDoors = "+numDoors+", openCount = "+openCount+", closedCount = "+closedCount);
          if ( closedCount == numDoors && openCount == closedCount ) {
            console.log("******* all closed *******");
            scene5done();
          }

        });
      }, random(500,4000));

    }


  }

  // window.setTimeout( function() {
  //   for ( var i=0; i<numDoors; i++ ) {
  //     var d = dArr[i];
  //     (function(door){
  //       window.setTimeout( function() {
  //         door.close();
  //       }, random(1000) );
  //     })(d);
  //   }
  // }, random(3000));

  // window.setTimeout( function() {
  //   scene5done();
  // }, random(5000,9000));

}


function scene5done() {
  pickNextScene('scene5');
  // var r = random(4);
  // if ( r < 1 ) {
  //   scene1();
  // } else if ( r < 2 ) {
  //   scene2();
  // } else if ( r < 3 ){
  //   scene3();
  // } else {
  //   scene4();
  // }
}

function scene6a() {
  doorMgr.openNewDoor( function( door ) {
    window.setTimeout(function() {
      door.close( function() {
        window.setTimeout(function(){
          scene6adone();
        },3000);
      });
    }, 3000);
  }, 'horizontal2');
}
function scene6adone() {
  pickNextScene('scene6a');
  // var r = random(6);
  // if ( r < 1 ) {
  //   scene4();
  // } else if ( r < 2 ) {
  //   scene5();
  // } else if ( r < 3 ){
  //   scene2();
  // } else if ( r < 4 ){
  //   scene3();
  // } else {
  //   scene1();
  // }
}

function scene6() {
  var numDoors = random(5,10);
  var dArr = [];
  for ( var i=0; i<numDoors; i++ ) {
    var d = doorMgr.openNewDoor(null,'horizontal2');
    if ( d ) {
      dArr.push( d );
    }
  }
  window.setTimeout( function() {
    for ( var i=0; i<numDoors; i++ ) {
      var d = dArr[i];
      (function(door){
        window.setTimeout( function() {
          door.close();
        }, random(1000,5000) );
      })(d);
    }
  }, 3000);
  // TODO: improve the transition to scene3 by keeping track of when the last door closes (which is random but max 5000ms)
  window.setTimeout( function() {
    scene6done();
  }, random(5000,9000));
}
function scene6done() {
  pickNextScene('scene6');
  // var r = random(6);
  // if ( r < 1 ) {
  //   scene4();
  // } else if ( r < 2 ) {
  //   scene5();
  // } else if ( r < 3 ){
  //   scene2();
  // } else if ( r < 4 ){
  //     scene3();
  // } else {
  //   scene1();
  // }
}

function scene7() {
  var doorType = 'all';
  var doorY = height/2 - DOOR_HEIGHT/2;
  var numDoors = 6;
  var dArr = [];
  for ( var i=0; i<numDoors; i++ ) {
    window.setTimeout(function(){
      var d = doorMgr.openNewDoor(null, doorType, null, null, doorY);
      if ( d ) {
        dArr.push( d );
      }
    }, random(5000));
  }
  window.setTimeout( function() {
    for ( var i=0; i<dArr.length; i++ ) {
      var d = dArr[i];
      (function(door){
        window.setTimeout( function() {
          door.close();
        }, random(1000,5000) );
      })(d);
    }
  }, 5500);
  // TODO: improve the transition to scene3 by keeping track of when the last door closes (which is random but max 5000ms)
  window.setTimeout( function() {
    scene7done();
  }, random(8000,10000));

}

function scene7done() {
  pickNextScene('scene7');
}


function scene8() {
  var doorType = null;

  var configMode = floor(random(10))<5 ? 0 : 1;

  var doorYcenter = height/2 - DOOR_HEIGHT/2;
  var numDoors = 0;
  var numRows = 6;
  var numDoorsPerRow = (configMode==0) ? 6 : 8;
  var dArr = [];

  for ( var i=0; i<numRows*numDoorsPerRow; i++ ) {

    var rowNum = floor(i / numDoorsPerRow);
    var colNum = i % numDoorsPerRow;
    if ( configMode == 1 ) {
      // skip middle 2 columns
      if ( colNum == 3 || colNum == 4) {
        continue;
      }
    }
    var doorX = (colNum * DOOR_WIDTH) - (numDoorsPerRow*DOOR_WIDTH/2) + width/2;
    var doorY = rowNum*DOOR_HEIGHT - numRows*DOOR_HEIGHT/2 + height/2;

    (function(dx,dy){
      window.setTimeout(function(){
          var d = doorMgr.openNewDoor(null, doorType, null, dx, dy);
          if ( d ) {
            dArr.push( d );
          }
        }, random(5000))
    })(doorX,doorY);

  }

  window.setTimeout( function() {
    for ( var i=0; i<dArr.length; i++ ) {
      var d = dArr[i];
      (function(door){
        window.setTimeout( function() {
          door.close();
        }, random(1000,5000) );
      })(d);
    }
  }, 10000);
  // TODO: improve the transition to scene3 by keeping track of when the last door closes (which is random but max 5000ms)
  window.setTimeout( function() {
    scene8done();
  }, random(15000,15000));

}

function scene8done() {
  pickNextScene('scene8');
}

function scene9() {
  var doorType = null;

  var doorYcenter = height/2 - DOOR_HEIGHT/2;
  var numDoors = 0;
  var numRows = 6;
  var numDoorsPerRow = 6;
  var doorSpacingX = DOOR_WIDTH+DOOR_WIDTH/2;
  var doorSpacingY = DOOR_HEIGHT+DOOR_HEIGHT/2;
  var dArr = [];

  for ( var i=0; i<numRows*numDoorsPerRow; i++ ) {

    var rowNum = floor(i / numDoorsPerRow);
    var colNum = i % numDoorsPerRow;
    var doorX = (colNum * doorSpacingX) - (numDoorsPerRow*doorSpacingX/2) + width/2;
    var doorY = rowNum*doorSpacingY - numRows*doorSpacingY/2 + height/2;

    (function(dx,dy){
      window.setTimeout(function(){
          var d = doorMgr.openNewDoor(null, doorType, null, dx, dy);
          if ( d ) {
            dArr.push( d );
          }
        }, random(5000))
    })(doorX,doorY);

  }

  window.setTimeout( function() {
    for ( var i=0; i<dArr.length; i++ ) {
      var d = dArr[i];
      (function(door){
        window.setTimeout( function() {
          door.close();
        }, random(1000,5000) );
      })(d);
    }
  }, 10000);
  // TODO: improve the transition to scene3 by keeping track of when the last door closes (which is random but max 5000ms)
  window.setTimeout( function() {
    scene9done();
  }, random(15000,15000));

}

function scene9done() {
  pickNextScene('scene9');
}

function scene10() {
  console.log("scene10: in");

  var doorType = null;

  var doorYcenter = height/2 - DOOR_HEIGHT/2;
  var numDoors = 0;
  var doorSpacingX;
  var doorSpacingY;
  var r = random(2);
  if ( r < 1 ) {
    doorSpacingX = DOOR_WIDTH+DOOR_WIDTH/2;
    doorSpacingY = DOOR_HEIGHT+DOOR_HEIGHT/2;
  } else if ( r < 2 ) {
    doorSpacingX = DOOR_WIDTH;
    doorSpacingY = DOOR_HEIGHT;
  // } else if ( r < 3 ) {
  //   doorSpacingX = DOOR_WIDTH+DOOR_WIDTH/2;
  //   doorSpacingY = DOOR_HEIGHT*2;
  // } else {
  //   doorSpacingX = DOOR_WIDTH*2;
  //   doorSpacingY = DOOR_HEIGHT+DOOR_HEIGHT/2;
  }

  var maxDoorsPerRow = width * .9 / doorSpacingX;
  var maxDoorsPerCol = height * .9 / doorSpacingY;

  var numRows;
  var numDoorsPerRow;
  if ( random(2) < 1 ) {
    numRows = floor(random(2,floor(maxDoorsPerRow/2)));
    numDoorsPerRow = floor(random(4,maxDoorsPerRow));
  } else {
    numRows = floor(random(4,maxDoorsPerCol));
    numDoorsPerRow = floor(random(2,floor(maxDoorsPerCol/2)));
  }

  var skipColNum;
  var skipRowNum;
  var doorConfigMode = 0;
  var doorConfigPicker = floor(random(4));
  // numRows=5;
  // numDoorsPerRow=10;

  if ( (numDoorsPerRow >= 3 || numRows >= 3) && doorConfigPicker == 0 ) {

    // skips either columns or rows
    doorConfigMode = 1;
    var skipColumns = false;

    if ( numDoorsPerRow >= 3 && numRows >= 3 ) {
      // pick either rows or columns to skip
      if ( random(2) < 1 ) {
        skipColumns = true;
      }
    } else {
      if ( numDoorsPerRow >= 3 ) {
        skipColumns = true;
      }
    }

    if ( skipColumns ) {
      skipColNum = floor(random(1,numDoorsPerRow-1));
    } else {
      skipRowNum = floor(random(1,numRows-1));
    }

  } else if ((numDoorsPerRow >= 3 && numRows >= 3) && doorConfigPicker == 1) {

    // skip inner doors leaving only perimeter
    doorConfigMode = 2;
    // have only a single door type
    doorType = doorMgr.randomDoorType();
    //doorType = "horizontal2";

  } else if (doorConfigPicker == 2) {
    // skip a random door
    doorConfigMode = 3;
    skipColNum = floor(random(0,numDoorsPerRow));
    skipRowNum = floor(random(0,numRows));
  }

  console.log("doorConfigMode="+doorConfigMode);
  console.log("numRows="+numRows+", numDoorsPerRow="+numDoorsPerRow+", skipRowNum="+skipRowNum+", skipColNum="+skipColNum);

  // var numRows = 2;
  // var numDoorsPerRow = 5;
  var dArr = [];

  for ( var rowNum=0; rowNum<numRows; rowNum++ ) {

    if ( doorConfigMode == 1 ) {
      if ( skipRowNum && rowNum == skipRowNum ) {
        continue; // skip this row
      }
    }

    for ( var colNum=0; colNum<numDoorsPerRow; colNum++ ) {

      if ( doorConfigMode == 1 ) {
        if ( skipColNum && colNum == skipColNum ) {
          continue; // skip this column
        }
      } else if ( doorConfigMode == 2 ) {
        // skip inner
        if ( !(rowNum == 0 || rowNum == numRows-1 || colNum == 0 || colNum == numDoorsPerRow-1) ) {
          continue;
        }
      } else if ( doorConfigMode == 3 ) {
        if ( rowNum == skipRowNum && colNum == skipColNum ) {
          continue;
        }
      }

      // var rowNum = floor(i / numDoorsPerRow);
      // var colNum = i % numDoorsPerRow;
      var doorX = (colNum * doorSpacingX) - ((numDoorsPerRow*doorSpacingX-(doorSpacingX-DOOR_WIDTH))/2) + width/2;
      var doorY = rowNum*doorSpacingY - ((numRows*doorSpacingY-(doorSpacingY-DOOR_HEIGHT))/2) + height/2;

      (function(dx,dy){
        window.setTimeout(function(){
            var d = doorMgr.openNewDoor(null, doorType, null, dx, dy);
            if ( d ) {
              dArr.push( d );
            }
          }, random(5000))
      })(doorX,doorY);

    }

  }

  //doorConfigMode = 3;
  //skipColNum = floor(random(0,numDoorsPerRow));
  //skipRowNum = floor(random(0,numRows));

  var closeUp = function(delayTime) {
    window.setTimeout( function() {
      for ( var i=0; i<dArr.length; i++ ) {
        var d = dArr[i];
        (function(door){
          window.setTimeout( function() {
            door.close();
          }, random(1000,5000) );
        })(d);
      }

      window.setTimeout( function() {
        scene10done();
      }, random(7000,7000)); // need to fix this (i.e. change time based on if there was a missing column or single door which increases the time before the end)

    }, delayTime);
  }

  var openDoorWithRandomDelay = function(rowNum,colNum,doorType,timeDelayLimit) {
    var doorX = (colNum * doorSpacingX) - ((numDoorsPerRow*doorSpacingX-(doorSpacingX-DOOR_WIDTH))/2) + width/2;
    var doorY = rowNum*doorSpacingY - ((numRows*doorSpacingY-(doorSpacingY-DOOR_HEIGHT))/2) + height/2;
    window.setTimeout(function(){
        var d = doorMgr.openNewDoor(null, doorType, null, doorX, doorY);
        if ( d ) {
          dArr.push( d );
        }
      }, random(timeDelayLimit));
  }

  if ( doorConfigMode == 1 ) {
    // open up the missing row/col
    window.setTimeout(function() {
      var colNum = skipColNum;
      var rowNum = skipRowNum;
      if ( skipColNum ) {
        // loop through the rows of the missing column
        for (var rowNum=0; rowNum<numRows; rowNum++) {
          openDoorWithRandomDelay(rowNum,skipColNum,'horizontal2',0);
        }
      } else {
        // loop through the columns of the missing row
        for (var colNum=0; colNum<numDoorsPerRow; colNum++) {
          openDoorWithRandomDelay(skipRowNum,colNum,'horizontal2',0);
        }
      }
      closeUp(3000);
    }, 9000);

  } else if ( doorConfigMode == 3 ) {
    // open up the final missing space
    window.setTimeout(function() {
      openDoorWithRandomDelay(skipRowNum,skipColNum,'horizontal2',0);
      closeUp(3000);
    }, 9000);
    // window.setTimeout(function() {
    //   var colNum = skipColNum;
    //   var rowNum = skipRowNum;
    //   var doorX = (colNum * doorSpacingX) - ((numDoorsPerRow*doorSpacingX-(doorSpacingX-DOOR_WIDTH))/2) + width/2;
    //   var doorY = rowNum*doorSpacingY - ((numRows*doorSpacingY-(doorSpacingY-DOOR_HEIGHT))/2) + height/2;
    //   var d = doorMgr.openNewDoor(null,'horizontal2',null,doorX,doorY);
    //   dArr.push(d);
    // }, 10000);
    //closeUp(13000);
  } else {
    closeUp(10000);
  }


}

function scene10done() {
  pickNextScene('scene10');
  //scene10();
}

function scene11() {

  // var openDoorWithRandomDelay = function(rowNum,colNum,doorType,timeDelayLimit) {
  //   var doorX = (colNum * doorSpacingX) - ((numDoorsPerRow*doorSpacingX-(doorSpacingX-DOOR_WIDTH))/2) + width/2;
  //   var doorY = rowNum*doorSpacingY - ((numRows*doorSpacingY-(doorSpacingY-DOOR_HEIGHT))/2) + height/2;
  //   window.setTimeout(function(){
  //       var d = doorMgr.openNewDoor(null, doorType, null, doorX, doorY);
  //       if ( d ) {
  //         dArr.push( d );
  //       }
  //     }, random(timeDelayLimit));
  // }

  // var doorType = null;

  // var doorYcenter = height/2 - DOOR_HEIGHT/2;
  // var numDoors = 0;
  // var doorSpacingX;
  // var doorSpacingY;
  // var r = random(2);
  // if ( r < 1 ) {
  //   doorSpacingX = DOOR_WIDTH+DOOR_WIDTH/2;
  //   doorSpacingY = DOOR_HEIGHT+DOOR_HEIGHT/2;
  // } else if ( r < 2 ) {
  //   doorSpacingX = DOOR_WIDTH;
  //   doorSpacingY = DOOR_HEIGHT;
  // }

  // var maxDoorsPerRow = width * .9 / doorSpacingX;
  // var maxDoorsPerCol = height * .9 / doorSpacingY;

  // var numRows;
  // var numDoorsPerRow;
  // numRows = floor(random(2,floor(maxDoorsPerRow/2)));
  // numDoorsPerRow = floor(random(4,maxDoorsPerRow));

  var openDoorsPromise = function( numNewDoors, doorType, delayTimeMS, randomizeDelay ) {
    var doorPromiseArr = [];
    for ( var i=0; i<numNewDoors; i++ ) {
      doorPromiseArr.push( openDoorPromise( doorType, randomizeDelay ? random(delayTimeMS) : delayTimeMS ) );
    }
    return Promise.all( doorPromiseArr );
  };

  var openDoorPromise = function( doorType, delayTimeMS ) {
    delayTimeMS = delayTimeMS || 0;
    var p = new Promise(function ( resolve, reject ) {
      window.setTimeout( function () {
        doorMgr.openNewDoor( function( newOpenedDoor ) {
          resolve( newOpenedDoor );
        }, doorType);
      }, delayTimeMS );
    });
    return p;
  };

  var closeDoorPromise = function( door, delayTimeMS ) {
    delayTimeMS = delayTimeMS || 0;
    return new Promise(function(resolve,reject){
      window.setTimeout( function() {
        door.close( function() {
          resolve(door);
        });
      }, delayTimeMS);
    });
  };

  var reopenDoorPromise = function( door, delayTimeMS ) {
    delayTimeMS = delayTimeMS || 0;
    return new Promise(function(resolve,reject){
      window.setTimeout( function() {
        door.open( function() {
          resolve(door);
        });
      }, delayTimeMS);
    });
  };

  var numDoors = 10;
  var dArr = [];
  //openDoors( dArr, numDoors, 'vertical' ).then( wait(2000) ).then(closeDoors([dArr[0],dArr[dArr.length-1]]));

  openDoorsPromise(numDoors,'vertical',random(2000),true).then( function(openDoorsArr) {
    console.log('all doors have been opened: openDoorsArr.length='+openDoorsArr.length);
    var closePromiseArr = openDoorsArr.map( function(door) {
      door.keepAlive = true;
      return closeDoorPromise( door, random(2000) );
    });
    return Promise.all( closePromiseArr );
  }).then( function( closedDoorsArr ) {
    console.log('all doors closed but kept alive.');
    var reopenPromiseArr = closedDoorsArr.map( function(door) {
      return reopenDoorPromise( door, random(2000) );
    });
    return Promise.all( reopenPromiseArr );
  }).then( function( reopenedDoorsArr ){
    console.log('all doors reopened.');
    var closePromiseArr = reopenedDoorsArr.map( function(door) {
      door.keepAlive = false;
      return closeDoorPromise( door, random(1000) );
    });
    return Promise.all( closePromiseArr );
  }).then( function( closedDoorsArr ){
    console.log('all doors closed and dead');
    scene11done();
  });

}
function scene11done() {
  console.log('scene11 is done');
}

function pickNextScene( fromSceneId ) {
  var sceneArr = ['scene1','scene2','scene3','scene4','scene5','scene6a','scene6','scene7','scene8','scene9','scene10','scene10'];
  var nextSceneId;
  while ( !nextSceneId ) {
    var i = floor(random(sceneArr.length));
    if ( sceneArr[i] != fromSceneId ) {
      nextSceneId = sceneArr[i];
      break;
    }
  }
  gotoScene( nextSceneId );
}
function gotoScene( sceneId ) {
  if ( sceneId == 'scene1') {
    scene1();
  } else if (sceneId == 'scene2') {
    scene2();
  } else if (sceneId == 'scene3') {
    scene3();
  } else if (sceneId == 'scene4') {
    scene4();
  } else if (sceneId == 'scene5') {
    scene5();
  } else if (sceneId == 'scene6') {
    scene6();
  } else if (sceneId == 'scene6a') {
    scene6a();
  } else if (sceneId == 'scene7') {
    scene7();
  } else if (sceneId == 'scene8') {
    scene8();
  } else if (sceneId == 'scene9') {
    scene9();
  } else if (sceneId == 'scene10') {
    scene10();
  } else if (sceneId == 'scene11') {
    scene11();
  } else if (sceneId == 'scene12') {
    scene12();
  } else if (sceneId == 'scene13') {
    scene13();
  } else if (sceneId == 'scene14') {
    scene14();
  } else if (sceneId == 'scene15') {
    scene15();
  }
}

function DoorMgr() {

  this.doorsActiveArr = [];

  this.lastDoorId = -1;

}

DoorMgr.prototype = {

  randomDoorType: function() {
    //doorSoundsByType
    var doorSoundTypes = Object.keys(doorSoundsByType);
    var rIndex = floor(random(doorSoundTypes.length));
    return doorSoundTypes[rIndex];
  },

  findEmptySpace: function(doorSpaceReq) {
    var rxIn = doorSpaceReq.x;
    var ryIn = doorSpaceReq.y;
    var rx = floor(rxIn);
    var ry = floor(ryIn);
    if ( !rx || !ry ) {
      var maxLoops = 1000;
      var loopCount = 0;
      while ( loopCount == 0 || !this.isSpaceEmpty( rx, ry, doorSpaceReq ) ) {
        if ( !rxIn ) {
          rx = floor(random(width/100, width*0.9));
        }
        if ( !ryIn ) {
          ry = floor(random(height/100, height*0.9));
        }
        loopCount += 1;
        if ( loopCount > maxLoops ) break; // give up looking for empty space and just use whatever
      }
      if ( loopCount > maxLoops ) {
        console.log("maxloops!!!!");
        return {noEmptySpace:true};
      }
    }
    return {x:rx,y:ry};
  },

  isSpaceEmpty: function( rx, ry, doorSpaceReq ) {
    var numDoors = this.doorsActiveArr.length;
    for ( var i=0; i<numDoors; i++ ) {
      var door = this.doorsActiveArr[i];
      if ( dist(rx,ry,door.x,door.y) < 1.5* max(doorSpaceReq.width,doorSpaceReq.height,door.doorWidth,door.doorHeight) ) {
        return false;
      }
    }
    return true;
  },

  numOpenDoors: function() {
    return this.getOpenDoors().length;
  },

  getNextDoorId: function() {
    this.lastDoorId += 1;
    return this.lastDoorId;
  },

  calcGridMaxColumns: function( gridSizeX, offsetX ) {
    gridSizeX = DOOR_WIDTH;
    offsetX = offsetX || DOOR_WIDTH;
    var maxCols = floor((width - 2*offsetX + (gridSizeX-DOOR_WIDTH))/gridSizeX);
    return maxCols;
  },

  calcGridMaxRows: function( gridSizeY, offsetY ) {
    gridSizeY = DOOR_HEIGHT;
    offsetY = offsetY || DOOR_HEIGHT;
    var maxRows = floor((height - 2*offsetY + (gridSizeY-DOOR_HEIGHT))/gridSizeY);
    return maxRows;
  },

  gridPointToXY: function( col, row, maxCols, maxRows, gridSizeX, gridSizeY, offsetX, offsetY ) {
    // by default determine offsets so as to center the
    if ( !gridSizeX ) {
      gridSizeX = DOOR_WIDTH;
    }
    if ( !gridSizeY ) {
      gridSizeY = DOOR_HEIGHT;
    }
    if ( !maxCols ) {
      offsetX = offsetX || DOOR_WIDTH;
      maxCols = this.calcGridMaxColumns( gridSizeX, offsetX );
    }
    if ( !maxRows ) {
      offsetY = offsetY || DOOR_HEIGHT;
      maxRows = this.calcGridMaxRows( gridSizeY, offsetY );
    }
    if ( maxCols && !offsetX ) {
      offsetX = floor((width - (maxCols*gridSizeX - (gridSizeX-DOOR_WIDTH)))/2);
    }
    if ( !offsetY ) {
      offsetY = floor((height - (maxRows*gridSizeY - (gridSizeY-DOOR_HEIGHT)))/2);
    }
    var x = (col * gridSizeX) + (offsetX ? offsetX : 0);
    var y = row * gridSizeY + (offsetY ? offsetY : 0);
    return {x:x,y:y};
  },

  getDoorOnGrid: function( col, row ) {
    var gridXY = gridPointToXY( col, row );
    var numDoors = this.doorsActiveArr.length;
    for ( var i=0; i<numDoors; i++ ) {
      var door = this.doorsActiveArr[i];
      if ( gridXY.x == door.x && gridXY.y == door.y ) {
        return door;
      }
    }
    return null;
  },

  createDoorAtXY: function(doorType,x,y) {
    var door = new Door(doorType);
    door.doorId = this.getNextDoorId();
    door.setPos( x, y );
    this.doorsActiveArr.push(door);
    return door;
  },

  createNewDoorOnGrid: function( doorType, col, row, maxCols, maxRows, gridSizeX, gridSizeY, offsetX, offsetY ) {
    var xy = this.gridPointToXY( col, row, maxCols, maxRows, gridSizeX, gridSizeY, offsetX, offsetY );
    return this.createDoorAtXY( doorType, xy.x, xy.y );
  },

  createNewDoor: function( doorType, keepAlive, x, y ) {
    // creates a new door at x,y but allows for either x/y/both
    // to be undefined/null and picks a random value for them
    // in thoses cases
    var xy;
    if ( !x || !y ) {
      var emptySpaceXY = this.findEmptySpace(
        {width:DOOR_WIDTH,height:DOOR_HEIGHT,x:x,y:y});
      if ( emptySpaceXY.noEmptySpace ) {
        // no room for a new door
        return false;
      }
      xy = emptySpaceXY;
    } else {
      xy = {x:x,y:y};
    }
    var door = this.createDoorAtXY( doorType, xy.x, xy.y );
    door.keepAlive = keepAlive;
    return door;
  },

  openNewDoor: function( doorOpenedCallback, doorType, keepAlive, x, y ) {
    var door = this.createNewDoor( doorType, keepAlive, x, y );
    if ( !door ) {
      return null;
    }
    door.open( doorOpenedCallback );
    return door;
  },

  closeDoorById: function( doorId ) {
    var door = this.getDoorById( doorId );
    if ( door ) {
      door.close();
    }
  },

  getClosedButAliveDoors: function() {
    return this.doorsActiveArr.filter(function(door) {
      return door.isClosed() && door.keepAlive;
    });
  },

  getOpenDoors: function() {
    return this.doorsActiveArr.filter(function(door) {
      return door.isOpen();
    })
  },

  getDoorById: function( doorId ) {
    var numDoors = this.doorsActiveArr.length;
    for ( var i=0; i<numDoors; i++ ) {
      var door = this.doorsActiveArr[i];
      if ( door.doorId == doorId ) {
        return door;
      }
    }
  },

  // closeAllDoorsForScene: function( sceneName ) {
  //   var doorsArr = this.doorsActiveArr.filter( function(door) {
  //     return door.sceneName == sceneName;
  //   });
  //   doorsArr.forEach( function( door ) {
  //     door.close();
  //   });
  // },

  closeAllDoors: function() {
    for (var i=0; i<this.doorsActiveArr.length; i++) {
      var door = this.doorsActive[i];
      if ( door.isOpen() || door.isOpening() ) {
        door.close();
      }
    }
  },

  removeClosedDoor: function( door ) {
    if ( !door.isClosed() ) {
      return;
    }
    var i = this.doorsActiveArr.indexOf(door);
    if ( i != -1 ) {
      this.doorsActiveArr.splice(i,1);
    }
    //delete this.doorsActive[door.doorId];
  },

  update: function() {
    var that = this;
    this.doorsActiveArr.forEach( function(door) {
      door.update();
      if ( door.isClosed() && !door.keepAlive ) {
        that.removeClosedDoor( door );
      }
    });
  },

  draw: function() {
    this.doorsActiveArr.forEach( function(door) {
      door.draw();
    });
  }

};

function Door( doorType ) {

  this.doorId = -1;
  this.state = 'closed';
  this.x = 0;
  this.y = 0;

  this.openStartTime = 0;
  this.closeStartTime = 0;

  // if ( !this.x ) {
  //   resetXPos();
  // }
  // if ( !this.y ) {
  //   resetYPos();
  // }
  //
  // var resetXPos = function() {
  //   this.x = random(width/10,width*0.9);
  // };
  // var resetYPos = function() {
  //   this.y = random(height/10,height*0.9);
  // };
  // var resetPosition = function() {
  //   resetXPos();
  //   resetYPos();
  // };

  // this.isOpen = false;
  // this.isOpening = false;
  // this.isClosing = false;
  // this.isClosed = true;

  var pickDoorSound = function(doorType) {
    var doorSoundsArr;
    if ( !doorType ) {
      doorSoundsArr = doorSoundsByType['horizontal'].concat(doorSoundsByType['vertical']);//doorSounds; //all door sounds
    } else if ( doorType instanceof Array ) {
      // not supported yet
    } else {
      if (doorType == 'all') {
        doorSoundsArr = doorSounds;
      } else {
        doorSoundsArr = doorSoundsByType[doorType];
      }
    }
    var rndIndex = floor(random(doorSoundsArr.length));
    var doorSound = doorSoundsArr[rndIndex];
    return doorSound;
  };
  this.doorSound = pickDoorSound(doorType);

  this.doorWidth = DOOR_WIDTH; //random(100,100);
  this.doorHeight = DOOR_HEIGHT; //random(100,200);

  //this.openingDuration = this.doorSound.open.duration * 1000 * 0.8;
  //this.closingDuration = this.doorSound.close.duration * 1000 * 0.8;
  this.openingDuration = this.doorSound.open.duration * 1000;
  this.closingDuration = this.doorSound.close.duration * 1000;

  this.doorOpenedCallback = null;
  this.doorClosedCallback = null;
}

Door.STATE_OPEN = 'open';
Door.STATE_CLOSED = 'closed';
Door.STATE_OPENING = 'opening';
Door.STATE_CLOSING = 'closing';

Door.prototype = {

  setPos: function( xIn, yIn ) {
    this.x = xIn;
    this.y = yIn;
  },

  setStateToOpen: function() {
    this.state = Door.STATE_OPEN;
    if ( this.doorOpenedCallback ) {
      this.doorOpenedCallback( this );
    }
  },
  setStateToClosed: function() {
    this.state = Door.STATE_CLOSED;
    if ( this.doorClosedCallback ) {
      this.doorClosedCallback( this );
    }
  },
  setStateToOpening: function() {
    this.state = Door.STATE_OPENING;
  },
  setStateToClosing: function() {
    this.state = Door.STATE_CLOSING;
  },

  isOpen: function() {
    if ( this.state === Door.STATE_OPEN ) {
      return true;
    }
    return false;
  },
  isClosed: function() {
    if ( this.state === Door.STATE_CLOSED ) {
      return true;
    }
    return false;
  },
  isOpening: function() {
    return (this.state === Door.STATE_OPENING);
  },
  isClosing: function() {
    return (this.state === Door.STATE_CLOSING);
  },
  open: function( doorOpenedCallbackIn ) {
    if ( !this.isClosed() ) {
      return;
    }
    if ( doorOpenedCallbackIn ) {
      this.doorOpenedCallback = doorOpenedCallbackIn;
    }
    this.setStateToOpening();
    this.openStartTime = millis();
    this.doorSound.open.file.play();
  },
  close: function( doorClosedCallbackIn ) {
    if ( !this.isOpen() ) {
      return;
    }
    if ( doorClosedCallbackIn ) {
      this.doorClosedCallback = doorClosedCallbackIn;
    }
    this.setStateToClosing();
    this.closeStartTime = millis(); // maybe modify this if close() was called while door was opening
    this.doorSound.close.file.play();
  },
  fractionOpen: function() {
    var openingTimeDelta = millis() - this.openStartTime;
    var frac = openingTimeDelta / this.openingDuration;
    if ( frac > 1 ) {
      frac = 1;
    }
    return frac;
  },
  fractionClosed: function() {
    var closingTimeDelta = millis() - this.closeStartTime;
    var frac = closingTimeDelta / this.closingDuration;
    if ( frac > 1 ) {
      frac = 1;
    }
    return frac;
  },
  update: function() {
    // update state
    if ( this.isOpening() ) {
      if ( this.fractionOpen() >= 1 ) {
        this.setStateToOpen();
      }
    } else if ( this.isClosing() ) {
      if ( this.fractionClosed() >= 1 ) {
        this.setStateToClosed();
      }
    }
  },
  draw: function() {
    if ( this.isClosed() ) {
      // draw should not be called when it is closed but if it is then do nothing
      return;
    }

    var dw = this.doorWidth;
    var dh = this.doorHeight;

    if ( this.isOpening() ) {

      if ( this.doorSound.doorType === 'vertical' ) {

        dh = Math.easeInOutCubic( this.fractionOpen(), 0, this.doorHeight, 1 );

      } else if ( this.doorSound.doorType === 'horizontal' ) {

        dw = Math.easeInOutCubic( this.fractionOpen(), 0, this.doorWidth, 1 );

      } else if ( this.doorSound.doorType === 'horizontal2' ) {

        dw = Math.easeOutQuad( this.fractionOpen(), 0, this.doorWidth, 1 );

      }

    } else if ( this.isClosing() ) {

      if ( this.doorSound.doorType === 'vertical' ) {

        dh = Math.easeOutCubic( this.fractionClosed(), this.doorHeight, -this.doorHeight, 1 );

      } else if ( this.doorSound.doorType === 'horizontal' ) {

        dw = Math.easeOutCubic( this.fractionClosed(), this.doorWidth, -this.doorWidth, 1 );

      } else if ( this.doorSound.doorType === 'horizontal2' ) {

        dw = Math.easeOutBounce( this.fractionClosed(), this.doorWidth, -this.doorWidth, 1 );

      }

    }

    rectMode(CORNER);
    noStroke();
    fill(0);
    rect(this.x, this.y, dw, dh);

    // if ( this.doorSound.doorType === 'vertical' ) {
    //   rectMode(CORNER);
    //   //var h = Math.easeInOutCubic( millis() - this.openStartTime, 0, this.doorHeight, this.openingDuration );
    //   //rect(this.x,this.y,this.doorWidth, this.doorHeight * fractionOpen);
    // } else if ( this.doorSound.doorType === 'horizontal' ) {
    //   rectMode(CORNER);
    //   rect(this.x,this.y,this.doorWidth * fractionOpen, this.doorHeight);
    // }

  }
};

//----

// var doorIsOpen = false;
// var doorSound;
//
// function toggleDoor() {
//   if ( !doorIsOpen ) {
//     openDoor();
//   } else {
//     closeDoor();
//   }
// }
//
// // function pickDoorSound() {
// //   var rndIndex = floor(random(doorSounds.length));
// //   var doorSound = doorSounds[rndIndex];
// //   return doorSound;
// // }
// function openDoor() {
//   doorSound = pickDoorSound();
//   doorIsOpen = true;
//   doorSound.open.play();
// }
// function closeDoor() {
//   doorIsOpen = false;
//   doorSound.close.play();
// }

// t = current time
// b = start value
// c = change in value
// d = duration
Math.easeInOutCubic = function (t, b, c, d) {
	//var t = tin / (d/2);
  t /= d/2;
  // if ( t>.8 ) {
  //   console.log("t="+t+", c/2*t*t*t="+c/2*t*t*t);
  // }
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

Math.easeOutCubic = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
};

Math.easeInCubic = function (t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
};

Math.easeInOutExpo = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};

Math.easeOutBounce = function (t, b, c, d) {
  if ((t/=d) < (1/2.75)) {
   return c*(7.5625*t*t) + b;
  } else if (t < (2/2.75)) {
   return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  } else if (t < (2.5/2.75)) {
   return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  } else {
   return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  }
};

Math.easeOutQuint = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
};

Math.easeInOutQuint = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
};

Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};

//----
//----

//
// SceneMgr:
// - keep history of scene sequence
// - picks next scene
// - next scene probabilities need to change based on the history
//    - time that a scene occured last
//    - num of times a scene occured within a particular timeframe window
//
function SceneMgr() {

  var that = this;

  // history contains array of objects up to length 100
  // each object should have the following info:
  // - scene id
  // - name
  // - time that it started
  // - time that it ended
  this.history = [];

  // scene map containing keys to all scenes
  this.sceneIdMap = {};

  this.allScenesArr = [];

  var sceneCount = 0;
  try {
    while ( scene=eval('new Scene_'+sceneCount+'()') ) {
      this.allScenesArr.push( scene );
      console.log('added scene: '+scene.name);
      sceneCount += 1;
      if ( sceneCount > 1000 ) {
        console.log('********');
        break;
      }
    }
  } catch (e) {
    // exception is expected when creating the all scenes array
    // because it is adding scenes until it cannot find a class
    // matching the scene counter
  }
  console.log('total number of scenes: '+sceneCount);

  for ( var i=0; i < this.allScenesArr.length; i++ ) {
    var sceneId = this.allScenesArr[i].sceneId;
    this.sceneIdMap[sceneId] = this.allScenesArr[i];
  }

  // scene counter map where keys are scene ids and values are counters/priorities incremented
  // after a scene completes and the counter/priority for the scene completed is "reset" to
  // a scene-specific reset-value. For example, after a scene finishes, the priority might be set
  // to zero or to a negative. Where a negative priority would mean to not pick that scene
  // but that value would increase by one each time any other scene plays.
  // [{ id: 5, priority: -5 },  {id: 2, priority: 1}, {id: 3, priority: 2}]
  this.sceneQueueNextPriorities = [];

  var initSceneQueueNextPriorities = function() {
    that.allScenesArr.forEach( function(scene){
      var scenePriorityItem = {sceneId: scene.sceneId, priority: scene.resetPriorityValue};
      that.sceneQueueNextPriorities.push( scenePriorityItem );
    });
  };

  // scene upcoming queue
  // e.g. [8, 2, 5, 2, 1]
  this.upcomingSceneQueue = [];
  this.upcomingSceneQueueLength = 10;

  // currently running scene
  this.currentSceneInfo = {};
  this.lastSceneInfo = {};

  // updated by updateSceneCountInfo
  this.sceneCountInfo = {};
  this.sceneCountInfoCutoffPeriodMS = 6 * 60 * 1000; // 6 minutes

  this.MAX_SCENE_PLAY_COUNT = 40;
  this.scenePlayCount = 0;

  //initSceneIdMap();
  //this.updateSceneCountInfo();
  initSceneQueueNextPriorities();

  var _isStarted = false;
  this.isStarted = function() {
    return _isStarted;
  };
  this.start = function() {
    if ( _isStarted ) {
      console.log('SceneMgr is already started');
      return;
    }
    console.log('SceneMgr.started');
    _isStarted = true;
    this.fillUpcomingSceneQueue();
    this.startNextScene();
  };
  this.stop = function() {
    console.log('SceneMgr.stopped called, not implemented');
  }

}

SceneMgr.instance = function() {
  if ( !SceneMgr._singletonInstance ) {
    SceneMgr._singletonInstance = new SceneMgr();
  }
  return SceneMgr._singletonInstance;
}

SceneMgr.prototype = {

  // start: function() {
  //   console.log('SceneMgr.started');
  //   //this.updateSceneCountInfo();
  //   this.fillUpcomingSceneQueue();
  //   this.startNextScene();
  // },

  // stop: function() {
  //   console.log('SceneMgr.stopped called, not implemented');
  // },

  // scene count function returning num of times all scenes played in last X period of time (e.g. 60sec)
  updateSceneCountInfo: function() {
    var that = this;
    this.sceneCountInfo = {};
    var cutoffTimeMS = millis() - this.sceneCountInfoCutoffPeriodMS;
    var filteredHistoryArr = this.history.filter( function( historyItem ) {
      return historyItem.startTime > cutoffTimeMS;
    });
    filteredHistoryArr.forEach( function( historyItem ) {
      if ( !that.sceneCountInfo[historyItem.sceneId] ) {
        that.sceneCountInfo[historyItem.sceneId] = 0;
      }
      that.sceneCountInfo[historyItem.sceneId] += 1;
    });
  },

  // resets specified sceneId priority and increments all other scene priority
  updateSceneQueueNextPriorities: function( sceneId ) {
    var that = this;
    this.sceneQueueNextPriorities.forEach(function(scenePriorityItem) {
      var scene = that.sceneIdMap[scenePriorityItem.sceneId];
      if ( scenePriorityItem.sceneId == sceneId ) {
        scenePriorityItem.priority = scene.resetPriorityValue;
      } else {
        scenePriorityItem.priority += scene.incPriorityValue;
      }
    });
  },

  // adds another scene to the end of the upcoming scene queue
  fillUpcomingSceneQueue: function() {
    var numItemsToCreate = this.upcomingSceneQueueLength - this.upcomingSceneQueue.length;
    for (var i=0; i < numItemsToCreate; i++) {
      //console.log('this.sceneQueueNextPriorities = '+this.sceneQueueNextPriorities);
      var upcomingSceneId = this.pickUpcomingSceneId();
      //console.log('upcomingSceneId picked = '+upcomingSceneId);
      this.upcomingSceneQueue.push( upcomingSceneId );
      this.updateSceneQueueNextPriorities( upcomingSceneId );
    }
  },

  // used by fillUpcomingSceneQueue
  pickUpcomingSceneId: function() {
    //var r = floor(random(this.allScenesArr.length));
    var that = this;
    var randomSceneId = -1;
    var pArr = this.sceneQueueNextPriorities;
    var sceneArrToChooseRandomlyFrom;
    var highPrioritySceneArr = pArr.filter(function(priorityItem){
      return priorityItem.priority > 10;
    });
    if ( highPrioritySceneArr.length > 0 ) {
      sceneArrToChooseRandomlyFrom = highPrioritySceneArr;
    } else {
      var mediumPrioritySceneArr = pArr.filter(function(priorityItem){
        return priorityItem.priority > 5;
      });
      if ( mediumPrioritySceneArr.length > 0 ) {
        sceneArrToChooseRandomlyFrom = mediumPrioritySceneArr;
      } else {
        var lowPrioritySceneArr = pArr.filter(function(priorityItem){
          return priorityItem.priority >= 0;
        })
        if ( lowPrioritySceneArr.length > 0 ) {
          sceneArrToChooseRandomlyFrom = lowPrioritySceneArr;
        } else {
          // walk down from 0 to the smallest priority
          var sortedPriorityArray = pArr.sort(function(a,b){
            if ( a.priority > b.priority) {
              return -1;
            } else if ( a.priority == b.priority ) {
              return 0;
            }
            return 1;
          });
          var lowestPriorityItem = sortedPriorityArray[sortedPriorityArray.length-1];
          var minPriority = lowestPriorityItem.priority;
          var highestPriorityItem = sortedPriorityArray[0];
          var maxPriority = highestPriorityItem.priority;
          var randomPriority = floor(random(minPriority,maxPriority));
          for ( var i=sortedPriorityArray.length-1; i>=0; i-- ) {
            var sortedItem = sortedPriorityArray[i];
            if ( sortedItem.priority >= randomPriority ) {
              randomSceneId = sortedItem.sceneId;
              break;
            }
          }
        }
      }
    }
    if ( randomSceneId == -1 ) {
      var randomIndex = floor(random(sceneArrToChooseRandomlyFrom.length));
      randomSceneId = sceneArrToChooseRandomlyFrom[randomIndex].sceneId;
    }
    var scene = this.allScenesArr[randomSceneId];
    return scene.sceneId;
    //return floor(random(SceneMgr.MIN_SCENE_ID, SceneMgr.MAX_SCENE_ID)); //TODO: improve this
  },

  // scene completed
  // - updates the scene history
  // - updates set of currently running scenes
  sceneCompleted: function( sceneId ) {
    console.log('sceneCompleted: '+sceneId);
    this.currentSceneInfo.endTime = millis();
    this.lastSceneInfo = this.currentSceneInfo;

    // currentSceneInfo should already be in the history so don't need to do anything more
    this.currentSceneInfo = {};

    this.scenePlayCount += 1;
    if ( this.scenePlayCount < this.MAX_SCENE_PLAY_COUNT ) {
      this.startNextScene();
      return;
    }
    this.stop();
  },

  // next scene
  // - gets first value from the upcoming scene queue
  // - adds the chosen scene to the scene history with it's start time
  // - adds to the end of the upcoming scene queue
  // - updates scene queue next priorities
  startNextScene: function() {
    this.updateSceneCountInfo();
    var sceneId = this.getNextSceneId();
    var sceneHistoryItem = {sceneId: sceneId, startTime:millis()};
    this.currentSceneInfo = sceneHistoryItem;
    this.addToSceneHistory( sceneHistoryItem );

    var scene = this.sceneIdMap[sceneId];
    scene.start();
  },

  // used by startNextScene
  getNextSceneId: function() {
    console.log('SceneMgr.getNextSceneId: queue is '+this.upcomingSceneQueue);
    var nextSceneId = this.upcomingSceneQueue.shift();
    console.log('nextSceneId = '+nextSceneId);
    this.fillUpcomingSceneQueue();
    return nextSceneId;
  },

  // used by startNextScene
  // - adds the newly started scene to the history with a start time (but no end time -- that will be added upon completion)
  addToSceneHistory: function( sceneHistoryItem ) {
    this.history.push( sceneHistoryItem );
  },

  // ---
  // ---
  // ---




};

// ===


//
// Scene:
// - id, name, description
// - sequence of doors description in code as a class that inheirts from the Scene class
// - knows when it's over
//    - it can allow for the next scene to start "when it is over"
//      which may not necessarily be when all of it's doors have closed
//      (i.e. maybe it will want to allow the next scene to start just before
//      the scene's last door closes)
//
function Scene() {

  this.sceneId = -1;
  this.sceneName = null;
  this.sceneDescr = '';
  this.sceneTags = {};

  this.resetPriorityValue = 0; // may be set to negative numbers to make less likely to be added to the queue
  this.incPriorityValue = 1; // used to increase the priority value of this scene by this amount
  this.delayNextSceneMS = 0; // set to non-zero to delay the next scene a bit after this scene

  this.doorsUsed = []; // should hold any door created by this scene

}

// sceneTags may be set as true-properties on a scene (e.g. scene1.sceneTags.isLoudEnding)
Scene.sceneTagTypes = ['isGrid', 'isRandom', 'isLoudEnding', 'isSlow', 'isFast', 'isMany', 'isFew', 'isCreepy', 'isSuprising'];

Scene.prototype = {

  // start: function() {
  //   this.done(); // default scene does nothing then finishes
  // },

  addDoorsToScene: function( doors ) {
    if ( doors instanceof Array ) {
      this.doorsUsed.concat( doors );
    } else if ( doors instanceof Door ) {
      this.doorsUsed.push( doors );
    }
  },

  // called when scene is considered done
  // which is whenever the scene decides that is the case which could be
  // when the last door is opened for example. Or it could be when
  // the last door is closed and the stage is empty.
  done: function(completeImmediately) {
    var that = this;
    setTimeout( function() {
      var finished = that.cleanup();
      if ( completeImmediately ) {
        SceneMgr.instance().sceneCompleted( that.sceneId );
      } else {
        finished.catch(function(err){}).then(function(){
          SceneMgr.instance().sceneCompleted( that.sceneId );
        });
      }
    }, this.delayNextSceneMS );
  },

  // handles any final cleaning up of objects in this scene such as leftover doors
  cleanup: function() {
    var doorPromiseArr = [];
    if ( this.doorsUsed.length > 0 ) {
      this.doorsUsed.forEach( function(d) {
        if ( !d.isOpen() && !d.isOpening() ) {
          return;
        }
        var p = new Promise(function(resolve,reject) {
          d.keepAlive = false;
          if ( d.isOpen() ) {
            d.close(function(){
              resolve(d);
            });
          } else if ( d.isOpening() ) {
            d.doorOpenedCallback = function() {
              d.close(function(){
                resolve(d);
              });
            };
          }
        });
        doorPromiseArr.push(p);
      });
    }
    this.doorsUsed = [];
    return Promise.all( doorPromiseArr );
  },

  wait: function( waitTimeMS ) {
    var p = new Promise(function(resolve,reject) {
      setTimeout(function() {
        resolve();
      }, waitTimeMS);
    });
    return p;
  },

  openDoorsPattern: function( patternType, doorType, delayTimeMS, randomizeDelay, patternDefn ) {
    var that = this;
    var doorOpenPromiseArr = [];
    if ( patternType == 'boxTight' ) {
      var maxCols = 6;
      var maxRows = 6;
      var gridSizeX = DOOR_WIDTH;
      var gridSizeY = DOOR_HEIGHT;
      for ( var i=0; i<maxCols; i++ ) {
        for ( var j=0; j<maxRows; j++ ) {
          doorOpenPromiseArr.push(
            that.openDoorOnGrid(doorType, randomizeDelay ? random(delayTimeMS) : delayTimeMS,
              i, j, maxCols, maxRows, gridSizeX, gridSizeY) );
        }
      }
    } else if ( patternType == 'custom' ) {
      var maxCols = patternDefn.maxCols;
      var maxRows = patternDefn.maxRows;
      var gridSizeX = patternDefn.gridSizeX || DOOR_WIDTH;
      var gridSizeY = patternDefn.gridSizeY || DOOR_HEIGHT;
      for ( var i=0; i<maxCols; i++ ) {
        for ( var j=0; j<maxRows; j++ ) {
          if ( patternDefn.hasDoorAt(i,j) ) {
            doorOpenPromiseArr.push(
              that.openDoorOnGrid(doorType, randomizeDelay ? random(delayTimeMS) : delayTimeMS,
                i, j, maxCols, maxRows, gridSizeX, gridSizeY) );
          }
        }
      }

    }
    return Promise.all( doorOpenPromiseArr );
  },

  openDoorOnGrid: function( doorType, delayTimeMS, col, row, maxCols, maxRows, gridSizeX, gridSizeY, offsetX, offsetY ) {
    var that = this;
    delayTimeMS = delayTimeMS || 0;
    var p = new Promise(function ( resolve, reject ) {
      window.setTimeout( function () {
        var newDoor = doorMgr.createNewDoorOnGrid( doorType, col, row, maxCols, maxRows, gridSizeX, gridSizeY );
        newDoor.open( function(d) {
          resolve(d);
        });
        if ( !newDoor ) {
          reject('unable to open new door');
        }
        that.addDoorsToScene( newDoor );
      }, delayTimeMS );
    });
    return p;
  },

  openDoors: function( numNewDoors, doorType, delayTimeMS, randomizeDelay ) {
    delayTimeMS = delayTimeMS || 0;
    var doorPromiseArr = [];
    for ( var i=0; i<numNewDoors; i++ ) {
      doorPromiseArr.push( this.openDoor( doorType, randomizeDelay ? random(delayTimeMS) : delayTimeMS ) );
    }
    return Promise.all( doorPromiseArr );
  },

  openDoor: function( doorType, delayTimeMS ) {
    var that = this;
    delayTimeMS = delayTimeMS || 0;
    var p = new Promise(function ( resolve, reject ) {
      window.setTimeout( function () {
        var newDoor = doorMgr.openNewDoor( function( newOpenedDoor ) {
          resolve( newOpenedDoor );
        }, doorType);
        if ( !newDoor ) {
          reject('unable to open new door');
        }
        that.addDoorsToScene( newDoor );
      }, delayTimeMS );
    });
    return p;
  },

  closeDoors: function( doorArr, delayTimeMS, randomizeDelay, keepAlive, delayCloseMS ) {
    var that = this;
    var p = new Promise(function(resolve, reject) {
      window.setTimeout(function(){
        var closePromiseArr = doorArr.map( function(door) {
          door.keepAlive = keepAlive;
          return that.closeDoor( door, randomizeDelay ? random(delayTimeMS) : delayTimeMS );
        });
        Promise.all( closePromiseArr ).catch(
          function(e){
            console.log(e);
          }).then( function(){
            resolve(doorArr);
          });
      }, delayCloseMS);
    });
    return p;
  },

  closeDoor: function( door, delayTimeMS ) {
    delayTimeMS = delayTimeMS || 0;
    return new Promise(function(resolve,reject){
      if ( door.isOpen() ) {
        window.setTimeout( function() {
          door.close( function() {
            resolve(door);
          });
        }, delayTimeMS);
      } else {
        resolve(door);
      }
    });
  },

  reopenDoor: function( door, delayTimeMS ) {
    delayTimeMS = delayTimeMS || 0;
    return new Promise(function(resolve,reject){
      window.setTimeout( function() {
        door.open( function() {
          resolve(door);
        });
      }, delayTimeMS);
    });
  },

  keepAliveWhenClosedDoors: function( doorArr ) {
    doorArr.forEach( function(d) {
      d.keepAlive = true;
    });
  }

};

// ---

function Scene_0() {
  //Scene.call(this);
  this.sceneId = 0;
  this.sceneName = 'scene0';
  this.resetPriorityValue = -1;
  this.incPriorityValue = 3;
  this.delayNextSceneMS = 0;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_0.prototype = new Scene();
Scene_0.prototype.constructor = Scene_0;
Scene_0.prototype.start = function() {
  var that = this;
  this.openDoors( 2, 'vertical', 0 ).then(function(dArr) {
    return that.closeDoors(dArr,0,false,true);
  }).then( function(dArr) {
    //that.done();
    var doorReopenedArr = [];
    doorReopenedArr.push( that.reopenDoor( dArr[0], 0 ) );
    doorReopenedArr.push( that.reopenDoor( dArr[1], 1000 ) );
    return Promise.all( doorReopenedArr );
  }).then( function(dArr) {
    that.done(random(10)<5?true:false);
  });
};
// Scene_0.prototype = {
//   start: function() {
//     var that = this;
//     this.openDoors( 2, 'vertical', 0 ).then(function(dArr) {
//       that.done();
//     });
//   }
// };

// ---

function Scene_1() {
  //Scene.call(this);
  this.sceneId = 1;
  this.sceneName = 'scene1';
  this.resetPriorityValue = 0;
  this.incPriorityValue = 1;
  this.delayNextSceneMS = 0;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_1.prototype = new Scene();
Scene_1.prototype.constructor = Scene_1;
Scene_1.prototype.start = function() {
  var that = this;
  this.openDoors( 4, 'horizontal', 0 ).then(function(dArr) {
    that.wait(random(2000,3000)).then(function() {
      that.done(random(10)<5?true:false);
    });
    //that.done(true);
  });
};

// ---

function Scene_2() {
  //Scene.call(this);
  this.sceneId = 2;
  this.sceneName = 'scene2';
  this.resetPriorityValue = -1;
  this.incPriorityValue = 1;
  this.delayNextSceneMS = 0;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_2.prototype = new Scene();
Scene_2.prototype.constructor = Scene_2;
Scene_2.prototype.start = function() {
  var that = this;
  this.openDoors( 3, 'horizontal2', 0 ).then(function(dArr) {
    that.done();
  });
};

// ---

function Scene_3() {
  //Scene.call(this);
  this.sceneId = 3;
  this.sceneName = 'scene3';
  this.resetPriorityValue = 0;
  this.incPriorityValue = 3;
  this.delayNextSceneMS = 0;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_3.prototype = new Scene();
Scene_3.prototype.constructor = Scene_3;
Scene_3.prototype.start = function() {
  var that = this;
  this.openDoors( 1, 'vertical', 0 ).then(function(dArr) {
    that.done(random(10)<5?true:false);
  });
};

// ---

function Scene_4() {
  //Scene.call(this);
  this.sceneId = 4;
  this.sceneName = 'scene4';
  this.resetPriorityValue = -1;
  this.incPriorityValue = 2;
  this.delayNextSceneMS = 0;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_4.prototype = new Scene();
Scene_4.prototype.constructor = Scene_4;
Scene_4.prototype.start = function() {
  var that = this;
  this.openDoors( 1, 'horizontal2', 0 ).then(function(dArr) {
    that.wait(random(1000,4000)).then( function() {
      that.done(random(10)<5?true:false);
    });
  });
};

// ---

function Scene_5() {
  //Scene.call(this);
  this.sceneId = 5;
  this.sceneName = 'scene5';
  this.resetPriorityValue = -1;
  this.incPriorityValue = 1;
  this.delayNextSceneMS = 1000;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_5.prototype = new Scene();
Scene_5.prototype.constructor = Scene_5;
Scene_5.prototype.start = function() {
  var that = this;
  var doorType = 'horizontal2';
  this.openDoors( 10, doorType, 5000, true ).catch(function(err){}).then(function(dArr) {
    that.closeDoors(dArr,1000,true,false,2000).then(function(dArr){
      that.done();
    });
  });
};

// ---

function Scene_6() {
  //Scene.call(this);
  this.sceneId = 6;
  this.sceneName = 'scene6';
  this.resetPriorityValue = -1;
  this.incPriorityValue = 1;
  this.delayNextSceneMS = 0;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_6.prototype = new Scene();
Scene_6.prototype.constructor = Scene_6;
Scene_6.prototype.start = function() {
  var that = this;
  var dArr = [];
  for (var i=0; i<20; i++) {
    dArr.push( this.openCloseNTimes(null, 'vertical', 2000, true, floor(random(4))) );
  }
  // Promise.all(dArr).catch(function(err){}).then( function(doorArr) {
  //   return that.closeDoors( doorArr, 0,false,false,2000 ).then(function(){
  //     return that.wait(2000);
  //   });
  // }).then( function() {
  //   that.done();
  // });
  Promise.all(dArr).catch(function(err){}).then( function(doorArr) {
    return that.closeDoors( doorArr, 0,false,false,2000 );
  }).catch(function(err){
    console.log(err);
  }).then( function() {
    return that.wait(2000);
  }).then( function() {
    that.done();
  });

};
Scene_6.prototype.openCloseNTimes = function(d, doorType, delayTimeMS, randomizeDelay, nTimes) {
  var that = this;
  var p;
  if ( !d ) {
    p = this.openDoor(doorType, randomizeDelay ? random(delayTimeMS) : delayTimeMS);
  } else {
    p = this.reopenDoor(d, randomizeDelay ? random(delayTimeMS) : delayTimeMS);
  }
  return p.then(function(d) {
    if ( nTimes == 0 && random(10) < 5 ) {
      return d; // leave some doors open when their nTimes count gets to zero
    }
    if ( nTimes > 0 ) {
      d.keepAlive = true;
    } else {
      d.keepAlive = false;
    }
    return that.closeDoor(d,randomizeDelay ? random(delayTimeMS) : delayTimeMS).then( function(d) {
      if ( nTimes > 0 ) {
        return that.openCloseNTimes(d,null,delayTimeMS,randomizeDelay,--nTimes);
      } else {
        return d;//Promise.resolve(d);
      }
    });
  });

};

// ---

function Scene_7() {
  //Scene.call(this);
  this.sceneId = 7;
  this.sceneName = 'scene7';
  this.resetPriorityValue = -1;
  this.incPriorityValue = 1;
  this.delayNextSceneMS = 0;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_7.prototype = new Scene();
Scene_7.prototype.constructor = Scene_7;
Scene_7.prototype.start = function() {
  var that = this;
  this.openDoors( 15, null, 0, false ).catch(function(err) {}).then(function(){
    that.wait(random(3000,4000)).then(function(){
      that.done(true);
    })
    //that.done(true);
  });
};

// ---

function Scene_8() {
  //Scene.call(this);
  this.sceneId = 8;
  this.sceneName = 'scene8';
  this.resetPriorityValue = -1;
  this.incPriorityValue = 1;
  this.delayNextSceneMS = 0;
}
///Scene0.prototype = Object.create(Scene.prototype);
Scene_8.prototype = new Scene();
Scene_8.prototype.constructor = Scene_8;
Scene_8.prototype.start = function() {
  var that = this;
  this.openDoorsPattern( 'boxTight', null, 5000, true ).catch(function(){}).then(function( dArr ){
    that.closeDoors( dArr, 2000, true, false, random(2000,4000) ).then(function(){
      that.done();
    });
  });
};

// ---

function Scene_9() {
  this.sceneId = 9;
  this.sceneName = 'scene9';
  this.resetPriorityValue = -1;
  this.incPriorityValue = 1;
  this.delayNextSceneMS = 0;
}
Scene_9.prototype = new Scene();
Scene_9.prototype.constructor = Scene_9;
Scene_9.prototype.start = function() {
  var that = this;
  var gridSizeX = DOOR_WIDTH;
  var gridSizeY = DOOR_HEIGHT;
  var maxCols = doorMgr.calcGridMaxColumns(gridSizeX);
  var minCols = min(3, floor(maxCols/3));
  var maxRows = doorMgr.calcGridMaxRows(gridSizeY);
  var minRows = min(3, floor(maxRows/3));
  var patternDefn = {
    gridSizeX: gridSizeX,
    gridSizeY: gridSizeY,
    maxCols: floor(random(minCols,maxCols+1)),
    maxRows: floor(random(minRows,maxRows+1)),
    hasDoorAt: function( col, row ) {
      if ( col == 0 || row == 0 || col == patternDefn.maxCols-1 || row == patternDefn.maxRows-1 ) {
        return true;
      }
    }
  };
  this.openDoorsPattern( 'custom', null, 5000, true, patternDefn ).catch(function(){}).then(function( dArr ){
    that.closeDoors( dArr, 2000, true, false, random(2000,4000) ).then(function(){
      that.done();
    });
  });
};
