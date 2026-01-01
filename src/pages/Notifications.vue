<!-- Contextual Notifications Page -->
<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <i class="pi pi-comment text-2xl text-white"></i>
                    </div>
                    Contextual Notifications
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Notifikasi dengan informasi lokasi, nilai, dan rekomendasi tindakan
                </p>
            </div>
            <div class="flex items-center gap-2">
                <Button v-if="unreadCount > 0" label="Mark All Read" icon="pi pi-check" @click="markAllAsRead"
                    severity="secondary" size="small" />
            </div>
        </div>

        <!-- Notification Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card class="shadow-sm border-l-4 border-blue-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Notifications</div>
                            <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ notifications.length }}
                            </div>
                        </div>
                        <i class="pi pi-inbox text-4xl text-blue-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-orange-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Unread</div>
                            <div class="text-3xl font-bold text-orange-600">{{ unreadCount }}</div>
                        </div>
                        <i class="pi pi-envelope text-4xl text-orange-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-red-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Critical</div>
                            <div class="text-3xl font-bold text-red-600">{{ criticalNotifications.length }}</div>
                        </div>
                        <i class="pi pi-exclamation-circle text-4xl text-red-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-yellow-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Warning</div>
                            <div class="text-3xl font-bold text-yellow-600">{{ warningNotifications.length }}</div>
                        </div>
                        <i class="pi pi-exclamation-triangle text-4xl text-yellow-500 opacity-20"></i>
                    </div>
                </template>
            </Card>
        </div>

        <!-- Notifications List -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div class="flex items-center gap-2">
                        <i class="pi pi-list text-emerald-600"></i>
                        All Notifications
                    </div>
                    <div class="flex items-center gap-2">
                        <SelectButton v-model="filterSeverity" :options="severityOptions" optionLabel="label"
                            optionValue="value" size="small" />
                    </div>
                </div>
            </template>
            <template #content>
                <div v-if="filteredNotifications.length > 0" class="space-y-3">
                    <div v-for="notification in filteredNotifications" :key="notification.id"
                        class="p-4 rounded-lg border transition-all hover:shadow-md" :class="[
                            notification.read ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800',
                            getSeverityBorderClass(notification.severity)
                        ]">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex-1">
                                <!-- Header -->
                                <div class="flex items-center gap-2 mb-2 flex-wrap">
                                    <SeverityBadge :severity="notification.severity" />
                                    <span class="text-xs text-gray-500 dark:text-gray-400">
                                        {{ formatRelativeTime(notification.timestamp) }}
                                    </span>
                                    <span v-if="!notification.read"
                                        class="px-2 py-0.5 text-xs font-semibold bg-blue-500 text-white rounded-full">
                                        NEW
                                    </span>
                                </div>

                                <!-- Message -->
                                <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    {{ notification.message }}
                                </h4>

                                <!-- Context Info -->
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Device</div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">
                                            {{ notification.deviceId }}</div>
                                    </div>
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Location</div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">
                                            {{ notification.deviceLocation }}</div>
                                    </div>
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Parameter</div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">
                                            {{ notification.parameter }}</div>
                                    </div>
                                    <div v-if="notification.duration">
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">
                                            {{ notification.duration }}</div>
                                    </div>
                                </div>

                                <!-- Recommendation -->
                                <div
                                    class="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                    <div class="flex items-start gap-2">
                                        <i class="pi pi-lightbulb text-blue-600 mt-0.5"></i>
                                        <div>
                                            <div class="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                                Recommended Action</div>
                                            <div class="text-sm text-blue-800 dark:text-blue-200">
                                                {{ notification.recommendation }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-col gap-2">
                                <Button v-if="!notification.read" icon="pi pi-check"
                                    @click="markAsRead(notification.id)" severity="success" size="small" text rounded
                                    aria-label="Mark as read" />
                                <Button icon="pi pi-trash" @click="dismiss(notification.id)" severity="danger"
                                    size="small" text rounded aria-label="Dismiss" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <EmptyState v-else icon="pi pi-inbox" title="No Notifications"
                    message="Tidak ada notifikasi untuk ditampilkan" />
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import { IotService } from '@/services/iotService';
import SeverityBadge from '@/components/ui/SeverityBadge.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import { formatRelativeTime } from '@/utils/time';

const notifications = ref([]);
const notificationStats = ref({
    total: 0,
    unread: 0,
    critical: 0,
    warning: 0,
    info: 0
});
const isLoading = ref(false);

const filterSeverity = ref('all');
const severityOptions = [
    { label: 'All', value: 'all' },
    { label: 'Critical', value: 'CRITICAL' },
    { label: 'Warning', value: 'WARNING' },
    { label: 'Info', value: 'INFO' }
];

const unreadCount = computed(() => notificationStats.value.unread);
const criticalNotifications = computed(() =>
    notifications.value.filter(n => n.severity === 'CRITICAL')
);
const warningNotifications = computed(() =>
    notifications.value.filter(n => n.severity === 'WARNING')
);

const filteredNotifications = computed(() => {
    if (filterSeverity.value === 'all') {
        return notifications.value;
    }
    return notifications.value.filter(n => n.severity === filterSeverity.value);
});

const loadNotifications = async () => {
    isLoading.value = true;
    try {
        const [notifs, stats] = await Promise.all([
            IotService.getNotifications(),
            IotService.getNotificationStats()
        ]);
        notifications.value = notifs;
        notificationStats.value = stats;
    } catch (error) {
        console.error('Failed to load notifications:', error);
    } finally {
        isLoading.value = false;
    }
};

const markAsRead = async (notificationId) => {
    try {
        await IotService.markNotificationRead(notificationId);
        const notif = notifications.value.find(n => n.id === notificationId);
        if (notif) {
            notif.read = true;
            notificationStats.value.unread--;
        }
    } catch (error) {
        console.error('Failed to mark notification as read:', error);
    }
};

const dismiss = async (notificationId) => {
    try {
        await IotService.dismissNotification(notificationId);
        const index = notifications.value.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            const wasUnread = !notifications.value[index].read;
            notifications.value.splice(index, 1);
            notificationStats.value.total--;
            if (wasUnread) {
                notificationStats.value.unread--;
            }
        }
    } catch (error) {
        console.error('Failed to dismiss notification:', error);
    }
};

const markAllAsRead = async () => {
    try {
        await IotService.markAllNotificationsRead();
        notifications.value.forEach(n => n.read = true);
        notificationStats.value.unread = 0;
    } catch (error) {
        console.error('Failed to mark all as read:', error);
    }
};

const getSeverityBorderClass = (severity) => {
    switch (severity) {
        case 'CRITICAL':
            return 'border-l-4 border-l-red-500';
        case 'WARNING':
            return 'border-l-4 border-l-orange-500';
        case 'INFO':
            return 'border-l-4 border-l-blue-500';
        default:
            return '';
    }
};

onMounted(async () => {
    await loadNotifications();
});
</script>
