import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, AlertTriangle, Route } from 'lucide-react';
import { HimachalVectorMap } from './HimachalVectorMap.jsx';

export function LiveSituationSection({ onSelectDistrict }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-3xl md:rounded-[28px] p-6 md:p-10 lg:p-12 mb-8 shadow-subtle">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Paragraph & Compact Map Legend */}
        <div className="lg:col-span-5 max-w-[420px]">
          <div className="text-[11.5px] font-bold tracking-[0.2em] text-[#6E756F] uppercase mb-3">
            Live Situation
          </div>

          <h2 className="font-serif text-[38px] md:text-[46px] leading-[1.1] text-[#18211E] font-normal mb-5">
            See what is changing<br />
            across the state.
          </h2>

          <p className="text-[13.5px] md:text-[14px] text-[#55635B] leading-relaxed mb-8">
            Elevated rainfall activity is increasing landslide exposure across parts of Kullu and Kangra.
          </p>

          {/* Compact Two-Column Legend Box */}
          <div className="bg-[#EBE9DE]/60 border border-[#D8D5C6] rounded-xl p-4.5 max-w-[320px]">
            <div className="grid grid-cols-2 gap-4 text-[12px] text-[#3A453F]">
              {/* Left Column: Severity Levels */}
              <div className="flex flex-col gap-2 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
                  <span>Critical</span>
                </div>
              </div>

              {/* Right Column: Signal Types */}
              <div className="flex flex-col gap-2 font-medium">
                <div className="flex items-center gap-2">
                  <Droplets size={13} className="text-[#4C89C7] shrink-0" />
                  <span>Rainfall Station</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={12} className="text-[#E36B25] shrink-0" />
                  <span>Landslide Report</span>
                </div>
                <div className="flex items-center gap-2">
                  <Route size={12} className="text-[#2A3430] shrink-0" />
                  <span>Road Incident</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Topographic HP Intelligence Map */}
        <div className="lg:col-span-7">
          <HimachalVectorMap onSelectDistrict={onSelectDistrict} />
        </div>
      </div>
    </div>
  );
}
