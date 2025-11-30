import React, { useMemo } from 'react';
import { Box, Text } from '@react-three/drei';
import Container from "./Container";
import * as THREE from 'three';

interface ShipProps {
  position: [number, number, number];
  name?: string;
  hullColor?: string;
}

const Ship: React.FC<ShipProps> = ({ position, name = "EVER GIANT", hullColor = "#7f1d1d" }) => {
  // Memoize container generation for performance
  const deckContainers = useMemo(() => {
    const containers = [];
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ffffff', '#881337'];
    
    // Ship alignment: Along X axis (Length 200m)
    // Width: Z axis (approx 45m)
    
    const startX = -70;
    const endX = 75;
    const startZ = -18;
    const endZ = 18;
    
    // ROTATION ADJUSTMENT:
    // Containers rotated 90deg (Aligned with X axis).
    // So SpacingX = Length (6m) + gap. SpacingZ = Width (2.4m) + gap.
    const spacingX = 7; 
    const spacingZ = 3;  
    
    const rows = Math.floor((endX - startX) / spacingX); 
    const cols = Math.floor((endZ - startZ) / spacingZ) + 1;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cx = startX + i * spacingX;
        const cz = startZ + j * spacingZ;

        // Randomize height
        let stackHeight = Math.floor(Math.random() * 2) + 6; // 6 to 8 high
        // Taper slightly at bow (positive X)
        if (i > rows - 2) stackHeight = Math.max(2, stackHeight - 3);

        for (let t = 0; t < stackHeight; t++) {
             containers.push(
                <Container 
                  key={`c-${i}-${j}-${t}`}
                  position={[
                    cx,      
                    7 + (t * 2.6), // Vertical stack
                    cz        
                  ]}
                  rotation={Math.PI / 2} // Rotate 90 degrees
                  color={colors[Math.floor(Math.random() * colors.length)]}
                />
              );
        }
      }
    }
    return containers;
  }, []);

  return (
    <group position={position}> 
      
      {/* --- HULL DESIGN (Aligned along X-axis) --- */}
      <group>
        {/* Main Midship Section */}
        <Box args={[160, 12, 42]} position={[0, 4, 0]}>
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </Box>
        
        {/* Bow (Front - Positive X) */}
        <group position={[80, 4, 0]}>
           {/* Upper Bow */}
           <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI/2]}>
             <cylinderGeometry args={[21, 21, 25, 4, 1, false, Math.PI/4, Math.PI]} />
             <meshStandardMaterial color="#0f172a" />
           </mesh>
           {/* Bulbous Bow */}
           <mesh position={[10, -5, 0]} rotation={[0, 0, -Math.PI/2]}>
             <capsuleGeometry args={[3, 15, 4, 8]} />
             <meshStandardMaterial color={hullColor} />
           </mesh>
        </group>

        {/* Stern (Rear - Negative X) */}
        <group position={[-85, 4, 0]}>
             <Box args={[15, 12, 40]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#0f172a" />
             </Box>
        </group>

        {/* Waterline / Anti-fouling */}
        <Box args={[190, 2, 41.5]} position={[0, -1, 0]}>
            <meshStandardMaterial color={hullColor} />
        </Box>
      </group>

      {/* --- SUPERSTRUCTURE (BRIDGE) --- */}
      {/* At Stern (Negative X) */}
      <group position={[-80, 10, 0]}>
         <Box args={[18, 14, 38]} position={[0, 7, 0]}>
            <meshStandardMaterial color="white" />
         </Box>
         {/* Bridge Wings */}
         <Box args={[10, 3, 52]} position={[0, 13, 0]}>
            <meshStandardMaterial color="white" />
         </Box>
         {/* Windows */}
         <Box args={[10.1, 1.5, 50]} position={[0, 13.5, 0]}>
            <meshStandardMaterial color="#1e293b" />
         </Box>
         {/* Mast */}
         <Box args={[1, 12, 1]} position={[0, 20, 0]}>
            <meshStandardMaterial color="#cbd5e1" />
         </Box>
      </group>

      {/* --- EXHAUST FUNNEL --- */}
      <group position={[-65, 18, 0]}>
         <Box args={[8, 10, 5]} position={[0, 5, 0]}>
             <meshStandardMaterial color="#cbd5e1" />
         </Box>
         <Box args={[8.1, 2, 5.1]} position={[0, 8, 0]}>
             <meshStandardMaterial color="#ef4444" />
         </Box>
      </group>

      {/* --- DECK CARGO --- */}
      <group position={[0, 4, 0]}>
        {deckContainers}
      </group>

      {/* Ship Name */}
      <Text 
        position={[90, 10, 0]} 
        rotation={[0, Math.PI/2, 0]} 
        fontSize={3} 
        color="white"
        anchorX="center" 
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

export default Ship;