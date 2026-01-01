// API Type Definitions

export interface SensorReading {
    temperature: number;
    humidity: number;
    airQualityIndex: number;
    co2: number;
}

export interface Device {
    id: string;
    location: string;
    battery?: number;
    status: 'online' | 'offline' | 'low_battery';
    latitude?: number;
    longitude?: number;
    power?: string;
    lastSeen?: string | Date;
}

export interface TrendDataPoint {
    hour: string;
    aqi: number;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}
