import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { usePet } from '../context/PetContext';

// Smooth angle interpolation without radial wrapping glitches
function lerpAngle(a, b, t) {
  let diff = (b - a) % (Math.PI * 2);
  if (diff < -Math.PI) diff += Math.PI * 2;
  if (diff > Math.PI) diff -= Math.PI * 2;
  return a + diff * t;
}

export default function PetLeo() {
  const containerRef = useRef(null);
  const {
    petMode,
    setPetMode,
    helloTrigger,
    isPlaying,
    isAtHome,
    isResting,
  } = usePet();

  // Floating Zzz particles state for sleeping animation
  const [zzzList, setZzzList] = useState([]);

  const stateRef = useRef({
    petMode,
    lastMouseMoveTime: Date.now(),
    mouse3D: new THREE.Vector3(0, 0, 0),
    isMouseMoving: false,
    prevMousePos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    helloTimer: 0,
    currentScreenPos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  });

  useEffect(() => {
    stateRef.current.petMode = petMode;
  }, [petMode]);

  useEffect(() => {
    if (helloTrigger > 0) {
      stateRef.current.helloTimer = 1.8;
    }
  }, [helloTrigger]);

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setPetMode('FOLLOWING');
      }, 7500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, setPetMode]);

  // Zzz floating animation loop when resting
  useEffect(() => {
    if (!isResting) {
      setZzzList([]);
      return;
    }

    const interval = setInterval(() => {
      setZzzList((prev) => [
        ...prev.slice(-4),
        {
          id: Date.now() + Math.random(),
          size: Math.random() * 0.4 + 0.9,
          offsetX: (Math.random() - 0.5) * 30,
        },
      ]);
    }, 900);

    return () => clearInterval(interval);
  }, [isResting]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.5);
    dirLight.position.set(10, 18, 14);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);

    const leoGroup = new THREE.Group();
    scene.add(leoGroup);

    // References for animated parts from GLTF
    const nodesRef = {
      huskyModel: null,
      headGroup: null,
      eyeL: null,
      eyeR: null,
      earL: null,
      earR: null,
      tailGroup: null,
      legFL: null,
      legFR: null,
      legBL: null,
      legBR: null,
      bodyMesh: null,
    };

    // Load Expressive Husky GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/husky.glb',
      (gltf) => {
        const huskyModel = gltf.scene;
        nodesRef.huskyModel = huskyModel;

        // Sleek compact pet scale
        huskyModel.scale.set(0.38, 0.38, 0.38);
        leoGroup.add(huskyModel);

        nodesRef.headGroup = huskyModel.getObjectByName('HeadGroup');
        nodesRef.eyeL = huskyModel.getObjectByName('Eye_Left');
        nodesRef.eyeR = huskyModel.getObjectByName('Eye_Right');
        nodesRef.earL = huskyModel.getObjectByName('Ear_Left');
        nodesRef.earR = huskyModel.getObjectByName('Ear_Right');
        nodesRef.tailGroup = huskyModel.getObjectByName('TailGroup');
        nodesRef.legFL = huskyModel.getObjectByName('Leg_FrontLeft');
        nodesRef.legFR = huskyModel.getObjectByName('Leg_FrontRight');
        nodesRef.legBL = huskyModel.getObjectByName('Leg_BackLeft');
        nodesRef.legBR = huskyModel.getObjectByName('Leg_BackRight');
        nodesRef.bodyMesh = huskyModel.getObjectByName('Torso_Main');
      },
      undefined,
      (err) => {
        console.error('Error loading husky.glb in PetLeo:', err);
      }
    );

    // --- 3D TOY BALL ---
    const ballGroup = new THREE.Group();
    const ballMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2 })
    );
    ballMesh.castShadow = true;
    ballGroup.add(ballMesh);
    ballGroup.visible = false;
    scene.add(ballGroup);

    const updateMouse3D = (clientX, clientY) => {
      const mouse2D = new THREE.Vector2(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse2D, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);
      if (target) {
        stateRef.current.mouse3D.copy(target);
      }
    };

    const getVisibleBounds = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const vFOVDegrees = camera.fov;
      const vFOVRadians = (vFOVDegrees * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFOVRadians / 2) * camera.position.z;
      const visibleWidth = visibleHeight * aspect;
      return {
        maxX: visibleWidth / 2 - 1.0,
        maxY: visibleHeight / 2 - 1.0,
        minX: -visibleWidth / 2 + 1.0,
        minY: -visibleHeight / 2 + 1.0,
      };
    };

    const getHomePosition = () => {
      const bounds = getVisibleBounds();
      return new THREE.Vector3(bounds.minX + 0.4, bounds.minY + 0.4, 0);
    };

    leoGroup.position.set(0, -2, 0);

    const handleMouseMove = (e) => {
      const now = Date.now();
      const dx = Math.abs(e.clientX - stateRef.current.prevMousePos.x);
      const dy = Math.abs(e.clientY - stateRef.current.prevMousePos.y);

      if (dx > 3 || dy > 3) {
        stateRef.current.lastMouseMoveTime = now;
        stateRef.current.isMouseMoving = true;
        stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };

        if (stateRef.current.petMode === 'IDLE_REST') {
          setPetMode('FOLLOWING');
        }
      }

      updateMouse3D(e.clientX, e.clientY);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // --- REALISTIC RUNNING LEGS & CUTE SLEEPING POSE ---
    let clock = new THREE.Clock();
    let animFrameId = null;
    let ballVel = new THREE.Vector3(0, 0, 0);
    let ballPos = new THREE.Vector3(0, 0, 0);

    let smoothFacingAngleY = 0;
    let animPhase = 0;
    let blinkTimer = 0;
    let isBlinking = false;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const rawDelta = clock.getDelta();
      const delta = Math.min(rawDelta, 0.033);
      const time = clock.getElapsedTime();
      const currentMode = stateRef.current.petMode;
      const now = Date.now();
      const bounds = getVisibleBounds();

      // Natural eye blinking
      blinkTimer += delta;
      if (blinkTimer > 3.8 && !isBlinking) {
        isBlinking = true;
      }
      if (blinkTimer > 4.0) {
        isBlinking = false;
        blinkTimer = Math.random() * 1.5;
      }

      if (
        currentMode === 'FOLLOWING' &&
        now - stateRef.current.lastMouseMoveTime > 5000
      ) {
        setPetMode('IDLE_REST');
      }

      if (currentMode === 'PLAYING') {
        if (!ballGroup.visible) {
          ballGroup.visible = true;
          ballPos.copy(leoGroup.position).add(new THREE.Vector3(1.0, 1.5, 0));
          ballVel.set((Math.random() - 0.5) * 4.2, 3.5, 0);
        }

        ballVel.y -= 9.8 * delta;
        ballPos.addScaledVector(ballVel, delta);

        if (ballPos.y < bounds.minY) {
          ballPos.y = bounds.minY;
          ballVel.y = -ballVel.y * 0.72;
          ballVel.x *= 0.95;
        }

        ballGroup.position.copy(ballPos);
        ballGroup.rotation.z -= ballVel.x * delta * 3;
      } else {
        ballGroup.visible = false;
      }

      let targetPos = new THREE.Vector3();
      if (currentMode === 'GOING_HOME' || currentMode === 'AT_HOME') {
        targetPos.copy(getHomePosition());
      } else if (currentMode === 'PLAYING') {
        targetPos.copy(ballPos);
      } else {
        targetPos.copy(stateRef.current.mouse3D);
        targetPos.z = 0;
      }

      targetPos.x = THREE.MathUtils.clamp(targetPos.x, bounds.minX, bounds.maxX);
      targetPos.y = THREE.MathUtils.clamp(targetPos.y, bounds.minY, bounds.maxY);

      const distToTarget = leoGroup.position.distanceTo(targetPos);

      if (currentMode === 'AT_HOME') {
        leoGroup.scale.set(0.001, 0.001, 0.001);
      } else {
        leoGroup.scale.set(1, 1, 1);
      }

      if (currentMode === 'GOING_HOME' && distToTarget < 0.5) {
        setPetMode('AT_HOME');
      }

      // Screen positions for Zzz text
      const screenVector = leoGroup.position.clone().project(camera);
      const screenX = ((screenVector.x + 1) * window.innerWidth) / 2;
      const screenY = ((-screenVector.y + 1) * window.innerHeight) / 2;
      stateRef.current.currentScreenPos = { x: screenX, y: screenY };

      const { huskyModel, headGroup, eyeL, eyeR, earL, earR, tailGroup, legFL, legFR, legBL, legBR, bodyMesh } = nodesRef;

      const isRunning = distToTarget > 0.4 && currentMode !== 'IDLE_REST' && currentMode !== 'AT_HOME';

      if (huskyModel) {
        if (isRunning) {
          const dir = new THREE.Vector3().subVectors(targetPos, leoGroup.position).normalize();
          const runSpeed = 7.5;

          leoGroup.position.addScaledVector(dir, Math.min(distToTarget, runSpeed * delta));
          leoGroup.position.x = THREE.MathUtils.clamp(leoGroup.position.x, bounds.minX, bounds.maxX);
          leoGroup.position.y = THREE.MathUtils.clamp(leoGroup.position.y, bounds.minY, bounds.maxY);

          // Face movement direction smoothly
          const targetFacingAngle = Math.atan2(dir.x, dir.y);
          smoothFacingAngleY = lerpAngle(smoothFacingAngleY, targetFacingAngle, 10 * delta);
          huskyModel.rotation.y = smoothFacingAngleY;
          huskyModel.rotation.x = THREE.MathUtils.lerp(huskyModel.rotation.x, 0.1, 6 * delta);
          huskyModel.position.y = 0; // Zero vertical hopping for smooth running!

          // High-frequency alternating 4-leg running stride
          animPhase += delta * 22;
          const stride = Math.sin(animPhase) * 0.75;

          // Leg swing around top hip joints
          if (legFR) {
            legFR.rotation.x = stride;
            legFR.rotation.z = 0;
          }
          if (legFL) {
            legFL.rotation.x = -stride;
            legFL.rotation.z = 0;
          }
          if (legBR) {
            legBR.rotation.x = -stride;
            legBR.rotation.z = 0;
          }
          if (legBL) {
            legBL.rotation.x = stride;
            legBL.rotation.z = 0;
          }

          if (headGroup) {
            headGroup.position.set(0, 0.68, 0.62);
            headGroup.rotation.set(0, 0, 0);
          }

          // Blinking / Eye scale
          const eyeScaleY = isBlinking ? 0.08 : 1.0;
          if (eyeL) eyeL.scale.y = THREE.MathUtils.lerp(eyeL.scale.y, eyeScaleY, 0.3);
          if (eyeR) eyeR.scale.y = THREE.MathUtils.lerp(eyeR.scale.y, eyeScaleY, 0.3);

          if (tailGroup) {
            tailGroup.rotation.z = Math.sin(animPhase * 2) * 0.45;
          }
        } else {
          if (currentMode === 'IDLE_REST') {
            // ADORABLE COZY SLEEPING PUPPY POSE
            smoothFacingAngleY = lerpAngle(smoothFacingAngleY, Math.PI / 2.5, 0.08);
            huskyModel.rotation.y = smoothFacingAngleY;
            huskyModel.rotation.x = THREE.MathUtils.lerp(huskyModel.rotation.x, 0.15, 0.08);
            huskyModel.position.y = THREE.MathUtils.lerp(huskyModel.position.y, -0.2, 0.08);

            // Head resting down snugly on front paws
            if (headGroup) {
              headGroup.position.x = THREE.MathUtils.lerp(headGroup.position.x, 0.1, 0.08);
              headGroup.position.y = THREE.MathUtils.lerp(headGroup.position.y, 0.25, 0.08);
              headGroup.position.z = THREE.MathUtils.lerp(headGroup.position.z, 0.45, 0.08);
              headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, 0.25, 0.08);
              headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, -0.35, 0.08);
              headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, 0.15, 0.08);
            }

            // Eyes softly closed in sleep
            if (eyeL) eyeL.scale.y = THREE.MathUtils.lerp(eyeL.scale.y, 0.08, 0.2);
            if (eyeR) eyeR.scale.y = THREE.MathUtils.lerp(eyeR.scale.y, 0.08, 0.2);

            // Legs folded comfortably under belly like a cozy sleeping pup
            if (legFR) {
              legFR.rotation.x = THREE.MathUtils.lerp(legFR.rotation.x, Math.PI / 2.2, 0.08);
              legFR.rotation.z = THREE.MathUtils.lerp(legFR.rotation.z, 0.3, 0.08);
            }
            if (legFL) {
              legFL.rotation.x = THREE.MathUtils.lerp(legFL.rotation.x, Math.PI / 2.2, 0.08);
              legFL.rotation.z = THREE.MathUtils.lerp(legFL.rotation.z, -0.3, 0.08);
            }
            if (legBR) {
              legBR.rotation.x = THREE.MathUtils.lerp(legBR.rotation.x, Math.PI / 2.2, 0.08);
              legBR.rotation.z = THREE.MathUtils.lerp(legBR.rotation.z, 0.3, 0.08);
            }
            if (legBL) {
              legBL.rotation.x = THREE.MathUtils.lerp(legBL.rotation.x, Math.PI / 2.2, 0.08);
              legBL.rotation.z = THREE.MathUtils.lerp(legBL.rotation.z, -0.3, 0.08);
            }

            // Tail wrapped around side
            if (tailGroup) {
              tailGroup.rotation.x = THREE.MathUtils.lerp(tailGroup.rotation.x, 0.7, 0.08);
              tailGroup.rotation.y = THREE.MathUtils.lerp(tailGroup.rotation.y, -0.5, 0.08);
            }

            // Gentle breathing motion
            if (bodyMesh) {
              bodyMesh.scale.y = 0.85 + Math.sin(time * 2) * 0.035;
            }
          } else {
            // Standing Idle facing camera neatly
            smoothFacingAngleY = lerpAngle(smoothFacingAngleY, 0, 6 * delta);
            huskyModel.rotation.y = smoothFacingAngleY;
            huskyModel.rotation.x = THREE.MathUtils.lerp(huskyModel.rotation.x, 0.1, 6 * delta);
            huskyModel.position.y = THREE.MathUtils.lerp(huskyModel.position.y, 0, 8 * delta);

            if (headGroup) {
              headGroup.position.set(0, 0.68, 0.62);
              headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, 0, 6 * delta);
              headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, 0, 6 * delta);
              headGroup.rotation.z = Math.sin(time * 2.5) * 0.08;
            }

            if (earL) earL.rotation.z = -0.16 + Math.sin(time * 5) * 0.06;
            if (earR) earR.rotation.z = 0.16 - Math.sin(time * 5) * 0.06;

            const eyeScaleY = isBlinking ? 0.08 : 1.0;
            if (eyeL) eyeL.scale.y = THREE.MathUtils.lerp(eyeL.scale.y, eyeScaleY, 0.35);
            if (eyeR) eyeR.scale.y = THREE.MathUtils.lerp(eyeR.scale.y, eyeScaleY, 0.35);

            if (legFR) {
              legFR.rotation.x = THREE.MathUtils.lerp(legFR.rotation.x, 0, 6 * delta);
              legFR.rotation.z = THREE.MathUtils.lerp(legFR.rotation.z, 0, 6 * delta);
            }
            if (legFL) {
              legFL.rotation.x = THREE.MathUtils.lerp(legFL.rotation.x, 0, 6 * delta);
              legFL.rotation.z = THREE.MathUtils.lerp(legFL.rotation.z, 0, 6 * delta);
            }
            if (legBR) {
              legBR.rotation.x = THREE.MathUtils.lerp(legBR.rotation.x, 0, 6 * delta);
              legBR.rotation.z = THREE.MathUtils.lerp(legBR.rotation.z, 0, 6 * delta);
            }
            if (legBL) {
              legBL.rotation.x = THREE.MathUtils.lerp(legBL.rotation.x, 0, 6 * delta);
              legBL.rotation.z = THREE.MathUtils.lerp(legBL.rotation.z, 0, 6 * delta);
            }

            if (tailGroup) {
              tailGroup.rotation.z = Math.sin(time * 3.5) * 0.28;
              tailGroup.rotation.x = THREE.MathUtils.lerp(tailGroup.rotation.x, 0, 6 * delta);
              tailGroup.rotation.y = THREE.MathUtils.lerp(tailGroup.rotation.y, 0, 6 * delta);
            }
          }
        }

        // Hello Jump Animation
        if (stateRef.current.helloTimer > 0) {
          stateRef.current.helloTimer -= delta;
          const jumpPhase = Math.sin(stateRef.current.helloTimer * Math.PI * 3);
          leoGroup.position.y += jumpPhase * 0.08;
          if (tailGroup) tailGroup.rotation.z = Math.sin(time * 22) * 0.7;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const screenPos = stateRef.current.currentScreenPos;

  return (
    <>
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      {/* Floating Animated Zzz... Labels when Sleeping */}
      {isResting && (
        <div
          style={{
            position: 'fixed',
            left: `${screenPos.x + 15}px`,
            top: `${screenPos.y - 45}px`,
            pointerEvents: 'none',
            zIndex: 10000,
          }}
        >
          {zzzList.map((z) => (
            <div
              key={z.id}
              style={{
                position: 'absolute',
                left: `${z.offsetX}px`,
                bottom: 0,
                fontSize: `${1.1 * z.size}rem`,
                fontWeight: 800,
                fontFamily: 'var(--font-heading, sans-serif)',
                color: '#38bdf8',
                textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 0 12px rgba(56,189,248,0.8)',
                animation: 'floatZzz 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              }}
            >
              Z<span style={{ fontSize: '0.75em' }}>z</span><span style={{ fontSize: '0.55em' }}>z</span>...
            </div>
          ))}
        </div>
      )}

      {/* 2D Dog House Image Layer */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          width: '120px',
          height: '120px',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: isAtHome ? 1 : 0,
          transform: isAtHome ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <img
          src="/doghouse.png"
          alt="Leo's 2D Dog House"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))',
          }}
        />
      </div>

      <style>{`
        @keyframes floatZzz {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.6);
          }
          20% {
            opacity: 1;
            transform: translateY(-15px) scale(1);
          }
          80% {
            opacity: 0.8;
            transform: translateY(-55px) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(1.2);
          }
        }
      `}</style>
    </>
  );
}
