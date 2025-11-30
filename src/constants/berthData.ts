// src/constants/berthData.ts
import { BerthData } from '../types';
import { APP_CONFIG } from './config';

export const PORT_CONFIG = {
  berthWidth: APP_CONFIG.berthWidth,
  berthHeight: APP_CONFIG.berthHeight,
  // Dữ liệu khoảng hở từ Excel
  gap_K12C_K12A: 60, 
  gap_K12B_TT2: 40, 
};

// K12C1 (Bến phụ nhỏ bên trái cùng)
export const BERTH_K12C1: BerthData = {
  id: 'K12C1', name: 'K12C1', length: 50, bollards: []
};

// K12C (189m)
export const BERTH_K12C: BerthData = {
  id: 'K12C', name: 'K12C', length: 189,
  bollards: [{ id: 1, meter: 0 }, { id: 2, meter: 24 }, { id: 3, meter: 53 }, { id: 4, meter: 79 }, { id: 5, meter: 108 }, { id: 6, meter: 134 }, { id: 7, meter: 168 }, { id: 8, meter: 187 }]
};

// Cụm K12A - K12 - K12B (Liên tục, tổng 524m)
export const BERTH_CLUSTER: BerthData = {
  id: 'K12_CLUSTER', name: 'K12A - K12 - K12B', length: 524,
  subSections: [
    { name: 'K12A (132m)', len: 132 }, 
    { name: 'K12 (204m)', len: 204 }, 
    { name: 'K12B (188m)', len: 188 }
  ],
  bollards: [
    { id: 1, meter: 7 }, { id: 2, meter: 34 }, { id: 3, meter: 54 }, { id: 4, meter: 78 }, { id: 5, meter: 98 }, { id: 6, meter: 125 }, { id: 7, meter: 148 }, { id: 8, meter: 173 },
    { id: 9, meter: 202 }, { id: 10, meter: 232 }, { id: 11, meter: 261 }, { id: 12, meter: 291 }, { id: 13, meter: 320 }, { id: 14, meter: 339 }, { id: 15, meter: 362 }, { id: 16, meter: 384 },
    { id: 17, meter: 407 }, { id: 18, meter: 434 }, { id: 19, meter: 462 }, { id: 20, meter: 490 }, { id: 21, meter: 522 }
  ]
};

// TT2 (Tách biệt, 222m)
export const BERTH_TT2: BerthData = {
  id: 'TT2', name: 'Tân Thuận 2 (TT2)', length: 222,
  bollards: [{ id: 0, meter: 0 }, { id: 1, meter: 12 }, { id: 2, meter: 30 }, { id: 3, meter: 45 }, { id: 4, meter: 61 }, { id: 5, meter: 79 }, { id: 6, meter: 97 }, { id: 7, meter: 115 }, { id: 8, meter: 132 }, { id: 9, meter: 150 }, { id: 10, meter: 166 }, { id: 11, meter: 184 }, { id: 12, meter: 201 }, { id: 13, meter: 222 }]
};