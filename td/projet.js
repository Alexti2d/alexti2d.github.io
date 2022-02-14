//threejs
import * as THREE from "three";

//Objet
import { FBXLoader } from "./three/three.js-master/examples/jsm/loaders/FBXLoader.js";

//Texture
import { DDSLoader } from "./three/three.js-master/examples/jsm/loaders/DDSLoader.js";

import { OrbitControls } from "./three/three.js-master/examples//jsm/controls/OrbitControls.js";

let camera, scene, renderer, stats;

const clock = new THREE.Clock();

let mixer;

init();
animate();

// js classique

var TableLatitude;
var TableLongitude;
var PositionX;
var PositionY;
var CameraY;
var CameraX;
var CameraZ;
var TablePose = false;
var mesh2;
var controls;

const button = document.getElementById("NouvelCoord");
button.addEventListener("click", NouvelCoord);

function NouvelCoord() {
    TablePose = true;
}

window.addEventListener("devicemotion", handleMotionEvent, true);

function handleMotionEvent(event) {

  var AccelerationX = Math.round(event.accelerationIncludingGravity.x);
  var AccelerationY = Math.round(event.accelerationIncludingGravity.y);

  camera.position.x += AccelerationX;

  camera.position.y += AccelerationY;

  CameraX = camera.position.x;
  CameraY = camera.position.y;
  CameraZ = camera.position.z;

  


  

  $("#AccelerationX").text("Acceleration x : " + AccelerationX);
  $("#AccelerationY").text("Acceleration y : " + AccelerationY);
  $("#CameraX").text("Camera X : " + CameraX);
  $("#CameraY").text("Camera Y : " + CameraY);
  $("#CameraZ").text("Camera Z : " + CameraZ);
}

// Fin js classique

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.set(0, 70, 300);
  // camera.rotation.set(0, -50, 0)
  // camera.position.set(0, 300, 300);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

  // Light
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, -20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 200, 100);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 180;
  dirLight.shadow.camera.bottom = -100;
  dirLight.shadow.camera.left = -120;
  dirLight.shadow.camera.right = 120;
  scene.add(dirLight);

  //  scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

  // ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  // model
  const loader = new FBXLoader();
  loader.load("table.fbx", function (object) {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(object);
  });

  const geometry = new THREE.BoxGeometry(121, 2.7, 61);

  var material = new THREE.MeshPhongMaterial();

  material.map = new THREE.TextureLoader().load("Marbre.jpg");
  // material.map = new THREE.TextureLoader().load( 'Granite.jpeg' );
  material.specularMap = new THREE.TextureLoader().load(
    "marbrepecular.jpg"
  );

  mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.x = 2000;
  mesh2.position.y = 2000;
  mesh2.position.z = 2000;

  scene.add(mesh2);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // Obit control
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.target.set(0, 50, 0);
  // controls.update();

  window.addEventListener("resize", onWindowResize);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}