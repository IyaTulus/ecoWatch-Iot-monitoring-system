// Alert Composable

import { ref, computed } from 'vue';
import { alertEngine, Alert } from './alert.engine';
import { AlertParameter } from './alert.rules';

export function useAlert() {
    const alerts = ref<Alert[]>([]);

    /**
     * Evaluate sensor reading and update alerts
     */
    const evaluateReading = (
        deviceId: string,
        parameter: AlertParameter,
        value: number
    ) => {
        const newAlerts = alertEngine.evaluate(deviceId, parameter, value);

        // Update reactive alerts list
        alerts.value = alertEngine.getActiveAlerts();

        return newAlerts;
    };

    /**
     * Acknowledge an alert
     */
    const acknowledge = (alertId: string) => {
        alertEngine.acknowledgeAlert(alertId);
        alerts.value = alertEngine.getActiveAlerts();
    };

    /**
     * Get alerts by severity
     */
    const criticalAlerts = computed(() =>
        alerts.value.filter(a => a.severity === 'CRITICAL' && !a.acknowledgedAt)
    );

    const warningAlerts = computed(() =>
        alerts.value.filter(a => a.severity === 'WARNING' && !a.acknowledgedAt)
    );

    const infoAlerts = computed(() =>
        alerts.value.filter(a => a.severity === 'INFO' && !a.acknowledgedAt)
    );

    /**
     * Get unacknowledged alert count
     */
    const unacknowledgedCount = computed(() =>
        alerts.value.filter(a => !a.acknowledgedAt).length
    );

    /**
     * Refresh alerts from engine
     */
    const refresh = () => {
        alerts.value = alertEngine.getActiveAlerts();
    };

    return {
        alerts,
        criticalAlerts,
        warningAlerts,
        infoAlerts,
        unacknowledgedCount,
        evaluateReading,
        acknowledge,
        refresh
    };
}
