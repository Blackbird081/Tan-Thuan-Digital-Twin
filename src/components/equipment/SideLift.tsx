import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  moving?: boolean;
}

export const SideLift: React.FC<Props> = ({ position, rotation = [0, 0, 0], moving = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const spreaderRef = useRef<THREE.Group>(null);
  
  // Lưu vị trí gốc
  const initialPos = useRef(new THREE.Vector3(position[0], position[1], position[2]));

  useFrame((state) => {
    if (moving && groupRef.current && spreaderRef.current) {
      const t = state.clock.elapsedTime;
      
      // 1. DI CHUYỂN: Tiến vào bãi -> Lùi ra (Vuông góc)
      // Reset về gốc
      groupRef.current.position.copy(initialPos.current);
      
      // Chạy tới 4m (vào bãi) rồi lùi lại
      const drive = (Math.sin(t * 1.5) + 1) * 2; 
      groupRef.current.translateZ(drive); // Tiến theo hướng mũi xe

      // 2. NÂNG HẠ SPREADER
      // Khi xe ở xa (trong bãi) -> Hạ xuống lấy hàng
      // Khi xe lùi ra -> Nâng lên
      const lift = (1 - (drive / 4)) * 8; // Nâng cao tối đa 8m
      spreaderRef.current.position.y = 2 + lift;
    }
  });

  const bodyColor = "#dc2626"; 
  const mastColor = "#111827"; 
  const tireColor = "#1f2937";

  return (
    <group ref={groupRef} position={position} rotation={rotation as any}>
      {/* --- THÂN XE (Hướng Z+) --- */}
      <group position={[0, 1.2, 0]}>
        <Box args={[3, 1.5, 5]} position={[0, 0, 0]}><meshStandardMaterial color={bodyColor} /></Box>
        <group position={[0, 2, 0.5]}>
            <Box args={[2, 2.5, 2]}><meshStandardMaterial color="#1f2937" /></Box>
            <Box args={[1.8, 1.5, 1.8]} position={[0, 0.2, 0.2]}><meshStandardMaterial color="#bfdbfe" transparent opacity={0.6} /></Box>
        </group>
      </group>

      {/* Bánh xe */}
      <group position={[0, 0.8, 1.5]}>
          <Cylinder args={[0.8, 0.8, 0.6, 16]} rotation={[0, 0, Math.PI/2]} position={[1.4, 0, 0]}><meshStandardMaterial color={tireColor} /></Cylinder>
          <Cylinder args={[0.8, 0.8, 0.6, 16]} rotation={[0, 0, Math.PI/2]} position={[-1.4, 0, 0]}><meshStandardMaterial color={tireColor} /></Cylinder>
      </group>
      <group position={[0, 0.8, -1.8]}>
          <Cylinder args={[0.7, 0.7, 0.5, 16]} rotation={[0, 0, Math.PI/2]} position={[1.4, 0, 0]}><meshStandardMaterial color={tireColor} /></Cylinder>
          <Cylinder args={[0.7, 0.7, 0.5, 16]} rotation={[0, 0, Math.PI/2]} position={[-1.4, 0, 0]}><meshStandardMaterial color={tireColor} /></Cylinder>
      </group>

      {/* --- TRỤ NÂNG (MAST) - Phía trước Z+ --- */}
      <group position={[0, 0, 3.5]}> 
         <Box args={[0.4, 12, 0.4]} position={[1, 6, 0]}><meshStandardMaterial color={mastColor} /></Box>
         <Box args={[0.4, 12, 0.4]} position={[-1, 6, 0]}><meshStandardMaterial color={mastColor} /></Box>
         {[2, 5, 8, 11].map(y => (
             <Box key={y} args={[2.4, 0.3, 0.2]} position={[0, y, 0]}><meshStandardMaterial color={mastColor} /></Box>
         ))}

         {/* Cụm Spreader & Container */}
         <group ref={spreaderRef}>
             <Box args={[2.2, 1, 0.5]} position={[0, 0, 0.3]}><meshStandardMaterial color={mastColor} /></Box>
             
             <group position={[0, 0, 1.5]}>
                 <Box args={[6, 0.4, 0.8]} position={[0, 2.8, 0]}><meshStandardMaterial color={mastColor} /></Box>
                 
                 {/* Container Rỗng (Cam) */}
                 <group position={[0, 1.3, 0]} rotation={[0, Math.PI/2, 0]}>
                     <Box args={[2.4, 2.6, 6]}><meshStandardMaterial color="#f97316" /></Box>
                     <Box args={[2.2, 2.4, 0.1]} position={[0, 0, 3.01]}><meshStandardMaterial color="#333" /></Box>
                 </group>
             </group>
         </group>
      </group>

    </group>
  );
};
export default SideLift;