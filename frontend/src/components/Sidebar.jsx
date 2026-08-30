import React from 'react';
import {
  LayoutDashboard,
  Map,
  CloudRain,
  Mountain,
  Flame,
  Bell,
  History,
  Activity
} from 'lucide-react';

// Specialized icons matching reference design
const DroneNavIcon = ({ size = 17, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="2.5" />
    <path d="m10.2 10.2-3.5-3.5" />
    <path d="m13.8 10.2 3.5-3.5" />
    <path d="m10.2 13.8-3.5 3.5" />
    <path d="m13.8 13.8 3.5 3.5" />
    <circle cx="5.5" cy="5.5" r="2" />
    <circle cx="18.5" cy="5.5" r="2" />
    <circle cx="5.5" cy="18.5" r="2" />
    <circle cx="18.5" cy="18.5" r="2" />
  </svg>
);

const RoadNavIcon = ({ size = 17, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19 8.5 5h7L20 19" />
    <path d="M12 8v2" />
    <path d="M12 14v2" />
  </svg>
);

export function Sidebar({ activeTab, onSelectTab, counts = {} }) {
  const sections = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'map', label: 'Live Map', icon: Map },
      ]
    },
    {
      title: 'MONITORING',
      items: [
        { id: 'rainfall', label: 'Rainfall & Weather', icon: CloudRain },
        { id: 'landslides', label: 'Landslide Risk', icon: Mountain },
        { id: 'roads', label: 'Road Vulnerability', icon: RoadNavIcon },
        { id: 'drones', label: 'Drone Fleet', icon: DroneNavIcon },
        { id: 'fire', label: 'Forest Fire Risk', icon: Flame },
      ]
    },
    {
      title: 'RESPONSE',
      items: [
        { id: 'alerts', label: 'Disaster Alerts', icon: Bell, badge: counts.criticalAlerts || 2 },
        { id: 'historical', label: 'Historical Archive', icon: History },
        { id: 'simulation', label: 'Emergency Simulation', icon: Activity },
      ]
    }
  ];

  return (
    <aside className="w-[235px] bg-white border-r border-[#EAE8E1] flex flex-col h-screen shrink-0 select-none z-20">
      
      {/* Brand Header */}
      <div 
        className="px-5 h-[68px] flex items-center gap-3 cursor-pointer border-b border-[#EAE8E1]"
        onClick={() => onSelectTab('home')}
      >
        {/* Geometric Mountain Icon */}
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 4L2 19.5H19L10.5 4Z" stroke="#234E3B" strokeWidth="2.4" strokeLinejoin="round"/>
            <path d="M18.5 9.5L13 19.5H24L18.5 9.5Z" stroke="#789177" strokeWidth="2.2" strokeLinejoin="round"/>
            <path d="M6 16.5L10.5 8.5L15 16.5" stroke="#D8A32A" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="flex flex-col justify-center">
          <div className="font-serif font-bold text-[18px] text-[#18211E] tracking-tight leading-none mb-1">
            HIM-Guard
          </div>
          <div className="text-[10px] text-[#6E756F] font-medium leading-[1.15]">
            Himachal Pradesh<br/>Disaster Intelligence
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6 scrollbar-thin">
        {sections.map((section, idx) => (
          <div key={idx}>
            <div className="text-[10px] font-bold text-[#8E958F] tracking-wider mb-2 px-2 uppercase">
              {section.title}
            </div>
            <div className="flex flex-col gap-1">
              {section.items.map(item => {
                const isActive = activeTab === item.id || (item.id === 'overview' && activeTab === 'dashboard');
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${
                      isActive 
                        ? 'bg-[#EAF3EE] text-[#1E4D38] font-semibold shadow-xs' 
                        : 'text-[#4A534D] hover:bg-[#F7F6F1] hover:text-[#18211E] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon 
                        size={17} 
                        className={isActive ? 'text-[#1E4D38]' : 'text-[#7A827D]'} 
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />
                      <span className="text-[13px]">{item.label}</span>
                    </div>
                    
                    {item.badge && (
                      <div className="w-5 h-5 rounded-full bg-[#1E4D38] text-white flex items-center justify-center text-[10px] font-bold">
                        {item.badge}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status Card */}
      <div className="p-3.5 border-t border-[#EAE8E1]">
        <div className="bg-[#FAF9F5] rounded-xl p-3 border border-[#E5E3D8]">
          <div className="text-[11px] font-medium text-[#6E756F] mb-1.5">
            Data updates every 10 min
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
            <span className="text-[11px] font-bold text-[#1E4D38]">All systems operational</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
