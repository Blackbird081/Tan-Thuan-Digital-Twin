import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Water = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
       // Hiệu ứng sóng nhẹ
       ref.current.position.y = -2.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    // Đặt mặt nước ở Z < -100 để bao phủ khu vực sông
    <mesh 
      ref={ref} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2.5, -300]} // Đẩy lùi ra xa hơn để bao trùm cả tàu
      receiveShadow
    >
      <planeGeometry args={[2000, 600]} /> {/* Mở rộng kích thước */}
      <meshStandardMaterial 
        color="#005f8a" 
        roughness={0.1} 
        metalness={0.6} 
        transparent 
        opacity={0.9} 
      />
    </mesh>
  );
};