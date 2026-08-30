import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ShieldCheck, Route, Radio } from 'lucide-react';

export function StatsStrip({ stats = {} }) {
  const navigate = useNavigate();

  const statItems = [
    {
      id: 'alerts',
      icon: Bell,
      iconBg: 'bg-[#FEE2E2]',
      iconColor: 'text-[#DC2626]',
      value: stats.activeAlerts || '12',
      label: 'Active Alerts',
      route: '/alerts'
    },
    {
      id: 'districts',
      icon: ShieldCheck,
      iconBg: 'bg-[#ECFDF5]',
      iconColor: 'text-[#059669]',
      value: stats.districtsOnWatch || '7',
      label: 'Districts on Watch',
      route: '/landslides'
    },
    {
      id: 'roads',
      icon: Route,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#D97706]',
      value: stats.vulnerableRoads || '18',
      label: 'High-Risk Road Segments',
      route: '/roads'
    },
    {
      id: 'monitoring',
      icon: Radio,
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0284C7]',
      value: '24/7',
      label: 'Continuous Monitoring',
      route: '/drones'
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-2xl md:rounded-[22px] p-5 md:p-6 mb-8 shadow-subtle">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E3D8]">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`flex items-center gap-4 cursor-pointer group transition-transform duration-150 hover:translate-y-[-1px] ${idx !== 0 ? 'lg:pl-8' : ''} ${idx % 2 !== 0 ? 'pl-4 lg:pl-8' : ''} ${idx > 1 ? 'pt-4 lg:pt-0' : ''}`}
            >
              {/* Circular Icon Container */}
              <div className={`w-12 h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-xs`}>
                <Icon size={22} strokeWidth={2} />
              </div>

              {/* Number and Label */}
              <div>
                <div className="font-serif text-[30px] md:text-[34px] font-bold text-[#18211E] leading-none mb-1">
                  {item.value}
                </div>
                <div className="text-[12.5px] md:text-[13.5px] text-[#6E756F] font-medium">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
