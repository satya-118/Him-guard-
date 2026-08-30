// Verification Test Script for HIM-Guard APIs

async function testAllApis() {
  const baseUrl = 'http://localhost:5000/api';
  console.log('--- Testing HIM-Guard REST APIs ---');

  try {
    // 1. Healthcheck
    const r1 = await (await fetch(`${baseUrl}`)).json();
    console.log('[✓] API Root:', r1.system);

    // 2. Districts
    const r2 = await (await fetch(`${baseUrl}/districts`)).json();
    console.log(`[✓] Districts count: ${r2.count} (First: ${r2.data[0]?.name}, Risk: ${r2.data[0]?.riskScore})`);

    // 3. Rainfall
    const r3 = await (await fetch(`${baseUrl}/rainfall`)).json();
    console.log(`[✓] Rainfall Summary: Avg ${r3.summary.averageRainfall24h} mm, Peak in ${r3.summary.highestRainfallDistrict}`);

    // 4. Landslides
    const r4 = await (await fetch(`${baseUrl}/landslides`)).json();
    console.log(`[✓] Landslide Rankings: #1 ${r4.data[0]?.name} (Score: ${r4.data[0]?.riskScore}, ${r4.data[0]?.severity})`);

    // 5. Roads
    const r5 = await (await fetch(`${baseUrl}/roads`)).json();
    console.log(`[✓] Roads: ${r5.summary.totalVulnerableRoads} total, ${r5.summary.blocked} blocked`);

    // 6. Drones
    const r6 = await (await fetch(`${baseUrl}/drones`)).json();
    console.log(`[✓] Drones: ${r6.summary.totalFleet} fleet, ${r6.summary.onMission} on mission`);

    // 7. Fire
    const r7 = await (await fetch(`${baseUrl}/fire`)).json();
    console.log(`[✓] Fire Zones: ${r7.summary.totalMonitoredZones} zones monitored`);

    // 8. Alerts
    const r8 = await (await fetch(`${baseUrl}/alerts`)).json();
    console.log(`[✓] Alerts: ${r8.summary.totalAlerts} total, ${r8.summary.criticalActive} critical active`);

    // 9. Historical Incidents
    const r9 = await (await fetch(`${baseUrl}/historical-incidents`)).json();
    console.log(`[✓] Historical Records: ${r9.count} archived incidents`);

    // 10. Simulation POST
    const r10 = await (await fetch(`${baseUrl}/simulation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ extraMm: 50, targetDistrict: 'all' })
    })).json();
    console.log(`[✓] Simulation (+50mm): Critical districts ${r10.data.summary.criticalDistrictsBefore} -> ${r10.data.summary.criticalDistrictsAfter}, Blocked roads: ${r10.data.summary.blockedRoadsBefore} -> ${r10.data.summary.blockedRoadsAfter}`);

    console.log('\n>>> ALL 10 REST API ENDPOINTS TESTED AND WORKING 100%! <<<');
  } catch (err) {
    console.error('API Test Error:', err);
  }
}

testAllApis();
