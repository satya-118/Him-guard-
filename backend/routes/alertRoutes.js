import express from 'express';
import mongoose from 'mongoose';
import Alert from '../models/Alert.js';
import { inMemoryStore } from '../data/store.js';

const router = express.Router();

// GET /api/alerts - Get all disaster alerts (filter by severity or resolution)
router.get('/', async (req, res) => {
  try {
    const { severity, isResolved } = req.query;
    let alerts;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (severity) query.severity = severity;
      if (isResolved !== undefined) query.isResolved = isResolved === 'true';

      alerts = await Alert.find(query).sort({ createdAt: -1, riskScore: -1 }).lean();
      if (!alerts || alerts.length === 0) {
        alerts = inMemoryStore.getAlerts();
      }
    } else {
      alerts = inMemoryStore.getAlerts();
    }

    // Filter in-memory if query params present
    let filteredAlerts = alerts;
    if (severity) {
      filteredAlerts = filteredAlerts.filter(a => a.severity.toLowerCase() === severity.toLowerCase());
    }
    if (isResolved !== undefined) {
      const resolvedBool = isResolved === 'true';
      filteredAlerts = filteredAlerts.filter(a => Boolean(a.isResolved) === resolvedBool);
    }

    const criticalCount = alerts.filter(a => a.severity === 'Critical' && !a.isResolved).length;
    const highCount = alerts.filter(a => a.severity === 'High' && !a.isResolved).length;
    const unreadCount = alerts.filter(a => !a.isRead).length;

    res.json({
      success: true,
      summary: {
        totalAlerts: alerts.length,
        criticalActive: criticalCount,
        highActive: highCount,
        unread: unreadCount
      },
      data: filteredAlerts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch alerts', error: error.message });
  }
});

// POST /api/alerts - Create a new disaster alert / emergency broadcast
router.post('/', async (req, res) => {
  try {
    const {
      title,
      hazardType = 'Landslide',
      severity = 'Moderate',
      riskScore = 50,
      district = 'Shimla',
      location = 'Mountain Corridor',
      cause = 'Heavy rainfall triggered slip',
      action = 'Advise caution to motorists'
    } = req.body;

    if (!title || !district) {
      return res.status(400).json({ success: false, message: 'Title and District are required.' });
    }

    const alertData = {
      title,
      hazardType,
      severity,
      riskScore: Number(riskScore),
      district,
      location,
      cause,
      action,
      createdAtLabel: 'Just now',
      isRead: false,
      isResolved: false
    };

    let newAlert;
    if (mongoose.connection.readyState === 1) {
      newAlert = await Alert.create(alertData);
    }

    const storeAlert = inMemoryStore.addAlert(alertData);
    if (!newAlert) newAlert = storeAlert;

    res.status(201).json({
      success: true,
      message: 'Emergency alert created successfully',
      data: newAlert
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create alert', error: error.message });
  }
});

// PUT /api/alerts/:id - Mark alert as read or resolved
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead, isResolved } = req.body;

    const updates = {};
    if (isRead !== undefined) updates.isRead = isRead;
    if (isResolved !== undefined) updates.isResolved = isResolved;

    let updatedAlert;
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      updatedAlert = await Alert.findByIdAndUpdate(id, { $set: updates }, { new: true });
    }

    const storeAlert = inMemoryStore.updateAlert(id, updates);
    if (!updatedAlert) updatedAlert = storeAlert;

    if (!updatedAlert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }

    res.json({
      success: true,
      message: 'Alert updated successfully',
      data: updatedAlert
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update alert', error: error.message });
  }
});

// DELETE /api/alerts/:id - Delete an alert
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      await Alert.findByIdAndDelete(id);
    }
    inMemoryStore.deleteAlert(id);

    res.json({
      success: true,
      message: 'Alert deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete alert', error: error.message });
  }
});

export default router;
