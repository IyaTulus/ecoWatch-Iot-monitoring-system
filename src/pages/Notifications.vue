<template>
    <div class="p-4 space-y-4">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifikasi</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">Daftar peringatan dan informasi penting dari sensor
                </p>
            </div>

            <div class="flex items-center gap-2">
                <Button label="Simulasikan Notifikasi" icon="pi pi-bell" class="p-button-sm"
                    @click="simulateNotification" />
                <Button label="Tandai semua dibaca" class="p-button-text p-button-sm" @click="markAllRead" />
            </div>
        </div>

        <div class="card shadow-sm p-0">
            <div v-if="loading" class="p-6 flex items-center justify-center">
                <div class="text-sm text-gray-500 dark:text-gray-400">Memuat notifikasi…</div>
            </div>

            <div v-else class="p-4">
                <div v-if="notifications.length" class="space-y-3">
                    <div v-for="n in notificationsSorted" :key="n.id"
                        :class="['p-3 rounded border', n.read ? 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800' : 'bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-700']">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex items-start gap-3 min-w-0">
                                <div class="mt-0.5">
                                    <Tag :value="n.severity.toUpperCase()" :severity="n.severity" class="text-xs" />
                                </div>
                                <div class="min-w-0">
                                    <div
                                        :class="['text-sm', !n.read ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-800 dark:text-gray-200']">
                                        {{ n.message }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Perangkat: <span
                                            class="font-medium text-gray-700 dark:text-gray-200">{{ n.deviceId || '—' }}</span>
                                        • {{ formatDate(n.timestamp) }}</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                <Button v-if="!n.read" icon="pi pi-check" class="p-button-text p-button-sm"
                                    @click="markRead(n)" />
                                <Button icon="pi pi-times" class="p-button-text p-button-sm" @click="dismiss(n)" />
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="p-6 text-center text-sm text-gray-500 dark:text-gray-400">Tidak ada notifikasi.</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { IotService } from '../services/iotService';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const notifications = ref([]);
const loading = ref(true);

const loadNotifications = async () => {
    loading.value = true;
    try {
        notifications.value = await IotService.getNotifications();
    } finally {
        loading.value = false;
    }
};

onMounted(loadNotifications);

const notificationsSorted = computed(() => {
    return [...(notifications.value || [])].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
});

const formatDate = (iso) => {
    try {
        const d = new Date(iso);
        return d.toLocaleString();
    } catch (err) {
        return iso;
    }
};

const markRead = async (n) => {
    await IotService.markNotificationRead(n.id);
    await loadNotifications();
};

const dismiss = async (n) => {
    await IotService.dismissNotification(n.id);
    await loadNotifications();
};

const markAllRead = async () => {
    const unread = notifications.value.filter(x => !x.read);
    for (const u of unread) {
        // mark sequentially
        // eslint-disable-next-line no-await-in-loop
        await IotService.markNotificationRead(u.id);
    }
    await loadNotifications();
};

const simulateNotification = async () => {
    // create a simple random notification for demo
    const options = [
        { type: 'co2', severity: 'danger', message: 'Peningkatan CO₂ terdeteksi — ambang batas terlampaui.' },
        { type: 'battery', severity: 'warning', message: 'Baterai hampir habis pada perangkat.' },
        { type: 'info', severity: 'info', message: 'Perangkat berhasil melakukan self-check.' },
    ];
    const pick = options[Math.floor(Math.random() * options.length)];
    await IotService.createNotification({ deviceId: 'ESP32-S001', ...pick });
    await loadNotifications();
};
</script>
