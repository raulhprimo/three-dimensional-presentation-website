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

// Conjunto de cores que vai de claro a escuro
const colors = [
    0xB3E5FC, // Azul claro
    0x81D4FA, // Azul
    0x4FC3F7, // Azul médio
    0x29B6F6, // Azul mais escuro
    0x039BE5, // Azul escuro
    0x0288D1, // Azul profundo
    0x0277BD, // Azul muito escuro
    0x01579B  // Azul quase preto
];

let currentColorIndex = 0; // Índice da cor atual
const colorChangeInterval = 3500; // Tempo em milissegundos para mudar a cor

// Função para mudar a cor da esfera
function changeColor() {
    sphere.material.color.set(colors[currentColorIndex]);
    currentColorIndex = (currentColorIndex + 1) % colors.length; // Atualiza o índice da cor
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
