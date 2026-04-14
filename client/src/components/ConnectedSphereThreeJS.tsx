import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ConnectedSphereThreeJS() {
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
    camera.position.z = 20;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d9ff, 1.5, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create central sphere
    const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x20b2aa,
      emissive: 0x0a4d4d,
      shininess: 100,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create orbiting nodes
    const nodeCount = 8;
    const nodes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.SphereGeometry(0.5, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0x4a90e2 : 0xd4af37,
        emissive: i % 2 === 0 ? 0x1a3a5a : 0x6a5a1a,
      });

      const node = new THREE.Mesh(geometry, material);
      scene.add(node);
      nodes.push(node);

      const angle = (i / nodeCount) * Math.PI * 2;
      const x = Math.cos(angle) * 8;
      const y = Math.sin(angle) * 8;
      const z = Math.cos(angle * 2) * 3;

      node.position.set(x, y, z);
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    // Create lines connecting nodes
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const nextI = (i + 1) % nodeCount;
      linePositions.push(
        nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
        nodePositions[nextI].x, nodePositions[nextI].y, nodePositions[nextI].z
      );
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.5,
      linewidth: 2,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      time += 0.01;

      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;

      nodes.forEach((node, index) => {
        const angle = (index / nodeCount) * Math.PI * 2 + time * 0.5;
        const x = Math.cos(angle) * 8;
        const y = Math.sin(angle) * 8;
        const z = Math.cos(angle * 2) * 3;

        node.position.set(x, y, z);
        node.rotation.x += 0.02;
        node.rotation.y += 0.03;
      });

      // Update lines
      const newLinePositions: number[] = [];
      nodes.forEach((node, i) => {
        const nextI = (i + 1) % nodeCount;
        newLinePositions.push(
          node.position.x, node.position.y, node.position.z,
          nodes[nextI].position.x, nodes[nextI].position.y, nodes[nextI].position.z
        );
      });

      lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(newLinePositions), 3));

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

  return <div ref={containerRef} className="absolute inset-0 opacity-40" />;
}
