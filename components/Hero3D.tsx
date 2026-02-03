"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ 
  position, 
  color, 
  speed = 1,
  scale = 1,
  geometry = "sphere"
}: { 
  position: [number, number, number]; 
  color: string; 
  speed?: number;
  scale?: number;
  geometry?: "sphere" | "box" | "torus";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 * speed;
    }
  });

  const GeometryComponent = useMemo(() => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      default:
        return <sphereGeometry args={[0.6, 32, 32]} />;
    }
  }, [geometry]);

  return (
    <Float
      speed={2 * speed}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {GeometryComponent}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function MicrophoneIcon({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Mic head */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Mic body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
          <meshStandardMaterial color="#1e1e2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Mic stand */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

function HeadphonesIcon({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <group ref={groupRef} position={position} rotation={[0, 0, Math.PI / 6]}>
        {/* Headband */}
        <mesh>
          <torusGeometry args={[0.5, 0.05, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#ec4899" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Left earcup */}
        <mesh position={[-0.45, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
          <meshStandardMaterial color="#1e1e2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Right earcup */}
        <mesh position={[0.45, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
          <meshStandardMaterial color="#1e1e2e" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function MixingConsoleIcon({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={groupRef} position={position}>
        {/* Console body */}
        <mesh>
          <boxGeometry args={[1.2, 0.4, 0.8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Knobs */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
          <mesh key={i} position={[x, 0.25, -0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.1, 12]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} />
          </mesh>
        ))}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
          <mesh key={i} position={[x, 0.25, 0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.1, 12]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
          </mesh>
        ))}
        {/* Faders */}
        {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0.22, 0]}>
            <boxGeometry args={[0.04, 0.08, 0.15]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Particles() {
  const count = 50;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#06b6d4"
        />
        
        {/* Floating Studio Equipment */}
        <MicrophoneIcon position={[-2.5, 1, -1]} />
        <HeadphonesIcon position={[2.5, 0.5, -0.5]} />
        <MixingConsoleIcon position={[0, -1.5, 0]} />
        
        {/* Decorative shapes */}
        <FloatingShape position={[-3, -1, -2]} color="#8b5cf6" speed={0.8} scale={0.6} geometry="sphere" />
        <FloatingShape position={[3, 1.5, -1.5]} color="#ec4899" speed={1.2} scale={0.5} geometry="torus" />
        <FloatingShape position={[-1.5, 2, -2]} color="#06b6d4" speed={0.9} scale={0.4} geometry="box" />
        <FloatingShape position={[2, -2, -1]} color="#8b5cf6" speed={1.1} scale={0.3} geometry="sphere" />
        
        {/* Background particles */}
        <Particles />
        
        {/* Large background spheres */}
        <Sphere args={[4, 64, 64]} position={[-6, -4, -8]}>
          <meshStandardMaterial
            color="#1e1e2e"
            transparent
            opacity={0.3}
            roughness={0.8}
          />
        </Sphere>
        <Sphere args={[3, 64, 64]} position={[5, 4, -10]}>
          <meshStandardMaterial
            color="#2a2a3c"
            transparent
            opacity={0.2}
            roughness={0.8}
          />
        </Sphere>
      </Canvas>
    </div>
  );
}
