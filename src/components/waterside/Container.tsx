import React, { useMemo } from 'react';
import { Box } from '@react-three/drei';

interface Props {
  position: [number, number, number];
  color: string;
  rotation?: number;
}

const Container: React.FC<Props> = ({ position, color, rotation = 0 }) => {
  // Random slight variation in color to make stacks look realistic
  const finalColor = useMemo(() => {
    return color;
  }, [color]);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Main Body */}
      <Box args={[2.4, 2.6, 6]} castShadow receiveShadow>
        <meshStandardMaterial color={finalColor} roughness={0.7} metalness={0.1} />
      </Box>
      
      {/* Door detail (simple visual) */}
      <Box args={[2.2, 2.4, 0.1]} position={[0, 0, 3.01]}>
        <meshStandardMaterial color="#333" />
      </Box>
      
      {/* Corrugation Simulation - stripped down for performance, handled by texture ideally, 
          but here just simple geometry or material properties */}
    </group>
  );
};

export default Container;
