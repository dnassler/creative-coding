
var scene, camera, renderer;
var pcamera, ocamera;
// var geometry, material, mesh;
var controls, stats;
var pcontrols, ocontrols;
var controlAttr;
var clock = new THREE.Clock();
var light1;
var ground;
var gui;

var pArr = [];
var numPlanes = 10;
var planeSeparation = 50;
var lookAtVec = new THREE.Vector3(0,0,-numPlanes*planeSeparation);
var CAMERA_MANUAL = 'manual';
var CAMERA_LIGHT = 'light';
var CAMERA_AUTO = 'auto';
var CAMERA_PRESET_POINT = 'preset-point';
var cameraPresetPoint;
var cameraPresetPointArr = [];

// var lineToLight = new THREE.Line3();
var sound1a;
var sound1Labels;
var sound1Helper;
var sound2, windmillSound;

var SoundHelper = function(soundObj, labelInfoArr) {
  var _self = this;
  this.playClip = function(index){
    var labelInfo;
    if ( labelInfoArr === undefined ) {
      console.log('playClip: play whole file');
      soundObj.play();
    } else {
      if ( index === undefined ) {
        index = Math.floor( Math.random() * labelInfoArr.length );
      }
      labelInfo = labelInfoArr[index];
      console.log('playClip: start='+labelInfo.start+', dur='+(labelInfo.end-labelInfo.start));
      soundObj.jump( labelInfo.start, labelInfo.end - labelInfo.start );
    }
  };
  this.auto = function( delayMin, delayMax ) {
    delayMin = delayMin || 0;
    delayMax = delayMax || 0;
    window.setTimeout(function(){
      var rv = Math.random(2);
      soundObj.setVolume(rv >= 1 ? 1 : rv);
      soundObj.pan(Math.random(2)-1);
      _self.playClip();
      _self.auto( delayMin, delayMax );
    }, delayMin + Math.random()*delayMax );
  };
};


init();
animate();

//x=-309.1
//y=25.134
//z=-446.843
//zoom=0.5133420832795047

//--
//--
// var sketch = function( p ) {
//   p.preload = function() {
//
//   };
//   p.setup = function() {
//     //p.createCanvas(700, 410);
//     p.noLoop();
//   };
//
//   // p.draw = function() {
//   //   p.background(0);
//   //   p.fill(255);
//   //   p.rect(x,y,50,50);
//   // };
// };
//var myp5 = new p5(sketch);
//--
//--

