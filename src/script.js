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

// Objects
const geometry = new THREE.SphereGeometry(1, 64, 64);
// const geometry = new THREE.BoxGeometry(2, 3, 3);

// Ground
const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.receiveShadow = true;
groundMesh.position.y = -2;
scene.add(groundMesh);

// Materials
// TODO: add params to customShaderMaterial
const customShaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms: {
    color: {
      type: "v4",
      value: new THREE.Vector4(1.0, 0.0, 1.0, 1.0),
    },
  },
});

const material = new THREE.MeshToonMaterial({
  color: 0x00aaee,
});

// Mesh
const sphere = new THREE.Mesh(geometry, customShaderMaterial);

sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(4, 4, 4);
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
plFolder.add(pointLight, "intensity", 0, 2, 0.25);
plFolder.add(pointLight.position, "x", -4, 4, 0.5);
plFolder.add(pointLight.position, "y", -4, 4, 0.5);
plFolder.add(pointLight.position, "z", -4, 4, 0.5);
plFolder.add(pointLight, "castShadow");
plFolder
  .addColor(plSettings, "color")
  .onChange((value) => pointLight.color.set(value));
plFolder.open();

// DirectionalLight
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
// use this for YouTube thumbnail
dl.position.set(0, 2, 2);
// dl.position.set(0, 2, 0);
dl.castShadow = true;
const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
scene.add(dl, dlHelper);

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
  sphere.rotation.x = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
