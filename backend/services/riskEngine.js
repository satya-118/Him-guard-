// HIM-Guard Explainable Risk Engine
// Computes transparent, easy-to-explain Landslide and Fire Risk Scores for Himachal Pradesh.

/**
 * Maps a numeric risk score (0-100) to a severity category and standard recommended action.
 * @param {number} score - Calculated score between 0 and 100
 * @returns {object} { severity, color, action }
 */
export function getSeverityAndAction(score) {
  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));

  if (boundedScore <= 30) {
    return {
      severity: 'Low',
      color: '#10b981', // Emerald green
      action: 'Routine weather & geological surveillance. Normal traffic operations.'
    };
  } else if (boundedScore <= 60) {
    return {
      severity: 'Moderate',
      color: '#f59e0b', // Amber yellow
      action: 'Increase patrol frequency; monitor vulnerable culverts and slope drainage.'
    };
  } else if (boundedScore <= 80) {
    return {
      severity: 'High',
      color: '#f97316', // Orange
      action: 'Deploy drone inspection, inspect slope retaining walls, and place SDRF on standby.'
    };
  } else {
    return {
      severity: 'Critical',
      color: '#ef4444', // Red
      action: 'IMMEDIATE ADVISORY: Restrict vulnerable road corridors, issue riverbank alerts, mobilize emergency response.'
    };
  }
}

/**
 * Calculates Landslide Risk Score using a multi-factor weighted sum.
 * Factors are normalized on a 0-100 scale:
 * 1. Rainfall (Weight: 28%) - Primary trigger for slope failure
 * 2. Slope Gradient (Weight: 20%) - Terrain inclination
 * 3. Elevation & Geology (Weight: 14%) - Mountain altitude fragility
 * 4. Historical Incident Frequency (Weight: 12%) - Past slip recurrence
 * 5. Soil Moisture Saturation (Weight: 10%) - Hydro-geological saturation
 * 6. River / Drainage Proximity (Weight: 8%) - Toe erosion by mountain rivers
 * 7. Drone Telemetry Evidence (Weight: 8%) - Optical & thermal rock displacement
 *
 * @param {object} factors
 * @returns {object} { riskScore, severity, recommendedAction, breakdown }
 */
export function calculateLandslideRisk(factors) {
  const {
    rainfall24h = 0,
    slope = 45,
    elevation = 1500,
    historicalCount = 5,
    soilSaturation = 50,
    riverProximity = 50,
    droneEvidence = 20
  } = factors;

  // 1. Normalize Rainfall (0 mm = 0, 150 mm+ = 100)
  const rainfallFactor = Math.min(100, (rainfall24h / 150) * 100);

  // 2. Normalize Slope (0 deg = 0, 75 deg+ = 100)
  const slopeFactor = Math.min(100, (slope / 75) * 100);

  // 3. Normalize Elevation (0 m = 0, 3500 m+ = 100)
  const elevationFactor = Math.min(100, (elevation / 3500) * 100);

  // 4. Normalize Historical Incident Count (0 = 0, 25+ = 100)
  const historyFactor = Math.min(100, (historicalCount / 25) * 100);

  // 5. Soil Saturation (already 0-100)
  const soilFactor = Math.min(100, Math.max(0, soilSaturation));

  // 6. River Proximity Risk (already 0-100)
  const riverFactor = Math.min(100, Math.max(0, riverProximity));

  // 7. Drone Evidence Risk (already 0-100)
  const droneFactor = Math.min(100, Math.max(0, droneEvidence));

  // Calculate Weighted Score
  const rawScore = 
    (0.28 * rainfallFactor) +
    (0.20 * slopeFactor) +
    (0.14 * elevationFactor) +
    (0.12 * historyFactor) +
    (0.10 * soilFactor) +
    (0.08 * riverFactor) +
    (0.08 * droneFactor);

  const riskScore = Math.max(0, Math.min(100, Math.round(rawScore)));
  const { severity, action } = getSeverityAndAction(riskScore);

  return {
    riskScore,
    severity,
    recommendedAction: action,
    breakdown: {
      rainfallContribution: Math.round(0.28 * rainfallFactor),
      slopeContribution: Math.round(0.20 * slopeFactor),
      elevationContribution: Math.round(0.14 * elevationFactor),
      historyContribution: Math.round(0.12 * historyFactor),
      soilContribution: Math.round(0.10 * soilFactor),
      riverContribution: Math.round(0.08 * riverFactor),
      droneContribution: Math.round(0.08 * droneFactor)
    }
  };
}

/**
 * Calculates Forest Fire Risk Score based on ambient temperature, wind, dryness, and drone reports.
 * @param {object} factors
 * @returns {object} { riskScore, severity, recommendedAction }
 */
export function calculateFireRisk(factors) {
  const {
    temperatureC = 25,
    windSpeedKmh = 10,
    humidityPct = 50,
    vegetationDryness = 50,
    smokeDetected = false,
    droneVerified = false
  } = factors;

  // Temperature factor (15C = 0, 45C = 100)
  const tempFactor = Math.min(100, Math.max(0, ((temperatureC - 15) / 30) * 100));

  // Wind speed factor (0 km/h = 0, 40 km/h = 100)
  const windFactor = Math.min(100, (windSpeedKmh / 40) * 100);

  // Inverted humidity factor (100% humidity = 0 risk, 20% = 100 risk)
  const drynessFactor = Math.min(100, Math.max(0, ((100 - humidityPct) / 80) * 100));

  // Vegetation needle dryness (0-100)
  const vegFactor = Math.min(100, Math.max(0, vegetationDryness));

  // Bonus for smoke/drone confirmation
  const opticalBonus = (smokeDetected ? 15 : 0) + (droneVerified ? 15 : 0);

  const rawScore = 
    (0.30 * tempFactor) +
    (0.25 * windFactor) +
    (0.25 * drynessFactor) +
    (0.20 * vegFactor) +
    opticalBonus;

  const riskScore = Math.max(0, Math.min(100, Math.round(rawScore)));
  const { severity } = getSeverityAndAction(riskScore);

  let action = 'Routine satellite & forest watchtower monitoring.';
  if (severity === 'Moderate') {
    action = 'Alert local forest beats; keep emergency water bowsers on standby.';
  } else if (severity === 'High') {
    action = 'Mobilize rapid fire tender crew and establish firebreak lines.';
  } else if (severity === 'Critical') {
    action = 'EMERGENCY: Dispatch multi-unit fire suppression teams and airborne drone thermal trackers.';
  }

  return {
    riskScore,
    severity,
    recommendedAction: action
  };
}
