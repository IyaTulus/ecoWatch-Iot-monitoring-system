// src/services/iotService.js - Enhanced with Varied Dummy Data
import {
  dashboardMetrics,
  airQualityTrend,
  sensorReadings,
  historicalData,
} from "../data/sensors.dummy";
import { devices, deviceStats } from "../data/devices.dummy";
import { alerts, alertStats, alertHistory } from "../data/alerts.dummy";
import { notifications, notificationStats } from "../data/notifications.dummy";
import { deviceHealthData, healthSummary } from "../data/device-health.dummy";
import { API_CONFIG } from "./api.config";
import { httpClient } from "./http";

export const IotService = {
  // ==================== Dashboard Metrics ====================
  async getDashboardMetrics() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return dashboardMetrics;
    }

    return httpClient.get("/sensors/metrics");
  },

  async getAirQualityTrend() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return airQualityTrend;
    }

    return httpClient.get("/sensors/trend");
  },

  async getHistoricalData(parameter = "temperature") {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return historicalData[parameter] || historicalData.temperature;
    }

    return httpClient.get(`/sensors/historical/${parameter}`);
  },

  // ==================== Sensor Readings ====================
  async getSensorReadings(deviceId = null) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      if (deviceId) {
        return sensorReadings.find((s) => s.deviceId === deviceId);
      }
      return sensorReadings;
    }

    const endpoint = deviceId
      ? `/sensors/readings/${deviceId}`
      : "/sensors/readings";
    return httpClient.get(endpoint);
  },

  // ==================== Devices ====================
  async getDevices() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return devices;
    }

    return httpClient.get("/devices");
  },

  async getDevice(deviceId) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return devices.find((d) => d.id === deviceId);
    }

    return httpClient.get(`/devices/${deviceId}`);
  },

  async getDeviceStats() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return deviceStats;
    }

    return httpClient.get("/devices/stats");
  },

  async addDevice(newDevice) {
    await new Promise((r) => setTimeout(r, 150));

    const id = newDevice.id || `dev-${Date.now()}`;
    const device = {
      id,
      location: newDevice.location || "Unknown",
      type: newDevice.type || "ESP32",
      battery: Number(newDevice.battery) || 0,
      status: newDevice.status || "offline",
      lastSeen: new Date().toISOString(),
      firmware: newDevice.firmware || "v1.0.0",
      signalStrength: newDevice.signalStrength || -60,
      uptime: 0,
      coordinates: newDevice.coordinates || { lat: -6.2088, lng: 106.8456 },
      ...(newDevice.power ? { power: newDevice.power } : {}),
    };

    if (API_CONFIG.useDummyData) {
      devices.push(device);
      return device;
    }

    return httpClient.post("/devices", device);
  },

  async rebootDevice(deviceId) {
    await new Promise((r) => setTimeout(r, 700));

    if (API_CONFIG.useDummyData) {
      const idx = devices.findIndex((d) => d.id === deviceId);
      if (idx === -1) return null;

      devices[idx].status = "online";
      devices[idx].battery = 100;
      devices[idx].lastSeen = new Date().toISOString();
      return devices[idx];
    }

    return httpClient.post(`/devices/${deviceId}/reboot`, {});
  },

  // ==================== Alerts ====================
  async getAlerts(severity = null) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      if (severity) {
        return alerts.filter((a) => a.severity === severity);
      }
      return alerts;
    }

    const endpoint = severity ? `/alerts?severity=${severity}` : "/alerts";
    return httpClient.get(endpoint);
  },

  async getAlertStats() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return alertStats;
    }

    return httpClient.get("/alerts/stats");
  },

  async getAlertHistory(days = 7) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return alertHistory.slice(0, days);
    }

    return httpClient.get(`/alerts/history?days=${days}`);
  },

  async acknowledgeAlert(alertId) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      const alert = alerts.find((a) => a.id === alertId);
      if (alert) {
        alert.acknowledged = true;
      }
      return alert;
    }

    return httpClient.post(`/alerts/${alertId}/acknowledge`, {});
  },

  async dismissAlert(alertId) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      const idx = alerts.findIndex((a) => a.id === alertId);
      if (idx !== -1) {
        alerts.splice(idx, 1);
      }
      return true;
    }

    return httpClient.delete(`/alerts/${alertId}`);
  },

  // ==================== Notifications ====================
  async getNotifications(filter = {}) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      let filtered = [...notifications];

      if (filter.severity) {
        filtered = filtered.filter((n) => n.severity === filter.severity);
      }
      if (filter.unreadOnly) {
        filtered = filtered.filter((n) => !n.read);
      }
      if (filter.deviceId) {
        filtered = filtered.filter((n) => n.deviceId === filter.deviceId);
      }

      return filtered;
    }

    const params = new URLSearchParams(filter).toString();
    return httpClient.get(`/notifications${params ? "?" + params : ""}`);
  },

  async getNotificationStats() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return notificationStats;
    }

    return httpClient.get("/notifications/stats");
  },

  async markNotificationRead(notificationId) {
    await new Promise((r) => setTimeout(r, 100));

    if (API_CONFIG.useDummyData) {
      const notif = notifications.find((n) => n.id === notificationId);
      if (notif) {
        notif.read = true;
      }
      return notif;
    }

    return httpClient.post(`/notifications/${notificationId}/read`, {});
  },

  async markAllNotificationsRead() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      notifications.forEach((n) => (n.read = true));
      return { success: true, count: notifications.length };
    }

    return httpClient.post("/notifications/read-all", {});
  },

  async createNotification(payload) {
    await new Promise((r) => setTimeout(r, 150));

    const id = payload.id || `notif-${Date.now()}`;
    const notification = {
      id,
      deviceId: payload.deviceId || null,
      deviceLocation: payload.deviceLocation || "Unknown",
      parameter: payload.parameter || "info",
      currentValue: payload.currentValue || null,
      threshold: payload.threshold || null,
      duration: payload.duration || null,
      severity: payload.severity || "INFO",
      message: payload.message || "",
      recommendation: payload.recommendation || "No action required.",
      timestamp: payload.timestamp || new Date(),
      read: false,
    };

    if (API_CONFIG.useDummyData) {
      notifications.unshift(notification);
      return notification;
    }

    return httpClient.post("/notifications", notification);
  },

  async dismissNotification(notificationId) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      const idx = notifications.findIndex((n) => n.id === notificationId);
      if (idx !== -1) {
        notifications.splice(idx, 1);
        return true;
      }
      return false;
    }

    return httpClient.delete(`/notifications/${notificationId}`);
  },

  // ==================== Device Health ====================
  async getDeviceHealth(deviceId = null) {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      if (deviceId) {
        return deviceHealthData.find((d) => d.deviceId === deviceId);
      }
      return deviceHealthData;
    }

    const endpoint = deviceId ? `/device-health/${deviceId}` : "/device-health";
    return httpClient.get(endpoint);
  },

  async getHealthSummary() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return healthSummary;
    }

    return httpClient.get("/device-health/summary");
  },

  // ==================== System Info ====================
  async getSystemInfo() {
    await new Promise((r) => setTimeout(r, 150));

    if (API_CONFIG.useDummyData) {
      return {
        version: "2.3.1",
        uptime: 86400 * 30, // 30 days
        lastUpdate: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        status: "online",
        mode: "dummy",
        totalDevices: devices.length,
        activeAlerts: alerts.filter((a) => !a.acknowledged).length,
        unreadNotifications: notifications.filter((n) => !n.read).length,
      };
    }

    return httpClient.get("/system/info");
  },
};
