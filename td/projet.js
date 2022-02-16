//threejs
import * as THREE from "three";

//Objet
//import { FBXLoader } from "./three/three.js-master/examples/jsm/loaders/FBXLoader.js";

//Texture
//import { DDSLoader } from "./three/three.js-master/examples/jsm/loaders/DDSLoader.js";

import { OrbitControls } from "./three/three.js-master/examples//jsm/controls/OrbitControls.js";

let camera, scene, renderer, stats;

const clock = new THREE.Clock();

let mixer;

init();
animate();

// js classique

var mesh;
var mesh2;
var mesh3;
var controls


if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
  alert("Sorry, your browser doesn't support Device Orientation");
}


function deviceOrientationListener(event) {

  $("#alpha").text("alpha : " + Math.round(event.alpha));
  $("#beta").text("beta : " + Math.round(event.beta));
  $("#gamma").text("gamma : " + Math.round(event.gamma));

    mesh.rotation.z = event.alpha * Math.PI/180;
    mesh2.rotation.x = event.beta * Math.PI/180;
    mesh3.rotation.y = event.gamma * Math.PI/180;
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
  camera.position.set(0, 40, 350);

  scene = new THREE.Scene();

  var video = document.querySelector("#videoElement");

  scene.background = new THREE.VideoTexture( video );

  // Light
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, -20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 200, 100);
  dirLight.castShadow = true;
  scene.add(dirLight);

  //  scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

  // model
  // const loader = new FBXLoader();
  // loader.load("table.fbx", function (object) {
  //   object.traverse(function (child) {
  //     if (child.isMesh) {
  //       child.castShadow = true;
  //       child.receiveShadow = true;
  //     }
  //   });
  //   scene.add(object);
  // });

  if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

    const constraints = { video: { width: window.innerWidth, height: window.innerHeight, facingMode: 'environment' } };

    navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

      // apply the stream to the video element used in the texture
      video.srcObject = stream;
      video.play();

    } ).catch( function ( error ) {
      console.error( 'Unable to access the camera/webcam.', error );
      scene.background = new THREE.MeshBasicMaterial( { color: 0xefefef } );
    } );
  } else {
    console.error( 'MediaDevices interface not available.' );
  }

  const geometry = new THREE.TorusGeometry(120, 2.7, 50, 100);
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = -7;
  mesh.position.y = 44;
  mesh.position.z = -8;
  mesh.rotation.y = 90 * Math.PI/180;

  scene.add(mesh);

  const geometry2 = new THREE.TorusGeometry(100, 2.7, 50, 100);
  const material2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

  mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.x = -7;
  mesh2.position.y = 44;
  mesh2.position.z = -8;

  scene.add(mesh2);

  const geometry3 = new THREE.TorusGeometry(110, 2.7, 50, 100);
  const material3 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

  mesh3 = new THREE.Mesh(geometry3, material3);
  mesh3.position.x = -7;
  mesh3.position.y = 44;
  mesh3.position.z = -8;
  

  scene.add(mesh3);

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
