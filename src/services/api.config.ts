// API Configuration

export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    useDummyData: import.meta.env.VITE_USE_DUMMY_DATA === 'true',
    intervals: {
        alertCheck: Number(import.meta.env.VITE_ALERT_CHECK_INTERVAL) || 30000,
        deviceHealthCheck: Number(import.meta.env.VITE_DEVICE_HEALTH_CHECK_INTERVAL) || 60000,
        sensorRefresh: Number(import.meta.env.VITE_SENSOR_REFRESH_INTERVAL) || 10000,
    },
    features: {
        deviceHealth: import.meta.env.VITE_ENABLE_DEVICE_HEALTH !== 'false',
        alertSystem: import.meta.env.VITE_ENABLE_ALERT_SYSTEM !== 'false',
    }
};

export const API_ENDPOINTS = {
    sensors: '/sensors',
    devices: '/devices',
    alerts: '/alerts',
    notifications: '/notifications',
};
