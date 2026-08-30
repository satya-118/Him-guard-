import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, MountainSnow, CloudRain, Flame, Map, Route, Plane } from 'lucide-react';

export function HomeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [intelOpen, setIntelOpen] = useState(false);
  const [monitorOpen, setMonitorOpen] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <header className="w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E5E3D8] sticky top-0 z-50 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-[1520px] mx-auto flex items-center justify-between">
        {/* Brand Left */}
        <Link 
          to="/"
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-lg bg-[#19382B] flex items-center justify-center text-white shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
            </svg>
          </div>
          <div>
            <div className="font-sans font-extrabold text-[1.15rem] text-[#18211E] tracking-tight leading-none">
              HIM-Guard
            </div>
            <div className="text-[10.5px] text-[#6E756F] font-medium tracking-wide mt-0.5">
              Himachal Pradesh Disaster Intelligence
            </div>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#444E47]">
          <Link
            to="/"
            className={`transition-colors relative py-1 ${isHome ? 'text-[#19382B] font-bold' : 'hover:text-[#19382B]'}`}
          >
            Home
            {isHome && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#19382B] rounded-full"></span>
            )}
          </Link>

          {/* Intelligence Dropdown */}
          <div className="relative" onMouseLeave={() => setIntelOpen(false)}>
            <button
              onClick={() => setIntelOpen(!intelOpen)}
              onMouseEnter={() => setIntelOpen(true)}
              className="flex items-center gap-1 hover:text-[#19382B] transition-colors py-1"
            >
              <span>Intelligence</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${intelOpen ? 'rotate-180' : ''}`} />
            </button>

            {intelOpen && (
              <div 
                className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-lg border border-[#E5E3D8] py-2 z-50 animate-fadeIn"
                onMouseEnter={() => setIntelOpen(true)}
              >
                <Link
                  to="/landslides"
                  onClick={() => setIntelOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F4EE] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <MountainSnow size={14} className="text-[#19382B]" />
                  <span>Landslide Risk Engine</span>
                </Link>
                <Link
                  to="/rainfall"
                  onClick={() => setIntelOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F4EE] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <CloudRain size={14} className="text-[#2563EB]" />
                  <span>Rainfall & Meteorology</span>
                </Link>
                <Link
                  to="/fire"
                  onClick={() => setIntelOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F4EE] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Flame size={14} className="text-[#E36B25]" />
                  <span>Forest Fire Intelligence</span>
                </Link>
                <Link
                  to="/map"
                  onClick={() => setIntelOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F4EE] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Map size={14} className="text-[#19382B]" />
                  <span>Geospatial State Radar</span>
                </Link>
              </div>
            )}
          </div>

          {/* Monitoring Dropdown */}
          <div className="relative" onMouseLeave={() => setMonitorOpen(false)}>
            <button
              onClick={() => setMonitorOpen(!monitorOpen)}
              onMouseEnter={() => setMonitorOpen(true)}
              className="flex items-center gap-1 hover:text-[#19382B] transition-colors py-1"
            >
              <span>Monitoring</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${monitorOpen ? 'rotate-180' : ''}`} />
            </button>

            {monitorOpen && (
              <div 
                className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-lg border border-[#E5E3D8] py-2 z-50 animate-fadeIn"
                onMouseEnter={() => setMonitorOpen(true)}
              >
                <Link
                  to="/roads"
                  onClick={() => setMonitorOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F4EE] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Route size={14} className="text-[#D8A32A]" />
                  <span>Highways & Mountain Passes</span>
                </Link>
                <Link
                  to="/drones"
                  onClick={() => setMonitorOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F4EE] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Plane size={14} className="text-[#19382B]" />
                  <span>Autonomous UAV Fleet</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/alerts"
            className="hover:text-[#19382B] transition-colors py-1"
          >
            Alerts
          </Link>

          <Link
            to="/history"
            className="hover:text-[#19382B] transition-colors py-1"
          >
            History
          </Link>

          <Link
            to="/simulation"
            className="hover:text-[#19382B] transition-colors py-1"
          >
            Simulation
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3.5">
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAF0E9] border border-[#D5E0D4] text-[#19382B] text-[11.5px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>LIVE</span>
          </div>

          {/* Open Dashboard Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#19382B] hover:bg-[#234E3B] text-white text-[13px] font-medium shadow-sm transition-all duration-200 hover:shadow"
          >
            <span>Open Dashboard</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
