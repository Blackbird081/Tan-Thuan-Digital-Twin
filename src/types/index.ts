// src/types/index.ts

// --- LANDSIDE TYPES ---
export type ZoneType = 'container_export' | 'container_import' | 'container_empty' | 'warehouse' | 'building' | 'road' | 'gate' | 'special';
export type TrafficStatus = 'Normal' | 'Light' | 'Heavy';

export interface ZoneData {
  id: string;
  label: string;
  description?: string;
  type: ZoneType;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: number; 
  details?: string[];
  capacity?: number; 
  traffic?: TrafficStatus;
}

// --- WATERSIDE TYPES ---
export type EntityType = ZoneType | 'berth' | 'bollard' | 'ship' | 'yard_block';

export interface BollardData {
  id: number;
  meter: number;
}

export interface BerthData {
  id: string;
  name: string;
  length: number;
  startX?: number;
  bollards: BollardData[];
  subSections?: { name: string; len: number }[];
}

// --- UI TYPES (Quan trọng cho UIOverlay) ---
export interface SelectionInfo {
  type: EntityType;
  title: string;
  subtitle?: string;
  // Định nghĩa rõ kiểu dữ liệu cho stats để tránh lỗi 'any'
  stats?: { label: string; value: string | number }[]; 
  details?: string[];
}