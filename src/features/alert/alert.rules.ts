// Alert Rules

export type AlertParameter = 'temperature' | 'humidity' | 'aqi' | 'co2';
export type AlertCondition = 'above' | 'below' | 'between';
export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface AlertRule {
    id: string;
    parameter: AlertParameter;
    condition: AlertCondition;
    threshold: number | [number, number];
    severity: AlertSeverity;
    duration?: number; // milliseconds
    message: string;
    recommendation: string;
}

export const ALERT_RULES: AlertRule[] = [
    // Temperature Rules
    {
        id: 'temp-critical-high',
        parameter: 'temperature',
        condition: 'above',
        threshold: 35,
        severity: 'CRITICAL',
        duration: 5 * 60 * 1000, // 5 minutes
        message: 'Temperature critically high',
        recommendation: 'Check cooling systems and ensure proper ventilation. Consider evacuating sensitive equipment.'
    },
    {
        id: 'temp-warning-high',
        parameter: 'temperature',
        condition: 'above',
        threshold: 30,
        severity: 'WARNING',
        duration: 10 * 60 * 1000, // 10 minutes
        message: 'Temperature elevated',
        recommendation: 'Monitor temperature trends. Prepare cooling measures if temperature continues to rise.'
    },
    {
        id: 'temp-warning-low',
        parameter: 'temperature',
        condition: 'below',
        threshold: 15,
        severity: 'WARNING',
        duration: 10 * 60 * 1000,
        message: 'Temperature too low',
        recommendation: 'Check heating systems. Protect sensitive plants from cold damage.'
    },

    // Humidity Rules
    {
        id: 'humidity-warning-low',
        parameter: 'humidity',
        condition: 'below',
        threshold: 30,
        severity: 'WARNING',
        duration: 10 * 60 * 1000,
        message: 'Humidity too low',
        recommendation: 'Increase humidity to prevent plant stress. Consider misting or irrigation.'
    },
    {
        id: 'humidity-warning-high',
        parameter: 'humidity',
        condition: 'above',
        threshold: 85,
        severity: 'WARNING',
        duration: 10 * 60 * 1000,
        message: 'Humidity too high',
        recommendation: 'Improve air circulation to prevent mold growth and plant diseases.'
    },

    // AQI Rules
    {
        id: 'aqi-critical',
        parameter: 'aqi',
        condition: 'above',
        threshold: 150,
        severity: 'CRITICAL',
        message: 'Air quality unhealthy',
        recommendation: 'Avoid outdoor activities. Check air filtration systems. Identify pollution source.'
    },
    {
        id: 'aqi-warning',
        parameter: 'aqi',
        condition: 'above',
        threshold: 100,
        severity: 'WARNING',
        message: 'Air quality moderate',
        recommendation: 'Monitor air quality trends. Sensitive individuals should limit outdoor exposure.'
    },
    {
        id: 'aqi-info',
        parameter: 'aqi',
        condition: 'above',
        threshold: 50,
        severity: 'INFO',
        message: 'Air quality acceptable',
        recommendation: 'Air quality is acceptable for most individuals.'
    },

    // CO2 Rules
    {
        id: 'co2-critical',
        parameter: 'co2',
        condition: 'above',
        threshold: 1500,
        severity: 'CRITICAL',
        duration: 5 * 60 * 1000,
        message: 'CO₂ levels dangerously high',
        recommendation: 'Improve ventilation immediately. Check for CO₂ sources. Evacuate if necessary.'
    },
    {
        id: 'co2-warning',
        parameter: 'co2',
        condition: 'above',
        threshold: 1000,
        severity: 'WARNING',
        duration: 10 * 60 * 1000,
        message: 'CO₂ levels elevated',
        recommendation: 'Increase ventilation. Monitor CO₂ trends closely.'
    },
];
