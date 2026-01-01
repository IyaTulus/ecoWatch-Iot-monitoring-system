// Device Health Service

import { formatDuration } from '@/utils/time';
import type { Device } from '@/services/api.types';

export interface DeviceHealth {
    deviceId: string;
    deviceName: string;
    location: string;
    status: 'online' | 'offline' | 'low_battery';
    lastSeen: Date;
    offlineDuration?: number;
    batteryLevel?: number;
    healthStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    healthMessage: string;
    healthRecommendation: string;
}

/**
 * Evaluate device health based on last seen and battery level
 */
export function evaluateDeviceHealth(device: Device): DeviceHealth {
    const now = new Date();
    const lastSeen = new Date(device.lastSeen || now);
    const offlineDuration = now.getTime() - lastSeen.getTime();

    let healthStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL' = 'HEALTHY';
    let healthMessage = 'Device operating normally';
    let healthRecommendation = 'No action required';

    // Rule 1: Offline Duration
    if (offlineDuration > 15 * 60 * 1000) { // > 15 minutes
        healthStatus = 'CRITICAL';
        healthMessage = `Device offline for ${formatDuration(offlineDuration)}`;
        healthRecommendation = 'Check device power supply and network connectivity. Device may require physical inspection.';
    } else if (offlineDuration > 5 * 60 * 1000) { // > 5 minutes
        if (healthStatus !== 'CRITICAL') {
            healthStatus = 'WARNING';
            healthMessage = `No data received for ${formatDuration(offlineDuration)}`;
            healthRecommendation = 'Monitor device connectivity. Check network signal strength.';
        }
    }

    // Rule 2: Battery Level (overrides if more severe)
    if (device.battery !== undefined) {
        if (device.battery < 10) {
            healthStatus = 'CRITICAL';
            healthMessage = `Battery critically low (${device.battery}%)`;
            healthRecommendation = 'Replace battery immediately to prevent data loss.';
        } else if (device.battery < 20) {
            if (healthStatus === 'HEALTHY') {
                healthStatus = 'WARNING';
                healthMessage = `Battery low (${device.battery}%)`;
                healthRecommendation = 'Schedule battery replacement soon.';
            }
        }
    }

    return {
        deviceId: device.id,
        deviceName: device.id,
        location: device.location,
        status: device.status,
        lastSeen,
        offlineDuration: offlineDuration > 0 ? offlineDuration : undefined,
        batteryLevel: device.battery,
        healthStatus,
        healthMessage,
        healthRecommendation
    };
}

/**
 * Evaluate health for multiple devices
 */
export function evaluateDevicesHealth(devices: Device[]): DeviceHealth[] {
    return devices.map(evaluateDeviceHealth);
}

/**
 * Get health summary statistics
 */
export function getHealthSummary(healthList: DeviceHealth[]) {
    return {
        total: healthList.length,
        healthy: healthList.filter(h => h.healthStatus === 'HEALTHY').length,
        warning: healthList.filter(h => h.healthStatus === 'WARNING').length,
        critical: healthList.filter(h => h.healthStatus === 'CRITICAL').length,
    };
}
