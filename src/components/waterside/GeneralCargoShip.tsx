import React from 'react';
import { Box, Cylinder } from '@react-three/drei';

// --- COMPONENT CẨU TÀU CHI TIẾT (SHIP CRANE) ---
const ShipCrane = ({ position, rotationY }: { position: [number, number, number], rotationY: number }) => {
  const craneColor = "#facc15"; // Vàng tươi
  const baseColor = "#1f2937";  // Đen xám
  const boomAngle = -Math.PI / 4; // Góc nâng cần (45 độ)

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. CHÂN ĐẾ (PEDESTAL) */}
      <Cylinder args={[1.8, 2, 6]} position={[0, 3, 0]}>
        <meshStandardMaterial color={baseColor} />
      </Cylinder>

      {/* 2. THÂN CẨU & CABIN (TURRET) */}
      <group position={[0, 6, 0]}>
        {/* Trục quay */}
        <Cylinder args={[1.8, 1.8, 2]} position={[0, 1, 0]}>
            <meshStandardMaterial color={craneColor} />
        </Cylinder>
        
        {/* Buồng máy phía sau */}
        <Box args={[3.5, 3, 4]} position={[0, 2, -1.5]}>
            <meshStandardMaterial color={craneColor} />
        </Box>

        {/* Cabin lái (Nhô ra bên cạnh) */}
        <group position={[1.5, 2, 1]}>
            <Box args={[1.5, 2.5, 2]}><meshStandardMaterial color={craneColor} /></Box>
            <Box args={[1.6, 1.5, 1.8]} position={[0, 0.2, 0]}><meshStandardMaterial color="#bfdbfe" /></Box> {/* Kính */}
        </group>

        {/* 3. CẦN CẨU (BOOM) - Dạng hộp đặc */}
        <group position={[0, 2.5, 1.5]} rotation={[boomAngle, 0, 0]}>
            {/* Khớp nối gốc */}
            <Cylinder args={[1, 1, 3]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color="#333" /></Cylinder>
            
            {/* Cần chính (Main Boom) */}
            <Box args={[1.2, 1.2, 25]} position={[0, 0, 12]}>
                <meshStandardMaterial color={craneColor} />
            </Box>
            
            {/* Cần phụ (Extension - Giả lập telescopic) */}
            <Box args={[0.8, 0.8, 26]} position={[0, 0, 13]}>
                <meshStandardMaterial color="#eab308" /> {/* Màu vàng đậm hơn chút */}
            </Box>

            {/* Dây cáp & Móc */}
            <group position={[0, -0.5, 25]} rotation={[-boomAngle, 0, 0]}> {/* Xoay ngược lại để dây thẳng đứng */}
                <Cylinder args={[0.05, 0.05, 15]} position={[0, -7.5, 0]}><meshStandardMaterial color="#111" /></Cylinder>
                <Box args={[1, 0.2, 1]} position={[0, -15, 0]}><meshStandardMaterial color="#333" /></Box> {/* Móc */}
            </group>
        </group>

        {/* 4. XI LANH THỦY LỰC (PISTONS) */}
        {/* Nối từ thân cẩu lên cần cẩu */}
        <group position={[0, 1, 2]} rotation={[boomAngle / 1.5, 0, 0]}>
             <Cylinder args={[0.3, 0.3, 8]} position={[0, 4, 0]}><meshStandardMaterial color="#cbd5e1" metalness={0.8} /></Cylinder>
        </group>
      </group>
    </group>
  );
};

// --- COMPONENT TÀU CHÍNH ---
interface Props {
  position: [number, number, number];
  name?: string;
}

