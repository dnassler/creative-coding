/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _datGui = __webpack_require__(286);
	
	var _datGui2 = _interopRequireDefault(_datGui);
	
	var _tween = __webpack_require__(289);
	
	var _tween2 = _interopRequireDefault(_tween);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import world from './world';
	//
	// document.getElementById('output').innerHTML = `Hello ${world}!`;
	
	var scene, camera, renderer;
	var light, ambLight;
	var controlAttr, gui, stats;
	var ocontrols;
	var ground;
	
	var light4, light5, light6, light7, light8;
	
	var shapeArr = [];
	function Shape(mesh) {
	  var shapeSpaceWidth = 300;
	  var shapeSpaceHeight = 500;
	  function _move() {
	    var newPos = mesh.position.clone();
	    if (Math.random() < 0.5) {
	      newPos.x = (Math.random() - 0.5) * shapeSpaceWidth;
	    } else {
	      newPos.z = (Math.random() - 0.5) * shapeSpaceHeight;
	    }
	
	    var dur = Math.random() * 10000 + 1000;
	    var delayDur = Math.random() * 10000;
	    var tween = new _tween2.default.Tween(mesh.position).delay(delayDur).easing(_tween2.default.Easing.Cubic.InOut).to({ x: newPos.x, z: newPos.z }, dur).onComplete(function () {
	      _move();
	    });
	    var newRotationX = (Math.random() - 0.5) * (Math.PI * 4);
	    var tweenRotate = new _tween2.default.Tween(mesh.rotation).delay(delayDur).easing(_tween2.default.Easing.Cubic.InOut).to({ y: newRotationX }, dur);
	
	    tween.start();
	    tweenRotate.start();
	  }
	  _move();
	}
	
	function init() {
	
	  var initialGroundPosY = -45; // -150
	
	  scene = new THREE.Scene();
	
	  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	  // var f = 1;
	  // camera = new THREE.OrthographicCamera( window.innerWidth /( - 16*f), window.innerWidth / (16*f), window.innerHeight / (16*f), window.innerHeight / - (16*f), -200, 1000 );
	
	  // camera.position.set(-309.1,25.134,-446.843);
	  camera.zoom = 1;
	  camera.updateProjectionMatrix();
	  camera.position.z = 300;
	  // var lookAtVec = new THREE.Vector3(0,0,0);
	  // camera.lookAt(lookAtVec);
	
	  var geometry = new THREE.BoxGeometry(800, 0.15, 800);
	  var material = new THREE.MeshPhongMaterial({
	    color: 0xa0adaf,
	    shininess: 150,
	    specular: 0xffffff,
	    shading: THREE.SmoothShading
	  });
	  ground = new THREE.Mesh(geometry, material);
	  //ground.scale.multiplyScalar( 1 );
	  ground.position.set(0, initialGroundPosY, 0);
	  ground.castShadow = true;
	  ground.receiveShadow = true;
	  scene.add(ground);
	
	  function addShapes() {
	    var size = 3;
	    var geometry = new THREE.CylinderGeometry(0, 10, 30 * size, 4, 1);
	    var material = new THREE.MeshPhongMaterial({
	      shininess: 150,
	      specular: 0xffffff,
	      color: 0x0000ff,
	      shading: THREE.FlatShading });
	
	    for (var i = 0; i < 20; i++) {
	
	      var mesh = new THREE.Mesh(geometry, material);
	      mesh.position.x = (Math.random() - 0.5) * 300;
	      mesh.position.y = 0; //( Math.random() - 0.5 ) * 1000;
	      mesh.position.z = (Math.random() - 0.5) * 500;
	      //mesh.updateMatrix();
	      //mesh.matrixAutoUpdate = false;
	      mesh.castShadow = true;
	      mesh.receiveShadow = true;
	
	      scene.add(mesh);
	
	      shapeArr.push(new Shape(mesh));
	    }
	  }
	  addShapes();
	
	  light = new THREE.DirectionalLight(0xffffff, 1);
	  light.position.set(0, 100, 0); //.normalize();
	  scene.add(light);
	  //light.castShadow = true;
	  // light.shadowCameraNear = 1;
	  // light.shadowCameraFar = 1000;
	  // light.shadowMapWidth = 1024;
	  // light.shadowMapHeight = 1024;
	  light.target = ground;
	
	  //var light2 = new THREE.DirectionalLight( 0x0000ff, .8 );
	  //light2.position.set( 10, 0, 30 );//.normalize();
	  // light2.castShadow = true;
	  // light2.shadowCameraNear = 1;
	  // light2.shadowCameraFar = 1000;
	  // light2.shadowMapWidth = 1024;
	  // light2.shadowMapHeight = 1024;
	  //scene.add( light2 );
	
	  //var light3 = new THREE.DirectionalLight( 0x00ffff, .8 );
	  //light3.position.set( -50, 0, -100 );//.normalize();
	  // light3.castShadow = true;
	  // light3.shadowCameraNear = 1;
	  // light3.shadowCameraFar = 1000;
	  // light3.shadowMapWidth = 1024;
	  // light3.shadowMapHeight = 1024;
	  //scene.add( light3 );
	
	  light4 = new THREE.PointLight(0x808080, 1, 0);
	  //light4 = new THREE.SpotLight( 0x808080, 1, 0 );
	  light4.castShadow = true;
	  light4.shadowCameraNear = 1;
	  light4.shadowCameraFar = 1000;
	  light4.shadowMapWidth = 1024;
	  light4.shadowMapHeight = 1024;
	  //light4.distance = 0;
	  var sphere = new THREE.SphereGeometry(10, 16, 8);
	  light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff })));
	  light4.position.set(0, 100, 0);
	  scene.add(light4);
	  light4.target = ground;
	
	  // light5 = new THREE.PointLight( 0x808080, 1, 1000 );
	  // light5.castShadow = true;
	  // light5.shadowCameraNear = 1;
	  // light5.shadowCameraFar = 1000;
	  // light5.shadowMapWidth = 1024;
	  // light5.shadowMapHeight = 1024;
	  // //var sphere = new THREE.SphereGeometry( 10, 16, 8 );
	  // light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	  // light5.position.set(-200,100,-200);
	  // //scene.add( light5 );
	  // light5.target = ground;
	
	  // light6 = new THREE.PointLight( 0x808080, 1, 1000 );
	  // light6.castShadow = true;
	  // light6.shadowCameraNear = 1;
	  // light6.shadowCameraFar = 1000;
	  // light6.shadowMapWidth = 1024;
	  // light6.shadowMapHeight = 1024;
	  // //var sphere = new THREE.SphereGeometry( 10, 16, 8 );
	  // light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	  // light6.position.set(200,100,-200);
	  // //scene.add( light6 );
	  // light6.target = ground;
	
	  // light7 = new THREE.PointLight( 0x808080, 1, 1000 );
	  // light7.castShadow = true;
	  // light7.shadowCameraNear = 1;
	  // light7.shadowCameraFar = 1000;
	  // light7.shadowMapWidth = 1024;
	  // light7.shadowMapHeight = 1024;
	  // //var sphere = new THREE.SphereGeometry( 10, 16, 8 );
	  // light7.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	  // light7.position.set(200,100,200);
	  // //scene.add( light7 );
	  // light7.target = ground;
	
	  // light8 = new THREE.PointLight( 0x808080, 1, 1000 );
	  // light8.castShadow = true;
	  // light8.shadowCameraNear = 1;
	  // light8.shadowCameraFar = 1000;
	  // light8.shadowMapWidth = 1024;
	  // light8.shadowMapHeight = 1024;
	  // //var sphere = new THREE.SphereGeometry( 10, 16, 8 );
	  // light8.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	  // light8.position.set(-200,100,200);
	  // //scene.add( light8 );
	  // light8.target = ground;
	
	  ambLight = new THREE.AmbientLight(0x202020, .2); // soft white light
	  scene.add(ambLight);
	
	  controlAttr = new function () {
	    this.groundPosY = initialGroundPosY; //-150;
	    this.changeCameraViewPoint = function () {
	      nextCameraPos();
	    };
	  }();
	  gui = new _datGui2.default.GUI();
	  gui.add(controlAttr, 'groundPosY', -500, 100).onChange(function (v) {
	    ground.position.y = v;
	  });
	  gui.add(controlAttr, 'changeCameraViewPoint');
	
	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	  renderer.setClearColor(0x000000);
	  renderer.shadowMap.enabled = true;
	  //renderer.shadowMap.type = THREE.BasicShadowMap;
	  renderer.shadowMap.needsUpdate = true;
	
	  document.body.appendChild(renderer.domElement);
	
	  ocontrols = new THREE.OrbitControls(camera, renderer.domElement);
	  // ocontrols.target.set( 0, 0, 0 );
	  // ocontrols.update();
	
	  stats = new Stats();
	  stats.domElement.style.position = 'absolute';
	  stats.domElement.style.left = '0px';
	  stats.domElement.style.top = '0px';
	  document.body.appendChild(stats.domElement);
	
	  window.addEventListener('resize', onWindowResize, false);
	
	  var cameraIndex = 0;
	  var cameraPosArr = [new THREE.Vector3(0, 0, 300), new THREE.Vector3(300, 0, 0), new THREE.Vector3(-300, 0, 0), new THREE.Vector3(0, 300, 0)];
	  function nextCameraPos() {
	    camera.position.copy(cameraPosArr[cameraIndex]);
	    cameraIndex += 1;
	    cameraIndex %= cameraPosArr.length;
	  }
	};
	
	init();
	animate();
	
	function animate() {
	  requestAnimationFrame(animate);
	  ocontrols.update();
	  _tween2.default.update();
	  render();
	}
	
	function render() {
	  renderer.render(scene, camera);
	  stats.update();
	}
	
	function onWindowResize() {
	  camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* eslint max-len: 0 */
	
	"use strict";
	
	var _Object$defineProperty = __webpack_require__(2)["default"];
	
	__webpack_require__(5);
	
	__webpack_require__(281);
	
	// Should be removed in the next major release:
	
	__webpack_require__(283);
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	function define(O, key, value) {
	  O[key] || _Object$defineProperty(O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}
	
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(58);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(71);
	__webpack_require__(73);
	__webpack_require__(75);
	__webpack_require__(77);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	__webpack_require__(86);
	__webpack_require__(88);
	__webpack_require__(90);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(103);
	__webpack_require__(104);
	__webpack_require__(105);
	__webpack_require__(107);
	__webpack_require__(108);
	__webpack_require__(109);
	__webpack_require__(111);
	__webpack_require__(112);
	__webpack_require__(113);
	__webpack_require__(115);
	__webpack_require__(116);
	__webpack_require__(117);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(122);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(127);
	__webpack_require__(128);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(140);
	__webpack_require__(141);
	__webpack_require__(143);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(148);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(185);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(191);
	__webpack_require__(193);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(208);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(232);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(247);
	__webpack_require__(249);
	__webpack_require__(250);
	__webpack_require__(251);
	__webpack_require__(252);
	__webpack_require__(253);
	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(259);
	__webpack_require__(260);
	__webpack_require__(261);
	__webpack_require__(262);
	__webpack_require__(263);
	__webpack_require__(264);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(268);
	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(272);
	__webpack_require__(273);
	__webpack_require__(274);
	__webpack_require__(275);
	__webpack_require__(276);
	__webpack_require__(279);
	__webpack_require__(280);
	module.exports = __webpack_require__(8);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(7)
	  , core           = __webpack_require__(8)
	  , has            = __webpack_require__(9)
	  , DESCRIPTORS    = __webpack_require__(10)
	  , $export        = __webpack_require__(12)
	  , redefine       = __webpack_require__(21)
	  , META           = __webpack_require__(25).KEY
	  , $fails         = __webpack_require__(11)
	  , shared         = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(27)
	  , uid            = __webpack_require__(22)
	  , wks            = __webpack_require__(28)
	  , keyOf          = __webpack_require__(29)
	  , enumKeys       = __webpack_require__(42)
	  , isArray        = __webpack_require__(45)
	  , anObject       = __webpack_require__(15)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(19)
	  , createDesc     = __webpack_require__(20)
	  , _create        = __webpack_require__(46)
	  , gOPNExt        = __webpack_require__(49)
	  , $GOPD          = __webpack_require__(51)
	  , $DP            = __webpack_require__(14)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , ObjectProto    = Object.prototype
	  , USE_NATIVE     = typeof $Symbol == 'function';
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = gOPD(it = toIObject(it), key = toPrimitive(key, true));
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , replacer, $replacer;
	  while(arguments.length > i)args.push(arguments[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var BUGGY_JSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(44).f  = $propertyIsEnumerable
	  __webpack_require__(43).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(52)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	for(var symbols = (
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; ){
	  var key     = symbols[i++]
	    , Wrapper = core.Symbol
	    , sym     = wks(key);
	  if(!(key in Wrapper))dP(Wrapper, key, {value: USE_NATIVE ? sym : wrap(sym)});
	};
	
	setter = true;
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || BUGGY_JSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.1.3'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(11)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , hide      = __webpack_require__(13)
	  , redefine  = __webpack_require__(21)
	  , ctx       = __webpack_require__(23)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(10) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(15)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(10) && !__webpack_require__(11)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , hide      = __webpack_require__(13)
	  , has       = __webpack_require__(9)
	  , SRC       = __webpack_require__(22)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(8).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 22 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(24);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(22)('meta')
	  , isObject = __webpack_require__(16)
	  , has      = __webpack_require__(9)
	  , setDesc  = __webpack_require__(14).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(11)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(14).f
	  , has = __webpack_require__(9)
	  , TAG = __webpack_require__(28)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(26)('wks')
	  , uid        = __webpack_require__(22)
	  , Symbol     = __webpack_require__(7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(31)
	  , enumBugKeys = __webpack_require__(41);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(9)
	  , toIObject    = __webpack_require__(32)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(26)('keys')
	  , uid    = __webpack_require__(22);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(30)
	  , gOPS    = __webpack_require__(43)
	  , pIE     = __webpack_require__(44);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 44 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(15)
	  , dPs         = __webpack_require__(47)
	  , enumBugKeys = __webpack_require__(41)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(48).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(14)
	  , anObject = __webpack_require__(15)
	  , getKeys  = __webpack_require__(30);
	
	module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).document && document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32)
	  , gOPN      = __webpack_require__(50).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN.f(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(31)
	  , hiddenKeys = __webpack_require__(41).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(44)
	  , createDesc     = __webpack_require__(20)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(19)
	  , has            = __webpack_require__(9)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(46)});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(10), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(10), 'Object', {defineProperties: __webpack_require__(47)});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(32)
	  , $getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	__webpack_require__(57)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(12)
	  , core    = __webpack_require__(8)
	  , fails   = __webpack_require__(11);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(59)
	  , $getPrototypeOf = __webpack_require__(60);
	
	__webpack_require__(57)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(9)
	  , toObject    = __webpack_require__(59)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(59)
	  , $keys    = __webpack_require__(30);
	
	__webpack_require__(57)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(57)('getOwnPropertyNames', function(){
	  return __webpack_require__(49).f;
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(16)
	  , meta     = __webpack_require__(25).onFreeze;
	
	__webpack_require__(57)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(16)
	  , meta     = __webpack_require__(25).onFreeze;
	
	__webpack_require__(57)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(16)
	  , meta     = __webpack_require__(25).onFreeze;
	
	__webpack_require__(57)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(16);
	
	__webpack_require__(57)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(16);
	
	__webpack_require__(57)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(16);
	
	__webpack_require__(57)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(12);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(70)});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(30)
	  , gOPS     = __webpack_require__(43)
	  , pIE      = __webpack_require__(44)
	  , toObject = __webpack_require__(59)
	  , IObject  = __webpack_require__(33);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(11)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(12);
	$export($export.S, 'Object', {is: __webpack_require__(72)});

/***/ },
/* 72 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(12);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(74).set});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(16)
	  , anObject = __webpack_require__(15);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(23)(Function.call, __webpack_require__(51).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(76)
	  , test    = {};
	test[__webpack_require__(28)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(21)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(28)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(12);
	
	$export($export.P, 'Function', {bind: __webpack_require__(78)});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(24)
	  , isObject   = __webpack_require__(16)
	  , invoke     = __webpack_require__(79)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14).f
	  , createDesc = __webpack_require__(20)
	  , has        = __webpack_require__(9)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(10) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = ('' + this).match(nameRE)
	      , name  = match ? match[1] : '';
	    has(this, NAME) || dP(this, NAME, createDesc(5, name));
	    return name;
	  }
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObject       = __webpack_require__(16)
	  , getPrototypeOf = __webpack_require__(60)
	  , HAS_INSTANCE   = __webpack_require__(28)('hasInstance')
	  , FunctionProto  = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(14).f(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(12)
	  , $parseInt = __webpack_require__(83);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(7).parseInt
	  , $trim     = __webpack_require__(84).trim
	  , ws        = __webpack_require__(85)
	  , hex       = /^[\-+]?0[xX]/;
	
	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12)
	  , defined = __webpack_require__(35)
	  , fails   = __webpack_require__(11)
	  , spaces  = __webpack_require__(85)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(12)
	  , $parseFloat = __webpack_require__(87);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(7).parseFloat
	  , $trim       = __webpack_require__(84).trim;
	
	module.exports = 1 / $parseFloat(__webpack_require__(85) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(7)
	  , has               = __webpack_require__(9)
	  , cof               = __webpack_require__(34)
	  , inheritIfRequired = __webpack_require__(89)
	  , toPrimitive       = __webpack_require__(19)
	  , fails             = __webpack_require__(11)
	  , gOPN              = __webpack_require__(50).f
	  , gOPD              = __webpack_require__(51).f
	  , dP                = __webpack_require__(14).f
	  , $trim             = __webpack_require__(84).trim
	  , NUMBER            = 'Number'
	  , $Number           = global[NUMBER]
	  , Base              = $Number
	  , proto             = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF        = cof(__webpack_require__(46)(proto)) == NUMBER
	  , TRIM              = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for(var keys = __webpack_require__(10) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++){
	    if(has(Base, key = keys[j]) && !has($Number, key)){
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(21)(global, NUMBER, $Number);
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(16)
	  , setPrototypeOf = __webpack_require__(74).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(12)
	  , anInstance   = __webpack_require__(91)
	  , toInteger    = __webpack_require__(38)
	  , aNumberValue = __webpack_require__(92)
	  , repeat       = __webpack_require__(93)
	  , $toFixed     = 1..toFixed
	  , floor        = Math.floor
	  , data         = [0, 0, 0, 0, 0, 0]
	  , ERROR        = 'Number.toFixed: incorrect invocation!'
	  , ZERO         = '0';
	
	var multiply = function(n, c){
	  var i  = -1
	    , c2 = c;
	  while(++i < 6){
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function(n){
	  var i = 6
	    , c = 0;
	  while(--i >= 0){
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function(){
	  var i = 6
	    , s = '';
	  while(--i >= 0){
	    if(s !== '' || i === 0 || data[i] !== 0){
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function(x, n, acc){
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function(x){
	  var n  = 0
	    , x2 = x;
	  while(x2 >= 4096){
	    n += 12;
	    x2 /= 4096;
	  }
	  while(x2 >= 2){
	    n  += 1;
	    x2 /= 2;
	  } return n;
	};
	
	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128..toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(11)(function(){
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits){
	    var x = aNumberValue(this, ERROR)
	      , f = toInteger(fractionDigits)
	      , s = ''
	      , m = ZERO
	      , e, z, j, k;
	    if(f < 0 || f > 20)throw RangeError(ERROR);
	    if(x != x)return 'NaN';
	    if(x <= -1e21 || x >= 1e21)return String(x);
	    if(x < 0){
	      s = '-';
	      x = -x;
	    }
	    if(x > 1e-21){
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if(e > 0){
	        multiply(0, z);
	        j = f;
	        while(j >= 7){
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while(j >= 23){
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if(f > 0){
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(34);
	module.exports = function(it, msg){
	  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(35);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(12)
	  , $fails       = __webpack_require__(11)
	  , aNumberValue = __webpack_require__(92)
	  , $toPrecision = 1..toPrecision;
	
	$export($export.P + $export.F * ($fails(function(){
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function(){
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision){
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
	  }
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(12)
	  , _isFinite = __webpack_require__(7).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(98)});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(16)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(12)
	  , isInteger = __webpack_require__(98)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(12)
	  , $parseFloat = __webpack_require__(87);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(12)
	  , $parseInt = __webpack_require__(83);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(12)
	  , log1p   = __webpack_require__(106)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
	$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 106 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(12);
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	$export($export.S, 'Math', {asinh: asinh});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(12)
	  , sign    = __webpack_require__(110);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(12)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {expm1: __webpack_require__(114)});

/***/ },
/* 114 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	module.exports = Math.expm1 || function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(12)
	  , sign      = __webpack_require__(110)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(12)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(12)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(11)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(106)});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {sign: __webpack_require__(110)});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(12)
	  , expm1   = __webpack_require__(114)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(11)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(12)
	  , expm1   = __webpack_require__(114)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(12)
	  , toIndex        = __webpack_require__(39)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(12)
	  , toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(84)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(129)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(130)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(52)
	  , $export        = __webpack_require__(12)
	  , redefine       = __webpack_require__(21)
	  , hide           = __webpack_require__(13)
	  , has            = __webpack_require__(9)
	  , Iterators      = __webpack_require__(131)
	  , $iterCreate    = __webpack_require__(132)
	  , setToStringTag = __webpack_require__(27)
	  , getPrototypeOf = __webpack_require__(60)
	  , ITERATOR       = __webpack_require__(28)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(46)
	  , descriptor     = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(27)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(13)(IteratorPrototype, __webpack_require__(28)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $at     = __webpack_require__(129)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(12)
	  , toLength  = __webpack_require__(37)
	  , context   = __webpack_require__(135)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(137)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(136)
	  , defined  = __webpack_require__(35);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(16)
	  , cof      = __webpack_require__(34)
	  , MATCH    = __webpack_require__(28)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(28)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(12)
	  , context  = __webpack_require__(135)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(137)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(93)
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(12)
	  , toLength    = __webpack_require__(37)
	  , context     = __webpack_require__(135)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(137)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(142)('anchor', function(createHTML){
	  return function anchor(name){
	    return createHTML(this, 'a', 'name', name);
	  }
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12)
	  , fails   = __webpack_require__(11)
	  , defined = __webpack_require__(35)
	  , quot    = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function(string, tag, attribute, value) {
	  var S  = String(defined(string))
	    , p1 = '<' + tag;
	  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function(NAME, exec){
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function(){
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()
	__webpack_require__(142)('big', function(createHTML){
	  return function big(){
	    return createHTML(this, 'big', '', '');
	  }
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()
	__webpack_require__(142)('blink', function(createHTML){
	  return function blink(){
	    return createHTML(this, 'blink', '', '');
	  }
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()
	__webpack_require__(142)('bold', function(createHTML){
	  return function bold(){
	    return createHTML(this, 'b', '', '');
	  }
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(142)('fixed', function(createHTML){
	  return function fixed(){
	    return createHTML(this, 'tt', '', '');
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(142)('fontcolor', function(createHTML){
	  return function fontcolor(color){
	    return createHTML(this, 'font', 'color', color);
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(142)('fontsize', function(createHTML){
	  return function fontsize(size){
	    return createHTML(this, 'font', 'size', size);
	  }
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()
	__webpack_require__(142)('italics', function(createHTML){
	  return function italics(){
	    return createHTML(this, 'i', '', '');
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(142)('link', function(createHTML){
	  return function link(url){
	    return createHTML(this, 'a', 'href', url);
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()
	__webpack_require__(142)('small', function(createHTML){
	  return function small(){
	    return createHTML(this, 'small', '', '');
	  }
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()
	__webpack_require__(142)('strike', function(createHTML){
	  return function strike(){
	    return createHTML(this, 'strike', '', '');
	  }
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()
	__webpack_require__(142)('sub', function(createHTML){
	  return function sub(){
	    return createHTML(this, 'sub', '', '');
	  }
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()
	__webpack_require__(142)('sup', function(createHTML){
	  return function sup(){
	    return createHTML(this, 'sup', '', '');
	  }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Date', {now: function(){ return +new Date; }});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING];
	if(new Date(NaN) + '' != INVALID_DATE){
	  __webpack_require__(21)(DateProto, TO_STRING, function toString(){
	    var value = +this;
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(12)
	  , fails   = __webpack_require__(11);
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(this))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export     = __webpack_require__(12)
	  , toObject    = __webpack_require__(59)
	  , toPrimitive = __webpack_require__(19);
	
	$export($export.P + $export.F * __webpack_require__(11)(function(){
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key){
	    var O  = toObject(this)
	      , pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Array', {isArray: __webpack_require__(45)});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(23)
	  , $export     = __webpack_require__(12)
	  , toObject    = __webpack_require__(59)
	  , call        = __webpack_require__(161)
	  , isArrayIter = __webpack_require__(162)
	  , toLength    = __webpack_require__(37)
	  , getIterFn   = __webpack_require__(163);
	$export($export.S + $export.F * !__webpack_require__(164)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(15);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(131)
	  , ITERATOR   = __webpack_require__(28)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(76)
	  , ITERATOR  = __webpack_require__(28)('iterator')
	  , Iterators = __webpack_require__(131);
	module.exports = __webpack_require__(8).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(28)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(11)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)result[index] = arguments[index++];
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	var $export   = __webpack_require__(12)
	  , toIObject = __webpack_require__(32)
	  , arrayJoin = [].join;
	
	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(33) != Object || !__webpack_require__(167)(arrayJoin)), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(11);
	
	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export    = __webpack_require__(12)
	  , html       = __webpack_require__(48)
	  , cof        = __webpack_require__(34)
	  , toIndex    = __webpack_require__(39)
	  , toLength   = __webpack_require__(37)
	  , arraySlice = [].slice;
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(11)(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(12)
	  , aFunction = __webpack_require__(24)
	  , toObject  = __webpack_require__(59)
	  , fails     = __webpack_require__(11)
	  , $sort     = [].sort
	  , test      = [1, 2, 3];
	
	$export($export.P + $export.F * (fails(function(){
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function(){
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(167)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn){
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(12)
	  , $forEach = __webpack_require__(171)(0)
	  , STRICT   = __webpack_require__(167)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(23)
	  , IObject  = __webpack_require__(33)
	  , toObject = __webpack_require__(59)
	  , toLength = __webpack_require__(37)
	  , asc      = __webpack_require__(172);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(16)
	  , isArray  = __webpack_require__(45)
	  , SPECIES  = __webpack_require__(28)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $map    = __webpack_require__(171)(1);
	
	$export($export.P + $export.F * !__webpack_require__(167)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */){
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $filter = __webpack_require__(171)(2);
	
	$export($export.P + $export.F * !__webpack_require__(167)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */){
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $some   = __webpack_require__(171)(3);
	
	$export($export.P + $export.F * !__webpack_require__(167)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $every  = __webpack_require__(171)(4);
	
	$export($export.P + $export.F * !__webpack_require__(167)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $reduce = __webpack_require__(178);
	
	$export($export.P + $export.F * !__webpack_require__(167)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(24)
	  , toObject  = __webpack_require__(59)
	  , IObject   = __webpack_require__(33)
	  , toLength  = __webpack_require__(37);
	
	module.exports = function(that, callbackfn, aLen, memo, isRight){
	  aFunction(callbackfn);
	  var O      = toObject(that)
	    , self   = IObject(O)
	    , length = toLength(O.length)
	    , index  = isRight ? length - 1 : 0
	    , i      = isRight ? -1 : 1;
	  if(aLen < 2)for(;;){
	    if(index in self){
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if(isRight ? index < 0 : length <= index){
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $reduce = __webpack_require__(178);
	
	$export($export.P + $export.F * !__webpack_require__(167)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(12)
	  , $indexOf = __webpack_require__(36)(false);
	
	$export($export.P + $export.F * !__webpack_require__(167)([].indexOf), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(12)
	  , toIObject = __webpack_require__(32)
	  , toInteger = __webpack_require__(38)
	  , toLength  = __webpack_require__(37);
	
	$export($export.P + $export.F * !__webpack_require__(167)([].lastIndexOf), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
	    if(index < 0)index = length + index;
	    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index;
	    return -1;
	  }
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(12);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(183)});
	
	__webpack_require__(184)('copyWithin');

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(59)
	  , toIndex  = __webpack_require__(39)
	  , toLength = __webpack_require__(37);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(28)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(13)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(12);
	
	$export($export.P, 'Array', {fill: __webpack_require__(186)});
	
	__webpack_require__(184)('fill');

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(59)
	  , toIndex  = __webpack_require__(39)
	  , toLength = __webpack_require__(37);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(12)
	  , $find   = __webpack_require__(171)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(184)(KEY);

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(12)
	  , $find   = __webpack_require__(171)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(184)(KEY);

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(190)('Array');

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(7)
	  , dP          = __webpack_require__(14)
	  , DESCRIPTORS = __webpack_require__(10)
	  , SPECIES     = __webpack_require__(28)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(184)
	  , step             = __webpack_require__(192)
	  , Iterators        = __webpack_require__(131)
	  , toIObject        = __webpack_require__(32);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(130)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 192 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var global            = __webpack_require__(7)
	  , inheritIfRequired = __webpack_require__(89)
	  , dP                = __webpack_require__(14).f
	  , gOPN              = __webpack_require__(50).f
	  , isRegExp          = __webpack_require__(136)
	  , $flags            = __webpack_require__(194)
	  , $RegExp           = global.RegExp
	  , Base              = $RegExp
	  , proto             = $RegExp.prototype
	  , re1               = /a/g
	  , re2               = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW       = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(10) && (!CORRECT_NEW || __webpack_require__(11)(function(){
	  re2[__webpack_require__(28)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var tiRE = this instanceof $RegExp
	      , piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function(key){
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  };
	  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(21)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(190)('RegExp');

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(15);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(196);
	var anObject    = __webpack_require__(15)
	  , $flags      = __webpack_require__(194)
	  , DESCRIPTORS = __webpack_require__(10)
	  , TO_STRING   = 'toString'
	  , $toString   = /./[TO_STRING];
	
	var define = function(fn){
	  __webpack_require__(21)(RegExp.prototype, TO_STRING, fn, true);
	};
	
	// 21.2.5.14 RegExp.prototype.toString()
	if(__webpack_require__(11)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
	  define(function toString(){
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if($toString.name != TO_STRING){
	  define(function toString(){
	    return $toString.call(this);
	  });
	}

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if(__webpack_require__(10) && /./g.flags != 'g')__webpack_require__(14).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(194)
	});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(198)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(13)
	  , redefine = __webpack_require__(21)
	  , fails    = __webpack_require__(11)
	  , defined  = __webpack_require__(35)
	  , wks      = __webpack_require__(28);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(198)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(198)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(198)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = __webpack_require__(136)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(52)
	  , global             = __webpack_require__(7)
	  , ctx                = __webpack_require__(23)
	  , classof            = __webpack_require__(76)
	  , $export            = __webpack_require__(12)
	  , isObject           = __webpack_require__(16)
	  , anObject           = __webpack_require__(15)
	  , aFunction          = __webpack_require__(24)
	  , anInstance         = __webpack_require__(91)
	  , forOf              = __webpack_require__(203)
	  , setProto           = __webpack_require__(74).set
	  , speciesConstructor = __webpack_require__(204)
	  , task               = __webpack_require__(205).set
	  , microtask          = __webpack_require__(206)
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(28)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(207)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(27)($Promise, PROMISE);
	__webpack_require__(190)(PROMISE);
	Wrapper = __webpack_require__(8)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(164)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(23)
	  , call        = __webpack_require__(161)
	  , isArrayIter = __webpack_require__(162)
	  , anObject    = __webpack_require__(15)
	  , toLength    = __webpack_require__(37)
	  , getIterFn   = __webpack_require__(163);
	module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(15)
	  , aFunction = __webpack_require__(24)
	  , SPECIES   = __webpack_require__(28)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(23)
	  , invoke             = __webpack_require__(79)
	  , html               = __webpack_require__(48)
	  , cel                = __webpack_require__(18)
	  , global             = __webpack_require__(7)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(34)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , macrotask = __webpack_require__(205).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(34)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(21);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(209);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(210)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(14).f
	  , create      = __webpack_require__(46)
	  , hide        = __webpack_require__(13)
	  , redefineAll = __webpack_require__(207)
	  , ctx         = __webpack_require__(23)
	  , anInstance  = __webpack_require__(91)
	  , defined     = __webpack_require__(35)
	  , forOf       = __webpack_require__(203)
	  , $iterDefine = __webpack_require__(130)
	  , step        = __webpack_require__(192)
	  , setSpecies  = __webpack_require__(190)
	  , DESCRIPTORS = __webpack_require__(10)
	  , fastKey     = __webpack_require__(25).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(7)
	  , $export           = __webpack_require__(12)
	  , redefine          = __webpack_require__(21)
	  , redefineAll       = __webpack_require__(207)
	  , meta              = __webpack_require__(25)
	  , forOf             = __webpack_require__(203)
	  , anInstance        = __webpack_require__(91)
	  , isObject          = __webpack_require__(16)
	  , fails             = __webpack_require__(11)
	  , $iterDetect       = __webpack_require__(164)
	  , setToStringTag    = __webpack_require__(27)
	  , inheritIfRequired = __webpack_require__(89);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(209);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(210)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(171)(0)
	  , redefine     = __webpack_require__(21)
	  , meta         = __webpack_require__(25)
	  , assign       = __webpack_require__(70)
	  , weak         = __webpack_require__(213)
	  , isObject     = __webpack_require__(16)
	  , has          = __webpack_require__(9)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;
	
	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(210)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(207)
	  , getWeak           = __webpack_require__(25).getWeak
	  , anObject          = __webpack_require__(15)
	  , isObject          = __webpack_require__(16)
	  , anInstance        = __webpack_require__(91)
	  , forOf             = __webpack_require__(203)
	  , createArrayMethod = __webpack_require__(171)
	  , $has              = __webpack_require__(9)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(213);
	
	// 23.4 WeakSet Objects
	__webpack_require__(210)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(12)
	  , $typed       = __webpack_require__(216)
	  , buffer       = __webpack_require__(217)
	  , anObject     = __webpack_require__(15)
	  , toIndex      = __webpack_require__(39)
	  , toLength     = __webpack_require__(37)
	  , isObject     = __webpack_require__(16)
	  , TYPED_ARRAY  = __webpack_require__(28)('typed_array')
	  , ArrayBuffer  = __webpack_require__(7).ArrayBuffer
	  , speciesConstructor = __webpack_require__(204)
	  , $ArrayBuffer = buffer.ArrayBuffer
	  , $DataView    = buffer.DataView
	  , $isView      = $typed.ABV && ArrayBuffer.isView
	  , $slice       = $ArrayBuffer.prototype.slice
	  , VIEW         = $typed.VIEW
	  , ARRAY_BUFFER = 'ArrayBuffer';
	
	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});
	
	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it){
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});
	
	$export($export.P + $export.U + $export.F * __webpack_require__(11)(function(){
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end){
	    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
	    var len    = anObject(this).byteLength
	      , first  = toIndex(start, len)
	      , final  = toIndex(end === undefined ? len : end, len)
	      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
	      , viewS  = new $DataView(this)
	      , viewT  = new $DataView(result)
	      , index  = 0;
	    while(first < final){
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});
	
	__webpack_require__(190)(ARRAY_BUFFER);

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , hide   = __webpack_require__(13)
	  , uid    = __webpack_require__(22)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;
	
	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');
	
	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}
	
	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(7)
	  , DESCRIPTORS    = __webpack_require__(10)
	  , LIBRARY        = __webpack_require__(52)
	  , $typed         = __webpack_require__(216)
	  , hide           = __webpack_require__(13)
	  , redefineAll    = __webpack_require__(207)
	  , fails          = __webpack_require__(11)
	  , anInstance     = __webpack_require__(91)
	  , toInteger      = __webpack_require__(38)
	  , toLength       = __webpack_require__(37)
	  , gOPN           = __webpack_require__(50).f
	  , dP             = __webpack_require__(14).f
	  , arrayFill      = __webpack_require__(186)
	  , setToStringTag = __webpack_require__(27)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , parseInt       = global.parseInt
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , min            = Math.min
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};
	
	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};
	
	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};
	
	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};
	
	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};
	
	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };
	
	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };
	
	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }
	
	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12);
	$export($export.G + $export.W + $export.F * !__webpack_require__(216).ABV, {
	  DataView: __webpack_require__(217).DataView
	});

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	if(__webpack_require__(10)){
	  var LIBRARY             = __webpack_require__(52)
	    , global              = __webpack_require__(7)
	    , fails               = __webpack_require__(11)
	    , $export             = __webpack_require__(12)
	    , $typed              = __webpack_require__(216)
	    , $buffer             = __webpack_require__(217)
	    , ctx                 = __webpack_require__(23)
	    , anInstance          = __webpack_require__(91)
	    , propertyDesc        = __webpack_require__(20)
	    , hide                = __webpack_require__(13)
	    , redefineAll         = __webpack_require__(207)
	    , isInteger           = __webpack_require__(98)
	    , toInteger           = __webpack_require__(38)
	    , toLength            = __webpack_require__(37)
	    , toIndex             = __webpack_require__(39)
	    , toPrimitive         = __webpack_require__(19)
	    , has                 = __webpack_require__(9)
	    , same                = __webpack_require__(72)
	    , classof             = __webpack_require__(76)
	    , isObject            = __webpack_require__(16)
	    , toObject            = __webpack_require__(59)
	    , isArrayIter         = __webpack_require__(162)
	    , create              = __webpack_require__(46)
	    , getPrototypeOf      = __webpack_require__(60)
	    , gOPN                = __webpack_require__(50).f
	    , isIterable          = __webpack_require__(221)
	    , getIterFn           = __webpack_require__(163)
	    , uid                 = __webpack_require__(22)
	    , wks                 = __webpack_require__(28)
	    , createArrayMethod   = __webpack_require__(171)
	    , createArrayIncludes = __webpack_require__(36)
	    , speciesConstructor  = __webpack_require__(204)
	    , ArrayIterators      = __webpack_require__(191)
	    , Iterators           = __webpack_require__(131)
	    , $iterDetect         = __webpack_require__(164)
	    , setSpecies          = __webpack_require__(190)
	    , arrayFill           = __webpack_require__(186)
	    , arrayCopyWithin     = __webpack_require__(183)
	    , $DP                 = __webpack_require__(14)
	    , $GOPD               = __webpack_require__(51)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';
	
	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	
	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });
	
	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };
	
	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };
	
	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };
	
	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };
	
	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };
	
	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };
	
	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };
	
	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	
	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };
	
	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });
	
	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	
	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    slice: function slice(start, end){
	      return speciesFromList(this, arraySlice.call(validate(this), start, end));
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };
	
	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };
	
	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };
	
	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };
	
	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }
	
	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });
	
	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }
	
	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });
	
	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }
	
	    O[NAME] = TypedArray;
	
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });
	
	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
	    $export($export.P, NAME, proto);
	
	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});
	
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});
	
	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});
	
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	
	    setSpecies(NAME);
	  };
	} else module.exports = function(){ /* empty */ };

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(76)
	  , ITERATOR  = __webpack_require__(28)('iterator')
	  , Iterators = __webpack_require__(131);
	module.exports = __webpack_require__(8).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(12)
	  , _apply  = Function.apply;
	
	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  }
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export   = __webpack_require__(12)
	  , create    = __webpack_require__(46)
	  , aFunction = __webpack_require__(24)
	  , anObject  = __webpack_require__(15)
	  , isObject  = __webpack_require__(16)
	  , bind      = __webpack_require__(78);
	
	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(11)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      if(args != undefined)switch(anObject(args).length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(14)
	  , $export     = __webpack_require__(12)
	  , anObject    = __webpack_require__(15)
	  , toPrimitive = __webpack_require__(19);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(11)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(12)
	  , gOPD     = __webpack_require__(51).f
	  , anObject = __webpack_require__(15);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(12)
	  , anObject = __webpack_require__(15);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(132)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(51)
	  , getPrototypeOf = __webpack_require__(60)
	  , has            = __webpack_require__(9)
	  , $export        = __webpack_require__(12)
	  , isObject       = __webpack_require__(16)
	  , anObject       = __webpack_require__(15);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(51)
	  , $export  = __webpack_require__(12)
	  , anObject = __webpack_require__(15);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(12)
	  , getProto = __webpack_require__(60)
	  , anObject = __webpack_require__(15);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(12)
	  , anObject      = __webpack_require__(15)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(241)});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(50)
	  , gOPS     = __webpack_require__(43)
	  , anObject = __webpack_require__(15)
	  , Reflect  = __webpack_require__(7).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(12)
	  , anObject           = __webpack_require__(15)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(14)
	  , gOPD           = __webpack_require__(51)
	  , getPrototypeOf = __webpack_require__(60)
	  , has            = __webpack_require__(9)
	  , $export        = __webpack_require__(12)
	  , createDesc     = __webpack_require__(20)
	  , anObject       = __webpack_require__(15)
	  , isObject       = __webpack_require__(16);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(12)
	  , setProto = __webpack_require__(74);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(12)
	  , $includes = __webpack_require__(36)(true);
	
	$export($export.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(184)('includes');

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(12)
	  , $at     = __webpack_require__(129)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $pad    = __webpack_require__(248);
	
	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(37)
	  , repeat   = __webpack_require__(93)
	  , defined  = __webpack_require__(35);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength)return S;
	  if(fillStr == '')fillStr = ' ';
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(12)
	  , $pad    = __webpack_require__(248);
	
	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(84)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(84)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $export    = __webpack_require__(12)
	  , ownKeys    = __webpack_require__(241)
	  , toIObject  = __webpack_require__(32)
	  , createDesc = __webpack_require__(20)
	  , gOPD       = __webpack_require__(51)
	  , dP         = __webpack_require__(14);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i){
	      D = getDesc(O, key = keys[i++]);
	      if(key in result)dP.f(result, key, createDesc(0, D));
	      else result[key] = D;
	    } return result;
	  }
	});

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export = __webpack_require__(12)
	  , $values = __webpack_require__(254)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(32)
	  , isEnum    = __webpack_require__(44).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export  = __webpack_require__(12)
	  , $entries = __webpack_require__(254)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(12);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(257)('Map')});

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(76)
	  , from    = __webpack_require__(258);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(203);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(12);
	
	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(257)('Set')});

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(12);
	
	$export($export.S, 'System', {global: __webpack_require__(7)});

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(12)
	  , cof     = __webpack_require__(34);
	
	$export($export.S, 'Error', {
	  isError: function isError(it){
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  imulh: function imulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >> 16
	      , v1 = $v >> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(12);
	
	$export($export.S, 'Math', {
	  umulh: function umulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >>> 16
	      , v1 = $v >>> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(267)
	  , anObject                  = __webpack_require__(15)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var Map     = __webpack_require__(208)
	  , $export = __webpack_require__(12)
	  , shared  = __webpack_require__(26)('metadata')
	  , store   = shared.store || (shared.store = new (__webpack_require__(212)));
	
	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};
	
	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(267)
	  , anObject               = __webpack_require__(15)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;
	
	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(267)
	  , anObject               = __webpack_require__(15)
	  , getPrototypeOf         = __webpack_require__(60)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var Set                     = __webpack_require__(211)
	  , from                    = __webpack_require__(258)
	  , metadata                = __webpack_require__(267)
	  , anObject                = __webpack_require__(15)
	  , getPrototypeOf          = __webpack_require__(60)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(267)
	  , anObject               = __webpack_require__(15)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                = __webpack_require__(267)
	  , anObject                = __webpack_require__(15)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(267)
	  , anObject               = __webpack_require__(15)
	  , getPrototypeOf         = __webpack_require__(60)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(267)
	  , anObject               = __webpack_require__(15)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(267)
	  , anObject                  = __webpack_require__(15)
	  , aFunction                 = __webpack_require__(24)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(7)
	  , $export    = __webpack_require__(12)
	  , invoke     = __webpack_require__(79)
	  , partial    = __webpack_require__(277)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(278)
	  , invoke    = __webpack_require__(79)
	  , aFunction = __webpack_require__(24);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12)
	  , $task   = __webpack_require__(205);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(191)
	  , redefine      = __webpack_require__(21)
	  , global        = __webpack_require__(7)
	  , hide          = __webpack_require__(13)
	  , Iterators     = __webpack_require__(131)
	  , wks           = __webpack_require__(28)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          context._sent = arg;
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(282)))

/***/ },
/* 282 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(284);
	module.exports = __webpack_require__(8).RegExp.escape;

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(12)
	  , $re     = __webpack_require__(285)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 285 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(287)
	module.exports.color = __webpack_require__(288)

/***/ },
/* 287 */
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	/** @namespace */
	var dat = module.exports = dat || {};
	
	/** @namespace */
	dat.gui = dat.gui || {};
	
	/** @namespace */
	dat.utils = dat.utils || {};
	
	/** @namespace */
	dat.controllers = dat.controllers || {};
	
	/** @namespace */
	dat.dom = dat.dom || {};
	
	/** @namespace */
	dat.color = dat.color || {};
	
	dat.utils.css = (function () {
	  return {
	    load: function (url, doc) {
	      doc = doc || document;
	      var link = doc.createElement('link');
	      link.type = 'text/css';
	      link.rel = 'stylesheet';
	      link.href = url;
	      doc.getElementsByTagName('head')[0].appendChild(link);
	    },
	    inject: function(css, doc) {
	      doc = doc || document;
	      var injected = document.createElement('style');
	      injected.type = 'text/css';
	      injected.innerHTML = css;
	      doc.getElementsByTagName('head')[0].appendChild(injected);
	    }
	  }
	})();
	
	
	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;
	
	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */
	
	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {
	
	      
	      if (ARR_EACH && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {
	
	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },
	
	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();
	
	
	dat.controllers.Controller = (function (common) {
	
	  /**
	   * @class An "abstract" class that represents a given property of an object.
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var Controller = function(object, property) {
	
	    this.initialValue = object[property];
	
	    /**
	     * Those who extend this class will put their DOM elements in here.
	     * @type {DOMElement}
	     */
	    this.domElement = document.createElement('div');
	
	    /**
	     * The object to manipulate
	     * @type {Object}
	     */
	    this.object = object;
	
	    /**
	     * The name of the property to manipulate
	     * @type {String}
	     */
	    this.property = property;
	
	    /**
	     * The function to be called on change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onChange = undefined;
	
	    /**
	     * The function to be called on finishing change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onFinishChange = undefined;
	
	  };
	
	  common.extend(
	
	      Controller.prototype,
	
	      /** @lends dat.controllers.Controller.prototype */
	      {
	
	        /**
	         * Specify that a function fire every time someone changes the value with
	         * this Controller.
	         *
	         * @param {Function} fnc This function will be called whenever the value
	         * is modified via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onChange: function(fnc) {
	          this.__onChange = fnc;
	          return this;
	        },
	
	        /**
	         * Specify that a function fire every time someone "finishes" changing
	         * the value wih this Controller. Useful for values that change
	         * incrementally like numbers or strings.
	         *
	         * @param {Function} fnc This function will be called whenever
	         * someone "finishes" changing the value via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onFinishChange: function(fnc) {
	          this.__onFinishChange = fnc;
	          return this;
	        },
	
	        /**
	         * Change the value of <code>object[property]</code>
	         *
	         * @param {Object} newValue The new value of <code>object[property]</code>
	         */
	        setValue: function(newValue) {
	          this.object[this.property] = newValue;
	          if (this.__onChange) {
	            this.__onChange.call(this, newValue);
	          }
	          this.updateDisplay();
	          return this;
	        },
	
	        /**
	         * Gets the value of <code>object[property]</code>
	         *
	         * @returns {Object} The current value of <code>object[property]</code>
	         */
	        getValue: function() {
	          return this.object[this.property];
	        },
	
	        /**
	         * Refreshes the visual display of a Controller in order to keep sync
	         * with the object's current value.
	         * @returns {dat.controllers.Controller} this
	         */
	        updateDisplay: function() {
	          return this;
	        },
	
	        /**
	         * @returns {Boolean} true if the value has deviated from initialValue
	         */
	        isModified: function() {
	          return this.initialValue !== this.getValue()
	        }
	
	      }
	
	  );
	
	  return Controller;
	
	
	})(dat.utils.common);
	
	
	dat.dom.dom = (function (common) {
	
	  var EVENT_MAP = {
	    'HTMLEvents': ['change'],
	    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
	    'KeyboardEvents': ['keydown']
	  };
	
	  var EVENT_MAP_INV = {};
	  common.each(EVENT_MAP, function(v, k) {
	    common.each(v, function(e) {
	      EVENT_MAP_INV[e] = k;
	    });
	  });
	
	  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
	
	  function cssValueToPixels(val) {
	
	    if (val === '0' || common.isUndefined(val)) return 0;
	
	    var match = val.match(CSS_VALUE_PIXELS);
	
	    if (!common.isNull(match)) {
	      return parseFloat(match[1]);
	    }
	
	    // TODO ...ems? %?
	
	    return 0;
	
	  }
	
	  /**
	   * @namespace
	   * @member dat.dom
	   */
	  var dom = {
	
	    /**
	     * 
	     * @param elem
	     * @param selectable
	     */
	    makeSelectable: function(elem, selectable) {
	
	      if (elem === undefined || elem.style === undefined) return;
	
	      elem.onselectstart = selectable ? function() {
	        return false;
	      } : function() {
	      };
	
	      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
	      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
	      elem.unselectable = selectable ? 'on' : 'off';
	
	    },
	
	    /**
	     *
	     * @param elem
	     * @param horizontal
	     * @param vertical
	     */
	    makeFullscreen: function(elem, horizontal, vertical) {
	
	      if (common.isUndefined(horizontal)) horizontal = true;
	      if (common.isUndefined(vertical)) vertical = true;
	
	      elem.style.position = 'absolute';
	
	      if (horizontal) {
	        elem.style.left = 0;
	        elem.style.right = 0;
	      }
	      if (vertical) {
	        elem.style.top = 0;
	        elem.style.bottom = 0;
	      }
	
	    },
	
	    /**
	     *
	     * @param elem
	     * @param eventType
	     * @param params
	     */
	    fakeEvent: function(elem, eventType, params, aux) {
	      params = params || {};
	      var className = EVENT_MAP_INV[eventType];
	      if (!className) {
	        throw new Error('Event type ' + eventType + ' not supported.');
	      }
	      var evt = document.createEvent(className);
	      switch (className) {
	        case 'MouseEvents':
	          var clientX = params.x || params.clientX || 0;
	          var clientY = params.y || params.clientY || 0;
	          evt.initMouseEvent(eventType, params.bubbles || false,
	              params.cancelable || true, window, params.clickCount || 1,
	              0, //screen X
	              0, //screen Y
	              clientX, //client X
	              clientY, //client Y
	              false, false, false, false, 0, null);
	          break;
	        case 'KeyboardEvents':
	          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
	          common.defaults(params, {
	            cancelable: true,
	            ctrlKey: false,
	            altKey: false,
	            shiftKey: false,
	            metaKey: false,
	            keyCode: undefined,
	            charCode: undefined
	          });
	          init(eventType, params.bubbles || false,
	              params.cancelable, window,
	              params.ctrlKey, params.altKey,
	              params.shiftKey, params.metaKey,
	              params.keyCode, params.charCode);
	          break;
	        default:
	          evt.initEvent(eventType, params.bubbles || false,
	              params.cancelable || true);
	          break;
	      }
	      common.defaults(evt, aux);
	      elem.dispatchEvent(evt);
	    },
	
	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    bind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.addEventListener)
	        elem.addEventListener(event, func, bool);
	      else if (elem.attachEvent)
	        elem.attachEvent('on' + event, func);
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    unbind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.removeEventListener)
	        elem.removeEventListener(event, func, bool);
	      else if (elem.detachEvent)
	        elem.detachEvent('on' + event, func);
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    addClass: function(elem, className) {
	      if (elem.className === undefined) {
	        elem.className = className;
	      } else if (elem.className !== className) {
	        var classes = elem.className.split(/ +/);
	        if (classes.indexOf(className) == -1) {
	          classes.push(className);
	          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
	        }
	      }
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    removeClass: function(elem, className) {
	      if (className) {
	        if (elem.className === undefined) {
	          // elem.className = className;
	        } else if (elem.className === className) {
	          elem.removeAttribute('class');
	        } else {
	          var classes = elem.className.split(/ +/);
	          var index = classes.indexOf(className);
	          if (index != -1) {
	            classes.splice(index, 1);
	            elem.className = classes.join(' ');
	          }
	        }
	      } else {
	        elem.className = undefined;
	      }
	      return dom;
	    },
	
	    hasClass: function(elem, className) {
	      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getWidth: function(elem) {
	
	      var style = getComputedStyle(elem);
	
	      return cssValueToPixels(style['border-left-width']) +
	          cssValueToPixels(style['border-right-width']) +
	          cssValueToPixels(style['padding-left']) +
	          cssValueToPixels(style['padding-right']) +
	          cssValueToPixels(style['width']);
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getHeight: function(elem) {
	
	      var style = getComputedStyle(elem);
	
	      return cssValueToPixels(style['border-top-width']) +
	          cssValueToPixels(style['border-bottom-width']) +
	          cssValueToPixels(style['padding-top']) +
	          cssValueToPixels(style['padding-bottom']) +
	          cssValueToPixels(style['height']);
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getOffset: function(elem) {
	      var offset = {left: 0, top:0};
	      if (elem.offsetParent) {
	        do {
	          offset.left += elem.offsetLeft;
	          offset.top += elem.offsetTop;
	        } while (elem = elem.offsetParent);
	      }
	      return offset;
	    },
	
	    // http://stackoverflow.com/posts/2684561/revisions
	    /**
	     * 
	     * @param elem
	     */
	    isActive: function(elem) {
	      return elem === document.activeElement && ( elem.type || elem.href );
	    }
	
	  };
	
	  return dom;
	
	})(dat.utils.common);
	
	
	dat.controllers.OptionController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a select input to alter the property of an object, using a
	   * list of accepted values.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object|string[]} options A map of labels to acceptable values, or
	   * a list of acceptable string values.
	   *
	   * @member dat.controllers
	   */
	  var OptionController = function(object, property, options) {
	
	    OptionController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    /**
	     * The drop down menu
	     * @ignore
	     */
	    this.__select = document.createElement('select');
	
	    if (common.isArray(options)) {
	      var map = {};
	      common.each(options, function(element) {
	        map[element] = element;
	      });
	      options = map;
	    }
	
	    common.each(options, function(value, key) {
	
	      var opt = document.createElement('option');
	      opt.innerHTML = key;
	      opt.setAttribute('value', value);
	      _this.__select.appendChild(opt);
	
	    });
	
	    // Acknowledge original value
	    this.updateDisplay();
	
	    dom.bind(this.__select, 'change', function() {
	      var desiredValue = this.options[this.selectedIndex].value;
	      _this.setValue(desiredValue);
	    });
	
	    this.domElement.appendChild(this.__select);
	
	  };
	
	  OptionController.superclass = Controller;
	
	  common.extend(
	
	      OptionController.prototype,
	      Controller.prototype,
	
	      {
	
	        setValue: function(v) {
	          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          return toReturn;
	        },
	
	        updateDisplay: function() {
	          this.__select.value = this.getValue();
	          return OptionController.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  return OptionController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.NumberController = (function (Controller, common) {
	
	  /**
	   * @class Represents a given property of an object that is a number.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberController = function(object, property, params) {
	
	    NumberController.superclass.call(this, object, property);
	
	    params = params || {};
	
	    this.__min = params.min;
	    this.__max = params.max;
	    this.__step = params.step;
	
	    if (common.isUndefined(this.__step)) {
	
	      if (this.initialValue == 0) {
	        this.__impliedStep = 1; // What are we, psychics?
	      } else {
	        // Hey Doug, check this out.
	        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
	      }
	
	    } else {
	
	      this.__impliedStep = this.__step;
	
	    }
	
	    this.__precision = numDecimals(this.__impliedStep);
	
	
	  };
	
	  NumberController.superclass = Controller;
	
	  common.extend(
	
	      NumberController.prototype,
	      Controller.prototype,
	
	      /** @lends dat.controllers.NumberController.prototype */
	      {
	
	        setValue: function(v) {
	
	          if (this.__min !== undefined && v < this.__min) {
	            v = this.__min;
	          } else if (this.__max !== undefined && v > this.__max) {
	            v = this.__max;
	          }
	
	          if (this.__step !== undefined && v % this.__step != 0) {
	            v = Math.round(v / this.__step) * this.__step;
	          }
	
	          return NumberController.superclass.prototype.setValue.call(this, v);
	
	        },
	
	        /**
	         * Specify a minimum value for <code>object[property]</code>.
	         *
	         * @param {Number} minValue The minimum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        min: function(v) {
	          this.__min = v;
	          return this;
	        },
	
	        /**
	         * Specify a maximum value for <code>object[property]</code>.
	         *
	         * @param {Number} maxValue The maximum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        max: function(v) {
	          this.__max = v;
	          return this;
	        },
	
	        /**
	         * Specify a step value that dat.controllers.NumberController
	         * increments by.
	         *
	         * @param {Number} stepValue The step value for
	         * dat.controllers.NumberController
	         * @default if minimum and maximum specified increment is 1% of the
	         * difference otherwise stepValue is 1
	         * @returns {dat.controllers.NumberController} this
	         */
	        step: function(v) {
	          this.__step = v;
	          return this;
	        }
	
	      }
	
	  );
	
	  function numDecimals(x) {
	    x = x.toString();
	    if (x.indexOf('.') > -1) {
	      return x.length - x.indexOf('.') - 1;
	    } else {
	      return 0;
	    }
	  }
	
	  return NumberController;
	
	})(dat.controllers.Controller,
	dat.utils.common);
	
	
	dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {
	
	  /**
	   * @class Represents a given property of an object that is a number and
	   * provides an input element with which to manipulate it.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerBox = function(object, property, params) {
	
	    this.__truncationSuspended = false;
	
	    NumberControllerBox.superclass.call(this, object, property, params);
	
	    var _this = this;
	
	    /**
	     * {Number} Previous mouse y position
	     * @ignore
	     */
	    var prev_y;
	
	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');
	
	    // Makes it so manually specified values are not truncated.
	
	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'mousedown', onMouseDown);
	    dom.bind(this.__input, 'keydown', function(e) {
	
	      // When pressing entire, you can be as precise as you want.
	      if (e.keyCode === 13) {
	        _this.__truncationSuspended = true;
	        this.blur();
	        _this.__truncationSuspended = false;
	      }
	
	    });
	
	    function onChange() {
	      var attempted = parseFloat(_this.__input.value);
	      if (!common.isNaN(attempted)) _this.setValue(attempted);
	    }
	
	    function onBlur() {
	      onChange();
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    function onMouseDown(e) {
	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);
	      prev_y = e.clientY;
	    }
	
	    function onMouseDrag(e) {
	
	      var diff = prev_y - e.clientY;
	      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
	
	      prev_y = e.clientY;
	
	    }
	
	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	    }
	
	    this.updateDisplay();
	
	    this.domElement.appendChild(this.__input);
	
	  };
	
	  NumberControllerBox.superclass = NumberController;
	
	  common.extend(
	
	      NumberControllerBox.prototype,
	      NumberController.prototype,
	
	      {
	
	        updateDisplay: function() {
	
	          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
	          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  function roundToDecimal(value, decimals) {
	    var tenTo = Math.pow(10, decimals);
	    return Math.round(value * tenTo) / tenTo;
	  }
	
	  return NumberControllerBox;
	
	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {
	
	  /**
	   * @class Represents a given property of an object that is a number, contains
	   * a minimum and maximum, and provides a slider element with which to
	   * manipulate it. It should be noted that the slider element is made up of
	   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
	   * <code>&lt;slider&gt;</code> element.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   * 
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Number} minValue Minimum allowed value
	   * @param {Number} maxValue Maximum allowed value
	   * @param {Number} stepValue Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerSlider = function(object, property, min, max, step) {
	
	    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });
	
	    var _this = this;
	
	    this.__background = document.createElement('div');
	    this.__foreground = document.createElement('div');
	    
	
	
	    dom.bind(this.__background, 'mousedown', onMouseDown);
	    
	    dom.addClass(this.__background, 'slider');
	    dom.addClass(this.__foreground, 'slider-fg');
	
	    function onMouseDown(e) {
	
	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);
	
	      onMouseDrag(e);
	    }
	
	    function onMouseDrag(e) {
	
	      e.preventDefault();
	
	      var offset = dom.getOffset(_this.__background);
	      var width = dom.getWidth(_this.__background);
	      
	      _this.setValue(
	        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
	      );
	
	      return false;
	
	    }
	
	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    this.updateDisplay();
	
	    this.__background.appendChild(this.__foreground);
	    this.domElement.appendChild(this.__background);
	
	  };
	
	  NumberControllerSlider.superclass = NumberController;
	
	  /**
	   * Injects default stylesheet for slider elements.
	   */
	  NumberControllerSlider.useDefaultStyles = function() {
	    css.inject(styleSheet);
	  };
	
	  common.extend(
	
	      NumberControllerSlider.prototype,
	      NumberController.prototype,
	
	      {
	
	        updateDisplay: function() {
	          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
	          this.__foreground.style.width = pct*100+'%';
	          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	
	
	  );
	
	  function map(v, i1, i2, o1, o2) {
	    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
	  }
	
	  return NumberControllerSlider;
	  
	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.css,
	dat.utils.common,
	".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
	
	
	dat.controllers.FunctionController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a GUI interface to fire a specified method, a property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var FunctionController = function(object, property, text) {
	
	    FunctionController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    this.__button = document.createElement('div');
	    this.__button.innerHTML = text === undefined ? 'Fire' : text;
	    dom.bind(this.__button, 'click', function(e) {
	      e.preventDefault();
	      _this.fire();
	      return false;
	    });
	
	    dom.addClass(this.__button, 'button');
	
	    this.domElement.appendChild(this.__button);
	
	
	  };
	
	  FunctionController.superclass = Controller;
	
	  common.extend(
	
	      FunctionController.prototype,
	      Controller.prototype,
	      {
	        
	        fire: function() {
	          if (this.__onChange) {
	            this.__onChange.call(this);
	          }
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.getValue().call(this.object);
	        }
	      }
	
	  );
	
	  return FunctionController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.BooleanController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a checkbox input to alter the boolean property of an object.
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var BooleanController = function(object, property) {
	
	    BooleanController.superclass.call(this, object, property);
	
	    var _this = this;
	    this.__prev = this.getValue();
	
	    this.__checkbox = document.createElement('input');
	    this.__checkbox.setAttribute('type', 'checkbox');
	
	
	    dom.bind(this.__checkbox, 'change', onChange, false);
	
	    this.domElement.appendChild(this.__checkbox);
	
	    // Match original value
	    this.updateDisplay();
	
	    function onChange() {
	      _this.setValue(!_this.__prev);
	    }
	
	  };
	
	  BooleanController.superclass = Controller;
	
	  common.extend(
	
	      BooleanController.prototype,
	      Controller.prototype,
	
	      {
	
	        setValue: function(v) {
	          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.__prev = this.getValue();
	          return toReturn;
	        },
	
	        updateDisplay: function() {
	          
	          if (this.getValue() === true) {
	            this.__checkbox.setAttribute('checked', 'checked');
	            this.__checkbox.checked = true;    
	          } else {
	              this.__checkbox.checked = false;
	          }
	
	          return BooleanController.superclass.prototype.updateDisplay.call(this);
	
	        }
	
	
	      }
	
	  );
	
	  return BooleanController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.color.toString = (function (common) {
	
	  return function(color) {
	
	    if (color.a == 1 || common.isUndefined(color.a)) {
	
	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }
	
	      return '#' + s;
	
	    } else {
	
	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';
	
	    }
	
	  }
	
	})(dat.utils.common);
	
	
	dat.color.interpret = (function (toString, common) {
	
	  var result, toReturn;
	
	  var interpret = function() {
	
	    toReturn = false;
	
	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];
	
	    common.each(INTERPRETATIONS, function(family) {
	
	      if (family.litmus(original)) {
	
	        common.each(family.conversions, function(conversion, conversionName) {
	
	          result = conversion.read(original);
	
	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;
	
	          }
	
	        });
	
	        return common.BREAK;
	
	      }
	
	    });
	
	    return toReturn;
	
	  };
	
	  var INTERPRETATIONS = [
	
	    // Strings
	    {
	
	      litmus: common.isString,
	
	      conversions: {
	
	        THREE_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        SIX_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGB: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGBA: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };
	
	          },
	
	          write: toString
	
	        }
	
	      }
	
	    },
	
	    // Numbers
	    {
	
	      litmus: common.isNumber,
	
	      conversions: {
	
	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },
	
	          write: function(color) {
	            return color.hex;
	          }
	        }
	
	      }
	
	    },
	
	    // Arrays
	    {
	
	      litmus: common.isArray,
	
	      conversions: {
	
	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }
	
	        },
	
	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }
	
	        }
	
	      }
	
	    },
	
	    // Objects
	    {
	
	      litmus: common.isObject,
	
	      conversions: {
	
	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },
	
	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },
	
	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },
	
	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }
	
	        }
	
	      }
	
	    }
	
	
	  ];
	
	  return interpret;
	
	
	})(dat.color.toString,
	dat.utils.common);
	
	
	dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {
	
	  css.inject(styleSheet);
	
	  /** Outer-most className for GUI's */
	  var CSS_NAMESPACE = 'dg';
	
	  var HIDE_KEY_CODE = 72;
	
	  /** The only value shared between the JS and SCSS. Use caution. */
	  var CLOSE_BUTTON_HEIGHT = 20;
	
	  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
	
	  var SUPPORTS_LOCAL_STORAGE = (function() {
	    try {
	      return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	      return false;
	    }
	  })();
	
	  var SAVE_DIALOGUE;
	
	  /** Have we yet to create an autoPlace GUI? */
	  var auto_place_virgin = true;
	
	  /** Fixed position div that auto place GUI's go inside */
	  var auto_place_container;
	
	  /** Are we hiding the GUI's ? */
	  var hide = false;
	
	  /** GUI's which should be hidden */
	  var hideable_guis = [];
	
	  /**
	   * A lightweight controller library for JavaScript. It allows you to easily
	   * manipulate variables and fire functions on the fly.
	   * @class
	   *
	   * @member dat.gui
	   *
	   * @param {Object} [params]
	   * @param {String} [params.name] The name of this GUI.
	   * @param {Object} [params.load] JSON object representing the saved state of
	   * this GUI.
	   * @param {Boolean} [params.auto=true]
	   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
	   * @param {Boolean} [params.closed] If true, starts closed
	   */
	  var GUI = function(params) {
	
	    var _this = this;
	
	    /**
	     * Outermost DOM Element
	     * @type DOMElement
	     */
	    this.domElement = document.createElement('div');
	    this.__ul = document.createElement('ul');
	    this.domElement.appendChild(this.__ul);
	
	    dom.addClass(this.domElement, CSS_NAMESPACE);
	
	    /**
	     * Nested GUI's by name
	     * @ignore
	     */
	    this.__folders = {};
	
	    this.__controllers = [];
	
	    /**
	     * List of objects I'm remembering for save, only used in top level GUI
	     * @ignore
	     */
	    this.__rememberedObjects = [];
	
	    /**
	     * Maps the index of remembered objects to a map of controllers, only used
	     * in top level GUI.
	     *
	     * @private
	     * @ignore
	     *
	     * @example
	     * [
	     *  {
	     *    propertyName: Controller,
	     *    anotherPropertyName: Controller
	     *  },
	     *  {
	     *    propertyName: Controller
	     *  }
	     * ]
	     */
	    this.__rememberedObjectIndecesToControllers = [];
	
	    this.__listening = [];
	
	    params = params || {};
	
	    // Default parameters
	    params = common.defaults(params, {
	      autoPlace: true,
	      width: GUI.DEFAULT_WIDTH
	    });
	
	    params = common.defaults(params, {
	      resizable: params.autoPlace,
	      hideable: params.autoPlace
	    });
	
	
	    if (!common.isUndefined(params.load)) {
	
	      // Explicit preset
	      if (params.preset) params.load.preset = params.preset;
	
	    } else {
	
	      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
	
	    }
	
	    if (common.isUndefined(params.parent) && params.hideable) {
	      hideable_guis.push(this);
	    }
	
	    // Only root level GUI's are resizable.
	    params.resizable = common.isUndefined(params.parent) && params.resizable;
	
	
	    if (params.autoPlace && common.isUndefined(params.scrollable)) {
	      params.scrollable = true;
	    }
	//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;
	
	    // Not part of params because I don't want people passing this in via
	    // constructor. Should be a 'remembered' value.
	    var use_local_storage =
	        SUPPORTS_LOCAL_STORAGE &&
	            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
	
	    Object.defineProperties(this,
	
	        /** @lends dat.gui.GUI.prototype */
	        {
	
	          /**
	           * The parent <code>GUI</code>
	           * @type dat.gui.GUI
	           */
	          parent: {
	            get: function() {
	              return params.parent;
	            }
	          },
	
	          scrollable: {
	            get: function() {
	              return params.scrollable;
	            }
	          },
	
	          /**
	           * Handles <code>GUI</code>'s element placement for you
	           * @type Boolean
	           */
	          autoPlace: {
	            get: function() {
	              return params.autoPlace;
	            }
	          },
	
	          /**
	           * The identifier for a set of saved values
	           * @type String
	           */
	          preset: {
	
	            get: function() {
	              if (_this.parent) {
	                return _this.getRoot().preset;
	              } else {
	                return params.load.preset;
	              }
	            },
	
	            set: function(v) {
	              if (_this.parent) {
	                _this.getRoot().preset = v;
	              } else {
	                params.load.preset = v;
	              }
	              setPresetSelectIndex(this);
	              _this.revert();
	            }
	
	          },
	
	          /**
	           * The width of <code>GUI</code> element
	           * @type Number
	           */
	          width: {
	            get: function() {
	              return params.width;
	            },
	            set: function(v) {
	              params.width = v;
	              setWidth(_this, v);
	            }
	          },
	
	          /**
	           * The name of <code>GUI</code>. Used for folders. i.e
	           * a folder's name
	           * @type String
	           */
	          name: {
	            get: function() {
	              return params.name;
	            },
	            set: function(v) {
	              // TODO Check for collisions among sibling folders
	              params.name = v;
	              if (title_row_name) {
	                title_row_name.innerHTML = params.name;
	              }
	            }
	          },
	
	          /**
	           * Whether the <code>GUI</code> is collapsed or not
	           * @type Boolean
	           */
	          closed: {
	            get: function() {
	              return params.closed;
	            },
	            set: function(v) {
	              params.closed = v;
	              if (params.closed) {
	                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
	              } else {
	                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
	              }
	              // For browsers that aren't going to respect the CSS transition,
	              // Lets just check our height against the window height right off
	              // the bat.
	              this.onResize();
	
	              if (_this.__closeButton) {
	                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
	              }
	            }
	          },
	
	          /**
	           * Contains all presets
	           * @type Object
	           */
	          load: {
	            get: function() {
	              return params.load;
	            }
	          },
	
	          /**
	           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
	           * <code>remember</code>ing
	           * @type Boolean
	           */
	          useLocalStorage: {
	
	            get: function() {
	              return use_local_storage;
	            },
	            set: function(bool) {
	              if (SUPPORTS_LOCAL_STORAGE) {
	                use_local_storage = bool;
	                if (bool) {
	                  dom.bind(window, 'unload', saveToLocalStorage);
	                } else {
	                  dom.unbind(window, 'unload', saveToLocalStorage);
	                }
	                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
	              }
	            }
	
	          }
	
	        });
	
	    // Are we a root level GUI?
	    if (common.isUndefined(params.parent)) {
	
	      params.closed = false;
	
	      dom.addClass(this.domElement, GUI.CLASS_MAIN);
	      dom.makeSelectable(this.domElement, false);
	
	      // Are we supposed to be loading locally?
	      if (SUPPORTS_LOCAL_STORAGE) {
	
	        if (use_local_storage) {
	
	          _this.useLocalStorage = true;
	
	          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
	
	          if (saved_gui) {
	            params.load = JSON.parse(saved_gui);
	          }
	
	        }
	
	      }
	
	      this.__closeButton = document.createElement('div');
	      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
	      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
	      this.domElement.appendChild(this.__closeButton);
	
	      dom.bind(this.__closeButton, 'click', function() {
	
	        _this.closed = !_this.closed;
	
	
	      });
	
	
	      // Oh, you're a nested GUI!
	    } else {
	
	      if (params.closed === undefined) {
	        params.closed = true;
	      }
	
	      var title_row_name = document.createTextNode(params.name);
	      dom.addClass(title_row_name, 'controller-name');
	
	      var title_row = addRow(_this, title_row_name);
	
	      var on_click_title = function(e) {
	        e.preventDefault();
	        _this.closed = !_this.closed;
	        return false;
	      };
	
	      dom.addClass(this.__ul, GUI.CLASS_CLOSED);
	
	      dom.addClass(title_row, 'title');
	      dom.bind(title_row, 'click', on_click_title);
	
	      if (!params.closed) {
	        this.closed = false;
	      }
	
	    }
	
	    if (params.autoPlace) {
	
	      if (common.isUndefined(params.parent)) {
	
	        if (auto_place_virgin) {
	          auto_place_container = document.createElement('div');
	          dom.addClass(auto_place_container, CSS_NAMESPACE);
	          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
	          document.body.appendChild(auto_place_container);
	          auto_place_virgin = false;
	        }
	
	        // Put it in the dom for you.
	        auto_place_container.appendChild(this.domElement);
	
	        // Apply the auto styles
	        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
	
	      }
	
	
	      // Make it not elastic.
	      if (!this.parent) setWidth(_this, params.width);
	
	    }
	
	    dom.bind(window, 'resize', function() { _this.onResize() });
	    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
	    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
	    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
	    this.onResize();
	
	
	    if (params.resizable) {
	      addResizeHandle(this);
	    }
	
	    function saveToLocalStorage() {
	      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
	    }
	
	    var root = _this.getRoot();
	    function resetWidth() {
	        var root = _this.getRoot();
	        root.width += 1;
	        common.defer(function() {
	          root.width -= 1;
	        });
	      }
	
	      if (!params.parent) {
	        resetWidth();
	      }
	
	  };
	
	  GUI.toggleHide = function() {
	
	    hide = !hide;
	    common.each(hideable_guis, function(gui) {
	      gui.domElement.style.zIndex = hide ? -999 : 999;
	      gui.domElement.style.opacity = hide ? 0 : 1;
	    });
	  };
	
	  GUI.CLASS_AUTO_PLACE = 'a';
	  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
	  GUI.CLASS_MAIN = 'main';
	  GUI.CLASS_CONTROLLER_ROW = 'cr';
	  GUI.CLASS_TOO_TALL = 'taller-than-window';
	  GUI.CLASS_CLOSED = 'closed';
	  GUI.CLASS_CLOSE_BUTTON = 'close-button';
	  GUI.CLASS_DRAG = 'drag';
	
	  GUI.DEFAULT_WIDTH = 245;
	  GUI.TEXT_CLOSED = 'Close Controls';
	  GUI.TEXT_OPEN = 'Open Controls';
	
	  dom.bind(window, 'keydown', function(e) {
	
	    if (document.activeElement.type !== 'text' &&
	        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
	      GUI.toggleHide();
	    }
	
	  }, false);
	
	  common.extend(
	
	      GUI.prototype,
	
	      /** @lends dat.gui.GUI */
	      {
	
	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.Controller} The new controller that was added.
	         * @instance
	         */
	        add: function(object, property) {
	
	          return add(
	              this,
	              object,
	              property,
	              {
	                factoryArgs: Array.prototype.slice.call(arguments, 2)
	              }
	          );
	
	        },
	
	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.ColorController} The new controller that was added.
	         * @instance
	         */
	        addColor: function(object, property) {
	
	          return add(
	              this,
	              object,
	              property,
	              {
	                color: true
	              }
	          );
	
	        },
	
	        /**
	         * @param controller
	         * @instance
	         */
	        remove: function(controller) {
	
	          // TODO listening?
	          this.__ul.removeChild(controller.__li);
	          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
	          var _this = this;
	          common.defer(function() {
	            _this.onResize();
	          });
	
	        },
	
	        destroy: function() {
	
	          if (this.autoPlace) {
	            auto_place_container.removeChild(this.domElement);
	          }
	
	        },
	
	        /**
	         * @param name
	         * @returns {dat.gui.GUI} The new folder.
	         * @throws {Error} if this GUI already has a folder by the specified
	         * name
	         * @instance
	         */
	        addFolder: function(name) {
	
	          // We have to prevent collisions on names in order to have a key
	          // by which to remember saved values
	          if (this.__folders[name] !== undefined) {
	            throw new Error('You already have a folder in this GUI by the' +
	                ' name "' + name + '"');
	          }
	
	          var new_gui_params = { name: name, parent: this };
	
	          // We need to pass down the autoPlace trait so that we can
	          // attach event listeners to open/close folder actions to
	          // ensure that a scrollbar appears if the window is too short.
	          new_gui_params.autoPlace = this.autoPlace;
	
	          // Do we have saved appearance data for this folder?
	
	          if (this.load && // Anything loaded?
	              this.load.folders && // Was my parent a dead-end?
	              this.load.folders[name]) { // Did daddy remember me?
	
	            // Start me closed if I was closed
	            new_gui_params.closed = this.load.folders[name].closed;
	
	            // Pass down the loaded data
	            new_gui_params.load = this.load.folders[name];
	
	          }
	
	          var gui = new GUI(new_gui_params);
	          this.__folders[name] = gui;
	
	          var li = addRow(this, gui.domElement);
	          dom.addClass(li, 'folder');
	          return gui;
	
	        },
	
	        open: function() {
	          this.closed = false;
	        },
	
	        close: function() {
	          this.closed = true;
	        },
	
	        onResize: function() {
	
	          var root = this.getRoot();
	
	          if (root.scrollable) {
	
	            var top = dom.getOffset(root.__ul).top;
	            var h = 0;
	
	            common.each(root.__ul.childNodes, function(node) {
	              if (! (root.autoPlace && node === root.__save_row))
	                h += dom.getHeight(node);
	            });
	
	            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
	              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
	            } else {
	              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = 'auto';
	            }
	
	          }
	
	          if (root.__resize_handle) {
	            common.defer(function() {
	              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
	            });
	          }
	
	          if (root.__closeButton) {
	            root.__closeButton.style.width = root.width + 'px';
	          }
	
	        },
	
	        /**
	         * Mark objects for saving. The order of these objects cannot change as
	         * the GUI grows. When remembering new objects, append them to the end
	         * of the list.
	         *
	         * @param {Object...} objects
	         * @throws {Error} if not called on a top level GUI.
	         * @instance
	         */
	        remember: function() {
	
	          if (common.isUndefined(SAVE_DIALOGUE)) {
	            SAVE_DIALOGUE = new CenteredDiv();
	            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
	          }
	
	          if (this.parent) {
	            throw new Error("You can only call remember on a top level GUI.");
	          }
	
	          var _this = this;
	
	          common.each(Array.prototype.slice.call(arguments), function(object) {
	            if (_this.__rememberedObjects.length == 0) {
	              addSaveMenu(_this);
	            }
	            if (_this.__rememberedObjects.indexOf(object) == -1) {
	              _this.__rememberedObjects.push(object);
	            }
	          });
	
	          if (this.autoPlace) {
	            // Set save row width
	            setWidth(this, this.width);
	          }
	
	        },
	
	        /**
	         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
	         * @instance
	         */
	        getRoot: function() {
	          var gui = this;
	          while (gui.parent) {
	            gui = gui.parent;
	          }
	          return gui;
	        },
	
	        /**
	         * @returns {Object} a JSON object representing the current state of
	         * this GUI as well as its remembered properties.
	         * @instance
	         */
	        getSaveObject: function() {
	
	          var toReturn = this.load;
	
	          toReturn.closed = this.closed;
	
	          // Am I remembering any values?
	          if (this.__rememberedObjects.length > 0) {
	
	            toReturn.preset = this.preset;
	
	            if (!toReturn.remembered) {
	              toReturn.remembered = {};
	            }
	
	            toReturn.remembered[this.preset] = getCurrentPreset(this);
	
	          }
	
	          toReturn.folders = {};
	          common.each(this.__folders, function(element, key) {
	            toReturn.folders[key] = element.getSaveObject();
	          });
	
	          return toReturn;
	
	        },
	
	        save: function() {
	
	          if (!this.load.remembered) {
	            this.load.remembered = {};
	          }
	
	          this.load.remembered[this.preset] = getCurrentPreset(this);
	          markPresetModified(this, false);
	
	        },
	
	        saveAs: function(presetName) {
	
	          if (!this.load.remembered) {
	
	            // Retain default values upon first save
	            this.load.remembered = {};
	            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
	
	          }
	
	          this.load.remembered[presetName] = getCurrentPreset(this);
	          this.preset = presetName;
	          addPresetOption(this, presetName, true);
	
	        },
	
	        revert: function(gui) {
	
	          common.each(this.__controllers, function(controller) {
	            // Make revert work on Default.
	            if (!this.getRoot().load.remembered) {
	              controller.setValue(controller.initialValue);
	            } else {
	              recallSavedValue(gui || this.getRoot(), controller);
	            }
	          }, this);
	
	          common.each(this.__folders, function(folder) {
	            folder.revert(folder);
	          });
	
	          if (!gui) {
	            markPresetModified(this.getRoot(), false);
	          }
	
	
	        },
	
	        listen: function(controller) {
	
	          var init = this.__listening.length == 0;
	          this.__listening.push(controller);
	          if (init) updateDisplays(this.__listening);
	
	        }
	
	      }
	
	  );
	
	  function add(gui, object, property, params) {
	
	    if (object[property] === undefined) {
	      throw new Error("Object " + object + " has no property \"" + property + "\"");
	    }
	
	    var controller;
	
	    if (params.color) {
	
	      controller = new ColorController(object, property);
	
	    } else {
	
	      var factoryArgs = [object,property].concat(params.factoryArgs);
	      controller = controllerFactory.apply(gui, factoryArgs);
	
	    }
	
	    if (params.before instanceof Controller) {
	      params.before = params.before.__li;
	    }
	
	    recallSavedValue(gui, controller);
	
	    dom.addClass(controller.domElement, 'c');
	
	    var name = document.createElement('span');
	    dom.addClass(name, 'property-name');
	    name.innerHTML = controller.property;
	
	    var container = document.createElement('div');
	    container.appendChild(name);
	    container.appendChild(controller.domElement);
	
	    var li = addRow(gui, container, params.before);
	
	    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
	    dom.addClass(li, typeof controller.getValue());
	
	    augmentController(gui, li, controller);
	
	    gui.__controllers.push(controller);
	
	    return controller;
	
	  }
	
	  /**
	   * Add a row to the end of the GUI or before another row.
	   *
	   * @param gui
	   * @param [dom] If specified, inserts the dom content in the new row
	   * @param [liBefore] If specified, places the new row before another row
	   */
	  function addRow(gui, dom, liBefore) {
	    var li = document.createElement('li');
	    if (dom) li.appendChild(dom);
	    if (liBefore) {
	      gui.__ul.insertBefore(li, params.before);
	    } else {
	      gui.__ul.appendChild(li);
	    }
	    gui.onResize();
	    return li;
	  }
	
	  function augmentController(gui, li, controller) {
	
	    controller.__li = li;
	    controller.__gui = gui;
	
	    common.extend(controller, {
	
	      options: function(options) {
	
	        if (arguments.length > 1) {
	          controller.remove();
	
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [common.toArray(arguments)]
	              }
	          );
	
	        }
	
	        if (common.isArray(options) || common.isObject(options)) {
	          controller.remove();
	
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [options]
	              }
	          );
	
	        }
	
	      },
	
	      name: function(v) {
	        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
	        return controller;
	      },
	
	      listen: function() {
	        controller.__gui.listen(controller);
	        return controller;
	      },
	
	      remove: function() {
	        controller.__gui.remove(controller);
	        return controller;
	      }
	
	    });
	
	    // All sliders should be accompanied by a box.
	    if (controller instanceof NumberControllerSlider) {
	
	      var box = new NumberControllerBox(controller.object, controller.property,
	          { min: controller.__min, max: controller.__max, step: controller.__step });
	
	      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
	        var pc = controller[method];
	        var pb = box[method];
	        controller[method] = box[method] = function() {
	          var args = Array.prototype.slice.call(arguments);
	          pc.apply(controller, args);
	          return pb.apply(box, args);
	        }
	      });
	
	      dom.addClass(li, 'has-slider');
	      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
	
	    }
	    else if (controller instanceof NumberControllerBox) {
	
	      var r = function(returned) {
	
	        // Have we defined both boundaries?
	        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {
	
	          // Well, then lets just replace this with a slider.
	          controller.remove();
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [controller.__min, controller.__max, controller.__step]
	              });
	
	        }
	
	        return returned;
	
	      };
	
	      controller.min = common.compose(r, controller.min);
	      controller.max = common.compose(r, controller.max);
	
	    }
	    else if (controller instanceof BooleanController) {
	
	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__checkbox, 'click');
	      });
	
	      dom.bind(controller.__checkbox, 'click', function(e) {
	        e.stopPropagation(); // Prevents double-toggle
	      })
	
	    }
	    else if (controller instanceof FunctionController) {
	
	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__button, 'click');
	      });
	
	      dom.bind(li, 'mouseover', function() {
	        dom.addClass(controller.__button, 'hover');
	      });
	
	      dom.bind(li, 'mouseout', function() {
	        dom.removeClass(controller.__button, 'hover');
	      });
	
	    }
	    else if (controller instanceof ColorController) {
	
	      dom.addClass(li, 'color');
	      controller.updateDisplay = common.compose(function(r) {
	        li.style.borderLeftColor = controller.__color.toString();
	        return r;
	      }, controller.updateDisplay);
	
	      controller.updateDisplay();
	
	    }
	
	    controller.setValue = common.compose(function(r) {
	      if (gui.getRoot().__preset_select && controller.isModified()) {
	        markPresetModified(gui.getRoot(), true);
	      }
	      return r;
	    }, controller.setValue);
	
	  }
	
	  function recallSavedValue(gui, controller) {
	
	    // Find the topmost GUI, that's where remembered objects live.
	    var root = gui.getRoot();
	
	    // Does the object we're controlling match anything we've been told to
	    // remember?
	    var matched_index = root.__rememberedObjects.indexOf(controller.object);
	
	    // Why yes, it does!
	    if (matched_index != -1) {
	
	      // Let me fetch a map of controllers for thcommon.isObject.
	      var controller_map =
	          root.__rememberedObjectIndecesToControllers[matched_index];
	
	      // Ohp, I believe this is the first controller we've created for this
	      // object. Lets make the map fresh.
	      if (controller_map === undefined) {
	        controller_map = {};
	        root.__rememberedObjectIndecesToControllers[matched_index] =
	            controller_map;
	      }
	
	      // Keep track of this controller
	      controller_map[controller.property] = controller;
	
	      // Okay, now have we saved any values for this controller?
	      if (root.load && root.load.remembered) {
	
	        var preset_map = root.load.remembered;
	
	        // Which preset are we trying to load?
	        var preset;
	
	        if (preset_map[gui.preset]) {
	
	          preset = preset_map[gui.preset];
	
	        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {
	
	          // Uhh, you can have the default instead?
	          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];
	
	        } else {
	
	          // Nada.
	
	          return;
	
	        }
	
	
	        // Did the loaded object remember thcommon.isObject?
	        if (preset[matched_index] &&
	
	          // Did we remember this particular property?
	            preset[matched_index][controller.property] !== undefined) {
	
	          // We did remember something for this guy ...
	          var value = preset[matched_index][controller.property];
	
	          // And that's what it is.
	          controller.initialValue = value;
	          controller.setValue(value);
	
	        }
	
	      }
	
	    }
	
	  }
	
	  function getLocalStorageHash(gui, key) {
	    // TODO how does this deal with multiple GUI's?
	    return document.location.href + '.' + key;
	
	  }
	
	  function addSaveMenu(gui) {
	
	    var div = gui.__save_row = document.createElement('li');
	
	    dom.addClass(gui.domElement, 'has-save');
	
	    gui.__ul.insertBefore(div, gui.__ul.firstChild);
	
	    dom.addClass(div, 'save-row');
	
	    var gears = document.createElement('span');
	    gears.innerHTML = '&nbsp;';
	    dom.addClass(gears, 'button gears');
	
	    // TODO replace with FunctionController
	    var button = document.createElement('span');
	    button.innerHTML = 'Save';
	    dom.addClass(button, 'button');
	    dom.addClass(button, 'save');
	
	    var button2 = document.createElement('span');
	    button2.innerHTML = 'New';
	    dom.addClass(button2, 'button');
	    dom.addClass(button2, 'save-as');
	
	    var button3 = document.createElement('span');
	    button3.innerHTML = 'Revert';
	    dom.addClass(button3, 'button');
	    dom.addClass(button3, 'revert');
	
	    var select = gui.__preset_select = document.createElement('select');
	
	    if (gui.load && gui.load.remembered) {
	
	      common.each(gui.load.remembered, function(value, key) {
	        addPresetOption(gui, key, key == gui.preset);
	      });
	
	    } else {
	      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
	    }
	
	    dom.bind(select, 'change', function() {
	
	
	      for (var index = 0; index < gui.__preset_select.length; index++) {
	        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
	      }
	
	      gui.preset = this.value;
	
	    });
	
	    div.appendChild(select);
	    div.appendChild(gears);
	    div.appendChild(button);
	    div.appendChild(button2);
	    div.appendChild(button3);
	
	    if (SUPPORTS_LOCAL_STORAGE) {
	
	      var saveLocally = document.getElementById('dg-save-locally');
	      var explain = document.getElementById('dg-local-explain');
	
	      saveLocally.style.display = 'block';
	
	      var localStorageCheckBox = document.getElementById('dg-local-storage');
	
	      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
	        localStorageCheckBox.setAttribute('checked', 'checked');
	      }
	
	      function showHideExplain() {
	        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
	      }
	
	      showHideExplain();
	
	      // TODO: Use a boolean controller, fool!
	      dom.bind(localStorageCheckBox, 'change', function() {
	        gui.useLocalStorage = !gui.useLocalStorage;
	        showHideExplain();
	      });
	
	    }
	
	    var newConstructorTextArea = document.getElementById('dg-new-constructor');
	
	    dom.bind(newConstructorTextArea, 'keydown', function(e) {
	      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
	        SAVE_DIALOGUE.hide();
	      }
	    });
	
	    dom.bind(gears, 'click', function() {
	      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
	      SAVE_DIALOGUE.show();
	      newConstructorTextArea.focus();
	      newConstructorTextArea.select();
	    });
	
	    dom.bind(button, 'click', function() {
	      gui.save();
	    });
	
	    dom.bind(button2, 'click', function() {
	      var presetName = prompt('Enter a new preset name.');
	      if (presetName) gui.saveAs(presetName);
	    });
	
	    dom.bind(button3, 'click', function() {
	      gui.revert();
	    });
	
	//    div.appendChild(button2);
	
	  }
	
	  function addResizeHandle(gui) {
	
	    gui.__resize_handle = document.createElement('div');
	
	    common.extend(gui.__resize_handle.style, {
	
	      width: '6px',
	      marginLeft: '-3px',
	      height: '200px',
	      cursor: 'ew-resize',
	      position: 'absolute'
	//      border: '1px solid blue'
	
	    });
	
	    var pmouseX;
	
	    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
	    dom.bind(gui.__closeButton, 'mousedown', dragStart);
	
	    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
	
	    function dragStart(e) {
	
	      e.preventDefault();
	
	      pmouseX = e.clientX;
	
	      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.bind(window, 'mousemove', drag);
	      dom.bind(window, 'mouseup', dragStop);
	
	      return false;
	
	    }
	
	    function drag(e) {
	
	      e.preventDefault();
	
	      gui.width += pmouseX - e.clientX;
	      gui.onResize();
	      pmouseX = e.clientX;
	
	      return false;
	
	    }
	
	    function dragStop() {
	
	      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.unbind(window, 'mousemove', drag);
	      dom.unbind(window, 'mouseup', dragStop);
	
	    }
	
	  }
	
	  function setWidth(gui, w) {
	    gui.domElement.style.width = w + 'px';
	    // Auto placed save-rows are position fixed, so we have to
	    // set the width manually if we want it to bleed to the edge
	    if (gui.__save_row && gui.autoPlace) {
	      gui.__save_row.style.width = w + 'px';
	    }if (gui.__closeButton) {
	      gui.__closeButton.style.width = w + 'px';
	    }
	  }
	
	  function getCurrentPreset(gui, useInitialValues) {
	
	    var toReturn = {};
	
	    // For each object I'm remembering
	    common.each(gui.__rememberedObjects, function(val, index) {
	
	      var saved_values = {};
	
	      // The controllers I've made for thcommon.isObject by property
	      var controller_map =
	          gui.__rememberedObjectIndecesToControllers[index];
	
	      // Remember each value for each property
	      common.each(controller_map, function(controller, property) {
	        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
	      });
	
	      // Save the values for thcommon.isObject
	      toReturn[index] = saved_values;
	
	    });
	
	    return toReturn;
	
	  }
	
	  function addPresetOption(gui, name, setSelected) {
	    var opt = document.createElement('option');
	    opt.innerHTML = name;
	    opt.value = name;
	    gui.__preset_select.appendChild(opt);
	    if (setSelected) {
	      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
	    }
	  }
	
	  function setPresetSelectIndex(gui) {
	    for (var index = 0; index < gui.__preset_select.length; index++) {
	      if (gui.__preset_select[index].value == gui.preset) {
	        gui.__preset_select.selectedIndex = index;
	      }
	    }
	  }
	
	  function markPresetModified(gui, modified) {
	    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
	//    console.log('mark', modified, opt);
	    if (modified) {
	      opt.innerHTML = opt.value + "*";
	    } else {
	      opt.innerHTML = opt.value;
	    }
	  }
	
	  function updateDisplays(controllerArray) {
	
	
	    if (controllerArray.length != 0) {
	
	      requestAnimationFrame(function() {
	        updateDisplays(controllerArray);
	      });
	
	    }
	
	    common.each(controllerArray, function(c) {
	      c.updateDisplay();
	    });
	
	  }
	
	  return GUI;
	
	})(dat.utils.css,
	"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
	".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
	dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {
	
	      return function(object, property) {
	
	        var initialValue = object[property];
	
	        // Providing options?
	        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
	          return new OptionController(object, property, arguments[2]);
	        }
	
	        // Providing a map?
	
	        if (common.isNumber(initialValue)) {
	
	          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {
	
	            // Has min and max.
	            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
	
	          } else {
	
	            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
	
	          }
	
	        }
	
	        if (common.isString(initialValue)) {
	          return new StringController(object, property);
	        }
	
	        if (common.isFunction(initialValue)) {
	          return new FunctionController(object, property, '');
	        }
	
	        if (common.isBoolean(initialValue)) {
	          return new BooleanController(object, property);
	        }
	
	      }
	
	    })(dat.controllers.OptionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.StringController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a text input to alter the string property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var StringController = function(object, property) {
	
	    StringController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');
	
	    dom.bind(this.__input, 'keyup', onChange);
	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) {
	        this.blur();
	      }
	    });
	    
	
	    function onChange() {
	      _this.setValue(_this.__input.value);
	    }
	
	    function onBlur() {
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    this.updateDisplay();
	
	    this.domElement.appendChild(this.__input);
	
	  };
	
	  StringController.superclass = Controller;
	
	  common.extend(
	
	      StringController.prototype,
	      Controller.prototype,
	
	      {
	
	        updateDisplay: function() {
	          // Stops the caret from moving on account of:
	          // keyup -> setValue -> updateDisplay
	          if (!dom.isActive(this.__input)) {
	            this.__input.value = this.getValue();
	          }
	          return StringController.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  return StringController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common),
	dat.controllers.FunctionController,
	dat.controllers.BooleanController,
	dat.utils.common),
	dat.controllers.Controller,
	dat.controllers.BooleanController,
	dat.controllers.FunctionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.OptionController,
	dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {
	
	  var ColorController = function(object, property) {
	
	    ColorController.superclass.call(this, object, property);
	
	    this.__color = new Color(this.getValue());
	    this.__temp = new Color(0);
	
	    var _this = this;
	
	    this.domElement = document.createElement('div');
	
	    dom.makeSelectable(this.domElement, false);
	
	    this.__selector = document.createElement('div');
	    this.__selector.className = 'selector';
	
	    this.__saturation_field = document.createElement('div');
	    this.__saturation_field.className = 'saturation-field';
	
	    this.__field_knob = document.createElement('div');
	    this.__field_knob.className = 'field-knob';
	    this.__field_knob_border = '2px solid ';
	
	    this.__hue_knob = document.createElement('div');
	    this.__hue_knob.className = 'hue-knob';
	
	    this.__hue_field = document.createElement('div');
	    this.__hue_field.className = 'hue-field';
	
	    this.__input = document.createElement('input');
	    this.__input.type = 'text';
	    this.__input_textShadow = '0 1px 1px ';
	
	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) { // on enter
	        onBlur.call(this);
	      }
	    });
	
	    dom.bind(this.__input, 'blur', onBlur);
	
	    dom.bind(this.__selector, 'mousedown', function(e) {
	
	      dom
	        .addClass(this, 'drag')
	        .bind(window, 'mouseup', function(e) {
	          dom.removeClass(_this.__selector, 'drag');
	        });
	
	    });
	
	    var value_field = document.createElement('div');
	
	    common.extend(this.__selector.style, {
	      width: '122px',
	      height: '102px',
	      padding: '3px',
	      backgroundColor: '#222',
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
	    });
	
	    common.extend(this.__field_knob.style, {
	      position: 'absolute',
	      width: '12px',
	      height: '12px',
	      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
	      borderRadius: '12px',
	      zIndex: 1
	    });
	    
	    common.extend(this.__hue_knob.style, {
	      position: 'absolute',
	      width: '15px',
	      height: '2px',
	      borderRight: '4px solid #fff',
	      zIndex: 1
	    });
	
	    common.extend(this.__saturation_field.style, {
	      width: '100px',
	      height: '100px',
	      border: '1px solid #555',
	      marginRight: '3px',
	      display: 'inline-block',
	      cursor: 'pointer'
	    });
	
	    common.extend(value_field.style, {
	      width: '100%',
	      height: '100%',
	      background: 'none'
	    });
	    
	    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');
	
	    common.extend(this.__hue_field.style, {
	      width: '15px',
	      height: '100px',
	      display: 'inline-block',
	      border: '1px solid #555',
	      cursor: 'ns-resize'
	    });
	
	    hueGradient(this.__hue_field);
	
	    common.extend(this.__input.style, {
	      outline: 'none',
	//      width: '120px',
	      textAlign: 'center',
	//      padding: '4px',
	//      marginBottom: '6px',
	      color: '#fff',
	      border: 0,
	      fontWeight: 'bold',
	      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
	    });
	
	    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
	    dom.bind(this.__field_knob, 'mousedown', fieldDown);
	
	    dom.bind(this.__hue_field, 'mousedown', function(e) {
	      setH(e);
	      dom.bind(window, 'mousemove', setH);
	      dom.bind(window, 'mouseup', unbindH);
	    });
	
	    function fieldDown(e) {
	      setSV(e);
	      // document.body.style.cursor = 'none';
	      dom.bind(window, 'mousemove', setSV);
	      dom.bind(window, 'mouseup', unbindSV);
	    }
	
	    function unbindSV() {
	      dom.unbind(window, 'mousemove', setSV);
	      dom.unbind(window, 'mouseup', unbindSV);
	      // document.body.style.cursor = 'default';
	    }
	
	    function onBlur() {
	      var i = interpret(this.value);
	      if (i !== false) {
	        _this.__color.__state = i;
	        _this.setValue(_this.__color.toOriginal());
	      } else {
	        this.value = _this.__color.toString();
	      }
	    }
	
	    function unbindH() {
	      dom.unbind(window, 'mousemove', setH);
	      dom.unbind(window, 'mouseup', unbindH);
	    }
	
	    this.__saturation_field.appendChild(value_field);
	    this.__selector.appendChild(this.__field_knob);
	    this.__selector.appendChild(this.__saturation_field);
	    this.__selector.appendChild(this.__hue_field);
	    this.__hue_field.appendChild(this.__hue_knob);
	
	    this.domElement.appendChild(this.__input);
	    this.domElement.appendChild(this.__selector);
	
	    this.updateDisplay();
	
	    function setSV(e) {
	
	      e.preventDefault();
	
	      var w = dom.getWidth(_this.__saturation_field);
	      var o = dom.getOffset(_this.__saturation_field);
	      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
	      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;
	
	      if (v > 1) v = 1;
	      else if (v < 0) v = 0;
	
	      if (s > 1) s = 1;
	      else if (s < 0) s = 0;
	
	      _this.__color.v = v;
	      _this.__color.s = s;
	
	      _this.setValue(_this.__color.toOriginal());
	
	
	      return false;
	
	    }
	
	    function setH(e) {
	
	      e.preventDefault();
	
	      var s = dom.getHeight(_this.__hue_field);
	      var o = dom.getOffset(_this.__hue_field);
	      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;
	
	      if (h > 1) h = 1;
	      else if (h < 0) h = 0;
	
	      _this.__color.h = h * 360;
	
	      _this.setValue(_this.__color.toOriginal());
	
	      return false;
	
	    }
	
	  };
	
	  ColorController.superclass = Controller;
	
	  common.extend(
	
	      ColorController.prototype,
	      Controller.prototype,
	
	      {
	
	        updateDisplay: function() {
	
	          var i = interpret(this.getValue());
	
	          if (i !== false) {
	
	            var mismatch = false;
	
	            // Check for mismatch on the interpreted value.
	
	            common.each(Color.COMPONENTS, function(component) {
	              if (!common.isUndefined(i[component]) &&
	                  !common.isUndefined(this.__color.__state[component]) &&
	                  i[component] !== this.__color.__state[component]) {
	                mismatch = true;
	                return {}; // break
	              }
	            }, this);
	
	            // If nothing diverges, we keep our previous values
	            // for statefulness, otherwise we recalculate fresh
	            if (mismatch) {
	              common.extend(this.__color.__state, i);
	            }
	
	          }
	
	          common.extend(this.__temp.__state, this.__color.__state);
	
	          this.__temp.a = 1;
	
	          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
	          var _flip = 255 - flip;
	
	          common.extend(this.__field_knob.style, {
	            marginLeft: 100 * this.__color.s - 7 + 'px',
	            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
	            backgroundColor: this.__temp.toString(),
	            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
	          });
	
	          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'
	
	          this.__temp.s = 1;
	          this.__temp.v = 1;
	
	          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());
	
	          common.extend(this.__input.style, {
	            backgroundColor: this.__input.value = this.__color.toString(),
	            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
	            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
	          });
	
	        }
	
	      }
	
	  );
	  
	  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
	  
	  function linearGradient(elem, x, a, b) {
	    elem.style.background = '';
	    common.each(vendors, function(vendor) {
	      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
	    });
	  }
	  
	  function hueGradient(elem) {
	    elem.style.background = '';
	    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
	    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	  }
	
	
	  return ColorController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.color.Color = (function (interpret, math, toString, common) {
	
	  var Color = function() {
	
	    this.__state = interpret.apply(this, arguments);
	
	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }
	
	    this.__state.a = this.__state.a || 1;
	
	
	  };
	
	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];
	
	  common.extend(Color.prototype, {
	
	    toString: function() {
	      return toString(this);
	    },
	
	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }
	
	  });
	
	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);
	
	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');
	
	  Object.defineProperty(Color.prototype, 'a', {
	
	    get: function() {
	      return this.__state.a;
	    },
	
	    set: function(v) {
	      this.__state.a = v;
	    }
	
	  });
	
	  Object.defineProperty(Color.prototype, 'hex', {
	
	    get: function() {
	
	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }
	
	      return this.__state.hex;
	
	    },
	
	    set: function(v) {
	
	      this.__state.space = 'HEX';
	      this.__state.hex = v;
	
	    }
	
	  });
	
	  function defineRGBComponent(target, component, componentHexIndex) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }
	
	        recalculateRGB(this, component, componentHexIndex);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function defineHSVComponent(target, component) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'HSV')
	          return this.__state[component];
	
	        recalculateHSV(this);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function recalculateRGB(color, component, componentHexIndex) {
	
	    if (color.__state.space === 'HEX') {
	
	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);
	
	    } else if (color.__state.space === 'HSV') {
	
	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
	
	    } else {
	
	      throw 'Corrupted color state';
	
	    }
	
	  }
	
	  function recalculateHSV(color) {
	
	    var result = math.rgb_to_hsv(color.r, color.g, color.b);
	
	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );
	
	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }
	
	  }
	
	  return Color;
	
	})(dat.color.interpret,
	dat.color.math = (function () {
	
	  var tmpComponent;
	
	  return {
	
	    hsv_to_rgb: function(h, s, v) {
	
	      var hi = Math.floor(h / 60) % 6;
	
	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];
	
	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };
	
	    },
	
	    rgb_to_hsv: function(r, g, b) {
	
	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;
	
	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }
	
	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }
	
	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },
	
	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },
	
	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },
	
	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }
	
	  }
	
	})(),
	dat.color.toString,
	dat.utils.common),
	dat.color.interpret,
	dat.utils.common),
	dat.utils.requestAnimationFrame = (function () {
	
	  /**
	   * requirejs version of Paul Irish's RequestAnimationFrame
	   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	   */
	
	  return window.webkitRequestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	      window.oRequestAnimationFrame ||
	      window.msRequestAnimationFrame ||
	      function(callback, element) {
	
	        window.setTimeout(callback, 1000 / 60);
	
	      };
	})(),
	dat.dom.CenteredDiv = (function (dom, common) {
	
	
	  var CenteredDiv = function() {
	
	    this.backgroundElement = document.createElement('div');
	    common.extend(this.backgroundElement.style, {
	      backgroundColor: 'rgba(0,0,0,0.8)',
	      top: 0,
	      left: 0,
	      display: 'none',
	      zIndex: '1000',
	      opacity: 0,
	      WebkitTransition: 'opacity 0.2s linear'
	    });
	
	    dom.makeFullscreen(this.backgroundElement);
	    this.backgroundElement.style.position = 'fixed';
	
	    this.domElement = document.createElement('div');
	    common.extend(this.domElement.style, {
	      position: 'fixed',
	      display: 'none',
	      zIndex: '1001',
	      opacity: 0,
	      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
	    });
	
	
	    document.body.appendChild(this.backgroundElement);
	    document.body.appendChild(this.domElement);
	
	    var _this = this;
	    dom.bind(this.backgroundElement, 'click', function() {
	      _this.hide();
	    });
	
	
	  };
	
	  CenteredDiv.prototype.show = function() {
	
	    var _this = this;
	    
	
	
	    this.backgroundElement.style.display = 'block';
	
	    this.domElement.style.display = 'block';
	    this.domElement.style.opacity = 0;
	//    this.domElement.style.top = '52%';
	    this.domElement.style.webkitTransform = 'scale(1.1)';
	
	    this.layout();
	
	    common.defer(function() {
	      _this.backgroundElement.style.opacity = 1;
	      _this.domElement.style.opacity = 1;
	      _this.domElement.style.webkitTransform = 'scale(1)';
	    });
	
	  };
	
	  CenteredDiv.prototype.hide = function() {
	
	    var _this = this;
	
	    var hide = function() {
	
	      _this.domElement.style.display = 'none';
	      _this.backgroundElement.style.display = 'none';
	
	      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
	      dom.unbind(_this.domElement, 'transitionend', hide);
	      dom.unbind(_this.domElement, 'oTransitionEnd', hide);
	
	    };
	
	    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
	    dom.bind(this.domElement, 'transitionend', hide);
	    dom.bind(this.domElement, 'oTransitionEnd', hide);
	
	    this.backgroundElement.style.opacity = 0;
	//    this.domElement.style.top = '48%';
	    this.domElement.style.opacity = 0;
	    this.domElement.style.webkitTransform = 'scale(1.1)';
	
	  };
	
	  CenteredDiv.prototype.layout = function() {
	    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
	    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
	  };
	  
	  function lockScroll(e) {
	    console.log(e);
	  }
	
	  return CenteredDiv;
	
	})(dat.dom.dom,
	dat.utils.common),
	dat.dom.dom,
	dat.utils.common);

