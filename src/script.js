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
const geometry = new THREE.SphereGeometry(0.5, 32, 16);

// Materials
const customShaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms: {
    lightpos: {
      type: "v3",
      value: new THREE.Vector3(0, 30, 20),
    },
  },
});

const material = new THREE.MeshStandardMaterial({
  color: 0xffaa00,
  roughness: 0.39,
  vertexShader: vShader,
  fragmentShader: fShader,
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
//scene.add(sphere2);

// Lights

const pointLight = new THREE.PointLight(0xff00ff, 1);
const pointLight2 = new THREE.PointLight(0x00ffff, 0.2);
pointLight.position.set(1, 1, 1);
pointLight2.position.set(1, 2, 20);
scene.add(pointLight);
scene.add(pointLight2);

gui.add(pointLight.position, "y").min(-3).max(3).step(0.01);
gui.add(pointLight.position, "x").min(-3).max(3).step(0.01);
gui.add(pointLight.position, "z").min(-3).max(3).step(0.01);
gui.add(pointLight, "intensity").min(0).max(3).step(0.01);

let ambientLight = new THREE.AmbientLight(0x111111);
ambientLight.position.set(1, 1, 10);
scene.add(ambientLight);

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
  45,
  sizes.width / sizes.height,
  0.1,
  10000
);
camera.position.z = 2;
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

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

/**
 * Animate
 */

const clock = new THREE.Clock();
let angle = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  angle += 0.01;
  // pointLight.position.set(50 * Math.cos(angle), 75, 50 * Math.sin(angle));
  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
