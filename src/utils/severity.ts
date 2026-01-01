// Severity Utilities

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

/**
 * Get PrimeVue severity for Tag component
 */
export function getSeverityTag(severity: AlertSeverity): 'success' | 'info' | 'warn' | 'danger' {
    switch (severity) {
        case 'INFO':
            return 'info';
        case 'WARNING':
            return 'warn';
        case 'CRITICAL':
            return 'danger';
        default:
            return 'info';
    }
}

/**
 * Get color for severity
 */
export function getSeverityColor(severity: AlertSeverity): string {
    switch (severity) {
        case 'INFO':
            return 'blue';
        case 'WARNING':
            return 'orange';
        case 'CRITICAL':
            return 'red';
        default:
            return 'gray';
    }
}

/**
 * Get icon for severity
 */
export function getSeverityIcon(severity: AlertSeverity): string {
    switch (severity) {
        case 'INFO':
            return 'pi pi-info-circle';
        case 'WARNING':
            return 'pi pi-exclamation-triangle';
        case 'CRITICAL':
            return 'pi pi-times-circle';
        default:
            return 'pi pi-info-circle';
    }
}

/**
 * Compare severity levels (higher number = more severe)
 */
export function compareSeverity(a: AlertSeverity, b: AlertSeverity): number {
    const levels = { INFO: 1, WARNING: 2, CRITICAL: 3 };
    return levels[a] - levels[b];
}
