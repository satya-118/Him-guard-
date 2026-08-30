import React from 'react';

export function DataFeeds() {
  const feeds = [
    { name: 'Weather', status: 'Operational' },
    { name: 'Rainfall', status: 'Operational' },
    { name: 'Satellite', status: 'Operational' },
    { name: 'Road Monitoring', status: 'Operational' },
    { name: 'Drone Network', status: 'Operational' }
  ];

  return (
    <div className="bg-white border border-[#EAE8E1] rounded-[18px] px-6 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-4 select-none">
      
      {/* Title */}
      <div className="text-[13px] font-bold text-[#18211E] tracking-tight shrink-0 mr-2">
        Data Feeds
      </div>

      {/* Feed Indicators */}
      <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-[12px]">
        {feeds.map((feed) => (
          <div key={feed.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0"></span>
            <span className="font-semibold text-[#18211E]">{feed.name}</span>
            <span className="text-[#6E756F] font-normal text-[11.5px]">{feed.status}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

