import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

export function SpaceShip() {
  const shipRef = useRef<THREE.Group>(null);
  const velocity = useRef(new THREE.Vector3());
  
  useFrame((state, delta) => {
    if (!shipRef.current) return;

    const keys = useKeyboardControls.get();
    const speed = 5;
    
    if (keys.forward) velocity.current.z -= speed * delta;
    if (keys.backward) velocity.current.z += speed * delta;
    if (keys.left) velocity.current.x -= speed * delta;
    if (keys.right) velocity.current.x += speed * delta;
    if (keys.up) velocity.current.y += speed * delta;
    if (keys.down) velocity.current.y -= speed * delta;

    // Uygula hareket ve sürtünme
    shipRef.current.position.add(velocity.current);
    velocity.current.multiplyScalar(0.95); // sürtünme
    
    // Kamera takibi
    state.camera.position.lerp(
      new THREE.Vector3(
        shipRef.current.position.x,
        shipRef.current.position.y + 5,
        shipRef.current.position.z + 10
      ),
      0.1
    );
    state.camera.lookAt(shipRef.current.position);
  });

  return (
    <group ref={shipRef}>
      <mesh>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#4080ff" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 1]}>
        <cylinderGeometry args={[0.3, 0.5, 1.5]} />
        <meshStandardMaterial color="#2060dd" metalness={0.8} roughness={0.2} />
      </mesh>
      <pointLight position={[0, 0, -2]} intensity={1} color="#60a0ff" />
    </group>
  );
}