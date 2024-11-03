// Configuração básica do Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Ajusta o tamanho do renderizador para o tamanho da janela
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Adiciona uma fonte de luz
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Cria uma geometria de esfera com material que reage à luz
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
const sphere = new THREE.Mesh(geometry, material);

// Adiciona a esfera à cena
scene.add(sphere);

// Posiciona a câmera
camera.position.z = 5;

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    
    // Adiciona rotação à esfera
    sphere.rotation.x += 0.01; // Rotação em torno do eixo X
    sphere.rotation.y += 0.01; // Rotação em torno do eixo Y

    // Adiciona movimento à câmera para criar um efeito 3D
    camera.position.x = 5 * Math.sin(Date.now() * 0.001); // Movimento em X
    camera.position.z = 5 * Math.cos(Date.now() * 0.001); // Movimento em Z
    camera.lookAt(sphere.position); // Faz a câmera olhar para a esfera

    renderer.render(scene, camera);
}

// Inicia a animação
animate();
