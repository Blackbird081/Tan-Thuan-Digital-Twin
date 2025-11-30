import React from 'react';
import { SteelYardBlock } from './SteelYardBlock'; // Import component vẽ cuộn thép (đã tạo ở bước trước)

export const SteelYardSystem = ({ setTooltipData }: { setTooltipData: any }) => {
  // Định nghĩa các khu vực bãi thép (Tọa độ phía sau TT2)
  // TT2 nằm khoảng X = 300 đến 500
  const STEEL_ZONES = [
    { id: 'steel-1', label: 'BÃI TÔN 01', pos: [350, 0.2, 50], size: [60, 1, 80] },
    { id: 'steel-2', label: 'BÃI TÔN 02', pos: [420, 0.2, 50], size: [60, 1, 80] },
    { id: 'steel-3', label: 'KHO SẮT HÌNH', pos: [490, 0.2, 50], size: [60, 1, 80] },
    
    // Bãi phụ phía sau
    { id: 'steel-4', label: 'BÃI THÉP CÂY', pos: [420, 0.2, 140], size: [130, 1, 60] },
  ];

  return (
    <group>
      {STEEL_ZONES.map((zone) => (
        <SteelYardBlock 
          key={zone.id}
          position={zone.pos as [number, number, number]}
          size={zone.size as [number, number, number]}
          label={zone.label}
        />
      ))}
      
      {/* Có thể thêm xe nâng chuyên dụng hoặc xe tải chở tôn ở đây nếu cần */}
    </group>
  );
};