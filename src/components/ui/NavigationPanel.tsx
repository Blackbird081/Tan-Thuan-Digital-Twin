import React from 'react';
import { Anchor } from 'lucide-react';

interface Props {
  onNavigate: (target: [number, number, number]) => void;
}

export const NavigationPanel: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur shadow-lg border border-gray-200 rounded-full px-4 py-2 flex gap-4 pointer-events-auto">
      {/* Nút Mới: K12C/C1 */}
      <button 
        onClick={() => onNavigate([-350, 100, 200])} // Bay sang trái
        className="flex items-center gap-2 px-3 py-1 hover:bg-teal-100 rounded-full text-teal-900 font-bold transition"
      >
        <Anchor size={16} /> K12C (General Cargo)
      </button>

      <div className="w-px bg-gray-300 h-6 self-center"></div>

      <button 
        onClick={() => onNavigate([0, 150, 300])}
        className="flex items-center gap-2 px-3 py-1 hover:bg-blue-100 rounded-full text-blue-900 font-bold transition"
      >
        <Anchor size={16} /> Tân Thuận 1 (Center)
      </button>
      
      <div className="w-px bg-gray-300 h-6 self-center"></div>

      <button 
        onClick={() => onNavigate([400, 150, 300])}
        className="flex items-center gap-2 px-3 py-1 hover:bg-orange-100 rounded-full text-orange-900 font-bold transition"
      >
        <Anchor size={16} /> Tân Thuận 2 (Thép)
      </button>
    </div>
  );
};