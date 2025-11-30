import React from 'react';
import { SteelYardBlock } from './SteelYardBlock';
import Gate from './Gate';
import { Box, Text } from '@react-three/drei';
import { Forklift } from '../equipment/Forklift';

export const TanThuan2System = ({ setTooltipData }: { setTooltipData: any }) => {
  const TT2_CENTER_X = 400;
  const YARD_OFFSET = 70;
  const FORKLIFT_OFFSET = 30; 

  return (
    <group>
      {/* ... (Giữ nguyên Tường, Đường, Cổng, Kho, Văn phòng) ... */}
      <group position={[280, 2, 10]}><Box args={[1, 4, 180]}><meshStandardMaterial color="#64748b" /></Box></group>
      {/* Đường Cầu Tàu - Nâng Y=0.1 */}
      <mesh position={[TT2_CENTER_X, 0.1, -90]} receiveShadow>
          <boxGeometry args={[220, 0.1, 15]} />
          <meshStandardMaterial color="#334155" />
      </mesh>
      
      {/* Đường Trục Chính - Nâng Y=0.1 */}
      <mesh position={[TT2_CENTER_X, 0.1, 10]} receiveShadow>
         <boxGeometry args={[50, 0.1, 200]} /> 
         <meshStandardMaterial color="#334155" />
      </mesh>
      <Gate position={[TT2_CENTER_X, 0, 110]} type="COMBINED" laneCount={6} width={50} color="#0f766e" />
      
      <group position={[TT2_CENTER_X + 130, 0, 90]}> 
          <Box args={[20, 8, 15]} position={[0, 4, 0]}><meshStandardMaterial color="#1e293b" /></Box>
          <Text position={[0, 9, 0]} fontSize={1.5} color="white">OFFICE TT2</Text>
      </group>
      <group position={[TT2_CENTER_X + 130, 0, 0]}>
          <Box args={[60, 12, 100]} position={[0, 6, 0]}><meshStandardMaterial color="#cbd5e1" /></Box>
          <Text position={[0, 14, 0]} rotation={[-Math.PI/2, 0, 0]} fontSize={5} color="#333">KHO THÉP</Text>
      </group>
      
      {/* BÃI HÀNG */}
      <SteelYardBlock position={[TT2_CENTER_X - YARD_OFFSET, 0.2, 0]} size={[60, 1, 120]} label="BÃI TÔN NHẬP A" cargoType="coil" />
      <SteelYardBlock position={[TT2_CENTER_X + YARD_OFFSET, 0.2, -20]} size={[50, 1, 80]} label="BÃI SẮT TẤM B" cargoType="plate" />
      <SteelYardBlock position={[TT2_CENTER_X + YARD_OFFSET, 0.2, 50]} size={[50, 1, 60]} label="BÃI SẮT THANH C" cargoType="bar" />

      {/* --- XE XÚC (ĐÃ SỬA GÓC XOAY CHUẨN) --- */}
      
      {/* NHÓM TRÁI (Phục vụ Bãi A): Xoay -90 độ để mặt hướng sang Trái */}
      <Forklift position={[TT2_CENTER_X - FORKLIFT_OFFSET, 0, -40]} rotation={[0, -Math.PI/2, 0]} moving={true} />
      <Forklift position={[TT2_CENTER_X - FORKLIFT_OFFSET, 0, 0]} rotation={[0, -Math.PI/2, 0]} moving={true} />
      <Forklift position={[TT2_CENTER_X - FORKLIFT_OFFSET, 0, 40]} rotation={[0, -Math.PI/2, 0]} moving={true} />

      {/* NHÓM PHẢI (Phục vụ Bãi B & C): Xoay +90 độ để mặt hướng sang Phải */}
      <Forklift position={[TT2_CENTER_X + FORKLIFT_OFFSET, 0, -30]} rotation={[0, Math.PI/2, 0]} moving={true} />
      <Forklift position={[TT2_CENTER_X + FORKLIFT_OFFSET, 0, 10]} rotation={[0, Math.PI/2, 0]} moving={true} />
      <Forklift position={[TT2_CENTER_X + FORKLIFT_OFFSET, 0, 50]} rotation={[0, Math.PI/2, 0]} moving={true} />

    </group>
  );
};