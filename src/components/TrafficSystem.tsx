import React from 'react';
import { TrafficTT1 } from './traffic/TrafficTT1';
import { TrafficTT2 } from './traffic/TrafficTT2';

const TrafficSystem: React.FC = () => {
  return (
    <group>
      {/* Giao thông khu vực Container */}
      <TrafficTT1 />

      {/* Giao thông khu vực Thép */}
      <TrafficTT2 />
    </group>
  );
};

export default TrafficSystem;

//--- IGNORE ---