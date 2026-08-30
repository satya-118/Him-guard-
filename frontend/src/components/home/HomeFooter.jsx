import React from 'react';

export function HomeFooter() {
  return (
    <footer className="w-full pt-4 pb-8 border-t border-[#E5E3D8] text-xs text-[#6E756F]">
      <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Left */}
        <div className="text-center sm:text-left">
          <div className="font-bold text-[#18211E] text-[13.5px]">HIM-Guard</div>
          <div className="text-[11px] text-[#6E756F]">Himachal Pradesh Disaster Intelligence</div>
        </div>

        {/* Copyright & Links Right */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-[11.5px]">
          <span>© 2026 HIM-Guard. All rights reserved.</span>
          <a href="#privacy" className="hover:text-[#19382B] transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-[#19382B] transition-colors">Terms</a>
          <a href="#contact" className="hover:text-[#19382B] transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