const GeneralCargoShip: React.FC<Props> = ({ position, name = "STEEL QUEEN" }) => {
  const hullColor = "#1e3a8a"; // Xanh dương đậm
  const deckColor = "#78350f"; // Nâu đỏ

  return (
    <group position={position}>
      {/* 1. THÂN TÀU (HULL) */}
      <group>
        {/* Thân chính */}
        <Box args={[160, 12, 32]} position={[0, 4, 0]}>
          <meshStandardMaterial color={hullColor} roughness={0.6} />
        </Box>
        {/* Mũi tàu vát nhọn */}
        <mesh position={[80, 4, 0]} rotation={[0, 0, -Math.PI/2]}>
             <cylinderGeometry args={[16, 16, 25, 4, 1, false, Math.PI/4, Math.PI]} />
             <meshStandardMaterial color={hullColor} />
        </mesh>
        {/* Cabin lái (Bridge) - Cao và rộng */}
        <group position={[-70, 14, 0]}>
            <Box args={[18, 16, 30]}><meshStandardMaterial color="white" /></Box>
            <Box args={[20, 3, 34]} position={[0, 6, 0]}><meshStandardMaterial color="white" /></Box> {/* Cánh gà */}
            <Box args={[20.1, 1.5, 32]} position={[0, 6.5, 0]}><meshStandardMaterial color="#1f2937" /></Box> {/* Kính */}
            <Box args={[1, 10, 1]} position={[0, 12, 0]}><meshStandardMaterial color="#9ca3af" /></Box> {/* Cột ăng ten */}
        </group>
      </group>

      {/* 2. BOONG TÀU & HẦM HÀNG */}
      <Box args={[120, 1, 28]} position={[10, 10.1, 0]}>
          <meshStandardMaterial color={deckColor} />
      </Box>
      
      {/* 3 Nắp hầm hàng (Hatch Covers) - Màu nâu đậm */}
      <Box args={[28, 1.5, 22]} position={[-15, 11, 0]}><meshStandardMaterial color="#451a03" /></Box>
      <Box args={[28, 1.5, 22]} position={[20, 11, 0]}><meshStandardMaterial color="#451a03" /></Box>
      <Box args={[28, 1.5, 22]} position={[55, 11, 0]}><meshStandardMaterial color="#451a03" /></Box>

      {/* 3. CẨU TÀU (SHIP CRANES) - ĐÃ CHỈNH HƯỚNG */}
      {/* Cả 2 cẩu đều quay về hướng cầu tàu (-PI/2 là quay ra phía Z+, tức là phía bờ) */}
      
      {/* Cẩu 1 (Phía lái) */}
      <ShipCrane position={[2, 10, 0]} rotationY={-Math.PI / 2} />
      
      {/* Cẩu 2 (Phía mũi) */}
      <ShipCrane position={[38, 10, 0]} rotationY={-Math.PI / 2} />

      {/* 4. HÀNG HÓA TRÊN BOONG (FULL LOAD) */}
      
      {/* Hầm sau: COIL (Cuộn tôn) */}
      {[-20, -15, -10].map(x => (
          [-6, 0, 6].map(z => (
            <group key={`coil-${x}-${z}`} position={[x, 12.5, z]}>
                <Cylinder args={[1.1, 1.1, 2.5, 16]} rotation={[0, 0, Math.PI/2]}>
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </Cylinder>
                {/* Tầng 2 */}
                <Cylinder args={[1.1, 1.1, 2.5, 16]} rotation={[0, 0, Math.PI/2]} position={[0, 2, 0]}>
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </Cylinder>
            </group>
          ))
      ))}

      {/* Hầm giữa: PLATE (Thép tấm) */}
      {[15, 20, 25].map(x => (
          <group key={`plate-${x}`} position={[x, 13, 0]}>
              <Box args={[4, 3, 16]}><meshStandardMaterial color="#334155" /></Box>
          </group>
      ))}

      {/* Hầm trước: BAR (Thép thanh) */}
      {[50, 55, 60].map(x => (
          <group key={`bar-${x}`} position={[x, 13, 0]}>
              <Box args={[3, 2, 18]}><meshStandardMaterial color="#78350f" /></Box>
              <Cylinder args={[0.9, 0.9, 18]} rotation={[Math.PI/2, 0, 0]} position={[0, 1.5, 0]}><meshStandardMaterial color="#a16207" /></Cylinder>
          </group>
      ))}

      {/* Tên tàu */}
      <group position={[85, 8, 10]} rotation={[0, Math.PI/4, 0]}>
         {/* Text tên tàu nếu cần, hoặc bỏ qua cho nhẹ */}
      </group>

    </group>
  );
};

export default GeneralCargoShip;