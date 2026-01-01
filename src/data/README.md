# ecoWatch Dummy Data Documentation

## Overview

Semua data dummy disimpan dalam format TypeScript/JSON untuk kemudahan penggunaan dan type safety.

## Data Files

### 1. sensors.dummy.ts

**Location**: `src/data/sensors.dummy.ts`

**Exports**:

- `dashboardMetrics`: Metrics utama untuk dashboard
- `airQualityTrend`: Data trend AQI 24 jam
- `sensorReadings`: Pembacaan sensor detail untuk semua device
- `historicalData`: Data historis untuk charts (temperature, humidity, AQI)

**Sample Data**:

```json
{
  "dashboardMetrics": {
    "temperature": 28.5,
    "humidity": 72,
    "airQualityIndex": 45,
    "co2": 420
  },
  "sensorReadings": [
    {
      "deviceId": "ESP32-S001",
      "location": "Zona Utara - Pohon Jati",
      "timestamp": "2026-01-01T10:35:00Z",
      "readings": {
        "temperature": 28.5,
        "humidity": 72,
        "aqi": 45,
        "co2": 420,
        "pressure": 1013.25,
        "light": 850
      }
    }
  ]
}
```

### 2. devices.dummy.ts

**Location**: `src/data/devices.dummy.ts`

**Exports**:

- `devices`: Array of 8 devices dengan berbagai status
- `deviceStats`: Statistik device (total, online, offline, dll)

**Device Properties**:

- `id`: Device identifier
- `location`: Lokasi device
- `type`: Tipe hardware (ESP32, ESP8266, Arduino LoRa, Raspberry Pi)
- `status`: online/offline
- `battery`: Level baterai (0-100) atau null untuk AC powered
- `lastSeen`: Timestamp terakhir terlihat
- `firmware`: Versi firmware
- `signalStrength`: Kekuatan sinyal dalam dBm
- `uptime`: Uptime dalam detik
- `coordinates`: Koordinat GPS

**Sample Data**:

```json
{
  "id": "ESP32-S001",
  "location": "Zona Utara - Pohon Jati",
  "type": "ESP32",
  "status": "online",
  "battery": 85,
  "lastSeen": "2026-01-01T10:35:00Z",
  "firmware": "v2.3.1",
  "signalStrength": -45,
  "uptime": 1296000,
  "coordinates": { "lat": -6.2088, "lng": 106.8456 }
}
```

### 3. alerts.dummy.ts

**Location**: `src/data/alerts.dummy.ts`

**Exports**:

- `alerts`: Array of 5 alerts dengan berbagai severity
- `alertStats`: Statistik alerts
- `alertHistory`: Riwayat alerts 7 hari terakhir

**Alert Properties**:

- `id`: Alert identifier
- `deviceId`: Device yang trigger alert
- `parameter`: Parameter yang di-monitor (temperature, battery, offline, dll)
- `severity`: CRITICAL, WARNING, atau INFO
- `currentValue`: Nilai saat ini
- `threshold`: Threshold yang dilanggar
- `message`: Pesan alert
- `recommendation`: Rekomendasi tindakan
- `triggeredAt`: Waktu alert triggered
- `acknowledged`: Status acknowledgment
- `duration`: Durasi alert dalam ms

**Sample Data**:

```json
{
  "id": "alert-001",
  "deviceId": "ESP8266-W02",
  "parameter": "battery",
  "severity": "CRITICAL",
  "currentValue": 12,
  "threshold": 20,
  "message": "Battery critically low",
  "recommendation": "Replace battery immediately to prevent data loss and device shutdown.",
  "triggeredAt": "2026-01-01T09:50:00Z",
  "acknowledged": false,
  "duration": 2700000
}
```

### 4. notifications.dummy.ts

**Location**: `src/data/notifications.dummy.ts`

**Exports**:

- `notifications`: Array of 8 notifications
- `notificationStats`: Statistik notifications

**Notification Properties**:

