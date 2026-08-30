// In-Memory Data Store with fallback for offline / standalone execution
import { 
  seedDistricts, 
  seedRoads, 
  seedAlerts, 
  seedDrones, 
  seedFireRisks, 
  seedHistoricalIncidents 
} from './seedData.js';

class InMemoryStore {
  constructor() {
    this.districts = JSON.parse(JSON.stringify(seedDistricts));
    this.roads = JSON.parse(JSON.stringify(seedRoads));
    this.alerts = JSON.parse(JSON.stringify(seedAlerts));
    this.drones = JSON.parse(JSON.stringify(seedDrones));
    this.fireRisks = JSON.parse(JSON.stringify(seedFireRisks));
    this.historicalIncidents = JSON.parse(JSON.stringify(seedHistoricalIncidents));
  }

  // Reset to initial seed
  reset() {
    this.districts = JSON.parse(JSON.stringify(seedDistricts));
    this.roads = JSON.parse(JSON.stringify(seedRoads));
    this.alerts = JSON.parse(JSON.stringify(seedAlerts));
    this.drones = JSON.parse(JSON.stringify(seedDrones));
    this.fireRisks = JSON.parse(JSON.stringify(seedFireRisks));
    this.historicalIncidents = JSON.parse(JSON.stringify(seedHistoricalIncidents));
  }

  // District operations
  getDistricts() {
    return this.districts;
  }
  getDistrictByName(name) {
    return this.districts.find(d => d.name.toLowerCase() === name.toLowerCase());
  }

  // Road operations
  getRoads() {
    return this.roads;
  }
  updateRoadStatus(roadName, updates) {
    const road = this.roads.find(r => r.name.toLowerCase() === roadName.toLowerCase());
    if (road) {
      Object.assign(road, updates);
      return road;
    }
    return null;
  }

  // Alert operations
  getAlerts() {
    return this.alerts;
  }
  addAlert(alertData) {
    const newAlert = {
      _id: 'alert_' + Date.now(),
      createdAtLabel: 'Just now',
      isRead: false,
      isResolved: false,
      ...alertData
    };
    this.alerts.unshift(newAlert);
    return newAlert;
  }
  updateAlert(id, updates) {
    const alert = this.alerts.find(a => (a._id && a._id.toString() === id.toString()) || a.title === id);
    if (alert) {
      Object.assign(alert, updates);
      return alert;
    }
    return null;
  }
  deleteAlert(id) {
    const idx = this.alerts.findIndex(a => (a._id && a._id.toString() === id.toString()) || a.title === id);
    if (idx !== -1) {
      return this.alerts.splice(idx, 1)[0];
    }
    return null;
  }

  // Drone operations
  getDrones() {
    return this.drones;
  }
  updateDrone(droneId, updates) {
    const drone = this.drones.find(d => d.droneId.toLowerCase() === droneId.toLowerCase());
    if (drone) {
      Object.assign(drone, updates);
      return drone;
    }
    return null;
  }

  // Fire operations
  getFireRisks() {
    return this.fireRisks;
  }

  // Historical operations
  getHistoricalIncidents() {
    return this.historicalIncidents;
  }
}

export const inMemoryStore = new InMemoryStore();