function init() {

    var soundFile;

    soundFile = new p5.SoundFile('333988__reznik-krkovicka__distant-falling-glass-metal.ogg',function(){
      //sound1a.play();
      var labels = [
        {start:0.690575, end:3.418346, id:1},
        {start:6.111589,	end:9.391820,	id:2},
        {start:11.567131,	end:14.916419, id:3},
        {start:18.610996,	end:21.511410, id:4},
        {start:22.098399,	end:25.585803, id:5}
      ];
      sound1Helper = new SoundHelper( soundFile, labels );
      sound1Helper.auto(1000,20000);
    });

    sound2 = new p5.SoundFile('333991__cryanrautha__computer-robot-droid-ambience.ogg',function(){
      sound2.setVolume( 0 );
      sound2.loop();
    });

    windmillSound = new p5.SoundFile('131924__felix-blume__a-windmill-is-squeaking-alone-in-the-desert-usa-arizona.ogg',function(){
      windmillSound.setVolume(0);
      windmillSound.loop();
    });

    scene = new THREE.Scene();

    var f = 1;
    pcamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    //camera = new THREE.OrthographicCamera( window.innerWidth / - 16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / - 16, -200, 1000 );
    ocamera = new THREE.OrthographicCamera( window.innerWidth /( - 16*f), window.innerWidth / (16*f), window.innerHeight / (16*f), window.innerHeight / - (16*f), -200, 1000 );
    //camera = new THREE.OrthographicCamera( window.innerWidth /( - 16*f), window.innerWidth / (16*f), window.innerHeight / (16*f), window.innerHeight / - (16*f), 1, 1000 );

    var w = 100;
    var h = 100;

    var i;
    for ( i=1; i<numPlanes; i++ ) {
      pArr.push( {p:newPlane( w, h, -i*planeSeparation ), rotationSpeedFactor:0, rspeed:(Math.random()*0.01-0.005)} );
    }

    var geometry = new THREE.BoxGeometry( 400, 0.15, 600 );
    var material = new THREE.MeshPhongMaterial( {
      color: 0xa0adaf,
      shininess: 150,
      specular: 0xffffff,
      shading: THREE.SmoothShading
    } );

    ground = new THREE.Mesh( geometry, material );
    //ground.scale.multiplyScalar( 1 );
    ground.position.set(0,-100,-i*planeSeparation/2);
    ground.castShadow = false;
    ground.receiveShadow = true;
    scene.add( ground );

    // geometry = new THREE.PlaneGeometry( 200, 200 );
    // material = new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: false, side: THREE.DoubleSide } );
    //
    // mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );
    //
    // //console.log('plane vertices');
    // var count = 0;
    // geometry.vertices.forEach( function(e) {
    //   //console.log(e);
    //   var nx = e.x + Math.random()*100-50;
    //   var ny = e.y + Math.random()*100-50;
    //   var nz = e.z + Math.random()*100-50;
    //   geometry.vertices[count].set(nx, ny, nz);
    //   count++;
    // });
    // geometry.verticesNeedUpdate = true;

    // scene.fog = new THREE.FogExp2( 0x000000, 0.0035 );
    // light = new THREE.DirectionalLight( 0xffffff );
    // light.position.set( 0, 0.5, 1 ).normalize();
    // scene.add( light );

    var sphere = new THREE.SphereGeometry( 10, 16, 8 );

    //light1 = new THREE.DirectionalLight( 0xffffff, 2 );

    var smf = 1;
    light1 = new THREE.PointLight( 0xffffff, 1, 1000 );
    light1.castShadow = true;
    light1.shadowCameraNear = 1;
    light1.shadowCameraFar = 1000;
    light1.shadowMapWidth = 1024*smf;
    light1.shadowMapHeight = 1024*smf;
    light1.target = ground;
    // light1.shadowBias = 0.01;
    // light1.shadowDarkness = 0.5;

    //light1.shadowCameraNear = 2;
    //light1.shadowCameraFar = 1000;
    //light1.shadowCameraLeft = -50;
    //light1.shadowCameraRight = 50;
    //light1.shadowCameraTop = 50;
    //light1.shadowCameraBottom = -50;
    //light1.shadowCameraVisible = true;


    light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
    light1.position.set(0,100,50);
    scene.add( light1 );
    //scene.add( new THREE.CameraHelper( light1.shadow.camera ) );

    var light = new THREE.AmbientLight( 0x202020 ); // soft white light
    //var light = new THREE.AmbientLight( 0x000000 ); // soft white light
    scene.add( light );

    //x=-309.1
    //y=25.134
    //z=-446.843
    // camera.position.set(-309.1, 25.134, -446.843);
    // // camera.zoom = 0.5133420832795047;
    // //camera.zoom = 0.46767497911552943;
    // camera.zoom = 0.5;
    // camera.updateProjectionMatrix();


    controlAttr = new function () {
        // this.cameraHeight = camera.position.y;
        // this.cameraZ = camera.position.z;
        //this.lightHeight = light1.position.y;
        this.useOrthographicCamera = true;
        this.rotateSpeed = 22;
        //this.cameraFromLight = false;
        // this.cameraPerspective = CAMERA_AUTO;
        this.cameraPerspective = CAMERA_MANUAL;
        this.changeCameraViewPoint = function() {
          cameraPresetPoint = (cameraPresetPoint + 1) % cameraPresetPointArr.length;
          setCameraViewPoint( cameraPresetPoint );
        };
        this.saveCameraViewpoint = function() {
          addCameraViewPoint( camera );
          cameraPesetPoint = cameraPresetPointArr.length - 1;
        };
    };

    gui = new dat.GUI();
    //gui.add( controlAttr, 'lightHeight', 100, 1000);
    gui.add( controlAttr, 'useOrthographicCamera' ).onChange(changeCameraType);
    gui.add( controlAttr, 'rotateSpeed', 1, 50);
    //gui.add( controlAttr, 'cameraFromLight' );
    gui.add( controlAttr, 'cameraPerspective', [CAMERA_MANUAL, CAMERA_LIGHT, CAMERA_AUTO, CAMERA_PRESET_POINT] );
    gui.add( controlAttr, 'changeCameraViewPoint' );
    gui.add( controlAttr, 'saveCameraViewpoint' );
    // gui.add(controlAttr, 'cameraHeight', -300, 1000);
    // gui.add(controlAttr, 'cameraZ', -400, 1000);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000 );
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.shadowMap.needsUpdate = true;



    document.body.appendChild( renderer.domElement );

    // the TrackballControls must be after renderer.domElement is added to the HTML
    // controls = new THREE.TrackballControls( camera, renderer.domElement );
    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;
    // controls.noZoom = false;
    // controls.noPan = false;
    // controls.staticMoving = true;
    // controls.dynamicDampingFactor = 0.3;
    // controls.keys = [ 65, 83, 68 ];
    // controls.addEventListener( 'change', render );

    // Mouse control
    ocontrols = new THREE.OrbitControls( ocamera, renderer.domElement );
    ocontrols.target.set( 0, 0, -numPlanes*planeSeparation/2 );
    ocontrols.update();

    pcontrols = new THREE.OrbitControls( pcamera, renderer.domElement );
    pcontrols.target.set( 0, 0, -numPlanes*planeSeparation/2 );
    pcontrols.update();

    // cameraPresetPointArr = [];
    //cameraPresetPointArr = [{"position":{"x":-365.18549716805717,"y":39.50161639326745,"z":-250.93250492713736},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":0.9941974111223568,"y":-0.10754097281682137,"z":0.0025386968470054736},"useOrthographicCamera":true},{"position":{"x":-303.0902616506488,"y":70.86492235963375,"z":-54.971410617557694},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":0.8251465650171976,"y":-0.19292585413751662,"z":-0.5309545765286776},"useOrthographicCamera":true},{"position":{"x":4.265983595475517,"y":109.9869924191355,"z":100.43738026580081},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":-0.011613905490711283,"y":-0.2994335349084414,"z":-0.9540464817458336},"useOrthographicCamera":true}];
    cameraPresetPointArr = [{"position":{"x":-365.18549716805717,"y":39.50161639326745,"z":-250.93250492713736},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":0.9941974111223568,"y":-0.10754097281682137,"z":0.0025386968470054736},"useOrthographicCamera":true},{"position":{"x":-303.0902616506488,"y":70.86492235963375,"z":-54.971410617557694},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":0.8251465650171976,"y":-0.19292585413751662,"z":-0.5309545765286776},"useOrthographicCamera":true},{"position":{"x":4.265983595475517,"y":109.9869924191355,"z":100.43738026580081},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":-0.011613905490711283,"y":-0.2994335349084414,"z":-0.9540464817458336},"useOrthographicCamera":true},{"position":{"x":-309.09999999999985,"y":25.133999999999983,"z":-446.84299999999996},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":0.8415077363122704,"y":-0.06842593037125246,"z":0.535894224234124},"useOrthographicCamera":true}]

    ocamera.position.set(-309.1,25.134,-446.843);
    ocamera.zoom = 0.25;
    ocamera.updateProjectionMatrix();

    pcamera.position.set(-309.1,25.134,-446.843);
    pcamera.zoom = 1;
    pcamera.updateProjectionMatrix();

    //cameraPresetPointArr.push( {position:new THREE.Vector3(-309.1, 25.134, -446.843), zoom:0.5} );
    cameraPresetPoint = 0;
    //setCameraViewPoint( cameraPresetPoint );

    //camera.aspect = 2.7195467422096318;
    //camera.position.z = 100;
    //camera.position.y = 0;

    ocamera.lookAt( lookAtVec );
    pcamera.lookAt( lookAtVec );

    if ( controlAttr.useOrthographicCamera ) {
      camera = ocamera;
      controls = ocontrols;
    } else {
      camera = pcamera;
      controls = pcontrols;
    }

    //---
    //---

    var listener = new THREE.AudioListener();
    camera.add( listener );

    // var sound2 = new THREE.Audio( listener );
    // sound2.load( '333991__cryanrautha__computer-robot-droid-ambience.mp3' );
    // sound2.setRefDistance( 100 );
    // sound2.autoplay = true;
    // light1.add( sound2 );

    //var sound2 = new THREE.Audio( listener );
    //sound2.load( '333988__reznik-krkovicka__distant-falling-glass-metal.wav' );
    //sound2.setRefDistance( 200 );
    //sound2.autoplay = true;
    //sound2.setLoop(true);
    //ground.add( sound2 );

    //333988__reznik-krkovicka__distant-falling-glass-metal.wav
    //---
    //---

    clock = new THREE.Clock();

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  ocamera.aspect = window.innerWidth / window.innerHeight;
  ocamera.updateProjectionMatrix();
  pcamera.aspect = window.innerWidth / window.innerHeight;
  pcamera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  // dirLightShadowMapViewer.updateForWindowResize();
  // spotLightShadowMapViewer.updateForWindowResize();

}


