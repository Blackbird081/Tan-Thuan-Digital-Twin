import React, { useState } from 'react';
import { COLORS } from '../../constants/config';

interface Props {
  position: [number, number, number];
  id: number;
  meter: number;
  zone: string;
  onHover: (info: any) => void;
}

export const Bollard: React.FC<Props> = ({ position, id, meter, zone, onHover }) => {
  const [hovered, setHover] = useState(false);

  return (
    <group position={position}>
      {/* Đế bích */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.5, 0.5, 1.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Thân bích */}
      <mesh 
        position={[0, 0.8, 0]}
        onPointerOver={(e) => { 
          e.stopPropagation(); 
          setHover(true); 
          onHover({ 
            type: 'bollard', 
            title: `Bích Neo #${id}`, 
            subtitle: zone,
            stats: [{ label: 'Vị trí', value: `${meter}m` }]
          }); 
        }}
        onPointerOut={() => { setHover(false); onHover(null); }}
      >
        <cylinderGeometry args={[0.3, 0.4, 1.2, 16]} />
        <meshStandardMaterial 
          color={hovered ? '#fff' : COLORS.berth} 
          emissive={hovered ? '#b45309' : '#000'} 
        />
      </mesh>
    </group>
  );
};