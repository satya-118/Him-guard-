import mongoose from 'mongoose';

// Alert Model: Disaster early warnings, cloudbursts, landslide advisories
const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hazardType: { 
    type: String, 
    enum: ['Landslide', 'Flash Flood', 'Cloudburst', 'Road Block', 'Forest Fire', 'Heavy Rainfall', 'Avalanche'], 
    default: 'Landslide' 
  },
  severity: { 
    type: String, 
    enum: ['Low', 'Moderate', 'High', 'Critical'], 
    default: 'Moderate' 
  },
  riskScore: { type: Number, default: 50 },
  district: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, default: 31.8 },
    longitude: { type: Number, default: 77.2 }
  },
  cause: { type: String, default: 'Heavy precipitation exceeding threshold' },
  action: { type: String, default: 'Issue travel advisory and alert local emergency teams' },
  createdAtLabel: { type: String, default: 'Just now' },
  isRead: { type: Boolean, default: false },
  isResolved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Alert', alertSchema);