function animate() {

    requestAnimationFrame( animate );

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;

    //renderer.render( scene, camera );
    //controls.update(clock.getDelta());
    var time = clock.getElapsedTime();

    var minLight1Height = 100;

    light1.position.z = 300 * Math.sin(time*0.2) - 250;
    light1.position.x = 100 * Math.cos(time*0.1);
    light1.position.y = 300 * (Math.cos(time*0.12)+1) + minLight1Height;//controlAttr.lightHeight;

    var distFromMinHeightToLight = light1.position.y - minLight1Height;
    if ( distFromMinHeightToLight < 400 ) {
      var soundVolume = (1 - (distFromMinHeightToLight / 400));
      sound2.setVolume( soundVolume );
    }

    var rspeedFactor;
    var rspeedFactorDeltaFactor;
    var maxRotation = 0;
    pArr.forEach(function(mi){
      //lineToLight.set(light1.position, mi.p.position);
      var distToLight = light1.position.distanceTo( mi.p.position );
      //var distToLight = lineToLight.distance();
      if ( distToLight < 300 ) {
        rspeedFactor = distToLight < 0.1 ? 100 : 10*100*100/(distToLight*distToLight);
        rspeedFactor = rspeedFactor > 100 ? 100 : rspeedFactor;
        rspeedFactorDeltaFactor = 100;
      } else {
        rspeedFactor = 0;
        rspeedFactorDeltaFactor = 500;
      }
      mi.rotationSpeedFactor += (rspeedFactor - mi.rotationSpeedFactor)/rspeedFactorDeltaFactor;
      mi.p.rotation.z += 0.001 * mi.rotationSpeedFactor * controlAttr.rotateSpeed;//mi.rspeed*controlAttr.rotateSpeed * rspeedFactor;
      if ( mi.rotationSpeedFactor > maxRotation ) {
        maxRotation = mi.rotationSpeedFactor;
      }
    });

    var windmillVolume = (1 - (distFromMinHeightToLight / 400));
    if ( maxRotation > 0.1 ) {
      windmillSound.setVolume( maxRotation * windmillVolume );
    } else {
      windmillSound.setVolume( 0 );
    }

    if ( controlAttr.cameraPerspective === CAMERA_LIGHT ) {
      var cameraOffsetX = 200 * Math.sin(time*0.1);
      camera.position.set(light1.position.x+cameraOffsetX, light1.position.y+100, light1.position.z);
      camera.lookAt(controls.target.x, controls.target.y, controls.target.z);
    } else if ( controlAttr.cameraPerspective === CAMERA_AUTO ) {
      var cameraOffsetX = 400 * Math.sin(time*0.25);
      var cameraOffsetY = 150 * (Math.cos(time*0.2)+1) + 100;
      var cameraOffsetZ = 400 * Math.cos(time*0.28);
      camera.position.set( ground.position.x + cameraOffsetX, cameraOffsetY, ground.position.z + cameraOffsetZ );
      camera.lookAt(controls.target.x, controls.target.y, controls.target.z);
    }



    controls.update();


    // camera.position.y = controlAttr.cameraHeight;
    // camera.position.z = controlAttr.cameraZ;
    // camera.lookAt( lookAtVec );

    //camera.lookAt(0,0,-numPlanes*planeSeparation/2);


    render();
}

