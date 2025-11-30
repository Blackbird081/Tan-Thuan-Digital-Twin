import React from 'react';
import Vehicle from '../equipment/Vehicle';

export const TrafficTT2 = () => {
  // TỌA ĐỘ CHUẨN TT2
  const CENTER_X = 400; 
  const LANE_EXIT = CENTER_X - 12;  // Làn ra (Sát lề trái đường 50m)
  const LANE_ENTRY = CENTER_X + 12; // Làn vào (Sát lề phải)
  
  const WHARF_Z = -90;   // Đường cầu tàu
  const TURN_POINT_Z = -70; // Điểm neo để ép xe cua vuông góc (Quan trọng)
  const GATE_Z = 110;    
  const OUTSIDE_Z = 250; 

  return (
    <group>
      {/* ========================================================= */}
      {/* TỐP 1: TỪ TRÁI (BÃI A) -> RA CỔNG (Delay 0 - 3s) */}
      {/* ========================================================= */}

      {/* Xe 1 */}
      <Vehicle 
        speed={10} delay={0} color="#f59e0b" cargoType="coil"
        path={[
          [300, 0, WHARF_Z],       // 1. Xuất phát
          [LANE_EXIT, 0, WHARF_Z], // 2. Đến ngã tư
          [LANE_EXIT, 0, TURN_POINT_Z], // 3. Điểm neo: Ép xe đi thẳng qua ngã tư mới được rẽ
          [LANE_EXIT, 0, GATE_Z],  // 4. Ra cổng
          [LANE_EXIT, 0, OUTSIDE_Z]
        ]}
      />

      {/* Xe 2 */}
      <Vehicle 
        speed={11} delay={3} color="#ef4444" cargoType="none"
        path={[
          [340, 0, WHARF_Z],
          [LANE_EXIT, 0, WHARF_Z],
          [LANE_EXIT, 0, TURN_POINT_Z], // Neo
          [LANE_EXIT, 0, GATE_Z],
          [LANE_EXIT, 0, OUTSIDE_Z]
        ]}
      />

      {/* ========================================================= */}
      {/* TỐP 2: TỪ PHẢI (BÃI B) -> RA CỔNG (Delay 15 - 18s) */}
      {/* ========================================================= */}

      {/* Xe 3 */}
      <Vehicle 
        speed={10} delay={15} color="#3b82f6" cargoType="coil"
        path={[
          [500, 0, WHARF_Z],       // Xuất phát từ phải
          [LANE_EXIT, 0, WHARF_Z], // Chạy về làn ra
          [LANE_EXIT, 0, TURN_POINT_Z], // Neo vuông góc
          [LANE_EXIT, 0, GATE_Z],
          [LANE_EXIT, 0, OUTSIDE_Z]
        ]}
      />

      {/* Xe 4 */}
      <Vehicle 
        speed={12} delay={18} color="#d97706" cargoType="coil"
        path={[
          [460, 0, WHARF_Z],
          [LANE_EXIT, 0, WHARF_Z],
          [LANE_EXIT, 0, TURN_POINT_Z],
          [LANE_EXIT, 0, GATE_Z],
          [LANE_EXIT, 0, OUTSIDE_Z]
        ]}
      />

      {/* ========================================================= */}
      {/* TỐP 3: XE NHẬP (TỪ CỔNG -> CẦU TÀU) (Delay 30 - 33s) */}
      {/* ========================================================= */}
      
      {/* Xe 5 */}
      <Vehicle 
        speed={12} delay={30} color="#64748b" cargoType="none"
        path={[
          [LANE_ENTRY, 0, OUTSIDE_Z], 
          [LANE_ENTRY, 0, TURN_POINT_Z], // Chạy thẳng vào sâu mới được rẽ
          [LANE_ENTRY, 0, WHARF_Z],   
          [520, 0, WHARF_Z],          // Rẽ phải ra bãi xa
          [520, 0, WHARF_Z + 2],      // Quay đầu
          [LANE_ENTRY, 0, WHARF_Z + 2],
          [LANE_ENTRY, 0, OUTSIDE_Z]
        ]}
      />

      {/* Xe 6 */}
      <Vehicle 
        speed={10} delay={33} color="#8b5cf6" cargoType="none"
        path={[
          [LANE_ENTRY, 0, OUTSIDE_Z], 
          [LANE_ENTRY, 0, TURN_POINT_Z], 
          [LANE_ENTRY, 0, WHARF_Z],   
          [320, 0, WHARF_Z],          // Rẽ trái ra bãi A
          [320, 0, WHARF_Z + 2],      
          [LANE_ENTRY, 0, WHARF_Z + 2],
          [LANE_ENTRY, 0, OUTSIDE_Z]
        ]}
      />
      {/* Xe 7: Vào lấy hàng */}
      <Vehicle 
        speed={12} delay={2} color="#64748b" cargoType="none"
        path={[
          [LANE_ENTRY, 0, OUTSIDE_Z], // Từ ngoài vào
          [LANE_ENTRY, 0, WHARF_Z],   // Chạy thẳng xuống cầu tàu
          [520, 0, WHARF_Z],          // Rẽ phải ra bãi xa
          [520, 0, WHARF_Z + 2],      // Quay đầu
          [LANE_ENTRY, 0, WHARF_Z + 2],
          [LANE_ENTRY, 0, OUTSIDE_Z]
        ]}
      />
    {/* Xe 8: Vào lấy hàng */}
      <Vehicle 
        speed={12} delay={2} color="#848b64ff" cargoType="none"
        path={[
          [LANE_ENTRY, 0, OUTSIDE_Z], // Từ ngoài vào
          [LANE_ENTRY, 0, WHARF_Z],   // Chạy thẳng xuống cầu tàu
          [520, 0, WHARF_Z],          // Rẽ phải ra bãi xa
          [520, 0, WHARF_Z + 2],      // Quay đầu
          [LANE_ENTRY, 0, WHARF_Z + 2],
          [LANE_ENTRY, 0, OUTSIDE_Z]
        ]}
      />


    </group>
  );
};