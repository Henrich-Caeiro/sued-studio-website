import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WaveThreeJS() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1f2e);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 1.5, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    // Create wave geometry
    const geometry = new THREE.PlaneGeometry(20, 15, 40, 40);
    const material = new THREE.MeshPhongMaterial({
      color: 0x20b2aa,
      emissive: 0x0a4d4d,
      wireframe: false,
      flatShading: true,
    });

    const wave = new THREE.Mesh(geometry, material);
    scene.add(wave);

    // Store original positions
    const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
    const originalPositions = positionAttribute.array.slice() as Float32Array;

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      time += 0.01;

      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = (originalPositions[i] as number);
        const y = (originalPositions[i + 1] as number);

        // Wave calculation
        const wave1 = Math.sin(x * 0.3 + time) * 0.5;
        const wave2 = Math.cos(y * 0.3 + time * 0.7) * 0.3;
        const wave3 = Math.sin((x + y) * 0.2 + time * 0.5) * 0.4;

        positions[i + 2] = wave1 + wave2 + wave3;
      }

      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      wave.rotation.x = Math.sin(time * 0.3) * 0.3;
      wave.rotation.y = Math.sin(time * 0.2) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 opacity-30" />;
}
