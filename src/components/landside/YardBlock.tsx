import React, { useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { ZoneData } from '../../types';

interface Props {
  data: ZoneData;
  onHover: (info: any) => void;
}

export const YardBlock = ({ data, onHover }: Props) => {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Logic sinh container (Chỉ chạy nếu type có chữ 'container')
  useLayoutEffect(() => {
    if (!data.type.includes('container') || !meshRef.current) return;

    const width = data.size[0];
    const depth = data.size[2];
    const colSpacing = 7; 
    const rowSpacing = 3; 
    
    const startX = -width / 2 + 3.5;
    const startZ = -depth / 2 + 1.5;
    
    const cols = Math.floor((width - 2) / colSpacing);
    const rows = Math.floor((depth - 2) / rowSpacing);
    
    const tempObj = new THREE.Object3D();
    const color = new THREE.Color();
    let index = 0;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.3) { 
          const stackHeight = Math.floor(Math.random() * 4) + 1;
          for (let h = 0; h < stackHeight; h++) {
            tempObj.position.set(
              startX + i * colSpacing,
              0.5 + h * 2.6 - data.size[1]/2 + data.size[1], 
              startZ + j * rowSpacing
            );
            tempObj.rotation.y = Math.PI / 2; 
            tempObj.updateMatrix();
            meshRef.current.setMatrixAt(index, tempObj.matrix);
            
            let cHex = '#3b82f6';
            if (data.type === 'container_export') cHex = Math.random() > 0.5 ? '#ef4444' : '#f97316';
            if (data.type === 'container_import') cHex = Math.random() > 0.5 ? '#3b82f6' : '#0ea5e9';
            if (data.type === 'container_empty') cHex = '#9ca3af';
            
            color.set(cHex);
            meshRef.current.setColorAt(index, color);
            index++;
          }
        }
      }
    }
    meshRef.current.count = index;
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

  }, [data]);

  const isRoad = data.type === 'road';
  const isBuilding = data.type === 'building' || data.type === 'warehouse';

  return (
    <group 
      position={data.position} 
      rotation={[0, data.rotation || 0, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); onHover({ type: 'yard_block', title: data.label, details: data.details }); }}
      onPointerOut={() => { setHover(false); onHover(null); }}
    >
      {/* 1. NỀN (BASE) - QUAN TRỌNG: Đây là cái vẽ Đường và Nền nhà */}
      <mesh receiveShadow>
        <boxGeometry args={data.size} />
        <meshStandardMaterial 
          color={hovered ? '#fff' : data.color} 
          // Nếu là đường thì hơi trong suốt để lộ grid, nếu là nhà thì đặc
          transparent={isRoad} 
          opacity={isRoad ? 0.9 : 1}
        />
      </mesh>

      {/* 2. CONTAINER STACKS (Nếu có) */}
      {data.type.includes('container') && (
        <instancedMesh ref={meshRef} args={[undefined, undefined, 2000]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 2.6, 6]} /> 
          <meshStandardMaterial roughness={0.8} />
        </instancedMesh>
      )}

      {/* 3. MÁI NHÀ (Nếu là Building/Warehouse) */}
      {isBuilding && (
         <mesh position={[0, data.size[1]/2 + 0.25, 0]}>
            <boxGeometry args={[data.size[0] + 1, 0.5, data.size[2] + 1]} />
            <meshStandardMaterial color="#555" />
         </mesh>
      )}

      {/* 4. LABEL (Tên khu vực) */}
      {hovered && (
        <Html position={[0, 10, 0]} center distanceFactor={200} style={{ pointerEvents: 'none' }}>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-pre-wrap text-center">
            {data.label}
          </div>
        </Html>
      )}
    </group>
  );
};

export default YardBlock;