import React from 'react';
import { Box } from '@react-three/drei';

export const PerimeterWalls = () => {
  const wallHeight = 3;
  const wallColor = "#94a3b8"; 
  const wallThickness = 1;
  const Z_WALL = 110; // Mặt tiền cổng

  // BIÊN GIỚI HẠN
  const LEFT_LIMIT = -550; // Bao trùm K12C1 (K12C1 kết thúc khoảng -500)
  const RIGHT_LIMIT = 600; // Bao trùm Kho TT2

  return (
    <group>
      {/* 1. TƯỜNG TRÁI (Bên hông K12C1) */}
      {/* Cắt ngắn lại: Chỉ chạy từ Cổng (Z=110) vào đến mép bãi (Z=-100) */}
      <Box args={[wallThickness, wallHeight, 210]} position={[LEFT_LIMIT, wallHeight/2, 5]}>
        <meshStandardMaterial color={wallColor} />
      </Box>

      {/* 2. TƯỜNG PHẢI (Bên hông TT2) */}
      <Box args={[wallThickness, wallHeight, 210]} position={[RIGHT_LIMIT, wallHeight/2, 5]}>
        <meshStandardMaterial color={wallColor} />
      </Box>

      {/* 3. TƯỜNG MẶT TIỀN (Z = 110) - CHỪA LỖ CỔNG */}
      
      {/* Đoạn 1: Từ góc trái (-550) đến Cổng Vào TT1 (-120) */}
      {/* Center: (-550 + -120)/2 = -335. Length: 430 */}
      <Box args={[430, wallHeight, wallThickness]} position={[-335, wallHeight/2, Z_WALL]}>
         <meshStandardMaterial color={wallColor} />
      </Box>
      
      {/* Đoạn 2: Giữa Cổng Vào (-90) và Cổng Ra TT1 (100) */}
      {/* Center: (-90 + 100)/2 = 5. Length: 190 */}
      <Box args={[190, wallHeight, wallThickness]} position={[5, wallHeight/2, Z_WALL]}>
         <meshStandardMaterial color={wallColor} />
      </Box>

      {/* Đoạn 3: Từ Cổng Ra TT1 (130) đến Cổng TT2 (375) */}
      {/* Center: (130 + 375)/2 = 252.5. Length: 245 */}
      <Box args={[245, wallHeight, wallThickness]} position={[252.5, wallHeight/2, Z_WALL]}>
         <meshStandardMaterial color={wallColor} />
      </Box>

      {/* Đoạn 4: Từ Cổng TT2 (425) đến hết bên phải (600) */}
      {/* Center: (425 + 600)/2 = 512.5. Length: 175 */}
      <Box args={[175, wallHeight, wallThickness]} position={[512.5, wallHeight/2, Z_WALL]}>
         <meshStandardMaterial color={wallColor} />
      </Box>

    </group>
  );
};
export default PerimeterWalls;