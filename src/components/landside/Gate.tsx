import React from 'react';
import { Box, Text, Cylinder } from '@react-three/drei';

interface GateProps {
  position: [number, number, number];
  laneCount: number; // Số làn xe
  type: 'IN' | 'OUT' | 'COMBINED'; // Loại cổng
  color?: string; // Màu chủ đạo
  width?: number;
}

const Gate: React.FC<GateProps> = ({ position, laneCount, type, color = "#0ea5e9", width = 40 }) => {
  const laneWidth = width / laneCount;
  const pillarColor = "#cbd5e1"; 
  const barrierColor = "#ef4444"; 
  const boothColor = "#f1f5f9"; 

  // Xác định text hiển thị
  const headerText = "TAN THUAN PORT";
  let subText = "";
  if (type === 'IN') subText = "GATE IN";
  else if (type === 'OUT') subText = "GATE OUT";
  else subText = "GATE IN  -  GATE OUT";

  return (
    <group position={position}>
      {/* --- MÁI CHE (CANOPY) --- */}
      <group position={[0, 6, 0]}>
        {/* Bảng hiệu chính (Header) - Cao hơn */}
        <Box args={[width + 4, 1.5, 1]} position={[0, 2.5, 6]}>
            <meshStandardMaterial color="#1e3a8a" /> {/* Màu xanh đậm */}
        </Box>
        <Text position={[0, 2.5, 6.6]} fontSize={0.8} color="white" fontWeight="bold">
            {headerText}
        </Text>

        {/* Mái chính */}
        <Box args={[width + 2, 2.5, 12]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} />
        </Box>
        <Box args={[width + 4, 0.5, 14]} position={[0, 1.3, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        
        {/* Dòng chữ Gate In/Out */}
        <Text position={[0, 0, 6.1]} fontSize={1.2} color="white" fontWeight="bold">
          {subText}
        </Text>
        
        {/* Mặt sau (Welcome / Safe Trip) */}
        {type !== 'COMBINED' ? (
            <Text position={[0, 0, -6.1]} rotation={[0, Math.PI, 0]} fontSize={1.2} color="white" fontWeight="bold">
            {type === 'IN' ? 'WELCOME TO TAN THUAN' : 'HAVE A SAFE TRIP'}
            </Text>
        ) : (
            <group>
                <Text position={[width/4, 0, -6.1]} rotation={[0, Math.PI, 0]} fontSize={0.8} color="white" fontWeight="bold">
                    HAVE A SAFE TRIP
                </Text>
                <Text position={[-width/4, 0, -6.1]} rotation={[0, Math.PI, 0]} fontSize={0.8} color="white" fontWeight="bold">
                    WELCOME TO TAN THUAN
                </Text>
            </group>
        )}
      </group>

      {/* --- LÀN XE & DẢI PHÂN CÁCH --- */}
      {Array.from({ length: laneCount }).map((_, i) => {
        // Tính toán vị trí làn
        const xPos = -width / 2 + i * laneWidth + laneWidth / 2;
        
        // Xử lý dải phân cách giữa cho cổng COMBINED (TT2)
        // Nếu là cổng Combined 6 làn, thì giữa làn 2 và 3 (index 2 và 3) là dải phân cách lớn
        const isMiddleSplit = type === 'COMBINED' && i === laneCount / 2;
        
        return (
          <group key={i} position={[xPos - laneWidth/2, 0, 0]}>
            {/* Trụ cổng (Pillar) */}
            <Box args={[0.8, 6, 0.8]} position={[0, 3, 0]}>
              <meshStandardMaterial color={pillarColor} />
            </Box>
            
            {/* Dải phân cách (Island) */}
            {/* Nếu là dải phân cách giữa của TT2 thì làm to ra */}
            <Box 
                args={[isMiddleSplit ? 2 : 1, 0.4, 10]} 
                position={[isMiddleSplit ? -laneWidth/2 : 0, 0.2, 0]}
            >
               <meshStandardMaterial color="#333" />
               {/* Vạch vàng cảnh báo */}
               <Box args={[isMiddleSplit ? 2.1 : 1.1, 0.45, 0.5]} position={[0, 0, 4.8]}><meshStandardMaterial color="#fbbf24" /></Box>
               <Box args={[isMiddleSplit ? 2.1 : 1.1, 0.45, 0.5]} position={[0, 0, -4.8]}><meshStandardMaterial color="#fbbf24" /></Box>
            </Box>

            {/* Cabin bảo vệ (Booth) */}
            <Box args={[1, 2.5, 2]} position={[0, 1.45, 1.5]}>
              <meshStandardMaterial color={boothColor} />
            </Box>
            <Box args={[1.05, 1, 1.5]} position={[0, 2, 1.5]}>
              <meshStandardMaterial color="#94a3b8" transparent opacity={0.6} />
            </Box>

            {/* Barrier (Thanh chắn) */}
            <group position={[0.5, 1.2, -2]}>
                 <Box args={[0.4, 1.2, 0.4]} position={[0, 0, 0]}><meshStandardMaterial color="#fbbf24" /></Box>
                 <group position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 6]}> 
                    <Cylinder args={[0.05, 0.05, laneWidth - 1.5]} position={[(laneWidth - 1.5)/2, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                        <meshStandardMaterial color={barrierColor} />
                    </Cylinder>
                 </group>
            </group>
            
            {/* Số làn xe */}
            <Text position={[laneWidth/2, 0.1, 6]} rotation={[-Math.PI/2, 0, 0]} fontSize={1.5} color="white">
                {i + 1}
            </Text>
          </group>
        );
      })}
      
      {/* Trụ cuối cùng bên phải */}
      <Box args={[0.8, 6, 0.8]} position={[width/2, 3, 0]}><meshStandardMaterial color={pillarColor} /></Box>

    </group>
  );
};

export default Gate;