// Notification Mapper

import type { Alert } from '../alert/alert.engine';
import { formatDuration } from '@/utils/time';
import type { Device } from '@/services/api.types';

export interface Notification {
    id: string;
    deviceId: string;
    deviceLocation: string;
    parameter: string;
    currentValue: number;
    threshold: number | [number, number];
    duration: string;
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    message: string;
    recommendation: string;
    timestamp: Date;
    read: boolean;
}

/**
 * Map alert to contextual notification
 */
export function mapAlertToNotification(
    alert: Alert,
    device: Device
): Notification {
    const duration = Date.now() - alert.triggeredAt.getTime();

    return {
        id: `notif-${alert.id}`,
        deviceId: alert.deviceId,
        deviceLocation: device.location,
        parameter: alert.parameter,
        currentValue: alert.currentValue,
        threshold: alert.threshold,
        duration: formatDuration(duration),
        severity: alert.severity,
        message: buildContextualMessage(alert, device),
        recommendation: alert.recommendation,
        timestamp: alert.triggeredAt,
        read: false
    };
}

/**
 * Build human-readable contextual message
 */
function buildContextualMessage(alert: Alert, device: Device): string {
    const parameterName = getParameterName(alert.parameter);
    const unit = getParameterUnit(alert.parameter);
    const thresholdText = formatThreshold(alert.threshold, unit);

    return `${parameterName} at ${device.location} is ${alert.currentValue}${unit} (threshold: ${thresholdText}). ${alert.message}.`;
}

function getParameterName(parameter: string): string {
    const names: Record<string, string> = {
        temperature: 'Temperature',
        humidity: 'Humidity',
        aqi: 'Air Quality Index',
        co2: 'CO₂ Level'
    };
    return names[parameter] || parameter;
}

function getParameterUnit(parameter: string): string {
    const units: Record<string, string> = {
        temperature: '°C',
        humidity: '%',
        aqi: 'AQI',
        co2: 'ppm'
    };
    return units[parameter] || '';
}

function formatThreshold(threshold: number | [number, number], unit: string): string {
    if (typeof threshold === 'number') {
        return `${threshold}${unit}`;
    }
    return `${threshold[0]}-${threshold[1]}${unit}`;
}
