const fs = require('fs');
const file = 'src/components/Lanyard.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Upgrade FACE_WIDTH to 1024
code = code.replace(
  'const FACE_WIDTH = 512;',
  'const FACE_WIDTH = 1024;'
);

// 2. Upgrade FINISHES.glossy to high clearcoat & lower roughness
code = code.replace(
  "glossy: { roughness: 0.55, metalness: 0, clearcoat: 0, clearcoatRoughness: 0.6, foil: 0, anisotropy: 0 },",
  "glossy: { roughness: 0.12, metalness: 0, clearcoat: 1.0, clearcoatRoughness: 0.05, foil: 0, anisotropy: 0 },"
);

// 3. Upgrade drawFitted and paintFace with high quality smoothing & LED contrast/vibrance
const targetDraw = `const drawFitted = (ctx, image, width, height, fit) => {
  const scale = (fit === 'contain' ? Math.min : Math.max)(width / image.width, height / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
};

const paintFace = (canvas, image, color, fit) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = toCss(color);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (image) drawFitted(ctx, image, canvas.width, canvas.height, fit);
};`;

const replDraw = `const drawFitted = (ctx, image, width, height, fit) => {
  const scale = (fit === 'contain' ? Math.min : Math.max)(width / image.width, height / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
};

const paintFace = (canvas, image, color, fit) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.fillStyle = toCss(color);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (image) {
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    ctx.save();
    // High-vibrancy LED screen clarity & contrast for the profile picture
    if (isDark) {
      ctx.filter = 'contrast(1.10) saturate(1.18) brightness(1.06)';
    } else {
      ctx.filter = 'contrast(1.04) saturate(1.06) brightness(1.02)';
    }
    drawFitted(ctx, image, canvas.width, canvas.height, fit);
    ctx.restore();
  }
};`;

if (code.includes(targetDraw)) {
  code = code.replace(targetDraw, replDraw);
} else {
  const targetDrawCRLF = targetDraw.replace(/\n/g, '\r\n');
  const replDrawCRLF = replDraw.replace(/\n/g, '\r\n');
  if (code.includes(targetDrawCRLF)) {
    code = code.replace(targetDrawCRLF, replDrawCRLF);
  } else {
    throw new Error('targetDraw not found');
  }
}

// 4. Upgrade anisotropy to 16 and add ambientLight
code = code.replace(
  'const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());',
  'const anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy());'
);

const targetLight = `    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(-2.5, 4, 6);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
    fillLight.position.set(3, -1, 4);
    scene.add(keyLight, fillLight);`;

const replLight = `    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.75);
    keyLight.position.set(-2.5, 4, 6);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.55);
    fillLight.position.set(3, -1, 4);
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

// 5. Remove normalMap: grain from frontMaterial and backMaterial so photo is 100% sharp
const targetMats = `    const frontMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      normalMap: grain,
      normalScale: new THREE.Vector2(0.06, 0.06),
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -4.0
    });
    const backMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      normalMap: grain,
      normalScale: new THREE.Vector2(0.06, 0.06),
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -4.0
    });`;

const replMats = `    const frontMaterial = new THREE.MeshPhysicalMaterial({
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

// 6. Upgrade makeCanvasTexture to ensure mipmaps and linear filtering
const targetTex = `const makeCanvasTexture = (canvas, anisotropy) => {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  return texture;
};`;

const replTex = `const makeCanvasTexture = (canvas, anisotropy) => {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
};`;

if (code.includes(targetTex)) {
  code = code.replace(targetTex, replTex);
} else {
  const targetTexCRLF = targetTex.replace(/\n/g, '\r\n');
  const replTexCRLF = replTex.replace(/\n/g, '\r\n');
  if (code.includes(targetTexCRLF)) {
    code = code.replace(targetTexCRLF, replTexCRLF);
  } else {
    throw new Error('targetTex not found');
  }
}

// 7. Upgrade DPR calculation in resize
const targetDpr = `      const baseDpr = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      const effectiveDpr = Math.min(baseDpr, maxBufferHeight / Math.max(1, view.height));
      renderer.setPixelRatio(Math.max(0.5, effectiveDpr));`;

const replDpr = `      const baseDpr = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2.5);
      const effectiveDpr = Math.min(baseDpr, maxBufferHeight / Math.max(1, view.height));
      renderer.setPixelRatio(Math.max(1, effectiveDpr));`;

if (code.includes(targetDpr)) {
  code = code.replace(targetDpr, replDpr);
} else {
  const targetDprCRLF = targetDpr.replace(/\n/g, '\r\n');
  const replDprCRLF = replDpr.replace(/\n/g, '\r\n');
  if (code.includes(targetDprCRLF)) {
    code = code.replace(targetDprCRLF, replDprCRLF);
  } else {
    throw new Error('targetDpr not found');
  }
}

fs.writeFileSync(file, code, 'utf8');
console.log('Successfully upgraded Lanyard.jsx to HD pixel-perfect LED clarity!');
