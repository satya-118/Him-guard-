import express from 'express';
import { getDistrictWeather, getAllDistrictsWeather } from '../services/weatherService.js';
import { inMemoryStore } from '../data/store.js';

const router = express.Router();

// GET /api/rainfall - Get weather & rainfall overview for all 12 districts
router.get('/', async (req, res) => {
  try {
    const districtsWeather = await getAllDistrictsWeather();

    // Summary KPIs
    const totalRainfall = districtsWeather.reduce((sum, d) => sum + (d.rainfall24h || 0), 0);
    const avgRainfall = Math.round(totalRainfall / districtsWeather.length);
    const highestRainDistrict = [...districtsWeather].sort((a, b) => b.rainfall24h - a.rainfall24h)[0];

    res.json({
      success: true,
      summary: {
        averageRainfall24h: avgRainfall,
        highestRainfallDistrict: highestRainDistrict?.name || 'Mandi',
        highestRainfallMm: highestRainDistrict?.rainfall24h || 0,
        activeRainDistrictsCount: districtsWeather.filter(d => d.rainfall24h > 10).length,
        extremeWarningCount: districtsWeather.filter(d => d.rainfall24h >= 100).length
      },
      data: districtsWeather
    });
  } catch (error) {
    console.error('Error fetching rainfall overview:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch weather data', error: error.message });
  }
});

// GET /api/rainfall/:district - Get detailed hourly and 7-day forecast for a single district
router.get('/:district', async (req, res) => {
  try {
    const { district } = req.params;
    const targetDistrict = inMemoryStore.getDistrictByName(district);

    if (!targetDistrict) {
      return res.status(404).json({ success: false, message: `District '${district}' not found` });
    }

    const weather = await getDistrictWeather(
      targetDistrict.name, 
      targetDistrict.coordinates, 
      targetDistrict.rainfall24h
    );

    res.json({
      success: true,
      data: {
        ...targetDistrict,
        ...weather
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch district rainfall details', error: error.message });
  }
});

export default router;
