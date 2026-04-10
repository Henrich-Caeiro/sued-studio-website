import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SectionThreeJSProps {
  sectionId: string;
  particleColor?: string;
  particleCount?: number;
}

export default function SectionThreeJS({ 
  sectionId, 
  particleColor = '#20B2AA',
  particleCount = 300 
}: SectionThreeJSProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(particleColor, 1, 100);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Create particles
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      velocities[i] = (Math.random() - 0.5) * 0.3;
      velocities[i + 1] = (Math.random() - 0.5) * 0.3;
      velocities[i + 2] = (Math.random() - 0.5) * 0.1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Create floating cubes
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const material = new THREE.MeshPhongMaterial({
        color: particleColor,
        emissive: particleColor,
        emissiveIntensity: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005,
        },
      };

      scene.add(mesh);
      meshesRef.current.push(mesh);
    }

    // Handle window resize
    const onWindowResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 25) velocities[i + 2] *= -1;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate meshes
      meshesRef.current.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onWindowResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      meshesRef.current.forEach((mesh) => {
        (mesh.geometry as THREE.BufferGeometry).dispose();
        (mesh.material as THREE.Material).dispose();
      });
    };
  }, [particleColor, particleCount]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
