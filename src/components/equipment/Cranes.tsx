import React, { useRef } from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- 1. CẨU BỜ (STS / QC CRANE) - PHIÊN BẢN SẠCH & CÁP ĐÔI ---
export const QCCrane: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const trolleyRef = useRef<THREE.Group>(null);
  const cableRef = useRef<THREE.Group>(null);
  
  const mainColor = "#dc2626"; // Đỏ
  const cabinColor = "#f3f4f6"; // Trắng
  const yellowColor = "#facc15"; // Vàng
  const cableColor = "#374151"; // Màu dây cáp giằng

  useFrame((state) => {
    if (trolleyRef.current && cableRef.current) {
      const t = state.clock.elapsedTime;
      
      // 1. Xe con chạy ra vào
      const trolleyZ = -25 + Math.sin(t * 0.8) * 15; 
      trolleyRef.current.position.z = trolleyZ;

      // 2. Nâng hạ Spreader
      const hoistLen = 15 + Math.cos(t * 0.8) * 10;
      cableRef.current.scale.y = hoistLen;
      cableRef.current.position.y = -hoistLen / 2;
    }
  });

  return (
    <group position={position}>
      {/* --- A. CHÂN ĐẾ (PORTAL FRAME) - ĐÃ XÓA BOGIES --- */}
      <group>
        {/* 4 Chân trụ chính */}
        <Box args={[2, 30, 2]} position={[-8, 15, -10]}><meshStandardMaterial color={mainColor} /></Box>
        <Box args={[2, 30, 2]} position={[8, 15, -10]}><meshStandardMaterial color={mainColor} /></Box>
        <Box args={[2, 30, 2]} position={[-8, 15, 10]}><meshStandardMaterial color={mainColor} /></Box>
        <Box args={[2, 30, 2]} position={[8, 15, 10]}><meshStandardMaterial color={mainColor} /></Box>

        {/* Thanh ngang trên cao (Giữ nguyên) */}
        <Box args={[18, 2, 2]} position={[0, 28, -10]}><meshStandardMaterial color={mainColor} /></Box>
        <Box args={[18, 2, 2]} position={[0, 28, 10]}><meshStandardMaterial color={mainColor} /></Box>
        <Box args={[2, 2, 22]} position={[-8, 28, 0]}><meshStandardMaterial color={mainColor} /></Box>
        <Box args={[2, 2, 22]} position={[8, 28, 0]}><meshStandardMaterial color={mainColor} /></Box>

        {/* ĐÃ XÓA BỎ PHẦN BOGIES (THANH NGANG DƯỚI ĐẤT) */}
      </group>

      {/* --- B. HỆ THỐNG CẦN & THÁP (UPPER STRUCTURE) --- */}
      <group position={[0, 30, 0]}>
        {/* Buồng máy trung tâm */}
        <Box args={[12, 5, 15]} position={[0, 2.5, 5]}><meshStandardMaterial color={cabinColor} /></Box>

        {/* THÁP TREO CÁP (APEX FRAME) - 2 Trụ cao để móc cáp */}
        <group position={[0, 5, 0]}>
            {/* Trụ trái */}
            <Box args={[1.5, 14, 1.5]} position={[-5, 7, 0]}><meshStandardMaterial color={mainColor} /></Box>
            {/* Trụ phải */}
            <Box args={[1.5, 14, 1.5]} position={[5, 7, 0]}><meshStandardMaterial color={mainColor} /></Box>
            {/* Thanh nối đỉnh tháp */}
            <Box args={[12, 1, 1]} position={[0, 14, 0]}><meshStandardMaterial color={mainColor} /></Box>
        </group>

        {/* CẦN CẨU (BOOM) - Vươn ra biển */}
        <group position={[0, 0, -25]}>
            <Box args={[2, 2, 65]} position={[-5, 0, 0]}><meshStandardMaterial color={mainColor} /></Box>
            <Box args={[2, 2, 65]} position={[5, 0, 0]}><meshStandardMaterial color={mainColor} /></Box>
            {/* Thanh nối ngang */}
            {[0, 15, 30, 45, 60].map(z => (
                <Box key={z} args={[10, 0.5, 0.5]} position={[0, 0, -30 + z]}><meshStandardMaterial color={mainColor} /></Box>
            ))}
        </group>

        {/* CẦN SAU (BACKREACH) */}
        <group position={[0, 0, 20]}>
            <Box args={[2, 2, 25]} position={[-5, 0, 0]}><meshStandardMaterial color={mainColor} /></Box>
            <Box args={[2, 2, 25]} position={[5, 0, 0]}><meshStandardMaterial color={mainColor} /></Box>
        </group>

        {/* --- CÁP GIẰNG (TENSION CABLES) - 2 CẶP --- */}
        {/* Nối từ Đỉnh Tháp (Y=19) xuống Cần Cẩu (Y=0) */}
        
        {/* Cặp Trước (Forestays): Nối ra giữa cần (Z=-20) */}
        {/* Vector: Y giảm 19, Z giảm 20. Góc nghiêng ~ 45 độ */}
        <Cylinder args={[0.1, 0.1, 28]} position={[-5, 10, -10]} rotation={[0.8, 0, 0]}><meshStandardMaterial color={cableColor} /></Cylinder>
        <Cylinder args={[0.1, 0.1, 28]} position={[5, 10, -10]} rotation={[0.8, 0, 0]}><meshStandardMaterial color={cableColor} /></Cylinder>

        {/* Cặp Sau (Backstays): Nối ra đuôi cần (Z=20) */}
        {/* Vector: Y giảm 19, Z tăng 20. */}
        <Cylinder args={[0.1, 0.1, 28]} position={[-5, 10, 10]} rotation={[-0.8, 0, 0]}><meshStandardMaterial color={cableColor} /></Cylinder>
        <Cylinder args={[0.1, 0.1, 28]} position={[5, 10, 10]} rotation={[-0.8, 0, 0]}><meshStandardMaterial color={cableColor} /></Cylinder>


        {/* --- C. XE CON & SPREADER (TROLLEY) --- */}
        <group ref={trolleyRef} position={[0, -1, -20]}>
            {/* Xe con */}
            <Box args={[8, 1, 4]} position={[0, 0.5, 0]}><meshStandardMaterial color={yellowColor} /></Box>
            <Box args={[2, 2, 2]} position={[-3, -1, 0]}><meshStandardMaterial color="white" /></Box>

            {/* Dây cáp nâng hạ */}
            <group position={[0, -1, 0]}>
                <mesh ref={cableRef}>
                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </group>
        </group>
      </group>
      
      {/* --- D. SPREADER & CONTAINER (ĐỘNG) --- */}
      <TrolleyLoad parentRef={trolleyRef} cableRef={cableRef} />

    </group>
  );
};

