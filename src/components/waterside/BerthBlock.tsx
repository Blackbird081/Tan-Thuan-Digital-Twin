import React, { useState } from 'react';
import { APP_CONFIG } from '../../constants/config';

interface Props {
  position: [number, number, number];
  length: number;
  name: string;
  subSections?: { name: string; len: number }[];
  onHover: (info: any) => void;
}

export const BerthBlock: React.FC<Props> = ({ position, length, name, subSections, onHover }) => {
  const [hovered, setHover] = useState(false);
  const { berthHeight, berthWidth } = APP_CONFIG;

  return (
    <group position={position}>
      {/* Khối bê tông chính */}
      <mesh 
        position={[length / 2, berthHeight / 2, -berthWidth / 2]}
        receiveShadow 
        castShadow
        onPointerOver={(e) => { 
          e.stopPropagation(); 
          setHover(true); 
          onHover({ 
            type: 'berth', 
            title: name, 
            stats: [{ label: 'Chiều dài', value: `${length}m` }]
          }); 
        }}
        onPointerOut={() => { setHover(false); onHover(null); }}
      >
        <boxGeometry args={[length, berthHeight, berthWidth]} />
        <meshStandardMaterial color={hovered ? "#cbd5e1" : "#9ca3af"} roughness={0.8} />
      </mesh>

      {/* Vạch phân chia các bến con (nếu có) */}
      {subSections?.map((sub, idx) => {
        const prevLen = subSections.slice(0, idx + 1).reduce((acc, curr) => acc + curr.len, 0);
        return (
          <mesh key={idx} position={[prevLen, berthHeight + 0.05, -berthWidth / 2]}>
            <boxGeometry args={[0.5, 0.1, berthWidth]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        );
      })}
    </group>
  );
};