import 'babel-polyfill';
import dat from 'dat-gui';
import TWEEN from 'tween.js';

// import world from './world';
//
// document.getElementById('output').innerHTML = `Hello ${world}!`;

var scene, camera, renderer;
var light, ambLight;
var controlAttr, gui, stats;
var ocontrols;
var ground;

var shapeArr = [];
function Shape( mesh ) {
  var shapeSpaceWidth = 300;
  var shapeSpaceHeight = 500;
  function _move() {
    var newPos = mesh.position.clone();
    if ( Math.random() < 0.5 ) {
      newPos.x = (Math.random()-0.5) * shapeSpaceWidth;
    } else {
      newPos.z = (Math.random()-0.5) * shapeSpaceHeight;
    }

    var dur = Math.random()*10000+1000;
    var delayDur = Math.random()*10000;
    var tween = new TWEEN.Tween( mesh.position )
      .delay(delayDur)
      .easing(TWEEN.Easing.Cubic.InOut)
      .to({ x: newPos.x, z: newPos.z }, dur)
      .onComplete(function(){
        _move();
      });
    var newRotationX = (Math.random()-0.5)*(Math.PI*4);
    var tweenRotate = new TWEEN.Tween( mesh.rotation )
      .delay(delayDur)
      .easing(TWEEN.Easing.Cubic.InOut)
      .to({ y: newRotationX }, dur );

    tween.start();
    tweenRotate.start();
  }
  _move();
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  // camera.position.set(-309.1,25.134,-446.843);
  camera.zoom = 1;
  camera.updateProjectionMatrix();
  camera.position.z = 300;
  // var lookAtVec = new THREE.Vector3(0,0,0);
  // camera.lookAt(lookAtVec);

  var geometry = new THREE.BoxGeometry( 400, 0.15, 600 );
  var material = new THREE.MeshPhongMaterial( {
    color: 0xa0adaf,
    shininess: 150,
    specular: 0xffffff,
    shading: THREE.SmoothShading
  } );
  ground = new THREE.Mesh( geometry, material );
  //ground.scale.multiplyScalar( 1 );
  ground.position.set(0,-150,0);
  //ground.castShadow = false;
  ground.receiveShadow = true;
  scene.add( ground );

  function addShapes(){
    var size = 3;
    var geometry = new THREE.CylinderGeometry( 0, 10, 30*size, 4, 1 );
    var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );

    for ( var i = 0; i < 20; i ++ ) {

      var mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = ( Math.random() - 0.5 ) * 300;
      mesh.position.y = 0;//( Math.random() - 0.5 ) * 1000;
      mesh.position.z = ( Math.random() - 0.5 ) * 500;
      //mesh.updateMatrix();
      //mesh.matrixAutoUpdate = false;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      scene.add( mesh );

      shapeArr.push( new Shape(mesh) );


    }
  }
  addShapes();

  light = new THREE.DirectionalLight( 0xffffff, 0.8 );
  light.position.set( 0, 100, 0 );//.normalize();
  scene.add( light );
  //light.castShadow = true;
  light.shadowCameraNear = 1;
  light.shadowCameraFar = 1000;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;

  //light.target = ground;

  var light2 = new THREE.DirectionalLight( 0x0000ff, .8 );
  light2.position.set( 10, 0, 30 );//.normalize();
  scene.add( light2 );

  var light3 = new THREE.DirectionalLight( 0x00ffff, .8 );
  light3.position.set( -50, 0, -100 );//.normalize();
  scene.add( light3 );

  var light4 = new THREE.PointLight( 0x808080, 1, 1000 );
  light4.castShadow = true;
  light4.shadowCameraNear = 1;
  light4.shadowCameraFar = 1000;
  light4.shadowMapWidth = 1024;
  light4.shadowMapHeight = 1024;
  var sphere = new THREE.SphereGeometry( 10, 16, 8 );
  light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
  light4.position.set(0,100,50);
  scene.add( light4 );

  light4.target = ground;


  ambLight = new THREE.AmbientLight( 0x202020, .2 ); // soft white light
  scene.add( ambLight );

  controlAttr = new function () {
    this.speed = 1;
  };
  gui = new dat.GUI();
  gui.add( controlAttr, 'speed', 0, 10 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x000000 );
  renderer.shadowMap.enabled = true;
  //renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.shadowMap.needsUpdate = true;

  document.body.appendChild( renderer.domElement );

  ocontrols = new THREE.OrbitControls( camera, renderer.domElement );
  // ocontrols.target.set( 0, 0, 0 );
  // ocontrols.update();

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild( stats.domElement );

  window.addEventListener( 'resize', onWindowResize, false );

};

init();
animate();

function animate() {
  requestAnimationFrame( animate );
  ocontrols.update();
  TWEEN.update();
  render();
}

function render() {
  renderer.render( scene, camera );
  stats.update();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
