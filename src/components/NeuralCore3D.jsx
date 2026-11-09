import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralCore3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffe96b, 2.5, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    // 3. Central Neural Core (Geodesic Sphere with Points & Wireframe)
    const neuralGroup = new THREE.Group();
    scene.add(neuralGroup);

    // Outer wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x4a4a55,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    neuralGroup.add(icoMesh);

    // Synaptic Vertices (Golden Glowing Points on icosahedron vertices)
    const vertexPointsGeo = new THREE.BufferGeometry();
    const vertexCount = icoGeo.attributes.position.count;
    vertexPointsGeo.setAttribute('position', icoGeo.attributes.position);

    // Canvas circular glow sprite
    const createGlowTexture = () => {
      const cv = document.createElement('canvas');
      cv.width = 32;
      cv.height = 32;
      const ctx = cv.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, '#FFE96B');
      grad.addColorStop(0.4, 'rgba(255, 233, 107, 0.8)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(cv);
    };

    const pointsMat = new THREE.PointsMaterial({
      size: 0.14,
      map: createGlowTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const vertexPoints = new THREE.Points(vertexPointsGeo, pointsMat);
    neuralGroup.add(vertexPoints);

    // Inner Glowing Core (Tetrahedron with soft pulse)
    const coreGeo = new THREE.OctahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x22222a,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    neuralGroup.add(coreMesh);

    // Orbiting Satellite Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.01, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffe96b,
      transparent: true,
      opacity: 0.4,
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 3;
    neuralGroup.add(orbitRing);

    // 4. Interactive Mouse Tracking
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 5. Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Rotate neural group
      neuralGroup.rotation.y = elapsed * 0.4 + mouse.x * 0.8;
      neuralGroup.rotation.x = elapsed * 0.2 + mouse.y * 0.6;

      // Counter-rotate inner core
      coreMesh.rotation.y = -elapsed * 0.6;
      coreMesh.rotation.z = elapsed * 0.3;

      // Pulse ring & scale
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.03;
      coreMesh.scale.set(pulse, pulse, pulse);
      orbitRing.rotation.z = elapsed * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      vertexPointsGeo.dispose();
      pointsMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
    />
  );
}

