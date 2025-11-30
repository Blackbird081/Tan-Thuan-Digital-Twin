import React, { useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface Props {
  position: [number, number, number];
  size: [number, number, number];
  label: string;
  cargoType?: 'coil' | 'plate' | 'bar';
}

// --- 1. COMPONENT CHUYÊN VẼ CUỘN THÉP (COIL) ---
const CoilRenderer = ({ width, depth }: { width: number, depth: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Kích thước cuộn: Bán kính 0.8m, Dài 1.5m
  const RADIUS = 0.8;
  const LENGTH = 1.5;
  const SPACING_X = LENGTH + 0.5; // Khoảng cách theo chiều dài
  const SPACING_Z = RADIUS * 2 + 0.2; // Khoảng cách theo đường kính

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    const tempObj = new THREE.Object3D();
    let index = 0;
    const cols = Math.floor((width - 2) / SPACING_X);
    const rows = Math.floor((depth - 2) / SPACING_Z);
    
    const startX = -width / 2 + SPACING_X;
    const startZ = -depth / 2 + SPACING_Z;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Mật độ 85%
        if (Math.random() > 0.15) {
            // TẦNG 1:
            // Y = Nền (0.2) + Bán kính (0.8) = 1.0
            // Xoay Z=90 độ để nằm ngang
            tempObj.rotation.set(0, 0, Math.PI / 2); 
            // Xoay nhẹ trục X ngẫu nhiên cho tự nhiên
            tempObj.rotation.x = Math.random() * Math.PI;

            tempObj.position.set(startX + i * SPACING_X, 1.0, startZ + j * SPACING_Z);
            tempObj.updateMatrix();
            meshRef.current.setMatrixAt(index++, tempObj.matrix);

            // TẦNG 2 (Kim tự tháp):
            if (Math.random() > 0.4) {
                // Nằm giữa 2 cuộn tầng 1
                // Y = 1.0 + (Bán kính * căn 3) ~ 1.0 + 1.38 = 2.38
                tempObj.position.set(
                    startX + i * SPACING_X, 
                    1.0 + (RADIUS * 1.7), // Chồng lên
                    startZ + j * SPACING_Z + (RADIUS) // So le
                );
                // Xoay ngẫu nhiên khác đi
                tempObj.rotation.x = Math.random() * Math.PI;
                
                tempObj.updateMatrix();
                meshRef.current.setMatrixAt(index++, tempObj.matrix);
            }
        }
      }
    }
    meshRef.current.count = index;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [width, depth]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 3000]} castShadow receiveShadow>
      <cylinderGeometry args={[RADIUS, RADIUS, LENGTH, 16]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
    </instancedMesh>
  );
};

// --- 2. COMPONENT CHUYÊN VẼ TẤM/THANH (PLATE/BAR) ---
const PlateRenderer = ({ width, depth, type }: { width: number, depth: number, type: 'plate' | 'bar' }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const isPlate = type === 'plate';
  const itemW = isPlate ? 2.5 : 1.0;
  const itemL = isPlate ? 6.0 : 6.0;
  const itemH = isPlate ? 0.2 : 0.4;
  const color = isPlate ? '#475569' : '#78350f'; // Xám đậm hoặc Nâu rỉ

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const tempObj = new THREE.Object3D();
    let index = 0;
    
    const spacingX = itemW + 0.5;
    const spacingZ = itemL + 1.0;
    const cols = Math.floor((width - 2) / spacingX);
    const rows = Math.floor((depth - 2) / spacingZ);
    const startX = -width / 2 + spacingX;
    const startZ = -depth / 2 + spacingZ;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.2) {
            // Chồng cao nhiều lớp (5-10 lớp)
            const stackCount = Math.floor(Math.random() * 8) + 2;
            
            for(let k=0; k<stackCount; k++) {
                tempObj.rotation.set(0, (Math.random() - 0.5) * 0.05, 0); // Xoay cực nhẹ cho đỡ cứng
                tempObj.position.set(
                    startX + i * spacingX, 
                    0.2 + (itemH/2) + (k * itemH), // Chồng lên nhau
                    startZ + j * spacingZ
                );
                tempObj.updateMatrix();
                meshRef.current.setMatrixAt(index++, tempObj.matrix);
            }
        }
      }
    }
    meshRef.current.count = index;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [width, depth, type]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 5000]} castShadow receiveShadow>
      <boxGeometry args={[itemW, itemH, itemL]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.5} />
    </instancedMesh>
  );
};

// --- 3. MAIN COMPONENT ---
export const SteelYardBlock: React.FC<Props> = ({ position, size, label, cargoType = 'coil' }) => {
  const [hovered, setHover] = useState(false);

  return (
    <group 
      position={position} 
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
    >
      {/* Nền bãi */}
      <mesh receiveShadow>
        <boxGeometry args={[size[0], 0.2, size[2]]} />
        <meshStandardMaterial color="#cbd5e1" /> 
      </mesh>

      {/* Chọn bộ render phù hợp */}
      {cargoType === 'coil' ? (
        <CoilRenderer width={size[0]} depth={size[2]} />
      ) : (
        <PlateRenderer width={size[0]} depth={size[2]} type={cargoType} />
      )}

      {/* Label */}
      {hovered && (
        <Html position={[0, 5, 0]} center distanceFactor={150} style={{ pointerEvents: 'none' }}>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs text-center whitespace-nowrap">
            {label}<br/>
            <span className="text-gray-300 text-[10px] uppercase">{cargoType}</span>
          </div>
        </Html>
      )}
    </group>
  );
};

export default SteelYardBlock;