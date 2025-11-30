import React, { useRef } from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const LiebherrCrane: React.FC<Props> = ({ position, rotation = [0, 0, 0] }) => {
  const craneColor = "#0284c7"; // Màu xanh dương công nghiệp (Sky-600/700)
  const darkColor = "#1f2937";
  
  const towerRef = useRef<THREE.Group>(null);
  const cableGroupRef = useRef<THREE.Group>(null);
  const cableMeshRef = useRef<THREE.Mesh>(null);
  const hookRef = useRef<THREE.Group>(null);

  // Cấu hình cần cẩu
  const BOOM_LEN = 45;
  const BOOM_ANGLE = Math.PI / 4; // 45 độ

  useFrame((state) => {
    if (towerRef.current && cableGroupRef.current && cableMeshRef.current && hookRef.current) {
      const t = state.clock.elapsedTime * 0.5;
      
      // 1. Quay tháp
      towerRef.current.rotation.y = Math.PI + Math.sin(t) * (Math.PI / 3.5);

      // 2. Tính toán độ dài dây cáp
      // Đỉnh cần ở độ cao khoảng: 18 (tháp) + sin(45)*45 ~ 18 + 31 = 49m
      // Mặt đất/Tàu ở độ cao: 0m.
      // => Dây cáp cần dài tối đa ~50m.
      
      // Biến thiên độ dài dây:
      // Khi cos(t) = 1 (giữa) -> Dây ngắn (kéo lên) -> Length = 15m
      // Khi cos(t) = -1 (biên) -> Dây dài (hạ xuống) -> Length = 45m
      const cableLength = 30 - Math.cos(2 * t) * 15; 

      // Cập nhật hình học dây cáp
      // Scale trục Y của dây cáp
      cableMeshRef.current.scale.y = cableLength;
      // Dịch chuyển tâm dây cáp xuống 1 nửa độ dài để đầu trên cố định
      cableMeshRef.current.position.y = -cableLength / 2;

      // Cập nhật vị trí móc cẩu (Hook)
      hookRef.current.position.y = -cableLength;
    }
  });

  return (
    <group position={position} rotation={rotation as any}>
      {/* Chân đế */}
      <group position={[0, 0, 0]}>
        <Cylinder args={[0.8, 1.2, 8]} position={[-4, 4, -4]} rotation={[0.2, 0, -0.2]}><meshStandardMaterial color={craneColor} /></Cylinder>
        <Cylinder args={[0.8, 1.2, 8]} position={[4, 4, -4]} rotation={[0.2, 0, 0.2]}><meshStandardMaterial color={craneColor} /></Cylinder>
        <Cylinder args={[0.8, 1.2, 8]} position={[-4, 4, 4]} rotation={[-0.2, 0, -0.2]}><meshStandardMaterial color={craneColor} /></Cylinder>
        <Cylinder args={[0.8, 1.2, 8]} position={[4, 4, 4]} rotation={[-0.2, 0, 0.2]}><meshStandardMaterial color={craneColor} /></Cylinder>
        <Box args={[10, 1, 10]} position={[0, 8, 0]}><meshStandardMaterial color={craneColor} /></Box>
      </group>

      {/* Tháp quay */}
      <group ref={towerRef} position={[0, 9, 0]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 6, 0]}><cylinderGeometry args={[2, 3, 12, 4]} /><meshStandardMaterial color={craneColor} /></mesh>
        <group position={[0, 10, 0]}>
             <Box args={[5, 6, 8]} position={[0, 0, -5]}><meshStandardMaterial color={craneColor} /></Box>
             <group position={[2.5, 2, 2]}>
                <Box args={[2, 3, 3]}><meshStandardMaterial color="#e2e8f0" transparent opacity={0.7} /></Box>
                <Box args={[2.1, 0.2, 3.1]} position={[0, 1.5, 0]}><meshStandardMaterial color="#333" /></Box>
                <Box args={[2.1, 0.2, 3.1]} position={[0, -1.5, 0]}><meshStandardMaterial color="#333" /></Box>
             </group>
        </group>

        {/* Cần cẩu */}
        <group position={[0, 10, 2]} rotation={[-BOOM_ANGLE, 0, 0]}> 
            <Box args={[1.5, 1.5, BOOM_LEN]} position={[0, 0, BOOM_LEN/2]}><meshStandardMaterial color={craneColor} /></Box>
            <Cylinder args={[0.8, 0.8, 4]} rotation={[0, 0, Math.PI/2]} position={[0, 0, BOOM_LEN]}><meshStandardMaterial color="#333" /></Cylinder>
            
            {/* --- CỤM DÂY CÁP (Gắn vào đỉnh cần) --- */}
            {/* Xoay ngược lại BOOM_ANGLE để dây luôn thẳng đứng so với mặt đất */}
            <group ref={cableGroupRef} position={[0, 0, BOOM_LEN]} rotation={[BOOM_ANGLE, 0, 0]}>
                
                {/* Dây cáp (Mesh này sẽ bị scale Y) */}
                {/* Cylinder gốc cao 1m. Scale Y = Length */}
                <mesh ref={cableMeshRef} position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                {/* Móc cẩu & Hàng (Di chuyển theo dây) */}
                <group ref={hookRef}>
                    <Box args={[1.5, 0.5, 1]} position={[0, 0, 0]}><meshStandardMaterial color="#facc15" /></Box>
                    
                    {/* Hàng hóa */}
                    <group position={[0, -1.5, 0]} rotation={[0, 0, Math.PI/2]}>
                        <Cylinder args={[1, 1, 1.8, 32]}><meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} /></Cylinder>
                        <Cylinder args={[1.01, 1.01, 0.2, 32]} position={[0, 0.5, 0]}><meshStandardMaterial color="#333" /></Cylinder>
                        <Cylinder args={[1.01, 1.01, 0.2, 32]} position={[0, -0.5, 0]}><meshStandardMaterial color="#333" /></Cylinder>
                    </group>
                </group>
            </group>
        </group>
        
        <Box args={[6, 4, 4]} position={[0, 5, -10]}><meshStandardMaterial color={darkColor} /></Box>
      </group>
    </group>
  );
};