/***/ },
/* 288 */
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	/** @namespace */
	var dat = module.exports = dat || {};
	
	/** @namespace */
	dat.color = dat.color || {};
	
	/** @namespace */
	dat.utils = dat.utils || {};
	
	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;
	
	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */
	
	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {
	
	      
	      if (ARR_EACH && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {
	
	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },
	
	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();
	
	
	dat.color.toString = (function (common) {
	
	  return function(color) {
	
	    if (color.a == 1 || common.isUndefined(color.a)) {
	
	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }
	
	      return '#' + s;
	
	    } else {
	
	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';
	
	    }
	
	  }
	
	})(dat.utils.common);
	
	
	dat.Color = dat.color.Color = (function (interpret, math, toString, common) {
	
	  var Color = function() {
	
	    this.__state = interpret.apply(this, arguments);
	
	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }
	
	    this.__state.a = this.__state.a || 1;
	
	
	  };
	
	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];
	
	  common.extend(Color.prototype, {
	
	    toString: function() {
	      return toString(this);
	    },
	
	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }
	
	  });
	
	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);
	
	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');
	
	  Object.defineProperty(Color.prototype, 'a', {
	
	    get: function() {
	      return this.__state.a;
	    },
	
	    set: function(v) {
	      this.__state.a = v;
	    }
	
	  });
	
	  Object.defineProperty(Color.prototype, 'hex', {
	
	    get: function() {
	
	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }
	
	      return this.__state.hex;
	
	    },
	
	    set: function(v) {
	
	      this.__state.space = 'HEX';
	      this.__state.hex = v;
	
	    }
	
	  });
	
	  function defineRGBComponent(target, component, componentHexIndex) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }
	
	        recalculateRGB(this, component, componentHexIndex);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function defineHSVComponent(target, component) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'HSV')
	          return this.__state[component];
	
	        recalculateHSV(this);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function recalculateRGB(color, component, componentHexIndex) {
	
	    if (color.__state.space === 'HEX') {
	
	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);
	
	    } else if (color.__state.space === 'HSV') {
	
	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
	
	    } else {
	
	      throw 'Corrupted color state';
	
	    }
	
	  }
	
	  function recalculateHSV(color) {
	
	    var result = math.rgb_to_hsv(color.r, color.g, color.b);
	
	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );
	
	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }
	
	  }
	
	  return Color;
	
	})(dat.color.interpret = (function (toString, common) {
	
	  var result, toReturn;
	
	  var interpret = function() {
	
	    toReturn = false;
	
	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];
	
	    common.each(INTERPRETATIONS, function(family) {
	
	      if (family.litmus(original)) {
	
	        common.each(family.conversions, function(conversion, conversionName) {
	
	          result = conversion.read(original);
	
	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;
	
	          }
	
	        });
	
	        return common.BREAK;
	
	      }
	
	    });
	
	    return toReturn;
	
	  };
	
	  var INTERPRETATIONS = [
	
	    // Strings
	    {
	
	      litmus: common.isString,
	
	      conversions: {
	
	        THREE_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        SIX_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGB: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGBA: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };
	
	          },
	
	          write: toString
	
	        }
	
	      }
	
	    },
	
	    // Numbers
	    {
	
	      litmus: common.isNumber,
	
	      conversions: {
	
	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },
	
	          write: function(color) {
	            return color.hex;
	          }
	        }
	
	      }
	
	    },
	
	    // Arrays
	    {
	
	      litmus: common.isArray,
	
	      conversions: {
	
	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }
	
	        },
	
	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }
	
	        }
	
	      }
	
	    },
	
	    // Objects
	    {
	
	      litmus: common.isObject,
	
	      conversions: {
	
	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },
	
	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },
	
	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },
	
	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }
	
	        }
	
	      }
	
	    }
	
	
	  ];
	
	  return interpret;
	
	
	})(dat.color.toString,
	dat.utils.common),
	dat.color.math = (function () {
	
	  var tmpComponent;
	
	  return {
	
	    hsv_to_rgb: function(h, s, v) {
	
	      var hi = Math.floor(h / 60) % 6;
	
	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];
	
	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };
	
	    },
	
	    rgb_to_hsv: function(r, g, b) {
	
	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;
	
	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }
	
	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }
	
	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },
	
	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },
	
	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },
	
	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }
	
	  }
	
	})(),
	dat.color.toString,
	dat.utils.common);

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/tweenjs/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */
	
	// Include a performance.now polyfill
	(function () {
	
		if ('performance' in window === false) {
			window.performance = {};
		}
	
		// IE 8
		Date.now = (Date.now || function () {
			return new Date().getTime();
		});
	
		if ('now' in window.performance === false) {
			var offset = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart
			                                                                                    : Date.now();
	
			window.performance.now = function () {
				return Date.now() - offset;
			};
		}
	
	})();
	
	var TWEEN = TWEEN || (function () {
	
		var _tweens = [];
	
		return {
	
			getAll: function () {
	
				return _tweens;
	
			},
	
			removeAll: function () {
	
				_tweens = [];
	
			},
	
			add: function (tween) {
	
				_tweens.push(tween);
	
			},
	
			remove: function (tween) {
	
				var i = _tweens.indexOf(tween);
	
				if (i !== -1) {
					_tweens.splice(i, 1);
				}
	
			},
	
			update: function (time) {
	
				if (_tweens.length === 0) {
					return false;
				}
	
				var i = 0;
	
				time = time !== undefined ? time : window.performance.now();
	
				while (i < _tweens.length) {
	
					if (_tweens[i].update(time)) {
						i++;
					} else {
						_tweens.splice(i, 1);
					}
	
				}
	
				return true;
	
			}
		};
	
	})();
	
	TWEEN.Tween = function (object) {
	
		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _yoyo = false;
		var _isPlaying = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = TWEEN.Easing.Linear.None;
		var _interpolationFunction = TWEEN.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;
		var _onStopCallback = null;
	
		// Set all starting values present on the target object
		for (var field in object) {
			_valuesStart[field] = parseFloat(object[field], 10);
		}
	
		this.to = function (properties, duration) {
	
			if (duration !== undefined) {
				_duration = duration;
			}
	
			_valuesEnd = properties;
	
			return this;
	
		};
	
		this.start = function (time) {
	
			TWEEN.add(this);
	
			_isPlaying = true;
	
			_onStartCallbackFired = false;
	
			_startTime = time !== undefined ? time : window.performance.now();
			_startTime += _delayTime;
	
			for (var property in _valuesEnd) {
	
				// Check if an Array was provided as property value
				if (_valuesEnd[property] instanceof Array) {
	
					if (_valuesEnd[property].length === 0) {
						continue;
					}
	
					// Create a local copy of the Array with the start value at the front
					_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
	
				}
	
				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (_valuesStart[property] === undefined) {
					continue;
				}
	
				_valuesStart[property] = _object[property];
	
				if ((_valuesStart[property] instanceof Array) === false) {
					_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
				}
	
				_valuesStartRepeat[property] = _valuesStart[property] || 0;
	
			}
	
			return this;
	
		};
	
		this.stop = function () {
	
			if (!_isPlaying) {
				return this;
			}
	
			TWEEN.remove(this);
			_isPlaying = false;
	
			if (_onStopCallback !== null) {
				_onStopCallback.call(_object);
			}
	
			this.stopChainedTweens();
			return this;
	
		};
	
		this.stopChainedTweens = function () {
	
			for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
				_chainedTweens[i].stop();
			}
	
		};
	
		this.delay = function (amount) {
	
			_delayTime = amount;
			return this;
	
		};
	
		this.repeat = function (times) {
	
			_repeat = times;
			return this;
	
		};
	
		this.yoyo = function (yoyo) {
	
			_yoyo = yoyo;
			return this;
	
		};
	
	
		this.easing = function (easing) {
	
			_easingFunction = easing;
			return this;
	
		};
	
		this.interpolation = function (interpolation) {
	
			_interpolationFunction = interpolation;
			return this;
	
		};
	
		this.chain = function () {
	
			_chainedTweens = arguments;
			return this;
	
		};
	
		this.onStart = function (callback) {
	
			_onStartCallback = callback;
			return this;
	
		};
	
		this.onUpdate = function (callback) {
	
			_onUpdateCallback = callback;
			return this;
	
		};
	
		this.onComplete = function (callback) {
	
			_onCompleteCallback = callback;
			return this;
	
		};
	
		this.onStop = function (callback) {
	
			_onStopCallback = callback;
			return this;
	
		};
	
		this.update = function (time) {
	
			var property;
			var elapsed;
			var value;
	
			if (time < _startTime) {
				return true;
			}
	
			if (_onStartCallbackFired === false) {
	
				if (_onStartCallback !== null) {
					_onStartCallback.call(_object);
				}
	
				_onStartCallbackFired = true;
	
			}
	
			elapsed = (time - _startTime) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;
	
			value = _easingFunction(elapsed);
	
			for (property in _valuesEnd) {
	
				// Don't update properties that do not exist in the source object
				if (_valuesStart[property] === undefined) {
					continue;
				}
	
				var start = _valuesStart[property] || 0;
				var end = _valuesEnd[property];
	
				if (end instanceof Array) {
	
					_object[property] = _interpolationFunction(end, value);
	
				} else {
	
					// Parses relative end values with start as base (e.g.: +10, -3)
					if (typeof (end) === 'string') {
	
						if (end.startsWith('+') || end.startsWith('-')) {
							end = start + parseFloat(end, 10);
						} else {
							end = parseFloat(end, 10);
						}
					}
	
					// Protect against non numeric properties.
					if (typeof (end) === 'number') {
						_object[property] = start + (end - start) * value;
					}
	
				}
	
			}
	
			if (_onUpdateCallback !== null) {
				_onUpdateCallback.call(_object, value);
			}
	
			if (elapsed === 1) {
	
				if (_repeat > 0) {
	
					if (isFinite(_repeat)) {
						_repeat--;
					}
	
					// Reassign starting values, restart by making startTime = now
					for (property in _valuesStartRepeat) {
	
						if (typeof (_valuesEnd[property]) === 'string') {
							_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
						}
	
						if (_yoyo) {
							var tmp = _valuesStartRepeat[property];
	
							_valuesStartRepeat[property] = _valuesEnd[property];
							_valuesEnd[property] = tmp;
						}
	
						_valuesStart[property] = _valuesStartRepeat[property];
	
					}
	
					if (_yoyo) {
						_reversed = !_reversed;
					}
	
					_startTime = time + _delayTime;
	
					return true;
	
				} else {
	
					if (_onCompleteCallback !== null) {
						_onCompleteCallback.call(_object);
					}
	
					for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
						// Make the chained tweens start exactly at the time they should,
						// even if the `update()` method was called way past the duration of the tween
						_chainedTweens[i].start(_startTime + _duration);
					}
	
					return false;
	
				}
	
			}
	
			return true;
	
		};
	
	};
	
	
	TWEEN.Easing = {
	
		Linear: {
	
			None: function (k) {
	
				return k;
	
			}
	
		},
	
		Quadratic: {
	
			In: function (k) {
	
				return k * k;
	
			},
	
			Out: function (k) {
	
				return k * (2 - k);
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return 0.5 * k * k;
				}
	
				return - 0.5 * (--k * (k - 2) - 1);
	
			}
	
		},
	
		Cubic: {
	
			In: function (k) {
	
				return k * k * k;
	
			},
	
			Out: function (k) {
	
				return --k * k * k + 1;
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return 0.5 * k * k * k;
				}
	
				return 0.5 * ((k -= 2) * k * k + 2);
	
			}
	
		},
	
		Quartic: {
	
			In: function (k) {
	
				return k * k * k * k;
	
			},
	
			Out: function (k) {
	
				return 1 - (--k * k * k * k);
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k;
				}
	
				return - 0.5 * ((k -= 2) * k * k * k - 2);
	
			}
	
		},
	
		Quintic: {
	
			In: function (k) {
	
				return k * k * k * k * k;
	
			},
	
			Out: function (k) {
	
				return --k * k * k * k * k + 1;
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k * k;
				}
	
				return 0.5 * ((k -= 2) * k * k * k * k + 2);
	
			}
	
		},
	
		Sinusoidal: {
	
			In: function (k) {
	
				return 1 - Math.cos(k * Math.PI / 2);
	
			},
	
			Out: function (k) {
	
				return Math.sin(k * Math.PI / 2);
	
			},
	
			InOut: function (k) {
	
				return 0.5 * (1 - Math.cos(Math.PI * k));
	
			}
	
		},
	
		Exponential: {
	
			In: function (k) {
	
				return k === 0 ? 0 : Math.pow(1024, k - 1);
	
			},
	
			Out: function (k) {
	
				return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);
	
			},
	
			InOut: function (k) {
	
				if (k === 0) {
					return 0;
				}
	
				if (k === 1) {
					return 1;
				}
	
				if ((k *= 2) < 1) {
					return 0.5 * Math.pow(1024, k - 1);
				}
	
				return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
	
			}
	
		},
	
		Circular: {
	
			In: function (k) {
	
				return 1 - Math.sqrt(1 - k * k);
	
			},
	
			Out: function (k) {
	
				return Math.sqrt(1 - (--k * k));
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return - 0.5 * (Math.sqrt(1 - k * k) - 1);
				}
	
				return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	
			}
	
		},
	
		Elastic: {
	
			In: function (k) {
	
				var s;
				var a = 0.1;
				var p = 0.4;
	
				if (k === 0) {
					return 0;
				}
	
				if (k === 1) {
					return 1;
				}
	
				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}
	
				return - (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	
			},
	
			Out: function (k) {
	
				var s;
				var a = 0.1;
				var p = 0.4;
	
				if (k === 0) {
					return 0;
				}
	
				if (k === 1) {
					return 1;
				}
	
				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}
	
				return (a * Math.pow(2, - 10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
	
			},
	
			InOut: function (k) {
	
				var s;
				var a = 0.1;
				var p = 0.4;
	
				if (k === 0) {
					return 0;
				}
	
				if (k === 1) {
					return 1;
				}
	
				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}
	
				if ((k *= 2) < 1) {
					return - 0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
				}
	
				return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	
			}
	
		},
	
		Back: {
	
			In: function (k) {
	
				var s = 1.70158;
	
				return k * k * ((s + 1) * k - s);
	
			},
	
			Out: function (k) {
	
				var s = 1.70158;
	
				return --k * k * ((s + 1) * k + s) + 1;
	
			},
	
			InOut: function (k) {
	
				var s = 1.70158 * 1.525;
	
				if ((k *= 2) < 1) {
					return 0.5 * (k * k * ((s + 1) * k - s));
				}
	
				return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	
			}
	
		},
	
		Bounce: {
	
			In: function (k) {
	
				return 1 - TWEEN.Easing.Bounce.Out(1 - k);
	
			},
	
			Out: function (k) {
	
				if (k < (1 / 2.75)) {
					return 7.5625 * k * k;
				} else if (k < (2 / 2.75)) {
					return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
				} else if (k < (2.5 / 2.75)) {
					return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
				} else {
					return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
				}
	
			},
	
			InOut: function (k) {
	
				if (k < 0.5) {
					return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
				}
	
				return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
	
			}
	
		}
	
	};
	
	TWEEN.Interpolation = {
	
		Linear: function (v, k) {
	
			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.Linear;
	
			if (k < 0) {
				return fn(v[0], v[1], f);
			}
	
			if (k > 1) {
				return fn(v[m], v[m - 1], m - f);
			}
	
			return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
	
		},
	
		Bezier: function (v, k) {
	
			var b = 0;
			var n = v.length - 1;
			var pw = Math.pow;
			var bn = TWEEN.Interpolation.Utils.Bernstein;
	
			for (var i = 0; i <= n; i++) {
				b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
			}
	
			return b;
	
		},
	
		CatmullRom: function (v, k) {
	
			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.CatmullRom;
	
			if (v[0] === v[m]) {
	
				if (k < 0) {
					i = Math.floor(f = m * (1 + k));
				}
	
				return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
	
			} else {
	
				if (k < 0) {
					return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
				}
	
				if (k > 1) {
					return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
				}
	
				return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
	
			}
	
		},
	
		Utils: {
	
			Linear: function (p0, p1, t) {
	
				return (p1 - p0) * t + p0;
	
			},
	
			Bernstein: function (n, i) {
	
				var fc = TWEEN.Interpolation.Utils.Factorial;
	
				return fc(n) / fc(i) / fc(n - i);
	
			},
	
			Factorial: (function () {
	
				var a = [1];
	
				return function (n) {
	
					var s = 1;
	
					if (a[n]) {
						return a[n];
					}
	
					for (var i = n; i > 1; i--) {
						s *= i;
					}
	
					a[n] = s;
					return s;
	
				};
	
			})(),
	
			CatmullRom: function (p0, p1, p2, p3, t) {
	
				var v0 = (p2 - p0) * 0.5;
				var v1 = (p3 - p1) * 0.5;
				var t2 = t * t;
				var t3 = t * t2;
	
				return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
	
			}
	
		}
	
	};
	
	// UMD (Universal Module Definition)
	(function (root) {
	
		if (true) {
	
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return TWEEN;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
		} else if (typeof module !== 'undefined' && typeof exports === 'object') {
	
			// Node.js
			module.exports = TWEEN;
	
		} else if (root !== undefined) {
	
			// Global variable
			root.TWEEN = TWEEN;
	
		}
	
	})(this);


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map