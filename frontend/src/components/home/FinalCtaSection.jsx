import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function FinalCtaSection() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full rounded-3xl md:rounded-[28px] overflow-hidden border border-[#E5E3D8] bg-[#EAE8DE] shadow-subtle mb-12">
      {/* Background Himalayan Valley River Panorama on Right */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-right md:bg-center opacity-85 mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />

      {/* Soft gradient fade from left ivory to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5]/95 via-[#FAF9F5]/75 to-transparent md:to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-14 lg:p-16 max-w-[620px]">
        <h2 className="font-serif text-[38px] sm:text-[44px] md:text-[50px] leading-[1.08] text-[#18211E] font-normal mb-4">
          From information to action.
        </h2>

        <p className="text-[14px] md:text-[15.5px] text-[#4A554E] leading-relaxed mb-8 max-w-[480px]">
          HIM-Guard helps teams move from scattered signals to a shared understanding of risk.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#19382B] hover:bg-[#234E3B] text-white text-[14px] font-medium shadow-sm transition-all duration-200 hover:shadow cursor-pointer"
        >
          <span>Enter HIM-Guard Intelligence</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
