// src/data/iotMockData.js

export const dashboardMetrics = {
  temperature: 28.5,
  humidity: 72,
  airQualityIndex: 45,
  co2: 420,
};

export const airQualityTrend = [
  { hour: "01:00", aqi: 100 },
  { hour: "03:00", aqi: 45 },
  { hour: "05:00", aqi: 38 },
  { hour: "07:00", aqi: 50 },
  { hour: "09:00", aqi: 42 },
  { hour: "11:00", aqi: 47 },
  { hour: "13:00", aqi: 44 },
  { hour: "14:00", aqi: 45 },
];

export const devices = [
  {
    id: "ESP32-S001",
    location: "Zona Utara - Pohon Jati",
    battery: 85,
    status: "online",
    latitude: -6.175392,
    longitude: 106.827153,
  },
  {
    id: "ESP8266-W02",
    location: "Zona Barat - Sungai",
    battery: 12,
    status: "low_battery",
    latitude: -6.2,
    longitude: 106.78,
  },
  {
    id: "Raspberry-Pi-Master",
    location: "Pos Jaga Utama",
    battery: 100,
    status: "online",
    power: "AC",
    latitude: -6.17511,
    longitude: 106.824964,
  },
  {
    id: "Arduino-LoRa-04",
    location: "Zona Selatan",
    battery: 0,
    status: "offline",
    latitude: -6.212,
    longitude: 106.8456,
  },
];

export const notifications = [
  {
    id: "n-1",
    deviceId: "ESP32-S001",
    type: "co2",
    severity: "danger",
    message:
      "Kadar CO₂ meningkat melebihi ambang aman (420 ppm). Periksa ventilasi area.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: false,
  },
  {
    id: "n-2",
    deviceId: "ESP8266-W02",
    type: "battery",
    severity: "warning",
    message:
      "Baterai perangkat hampir habis (12%). Segera lakukan pengecekan atau penggantian baterai.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: "n-3",
    deviceId: "Arduino-LoRa-04",
    type: "offline",
    severity: "danger",
    message:
      "Perangkat tidak merespon (offline). Periksa koneksi dan catu daya.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: true,
  },
  {
    id: "n-4",
    deviceId: "Raspberry-Pi-Master",
    type: "info",
    severity: "info",
    message: "Pembaruan firmware tersedia untuk perangkat.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
];
