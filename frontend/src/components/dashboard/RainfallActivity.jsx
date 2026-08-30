import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export function RainfallActivity({ hourlyData }) {
  const navigate = useNavigate();

  // Data matching reference image: peaks around 12:00 at 78 mm, current at 62 mm
  const chartData = [
    { time: '00:00', rain: 18 },
    { time: '04:00', rain: 26 },
    { time: '08:00', rain: 42 },
    { time: '12:00', rain: 78 },
    { time: '16:00', rain: 52 },
    { time: '20:00', rain: 62 }
  ];

  return (
    <div 
      onClick={() => navigate('/rainfall')}
      className="bg-white border border-[#EAE8E1] rounded-[20px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col h-full cursor-pointer hover:shadow-xs transition-all select-none"
    >
      
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 mb-2 border-b border-[#F0EFEA]">
        <div>
          <h3 className="font-serif text-[17px] font-bold text-[#18211E] tracking-tight">
            Rainfall Activity
          </h3>
          <p className="text-[11.5px] text-[#6E756F] font-medium">
            Last 24 hours
          </p>
        </div>

        {/* Legend matching reference image */}
        <div className="flex items-center gap-2.5 text-[10.5px] font-medium text-[#18211E] flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#2563EB] rounded-[2px] shrink-0"></span>
            <span>Current: 62 mm</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#19382B] rounded-[2px] shrink-0"></span>
            <span>Peak: 78 mm</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#4A534D]">
            <span className="w-3.5 h-0 border-t border-dashed border-[#22C55E] shrink-0"></span>
            <span>Normal: 35 mm</span>
          </div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="flex-1 min-h-[145px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 8, left: -26, bottom: 0 }}>
            <defs>
              <linearGradient id="rainAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F2EC" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#8E958F" 
              fontSize={9.5}
              tickLine={false}
              axisLine={{ stroke: '#EAE8E1' }}
              dy={5}
            />
            <YAxis 
              stroke="#8E958F" 
              fontSize={9.5} 
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
              tickFormatter={(val) => `${val} mm`} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#E5E3D8',
                borderRadius: '8px',
                color: '#18211E',
                fontSize: '11px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              formatter={(value) => [`${value} mm`, 'Precipitation']}
            />
            <ReferenceLine y={35} stroke="#22C55E" strokeDasharray="3 3" strokeWidth={1.5} />
            
            <Area 
              type="monotone" 
              dataKey="rain" 
              stroke="#2563EB" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#rainAreaGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

