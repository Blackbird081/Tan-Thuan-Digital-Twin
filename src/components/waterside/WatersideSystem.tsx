import React, { useMemo } from 'react';
import { BERTH_CLUSTER, BERTH_TT2, BERTH_K12C, BERTH_K12C1, PORT_CONFIG } from '../../constants/berthData';
import { Water } from './Water';
import Ship from './Ship';
import { QCCrane } from '../equipment/Cranes';
import { BerthBlock } from './BerthBlock';
import { Bollard } from './Bollard';
import { BollardData } from '../../types';
import GeneralCargoShip from './GeneralCargoShip'; // Import mới
import { LiebherrCrane } from '../equipment/LiebherrCrane'; // <--- Import Cẩu mới

export const WatersideSystem = ({ setTooltipData }: { setTooltipData: any }) => {
  
  // Logic tính toán layout cầu bến (Center-out)
  // Lấy Cụm K12 (K12A-K12-K12B) làm trung tâm (X=0) để khớp với bãi container
  const layout = useMemo(() => {
    const items = [];

    // 1. Cụm Trung tâm (K12A - K12 - K12B)
    // Đặt giữa màn hình: StartX = -Length / 2
    const clusterStartX = -BERTH_CLUSTER.length / 2;
    items.push({ ...BERTH_CLUSTER, startX: clusterStartX });

    // 2. Bên Phải: TT2 (Tách biệt bởi khoảng nước 40m)
    // StartX = (Cluster End) + Gap
    const tt2StartX = (clusterStartX + BERTH_CLUSTER.length) + PORT_CONFIG.gap_K12B_TT2;
    items.push({ ...BERTH_TT2, startX: tt2StartX });

    // 3. Bên Trái: K12C (Tách biệt bởi khoảng nước 60m)
    // EndX = (Cluster Start) - Gap
    // StartX = EndX - Length
    const k12cEndX = clusterStartX - PORT_CONFIG.gap_K12C_K12A;
    const k12cStartX = k12cEndX - BERTH_K12C.length;
    items.push({ ...BERTH_K12C, startX: k12cStartX });

    // 4. Bên Trái cùng: K12C1 (Nối tiếp K12C)
    const k12c1StartX = k12cStartX - BERTH_K12C1.length;
    items.push({ ...BERTH_K12C1, startX: k12c1StartX });

    return items;
  }, []);

  return (
    <group>
      <Water />

      {/* Render Cầu bến & Bích neo */}
      {layout.map((berth) => (
        <group key={berth.id}>
          <BerthBlock 
            position={[berth.startX || 0, 0, 0]} 
            length={berth.length} 
            name={berth.name}
            subSections={berth.subSections}
            onHover={setTooltipData}
          />
          {berth.bollards?.map((b: BollardData) => (
            <Bollard 
              key={b.id}
              // Vị trí bích = StartX của bến + Số mét của bích
              position={[(berth.startX || 0) + b.meter, PORT_CONFIG.berthHeight, -2]}
              id={b.id}
              meter={b.meter}
              zone={berth.name}
              onHover={setTooltipData}
            />
          ))}
        </group>
      ))}

      {/* --- TÀU BÈ & CẨU BỜ --- */}
      
      {/* 1. Tàu EVER GIANT (Đậu tại K12 - Giữa - X=0) */}
      <Ship position={[0, -2.5, -30]} name="EVER GIANT" hullColor="#7f1d1d" />
      <QCCrane position={[-25, 0, 10]} />
      <QCCrane position={[20, 0, 10]} />

      {/* 2. Tàu MSC ARIANE (ĐÃ DỜI TỪ K12C SANG K12B) */}
      {/* Vị trí cũ: -350. Vị trí mới: 200 (Nằm giữa tàu trung tâm và tàu thép) */}
      <Ship position={[200, -2.5, -30]} name="MSC ARIANE" hullColor="#1a202c" />
      
      {/* Dời 2 cẩu QC đi theo tàu */}
      <QCCrane position={[180, 0, 10]} />
      <QCCrane position={[220, 0, 10]} />

      {/* 3. Tàu STEEL DRAGON (Đậu tại TT2 - X=400) */}
      <GeneralCargoShip position={[400, -2.5, -30]} name="STEEL DRAGON" />
      <LiebherrCrane position={[360, 0, 15]} rotation={[0, -0.5, 0]} />
      <LiebherrCrane position={[440, 0, 15]} rotation={[0, 0.5, 0]} />
      
      {/* 4. Tàu hàng rời (General Cargo Ship) tại K12C1 - Bên trái cùng */}
      {/* K12C1 bắt đầu khoảng X = -500. Đặt tàu ở đó */}
      <GeneralCargoShip position={[-500, -2.5, -30]} name="STEEL QUEEN" />
    </group>
  );
};