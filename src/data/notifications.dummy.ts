// Notifications Dummy Data
import { devices } from './devices.dummy';

export const notifications = [
    {
        id: "notif-001",
        deviceId: "ESP8266-W02",
        deviceLocation: "Zona Barat - Sungai",
        parameter: "battery",
        currentValue: 12,
        threshold: 20,
        duration: "45 minutes",
        severity: "CRITICAL",
        message: "Battery at Zona Barat - Sungai is 12% (threshold: 20%). Battery critically low.",
        recommendation: "Replace battery immediately to prevent data loss and device shutdown.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        read: false
    },
    {
        id: "notif-002",
        deviceId: "Arduino-LoRa-04",
        deviceLocation: "Zona Selatan - Padang Rumput",
        parameter: "offline",
        currentValue: 25,
        threshold: 15,
        duration: "25 minutes",
        severity: "CRITICAL",
        message: "Device at Zona Selatan - Padang Rumput has been offline for 25 minutes (threshold: 15 minutes).",
        recommendation: "Check device power supply and network connectivity. Device may require physical inspection.",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        read: false
    },
    {
        id: "notif-003",
        deviceId: "ESP32-S003",
        deviceLocation: "Zona Timur - Greenhouse",
        parameter: "temperature",
        currentValue: 32.1,
        threshold: 30,
        duration: "12 minutes",
        severity: "WARNING",
        message: "Temperature at Zona Timur - Greenhouse is 32.1°C (threshold: 30°C). Temperature above normal threshold.",
        recommendation: "Monitor temperature trends. Check cooling systems if temperature continues to rise.",
        timestamp: new Date(Date.now() - 1000 * 60 * 12),
        read: false
    },
    {
        id: "notif-004",
        deviceId: "ESP32-S005",
        deviceLocation: "Zona Tengah - Area Piknik",
        parameter: "offline",
        currentValue: 8,
        threshold: 5,
        duration: "8 minutes",
        severity: "WARNING",
        message: "No data received from Zona Tengah - Area Piknik for 8 minutes (threshold: 5 minutes).",
        recommendation: "Monitor device connectivity. Check network signal strength.",
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        read: false
    },
    {
        id: "notif-005",
        deviceId: "ESP8266-W08",
        deviceLocation: "Zona Timur - Jalan Setapak",
        parameter: "battery",
        currentValue: 55,
        threshold: 60,
        duration: "30 minutes",
        severity: "WARNING",
        message: "Battery at Zona Timur - Jalan Setapak is 55% (threshold: 60%).",
        recommendation: "Schedule battery replacement or charging soon.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true
    },
    {
        id: "notif-006",
        deviceId: "ESP32-S001",
        deviceLocation: "Zona Utara - Pohon Jati",
        parameter: "info",
        currentValue: null,
        threshold: null,
        duration: null,
        severity: "INFO",
        message: "Device firmware updated successfully to v2.3.1",
        recommendation: "No action required. System is operating normally.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true
    },
    {
        id: "notif-007",
        deviceId: "Raspberry-Pi-Master",
        deviceLocation: "Zona Utara - Pohon Jati",
        parameter: "info",
        currentValue: null,
        threshold: null,
        duration: null,
        severity: "INFO",
        message: "System maintenance completed. All sensors recalibrated.",
        recommendation: "No action required. System is operating normally.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: true
    },
    {
        id: "notif-008",
        deviceId: "ESP32-S007",
        deviceLocation: "Zona Barat - Kolam",
        parameter: "humidity",
        currentValue: 88,
        threshold: 85,
        duration: "18 minutes",
        severity: "WARNING",
        message: "Humidity at Zona Barat - Kolam is 88% (threshold: 85%). High humidity detected.",
        recommendation: "Improve air circulation. Check for water leaks or excessive moisture sources.",
        timestamp: new Date(Date.now() - 1000 * 60 * 18),
        read: false
    }
];

// Notification statistics
export const notificationStats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    critical: notifications.filter(n => n.severity === 'CRITICAL').length,
    warning: notifications.filter(n => n.severity === 'WARNING').length,
    info: notifications.filter(n => n.severity === 'INFO').length,
    last24Hours: notifications.filter(n =>
        new Date(n.timestamp).getTime() > Date.now() - 1000 * 60 * 60 * 24
    ).length
};
