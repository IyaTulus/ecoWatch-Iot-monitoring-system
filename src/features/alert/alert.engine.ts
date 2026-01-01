// Alert Engine

import { ALERT_RULES, AlertRule, AlertParameter, AlertSeverity } from './alert.rules';

export interface Alert {
    id: string;
    ruleId: string;
    deviceId: string;
    parameter: AlertParameter;
    currentValue: number;
    threshold: number | [number, number];
    severity: AlertSeverity;
    triggeredAt: Date;
    acknowledgedAt?: Date;
    resolvedAt?: Date;
    message: string;
    recommendation: string;
}

interface ViolationTracker {
    ruleId: string;
    deviceId: string;
    startedAt: Date;
    lastValue: number;
}

class AlertEngine {
    private violations: Map<string, ViolationTracker> = new Map();
    private activeAlerts: Map<string, Alert> = new Map();

    /**
     * Evaluate sensor reading against all rules
     */
    evaluate(
        deviceId: string,
        parameter: AlertParameter,
        value: number,
        timestamp: Date = new Date()
    ): Alert[] {
        const newAlerts: Alert[] = [];

        // Find applicable rules for this parameter
        const rules = ALERT_RULES.filter(r => r.parameter === parameter);

        for (const rule of rules) {
            const isViolating = this.checkCondition(value, rule);
            const violationKey = `${rule.id}-${deviceId}`;

            if (isViolating) {
                // Track violation
                if (!this.violations.has(violationKey)) {
                    this.violations.set(violationKey, {
                        ruleId: rule.id,
                        deviceId,
                        startedAt: timestamp,
                        lastValue: value
                    });
                } else {
                    // Update last value
                    const tracker = this.violations.get(violationKey)!;
                    tracker.lastValue = value;
                }

                // Check if duration threshold met
                const tracker = this.violations.get(violationKey)!;
                const duration = timestamp.getTime() - tracker.startedAt.getTime();

                // Create alert if duration met (or no duration required) and alert doesn't exist
                if (!rule.duration || duration >= rule.duration) {
                    if (!this.activeAlerts.has(violationKey)) {
                        const alert = this.createAlert(rule, deviceId, value, tracker.startedAt);
                        this.activeAlerts.set(violationKey, alert);
                        newAlerts.push(alert);
                    }
                }
            } else {
                // Violation resolved
                this.violations.delete(violationKey);

                // Resolve active alert if exists
                if (this.activeAlerts.has(violationKey)) {
                    const alert = this.activeAlerts.get(violationKey)!;
                    alert.resolvedAt = timestamp;
                    this.activeAlerts.delete(violationKey);
                }
            }
        }

        return newAlerts;
    }

    /**
     * Check if value violates rule condition
     */
    private checkCondition(value: number, rule: AlertRule): boolean {
        switch (rule.condition) {
            case 'above':
                return value > (rule.threshold as number);
            case 'below':
                return value < (rule.threshold as number);
            case 'between':
                const [min, max] = rule.threshold as [number, number];
                return value >= min && value <= max;
            default:
                return false;
        }
    }

    /**
     * Create alert object from rule and current data
     */
    private createAlert(
        rule: AlertRule,
        deviceId: string,
        value: number,
        triggeredAt: Date
    ): Alert {
        return {
            id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ruleId: rule.id,
            deviceId,
            parameter: rule.parameter,
            currentValue: value,
            threshold: rule.threshold,
            severity: rule.severity,
            triggeredAt,
            message: rule.message,
            recommendation: rule.recommendation
        };
    }

    /**
     * Get all active alerts
     */
    getActiveAlerts(): Alert[] {
        return Array.from(this.activeAlerts.values());
    }

    /**
     * Get active alerts for specific device
     */
    getDeviceAlerts(deviceId: string): Alert[] {
        return this.getActiveAlerts().filter(a => a.deviceId === deviceId);
    }

    /**
     * Acknowledge an alert
     */
    acknowledgeAlert(alertId: string): void {
        for (const [key, alert] of this.activeAlerts.entries()) {
            if (alert.id === alertId) {
                alert.acknowledgedAt = new Date();
                break;
            }
        }
    }

    /**
     * Clear all alerts (for testing)
     */
    clearAll(): void {
        this.violations.clear();
        this.activeAlerts.clear();
    }
}

// Singleton instance
export const alertEngine = new AlertEngine();
