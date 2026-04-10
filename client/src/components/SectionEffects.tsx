import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// SERVIÇOS: Orbiting Nodes (Rede de Conexões)
// ============================================
const ServiceNodes = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  
  const { nodes, connections } = useMemo(() => {
    const nodes = [];
    const connections = [];
    const nodeCount = 6;
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 4;
      nodes.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0],
        angle: angle,
        speed: 0.3 + Math.random() * 0.2
      });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.4) {
          connections.push([i, j]);
        }
      }
    }
    
    return { nodes, connections };
  }, []);

  useFrame((state: any) => {
    if (!groupRef.current) return;
    
    // Rotate entire group
    groupRef.current.rotation.z += 0.0005;
    
    // Update node positions
    nodes.forEach((node, idx) => {
      if (nodesRef.current[idx]) {
        const time = state.clock.getElapsedTime();
        const newAngle = node.angle + time * node.speed * 0.1;
        const radius = 4 + Math.sin(time * 0.5) * 0.5;
        
        nodesRef.current[idx].position.x = Math.cos(newAngle) * radius;
        nodesRef.current[idx].position.y = Math.sin(newAngle) * radius;
        nodesRef.current[idx].position.z = Math.sin(time * 0.3 + idx) * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {connections.map((conn, idx) => {
        const start = nodes[conn[0]];
        const end = nodes[conn[1]];
        return (
          <line key={`conn-${idx}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  start.position[0], start.position[1], start.position[2],
                  end.position[0], end.position[1], end.position[2]
                ])}
                itemSize={3}
                args={[new Float32Array([
                  start.position[0], start.position[1], start.position[2],
                  end.position[0], end.position[1], end.position[2]
                ]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#20B2AA" transparent opacity={0.3} />
          </line>
        );
      })}
      
      {/* Nodes */}
      {nodes.map((node, idx) => (
        <mesh
          key={`node-${idx}`}
          position={node.position as [number, number, number]}
          ref={(mesh) => {
            if (mesh) nodesRef.current[idx] = mesh;
          }}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#20B2AA"
            emissive="#00D9FF"
            emissiveIntensity={0.5}
            wireframe={false}
          />
        </mesh>
      ))}
    </group>
  );
};

// ============================================
// VALORES: Rotating Geometric Forms
// ============================================
const ValuesGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state: any) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    meshesRef.current.forEach((mesh, idx) => {
      // Rotation
      mesh.rotation.x += 0.003 * (idx + 1);
      mesh.rotation.y += 0.005 * (idx + 1);
      mesh.rotation.z += 0.002 * (idx + 1);
      
      // Floating motion
      mesh.position.y += Math.sin(time * 0.5 + idx) * 0.001;
      
      // Pulsing scale
      const scale = 1 + Math.sin(time * 0.3 + idx * Math.PI / 2) * 0.15;
      mesh.scale.set(scale, scale, scale);
    });
  });

  const geometries = [
    { type: 'octahedron', color: '#4A90E2', emissive: '#00D9FF' },
    { type: 'tetrahedron', color: '#20B2AA', emissive: '#00D9FF' },
    { type: 'dodecahedron', color: '#00D9FF', emissive: '#4A90E2' },
    { type: 'icosahedron', color: '#D4AF37', emissive: '#20B2AA' }
  ];

  return (
    <group ref={groupRef}>
      {geometries.map((geom, idx) => {
        const angle = (idx / geometries.length) * Math.PI * 2;
        const x = Math.cos(angle) * 3;
        const z = Math.sin(angle) * 3;
        
        return (
          <mesh
            key={`geom-${idx}`}
            position={[x, 0, z]}
            ref={(mesh) => {
              if (mesh) meshesRef.current[idx] = mesh;
            }}
          >
            {geom.type === 'octahedron' && <octahedronGeometry args={[0.8, 0]} />}
            {geom.type === 'tetrahedron' && <tetrahedronGeometry args={[0.8, 0]} />}
            {geom.type === 'dodecahedron' && <dodecahedronGeometry args={[0.6, 0]} />}
            {geom.type === 'icosahedron' && <icosahedronGeometry args={[0.7, 0]} />}
            
            <meshStandardMaterial
              color={geom.color}
              emissive={geom.emissive}
              emissiveIntensity={0.3}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// ============================================
// PORTFÓLIO: Morphing Particles (Fluid Motion)
// ============================================
const PortfolioParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesData = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions, velocities };
  }, []);

  useFrame((state: any) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < positions.length; i += 3) {
      // Apply velocity
      positions[i] += particlesData.velocities[i];
      positions[i + 1] += particlesData.velocities[i + 1];
      positions[i + 2] += particlesData.velocities[i + 2];
      
      // Boundary wrapping
      if (positions[i] > 10) positions[i] = -10;
      if (positions[i] < -10) positions[i] = 10;
      if (positions[i + 1] > 10) positions[i + 1] = -10;
      if (positions[i + 1] < -10) positions[i + 1] = 10;
      if (positions[i + 2] > 5) positions[i + 2] = -5;
      if (positions[i + 2] < -5) positions[i + 2] = 5;
      
      // Sine wave distortion
      positions[i + 1] += Math.sin(time * 0.3 + i * 0.01) * 0.002;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={particlesData.positions.length / 3}
                array={particlesData.positions}
                itemSize={3}
                args={[particlesData.positions, 3]}
              />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00D9FF"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// ============================================
// FAQ: Pulsing Spheres (Knowledge Nodes)
// ============================================
const FAQSpheres = () => {
  const groupRef = useRef<THREE.Group>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);

  useFrame((state: any) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    spheresRef.current.forEach((sphere, idx) => {
      // Pulsing scale
      const pulse = 1 + Math.sin(time * 2 + idx * Math.PI / 3) * 0.3;
      sphere.scale.set(pulse, pulse, pulse);
      
      // Gentle rotation
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;
      
      // Vertical bobbing
      sphere.position.y = Math.sin(time * 0.5 + idx) * 1.5;
    });
  });

  const spherePositions = [
    [-3, 0, 0],
    [0, 0, 0],
    [3, 0, 0],
    [-1.5, 2.5, -1],
    [1.5, 2.5, -1]
  ];

  return (
    <group ref={groupRef}>
      {spherePositions.map((pos, idx) => (
        <mesh
          key={`faq-sphere-${idx}`}
          position={pos as [number, number, number]}
          ref={(mesh) => {
            if (mesh) spheresRef.current[idx] = mesh;
          }}
        >
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#D4AF37' : '#20B2AA'}
            emissive={idx % 2 === 0 ? '#20B2AA' : '#D4AF37'}
            emissiveIntensity={0.4}
            wireframe={idx % 2 === 0}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// ============================================
// CTA: Spiral Galaxy (Call to Action Focus)
// ============================================
const CTAGalaxy = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const galaxyData = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 8;
      const height = (Math.random() - 0.5) * 2;
      
      positions[i * 3] = Math.cos(angle) * distance;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * distance;
      
      // Color gradient
      const colorIdx = Math.floor((distance / 8) * 2);
      if (colorIdx === 0) {
        colors[i * 3] = 0.13; // R
        colors[i * 3 + 1] = 0.7; // G
        colors[i * 3 + 2] = 0.67; // B (Teal)
      } else {
        colors[i * 3] = 0; // R
        colors[i * 3 + 1] = 0.85; // G
        colors[i * 3 + 2] = 1; // B (Cyan)
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state: any) => {
    if (!groupRef.current || !particlesRef.current) return;
    
    groupRef.current.rotation.y += 0.0003;
    groupRef.current.rotation.x += 0.00015;
    
    // Gentle wobble
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3;
  });

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={galaxyData.positions.length / 3}
            array={galaxyData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={galaxyData.colors.length / 3}
            array={galaxyData.colors}
            itemSize={3}
            args={[galaxyData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
};

// ============================================
// Canvas Wrappers
// ============================================
export const ServicesEffect = () => (
  <Canvas camera={{ position: [0, 0, 8], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.4} />
    <pointLight args={['#20B2AA']} position={[10, 10, 10]} intensity={0.6} />
    <ServiceNodes />
  </Canvas>
);

export const ValuesEffect = () => (
  <Canvas camera={{ position: [0, 0, 8], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.4} />
    <pointLight args={['#4A90E2']} position={[10, 10, 10]} intensity={0.6} />
    <ValuesGeometry />
  </Canvas>
);

export const PortfolioEffect = () => (
  <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.5} />
    <pointLight args={['#00D9FF']} position={[10, 10, 10]} intensity={0.8} />
    <PortfolioParticles />
  </Canvas>
);

export const FAQEffect = () => (
  <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.4} />
    <pointLight args={['#D4AF37']} position={[10, 10, 10]} intensity={0.6} />
    <FAQSpheres />
  </Canvas>
);

export const CTAEffect = () => (
  <Canvas camera={{ position: [0, 0, 12], fov: 75 }} style={{ pointerEvents: 'none' }} gl={{ alpha: true }}>
    <ambientLight intensity={0.5} />
    <pointLight args={['#20B2AA']} position={[10, 10, 10]} intensity={0.7} />
    <pointLight args={['#00D9FF']} position={[-10, -10, 10]} intensity={0.5} />
    <CTAGalaxy />
  </Canvas>
);
