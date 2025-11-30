import React from 'react';
import { ZONES } from '../../constants/yardData';
import { YardBlock } from './YardBlock';
import Gate from './Gate';
import { RTGCrane } from '../equipment/Cranes';

export const TanThuan1System = ({ setTooltipData }: { setTooltipData: any }) => {
  const BLOCK_CENTER_LEFT = -35;
  const BLOCK_CENTER_RIGHT = 35;
  const filteredZones = ZONES.filter(z => z.id !== 'road-wharf');

  // MÀU ĐƯỜNG THỐNG NHẤT
  const ROAD_COLOR = "#334155"; // MÀU CHUẨN (Xám đen)

  return (
    <group>
      {/* 1. Blocks & Roads */}
      {filteredZones.map((zone) => (
        <YardBlock key={zone.id} data={zone as any} onHover={setTooltipData} />
      ))}

      {/* 2. Đường Cầu Tàu TT1 */}
      {/* Nâng Y lên 0.1 để tránh Z-fighting với nền */}
      <mesh position={[-50, 0.1, -90]} receiveShadow>
         <boxGeometry args={[650, 0.1, 15]} />
         <meshStandardMaterial color={ROAD_COLOR} />
      </mesh>

      {/* 3. CỔNG & ĐƯỜNG DẪN */}
      
      {/* Cổng Vào */}
      <Gate position={[-105, 0, 110]} type="IN" laneCount={4} width={30} color="#0ea5e9" />
      
      {/* ĐƯỜNG DẪN VÀO (SỬA MÀU TẠI ĐÂY) */}
      <mesh position={[-105, 0.1, 85]} receiveShadow>
         <boxGeometry args={[30, 0.1, 60]} /> 
         <meshStandardMaterial color={ROAD_COLOR} /> {/* Đã sửa thành ROAD_COLOR */}
      </mesh>

      {/* Cổng Ra */}
      <Gate position={[115, 0, 110]} type="OUT" laneCount={4} width={30} color="#f97316" />
      
      {/* ĐƯỜNG DẪN RA (SỬA MÀU TẠI ĐÂY) */}
      <mesh position={[115, 0.1, 85]} receiveShadow>
         <boxGeometry args={[30, 0.1, 60]} /> 
         <meshStandardMaterial color={ROAD_COLOR} /> {/* Đã sửa thành ROAD_COLOR */}
      </mesh>

      {/* 4. RTG Cranes */}
      <RTGCrane position={[BLOCK_CENTER_LEFT, 0, -30]} width={22} />
      <RTGCrane position={[BLOCK_CENTER_RIGHT, 0, -30]} width={22} />
      <RTGCrane position={[BLOCK_CENTER_RIGHT, 0, 0]} width={22} />
      <RTGCrane position={[BLOCK_CENTER_RIGHT, 0, 30]} width={22} />
    </group>
  );
};
export default TanThuan1System;