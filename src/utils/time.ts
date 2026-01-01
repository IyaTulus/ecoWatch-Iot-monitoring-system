// Time Utilities

/**
 * Format duration in milliseconds to human-readable string
 */
export function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    }
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

/**
 * Format timestamp to relative time (e.g., "5 minutes ago")
 */
export function formatRelativeTime(date: Date | string): string {
    const now = new Date();
    const then = new Date(date);
    const ms = now.getTime() - then.getTime();

    if (ms < 0) return 'just now';

    const duration = formatDuration(ms);
    return `${duration} ago`;
}

/**
 * Format date to locale string
 */
export function formatDateTime(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format date to time only
 */
export function formatTime(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
}
