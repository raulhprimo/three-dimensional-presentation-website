// Configuração básica do Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Configurações do anel de partículas
const particleCount = 5000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

// Criar partículas em forma de anel
const radius = 2;
const thickness = 0.5;

for (let i = 0; i < particleCount; i++) {
    const angle = (Math.random() * Math.PI * 2);
    const radiusOffset = (Math.random() - 0.5) * thickness;
    const actualRadius = radius + radiusOffset;
    
    positions[i * 3] = Math.cos(angle) * actualRadius;
    positions[i * 3 + 1] = Math.sin(angle) * actualRadius;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

    colors[i * 3] = 1;
    colors[i * 3 + 1] = 1;
    colors[i * 3 + 2] = 1;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 5;

// Rastreamento do mouse
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Função de animação atualizada
function animate() {
    requestAnimationFrame(animate);

    // Rotação suave do anel
    particleSystem.rotation.z += 0.001;
    
    // Efeito parallax com o mouse
    particleSystem.rotation.x = mouse.y * 0.2;
    particleSystem.rotation.y = mouse.x * 0.2;

    // Animação de "respiração" do anel
    const positions = particles.attributes.position.array;
    const time = Date.now() * 0.0005;
    
    for(let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        
        // Adiciona uma ondulação suave
        positions[i3 + 2] = Math.sin(time + Math.sqrt(x*x + y*y)) * 0.1;
    }
    
    particles.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Função para lidar com o redimensionamento da janela
window.addEventListener('resize', () => {
    // Atualiza o tamanho do renderizador
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Atualiza a proporção da câmera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // Atualiza a matriz de projeção da câmera
});

// Função para aplicar o efeito de desfoque
const links = document.querySelectorAll('.navbar a');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        links.forEach(l => {
            if (l !== link) {
                l.classList.add('blur'); // Adiciona a classe de desfoque aos links não hoverados
            }
        });
    });
    link.addEventListener('mouseleave', () => {
        links.forEach(l => {
            l.classList.remove('blur'); // Remove a classe de desfoque quando o mouse sai
        });
    });
});

// Inicia a animação
animate();

