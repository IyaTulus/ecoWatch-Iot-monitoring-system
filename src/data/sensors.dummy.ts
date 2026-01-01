// Enhanced Sensors Dummy Data with More Variety
export const dashboardMetrics = {
    temperature: 28.5,
    humidity: 72,
    airQualityIndex: 45,
    co2: 420
};

export const airQualityTrend = [
    { hour: "00:00", aqi: 38 },
    { hour: "04:00", aqi: 42 },
    { hour: "08:00", aqi: 55 },
    { hour: "12:00", aqi: 48 },
    { hour: "16:00", aqi: 45 },
    { hour: "20:00", aqi: 40 }
];

// Detailed sensor readings for multiple devices
export const sensorReadings = [
    {
        deviceId: "ESP32-S001",
        location: "Zona Utara - Pohon Jati",
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        readings: {
            temperature: 28.5,
            humidity: 72,
            aqi: 45,
            co2: 420,
            pressure: 1013.25,
            light: 850
        }
    },
    {
        deviceId: "ESP8266-W02",
        location: "Zona Barat - Sungai",
        timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        readings: {
            temperature: 26.8,
            humidity: 85,
            aqi: 38,
            co2: 380,
            pressure: 1012.80,
            light: 720
        }
    },
    {
        deviceId: "ESP32-S003",
        location: "Zona Timur - Greenhouse",
        timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        readings: {
            temperature: 32.1,
            humidity: 65,
            aqi: 52,
            co2: 580,
            pressure: 1013.50,
            light: 1200
        }
    },
    {
        deviceId: "Arduino-LoRa-04",
        location: "Zona Selatan - Padang Rumput",
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        readings: {
            temperature: 29.3,
            humidity: 68,
            aqi: 41,
            co2: 410,
            pressure: 1013.00,
            light: 950
        }
    },
    {
        deviceId: "ESP32-S005",
        location: "Zona Tengah - Area Piknik",
        timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
        readings: {
            temperature: 27.9,
            humidity: 70,
            aqi: 43,
            co2: 395,
            pressure: 1013.10,
            light: 880
        }
    },
    {
        deviceId: "Raspberry-Pi-Master",
        location: "Zona Utara - Pohon Jati",
        timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        readings: {
            temperature: 28.2,
            humidity: 71,
            aqi: 44,
            co2: 415,
            pressure: 1013.20,
            light: 870
        }
    }
];

// Historical data for charts
export const historicalData = {
    temperature: [
        { time: "00:00", value: 24.5 },
        { time: "02:00", value: 23.8 },
        { time: "04:00", value: 23.2 },
        { time: "06:00", value: 24.1 },
        { time: "08:00", value: 26.3 },
        { time: "10:00", value: 28.7 },
        { time: "12:00", value: 31.2 },
        { time: "14:00", value: 32.5 },
        { time: "16:00", value: 30.8 },
        { time: "18:00", value: 28.9 },
        { time: "20:00", value: 27.1 },
        { time: "22:00", value: 25.6 }
    ],
    humidity: [
        { time: "00:00", value: 78 },
        { time: "02:00", value: 80 },
        { time: "04:00", value: 82 },
        { time: "06:00", value: 79 },
        { time: "08:00", value: 75 },
        { time: "10:00", value: 70 },
        { time: "12:00", value: 65 },
        { time: "14:00", value: 62 },
        { time: "16:00", value: 68 },
        { time: "18:00", value: 72 },
        { time: "20:00", value: 75 },
        { time: "22:00", value: 77 }
    ],
    aqi: [
        { time: "00:00", value: 38 },
        { time: "02:00", value: 35 },
        { time: "04:00", value: 42 },
        { time: "06:00", value: 48 },
        { time: "08:00", value: 55 },
        { time: "10:00", value: 52 },
        { time: "12:00", value: 48 },
        { time: "14:00", value: 50 },
        { time: "16:00", value: 45 },
        { time: "18:00", value: 43 },
        { time: "20:00", value: 40 },
        { time: "22:00", value: 39 }
    ]
};
