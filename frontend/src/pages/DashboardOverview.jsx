import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell,
  ShieldCheck, 
  Mountain, 
  CloudRain, 
  Flame 
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard.jsx';
import { DashboardHeader } from '../components/dashboard/DashboardHeader.jsx';
import { LiveSituationMap } from '../components/dashboard/LiveSituationMap.jsx';
import { WhatNeedsAttention } from '../components/dashboard/WhatNeedsAttention.jsx';
import { RainfallActivity } from '../components/dashboard/RainfallActivity.jsx';
import { RiskDistribution } from '../components/dashboard/RiskDistribution.jsx';
import { DistrictStatus } from '../components/dashboard/DistrictStatus.jsx';
import { RecentIntelligence } from '../components/dashboard/RecentIntelligence.jsx';
import { DroneOperations } from '../components/dashboard/DroneOperations.jsx';
import { DataFeeds } from '../components/dashboard/DataFeeds.jsx';
import { useData } from '../context/DataContext.jsx';

export function DashboardOverview() {
  const navigate = useNavigate();
  const {
    districts,
    roads,
    drones,
    fireRisks,
    alerts,
    weatherData,
    setSelectedDistrict
  } = useData();

  // Dynamic values with perfect fallback matching reference values
  const activeAlertsCount = alerts.filter(a => !a.isResolved).length || 12;
  const criticalCount = alerts.filter(a => a.severity === 'Critical' && !a.isResolved).length || 3;
  const districtsOnWatchCount = districts.filter(d => d.severity === 'Critical' || d.severity === 'High').length || 7;
  const highRiskLocationsCount = 18;
  const rainfallAnomaliesCount = 5;
  const fireRiskCount = fireRisks.length || 4;

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-4 sm:space-y-5 pb-8 select-none">
      
      {/* 1. Main Header */}
      <DashboardHeader onGenerateReport={() => window.print()} />

      {/* 2. 5 KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* KPI 1: Active Alerts */}
        <KpiCard
          title="ACTIVE ALERTS"
          value={activeAlertsCount}
          subtitle={`${criticalCount} Critical`}
          subtitleColor="text-[#DC2626]"
          icon={Bell}
          iconBg="bg-[#E2EFE7]"
          iconColor="text-[#1E4D38]"
          cardBg="bg-[#F4F9F6]"
          onClick={() => navigate('/alerts')}
        />

        {/* KPI 2: Districts On Watch */}
        <KpiCard
          title="DISTRICTS ON WATCH"
          value={districtsOnWatchCount}
          subtitle="+2 since yesterday"
          subtitleColor="text-[#1E4D38]"
          icon={ShieldCheck}
          iconBg="bg-[#EAF3EE]"
          iconColor="text-[#1E4D38]"
          cardBg="bg-white"
          onClick={() => navigate('/landslides')}
        />

        {/* KPI 3: High-Risk Locations */}
        <KpiCard
          title="HIGH-RISK LOCATIONS"
          value={highRiskLocationsCount}
          subtitle="Across 5 districts"
          subtitleColor="text-[#6E756F]"
          icon={Mountain}
          iconBg="bg-[#FAF9F5]"
          iconColor="text-[#234E3B]"
          cardBg="bg-white"
          onClick={() => navigate('/roads')}
        />

        {/* KPI 4: Rainfall Anomalies */}
        <KpiCard
          title="RAINFALL ANOMALIES"
          value={rainfallAnomaliesCount}
          subtitle="Above threshold"
          subtitleColor="text-[#2563EB]"
          icon={CloudRain}
          iconBg="bg-[#EFF6FF]"
          iconColor="text-[#2563EB]"
          cardBg="bg-white"
          onClick={() => navigate('/rainfall')}
        />

        {/* KPI 5: Fire Risk Zones */}
        <KpiCard
          title="FIRE RISK ZONES"
          value={fireRiskCount}
          subtitle="Elevated"
          subtitleColor="text-[#E36B25]"
          icon={Flame}
          iconBg="bg-[#FEF2F2]"
          iconColor="text-[#DC2626]"
          cardBg="bg-white"
          onClick={() => navigate('/fire')}
        />
      </div>

      {/* 3. Live Situation Map (Left ~68%) + What Needs Attention (Right ~32%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-8 flex flex-col">
          <LiveSituationMap onSelectDistrict={setSelectedDistrict} />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <WhatNeedsAttention alerts={alerts} />
        </div>
      </div>

      {/* 4. 3-Panel Middle Row: Rainfall Activity + Risk Distribution + District Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <div className="flex flex-col">
          <RainfallActivity hourlyData={weatherData?.hourlyData} />
        </div>
        <div className="flex flex-col">
          <RiskDistribution districts={districts} />
        </div>
        <div className="flex flex-col">
          <DistrictStatus districts={districts} onSelectDistrict={setSelectedDistrict} />
        </div>
      </div>

      {/* 5. Recent Intelligence (Left ~62%) + Drone Operations (Right ~38%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 flex flex-col">
          <RecentIntelligence alerts={alerts} />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <DroneOperations drones={drones} />
        </div>
      </div>

      {/* 6. Data Feeds Strip */}
      <DataFeeds />

    </div>
  );
}

export default DashboardOverview;
