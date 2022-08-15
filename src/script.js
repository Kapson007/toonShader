import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import vShader from "./shaders/vertexShader.glsl.js";
import fShader from "./shaders/fragmentShader.glsl.js";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(10.0, 10.0, 10.0);
pointLight.castShadow = true;
const plHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(pointLight, plHelper);

const plSettings = {
  visible: true,
  color: pointLight.color.getHex(),
};
const plFolder = gui.addFolder("point light");
plFolder.add(plSettings, "visible").onChange((value) => {
  pointLight.visible = value;
  plHelper.visible = value;
});
plFolder.add(pointLight, "intensity", 0, 3, 0.25);
plFolder.add(pointLight.position, "x", -10, 10, 0.5);
plFolder.add(pointLight.position, "y", -10, 10, 0.5);
plFolder.add(pointLight.position, "z", -10, 10, 0.5);
plFolder.add(pointLight, "castShadow");
plFolder
  .addColor(plSettings, "color")
  .onChange((value) => pointLight.color.set(value));
plFolder.open();

// DirectionalLight
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 5, 0);
dl.target.position.set(-5, 0, 0);

// const dl = new THREE.DirectionalLight(0xffffff, 0.5);
// use this for YouTube thumbnail
// dl.position.set(0, 2, 0);

dl.castShadow = false;
dl.visible = false;
const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
scene.add(dl, dlHelper);
scene.add(dl);
scene.add(dl.target);

// set up directional light gui
const dlSettings = {
  visible: true,
  color: dl.color.getHex(),
};
const dlFolder = gui.addFolder("directional light");
dlFolder.add(dlSettings, "visible").onChange((value) => {
  dl.visible = value;
  dlHelper.visible = value;
});
dlFolder.add(dl, "intensity", 0, 1, 0.25);
dlFolder.add(dl.position, "y", 1, 4, 0.5);
dlFolder.add(dl, "castShadow");
dlFolder.addColor(dlSettings, "color").onChange((value) => dl.color.set(value));
dlFolder.open();

// Objects
const geometry = new THREE.SphereGeometry(1, 20, 20);
// const geometry = new THREE.BoxGeometry(2, 3, 3);

// Ground
const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.receiveShadow = true;
groundMesh.position.y = -2;
scene.add(groundMesh);

// Materials
const customShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightDir: {
      type: "v3",
      value: new THREE.Vector3(
        pointLight.position.x,
        pointLight.position.y,
        pointLight.position.z
      ),
    },
  },
  vertexShader: vShader,
  fragmentShader: fShader,
});
const texture = new THREE.TextureLoader().load("../static/simba.jpg");
// texture.wrapS = new THREE.RepeatWrapping;
// texture.wrapT = new THREE.RepeatWrapping();
texture.repeat.set(4, 4, 4);

const material = new THREE.MeshToonMaterial({
  color: 0x00aaee,
  lightMap: texture,
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);

sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add(sphere);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
scene.add(camera);

const cameraFolder = gui.addFolder("camera");

cameraFolder.add(camera.position, "x", -10, 10, 0.5);
cameraFolder.add(camera.position, "y", -10, 10, 0.5);
cameraFolder.add(camera.position, "z", -10, 10, 0.5);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  // Update Orbital Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
