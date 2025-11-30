// src/constants/config.ts

export const APP_CONFIG = {
  // Kích thước quy đổi (Scale)
  scale: 1, 
  
  // Thông số Cầu bến
  berthHeight: 4.5,
  berthWidth: 40,
  
  // Thông số Container (20ft chuẩn)
  container: {
    length: 6.058,
    width: 2.438,
    height: 2.591,
    gap: 0.2 // Khoảng hở giữa các cont
  },

  // Thông số Xe nâng (Forklift)
  forklift: {
    length: 3.5,
    width: 1.2,
    height: 2.5,
    speed: 1.5 // m/s
  }
};


  // Màu sắc chuẩn (Palette)
  export const COLORS = {
  road: '#1f2937',
  water: '#9ac7df',
  berth: '#facc15',
  block: {
    export: '#10b981',
    import: '#f59e0b',
    reefer: '#3b82f6',
    special: '#ef4444',
    empty: '#9ca3af'
  },
  warehouseGray: '#9ca3af'
};
