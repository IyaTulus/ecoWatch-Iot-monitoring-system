// Enhanced Alerts Dummy Data with More Scenarios
export const alerts = [
    {
        id: "alert-001",
        deviceId: "ESP8266-W02",
        parameter: "battery",
        severity: "CRITICAL",
        currentValue: 12,
        threshold: 20,
        message: "Battery critically low",
        recommendation: "Replace battery immediately to prevent data loss and device shutdown.",
        triggeredAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        acknowledged: false,
        duration: 1000 * 60 * 45 // 45 minutes
    },
    {
        id: "alert-002",
        deviceId: "Arduino-LoRa-04",
        parameter: "offline",
        severity: "CRITICAL",
        currentValue: 25,
        threshold: 15,
        message: "Device offline for 25 minutes",
        recommendation: "Check device power supply and network connectivity. Device may require physical inspection.",
        triggeredAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        acknowledged: false,
        duration: 1000 * 60 * 25
    },
    {
        id: "alert-003",
        deviceId: "ESP32-S003",
        parameter: "temperature",
        severity: "WARNING",
        currentValue: 32.1,
        threshold: 30,
        message: "Temperature above normal threshold",
        recommendation: "Monitor temperature trends. Check cooling systems if temperature continues to rise.",
        triggeredAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        acknowledged: false,
        duration: 1000 * 60 * 12
    },
    {
        id: "alert-004",
        deviceId: "ESP32-S005",
        parameter: "offline",
        severity: "WARNING",
        currentValue: 8,
        threshold: 5,
        message: "No data received for 8 minutes",
        recommendation: "Monitor device connectivity. Check network signal strength.",
        triggeredAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
        acknowledged: false,
        duration: 1000 * 60 * 8
    },
    {
        id: "alert-005",
        deviceId: "ESP8266-W08",
        parameter: "battery",
        severity: "WARNING",
        currentValue: 55,
        threshold: 60,
        message: "Battery level below 60%",
        recommendation: "Schedule battery replacement or charging soon.",
        triggeredAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        acknowledged: true,
        duration: 1000 * 60 * 30
    }
];

// Alert statistics
export const alertStats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'CRITICAL').length,
    warning: alerts.filter(a => a.severity === 'WARNING').length,
    info: alerts.filter(a => a.severity === 'INFO').length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length,
    avgDuration: Math.round(
        alerts.reduce((sum, a) => sum + a.duration, 0) / alerts.length / 1000 / 60
    ) // in minutes
};

// Alert history for charts
export const alertHistory = [
    { date: "2026-01-01", critical: 2, warning: 3, info: 1 },
    { date: "2025-12-31", critical: 1, warning: 2, info: 2 },
    { date: "2025-12-30", critical: 0, warning: 4, info: 3 },
    { date: "2025-12-29", critical: 1, warning: 1, info: 1 },
    { date: "2025-12-28", critical: 0, warning: 2, info: 2 },
    { date: "2025-12-27", critical: 1, warning: 3, info: 4 },
    { date: "2025-12-26", critical: 0, warning: 1, info: 2 }
];
