import React from 'react';

export function KpiCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconBg = 'bg-[#EAF3EE]',
  iconColor = 'text-[#1E4D38]',
  cardBg = 'bg-white',
  subtitleColor = 'text-[#6E756F]',
  onClick 
}) {
  return (
    <div 
      onClick={onClick}
      className={`${cardBg} border border-[#EAE8E1] rounded-[18px] p-4 sm:p-4.5 flex items-center gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-150 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 select-none ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <div className={`w-11 h-11 rounded-full ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        {Icon && <Icon size={20} strokeWidth={2} />}
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-bold tracking-wider text-[#6E756F] uppercase truncate">
          {title}
        </span>
        <div className="text-[26px] font-extrabold text-[#18211E] tracking-tight leading-tight my-0.5">
          {value}
        </div>
        <span className={`text-[11.5px] font-medium truncate ${subtitleColor}`}>
          {subtitle}
        </span>
      </div>
    </div>
  );
}
