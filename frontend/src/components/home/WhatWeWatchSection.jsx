import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudRain, Mountain, Flame } from 'lucide-react';

export function WhatWeWatchSection() {
  const navigate = useNavigate();

  const watchCards = [
    {
      id: 'rainfall',
      title: 'Rainfall & Weather',
      description: 'Detect unusual rainfall patterns and changing weather conditions.',
      icon: CloudRain,
      route: '/rainfall',
      image: 'https://images.unsplash.com/photo-1514632595-4944383f2737?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'landslide',
      title: 'Terrain & Landslide Risk',
      description: 'Identify vulnerable slopes and emerging landslide conditions.',
      icon: Mountain,
      route: '/landslides',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'road-fire',
      title: 'Road & Fire Risk',
      description: 'Understand where infrastructure and fire conditions require attention.',
      icon: Flame,
      route: '/roads',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-3xl md:rounded-[28px] p-6 md:p-10 lg:p-12 mb-8 shadow-subtle">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-4 max-w-[380px]">
          <div className="text-[11.5px] font-bold tracking-[0.2em] text-[#6E756F] uppercase mb-3">
            What We Watch
          </div>

          <h2 className="font-serif text-[38px] md:text-[46px] leading-[1.1] text-[#18211E] font-normal mb-5">
            One landscape.<br />
            Many signals.
          </h2>

          <p className="text-[13.5px] md:text-[14px] text-[#55635B] leading-relaxed">
            Risk does not happen in isolation. HIM-Guard brings the signals together so emerging conditions can be understood in context.
          </p>
        </div>

        {/* Right Column: 3 Vertical Image Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {watchCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => navigate(card.route)}
                className="relative h-[380px] md:h-[420px] rounded-2xl overflow-hidden border border-[#DCD9CC] shadow-sm cursor-pointer group transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              >
                {/* Background Photography */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Card Content at Bottom */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  {/* Icon Circle */}
                  <div className="w-10 h-10 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 transition-colors group-hover:bg-white group-hover:text-[#19382B]">
                    <Icon size={18} />
                  </div>

                  <h3 className="font-sans font-bold text-[18px] text-white leading-tight mb-2">
                    {card.title}
                  </h3>

                  <p className="text-[12.5px] text-white/80 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
