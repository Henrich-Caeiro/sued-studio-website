import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ColorInteractionThreeJS() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create an interactive grid of points (Mesh)
    // Connor Love style: A grid that distorts based on mouse position
    const width = 40;
    const height = 40;
    const size = 20;
    const geometry = new THREE.PlaneGeometry(size, size, width, height);
    
    // We'll use a Points system for the "Celestial" feel
    const material = new THREE.PointsMaterial({
      color: 0x1DB5D8, // Transformative Teal
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    // Store original positions for spring-back effect
    const originalPositions = geometry.attributes.position.array.slice();
    const positions = geometry.attributes.position.array as Float32Array;

    // Mouse tracking
    const mouse = new THREE.Vector2(-100, -100);
    const targetMouse = new THREE.Vector2(-100, -100);
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Smooth mouse movement
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      // Update raycaster
      raycaster.setFromCamera(mouse, camera);

      // Distort geometry
      const mousePoint = new THREE.Vector3();
      // Project mouse to z=0 plane
      const distance = -camera.position.z / raycaster.ray.direction.z;
      mousePoint.copy(raycaster.ray.direction).multiplyScalar(distance).add(camera.position);

      const mouseVel = new THREE.Vector2(targetMouse.x - mouse.x, targetMouse.y - mouse.y);
      
      for (let i = 0; i < positions.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];

        const dx = ox - mousePoint.x;
        const dy = oy - mousePoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Connor Love Effect: Proximity-based distortion
        const radius = 3.5;
        const strength = 1.2;
        
        if (dist < radius) {
          const proximity = 1 - dist / radius;
          const force = proximity * strength;
          
          // Target displacement
          const tx = ox + (dx / dist) * force + mouseVel.x * 5;
          const ty = oy + (dy / dist) * force + mouseVel.y * 5;
          const tz = oz + force * 2.0;

          positions[i] += (tx - positions[i]) * 0.15;
          positions[i + 1] += (ty - positions[i + 1]) * 0.15;
          positions[i + 2] += (tz - positions[i + 2]) * 0.15;
        } else {
          // Spring back to original position
          positions[i] += (ox - positions[i]) * 0.05;
          positions[i + 1] += (oy - positions[i + 1]) * 0.05;
          positions[i + 2] += (oz - positions[i + 2]) * 0.05;
        }

        // Add subtle wave animation
        positions[i + 2] += Math.sin(time + ox * 0.3 + oy * 0.2) * 0.02;
      }

      geometry.attributes.position.needsUpdate = true;
      
      // Subtle rotation
      mesh.rotation.z = time * 0.05;

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
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
