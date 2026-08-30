import express from 'express';
import mongoose from 'mongoose';
import FireRisk from '../models/FireRisk.js';
import { inMemoryStore } from '../data/store.js';
import { calculateFireRisk } from '../services/riskEngine.js';

const router = express.Router();

// GET /api/fire - Get all forest fire vulnerability zones & live fire risk scores
router.get('/', async (req, res) => {
  try {
    let zones;

    if (mongoose.connection.readyState === 1) {
      zones = await FireRisk.find().sort({ riskScore: -1 }).lean();
      if (!zones || zones.length === 0) {
        zones = inMemoryStore.getFireRisks();
      }
    } else {
      zones = inMemoryStore.getFireRisks();
    }

    // Ensure calculated metrics
    const updatedZones = zones.map((zone) => {
      const risk = calculateFireRisk({
        temperatureC: zone.temperatureC,
        windSpeedKmh: zone.windSpeedKmh,
        humidityPct: zone.humidityPct,
        vegetationDryness: zone.vegetationDrynessIndex,
        smokeDetected: zone.smokeDetected,
        droneVerified: zone.droneVerified
      });

      return {
        ...zone,
        riskScore: risk.riskScore,
        severity: risk.severity,
        recommendedAction: zone.recommendedAction || risk.recommendedAction
      };
    });

    const activeSmokeZones = updatedZones.filter(z => z.smokeDetected).length;
    const highRiskZones = updatedZones.filter(z => z.severity === 'High' || z.severity === 'Critical').length;

    res.json({
      success: true,
      summary: {
        totalMonitoredZones: updatedZones.length,
        activeSmokeHotspots: activeSmokeZones,
        highRiskFireBelts: highRiskZones,
        pineForestDrynessAverage: Math.round(
          updatedZones.reduce((sum, z) => sum + (z.vegetationDrynessIndex || 0), 0) / updatedZones.length
        )
      },
      data: updatedZones
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch fire risk data', error: error.message });
  }
});

export default router;
