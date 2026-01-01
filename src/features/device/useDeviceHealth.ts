// Device Health Composable

import { ref, computed } from 'vue';
import { evaluateDeviceHealth, evaluateDevicesHealth, getHealthSummary } from './device.health.service';
import type { Device } from '@/services/api.types';
import type { DeviceHealth } from './device.health.service';

export function useDeviceHealth() {
    const devices = ref<Device[]>([]);
    const healthList = ref<DeviceHealth[]>([]);

    /**
     * Update devices and recalculate health
     */
    const updateDevices = (newDevices: Device[]) => {
        devices.value = newDevices;
        healthList.value = evaluateDevicesHealth(newDevices);
    };

    /**
     * Get health for specific device
     */
    const getDeviceHealth = (deviceId: string): DeviceHealth | undefined => {
        return healthList.value.find(h => h.deviceId === deviceId);
    };

    /**
     * Health summary statistics
     */
    const summary = computed(() => getHealthSummary(healthList.value));

    /**
     * Devices by health status
     */
    const healthyDevices = computed(() =>
        healthList.value.filter(h => h.healthStatus === 'HEALTHY')
    );

    const warningDevices = computed(() =>
        healthList.value.filter(h => h.healthStatus === 'WARNING')
    );

    const criticalDevices = computed(() =>
        healthList.value.filter(h => h.healthStatus === 'CRITICAL')
    );

    /**
     * Check if any devices need attention
     */
    const hasIssues = computed(() =>
        summary.value.warning > 0 || summary.value.critical > 0
    );

    return {
        devices,
        healthList,
        summary,
        healthyDevices,
        warningDevices,
        criticalDevices,
        hasIssues,
        updateDevices,
        getDeviceHealth
    };
}
