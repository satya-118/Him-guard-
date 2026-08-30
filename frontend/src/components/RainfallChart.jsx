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

export function RainfallChart({ hourlyData = [], minimal = true }) {
  const chartData = [
    { time: '00:00', rain: 18 },
    { time: '04:00', rain: 26 },
    { time: '08:00', rain: 42 },
    { time: '12:00', rain: 78 },
    { time: '16:00', rain: 52 },
    { time: '20:00', rain: 62 }
  ];

  return (
    <div className="flex flex-col h-full w-full select-none">
      
      {/* Legend */}
      <div className="flex items-center justify-end gap-3 text-[11px] font-medium text-[#18211E] mb-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#2563EB] rounded-[2px]"></span>
          <span>Current: 62 mm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#1E4D38] rounded-[2px]"></span>
          <span>Peak: 78 mm</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#4A534D]">
          <span className="w-3.5 h-0 border-t border-dashed border-[#22C55E]"></span>
          <span>Normal: 35 mm</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[145px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="rainAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0EFEA" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#8E958F" 
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#EAE8E1' }}
              dy={6}
            />
            <YAxis 
              stroke="#8E958F" 
              fontSize={10} 
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
            {/* Normal baseline threshold */}
            <ReferenceLine y={35} stroke="#22C55E" strokeDasharray="4 4" strokeWidth={1.5} />
            
            <Area 
              type="monotone" 
              dataKey="rain" 
              stroke="#2563EB" 
              strokeWidth={2.2}
              fillOpacity={1} 
              fill="url(#rainAreaGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
