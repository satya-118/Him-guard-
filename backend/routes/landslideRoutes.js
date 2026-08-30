import express from 'express';
import { inMemoryStore } from '../data/store.js';
import { calculateLandslideRisk } from '../services/riskEngine.js';

const router = express.Router();

// GET /api/landslides - Ranked list of landslide risk across all HP districts with factor breakdown
router.get('/', (req, res) => {
  try {
    const districts = inMemoryStore.getDistricts();

    const ranked = districts.map((district) => {
      const risk = calculateLandslideRisk({
        rainfall24h: district.rainfall24h,
        slope: district.slope,
        elevation: district.elevation,
        historicalCount: district.historicalIncidentCount,
        soilSaturation: district.soilSaturation,
        riverProximity: district.riverProximity,
        droneEvidence: district.droneEvidence
      });

      return {
        name: district.name,
        headquarters: district.headquarters,
        coordinates: district.coordinates,
        riskScore: risk.riskScore,
        severity: risk.severity,
        recommendedAction: risk.recommendedAction,
        factors: {
          rainfall24h: district.rainfall24h,
          slopeDegrees: district.slope,
          elevationMeters: district.elevation,
          soilSaturationPct: district.soilSaturation,
          riverProximityIndex: district.riverProximity,
          droneEvidenceIndex: district.droneEvidence,
          historicalIncidents: district.historicalIncidentCount
        },
        breakdown: risk.breakdown
      };
    }).sort((a, b) => b.riskScore - a.riskScore);

    res.json({
      success: true,
      formulaExplanation: {
        formula: 'RiskScore = (0.28 * Rainfall) + (0.20 * Slope) + (0.14 * Elevation) + (0.12 * History) + (0.10 * Soil) + (0.08 * River) + (0.08 * Drone)',
        weights: {
          rainfall: '28%',
          slope: '20%',
          elevation: '14%',
          historicalIncidents: '12%',
          soilSaturation: '10%',
          riverProximity: '8%',
          droneEvidence: '8%'
        },
        thresholds: {
          low: '0 - 30 (Routine surveillance)',
          moderate: '31 - 60 (Increased monitoring)',
          high: '61 - 80 (Drone inspection & standby)',
          critical: '81 - 100 (Immediate alert & road restriction)'
        }
      },
      data: ranked
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch landslide rankings', error: error.message });
  }
});

// POST /api/landslides/custom-calculate - Interactive sandbox for testing custom factor inputs
router.post('/custom-calculate', (req, res) => {
  try {
    const {
      rainfall24h = 50,
      slope = 45,
      elevation = 1500,
      historicalCount = 5,
      soilSaturation = 50,
      riverProximity = 50,
      droneEvidence = 20
    } = req.body;

    const result = calculateLandslideRisk({
      rainfall24h: Number(rainfall24h),
      slope: Number(slope),
      elevation: Number(elevation),
      historicalCount: Number(historicalCount),
      soilSaturation: Number(soilSaturation),
      riverProximity: Number(riverProximity),
      droneEvidence: Number(droneEvidence)
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Calculation failed', error: error.message });
  }
});

export default router;
