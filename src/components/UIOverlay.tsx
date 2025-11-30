import React from 'react';
import { SelectionInfo } from '../types'; // Import từ folder types
import { COLORS } from '../constants/config';
import { Info, Anchor, X } from 'lucide-react';

interface Props {
  selectedItem: SelectionInfo | null;
  onClose: () => void;
}

const UIOverlay: React.FC<Props> = ({ selectedItem, onClose }) => {
  const legendItems = React.useMemo(() => {
    return [
      { label: 'Export/Import Blocks', color: COLORS.block.export },
      { label: 'Special Export Block', color: COLORS.block.special },
      { label: 'Import Blocks', color: COLORS.block.import },
      { label: 'Reefer Zone', color: COLORS.block.reefer },
      { label: 'Main Roads', color: COLORS.road },
      { label: 'Berth / Bollard', color: COLORS.berth },
      { label: 'Water / River', color: COLORS.water },
    ];
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
      {/* Header */}
      <div className="pointer-events-auto bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
          <Anchor className="w-6 h-6" />
          Tân Thuận Digital Twin
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Integrated Port Operations System (TOS 3D)
        </p>
      </div>

      {/* Legend */}
      <div className="pointer-events-auto bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 self-start mt-4 max-w-xs">
         <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
         <div className="space-y-2 text-xs">
            {legendItems.map(item => (
              <div key={item.color} className="flex items-center gap-2">
                <span 
                  className="w-4 h-4 rounded border border-gray-300" 
                  style={{ backgroundColor: item.color }}
                ></span>
                <span>{item.label}</span>
              </div>
            ))}
         </div>
      </div>

      {/* Detail Panel */}
      {selectedItem && (
        <div className="absolute right-6 top-6 bottom-6 w-80 pointer-events-auto flex flex-col">
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200 flex flex-col h-auto max-h-full">
            <div className="bg-blue-600 p-4 text-white flex justify-between items-start">
               <div>
                  <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                  <span className="text-xs opacity-80 uppercase tracking-wider">
                    {selectedItem.subtitle || selectedItem.type}
                  </span>
               </div>
               <button 
                 onClick={onClose} 
                 className="hover:bg-blue-700 p-1 rounded transition"
                 aria-label="Close"
                 title="Close"
               >
                  <X size={20} />
               </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
                 {/* Stats Section */}
                 {selectedItem.stats && selectedItem.stats.map((stat: {label: string, value: string | number}, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">{stat.label}</span>
                        <span className="font-medium text-gray-800">{stat.value}</span>
                    </div>
                 ))}

                 {/* Details Section */}
                 {selectedItem.details && (
                   <div>
                     <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-1">
                       <Info size={14} /> Details
                     </h4>
                     <ul className="space-y-2">
                        {selectedItem.details.map((detail: string, idx: number) => (
                           <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                              {detail}
                           </li>
                        ))}
                     </ul>
                   </div>
                 )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UIOverlay;