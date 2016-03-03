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

var light1, light4;
var skyBox;

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

  var initialGroundPosY = -45; // -150

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  // var f = 1;
  // camera = new THREE.OrthographicCamera( window.innerWidth /( - 16*f), window.innerWidth / (16*f), window.innerHeight / (16*f), window.innerHeight / - (16*f), -200, 1000 );

  controlAttr = new function () {
    this.groundPosY = initialGroundPosY;//-150;
    this.intensityLight1 = 0.6;
    this.intensityLight4 = 1;
    this.shadowBiasLight4 = 0.5;
    this.showStarField = true;
    this.starFieldRotationSpeed = 0;
    this.changeCameraViewPoint = function() {
      nextCameraPos();
    };
  };
  gui = new dat.GUI();
  gui.add( controlAttr, 'groundPosY', -500, 100 ).onChange(function(v){ ground.position.y = v; });
  gui.add( controlAttr, 'intensityLight1', 0, 1 ).onChange(function(v){ light1.intensity = v; });
  gui.add( controlAttr, 'intensityLight4', 0, 1 ).onChange(function(v){ light4.intensity = v; });
  gui.add( controlAttr, 'shadowBiasLight4', 0, 2 ).onChange(function(v){ light4.shadowBias = v; });
  gui.add( controlAttr, 'showStarField' ).onChange(function(v){ skyBox.visible = !skyBox.visible; });
  gui.add( controlAttr, 'starFieldRotationSpeed', -10, 10 );
  gui.add( controlAttr, 'changeCameraViewPoint' );

  // camera.position.set(-309.1,25.134,-446.843);
  camera.zoom = 1;
  camera.updateProjectionMatrix();
  camera.position.z = 300;
  // var lookAtVec = new THREE.Vector3(0,0,0);
  // camera.lookAt(lookAtVec);

  var geometry = new THREE.BoxGeometry( 800, 0.15, 800 );
  var material = new THREE.MeshPhongMaterial( {
    color: 0xa0adaf,
    shininess: 150,
    specular: 0xffffff,
    shading: THREE.SmoothShading
  } );
  ground = new THREE.Mesh( geometry, material );
  //ground.scale.multiplyScalar( 1 );
  ground.position.set(0,initialGroundPosY,0);
  ground.castShadow = true;
  ground.receiveShadow = true;
  scene.add( ground );

  function addShapes(){
    var size = 3;
    var geometry = new THREE.CylinderGeometry( 0, 10, 30*size, 4, 1 );
    var material =  new THREE.MeshPhongMaterial( {
      shininess: 150,
      specular: 0xffffff,
      color:0x0000ff,
      shading: THREE.FlatShading } );

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

  light1 = new THREE.DirectionalLight( 0xffffff, controlAttr.intensityLight1 );
  light1.position.set( 0, 100, 0 );//.normalize();
  scene.add( light1 );
  //light.castShadow = true;
  // light.shadowCameraNear = 1;
  // light.shadowCameraFar = 1000;
  // light.shadowMapWidth = 1024;
  // light.shadowMapHeight = 1024;
  light1.target = ground;


  light4 = new THREE.PointLight( 0x808080, controlAttr.intensityLight4, 0 );
  light4.castShadow = true;
  light4.shadowBias = controlAttr.shadowBiasLight4;
  light4.shadowCameraNear = 1;
  light4.shadowCameraFar = 1000;
  light4.shadowMapWidth = 1024;
  light4.shadowMapHeight = 1024;
  var sphere = new THREE.SphereGeometry( 10, 16, 8 );
  light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
  light4.position.set(0,100,0);
  scene.add( light4 );
  light4.target = ground;

  ambLight = new THREE.AmbientLight( 0x202020 ); // soft white light
  scene.add( ambLight );

  // ---
  // sky SphereGeometry

  // create a star field algorithmically

  var getStarsTexture = function() {
    var canvas = document.createElement('canvas');
    canvas.width = 4096;//3000;
    canvas.height = 1024;//1000;

    var ctx = canvas.getContext('2d');
    // draw the stars
    for (let i=0; i<500; i++){
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.beginPath();
      ctx.arc(THREE.Math.randInt(0,canvas.width), THREE.Math.randInt(0,canvas.height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // load a texture, set wrap mode to repeat
  // var textureMilkyWay = new THREE.TextureLoader().load( "eso0932a.jpg" );
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set( 4, 4 );

  var geometry = new THREE.SphereGeometry(3000, 60, 40);
  var uniforms = {
    // texture: { type: 't', value: textureMilkyWay }
    texture: { type: 't', value: getStarsTexture() }
  };

  var material = new THREE.ShaderMaterial( {
    uniforms:       uniforms,
    vertexShader:   document.getElementById('sky-vertex').textContent,
    fragmentShader: document.getElementById('sky-fragment').textContent
  });

  skyBox = new THREE.Mesh(geometry, material);
  skyBox.scale.set(-1, 1, 1);
  skyBox.eulerOrder = 'XZY';
  skyBox.renderDepth = 1000.0;
  scene.add(skyBox);

  // ---

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

  var cameraIndex = 0;
  var cameraPosArr = [new THREE.Vector3(0,0,300),new THREE.Vector3(300,0,0),new THREE.Vector3(-300,0,0),new THREE.Vector3(0,300,0)];
  function nextCameraPos() {
    camera.position.copy( cameraPosArr[cameraIndex] );
    cameraIndex += 1;
    cameraIndex %= cameraPosArr.length;
  }

};

init();
animate();

function animate() {
  requestAnimationFrame( animate );
  updateObjects();
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

function updateObjects() {
  skyBox.rotation.x += 0.001 * controlAttr.starFieldRotationSpeed;
}
