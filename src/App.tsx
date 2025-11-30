import React, { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls } from '@react-three/drei'; // Import OrbitControls ở đây để dùng ref
import Environment from './components/Environment';
import UIOverlay from './components/UIOverlay';
import { NavigationPanel } from './components/ui/NavigationPanel'; // Import mới
import { SelectionInfo } from './types';
import { PerimeterWalls } from './components/core/PerimeterWalls'; // Import mới

// Modules
import { TanThuan1System } from './components/landside/TanThuan1System';
import { TanThuan2System } from './components/landside/TanThuan2System';
import { WatersideSystem } from './components/waterside/WatersideSystem';
import TrafficSystem from './components/TrafficSystem';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SelectionInfo | null>(null);
  const controlsRef = useRef<any>(null);

  // Hàm xử lý di chuyển camera
  const handleNavigate = (target: [number, number, number]) => {
    if (controlsRef.current) {
      // Di chuyển target của OrbitControls đến vị trí mới
      controlsRef.current.target.set(target[0], 0, 0);
      controlsRef.current.object.position.set(target[0], target[1], target[2]);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Tăng far lên 5000 để không bị mất hình khi zoom xa */}
      <Canvas shadows camera={{ position: [0, 400, 600], fov: 45, far: 5000 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Environment />
          
          {/* Gắn ref vào OrbitControls để điều khiển */}
          <OrbitControls 
            ref={controlsRef}
            makeDefault 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 2.1} 
            maxDistance={2000} // Cho phép zoom xa hơn
            target={[0, 0, 0]}
          />

          <TanThuan1System setTooltipData={setSelectedItem} />
          <TanThuan2System setTooltipData={setSelectedItem} />
          {/* TƯỜNG BAO QUANH */}
          <PerimeterWalls />

          <group position={[0, 0, -100]}>
             <WatersideSystem setTooltipData={setSelectedItem} />
          </group>

          <TrafficSystem />
        </Suspense>
      </Canvas>
      
      <Loader />
      <UIOverlay selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
      
      {/* Thanh điều hướng mới */}
      <NavigationPanel onNavigate={handleNavigate} />
    </div>
  );
};

export default App;