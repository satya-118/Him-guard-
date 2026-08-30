import React, { useState } from 'react';
import { MapView } from '../components/MapView.jsx';
import { MapPin, X, ShieldAlert, CloudRain, Droplets, Mountain, MountainSnow } from 'lucide-react';
import { formatRainfall } from '../utils/formatters.js';
import { useData } from '../context/DataContext.jsx';

export function MapPage(props) {
  const contextData = useData();
  const districts = props.districts?.length ? props.districts : (contextData?.districts || []);
  const roads = props.roads?.length ? props.roads : (contextData?.roads || []);
  const drones = props.drones?.length ? props.drones : (contextData?.drones || []);
  const fireRisks = props.fireRisks?.length ? props.fireRisks : (contextData?.fireRisks || []);
  const alerts = props.alerts?.length ? props.alerts : (contextData?.alerts || []);
  const onSelectDistrict = props.onSelectDistrict || contextData?.setSelectedDistrict;

  const [selected, setSelected] = useState(null);

  const handleSelect = (d) => {
    setSelected(d);
    if (onSelectDistrict) onSelectDistrict(d);
  };

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-bold text-[#18211E] tracking-tight leading-tight">
            Interactive Geospatial Risk Radar
          </h1>
          <p className="text-[#7A827D] text-[13px] font-medium mt-0.5">
            Full GIS map telemetry featuring district risk layers, highway blockages, live drone feeds, and thermal hotspots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-white border border-[#EAE8E1] rounded-xl text-[12px] font-medium text-[#7A827D] shadow-sm">
            Click any marker for telemetry inspection
          </div>
        </div>
      </div>

      {/* Map & Sidebar Grid */}
      <div className={`grid ${selected ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'} gap-5`}>
        
        {/* Main Map Card */}
        <div className={`${selected ? 'lg:col-span-8' : 'w-full'} bg-white border border-[#EAE8E1] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col`}>
          <div className="min-h-[640px] rounded-xl overflow-hidden border border-[#EAE8E1] relative">
            <MapView
              districts={districts}
              roads={roads}
              drones={drones}
              fireRisks={fireRisks}
              alerts={alerts}
              onSelectDistrict={handleSelect}
              height="100%"
            />
          </div>
        </div>

        {/* Selected District Telemetry Inspector */}
        {selected && (
          <div className="lg:col-span-4 bg-white border border-[#EAE8E1] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start pb-4 border-b border-[#EAE8E1] mb-4">
                <div>
                  <h3 className="text-[17px] font-bold text-[#18211E]">{selected.name} Inspection</h3>
                  <p className="text-[11px] text-[#7A827D]">Headquarters: {selected.headquarters}</p>
                </div>
                <button 
                  onClick={() => setSelected(null)}
                  className="p-1 rounded-lg hover:bg-[#F5F4EE] text-[#7A827D] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3.5 text-[13px]">
                <div className="flex justify-between items-center">
                  <span className="text-[#7A827D]">Severity Rating:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    selected.severity === 'Critical' 
                      ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' 
                      : (selected.severity === 'High' ? 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
                  }`}>
                    {selected.severity} ({selected.riskScore}/100)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl text-[11px]">
                  <div>
                    <span className="text-[#7A827D] flex items-center gap-1">
                      <CloudRain size={12} className="text-[#2563EB]" />
                      <span>24h Rain:</span>
                    </span>
                    <strong className="text-[#18211E] text-[13px]">{formatRainfall(selected.rainfall24h)}</strong>
                  </div>
                  <div>
                    <span className="text-[#7A827D] flex items-center gap-1">
                      <Mountain size={12} className="text-[#234E3B]" />
                      <span>Terrain Slope:</span>
                    </span>
                    <strong className="text-[#18211E] text-[13px]">{selected.slope}°</strong>
                  </div>
                  <div className="mt-2">
                    <span className="text-[#7A827D] flex items-center gap-1">
                      <MountainSnow size={12} className="text-[#789177]" />
                      <span>Elevation:</span>
                    </span>
                    <strong className="text-[#18211E] text-[13px]">{selected.elevation}m</strong>
                  </div>
                  <div className="mt-2">
                    <span className="text-[#7A827D] flex items-center gap-1">
                      <Droplets size={12} className="text-[#2563EB]" />
                      <span>Saturation:</span>
                    </span>
                    <strong className="text-[#18211E] text-[13px]">{selected.soilSaturation}%</strong>
                  </div>
                </div>

                <div className="mt-3 bg-[#F8F8F5] border border-[#EAE8E1] p-3.5 rounded-xl">
                  <div className="text-[10px] font-bold text-[#1E4D38] uppercase tracking-wider mb-1">
                    Standard Response Protocol:
                  </div>
                  <p className="text-[11px] text-[#4A534D] leading-relaxed">
                    {selected.recommendedAction}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="w-full mt-4 bg-[#F8F8F5] hover:bg-[#EAE8E1] text-[#18211E] border border-[#E5E3D8] py-2 rounded-xl text-[12px] font-semibold transition-colors"
            >
              Close Inspector
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default MapPage;