- `id`: Notification identifier
- `deviceId`: Device terkait
- `deviceLocation`: Lokasi device
- `parameter`: Parameter yang di-monitor
- `currentValue`: Nilai saat ini
- `threshold`: Threshold
- `duration`: Durasi dalam human-readable format
- `severity`: CRITICAL, WARNING, atau INFO
- `message`: Pesan lengkap dengan konteks
- `recommendation`: Rekomendasi tindakan
- `timestamp`: Waktu notification
- `read`: Status baca

**Sample Data**:

```json
{
  "id": "notif-001",
  "deviceId": "ESP8266-W02",
  "deviceLocation": "Zona Barat - Sungai",
  "parameter": "battery",
  "currentValue": 12,
  "threshold": 20,
  "duration": "45 minutes",
  "severity": "CRITICAL",
  "message": "Battery at Zona Barat - Sungai is 12% (threshold: 20%). Battery critically low.",
  "recommendation": "Replace battery immediately to prevent data loss and device shutdown.",
  "timestamp": "2026-01-01T09:50:00Z",
  "read": false
}
```

### 5. device-health.dummy.ts

**Location**: `src/data/device-health.dummy.ts`

**Exports**:

- `deviceHealthData`: Array of device health status
- `healthSummary`: Summary statistik health

**Device Health Properties**:

- `deviceId`: Device identifier
- `deviceName`: Nama device
- `location`: Lokasi
- `status`: online/offline
- `lastSeen`: Terakhir terlihat
- `offlineDuration`: Durasi offline dalam ms
- `batteryLevel`: Level baterai
- `healthStatus`: HEALTHY, WARNING, atau CRITICAL
- `healthMessage`: Pesan status health
- `healthRecommendation`: Rekomendasi

**Sample Data**:

```json
{
  "deviceId": "ESP32-S001",
  "deviceName": "ESP32-S001",
  "location": "Zona Utara - Pohon Jati",
  "status": "online",
  "lastSeen": "2026-01-01T10:35:00Z",
  "offlineDuration": 0,
  "batteryLevel": 85,
  "healthStatus": "HEALTHY",
  "healthMessage": "Device operating normally",
  "healthRecommendation": "No action required"
}
```

## Data Variety

### Devices (8 total)

- **Online**: 7 devices
- **Offline**: 1 device (Arduino-LoRa-04)
- **Low Battery**: 2 devices (ESP8266-W02: 12%, ESP8266-W08: 55%)
- **AC Powered**: 1 device (Raspberry-Pi-Master)
- **Types**: ESP32 (4), ESP8266 (2), Arduino LoRa (1), Raspberry Pi (1)

### Alerts (5 total)

- **CRITICAL**: 2 alerts (battery low, device offline)
- **WARNING**: 3 alerts (temperature, offline, battery)
- **Acknowledged**: 1 alert
- **Unacknowledged**: 4 alerts

### Notifications (8 total)

- **CRITICAL**: 2 notifications
- **WARNING**: 4 notifications
- **INFO**: 2 notifications
- **Unread**: 5 notifications
- **Read**: 3 notifications

### Device Health (8 total)

- **HEALTHY**: 4 devices
- **WARNING**: 2 devices
- **CRITICAL**: 2 devices

## Usage Example

```typescript
// Import data
import { devices, deviceStats } from "@/data/devices.dummy";
import { alerts, alertStats } from "@/data/alerts.dummy";
import { notifications } from "@/data/notifications.dummy";
import { sensorReadings, historicalData } from "@/data/sensors.dummy";

// Use in components
const onlineDevices = devices.filter((d) => d.status === "online");
const criticalAlerts = alerts.filter((a) => a.severity === "CRITICAL");
const unreadNotifications = notifications.filter((n) => !n.read);
```

## Data Refresh Strategy

Untuk simulasi real-time data:

1. Gunakan `setInterval` untuk update timestamp
2. Randomize nilai sensor dalam range realistis
3. Trigger alerts berdasarkan threshold
4. Update device status secara periodik

## Notes

- Semua timestamp menggunakan ISO 8601 format
- Koordinat GPS menggunakan area Jakarta (-6.20xx, 106.84xx)
- Signal strength dalam dBm (-30 to -85)
- Battery level dalam percentage (0-100)
- Uptime dalam seconds
