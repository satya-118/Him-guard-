// Constants for HIM-Guard

export const HIMACHAL_CENTER = [31.8, 77.2];
export const DEFAULT_MAP_ZOOM = 8;

export const HP_DISTRICTS = [
  { name: 'Kangra', lat: 32.0998, lng: 76.2691, hq: 'Dharamshala' },
  { name: 'Mandi', lat: 31.5892, lng: 76.9182, hq: 'Mandi' },
  { name: 'Shimla', lat: 31.1048, lng: 77.1734, hq: 'Shimla' },
  { name: 'Kullu', lat: 31.9579, lng: 77.1095, hq: 'Kullu' },
  { name: 'Solan', lat: 30.9084, lng: 77.0999, hq: 'Solan' },
  { name: 'Sirmaur', lat: 30.5599, lng: 77.2955, hq: 'Nahan' },
  { name: 'Hamirpur', lat: 31.6862, lng: 76.5213, hq: 'Hamirpur' },
  { name: 'Una', lat: 31.4685, lng: 76.2708, hq: 'Una' },
  { name: 'Bilaspur', lat: 31.3260, lng: 76.7567, hq: 'Bilaspur' },
  { name: 'Chamba', lat: 32.5534, lng: 76.1258, hq: 'Chamba' },
  { name: 'Lahaul and Spiti', lat: 32.5710, lng: 77.0320, hq: 'Keylong' },
  { name: 'Kinnaur', lat: 31.6510, lng: 78.4752, hq: 'Reckong Peo' }
];

export const SEVERITY_COLORS = {
  Low: '#10b981',       // Emerald Green
  Moderate: '#f59e0b',  // Amber Yellow
  High: '#f97316',      // Orange
  Critical: '#ef4444'   // Crimson Red
};

export const SEVERITY_BG = {
  Low: 'rgba(16, 185, 129, 0.15)',
  Moderate: 'rgba(245, 158, 11, 0.15)',
  High: 'rgba(249, 115, 22, 0.15)',
  Critical: 'rgba(239, 68, 68, 0.2)'
};

export const ROAD_STATUS_COLORS = {
  Open: '#10b981',
  Caution: '#f59e0b',
  Restricted: '#f97316',
  Blocked: '#ef4444'
};