// Component con để vẽ Spreader bám theo dây cáp
const TrolleyLoad = ({ parentRef, cableRef }: { parentRef: any, cableRef: any }) => {
    const groupRef = useRef<any>(null); // Dùng any để bypass lỗi type checking
    
    useFrame(() => {
        if (groupRef.current && parentRef.current && cableRef.current) {
            // Đồng bộ vị trí X, Z theo xe con
            groupRef.current.position.x = 0; 
            groupRef.current.position.z = parentRef.current.position.z;
            
            // Đồng bộ vị trí Y theo chiều dài dây cáp
            const cableLen = cableRef.current.scale.y;
            // 30 (độ cao cẩu) - 1 (xe con) - 1 (gốc dây) - cableLen
            groupRef.current.position.y = 28 - cableLen; 
        }
    });

    return (
        <group ref={groupRef}>
            {/* Khung Spreader */}
            <Box args={[3, 0.5, 8]} rotation={[0, Math.PI/2, 0]}><meshStandardMaterial color="#facc15" /></Box>
            
            {/* Container 40ft (Màu Cam) */}
            <group position={[0, -1.5, 0]} rotation={[0, Math.PI/2, 0]}>
                <Box args={[2.4, 2.6, 12]}><meshStandardMaterial color="#f97316" /></Box>
                <Box args={[2.2, 2.4, 0.1]} position={[0, 0, 6.01]}><meshStandardMaterial color="#333" /></Box>
                <Box args={[2.2, 2.4, 0.1]} position={[0, 0, -6.01]}><meshStandardMaterial color="#333" /></Box>
            </group>
        </group>
    );
};

// --- 2. CẨU KHUNG (RTG CRANE) - GIỮ NGUYÊN ---
export const RTGCrane: React.FC<{ position: [number, number, number], width?: number }> = ({ position, width = 22 }) => {
    const groupRef = useRef<THREE.Group>(null);
    const color = "#1d4ed8"; 
    
    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.4) * 15;
        }
    });

    return (
    <group ref={groupRef} position={position}>
      <group position={[0, 0, -width/2 + 1]}>
          <Box args={[8, 1, 1]} position={[0, 0.5, 0]}><meshStandardMaterial color="#333" /></Box> 
          <Box args={[1, 14, 1]} position={[-3, 7.5, 0]}><meshStandardMaterial color={color} /></Box>
          <Box args={[1, 14, 1]} position={[3, 7.5, 0]}><meshStandardMaterial color={color} /></Box>
          <Box args={[6, 1, 1]} position={[0, 13, 0]}><meshStandardMaterial color={color} /></Box>
      </group>

      <group position={[0, 0, width/2 - 1]}>
          <Box args={[8, 1, 1]} position={[0, 0.5, 0]}><meshStandardMaterial color="#333" /></Box>
          <Box args={[1, 14, 1]} position={[-3, 7.5, 0]}><meshStandardMaterial color={color} /></Box>
          <Box args={[1, 14, 1]} position={[3, 7.5, 0]}><meshStandardMaterial color={color} /></Box>
          <Box args={[6, 1, 1]} position={[0, 13, 0]}><meshStandardMaterial color={color} /></Box>
      </group>

      <Box args={[1.5, 1.5, width]} position={[-3, 14.5, 0]}><meshStandardMaterial color={color} /></Box>
      <Box args={[1.5, 1.5, width]} position={[3, 14.5, 0]}><meshStandardMaterial color={color} /></Box>
      
      <Box args={[3, 3, 4]} position={[3, 16, -width/2 + 3]}><meshStandardMaterial color="white" /></Box>

      <group position={[0, 14, 0]}>
        <Box args={[6, 1, 3]} position={[0, 0, 0]}><meshStandardMaterial color="#fbbf24" /></Box>
        <Cylinder args={[0.05, 0.05, 8]} position={[0, -4, -1]}><meshStandardMaterial color="#111" /></Cylinder>
        <Cylinder args={[0.05, 0.05, 8]} position={[0, -4, 1]}><meshStandardMaterial color="#111" /></Cylinder>
        
        <Box args={[6, 0.5, 2.5]} position={[0, -8, 0]} rotation={[0, Math.PI/2, 0]}><meshStandardMaterial color="#333" /></Box>
        <Box args={[2.4, 2.6, 6]} position={[0, -10, 0]} rotation={[0, Math.PI/2, 0]}><meshStandardMaterial color="#10b981" /></Box>
      </group>
    </group>
  );
};