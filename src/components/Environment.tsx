import React from 'react';
import { OrbitControls, Sky } from '@react-three/drei';

const Environment: React.FC = () => {
  return (
    <>
      
      {/* Bầu trời & Ánh sáng */}
      <Sky sunPosition={[100, 50, 100]} turbidity={0.5} rayleigh={0.5} />
      
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[50, 200, 100]} 
        intensity={1.8} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001} // Giúp bóng đổ mượt hơn, giảm lỗi sọc bóng
      />
      
      {/* --- LAND BASE (Hậu phương) --- */}
      {/* Màu nền bê tông xám xanh (Cool Grey) - Sạch và Hiện đại */}
      <mesh position={[0, -2.05, 100]} receiveShadow>
        <boxGeometry args={[1800, 4, 600]} />
        <meshStandardMaterial 
          color="#94a3b8"  // Slate-400: Màu bê tông tiêu chuẩn
          roughness={0.8} 
          metalness={0.1} 
        /> 
      </mesh>

      {/* --- QUAY WALL FACE (Mặt đứng cầu tàu) --- */}
      <mesh position={[0, -2.05, -105.1]} rotation={[0, 0, 0]}>
         <planeGeometry args={[1800, 4]} />
         <meshStandardMaterial color="#64748b" /> {/* Màu tối hơn chút */}
      </mesh>
      
      {/* ĐÃ XÓA BỎ <Grid /> ĐỂ HẾT NHẤP NHÁY */}
    </>
  );
};

export default Environment;