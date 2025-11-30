import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface VehicleProps {
  path: [number, number, number][]; // Mảng các điểm tọa độ [x, y, z]
  speed?: number;
  delay?: number;
  color?: string;
  cargoType?: 'container' | 'coil' | 'none'; // Loại hàng
}

const Vehicle: React.FC<VehicleProps> = ({ 
  path, 
  speed = 10, 
  delay = 0, 
  color = "#ef4444",
  cargoType = 'container'
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const active = useRef(false);

  // Tạo đường cong CatmullRom từ các điểm path để xe chạy mượt
  const curve = useMemo(() => {
    const vectors = path.map(p => new THREE.Vector3(p[0], p[1], p[2]));
    // centripetal giúp đường cong gắt hơn ở các khúc cua vuông góc
    return new THREE.CatmullRomCurve3(vectors, true, 'centripetal', 0.1); 
  }, [path]);

  useFrame((state, delta) => {
    if (!active.current) {
      if (state.clock.elapsedTime > delay) active.current = true;
      return;
    }

    if (groupRef.current) {
      // Tính toán vị trí trên đường cong (0 -> 1)
      // Speed / Length để ra tốc độ tương đối
      progress.current = (progress.current + (speed * delta) / curve.getLength()) % 1;
      
      const position = curve.getPointAt(progress.current);
      const tangent = curve.getTangentAt(progress.current);
      
      groupRef.current.position.copy(position);
      // Xe luôn hướng về phía trước
      groupRef.current.lookAt(position.clone().add(tangent));
    }
  });

  return (
    // NÂNG ĐỘ CAO GROUP LÊN 0.2 ĐỂ KHÔNG BỊ CHÌM DƯỚI ĐƯỜNG
    <group ref={groupRef} position={[0, 0.2, 0]}> 
      
      {/* --- ĐẦU KÉO (TRACTOR) --- */}
      <group position={[0, 0.8, 1.5]}>
        <Box args={[2.5, 2, 2]} position={[0, 0.5, 0]}><meshStandardMaterial color={color} /></Box>
        <Box args={[2.5, 1, 1]} position={[0, 0, 1.5]}><meshStandardMaterial color="#333" /></Box> 
        <Box args={[2.3, 1, 0.1]} position={[0, 1, 1.01]}><meshStandardMaterial color="#bfdbfe" /></Box> 
      </group>

      {/* --- RƠ MOOC (TRAILER) --- */}
      <group position={[0, 0.8, -2]}>
        {/* Sàn xe */}
        <Box args={[2.5, 0.5, 8]} position={[0, 0, 0]}><meshStandardMaterial color="#333" /></Box>
        
        {/* Bánh xe */}
        <Box args={[2.7, 0.8, 2]} position={[0, -0.4, -2]}><meshStandardMaterial color="#111" /></Box>
        <Box args={[2.7, 0.8, 2]} position={[0, -0.4, 2]}><meshStandardMaterial color="#111" /></Box>

        {/* --- HÀNG HÓA --- */}
        {cargoType === 'container' && (
           <Box args={[2.4, 2.6, 6]} position={[0, 1.55, 0]}>
              <meshStandardMaterial color="#3b82f6" roughness={0.5} />
           </Box>
        )}

        {cargoType === 'coil' && (
           <group position={[0, 0.8, 0]}>
              <Cylinder args={[0.8, 0.8, 2, 16]} rotation={[0, 0, Math.PI/2]} position={[0, 0, -1.5]}>
                  <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
              </Cylinder>
              <Cylinder args={[0.8, 0.8, 2, 16]} rotation={[0, 0, Math.PI/2]} position={[0, 0, 1.5]}>
                  <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
              </Cylinder>
              <Box args={[1.5, 0.2, 6]} position={[0, -0.3, 0]}><meshStandardMaterial color="#78350f" /></Box>
           </group>
        )}
      </group>
    </group>
  );
};

export default Vehicle;
