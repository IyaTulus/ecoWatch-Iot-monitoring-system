// Device Health Dummy Data
export const deviceHealthData = [
    {
        deviceId: "ESP32-S001",
        deviceName: "ESP32-S001",
        location: "Zona Utara - Pohon Jati",
        status: "online",
        lastSeen: new Date(Date.now() - 1000 * 60 * 2),
        offlineDuration: 0,
        batteryLevel: 85,
        healthStatus: "HEALTHY",
        healthMessage: "Device operating normally",
        healthRecommendation: "No action required"
    },
    {
        deviceId: "ESP8266-W02",
        deviceName: "ESP8266-W02",
        location: "Zona Barat - Sungai",
        status: "online",
        lastSeen: new Date(Date.now() - 1000 * 60 * 3),
        offlineDuration: 0,
        batteryLevel: 12,
        healthStatus: "CRITICAL",
        healthMessage: "Battery critically low (12%)",
        healthRecommendation: "Replace battery immediately to prevent data loss."
    },
    {
        deviceId: "ESP32-S003",
        deviceName: "ESP32-S003",
        location: "Zona Timur - Greenhouse",
        status: "online",
        lastSeen: new Date(Date.now() - 1000 * 60 * 1),
        offlineDuration: 0,
        batteryLevel: 92,
        healthStatus: "HEALTHY",
        healthMessage: "Device operating normally",
        healthRecommendation: "No action required"
    },
    {
        deviceId: "Arduino-LoRa-04",
        deviceName: "Arduino-LoRa-04",
        location: "Zona Selatan - Padang Rumput",
        status: "offline",
        lastSeen: new Date(Date.now() - 1000 * 60 * 25),
        offlineDuration: 1000 * 60 * 25,
        batteryLevel: 0,
        healthStatus: "CRITICAL",
        healthMessage: "Device offline for 25 minutes",
        healthRecommendation: "Check device power supply and network connectivity. Device may require physical inspection."
    },
    {
        deviceId: "ESP32-S005",
        deviceName: "ESP32-S005",
        location: "Zona Tengah - Area Piknik",
        status: "online",
        lastSeen: new Date(Date.now() - 1000 * 60 * 8),
        offlineDuration: 0,
        batteryLevel: 65,
        healthStatus: "WARNING",
        healthMessage: "No data received for 8 minutes",
        healthRecommendation: "Monitor device connectivity. Check network signal strength."
    },
    {
        deviceId: "Raspberry-Pi-Master",
        deviceName: "Raspberry-Pi-Master",
        location: "Zona Utara - Pohon Jati",
        status: "online",
        lastSeen: new Date(Date.now() - 1000 * 60 * 1),
        offlineDuration: 0,
        batteryLevel: undefined,
        healthStatus: "HEALTHY",
        healthMessage: "Device operating normally (AC powered)",
        healthRecommendation: "No action required"
    },
    {
        deviceId: "ESP32-S007",
        deviceName: "ESP32-S007",
        location: "Zona Barat - Kolam",
        status: "online",
        lastSeen: new Date(Date.now() - 1000 * 60 * 4),
        offlineDuration: 0,
        batteryLevel: 78,
        healthStatus: "HEALTHY",
        healthMessage: "Device operating normally",
        healthRecommendation: "No action required"
    },
    {
        deviceId: "ESP8266-W08",
        deviceName: "ESP8266-W08",
        location: "Zona Timur - Jalan Setapak",
        status: "online",
        lastSeen: new Date(Date.now() - 1000 * 60 * 6),
        offlineDuration: 0,
        batteryLevel: 55,
        healthStatus: "WARNING",
        healthMessage: "Battery low (55%)",
        healthRecommendation: "Schedule battery replacement soon."
    }
];

// Health summary
export const healthSummary = {
    total: deviceHealthData.length,
    healthy: deviceHealthData.filter(d => d.healthStatus === 'HEALTHY').length,
    warning: deviceHealthData.filter(d => d.healthStatus === 'WARNING').length,
    critical: deviceHealthData.filter(d => d.healthStatus === 'CRITICAL').length
};
