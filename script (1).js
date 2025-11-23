// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);

// Galaxy background
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Nebulae
const nebulaGeometry = new THREE.SphereGeometry(50, 32, 32);
const nebulaMaterial = new THREE.MeshBasicMaterial({ color: 0x800080, transparent: true, opacity: 0.3 });
const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
nebula.position.set(100, 0, -200);
scene.add(nebula);

// Floating planets
const planetGeometry = new THREE.SphereGeometry(5, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.set(-50, 20, -100);
scene.add(planet);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;
    nebula.rotation.y += 0.001;
    planet.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});