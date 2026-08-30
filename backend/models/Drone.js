import mongoose from 'mongoose';

// Drone Model: Autonomous surveillance and inspection drones across HP mountain corridors
const droneSchema = new mongoose.Schema({
  droneId: { type: String, required: true, unique: true }, // e.g. "DRONE-01"
  name: { type: String, required: true },                 // e.g. "Trishul-I"
  model: { type: String, default: 'DJI Matrice 300 RTK - Thermal' },
  status: { 
    type: String, 
    enum: ['Available', 'On Mission', 'Returning', 'Offline', 'Maintenance'], 
    default: 'Available' 
  },
  battery: { type: Number, default: 85 }, // Percentage
  signalStrength: { type: String, default: 'Strong (94%)' },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  altitudeMeters: { type: Number, default: 420 },
  assignedDistrict: { type: String, default: 'Kullu' },
  mission: { type: String, default: 'Slope Stability Aerial Survey' },
  missionPriority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Critical'], 
    default: 'Medium' 
  },
  missionReason: { type: String, default: 'Heavy rain detected on upstream mountain ridge' },
  detectionEvidence: { type: String, default: 'No severe fissures observed. Soil moisture elevated.' },
  inspectionStatus: { type: String, default: 'Patrol 65% Completed' },
  lastPatrol: { type: String, default: '15 mins ago' }
}, { timestamps: true });

export default mongoose.model('Drone', droneSchema);
