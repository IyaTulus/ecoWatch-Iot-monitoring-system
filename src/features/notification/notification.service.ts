// Notification Service

import { API_CONFIG } from '@/services/api.config';
import { httpClient } from '@/services/http';
import type { Notification } from './notification.mapper';

// In-memory storage for dummy mode
const dummyNotifications: Notification[] = [];

export async function fetchNotifications(): Promise<Notification[]> {
    if (API_CONFIG.useDummyData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 150));
        return [...dummyNotifications];
    }

    // Real API call
    return httpClient.get<Notification[]>('/notifications');
}

export async function markNotificationRead(id: string): Promise<void> {
    if (API_CONFIG.useDummyData) {
        await new Promise(resolve => setTimeout(resolve, 100));
        const notif = dummyNotifications.find(n => n.id === id);
        if (notif) notif.read = true;
        return;
    }

    await httpClient.post(`/notifications/${id}/read`, {});
}

export async function dismissNotification(id: string): Promise<void> {
    if (API_CONFIG.useDummyData) {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = dummyNotifications.findIndex(n => n.id === id);
        if (index !== -1) {
            dummyNotifications.splice(index, 1);
        }
        return;
    }

    await httpClient.delete(`/notifications/${id}`);
}

export async function createNotification(notification: Notification): Promise<void> {
    if (API_CONFIG.useDummyData) {
        await new Promise(resolve => setTimeout(resolve, 100));
        dummyNotifications.unshift(notification);
        return;
    }

    await httpClient.post('/notifications', notification);
}
