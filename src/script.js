import './style.css';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**************
::::::::: SETUP
**************/

let camera, renderer, scene;

const canvas = document.querySelector('canvas.webgl');

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const parameters = {
	color: '#4bcc37',
	lightColor: '#FFFFFF',
};

const aspectRatio = window.innerWidth / window.innerHeight;

scene = new THREE.Scene();

/**************
 ::::::::: CAMERA
**************/

camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.z = 2;
camera.position.y = 1;
camera.position.x = 1;

/**************
::::::::: MATERIAL
**************/
const textureLoader = new THREE.TextureLoader();
const particlesMaterial = new THREE.PointsMaterial({
	size: 0.02,
	sizeAttenuation: true,
});

/**************
::::::::: MESHES
**************/

const count = 2000;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positions, 3)
);
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**************
:::::::: LIGHTS
**************/

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

/**************
::::::::: RENDERER
**************/

renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**************
::::::::: ANIMATION
**************/

const clock = new THREE.Clock();

function animate() {
	const elapsedTime = clock.getElapsedTime();

	controls.update;

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();

/**************
::::::::: DEBUG.UI
**************/

const gui = new dat.GUI();
gui.hide();

gui.addColor(parameters, 'color').onChange(() => {
	material.color.set(parameters.color);
});

/**************
::::::::: RESPONSIVE
**************/

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
