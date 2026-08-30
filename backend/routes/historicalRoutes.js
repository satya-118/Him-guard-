import express from 'express';
import mongoose from 'mongoose';
import HistoricalIncident from '../models/HistoricalIncident.js';
import { inMemoryStore } from '../data/store.js';

const router = express.Router();

// GET /api/historical-incidents - Get historical disaster records with optional query filters
router.get('/', async (req, res) => {
  try {
    const { district, hazardType, year, search } = req.query;
    let incidents;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (district) query.district = new RegExp(district, 'i');
      if (hazardType) query.hazardType = new RegExp(hazardType, 'i');
      if (year) query.year = Number(year);
      if (search) {
        query.$or = [
          { location: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { roadAffected: new RegExp(search, 'i') }
        ];
      }

      incidents = await HistoricalIncident.find(query).sort({ date: -1 }).lean();
      if (!incidents || incidents.length === 0) {
        incidents = inMemoryStore.getHistoricalIncidents();
      }
    } else {
      incidents = inMemoryStore.getHistoricalIncidents();
    }

    // Filter in-memory if query params present
    let filtered = incidents;
    if (district) {
      filtered = filtered.filter(i => i.district.toLowerCase().includes(district.toLowerCase()));
    }
    if (hazardType) {
      filtered = filtered.filter(i => i.hazardType.toLowerCase().includes(hazardType.toLowerCase()));
    }
    if (year) {
      filtered = filtered.filter(i => Number(i.year) === Number(year));
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(i => 
        (i.location && i.location.toLowerCase().includes(s)) ||
        (i.description && i.description.toLowerCase().includes(s)) ||
        (i.roadAffected && i.roadAffected.toLowerCase().includes(s))
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch historical incidents', error: error.message });
  }
});

// GET /api/historical-incidents/stats - Aggregate stats on casualties, most affected districts, and years
router.get('/stats', async (req, res) => {
  try {
    const incidents = inMemoryStore.getHistoricalIncidents();

    const totalIncidents = incidents.length;
    const totalCasualties = incidents.reduce((sum, i) => sum + (i.casualties || 0), 0);
    const avgRainfallAtEvent = Math.round(incidents.reduce((sum, i) => sum + (i.rainfall || 0), 0) / totalIncidents);

    // District breakdown
    const districtCount = {};
    incidents.forEach(i => {
      districtCount[i.district] = (districtCount[i.district] || 0) + 1;
    });

    // Hazard type breakdown
    const hazardCount = {};
    incidents.forEach(i => {
      hazardCount[i.hazardType] = (hazardCount[i.hazardType] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        totalIncidents,
        totalCasualties,
        avgRainfallAtEvent,
        districtBreakdown: districtCount,
        hazardBreakdown: hazardCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to calculate historical stats', error: error.message });
  }
});

export default router;
