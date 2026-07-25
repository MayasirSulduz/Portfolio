import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '../styling/HuskyModelViewer.css';

export default function HuskyModelViewer({ isOpen, onClose }) {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('threejs');

  const sceneRef = useRef(null);
  const modelRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const mount = mountRef.current;
    if (!mount) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffbeb, 1.4);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.5);
    dirLight2.position.set(-5, 4, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xf59e0b, 0.8, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // --- LOAD GLTF / GLB MODEL ---
    const loader = new GLTFLoader();
    setLoading(true);

    loader.load(
      '/husky.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Adjust height slightly
        model.position.y += 0.1;

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading Husky GLB model:', err);
        setLoading(false);
      }
    );

    // --- MOUSE ORBIT CONTROLS ---
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !modelRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      modelRef.current.rotation.y += deltaX * 0.008;
      modelRef.current.rotation.x += deltaY * 0.008;

      // Clamp vertical pitch rotation
      modelRef.current.rotation.x = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, modelRef.current.rotation.x)
      );

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // --- ANIMATION LOOP ---
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && modelRef.current && !isDraggingRef.current) {
        modelRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isOpen, autoRotate]);

  // Toggle wireframe material
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = wireframe;
        }
      });
    }
  }, [wireframe]);

  if (!isOpen) return null;

  return (
    <div className="husky-modal-overlay" onClick={onClose}>
      <div
        className="husky-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="husky-modal-header">
          <div className="husky-modal-title">
            <span className="husky-icon">🐕</span>
            <div>
              <h3>Husky 3D Model Asset</h3>
              <p>Cute Low-Poly Stylized Husky Dog (.GLB / .GLTF)</p>
            </div>
          </div>
          <button className="husky-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="husky-modal-body">
          {/* 3D Canvas Container */}
          <div className="husky-viewport-container">
            {loading && (
              <div className="husky-loading">
                <div className="spinner"></div>
                <p>Loading 3D Husky Model...</p>
              </div>
            )}
            <div ref={mountRef} className="husky-canvas-mount" />
            <div className="husky-drag-hint">🖱️ Click & Drag to Rotate 3D Model</div>

            {/* Controls Bar */}
            <div className="husky-controls-overlay">
              <button
                className={`husky-ctrl-btn ${autoRotate ? 'active' : ''}`}
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle Auto Rotate"
              >
                🔄 {autoRotate ? 'Rotating' : 'Paused'}
              </button>

              <button
                className={`husky-ctrl-btn ${wireframe ? 'active' : ''}`}
                onClick={() => setWireframe(!wireframe)}
                title="Toggle Wireframe View"
              >
                🕸️ {wireframe ? 'Shaded' : 'Wireframe'}
              </button>
            </div>
          </div>

          {/* Download & Integration Sidebar */}
          <div className="husky-sidebar">
            <h4>📦 Download Model Files</h4>
            <div className="husky-download-buttons">
              <a
                href="/husky.glb"
                download="husky.glb"
                className="husky-btn-primary"
              >
                ⬇️ Download .GLB (788 KB)
              </a>
              <a
                href="/husky.gltf"
                download="husky.gltf"
                className="husky-btn-secondary"
              >
                📄 Download .GLTF (1.09 MB)
              </a>
            </div>

            <div className="husky-code-section">
              <h4>💻 How to Use in Your Project</h4>
              <div className="husky-tabs">
                <button
                  className={activeTab === 'threejs' ? 'active' : ''}
                  onClick={() => setActiveTab('threejs')}
                >
                  Three.js
                </button>
                <button
                  className={activeTab === 'r3f' ? 'active' : ''}
                  onClick={() => setActiveTab('r3f')}
                >
                  React (R3F)
                </button>
                <button
                  className={activeTab === 'blender' ? 'active' : ''}
                  onClick={() => setActiveTab('blender')}
                >
                  Blender / Unity
                </button>
              </div>

              <div className="husky-code-box">
                {activeTab === 'threejs' && (
                  <pre>
{`import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('/husky.glb', (gltf) => {
  const huskyModel = gltf.scene;
  scene.add(huskyModel);
});`}
                  </pre>
                )}

                {activeTab === 'r3f' && (
                  <pre>
{`import { useGLTF } from '@react-three/drei';

function Husky() {
  const { scene } = useGLTF('/husky.glb');
  return <primitive object={scene} />;
}`}
                  </pre>
                )}

                {activeTab === 'blender' && (
                  <div className="husky-instructions">
                    <p><strong>Blender:</strong> File ➔ Import ➔ glTF 2.0 (.glb/.gltf)</p>
                    <p><strong>Unity / Unreal:</strong> Drag <code>husky.glb</code> into your Assets folder.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
