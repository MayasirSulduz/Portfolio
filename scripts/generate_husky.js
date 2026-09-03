import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';

// Node polyfill for GLTFExporter
global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: { result: buf } });
      if (this.onloadend) this.onloadend({ target: { result: buf } });
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      const base64 = Buffer.from(buf).toString('base64');
      const dataUrl = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
      this.result = dataUrl;
      if (this.onload) this.onload({ target: { result: buf } });
      if (this.onloadend) this.onloadend({ target: { result: dataUrl } });
    });
  }
};

function createCleanHuskyModel() {
  const huskyGroup = new THREE.Group();
  huskyGroup.name = "Husky3DModel";

  // --- MATERIALS ---
  const matBlackFur = new THREE.MeshStandardMaterial({
    color: 0x1a1c23,
    roughness: 0.60,
    metalness: 0.05,
    name: "Mat_BlackFur",
  });

  const matWhiteFur = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.40,
    metalness: 0.02,
    name: "Mat_WhiteFur",
  });

  const matBlueEye = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.08,
    metalness: 0.35,
    name: "Mat_BlueEye",
  });

  const matEyeIrisInner = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.08,
    metalness: 0.5,
    name: "Mat_EyeIrisInner",
  });

  const matPupil = new THREE.MeshStandardMaterial({
    color: 0x07090e,
    roughness: 0.1,
    name: "Mat_Pupil",
  });

  const matEyeHighlight = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.05,
    name: "Mat_EyeHighlight",
  });

  const matNose = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.25,
    name: "Mat_Nose",
  });

  const matTongue = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    roughness: 0.3,
    name: "Mat_Tongue",
  });

  const matCollar = new THREE.MeshStandardMaterial({
    color: 0xd92626,
    roughness: 0.3,
    metalness: 0.15,
    name: "Mat_Collar",
  });

  const matGoldTag = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.92,
    roughness: 0.15,
    name: "Mat_GoldTag",
  });

  const matInnerEar = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.5,
    name: "Mat_InnerEar",
  });

  const matEyeContour = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.5,
    name: "Mat_EyeContour",
  });

  const matShadowPlane = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.25,
    name: "Mat_ShadowPlane",
  });

  // Soft Contact Shadow Plane
  const shadowGeo = new THREE.PlaneGeometry(1.4, 1.4);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMesh = new THREE.Mesh(shadowGeo, matShadowPlane);
  shadowMesh.name = "Soft_Shadow_Plane";
  shadowMesh.position.set(0, -0.62, 0);
  huskyGroup.add(shadowMesh);

  // ==========================================
  // 1. SLIM TORSO & CHEST
  // ==========================================
  const bodyGroup = new THREE.Group();
  bodyGroup.name = "BodyGroup";
  huskyGroup.add(bodyGroup);

  const bodyGeo = new THREE.SphereGeometry(0.44, 32, 32);
  bodyGeo.scale(0.68, 0.68, 1.30);
  const bodyMesh = new THREE.Mesh(bodyGeo, matBlackFur);
  bodyMesh.name = "Torso_Main";
  bodyGroup.add(bodyMesh);

  const bellyGeo = new THREE.SphereGeometry(0.42, 32, 32);
  bellyGeo.scale(0.65, 0.62, 1.20);
  const bellyMesh = new THREE.Mesh(bellyGeo, matWhiteFur);
  bellyMesh.position.set(0, -0.08, 0.04);
  bellyMesh.name = "Belly_White";
  bodyGroup.add(bellyMesh);

  const chestRuffGeo = new THREE.SphereGeometry(0.26, 24, 24);
  chestRuffGeo.scale(0.78, 0.95, 0.78);
  const chestRuffMesh = new THREE.Mesh(chestRuffGeo, matWhiteFur);
  chestRuffMesh.position.set(0, 0.05, 0.52);
  chestRuffMesh.name = "Chest_Ruff";
  bodyGroup.add(chestRuffMesh);

  // ==========================================
  // 2. SLENDER LEGS & PAWS
  // ==========================================
  const legsGroup = new THREE.Group();
  legsGroup.name = "LegsGroup";
  huskyGroup.add(legsGroup);

  const createSlimLeg = (x, z, legName) => {
    const legContainer = new THREE.Group();
    legContainer.name = legName;
    legContainer.position.set(x, -0.12, z);

    const upperGeo = new THREE.CylinderGeometry(0.11, 0.08, 0.38, 16);
    const upperMesh = new THREE.Mesh(upperGeo, matBlackFur);
    upperMesh.position.set(0, -0.19, 0);
    legContainer.add(upperMesh);

    const lowerGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.34, 16);
    const lowerMesh = new THREE.Mesh(lowerGeo, matWhiteFur);
    lowerMesh.position.set(0, -0.50, 0);
    legContainer.add(lowerMesh);

    const pawGeo = new THREE.SphereGeometry(0.10, 16, 16);
    pawGeo.scale(0.9, 0.55, 1.2);
    const pawMesh = new THREE.Mesh(pawGeo, matWhiteFur);
    pawMesh.position.set(0, -0.64, 0.04);
    legContainer.add(pawMesh);

    for (let i = -1; i <= 1; i++) {
      const toeGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const toeMesh = new THREE.Mesh(toeGeo, matWhiteFur);
      toeMesh.position.set(i * 0.035, -0.65, 0.13);
      legContainer.add(toeMesh);
    }

    return legContainer;
  };

  legsGroup.add(createSlimLeg(0.21, 0.44, "Leg_FrontLeft"));
  legsGroup.add(createSlimLeg(-0.21, 0.44, "Leg_FrontRight"));
  legsGroup.add(createSlimLeg(0.22, -0.44, "Leg_BackLeft"));
  legsGroup.add(createSlimLeg(-0.22, -0.44, "Leg_BackRight"));

  // ==========================================
  // 3. CURLED TAIL
  // ==========================================
  const tailGroup = new THREE.Group();
  tailGroup.name = "TailGroup";
  tailGroup.position.set(0, 0.18, -0.68);

  const tailSegments = 8;
  let currentRadius = 0.14;

  for (let i = 0; i < tailSegments; i++) {
    const progress = i / (tailSegments - 1);
    const angle = progress * Math.PI * 1.1;

    const segGeo = new THREE.SphereGeometry(currentRadius, 16, 16);
    const isTip = i > tailSegments - 3;
    const segMesh = new THREE.Mesh(segGeo, isTip ? matWhiteFur : matBlackFur);

    const offsetY = Math.sin(angle) * 0.48;
    const offsetZ = -Math.cos(angle) * 0.35 + 0.35;

    segMesh.position.set(0, offsetY, offsetZ);
    tailGroup.add(segMesh);

    currentRadius *= 0.92;
  }
  huskyGroup.add(tailGroup);

  // ==========================================
  // 4. NECK, COLLAR & GOLD TAG
  // ==========================================
  const neckGroup = new THREE.Group();
  neckGroup.name = "NeckGroup";
  neckGroup.position.set(0, 0.32, 0.46);
  huskyGroup.add(neckGroup);

  const collarGeo = new THREE.TorusGeometry(0.30, 0.048, 16, 32);
  const collarMesh = new THREE.Mesh(collarGeo, matCollar);
  collarMesh.rotation.x = Math.PI / 2 + 0.2;
  collarMesh.name = "RedCollar";
  neckGroup.add(collarMesh);

  const tagGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.018, 24);
  const tagMesh = new THREE.Mesh(tagGeo, matGoldTag);
  tagMesh.position.set(0, -0.14, 0.32);
  tagMesh.rotation.x = Math.PI / 2 + 0.1;
  tagMesh.name = "GoldTagPendant";
  neckGroup.add(tagMesh);

  // ==========================================
  // 5. HEAD & FACE
  // ==========================================
  const headGroup = new THREE.Group();
  headGroup.name = "HeadGroup";
  headGroup.position.set(0, 0.58, 0.58);
  huskyGroup.add(headGroup);

  const headGeo = new THREE.SphereGeometry(0.46, 32, 32);
  headGeo.scale(0.88, 0.88, 0.86);
  const headMesh = new THREE.Mesh(headGeo, matBlackFur);
  headMesh.name = "Head_BaseBlack";
  headGroup.add(headMesh);

  const faceMaskGeo = new THREE.SphereGeometry(0.44, 32, 32);
  faceMaskGeo.scale(0.84, 0.70, 0.82);
  const faceMaskMesh = new THREE.Mesh(faceMaskGeo, matWhiteFur);
  faceMaskMesh.position.set(0, -0.08, 0.05);
  faceMaskMesh.name = "Face_WhiteMask";
  headGroup.add(faceMaskMesh);

  const blazeGeo = new THREE.BoxGeometry(0.16, 0.38, 0.10);
  const blazeMesh = new THREE.Mesh(blazeGeo, matWhiteFur);
  blazeMesh.position.set(0, 0.14, 0.36);
  blazeMesh.rotation.x = -0.18;
  headGroup.add(blazeMesh);

  const browLeftGeo = new THREE.SphereGeometry(0.055, 12, 12);
  browLeftGeo.scale(1.1, 0.75, 0.5);
  const browLeft = new THREE.Mesh(browLeftGeo, matWhiteFur);
  browLeft.position.set(0.14, 0.24, 0.36);
  headGroup.add(browLeft);

  const browRight = new THREE.Mesh(browLeftGeo, matWhiteFur);
  browRight.position.set(-0.14, 0.24, 0.36);
  headGroup.add(browRight);

  const snoutGeo = new THREE.SphereGeometry(0.16, 24, 24);
  snoutGeo.scale(0.82, 0.65, 1.02);
  const snoutMesh = new THREE.Mesh(snoutGeo, matWhiteFur);
  snoutMesh.position.set(0, -0.10, 0.38);
  headGroup.add(snoutMesh);

  const noseGeo = new THREE.SphereGeometry(0.07, 16, 16);
  noseGeo.scale(1.1, 0.7, 0.8);
  const noseMesh = new THREE.Mesh(noseGeo, matNose);
  noseMesh.position.set(0, -0.01, 0.56);
  headGroup.add(noseMesh);

  const mouthGeo = new THREE.TorusGeometry(0.065, 0.012, 12, 20, Math.PI);
  const mouthMesh = new THREE.Mesh(mouthGeo, matNose);
  mouthMesh.position.set(0, -0.13, 0.54);
  mouthMesh.rotation.x = 0.22;
  mouthMesh.rotation.z = Math.PI;
  headGroup.add(mouthMesh);

  const tongueGeo = new THREE.SphereGeometry(0.06, 16, 16);
  tongueGeo.scale(0.8, 0.32, 1.0);
  const tongueMesh = new THREE.Mesh(tongueGeo, matTongue);
  tongueMesh.name = "Tongue_Mesh";
  tongueMesh.position.set(0, -0.18, 0.54);
  headGroup.add(tongueMesh);

  // ==========================================
  // 6. EYES & EYELIDS
  // ==========================================
  const createExpressiveEye = (x, eyeName) => {
    const eyeGroup = new THREE.Group();
    eyeGroup.name = eyeName;
    eyeGroup.position.set(x, 0.10, 0.35);

    const contour = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), matEyeContour);
    contour.scale.set(1.0, 1.0, 0.4);
    eyeGroup.add(contour);

    const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 20), matWhiteFur);
    eyeWhite.scale.set(0.95, 0.95, 0.45);
    eyeGroup.add(eyeWhite);

    const eyeIris = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 20), matBlueEye);
    eyeIris.position.set(0, 0, 0.03);
    eyeIris.scale.set(1, 1, 0.45);
    eyeGroup.add(eyeIris);

    const innerIris = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), matEyeIrisInner);
    innerIris.position.set(0, 0, 0.045);
    innerIris.scale.set(1, 1, 0.4);
    eyeGroup.add(innerIris);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), matPupil);
    pupil.position.set(0, 0, 0.06);
    pupil.scale.set(1, 1, 0.35);
    eyeGroup.add(pupil);

    const spec1 = new THREE.Mesh(new THREE.SphereGeometry(0.028, 12, 12), matEyeHighlight);
    spec1.position.set(0.026, 0.036, 0.078);
    eyeGroup.add(spec1);

    const spec2 = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), matEyeHighlight);
    spec2.position.set(-0.026, -0.022, 0.078);
    eyeGroup.add(spec2);

    const lidGeo = new THREE.SphereGeometry(0.12, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2);
    const lidMesh = new THREE.Mesh(lidGeo, matBlackFur);
    lidMesh.name = "Eyelid_Closed";
    lidMesh.position.set(0, 0, 0.03);
    lidMesh.rotation.x = Math.PI / 2;
    lidMesh.visible = false;
    eyeGroup.add(lidMesh);

    return eyeGroup;
  };

  headGroup.add(createExpressiveEye(0.19, "Eye_Left"));
  headGroup.add(createExpressiveEye(-0.19, "Eye_Right"));

  const createEar = (x, rotZ, earName) => {
    const earContainer = new THREE.Group();
    earContainer.name = earName;
    earContainer.position.set(x, 0.42, 0.02);
    earContainer.rotation.z = rotZ;
    earContainer.rotation.x = -0.15;

    const outerGeo = new THREE.ConeGeometry(0.16, 0.38, 16);
    outerGeo.scale(0.88, 1.0, 0.40);
    const outerMesh = new THREE.Mesh(outerGeo, matBlackFur);
    outerMesh.position.set(0, 0.19, 0);
    earContainer.add(outerMesh);

    const innerGeo = new THREE.ConeGeometry(0.11, 0.32, 16);
    innerGeo.scale(0.82, 1.0, 0.22);
    const innerMesh = new THREE.Mesh(innerGeo, matInnerEar);
    innerMesh.position.set(0, 0.17, 0.03);
    earContainer.add(innerMesh);

    return earContainer;
  };

  headGroup.add(createEar(0.20, -0.16, "Ear_Left"));
  headGroup.add(createEar(-0.20, 0.16, "Ear_Right"));

  return huskyGroup;
}

const scene = new THREE.Scene();
const huskyModel = createCleanHuskyModel();
scene.add(huskyModel);

const exporter = new GLTFExporter();

function exportModel(options) {
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => resolve(result),
      (err) => reject(err),
      options
    );
  });
}

async function run() {
  console.log('Reverting to Clean Slim 3D Husky model...');
  
  const jsonGltf = await exportModel({ binary: false, embedImages: true });
  fs.writeFileSync('public/husky.gltf', JSON.stringify(jsonGltf, null, 2));
  console.log('Successfully saved public/husky.gltf!');

  const glbArrayBuffer = await exportModel({ binary: true });
  fs.writeFileSync('public/husky.glb', Buffer.from(glbArrayBuffer));
  console.log('Successfully saved public/husky.glb!');
}

run().catch(console.error);
