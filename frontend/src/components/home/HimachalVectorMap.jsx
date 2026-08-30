import React, { useState } from 'react';

export function HimachalVectorMap({ onSelectDistrict }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Accurate points matching the reference image's symbols
  const mapPoints = [
    {
      id: 'kullu-heat',
      name: 'Kullu Valley Catchment',
      district: 'Kullu',
      type: 'rainfall-station',
      x: 520,
      y: 275,
      risk: 'Critical (82/100)',
      info: 'Excess precipitation & active scree movement',
      severity: 'Critical'
    },
    {
      id: 'kullu-slide-marker',
      name: 'Manali-Rohtang Slip',
      district: 'Kullu',
      type: 'landslide-report',
      x: 545,
      y: 285,
      risk: 'High',
      info: 'Fissures reported on hill slope',
      severity: 'High'
    },
    {
      id: 'kangra-slide-1',
      name: 'Dharamshala Slip Zone',
      district: 'Kangra',
      type: 'landslide-report',
      x: 355,
      y: 300,
      risk: 'High',
      info: 'Heavy runoff causing hillside erosion',
      severity: 'High'
    },
    {
      id: 'kangra-rain-marker',
      name: 'Kangra Valley Station',
      district: 'Kangra',
      type: 'rainfall-station',
      x: 375,
      y: 325,
      risk: '62 mm / 3hr',
      info: 'Rainfall exceeding local drainage threshold',
      severity: 'High'
    },
    {
      id: 'chamba-station',
      name: 'Ravi River Gauge',
      district: 'Chamba',
      type: 'rainfall-station',
      x: 405,
      y: 220,
      risk: 'Moderate',
      info: 'River flow elevated by 1.4m',
      severity: 'Moderate'
    },
    {
      id: 'mandi-road-1',
      name: 'NH-21 Pandoh Corridor',
      district: 'Mandi',
      type: 'road-incident',
      x: 442,
      y: 350,
      risk: 'Restricted',
      info: 'Mudflow debris cleared; single lane operational',
      severity: 'Moderate'
    },
    {
      id: 'mandi-slide-marker',
      name: 'Aut Tunnel Bypass',
      district: 'Mandi',
      type: 'landslide-report',
      x: 435,
      y: 375,
      risk: 'Moderate',
      info: 'Slope watch active',
      severity: 'Moderate'
    },
    {
      id: 'shimla-road-marker',
      name: 'Summer Hill Ridge',
      district: 'Shimla',
      type: 'road-incident',
      x: 570,
      y: 418,
      risk: 'Caution',
      info: 'Pavement monitoring',
      severity: 'Low'
    },
    {
      id: 'shimla-road-2',
      name: 'Theog Section (NH-05)',
      district: 'Shimla',
      type: 'road-incident',
      x: 550,
      y: 445,
      risk: 'Open',
      info: 'Traffic flowing smoothly',
      severity: 'Low'
    },
    {
      id: 'kinnaur-slide',
      name: 'Nigulsari Corridor',
      district: 'Kinnaur',
      type: 'landslide-report',
      x: 635,
      y: 430,
      risk: 'High',
      info: 'Shooting stone hazard flagged',
      severity: 'High'
    }
  ];

  return (
    <div className="relative w-full h-[460px] md:h-[510px] bg-[#EAE7DC]/60 rounded-2xl border border-[#DCD8CA] overflow-hidden flex items-center justify-center p-3 select-none">
      {/* North Arrow Indicator at Top Right */}
      <div className="absolute top-5 right-6 z-20 flex flex-col items-center pointer-events-none opacity-85">
        <div className="text-[12px] font-serif font-bold text-[#19382B]">N</div>
        <div className="w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-b-[9px] border-b-[#19382B]"></div>
        <div className="w-[1.5px] h-3.5 bg-[#19382B]"></div>
      </div>

      {/* Map SVG */}
      <svg
        viewBox="0 0 800 620"
        className="w-full h-full object-contain filter drop-shadow-sm"
      >
        <defs>
          {/* Subtle Topographic Contours Pattern */}
          <pattern id="contourPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M0 30 Q 15 10, 30 30 T 60 30 M0 60 Q 15 40, 30 60 T 60 60"
              fill="none"
              stroke="#D4D0C0"
              strokeWidth="0.75"
              opacity="0.5"
            />
          </pattern>

          {/* Radial Heat Gradient for Kullu */}
          <radialGradient id="mapKulluHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E35D38" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#D4A373" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#E5E3D8" stopOpacity="0" />
          </radialGradient>

          {/* Radial Heat Gradient for Kangra */}
          <radialGradient id="mapKangraHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#E5E3D8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E5E3D8" stopOpacity="0" />
          </radialGradient>

          {/* District Terrain Fill */}
          <linearGradient id="mapTerrainFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8ECE4" />
            <stop offset="50%" stopColor="#DFE6D9" />
            <stop offset="100%" stopColor="#D6DEC9" />
          </linearGradient>
        </defs>

        {/* Contour Background */}
        <rect width="800" height="620" fill="url(#contourPattern)" opacity="0.6" />

        {/* Main Himachal Pradesh Silhouette */}
        <g id="hp-topography">
          <path
            d="M 280 120
               C 330 90, 420 80, 490 100
               C 560 120, 640 140, 710 190
               C 740 220, 750 280, 700 330
               C 660 370, 620 420, 600 480
               C 580 540, 540 580, 480 560
               C 420 540, 400 480, 360 440
               C 310 400, 260 380, 240 330
               C 210 260, 230 170, 280 120 Z"
            fill="url(#mapTerrainFill)"
            stroke="#9BA894"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Internal Valley & District Boundaries */}
          <path d="M 280 230 Q 340 220, 400 240" fill="none" stroke="#B4C2AE" strokeWidth="1.2" strokeDasharray="3,3" />
          <path d="M 400 240 Q 520 210, 710 190" fill="none" stroke="#B4C2AE" strokeWidth="1.2" strokeDasharray="3,3" />
          <path d="M 400 240 Q 480 290, 540 340" fill="none" stroke="#B4C2AE" strokeWidth="1.2" strokeDasharray="3,3" />
          <path d="M 330 350 Q 410 330, 470 380 Q 510 420, 540 430" fill="none" stroke="#B4C2AE" strokeWidth="1.2" strokeDasharray="3,3" />
          <path d="M 540 340 Q 590 380, 640 400" fill="none" stroke="#B4C2AE" strokeWidth="1.2" strokeDasharray="3,3" />
          <path d="M 430 450 Q 490 470, 560 510" fill="none" stroke="#B4C2AE" strokeWidth="1.2" strokeDasharray="3,3" />

          {/* Topographic Mountain Shading Lines */}
          <path d="M 320 150 Q 360 170, 390 140" fill="none" stroke="#A7B59F" strokeWidth="0.9" opacity="0.6" />
          <path d="M 460 140 Q 500 170, 550 150" fill="none" stroke="#A7B59F" strokeWidth="0.9" opacity="0.6" />
          <path d="M 480 270 Q 530 300, 590 280" fill="none" stroke="#A7B59F" strokeWidth="0.9" opacity="0.6" />
          <path d="M 370 360 Q 430 380, 490 360" fill="none" stroke="#A7B59F" strokeWidth="0.9" opacity="0.6" />
          <path d="M 510 450 Q 550 470, 590 440" fill="none" stroke="#A7B59F" strokeWidth="0.9" opacity="0.6" />
        </g>

        {/* Heat Glow Hotspot over Kullu */}
        <circle cx="525" cy="280" r="80" fill="url(#mapKulluHeat)" />
        <circle cx="360" cy="310" r="55" fill="url(#mapKangraHeat)" />

        {/* District Labels */}
        <g id="district-names" className="font-sans text-[13px] font-medium fill-[#21352A] pointer-events-none select-none">
          <text x="375" y="150" textAnchor="middle" opacity="0.85">Chamba</text>
          <text x="595" y="165" textAnchor="middle" opacity="0.85">Lahaul & Spiti</text>
          <text x="340" y="325" textAnchor="middle" opacity="0.9" fontWeight="600">Kangra</text>
          <text x="525" y="310" textAnchor="middle" opacity="0.95" fontWeight="700">Kullu</text>
          <text x="440" y="380" textAnchor="middle" opacity="0.85">Mandi</text>
          <text x="585" y="445" textAnchor="middle" opacity="0.9" fontWeight="600">Shimla</text>
          <text x="455" y="480" textAnchor="middle" opacity="0.85">Solan</text>
          <text x="555" y="550" textAnchor="middle" opacity="0.85">Sirmaur</text>
        </g>

        {/* Plotted Interactive Markers matching reference legend */}
        <g id="markers">
          {mapPoints.map((pt) => (
            <g
              key={pt.id}
              transform={`translate(${pt.x}, ${pt.y})`}
              className="cursor-pointer transition-transform duration-200 hover:scale-125"
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
              onClick={() => onSelectDistrict && onSelectDistrict({ name: pt.district })}
            >
              {/* Pulse effect for critical point */}
              {pt.severity === 'Critical' && (
                <circle r="14" fill="none" stroke="#E35D38" strokeWidth="1.5">
                  <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* 1. Rainfall Station: Blue Droplet Icon */}
              {pt.type === 'rainfall-station' && (
                <g transform="translate(-7, -7)">
                  <circle cx="7" cy="7" r="7.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
                  <path d="M 7 2.5 C 5 5.5, 3.5 7.5, 7 11.5 C 10.5 7.5, 9 5.5, 7 2.5 Z" fill="#FFFFFF" transform="scale(0.6) translate(4.5, 3)" />
                </g>
              )}

              {/* 2. Landslide Report: Orange Triangle Icon */}
              {pt.type === 'landslide-report' && (
                <g transform="translate(-8, -8)">
                  <polygon
                    points="8,1 15,14 1,14"
                    fill={pt.severity === 'Critical' ? '#DC2626' : '#EA580C'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="8" cy="10" r="1.2" fill="#FFFFFF" />
                </g>
              )}

              {/* 3. Road Incident: Dark Charcoal Triangle/Diamond */}
              {pt.type === 'road-incident' && (
                <g transform="translate(-7, -7)">
                  <polygon
                    points="7,1 13,7 7,13 1,7"
                    fill="#18211E"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="7" r="1.5" fill="#D97706" />
                </g>
              )}
            </g>
          ))}
        </g>

        {/* Distance Scale Bar in bottom-left */}
        <g transform="translate(45, 545)" className="font-sans text-[10px] fill-[#64748b] select-none">
          <line x1="0" y1="0" x2="100" y2="0" stroke="#525F56" strokeWidth="2" strokeLinecap="square" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#525F56" strokeWidth="1.5" />
          <line x1="50" y1="-3" x2="50" y2="3" stroke="#525F56" strokeWidth="1.2" />
          <line x1="100" y1="-4" x2="100" y2="4" stroke="#525F56" strokeWidth="1.5" />
          <text x="0" y="-7" textAnchor="middle">0</text>
          <text x="50" y="-7" textAnchor="middle">25</text>
          <text x="100" y="-7" textAnchor="middle">50 km</text>
        </g>
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute z-30 pointer-events-none bg-[#19382B] text-white p-2.5 rounded-xl shadow-lg border border-[#2D5E48] text-xs transition-all duration-150 max-w-[220px]"
          style={{
            left: `${(hoveredPoint.x / 800) * 100}%`,
            top: `${(hoveredPoint.y / 620) * 100}%`,
            transform: 'translate(-50%, -125%)'
          }}
        >
          <div className="font-bold flex items-center justify-between gap-2 border-b border-[#2D5E48] pb-1 mb-1">
            <span>{hoveredPoint.name}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${hoveredPoint.severity === 'Critical' ? 'bg-red-600' : 'bg-amber-600'}`}>
              {hoveredPoint.risk}
            </span>
          </div>
          <div className="text-[11px] text-[#D1E0D6] leading-tight">
            {hoveredPoint.info}
          </div>
        </div>
      )}
    </div>
  );
}
