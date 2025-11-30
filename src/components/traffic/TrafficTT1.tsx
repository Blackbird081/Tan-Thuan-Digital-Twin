import React from 'react';
import Vehicle from '../equipment/Vehicle';
import ReachStacker  from '../equipment/ReachStacker';
import SideLift  from '../equipment/SideLift';

export const TrafficTT1 = () => {
  // --- CẤU HÌNH TỌA ĐỘ ---
  const GATE_IN_X = -105;
  const GATE_OUT_X = 115;
  
  const SPAWN_Z = 400;      // Điểm xuất phát xa
  const DESPAWN_Z = 400;    // Điểm kết thúc xa
  
  const ROAD_GATE_Z = 85;   // Đường ngang cổng
  const ROAD_WHARF_Z = -90; // Đường cầu tàu
  
  // Các đường xương cá vào Block
  const CROSS_1 = -45;
  const CROSS_2 = -15;
  const CROSS_3 = 15;

  return (
    <group>
      {/* ================================================================================== */}
      {/* LUỒNG 1: XE NHẬP (CÓ HÀNG) - TỪ CỔNG VÀO -> HẠ BÃI -> RA CỔNG */}
      {/* ================================================================================== */}

      {/* Xe 1: Vào Block C (Màu Đỏ) */}
      <Vehicle 
        speed={14} delay={0} cargoType="container" color="#ef4444"
        path={[
          [GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], 
          [-35, 0, ROAD_GATE_Z], [-35, 0, CROSS_1], [-35, 0, -30], // Vào bãi
          [-35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]
        ]}
      />

      {/* Xe 2: Vào Block F (Màu Xanh Lá) */}
      <Vehicle 
        speed={12} delay={5} cargoType="container" color="#10b981"
        path={[
          [GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], 
          [35, 0, ROAD_GATE_Z], [35, 0, CROSS_1], [35, 0, -30], 
          [35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]
        ]}
      />

      {/* Xe 3: Vào Block B (Màu Xanh Dương) */}
      <Vehicle 
        speed={13} delay={10} cargoType="container" color="#3b82f6"
        path={[
          [GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], 
          [-35, 0, ROAD_GATE_Z], [-35, 0, CROSS_2], [-35, 0, 0], 
          [-35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]
        ]}
      />

      {/* Xe 4: Vào Block E (Màu Vàng) */}
      <Vehicle 
        speed={11} delay={15} cargoType="container" color="#f59e0b"
        path={[
          [GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], 
          [35, 0, ROAD_GATE_Z], [35, 0, CROSS_2], [35, 0, 0], 
          [35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]
        ]}
      />

      {/* Xe 5: Vào Block D (Màu Cam) */}
      <Vehicle 
        speed={14} delay={20} cargoType="container" color="#f97316"
        path={[
          [GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], 
          [35, 0, ROAD_GATE_Z], [35, 0, CROSS_3], [35, 0, 30], 
          [35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]
        ]}
      />

      {/* Xe 6: Vào Block A (Màu Tím) */}
      <Vehicle 
        speed={12} delay={25} cargoType="container" color="#8b5cf6"
        path={[
          [GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], 
          [-35, 0, ROAD_GATE_Z], [-35, 0, CROSS_3], [-35, 0, 30], 
          [-35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]
        ]}
      />

      {/* ================================================================================== */}
      {/* LUỒNG 2: XE XUẤT (RỖNG) - TỪ CỔNG VÀO -> LẤY HÀNG -> RA CỔNG */}
      {/* ================================================================================== */}

      {/* Xe 7: Lấy hàng Block C (Màu Trắng) */}
      <Vehicle 
        speed={15} delay={2} cargoType="none" color="#ffffff"
        path={[
          [GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], 
          [-35, 0, ROAD_GATE_Z], [-35, 0, CROSS_1], [-35, 0, -30], 
          [-35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]
        ]}
      />

      {/* Xe 8: Lấy hàng Block F (Màu Xám) */}
      <Vehicle 
        speed={13} delay={7} cargoType="none" color="#9ca3af"
        path={[
          [GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], 
          [35, 0, ROAD_GATE_Z], [35, 0, CROSS_1], [35, 0, -30], 
          [35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]
        ]}
      />

      {/* Xe 9, 10, 11, 12: Các xe rỗng khác chạy xen kẽ */}
      <Vehicle speed={14} delay={12} cargoType="none" color="#ffffff" path={[[GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], [-35, 0, ROAD_GATE_Z], [-35, 0, 0], [-35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]]} />
      <Vehicle speed={12} delay={17} cargoType="none" color="#9ca3af" path={[[GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], [35, 0, ROAD_GATE_Z], [35, 0, 0], [35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]]} />
      <Vehicle speed={13} delay={22} cargoType="none" color="#ffffff" path={[[GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], [-35, 0, ROAD_GATE_Z], [-35, 0, 30], [-35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]]} />
      <Vehicle speed={11} delay={27} cargoType="none" color="#9ca3af" path={[[GATE_IN_X, 0, SPAWN_Z], [GATE_IN_X, 0, ROAD_GATE_Z], [35, 0, ROAD_GATE_Z], [35, 0, 30], [35, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, ROAD_GATE_Z], [GATE_OUT_X, 0, DESPAWN_Z]]} />


      {/* ================================================================================== */}
      {/* LUỒNG 3: XE NỘI BỘ (ITV) - CHẠY GIỮA TÀU VÀ BÃI */}
      {/* ================================================================================== */}

      {/* Xe 13: Tàu -> Block C */}
      <Vehicle 
        speed={10} delay={0} cargoType="container" color="#ef4444"
        path={[[-20, 0, ROAD_WHARF_Z], [-35, 0, ROAD_WHARF_Z], [-35, 0, -30], [-35, 0, ROAD_WHARF_Z], [-20, 0, ROAD_WHARF_Z]]}
      />
      
      {/* Xe 14: Tàu -> Block F */}
      <Vehicle 
        speed={11} delay={3} cargoType="container" color="#3b82f6"
        path={[[20, 0, ROAD_WHARF_Z], [35, 0, ROAD_WHARF_Z], [35, 0, -30], [35, 0, ROAD_WHARF_Z], [20, 0, ROAD_WHARF_Z]]}
      />

      {/* Xe 15: Tàu MSC (Trái) -> Block G */}
      <Vehicle 
        speed={12} delay={1} cargoType="container" color="#10b981"
        path={[[-180, 0, ROAD_WHARF_Z], [-35, 0, ROAD_WHARF_Z], [-35, 0, -65], [-35, 0, ROAD_WHARF_Z], [-180, 0, ROAD_WHARF_Z]]}
      />

      {/* Xe 16: Tàu Maersk (Phải) -> Block H */}
      <Vehicle 
        speed={10} delay={4} cargoType="container" color="#f59e0b"
        path={[[180, 0, ROAD_WHARF_Z], [35, 0, ROAD_WHARF_Z], [35, 0, -65], [35, 0, ROAD_WHARF_Z], [180, 0, ROAD_WHARF_Z]]}
      />

      {/* Xe 17, 18, 19, 20: Chạy dọc cầu tàu (Transfer) */}
      <Vehicle speed={15} delay={2} cargoType="container" color="#8b5cf6" path={[[-100, 0, ROAD_WHARF_Z+2], [100, 0, ROAD_WHARF_Z+2], [100, 0, ROAD_WHARF_Z+4], [-100, 0, ROAD_WHARF_Z+4]]} />
      <Vehicle speed={14} delay={6} cargoType="none" color="#ffffff" path={[[150, 0, ROAD_WHARF_Z+2], [-50, 0, ROAD_WHARF_Z+2], [-50, 0, ROAD_WHARF_Z+4], [150, 0, ROAD_WHARF_Z+4]]} />
      <Vehicle speed={13} delay={10} cargoType="container" color="#f97316" path={[[-200, 0, ROAD_WHARF_Z], [-50, 0, ROAD_WHARF_Z], [-50, 0, ROAD_WHARF_Z+2], [-200, 0, ROAD_WHARF_Z+2]]} />
      <Vehicle speed={16} delay={14} cargoType="none" color="#9ca3af" path={[[200, 0, ROAD_WHARF_Z], [50, 0, ROAD_WHARF_Z], [50, 0, ROAD_WHARF_Z+2], [200, 0, ROAD_WHARF_Z+2]]} />


      {/* --- THIẾT BỊ NÂNG HẠ --- */}
      <ReachStacker speed={5} delay={0} path={[[-25, 0, 0], [-25, 0, 8], [-45, 0, 8], [-45, 0, 0], [-25, 0, 0]]} />
      
      {/* Side Lift 1: Khu vực Rửa Cont */}
      <SideLift position={[-150, 0, 40]} rotation={[0, Math.PI, 0]} moving={true} />

      {/* Side Lift 2: Block K */}
      <SideLift position={[-105, 0, 45]} rotation={[0, Math.PI, 0]} moving={true} />
      {/* Side Lift 3: Block A */}
      <SideLift position={[-35, 0, 45]} rotation={[0, Math.PI, 0]} moving={true} />

    </group>
  );
};