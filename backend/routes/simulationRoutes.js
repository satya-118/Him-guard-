import express from 'express';
import { runRainfallSimulation } from '../services/simulationService.js';
import { inMemoryStore } from '../data/store.js';

const router = express.Router();

// POST /api/simulation - Run emergency rainfall surge simulation
router.post('/', (req, res) => {
  try {
    const { extraMm = 50, targetDistrict = 'all' } = req.body;

    const currentDistricts = inMemoryStore.getDistricts();
    const currentRoads = inMemoryStore.getRoads();

    const simulationResult = runRainfallSimulation(
      extraMm,
      targetDistrict,
      currentDistricts,
      currentRoads
    );

    res.json({
      success: true,
      data: simulationResult
    });
  } catch (error) {
    console.error('Simulation execution error:', error);
    res.status(500).json({ success: false, message: 'Simulation failed to run', error: error.message });
  }
});

export default router;
