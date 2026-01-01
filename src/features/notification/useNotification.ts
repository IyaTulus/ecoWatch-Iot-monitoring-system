// Notification Composable

import { ref, computed } from 'vue';
import type { Notification } from './notification.mapper';
import { fetchNotifications, markNotificationRead, dismissNotification, createNotification } from './notification.service';

export function useNotification() {
    const notifications = ref<Notification[]>([]);
    const isLoading = ref(false);

    /**
     * Load notifications from service
     */
    const loadNotifications = async () => {
        isLoading.value = true;
        try {
            notifications.value = await fetchNotifications();
        } catch (error) {
            console.error('Failed to load notifications:', error);
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Add new notification
     */
    const addNotification = async (notification: Notification) => {
        try {
            await createNotification(notification);
            notifications.value.unshift(notification);
        } catch (error) {
            console.error('Failed to create notification:', error);
        }
    };

    /**
     * Mark notification as read
     */
    const markAsRead = async (notificationId: string) => {
        try {
            await markNotificationRead(notificationId);
            const notif = notifications.value.find(n => n.id === notificationId);
            if (notif) {
                notif.read = true;
            }
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    /**
     * Dismiss notification
     */
    const dismiss = async (notificationId: string) => {
        try {
            await dismissNotification(notificationId);
            const index = notifications.value.findIndex(n => n.id === notificationId);
            if (index !== -1) {
                notifications.value.splice(index, 1);
            }
        } catch (error) {
            console.error('Failed to dismiss notification:', error);
        }
    };

    /**
     * Get unread count
     */
    const unreadCount = computed(() =>
        notifications.value.filter(n => !n.read).length
    );

    /**
     * Get notifications by severity
     */
    const criticalNotifications = computed(() =>
        notifications.value.filter(n => n.severity === 'CRITICAL')
    );

    const warningNotifications = computed(() =>
        notifications.value.filter(n => n.severity === 'WARNING')
    );

    const infoNotifications = computed(() =>
        notifications.value.filter(n => n.severity === 'INFO')
    );

    /**
     * Mark all as read
     */
    const markAllAsRead = async () => {
        const unread = notifications.value.filter(n => !n.read);
        for (const notif of unread) {
            await markAsRead(notif.id);
        }
    };

    /**
     * Clear all notifications
     */
    const clearAll = () => {
        notifications.value = [];
    };

    return {
        notifications,
        isLoading,
        unreadCount,
        criticalNotifications,
        warningNotifications,
        infoNotifications,
        loadNotifications,
        addNotification,
        markAsRead,
        dismiss,
        markAllAsRead,
        clearAll
    };
}
