import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CloudRain, Flame, MountainSnow, AlertTriangle, Activity } from 'lucide-react';

export function HeroSection({ onSelectDistrict }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full rounded-3xl md:rounded-[32px] overflow-hidden border border-[#E2E0D4] bg-[#EAE7DC] shadow-sm mb-6">
      {/* Background Himalayan Panoramic Landscape */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop')`,
          filter: 'brightness(0.96) contrast(1.04)'
        }}
      />

      {/* Topographic Map Vector Layer Overlay */}
      <svg
        viewBox="0 0 1200 680"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial Heat Gradient for Kullu */}
          <radialGradient id="heroKulluHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E35D38" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#E35D38" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Radial Heat Gradient for Shimla */}
          <radialGradient id="heroShimlaHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Soft Blue Rain Radar for Kangra */}
          <radialGradient id="heroKangraRain" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#60A5FA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* State Boundary Fill */}
          <linearGradient id="hpFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A2F" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#19382B" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* State Boundary Silhouette */}
        <g stroke="#FFFFFF" strokeWidth="1.6" fill="url(#hpFill)">
          <path
            d="M 640 100
               C 740 80, 860 110, 940 150
               C 1010 180, 1070 240, 1080 320
               C 1090 400, 1000 480, 930 530
               C 860 580, 780 610, 720 560
               C 660 510, 620 460, 590 380
               C 560 300, 570 200, 640 100 Z"
            strokeLinejoin="round"
            opacity="0.75"
          />
          {/* Internal Valley Paths */}
          <path d="M 680 180 Q 770 210, 850 190" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" strokeDasharray="4,4" />
          <path d="M 720 280 Q 820 320, 920 290" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" strokeDasharray="4,4" />
          <path d="M 660 380 Q 780 420, 880 390" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" strokeDasharray="4,4" />
          <path d="M 600 290 Q 700 320, 800 350" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" strokeDasharray="4,4" />
        </g>

        {/* Heat Glow Zones */}
        <circle cx="855" cy="275" r="75" fill="url(#heroKulluHeat)" />
        <circle cx="905" cy="435" r="55" fill="url(#heroShimlaHeat)" />
        <circle cx="610" cy="285" r="45" fill="url(#heroKangraRain)" />

        {/* Geographic Labels on Map */}
        <g className="font-sans text-[13px] font-semibold fill-[#18211E] tracking-wide select-none filter drop-shadow-sm">
          <text x="690" y="200" textAnchor="middle" fill="#2C3531">Chamba</text>
          <text x="980" y="210" textAnchor="middle" fill="#2C3531">Lahaul & Spiti</text>
          <text x="610" y="330" textAnchor="middle" fill="#1E3A8A" fontWeight="bold">Kangra</text>
          <text x="855" y="315" textAnchor="middle" fill="#991B1B" fontWeight="bold">Kullu</text>
          <text x="815" y="380" textAnchor="middle" fill="#2C3531">Mandi</text>
          <text x="840" y="450" textAnchor="middle" fill="#C2410C" fontWeight="bold">Shimla</text>
          <text x="730" y="470" textAnchor="middle" fill="#2C3531">Solan</text>
          <text x="845" y="530" textAnchor="middle" fill="#2C3531">Sirmaur</text>
        </g>

        {/* Active Node Pulsing Points */}
        <circle cx="855" cy="275" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="610" cy="285" r="6" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="905" cy="435" r="6" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
      </svg>

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-[1520px] mx-auto p-6 md:p-12 lg:p-14 min-h-[580px] md:min-h-[630px] flex flex-col justify-between">
        {/* Left Editorial Text Area */}
        <div className="max-w-[620px] backdrop-blur-[6px] bg-[#FAF9F5]/85 p-6 md:p-9 rounded-2xl border border-[#E2E0D4]/70 shadow-sm">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-[#2C3531] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#19382B]"></span>
            <span>Himachal Pradesh • Live Risk Intelligence</span>
          </div>

          {/* Large Editorial Serif Display Heading */}
          <h1 className="font-serif text-[44px] sm:text-[52px] md:text-[60px] lg:text-[66px] leading-[1.06] text-[#18211E] tracking-tight font-normal mb-5">
            Know the risk.<br />
            Act before it escalates.
          </h1>

          {/* Subheading */}
          <div className="text-[15px] md:text-[17px] font-semibold text-[#18211E] leading-snug mb-3">
            One intelligent view of the conditions shaping Himachal Pradesh.
          </div>

          {/* Body */}
          <p className="text-[13.5px] md:text-[14px] text-[#4A554E] leading-relaxed mb-8 max-w-[500px]">
            HIM-Guard brings rainfall, landslide, road, fire and field intelligence together so teams can understand what is happening — and where action may be needed next.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#19382B] hover:bg-[#234E3B] text-white text-[13.5px] font-medium shadow-sm transition-all duration-200 hover:shadow cursor-pointer"
            >
              <span>Open Live Intelligence</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => navigate('/simulation')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/95 hover:bg-white text-[#18211E] border border-[#D5D3C8] text-[13.5px] font-medium shadow-sm transition-all duration-200 cursor-pointer"
            >
              <Activity size={14} className="text-[#19382B]" />
              <span>Explore How It Works</span>
            </button>
          </div>
        </div>

        {/* 4 Floating Map Annotation Cards */}
        <div className="hidden lg:block pointer-events-auto">
          {/* Card 1: Landslide Risk (Top-Right over Kullu) */}
          <div 
            onClick={() => navigate('/landslides')}
            className="absolute top-12 right-[24%] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-hero-card border border-[#E0DED4] cursor-pointer hover:scale-105 transition-transform duration-200 min-w-[170px]"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#D94A3A] uppercase mb-1">
              <MountainSnow size={13} />
              <span>Landslide Risk</span>
            </div>
            <div className="text-[16px] font-bold text-[#18211E]">Kullu</div>
            <div className="text-[12px] font-extrabold text-[#D94A3A] mt-0.5">
              HIGH • 82/100
            </div>
          </div>

          {/* Card 2: Rainfall (Center-Left over Kangra) */}
          <div 
            onClick={() => navigate('/rainfall')}
            className="absolute top-[40%] right-[52%] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-hero-card border border-[#E0DED4] cursor-pointer hover:scale-105 transition-transform duration-200 min-w-[175px]"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#4C89C7] uppercase mb-1">
              <CloudRain size={13} />
              <span>Rainfall</span>
            </div>
            <div className="text-[16px] font-bold text-[#18211E]">Kangra</div>
            <div className="text-[11.5px] text-[#55635B] mt-0.5 font-medium">
              Above local threshold
            </div>
          </div>

          {/* Card 3: Road Risk (Right-Center over Chamba/Mandi corridor) */}
          <div 
            onClick={() => navigate('/roads')}
            className="absolute top-[34%] right-[7%] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-hero-card border border-[#E0DED4] cursor-pointer hover:scale-105 transition-transform duration-200 min-w-[180px]"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#D8A32A] uppercase mb-1">
              <AlertTriangle size={13} />
              <span>Road Risk</span>
            </div>
            <div className="text-[16px] font-bold text-[#18211E]">Chamba</div>
            <div className="text-[11.5px] text-[#55635B] mt-0.5 font-medium">
              4 segments monitored
            </div>
          </div>

          {/* Card 4: Fire Risk (Bottom-Right over Shimla) */}
          <div 
            onClick={() => navigate('/fire')}
            className="absolute bottom-16 right-[10%] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-hero-card border border-[#E0DED4] cursor-pointer hover:scale-105 transition-transform duration-200 min-w-[155px]"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#E36B25] uppercase mb-1">
              <Flame size={13} />
              <span>Fire Risk</span>
            </div>
            <div className="text-[16px] font-bold text-[#18211E]">Shimla</div>
            <div className="text-[12px] font-bold text-[#E36B25] mt-0.5">
              Elevated
            </div>
          </div>
        </div>

        {/* Mobile Floating Cards Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-6">
          <div 
            onClick={() => navigate('/landslides')}
            className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-sm border border-[#E0DED4] cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[9.5px] font-bold text-[#D94A3A] uppercase">
              <MountainSnow size={12} />
              <span>Landslide Risk</span>
            </div>
            <div className="text-[14px] font-bold text-[#18211E]">Kullu</div>
            <div className="text-[11.5px] font-extrabold text-[#D94A3A]">HIGH • 82/100</div>
          </div>
          <div 
            onClick={() => navigate('/rainfall')}
            className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-sm border border-[#E0DED4] cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[9.5px] font-bold text-[#4C89C7] uppercase">
              <CloudRain size={12} />
              <span>Rainfall</span>
            </div>
            <div className="text-[14px] font-bold text-[#18211E]">Kangra</div>
            <div className="text-[11px] text-[#55635B]">Above threshold</div>
          </div>
        </div>
      </div>
    </div>
  );
}
