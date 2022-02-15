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

var TablePose = false;
var mesh2;
var controls

const button = document.getElementById("NouvelCoord");
button.addEventListener("click", NouvelCoord);

function NouvelCoord() {
  TablePose = true;
}

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
  alert("Sorry, your browser doesn't support Device Orientation");
}
function deviceOrientationListener(event) {

  $("#CameraX").text("Orientation alpha : " + Math.round(event.alpha));
  $("#CameraY").text("Orientation beta : " + Math.round(event.beta));
  $("#CameraZ").text("Orientation gamma : " + Math.round(event.gamma));

  camera.rotation.x = event.alpha * Math.PI / 180
  camera.rotation.y = event.beta * Math.PI / 180
  camera.rotation.z = event.gamma * Math.PI / 180

  // controls.target.set(event.alpha, event.beta, event.gamma);
  // controls.update();

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

  scene = new THREE.Scene();

  var video = document.querySelector("#videoElement");

  scene.background = new THREE.VideoTexture( video );

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

  if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

    const constraints = { video: { width: window.innerWidth, height: window.innerHeight, facingMode: 'environment' } };

    navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

      // apply the stream to the video element used in the texture
      video.srcObject = stream;
      video.play();

    } ).catch( function ( error ) {
      console.error( 'Unable to access the camera/webcam.', error );
    } );
  } else {
    console.error( 'MediaDevices interface not available.' );
  }

  const geometry = new THREE.BoxGeometry(121, 2.7, 61);

  var material = new THREE.MeshPhongMaterial();

  material.map = new THREE.TextureLoader().load("Marbre.jpg");
  // material.map = new THREE.TextureLoader().load( 'Granite.jpeg' );
  material.specularMap = new THREE.TextureLoader().load("marbrepecular.jpg");

  mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.x = -7;
  mesh2.position.y = 44;
  mesh2.position.z = -8;

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
