import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas3D({ activeSlideIndex = 0 }) {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const slideRef = useRef(activeSlideIndex);

  useEffect(() => {
    slideRef.current = activeSlideIndex;
  }, [activeSlideIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101015); // Rich dark studio charcoal

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35; // Luminous, high-contrast exposure

    container.appendChild(renderer.domElement);

    // 2. LIGHTING SETUP (Architectural Studio Lighting)
    // Ambient light - illuminates base concrete textures clearly
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Strong Key Directional Light from Top-Left (Creates sharp light facets on top of blocks)
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.6);
    keyLight.position.set(-8, 12, 9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0003;
    scene.add(keyLight);

    // Secondary Fill Light from bottom-right (cool studio reflection)
    const fillLight = new THREE.DirectionalLight(0x9cb4d8, 2.2);
    fillLight.position.set(9, -6, 7);
    scene.add(fillLight);

    // Overhead Rim Light
    const topRimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topRimLight.position.set(0, 14, 3);
    scene.add(topRimLight);

    // Warm Signature Accent Point Light (#FFE96B)
    const accentLight = new THREE.PointLight(0xffe96b, 3.5, 18);
    accentLight.position.set(4.5, 3.8, 4.0);
    scene.add(accentLight);

    // Dynamic Cursor Spotlight (Follows mouse cursor in real-time)
    const cursorSpotLight = new THREE.PointLight(0xffffff, 2.5, 14);
    cursorSpotLight.position.set(0, 0, 5);
    scene.add(cursorSpotLight);

    // 3. HIGH-DEFINITION CONCRETE TEXTURE GENERATOR
    const createConcreteTexture = () => {
      const cv = document.createElement('canvas');
      cv.width = 512;
      cv.height = 512;
      const ctx = cv.getContext('2d');
      
      // Base architectural concrete stone
      ctx.fillStyle = '#64646e';
      ctx.fillRect(0, 0, 512, 512);

      // Aggregate grains and mineral mottling
      for (let i = 0; i < 48000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const brightness = Math.floor(Math.random() * 110);
        ctx.fillStyle = `rgba(${brightness + 50}, ${brightness + 50}, ${brightness + 56}, 0.3)`;
        ctx.fillRect(x, y, 2, 2);
      }

      // Micro fissures and porous concrete streaks
      for (let j = 0; j < 70; j++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, Math.random() * 512);
        ctx.lineTo(Math.random() * 512, Math.random() * 512);
        ctx.strokeStyle = `rgba(35, 35, 42, ${Math.random() * 0.18 + 0.06})`;
        ctx.lineWidth = Math.random() * 2.2;
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(cv);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1.2, 1.2);
      return tex;
    };

    const concreteTexture = createConcreteTexture();

    // Front/Lit Concrete Material (High contrast, clearly visible)
    const concreteMaterialFront = new THREE.MeshStandardMaterial({
      map: concreteTexture,
      roughness: 0.62,
      metalness: 0.1,
      color: new THREE.Color(0x767682), // Crisp architectural stone gray
    });

    // Darker variant for deep shadow facets
    const concreteMaterialDark = new THREE.MeshStandardMaterial({
      map: concreteTexture,
      roughness: 0.7,
      metalness: 0.14,
      color: new THREE.Color(0x52525c),
    });

    // 4. BRUTALIST CONCRETE BLOCK MATRIX
    const blocksGroup = new THREE.Group();
    scene.add(blocksGroup);

    const blockGeometry = new THREE.BoxGeometry(2.35, 2.35, 2.35);
    const edgeGeo = new THREE.EdgesGeometry(blockGeometry);
    const edgeMat = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.12 
    });

    const blockPositions = [
      // Left cluster (Stepped depths)
      { x: -5.6, y: 3.1, z: -1.8, mat: concreteMaterialFront },
      { x: -3.3, y: 3.4, z: -1.0, mat: concreteMaterialFront },
      { x: -5.3, y: 0.4, z: -1.4, mat: concreteMaterialDark },
      { x: -2.9, y: 0.8, z: -0.2, mat: concreteMaterialFront }, // Prominent front block
      { x: -5.4, y: -2.3, z: -1.6, mat: concreteMaterialDark },
      { x: -2.7, y: -2.0, z: -0.4, mat: concreteMaterialFront },

      // Right cluster
      { x: 3.3, y: 3.2, z: -1.2, mat: concreteMaterialFront },
      { x: 5.6, y: 2.8, z: -2.0, mat: concreteMaterialDark },
      { x: 3.1, y: 0.5, z: -0.5, mat: concreteMaterialFront },
      { x: 5.4, y: 0.1, z: -1.5, mat: concreteMaterialDark },
      { x: 2.9, y: -2.3, z: -0.3, mat: concreteMaterialFront },
      { x: 5.2, y: -2.5, z: -1.8, mat: concreteMaterialDark },

      // Center background layers
      { x: 0.2, y: 3.7, z: -2.8, mat: concreteMaterialDark },
      { x: 0.1, y: -3.4, z: -2.6, mat: concreteMaterialDark },
      { x: -0.3, y: -1.8, z: -2.2, mat: concreteMaterialDark },
      { x: -0.2, y: 0.2, z: -3.2, mat: concreteMaterialDark },
    ];

    const blocks = [];
    blockPositions.forEach((pos, idx) => {
      const block = new THREE.Mesh(blockGeometry, pos.mat);
      block.position.set(pos.x, pos.y, pos.z);
      block.receiveShadow = true;
      block.castShadow = true;
      block.rotation.y = (Math.PI / 180) * ((idx % 3) * 1.8);
      block.rotation.x = (Math.PI / 180) * ((idx % 2) * 1.5);

      // Subtle architectural edge lines for high-end brutalist precision
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      block.add(edges);

      blocksGroup.add(block);
      blocks.push({ 
        mesh: block, 
        baseX: pos.x, 
        baseY: pos.y, 
        baseZ: pos.z,
        freq: 0.9 + (idx % 5) * 0.25,
        phase: idx * 0.45
      });
    });

    // 5. CENTERPIECE: HIGH-DEFINITION 3D CAMERA / AI VISION SENSOR
    const centerpieceGroup = new THREE.Group();
    scene.add(centerpieceGroup);
    centerpieceGroup.position.set(0.65, 0.1, 0.9);

    // Main camera housing (Sleek gunmetal graphite with metallic luster)
    const bodyGeo = new THREE.BoxGeometry(2.1, 2.1, 1.8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x3a3a44,
      roughness: 0.3,
      metalness: 0.7,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    centerpieceGroup.add(bodyMesh);

    // Front magnesium bezel plate
    const bezelGeo = new THREE.BoxGeometry(2.0, 2.0, 0.12);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x24242c,
      roughness: 0.18,
      metalness: 0.82,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.z = 0.96;
    centerpieceGroup.add(bezelMesh);

    // Outer Chrome/Titanium Lens Ring
    const lensRingOuterGeo = new THREE.CylinderGeometry(0.76, 0.78, 0.26, 64);
    const lensRingOuterMat = new THREE.MeshStandardMaterial({
      color: 0x585866,
      roughness: 0.15,
      metalness: 0.92,
    });
    const lensOuterMesh = new THREE.Mesh(lensRingOuterGeo, lensRingOuterMat);
    lensOuterMesh.rotation.x = Math.PI / 2;
    lensOuterMesh.position.z = 1.06;
    centerpieceGroup.add(lensOuterMesh);

    // Inner Metallic Stepped Ring
    const lensRingInnerGeo = new THREE.CylinderGeometry(0.62, 0.64, 0.3, 64);
    const lensRingInnerMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a22,
      roughness: 0.1,
      metalness: 0.96,
    });
    const lensInnerMesh = new THREE.Mesh(lensRingInnerGeo, lensRingInnerMat);
    lensInnerMesh.rotation.x = Math.PI / 2;
    lensInnerMesh.position.z = 1.1;
    centerpieceGroup.add(lensInnerMesh);

    // Internal Optical Cyan Glint Light (illuminates inside the dark glass)
    const innerLensLight = new THREE.PointLight(0x38bdf8, 2.5, 4);
    innerLensLight.position.set(0, 0, 0.98);
    centerpieceGroup.add(innerLensLight);

    // Curved Optical Dark Glass Element
    const glassGeo = new THREE.SphereGeometry(0.53, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x081828,
      roughness: 0.03,
      metalness: 0.92,
      transmission: 0.65,
      ior: 1.58,
      reflectivity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.rotation.x = Math.PI / 2;
    glassMesh.position.z = 1.12;
    centerpieceGroup.add(glassMesh);

    // Center AI Core Sensor (Signature Glowing Soft Yellow Iris Dot)
    const irisGeo = new THREE.CircleGeometry(0.11, 32);
    const irisMat = new THREE.MeshBasicMaterial({
      color: 0xffe96b,
      side: THREE.DoubleSide,
    });
    const irisMesh = new THREE.Mesh(irisGeo, irisMat);
    irisMesh.position.set(0, -0.42, 1.2);
    centerpieceGroup.add(irisMesh);

    // Top Aluminum Shutter Dial
    const shutterGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.2, 40);
    const shutterMat = new THREE.MeshStandardMaterial({
      color: 0x646472,
      roughness: 0.22,
      metalness: 0.85,
    });
    const shutterMesh = new THREE.Mesh(shutterGeo, shutterMat);
    shutterMesh.position.set(0.2, 1.14, 0);
    centerpieceGroup.add(shutterMesh);

    // Top Small Indicator LED
    const pinGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.08, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinMesh.position.set(-0.68, 0.68, 1.03);
    centerpieceGroup.add(pinMesh);

    // 6. AMBIENT PARTICLES (Luminous Floating Golden Sparks)
    const particleCount = 75;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const createSparkleTexture = () => {
      const cv = document.createElement('canvas');
      cv.width = 32;
      cv.height = 32;
      const ctx = cv.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, '#FFE96B');
      grad.addColorStop(0.35, 'rgba(255, 233, 107, 0.8)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(cv);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.17,
      map: createSparkleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 7. INTERACTIVE MOUSE & TOUCH TRACKING
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let centerpieceRot = { x: 0.06, y: -0.16, targetX: 0.06, targetY: -0.16 };
    let prevSlide = activeSlideIndex;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.targetX = normX;
      mouse.targetY = normY;

      // Update Cursor Light in 3D Space
      cursorSpotLight.position.x = normX * 6.5;
      cursorSpotLight.position.y = normY * 4.5;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;
        centerpieceRot.targetY += deltaX * 0.009;
        centerpieceRot.targetX += deltaY * 0.009;
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
        centerpieceRot.targetY += deltaX * 0.009;
        centerpieceRot.targetX += deltaY * 0.009;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;

      if (w < 768) {
        camera.position.z = 13.5;
        centerpieceGroup.position.set(0, -0.4, 0.8);
      } else {
        camera.position.z = 11;
        centerpieceGroup.position.set(0.65, 0.1, 0.9);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Trigger energetic 3D transition spin if slide changed
      if (prevSlide !== slideRef.current) {
        centerpieceRot.targetY += (slideRef.current > prevSlide ? 1 : -1) * Math.PI * 0.65;
        prevSlide = slideRef.current;
      }

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;

      // Parallax camera movement
      camera.position.x = mouse.x * 0.95;
      camera.position.y = mouse.y * 0.75;
      camera.lookAt(0, 0, 0);

      // Whole concrete block matrix gentle isometric tilt with mouse
      blocksGroup.rotation.y = THREE.MathUtils.lerp(blocksGroup.rotation.y, mouse.x * 0.14, 0.05);
      blocksGroup.rotation.x = THREE.MathUtils.lerp(blocksGroup.rotation.x, -mouse.y * 0.12, 0.05);

      // Organic wave motion across individual concrete blocks
      blocks.forEach((item) => {
        const wave = Math.sin(elapsed * item.freq + item.phase) * 0.09;
        item.mesh.position.y = item.baseY + wave;
        item.mesh.position.z = item.baseZ + Math.cos(elapsed * (item.freq * 0.8) + item.phase) * 0.07;
      });

      // Centerpiece gentle floating & orientation
      const floatY = Math.sin(elapsed * 1.7) * 0.1;
      centerpieceGroup.position.y = (window.innerWidth < 768 ? -0.4 : 0.1) + floatY;

      if (!isDraggingRef.current) {
        centerpieceRot.targetY = -0.16 + mouse.x * 0.48 + Math.sin(elapsed * 0.8) * 0.06;
        centerpieceRot.targetX = 0.06 - mouse.y * 0.38 + Math.cos(elapsed * 0.9) * 0.05;
      }

      centerpieceRot.y += (centerpieceRot.targetY - centerpieceRot.y) * 0.07;
      centerpieceRot.x += (centerpieceRot.targetX - centerpieceRot.x) * 0.07;
      centerpieceGroup.rotation.y = centerpieceRot.y;
      centerpieceGroup.rotation.x = centerpieceRot.x;

      // Floating particles rotation
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.025;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      concreteMaterialFront.dispose();
      concreteMaterialDark.dispose();
      blockGeometry.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
      bezelGeo.dispose();
      bezelMat.dispose();
      lensRingOuterGeo.dispose();
      lensRingOuterMat.dispose();
      lensRingInnerGeo.dispose();
      lensRingInnerMat.dispose();
      glassGeo.dispose();
      glassMat.dispose();
      irisGeo.dispose();
      irisMat.dispose();
      shutterGeo.dispose();
      shutterMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      data-cursor="drag"
      className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
    />
  );
}
