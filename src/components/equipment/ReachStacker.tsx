import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface ReachStackerProps {
  path: [number, number, number][];
  speed?: number;
  delay?: number;
}

const ReachStacker: React.FC<ReachStackerProps> = ({ path, speed = 5, delay = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [active, setActive] = useState(false);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);

  const mainRed = "#dc2626"; // Red color like image
  const tireColor = "#111";

  // Initialize position
  useEffect(() => {
    if (groupRef.current && path.length > 0) {
      groupRef.current.position.set(...path[0]);
    }
  }, [path]);

  useFrame((state, delta) => {
    if (!groupRef.current || path.length < 2) return;

    if (!active) {
      if (state.clock.elapsedTime > delay) {
        setActive(true);
      }
      return;
    }

    const currentPos = groupRef.current.position;
    const targetPoint = new THREE.Vector3(...path[currentPointIndex]);
    
    const distanceToTarget = currentPos.distanceTo(targetPoint);
    
    if (distanceToTarget > 0.5) {
      const direction = targetPoint.clone().sub(currentPos).normalize();
      
      // Rotation
      const targetRotation = Math.atan2(direction.x, direction.z);
      const currentRotation = groupRef.current.rotation.y;
      let diff = targetRotation - currentRotation;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      groupRef.current.rotation.y += diff * 5 * delta; 
      
      // Move
      const moveStep = direction.multiplyScalar(speed * delta);
      groupRef.current.position.add(moveStep);
    } else {
      const nextIndex = (currentPointIndex + 1) % path.length;
      if (nextIndex === 0) {
         groupRef.current.position.set(...path[0]);
      }
      setCurrentPointIndex(nextIndex);
    }
  });

  return (
    <group ref={groupRef} visible={active}>
      {/* --- CHASSIS --- */}
      <Box args={[3, 1.5, 6]} position={[0, 1.2, 0]}>
         <meshStandardMaterial color={mainRed} />
      </Box>
      
      {/* Cab (Offset to side usually, but simplified here) */}
      <Box args={[1.2, 1.2, 1.5]} position={[-0.5, 2.5, 0]}>
         <meshStandardMaterial color="#333" />
      </Box>
      
      {/* Counterweight (Rear) */}
      <Box args={[3, 1.8, 2]} position={[0, 1.5, -2]}>
         <meshStandardMaterial color={mainRed} />
      </Box>

      {/* --- WHEELS --- */}
      {/* Front */}
      <Cylinder args={[1, 1, 1]} position={[1.5, 1, 1.5]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color={tireColor} /></Cylinder>
      <Cylinder args={[1, 1, 1]} position={[-1.5, 1, 1.5]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color={tireColor} /></Cylinder>
      {/* Rear */}
      <Cylinder args={[1, 1, 1]} position={[1.5, 1, -2]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color={tireColor} /></Cylinder>
      <Cylinder args={[1, 1, 1]} position={[-1.5, 1, -2]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color={tireColor} /></Cylinder>

      {/* --- BOOM ARM --- */}
      <group position={[0, 2, -1]}>
         {/* Main Boom */}
         <Box args={[1, 1, 6]} position={[0, 2, 2]} rotation={[-0.4, 0, 0]}>
            <meshStandardMaterial color="#333" />
         </Box>
         {/* Piston */}
         <Cylinder args={[0.15, 0.15, 3]} position={[0, 1, 1]} rotation={[-0.4, 0, 0]}><meshStandardMaterial color="#999" /></Cylinder>
         
         {/* Spreader Head */}
         <group position={[0, 4.5, 4.5]}>
             <Box args={[3, 0.4, 1.5]} position={[0, 0, 0]}><meshStandardMaterial color="#fbbf24" /></Box>
             {/* Container held (Optional visual) */}
             <Box args={[2.4, 2.6, 6]} position={[0, -1.6, 0]} rotation={[0, Math.PI/2, 0]}><meshStandardMaterial color="#ef4444" /></Box>
         </group>
      </group>
    </group>
  );
};

export default ReachStacker;