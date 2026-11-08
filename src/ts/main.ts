// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Object3D, Object3DEventMap} from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// @ts-ignore
import {MeshoptDecoder} from 'three/examples/jsm/libs/meshopt_decoder.module.js'

const scene = new THREE.Scene();
const configuredRotationSpeed = Number(import.meta.env.VITE_CAKE_ROTATION_SPEED);
const cakeRotationSpeed = Number.isFinite(configuredRotationSpeed) ? configuredRotationSpeed : 0.1;

 // scene.background = new THREE.Color('#77eded');
// creat our sphere
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight + 20
};


const light = new THREE.AmbientLight(0xffffff, 2 );

light.position.set(0, 2, 2);


scene.add(light);
// scene.add(ambientLight);

//Camera
const camera = new THREE.PerspectiveCamera(2, sizes.width / sizes.height);
camera.position.z = 40
camera.position.y = 0
scene.add(camera);


const canvas = document.querySelector('.webgl') as HTMLCanvasElement

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Rederer
const renderer = new THREE.WebGLRenderer({
    canvas,
 alpha: true
});
renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
// renderer.setClearColor(  0x000000, 0 ); // the default


const loaderEl = document.getElementById('loader');
const loaderText = document.getElementById('loader-text');
const loadingWords = ['מזל טוב', 'רק פעם בשנה', 'עוד מעט זה מגיע', 'רק עוד קצת וזה יופיע'];
let wordIndex = 0;
const wordTimer = window.setInterval(() => {
    wordIndex = (wordIndex + 1) % loadingWords.length;
    if (loaderText) loaderText.textContent = loadingWords[wordIndex];
}, 1500);
const hideLoader = () => {
    window.clearInterval(wordTimer);
    loaderEl?.classList.add('hidden');
    window.setTimeout(() => loaderEl?.remove(), 600);
};

const loader = new GLTFLoader();
// cake.glb is meshopt-compressed (EXT_meshopt_compression) to keep the download small on mobile
loader.setMeshoptDecoder(MeshoptDecoder);
const file =  'cake.glb'
let imageObj: THREE.Object3D<THREE.Object3DEventMap>;
// '/Gingerbread House.glb'
loader.load(file, (gltf: { scene: Object3D<Object3DEventMap> }) => {
    gltf.scene.position.y = -0.12;
    const bounds = new THREE.Box3().setFromObject(gltf.scene);
    const center = bounds.getCenter(new THREE.Vector3());
    const rotationPivot = new THREE.Group();
    rotationPivot.position.copy(center);
    gltf.scene.position.sub(center);
    rotationPivot.add(gltf.scene);

    imageObj = rotationPivot;
    scene.add(rotationPivot);
    hideLoader();
}, undefined, (error: any) => {
    console.error('An error happened', error);
    hideLoader();
});

window.addEventListener('resize', async () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

const clock = new THREE.Clock();
const loop = () => {
    const deltaTime = clock.getDelta();
    controls.update();
    if (imageObj) imageObj.rotation.y -= cakeRotationSpeed * deltaTime;
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);

}
loop();
