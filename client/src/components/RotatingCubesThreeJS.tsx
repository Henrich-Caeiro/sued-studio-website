import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RotatingCubesThreeJS() {
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
    camera.position.z = 25;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d9ff, 1, 100);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xd4af37, 0.8, 100);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    // Create rotating cubes
    const cubes: THREE.Mesh[] = [];
    const cubeCount = 5;

    for (let i = 0; i < cubeCount; i++) {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0x20b2aa : 0x4a90e2,
        emissive: i % 2 === 0 ? 0x0a4d4d : 0x1a3a5a,
        shininess: 100,
      });

      const cube = new THREE.Mesh(geometry, material);
      const angle = (i / cubeCount) * Math.PI * 2;
      cube.position.x = Math.cos(angle) * 10;
      cube.position.y = Math.sin(angle) * 10;
      cube.position.z = Math.sin(angle * 2) * 5;

      scene.add(cube);
      cubes.push(cube);
    }

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      time += 0.01;

      cubes.forEach((cube, index) => {
        const angle = (index / cubeCount) * Math.PI * 2 + time;
        cube.position.x = Math.cos(angle) * 10;
        cube.position.y = Math.sin(angle) * 10;
        cube.position.z = Math.sin(angle * 2) * 5;

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.015;
        cube.rotation.z += 0.008;
      });

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
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 opacity-35" />;
}
