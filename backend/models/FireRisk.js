import mongoose from 'mongoose';

// FireRisk Model: Forest fire vulnerability, pine needle fuel dryness, and thermal hotspot detections
const fireRiskSchema = new mongoose.Schema({
  zoneName: { type: String, required: true },           // e.g. "Solan Chir Pine Belt - Zone A"
  district: { type: String, required: true },           // e.g. "Solan"
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  riskScore: { type: Number, default: 35 },             // 0 - 100
  severity: { 
    type: String, 
    enum: ['Low', 'Moderate', 'High', 'Critical'], 
    default: 'Low' 
  },
  temperatureC: { type: Number, default: 28 },
  windSpeedKmh: { type: Number, default: 14 },
  humidityPct: { type: Number, default: 42 },
  vegetationDrynessIndex: { type: Number, default: 60 }, // 0 - 100
  smokeDetected: { type: Boolean, default: false },
  droneVerified: { type: Boolean, default: false },
  affectedAreaHectares: { type: Number, default: 0 },
  nearestResponseUnit: { type: String, default: 'Solan Fire Station Unit #3' },
  recommendedAction: { type: String, default: 'Active satellite & watchtower patrol in progress.' }
}, { timestamps: true });

export default mongoose.model('FireRisk', fireRiskSchema);
