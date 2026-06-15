// =========================
// QUIZ ARENA 3D BACKGROUND
// THREE.JS GALAXY
// =========================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  window.devicePixelRatio
);

// attach canvas
const container =
document.getElementById("bg-canvas");

container.appendChild(renderer.domElement);

// camera position
camera.position.z = 30;

// =========================
// GALAXY PARTICLES
// =========================

const particlesCount = 7000;

const positions = new Float32Array(
  particlesCount * 3
);

const colors = new Float32Array(
  particlesCount * 3
);

for(let i = 0; i < particlesCount; i++){

  const i3 = i * 3;

  const radius =
  Math.random() * 45;

  const spin =
  radius * 0.35;

  const branch =
  (i % 3) / 3 * Math.PI * 2;

  const randomX =
  (Math.random() - 0.5) * 6;

  const randomY =
  (Math.random() - 0.5) * 6;

  const randomZ =
  (Math.random() - 0.5) * 6;

  positions[i3] =
  Math.cos(branch + spin) * radius + randomX;

  positions[i3 + 1] =
  randomY;

  positions[i3 + 2] =
  Math.sin(branch + spin) * radius + randomZ;

  // neon colors
  colors[i3] =
  Math.random() * 0.5 + 0.5;

  colors[i3 + 1] =
  Math.random() * 0.2;

  colors[i3 + 2] =
  1;
}

const geometry =
new THREE.BufferGeometry();

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(
    positions,
    3
  )
);

geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(
    colors,
    3
  )
);

// =========================
// MATERIAL
// =========================

const material =
new THREE.PointsMaterial({

  size: 0.06,

  vertexColors: true,

  transparent: true,

  opacity: 0.9
});

// =========================
// GALAXY OBJECT
// =========================

const galaxy =
new THREE.Points(
  geometry,
  material
);

scene.add(galaxy);

// =========================
// FLOATING ORBS
// =========================

const orbs = [];

for(let i = 0; i < 12; i++){

  const geometry =
  new THREE.SphereGeometry(
    1.2,
    32,
    32
  );

  const material =
  new THREE.MeshBasicMaterial({

    color: new THREE.Color(
      `hsl(${Math.random()*360},100%,60%)`
    ),

    transparent: true,

    opacity: 0.25
  });

  const sphere =
  new THREE.Mesh(
    geometry,
    material
  );

  sphere.position.set(

    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 25,
    (Math.random() - 0.5) * 35
  );

  scene.add(sphere);

  orbs.push(sphere);
}

// =========================
// MOUSE CONTROL
// =========================

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
  "mousemove",
  (e) => {

    mouseX =
    (e.clientX / window.innerWidth) - 0.5;

    mouseY =
    (e.clientY / window.innerHeight) - 0.5;

  }
);

// =========================
// ANIMATION LOOP
// =========================

function animate(){

  requestAnimationFrame(animate);

  // galaxy rotation
  galaxy.rotation.y += 0.0008;
  galaxy.rotation.x += 0.0002;

  // mouse parallax
  galaxy.rotation.y += mouseX * 0.0015;
  galaxy.rotation.x += mouseY * 0.0012;

  // floating orbs motion
  orbs.forEach((orb, i) => {

    orb.position.y +=
    Math.sin(Date.now() * 0.001 + i) * 0.01;

    orb.rotation.x += 0.002;
    orb.rotation.y += 0.002;

  });

  renderer.render(scene, camera);
}

animate();

// =========================
// RESIZE HANDLING
// =========================

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
    window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);