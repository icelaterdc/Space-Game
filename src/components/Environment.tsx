import { Stars, Cloud } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function Environment() {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      
      <group ref={cloudsRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Cloud
            key={i}
            position={[
              Math.random() * 100 - 50,
              Math.random() * 30 - 15,
              Math.random() * 100 - 50,
            ]}
            opacity={0.5}
            speed={0.4}
            depth={1.5}
            segments={20}
          />
        ))}
      </group>

      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  );
}