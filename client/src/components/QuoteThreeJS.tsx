import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function QuoteThreeJS() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create gradient background effect
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#0F1419');
      gradient.addColorStop(0.5, '#1a2a3a');
      gradient.addColorStop(1, '#0F1419');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.z = -2;
    scene.add(plane);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00D9FF,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    
    // Icosahedron
    const ico = new THREE.IcosahedronGeometry(0.8, 4);
    const icoMaterial = new THREE.MeshPhongMaterial({
      color: 0x00D9FF,
      wireframe: true,
      emissive: 0x00D9FF,
      emissiveIntensity: 0.3,
    });
    const icoMesh = new THREE.Mesh(ico, icoMaterial);
    icoMesh.position.set(-3, 2, 0);
    scene.add(icoMesh);
    shapes.push(icoMesh);

    // Octahedron
    const oct = new THREE.OctahedronGeometry(0.6, 2);
    const octMaterial = new THREE.MeshPhongMaterial({
      color: 0x20C997,
      wireframe: true,
      emissive: 0x20C997,
      emissiveIntensity: 0.3,
    });
    const octMesh = new THREE.Mesh(oct, octMaterial);
    octMesh.position.set(3, -1.5, 0);
    scene.add(octMesh);
    shapes.push(octMesh);

    // Tetrahedron
    const tet = new THREE.TetrahedronGeometry(0.7, 1);
    const tetMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFD700,
      wireframe: true,
      emissive: 0xFFD700,
      emissiveIntensity: 0.2,
    });
    const tetMesh = new THREE.Mesh(tet, tetMaterial);
    tetMesh.position.set(0, 3, -1);
    scene.add(tetMesh);
    shapes.push(tetMesh);

    // Lighting
    const light1 = new THREE.PointLight(0x00D9FF, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x20C997, 0.8, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Scroll tracking for animation
    let scrollProgress = 0;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = scrollTop / docHeight;
    };

    window.addEventListener('scroll', onScroll);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.003 + index * 0.001;
        shape.rotation.y += 0.004 + index * 0.0015;
        shape.rotation.z += 0.002 + index * 0.0008;

        // Floating motion
        shape.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.002;
        shape.position.x += Math.cos(Date.now() * 0.0003 + index) * 0.001;
      });

      // Camera follows mouse
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      icoMaterial.dispose();
      octMaterial.dispose();
      tetMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
