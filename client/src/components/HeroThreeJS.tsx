import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeJS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const geometriesRef = useRef<THREE.Mesh[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1f2e);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x20b2aa, 1, 100);
    pointLight1.position.set(30, 30, 30);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4a90e2, 0.8, 100);
    pointLight2.position.set(-30, -30, 30);
    pointLight2.castShadow = true;
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x00d9ff, 0.6, 100);
    pointLight3.position.set(0, 40, -30);
    scene.add(pointLight3);

    // Create particle system
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;

      velocities[i] = (Math.random() - 0.5) * 0.5;
      velocities[i + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i + 2] = (Math.random() - 0.5) * 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x20b2aa,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Create floating geometries
    const geometries = [
      new THREE.IcosahedronGeometry(8, 4),
      new THREE.OctahedronGeometry(10, 2),
      new THREE.TetrahedronGeometry(12, 0),
      new THREE.DodecahedronGeometry(6, 0),
    ];

    const colors = [0x20b2aa, 0x4a90e2, 0x00d9ff, 0xd4af37];

    geometries.forEach((geom, idx) => {
      const material = new THREE.MeshPhongMaterial({
        color: colors[idx],
        emissive: colors[idx],
        emissiveIntensity: 0.3,
        wireframe: false,
        shininess: 100,
      });

      const mesh = new THREE.Mesh(geom, material);
      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = {
        originalPosition: mesh.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatAmount: Math.random() * 10 + 5,
      };

      scene.add(mesh);
      geometriesRef.current.push(mesh);
    });

    // Mouse tracking
    const onMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Handle window resize
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Update camera based on mouse
      camera.position.x = mouseRef.current.x * 20;
      camera.position.y = mouseRef.current.y * 20;
      camera.lookAt(0, 0, 0);

      // Update particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Wrap around
          if (Math.abs(positions[i]) > 100) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 100) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 100) velocities[i + 2] *= -1;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate geometries
      geometriesRef.current.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;

        // Floating animation
        const time = Date.now() * 0.001;
        mesh.position.y =
          mesh.userData.originalPosition.y +
          Math.sin(time * mesh.userData.floatSpeed) * mesh.userData.floatAmount;

        // Subtle movement towards mouse
        mesh.position.x += (mouseRef.current.x * 10 - mesh.position.x) * 0.02;
        mesh.position.z += (mouseRef.current.y * 10 - mesh.position.z) * 0.02;
      });

      // Rotate lights
      const time = Date.now() * 0.0003;
      pointLight1.position.x = Math.cos(time) * 50;
      pointLight1.position.z = Math.sin(time) * 50;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      geometries.forEach((geom) => geom.dispose());
      geometriesRef.current.forEach((mesh) => {
        (mesh.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
}
