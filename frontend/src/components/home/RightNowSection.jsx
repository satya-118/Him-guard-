import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mountain, CloudRain, Route, Flame } from 'lucide-react';

export function RightNowSection() {
  const navigate = useNavigate();

  const attentionItems = [
    {
      id: 'landslide',
      icon: Mountain,
      iconBg: 'bg-[#DC2626]',
      title: 'High landslide risk',
      location: 'Manali–Rohtang corridor, Kullu',
      highlight: (
        <span>
          Risk score <strong className="text-[#DC2626] font-bold">82/100</strong>
        </span>
      ),
      route: '/landslides'
    },
    {
      id: 'rainfall',
      icon: CloudRain,
      iconBg: 'bg-[#2563EB]',
      title: 'Heavy rainfall',
      location: 'Dharamshala, Kangra',
      highlight: (
        <span>
          <strong className="text-[#2563EB] font-bold">62 mm</strong> recorded in 3 hr
        </span>
      ),
      route: '/rainfall'
    },
    {
      id: 'road',
      icon: Route,
      iconBg: 'bg-[#D97706]',
      title: 'Road vulnerability',
      location: 'Chamba',
      highlight: (
        <span>
          <strong className="text-[#D97706] font-bold">4</strong> critical segments monitored
        </span>
      ),
      route: '/roads'
    },
    {
      id: 'fire',
      icon: Flame,
      iconBg: 'bg-[#EA580C]',
      title: 'Elevated fire conditions',
      location: 'Shimla region',
      highlight: (
        <span className="text-[#55635B]">
          Dryness + wind increasing risk
        </span>
      ),
      route: '/fire'
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-2xl md:rounded-[22px] p-6 md:p-8 mb-8 shadow-subtle">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x divide-[#E5E3D8] items-center">
        {/* Left Column: Heading */}
        <div className="lg:pr-8">
          <div className="text-[11px] font-bold tracking-[0.2em] text-[#6E756F] uppercase mb-2">
            Right Now
          </div>
          <h3 className="font-serif text-[28px] md:text-[32px] leading-[1.1] text-[#18211E] font-normal">
            What deserves<br />
            attention
          </h3>
        </div>

        {/* 4 Attention Signal Columns */}
        {attentionItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              className="lg:px-6 flex items-start gap-3.5 cursor-pointer group transition-transform duration-150 hover:translate-y-[-1px]"
            >
              {/* Circular Icon Pill */}
              <div className={`w-10 h-10 rounded-full ${item.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                <Icon size={18} />
              </div>

              {/* Text */}
              <div>
                <h4 className="text-[13.5px] font-bold text-[#18211E] leading-tight mb-1 group-hover:text-[#19382B] transition-colors">
                  {item.title}
                </h4>
                <div className="text-[11.5px] text-[#6E756F] mb-1">
                  {item.location}
                </div>
                <div className="text-[11.5px] font-medium">
                  {item.highlight}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