function render() {
  renderer.render( scene, camera );
  stats.update();
}

// --
/*
[{"position":{"x":-365.18549716805717,"y":39.50161639326745,"z":-250.93250492713736},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":0.9941974111223568,"y":-0.10754097281682137,"z":0.0025386968470054736},"useOrthographicCamera":true},{"position":{"x":-303.0902616506488,"y":70.86492235963375,"z":-54.971410617557694},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":0.8251465650171976,"y":-0.19292585413751662,"z":-0.5309545765286776},"useOrthographicCamera":true},{"position":{"x":4.265983595475517,"y":109.9869924191355,"z":100.43738026580081},"zoom":0.25,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":-0.011613905490711283,"y":-0.2994335349084414,"z":-0.9540464817458336},"useOrthographicCamera":true},{"position":{"x":-309.09999999999985,"y":25.133999999999983,"z":-446.84299999999996},"zoom":0.4395217289776565,"lookAt":{"x":0,"y":0,"z":-250},"lookDir":{"x":0.8415077363122704,"y":-0.06842593037125246,"z":0.535894224234124},"useOrthographicCamera":true}]
*/
function newPlane(w, h, z) {

  var geometry, material, mesh;

  z = z || 0;

  //geometry = new THREE.PlaneGeometry( w, h );
  geometry = new THREE.BoxGeometry(w,h,w/10);
  material = new THREE.MeshPhongMaterial( {
    color: 0xff0000,
    shininess: 50,
    specular: 0x222222,
    //side: THREE.DoubleSide, ******
    // shading: THREE.FlatShading

    // color: 0x156289,
    // emissive: 0x072534,
    // wireframe: false,
    // side: THREE.DoubleSide,
    // shading: THREE.FlatShading,
    // transparent: false,
    // opacity: 0.2
   } );
  //  material = new THREE.MeshLambertMaterial( {
  //    color: Math.random()*0xffffff,
  //    wireframe: false,
  //    side: THREE.DoubleSide,
  //    transparent: false,
  //    opacity: 0.2
  //   } );


  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = z;
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add( mesh );

  //console.log('plane vertices');
  var distortAmt = w/10;
  var count = 0;
  geometry.vertices.forEach( function(e) {
    //console.log(e);
    var nx = e.x + Math.random()*distortAmt-distortAmt/2;
    var ny = e.y + Math.random()*distortAmt-distortAmt/2;
    var nz = e.z;// + Math.random()*distortAmt-distortAmt/2;
    geometry.vertices[count].set(nx, ny, nz);
    count++;
  });
  geometry.verticesNeedUpdate = true;

  return mesh;
}

