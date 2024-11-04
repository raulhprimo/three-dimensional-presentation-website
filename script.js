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
const material = new THREE.MeshPhongMaterial({ color: 0x2293ff }); // Cor inicial
const sphere = new THREE.Mesh(geometry, material);

// Adiciona a esfera à cena
scene.add(sphere);

// Posiciona a câmera
camera.position.z = 5;

// Conjuntos de cores que vão de claro a escuro
const palettes = [
    [0xB3E5FC, 0x81D4FA, 0x4FC3F7, 0x29B6F6, 0x039BE5, 0x0288D1, 0x0277BD, 0x01579B], // Paleta 1
    [0xFFCCBC, 0xFFAB91, 0xFF8A65, 0xFF7043, 0xFF5722, 0xF4511E, 0xE64A19, 0xD84315], // Paleta 2
    [0xC8E6C9, 0xA5D6A7, 0x81C784, 0x66BB6A, 0x4CAF50, 0x43A047, 0x388E3C, 0x2E7D32], // Paleta 3
    [0xD1C4E9, 0xB39DDB, 0x9575CD, 0x7E57C2, 0x673AB7, 0x5E35B1, 0x512DA8, 0x4527A0]  // Paleta 4
];

const selectedPalette = palettes[Math.floor(Math.random() * palettes.length)]; // Seleciona uma paleta aleatória
let currentColorIndex = 0; // Índice da cor atual
const rotationTime = 100; // Tempo em milissegundos para uma rotação completa (ajuste conforme necessário)
const colorChangeInterval = rotationTime * 67 - 3; // Tempo em milissegundos para mudar a cor

// Função para mudar a cor da esfera
function changeColor() {
    sphere.material.color.set(selectedPalette[currentColorIndex]);
    currentColorIndex = (currentColorIndex + 1) % selectedPalette.length; // Atualiza o índice da cor
}

// Muda a cor pela primeira vez
changeColor();
// Muda a cor a cada intervalo definido
setInterval(changeColor, colorChangeInterval);

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
