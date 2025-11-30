import React, { useRef } from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  moving?: boolean; 
}

export const Forklift: React.FC<Props> = ({ position, rotation = [0, 0, 0], moving = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const forksRef = useRef<THREE.Group>(null);
  
  // Lưu vị trí gốc (Vị trí đứng chờ ở mép đường)
  const initialPos = useRef(new THREE.Vector3(position[0], position[1], position[2]));

  useFrame((state) => {
    if (moving && groupRef.current && forksRef.current) {
      const t = state.clock.elapsedTime;
      
      // 1. DI CHUYỂN: 
      // Reset về vị trí gốc mỗi frame để tính toán lại từ đầu
      groupRef.current.position.copy(initialPos.current);
      
      // Tính khoảng cách lao tới: Từ 0m đến 15m (Lao sâu vào bãi)
      // Math.sin chạy -1 -> 1. (sin + 1) chạy 0 -> 2.
      // Nhân 7.5 sẽ được khoảng cách 0 -> 15m.
      const drive = (Math.sin(t * 1.5) + 1) * 7.5; 
      
      // QUAN TRỌNG: translateZ đẩy xe đi theo hướng MŨI XE đang quay
      groupRef.current.translateZ(drive);

      // 2. NÂNG HẠ CÀNG
      // Khi xe ở xa (drive lớn - trong bãi) -> Hạ càng lấy hàng
      // Khi xe lùi về (drive nhỏ - mép đường) -> Nâng càng lên
      const lift = (1 - (drive / 15)) * 1.5;
      forksRef.current.position.y = 0.2 + lift;
    }
  });

  const bodyColor = "#eab308"; 
  const tireColor = "#1f2937"; 

  return (
    <group ref={groupRef} position={position} rotation={rotation as any}>
      {/* --- THÂN XE (Hướng Z+) --- */}
      <group position={[0, 1, 0]}>
        <Box args={[2, 1.2, 3]} position={[0, 0, 0]}><meshStandardMaterial color={bodyColor} /></Box>
        <Box args={[1.8, 2.2, 1.5]} position={[0, 1.5, -0.5]}><meshStandardMaterial color="#333" wireframe /></Box>
        <Box args={[1.8, 0.1, 1.5]} position={[0, 2.6, -0.5]}><meshStandardMaterial color="#333" /></Box>
      </group>

      {/* Bánh xe */}
      <Cylinder args={[0.5, 0.5, 0.6, 16]} rotation={[0, 0, Math.PI/2]} position={[1.1, 0.5, 1]}><meshStandardMaterial color={tireColor} /></Cylinder>
      <Cylinder args={[0.5, 0.5, 0.6, 16]} rotation={[0, 0, Math.PI/2]} position={[-1.1, 0.5, 1]}><meshStandardMaterial color={tireColor} /></Cylinder>
      <Cylinder args={[0.4, 0.4, 0.6, 16]} rotation={[0, 0, Math.PI/2]} position={[1.1, 0.4, -1]}><meshStandardMaterial color={tireColor} /></Cylinder>
      <Cylinder args={[0.4, 0.4, 0.6, 16]} rotation={[0, 0, Math.PI/2]} position={[-1.1, 0.4, -1]}><meshStandardMaterial color={tireColor} /></Cylinder>

      {/* --- CÀNG NÂNG (Phía trước Z+) --- */}
      <group position={[0, 0, 1.6]}> 
         <Box args={[0.2, 3.5, 0.2]} position={[0.5, 1.75, 0]}><meshStandardMaterial color="#333" /></Box>
         <Box args={[0.2, 3.5, 0.2]} position={[-0.5, 1.75, 0]}><meshStandardMaterial color="#333" /></Box>
         
         <group ref={forksRef}>
            <Box args={[1.5, 0.5, 0.2]} position={[0, 0, 0.2]}><meshStandardMaterial color="#111" /></Box>
            <Box args={[0.2, 0.1, 1.5]} position={[0.4, -0.1, 0.9]}><meshStandardMaterial color="#333" /></Box>
            <Box args={[0.2, 0.1, 1.5]} position={[-0.4, -0.1, 0.9]}><meshStandardMaterial color="#333" /></Box>
            
            {/* Hàng hóa */}
            <group position={[0, 0.6, 1.0]}>
                <Cylinder args={[0.5, 0.5, 1.2]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color="#94a3b8" /></Cylinder>
            </group>
         </group>
      </group>
    </group>
  );
};