function addCameraViewPoint( camera ) {
  // cameraPresetPointArr.push( {matrix: camera.matrixWorldInverse.clone()} );
  cameraPresetPointArr.push( {
    position: camera.position.clone(),
    zoom: camera.zoom,
    lookAt: controls.center.clone(),
    lookDir: camera.getWorldDirection(),
    useOrthographicCamera: controlAttr.useOrthographicCamera
  });

  console.log('new camera preset point saved');
  console.log( cameraPresetPointArr );
  console.log( JSON.stringify(cameraPresetPointArr) );
}

function setCameraViewPoint( presetPointIndex ) {
  var presetPointInfo = cameraPresetPointArr[ presetPointIndex ];
  if ( !presetPointInfo ) {
    return;
  }
  //Serializing:
  // var cameraState = JSON.stringify(camera.matrix.toArray());
  // // ... store cameraState somehow ...
  // Unserializing:
  // // ... read cameraState somehow ...
  // camera.matrix.fromArray(JSON.parse(cameraState));
  // // Get back position/rotation/scale attributes, couldn't find a better method for this
  // camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);

  if ( controlAttr.useOrthographicCamera !== presetPointInfo.useOrthographicCamera ) {
    changeCameraType( presetPointInfo.useOrthographicCamera );
    controlAttr.useOrthographicCamera = presetPointInfo.useOrthographicCamera;
    gui.__controllers[0].updateDisplay();
  }
  camera.position.copy( presetPointInfo.position );
  camera.zoom = presetPointInfo.zoom;

  //camera.lookAt( point );

  // camera.matrixWorldInverse.copy( presetPointInfo.matrix );
  // camera.matrixWorldInverse.decompose(camera.position, camera.quaternion, camera.scale);
  camera.updateProjectionMatrix();

  var point = presetPointInfo.lookAt;//camera.position.add(presetPointInfo.lookAt);
  controls.center.copy( point );
  controls.update();
}

function changeCameraType( useOrthographicCamera ) {
  var p = camera.position.clone();
  //var z = camera.zoom;
  var c = controls.center;
  camera = useOrthographicCamera ? ocamera : pcamera;
  controls = useOrthographicCamera ? ocontrols : pcontrols;
  camera.position.copy(p);
  camera.lookAt( c );
  //camera.zoom = z;
  camera.updateProjectionMatrix();

  controls.update();
}
