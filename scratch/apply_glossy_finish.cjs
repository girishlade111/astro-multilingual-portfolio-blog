const fs = require('fs');
const file = 'src/components/Lanyard.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Update FINISHES.glossy for an authentic, glass-like VIP glossy laminate
const targetFinish = "glossy: { roughness: 0.12, metalness: 0, clearcoat: 1.0, clearcoatRoughness: 0.05, foil: 0, anisotropy: 0 },";
const replFinish = "glossy: { roughness: 0.05, metalness: 0, clearcoat: 1.0, clearcoatRoughness: 0.03, foil: 0, anisotropy: 0 },";
code = code.replace(targetFinish, replFinish);

// 2. Update buildEnvironment: Replace flat white wall at [0,0,9] with angled studio strip lights
const targetEnv = `const buildEnvironment = renderer => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.035, 0.035, 0.04);
  const geometry = new THREE.PlaneGeometry(1, 1);
  const materials = [];
  const panel = (intensity, position, scale, rotation = 0) => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(intensity, intensity, intensity),
      side: THREE.DoubleSide
    });
    materials.push(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(scale[0], scale[1], 1);
    mesh.lookAt(0, 0, 0);
    mesh.rotateZ(rotation);
    scene.add(mesh);
  };
  panel(2.2, [0, 4.5, 8], [9, 5]);
  panel(1.8, [-4.5, 1, 7], [6, 10]);
  panel(1.6, [4.5, 1, 8], [6, 10]);
  panel(1.4, [0, 0, 9], [12, 12]);
  panel(1.2, [0, 6, -6], [12, 6]);
  panel(0.6, [0, -7, 1], [16, 6]);
  panel(0.8, [8, 0, -2], [6, 10]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene, 0.035);
  pmrem.dispose();
  geometry.dispose();
  materials.forEach(material => material.dispose());
  return target;
};`;

const replEnv = `const buildEnvironment = renderer => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.015, 0.015, 0.02);
  const geometry = new THREE.PlaneGeometry(1, 1);
  const materials = [];
  const panel = (intensity, position, scale, rotation = 0) => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(intensity, intensity, intensity),
      side: THREE.DoubleSide
    });
    materials.push(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(scale[0], scale[1], 1);
    mesh.lookAt(0, 0, 0);
    mesh.rotateZ(rotation);
    scene.add(mesh);
  };
  // Angled studio strip lights: create crisp, dynamic diagonal gloss sheens as the card swings/stretches/rotates
  panel(3.2, [-5, 3, 6], [2.2, 9], 0.35);    // Left angled gloss strip
  panel(2.8, [5, 2.5, 6], [2.2, 9], -0.35);  // Right angled gloss strip
  panel(3.0, [0, 6.5, 5], [10, 2.5]);        // Top overhead gloss strip
  panel(1.2, [0, -6, 4], [10, 2.5]);         // Subtle bottom fill
  panel(1.4, [0, 5, -6], [12, 6]);           // Backfill depth
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene, 0.035);
  pmrem.dispose();
  geometry.dispose();
  materials.forEach(material => material.dispose());
  return target;
};`;

if (code.includes(targetEnv)) {
  code = code.replace(targetEnv, replEnv);
} else {
  const targetEnvCRLF = targetEnv.replace(/\n/g, '\r\n');
  const replEnvCRLF = replEnv.replace(/\n/g, '\r\n');
  if (code.includes(targetEnvCRLF)) {
    code = code.replace(targetEnvCRLF, replEnvCRLF);
  } else {
    throw new Error('targetEnv not found');
  }
}

// 3. Update lighting in scene: lower ambient light to preserve inky blacks, raise key/fill for glossy pop
const targetLight = `    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.75);
    keyLight.position.set(-2.5, 4, 6);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.55);
    fillLight.position.set(3, -1, 4);
    scene.add(ambientLight, keyLight, fillLight);`;

const replLight = `    const ambientLight = new THREE.AmbientLight(0xffffff, 0.22);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(-2.5, 4.5, 5);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
    fillLight.position.set(3, -1, 3);
    scene.add(ambientLight, keyLight, fillLight);`;

if (code.includes(targetLight)) {
  code = code.replace(targetLight, replLight);
} else {
  const targetLightCRLF = targetLight.replace(/\n/g, '\r\n');
  const replLightCRLF = replLight.replace(/\n/g, '\r\n');
  if (code.includes(targetLightCRLF)) {
    code = code.replace(targetLightCRLF, replLightCRLF);
  } else {
    throw new Error('targetLight not found');
  }
}

// 4. Update frontMaterial and backMaterial with ior and reflectivity for genuine acrylic / VIP badge glossy physics
const targetMats = `    const frontMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -4.0
    });
    const backMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -4.0
    });`;

const replMats = `    const frontMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      ior: 1.52,
      reflectivity: 0.9,
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -4.0
    });
    const backMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      ior: 1.52,
      reflectivity: 0.9,
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -4.0
    });`;

if (code.includes(targetMats)) {
  code = code.replace(targetMats, replMats);
} else {
  const targetMatsCRLF = targetMats.replace(/\n/g, '\r\n');
  const replMatsCRLF = replMats.replace(/\n/g, '\r\n');
  if (code.includes(targetMatsCRLF)) {
    code = code.replace(targetMatsCRLF, replMatsCRLF);
  } else {
    throw new Error('targetMats not found');
  }
}

fs.writeFileSync(file, code, 'utf8');
console.log('Successfully applied true ultra-glossy finish to Lanyard.jsx!');
