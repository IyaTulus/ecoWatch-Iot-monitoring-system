// src/services/iotService.js
import {
  dashboardMetrics,
  airQualityTrend,
  devices,
  notifications,
} from "../data/iotMockData";

export const IotService = {
  async getDashboardMetrics() {
    // simulasi delay jaringan
    await new Promise((r) => setTimeout(r, 150));
    return dashboardMetrics;
  },

  async getAirQualityTrend() {
    await new Promise((r) => setTimeout(r, 150));
    return airQualityTrend;
  },

  async getDevices() {
    await new Promise((r) => setTimeout(r, 150));
    return devices;
  },

  async addDevice(newDevice) {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 150));

    const id = newDevice.id || `dev-${Date.now()}`;
    const device = {
      id,
      location: newDevice.location || "Unknown",
      battery: Number(newDevice.battery) || 0,
      status: newDevice.status || "offline",
      ...(newDevice.power ? { power: newDevice.power } : {}),
    };

    // mutate the mock data array in-memory
    devices.push(device);

    return device;
  },

  async getNotifications() {
    await new Promise((r) => setTimeout(r, 150));
    return notifications;
  },

  async markNotificationRead(notificationId) {
    await new Promise((r) => setTimeout(r, 150));
    const idx = notifications.findIndex((n) => n.id === notificationId);
    if (idx === -1) return null;
    notifications[idx].read = true;
    return notifications[idx];
  },

  async createNotification(payload) {
    await new Promise((r) => setTimeout(r, 150));
    const id = payload.id || `n-${Date.now()}`;
    const note = {
      id,
      deviceId: payload.deviceId || null,
      type: payload.type || "info",
      severity: payload.severity || "info",
      message: payload.message || "",
      timestamp: payload.timestamp || new Date().toISOString(),
      read: false,
    };
    notifications.unshift(note);
    return note;
  },

  async dismissNotification(notificationId) {
    await new Promise((r) => setTimeout(r, 150));
    const idx = notifications.findIndex((n) => n.id === notificationId);
    if (idx === -1) return false;
    notifications.splice(idx, 1);
    return true;
  },

  async rebootDevice(deviceId) {
    // simulate reboot delay
    await new Promise((r) => setTimeout(r, 700));

    const idx = devices.findIndex((d) => d.id === deviceId);
    if (idx === -1) return null;

    // simulate device returning online with full battery after reboot
    devices[idx].status = "online";
    devices[idx].battery = 100;
    return devices[idx];
  },
};
