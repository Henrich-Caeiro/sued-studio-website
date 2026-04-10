import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// SERVIÇOS: Ambient Particle Field
// Subtle background energy without content interference
// ============================================
const ServicesParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleData = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities };
  }, []);
  
  useFrame(() => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = particleData.velocities;
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];
      
      // Bounce at boundaries
      if (Math.abs(positions[i]) > 10) velocities[i] *= -1;
      if (Math.abs(positions[i + 1]) > 10) velocities[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleData.positions.length / 3}
          array={particleData.positions}
          itemSize={3}
          args={[particleData.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#20B2AA" transparent opacity={0.4} />
    </points>
  );
};

export const ServicesEffect = () => (
  <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.3} />
    <pointLight args={['#20B2AA']} position={[10, 10, 10]} intensity={0.3} />
    <ServicesParticles />
  </Canvas>
);

// ============================================
// VALORES: Gradient Flow + Text Reveal
// Smooth color transitions with floating elements
// ============================================
const ValuesFlow = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state: any) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Gentle rotation
    groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.5;
  });
  
  return (
    <group ref={groupRef}>
      {/* Floating planes with gradient */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 3 - 3, 0, -2]}>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial
            color={i === 0 ? '#20B2AA' : i === 1 ? '#4A90E2' : '#00D9FF'}
            emissive={i === 0 ? '#20B2AA' : i === 1 ? '#4A90E2' : '#00D9FF'}
            emissiveIntensity={0.2}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

export const ValuesEffect = () => (
  <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.4} />
    <pointLight args={['#4A90E2']} position={[5, 5, 5]} intensity={0.4} />
    <ValuesFlow />
  </Canvas>
);

// ============================================
// PORTFÓLIO: Morphing Mesh Grid
// Dynamic grid that responds to time
// ============================================
const PortfolioGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state: any) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Subtle wave motion
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.2;
    meshRef.current.scale.z = 1 + Math.sin(time * 0.5) * 0.1;
  });
  
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3, 4]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={0.15}
        wireframe={true}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

export const PortfolioEffect = () => (
  <Canvas camera={{ position: [0, 0, 8], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.3} />
    <pointLight args={['#00D9FF']} position={[8, 8, 8]} intensity={0.5} />
    <PortfolioGrid />
  </Canvas>
);

// ============================================
// FAQ: Pulsing Torus Knot
// Smooth, organic motion
// ============================================
const FAQKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state: any) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.scale.x = 1 + Math.sin(time * 0.8) * 0.15;
    meshRef.current.scale.y = 1 + Math.cos(time * 0.8) * 0.15;
  });
  
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.5, 100, 16]} />
      <meshStandardMaterial
        color="#D4AF37"
        emissive="#D4AF37"
        emissiveIntensity={0.2}
        wireframe={true}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

export const FAQEffect = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.4} />
    <pointLight args={['#D4AF37']} position={[5, 5, 5]} intensity={0.4} />
    <FAQKnot />
  </Canvas>
);

// ============================================
// CTA: Spiral Galaxy with Floating Particles
// High-energy finale effect
// ============================================
const CTAGalaxy = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  const galaxyData = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 4;
      const radius = 2 + (i / count) * 3;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    return { positions };
  }, []);
  
  useFrame((state: any) => {
    if (!pointsRef.current || !meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    pointsRef.current.rotation.z = time * 0.5;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });
  
  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={galaxyData.positions.length / 3}
            array={galaxyData.positions}
            itemSize={3}
            args={[galaxyData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#20B2AA" transparent opacity={0.8} />
      </points>
      
      <mesh ref={meshRef}>
        <octahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.25}
          wireframe={true}
          transparent
          opacity={0.4}
        />
      </mesh>
    </>
  );
};

export const CTAEffect = () => (
  <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.4} />
    <pointLight args={['#20B2AA']} position={[8, 8, 8]} intensity={0.5} />
    <pointLight args={['#00D9FF']} position={[-8, -8, 8]} intensity={0.3} />
    <CTAGalaxy />
  </Canvas>
);
