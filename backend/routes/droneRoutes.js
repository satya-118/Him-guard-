import express from 'express';
import mongoose from 'mongoose';
import Drone from '../models/Drone.js';
import { inMemoryStore } from '../data/store.js';

const router = express.Router();

// GET /api/drones - Get all surveillance drone fleet status & live telemetry
router.get('/', async (req, res) => {
  try {
    let drones;

    if (mongoose.connection.readyState === 1) {
      drones = await Drone.find().lean();
      if (!drones || drones.length === 0) {
        drones = inMemoryStore.getDrones();
      }
    } else {
      drones = inMemoryStore.getDrones();
    }

    const onMissionCount = drones.filter(d => d.status === 'On Mission').length;
    const availableCount = drones.filter(d => d.status === 'Available').length;
    const returningCount = drones.filter(d => d.status === 'Returning').length;

    res.json({
      success: true,
      summary: {
        totalFleet: drones.length,
        onMission: onMissionCount,
        available: availableCount,
        returning: returningCount,
        avgBattery: Math.round(drones.reduce((sum, d) => sum + d.battery, 0) / drones.length)
      },
      data: drones
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch drones', error: error.message });
  }
});

// POST /api/drones/:droneId/dispatch - Dispatch a drone to a new district / hazard zone
router.post('/:droneId/dispatch', async (req, res) => {
  try {
    const { droneId } = req.params;
    const { district, mission, missionPriority, reason } = req.body;

    const updates = {
      status: 'On Mission',
      assignedDistrict: district || 'Kullu',
      mission: mission || 'Emergency Hillside Fissure & Drainage Scan',
      missionPriority: missionPriority || 'High',
      missionReason: reason || 'Rapid emergency dispatch from HIM-Guard Command',
      inspectionStatus: 'Dispatched - En Route to Target Coordinates',
      lastPatrol: 'Just now'
    };

    let updatedDrone;
    if (mongoose.connection.readyState === 1) {
      updatedDrone = await Drone.findOneAndUpdate(
        { droneId: new RegExp(`^${droneId}$`, 'i') },
        { $set: updates },
        { new: true }
      );
    }

    const storeDrone = inMemoryStore.updateDrone(droneId, updates);
    if (!updatedDrone) updatedDrone = storeDrone;

    if (!updatedDrone) {
      return res.status(404).json({ success: false, message: `Drone '${droneId}' not found` });
    }

    res.json({
      success: true,
      message: `Drone ${droneId} (${updatedDrone.name}) successfully dispatched to ${updates.assignedDistrict}!`,
      data: updatedDrone
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Drone dispatch failed', error: error.message });
  }
});

export default router;
