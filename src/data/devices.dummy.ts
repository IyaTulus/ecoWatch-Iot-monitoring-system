// Enhanced Devices Dummy Data with More Scenarios
export const devices = [
    {
        id: "ESP32-S001",
        location: "Zona Utara - Pohon Jati",
        type: "ESP32",
        status: "online",
        battery: 85,
        lastSeen: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        firmware: "v2.3.1",
        signalStrength: -45, // dBm
        uptime: 86400 * 15, // 15 days in seconds
        coordinates: { lat: -6.2088, lng: 106.8456 }
    },
    {
        id: "ESP8266-W02",
        location: "Zona Barat - Sungai",
        type: "ESP8266",
        status: "online",
        battery: 12,
        lastSeen: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        firmware: "v1.8.5",
        signalStrength: -62,
        uptime: 86400 * 8,
        coordinates: { lat: -6.2095, lng: 106.8445 }
    },
    {
        id: "ESP32-S003",
        location: "Zona Timur - Greenhouse",
        type: "ESP32",
        status: "online",
        battery: 92,
        lastSeen: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        firmware: "v2.3.1",
        signalStrength: -38,
        uptime: 86400 * 22,
        coordinates: { lat: -6.2080, lng: 106.8470 }
    },
    {
        id: "Arduino-LoRa-04",
        location: "Zona Selatan - Padang Rumput",
        type: "Arduino LoRa",
        status: "offline",
        battery: 0,
        lastSeen: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        firmware: "v1.5.2",
        signalStrength: -85,
        uptime: 0,
        coordinates: { lat: -6.2105, lng: 106.8460 }
    },
    {
        id: "ESP32-S005",
        location: "Zona Tengah - Area Piknik",
        type: "ESP32",
        status: "online",
        battery: 65,
        lastSeen: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
        firmware: "v2.2.8",
        signalStrength: -55,
        uptime: 86400 * 5,
        coordinates: { lat: -6.2092, lng: 106.8458 }
    },
    {
        id: "Raspberry-Pi-Master",
        location: "Zona Utara - Pohon Jati",
        type: "Raspberry Pi 4",
        status: "online",
        battery: null, // AC powered
        power: "AC",
        lastSeen: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        firmware: "v3.1.0",
        signalStrength: -32,
        uptime: 86400 * 45,
        coordinates: { lat: -6.2088, lng: 106.8456 }
    },
    {
        id: "ESP32-S007",
        location: "Zona Barat - Kolam",
        type: "ESP32",
        status: "online",
        battery: 78,
        lastSeen: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
        firmware: "v2.3.1",
        signalStrength: -48,
        uptime: 86400 * 12,
        coordinates: { lat: -6.2098, lng: 106.8442 }
    },
    {
        id: "ESP8266-W08",
        location: "Zona Timur - Jalan Setapak",
        type: "ESP8266",
        status: "online",
        battery: 55,
        lastSeen: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
        firmware: "v1.8.5",
        signalStrength: -58,
        uptime: 86400 * 7,
        coordinates: { lat: -6.2082, lng: 106.8475 }
    }
];

// Device statistics
export const deviceStats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    lowBattery: devices.filter(d => d.battery && d.battery < 20).length,
    avgBattery: Math.round(
        devices.filter(d => d.battery !== null).reduce((sum, d) => sum + d.battery, 0) /
        devices.filter(d => d.battery !== null).length
    ),
    avgSignalStrength: Math.round(
        devices.reduce((sum, d) => sum + d.signalStrength, 0) / devices.length
    )
};
