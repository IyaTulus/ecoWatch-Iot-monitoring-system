<!-- Enhanced Dashboard with Hero Section and 3 Core Focus Areas -->
<template>
    <div class="space-y-6">
        <!-- Hero Section - System Overview -->
        <div
            class="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600 p-8 shadow-xl">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute inset-0"
                    style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;">
                </div>
            </div>

            <div class="relative z-10">
                <div class="flex items-start justify-between mb-6">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <i class="pi pi-shield text-4xl text-white"></i>
                            <h1 class="text-3xl md:text-4xl font-bold text-white">
                                Alert-Driven IoT Dashboard
                            </h1>
                        </div>
                        <p class="text-lg text-white/90 max-w-2xl">
                            Sistem monitoring lingkungan real-time dengan deteksi anomali otomatis,
                            notifikasi kontekstual, dan pemantauan kesehatan perangkat
                        </p>
                    </div>
                    <div class="hidden lg:block">
                        <div class="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <i class="pi pi-chart-line text-5xl text-white"></i>
                        </div>
                    </div>
                </div>

                <!-- 3 Core Focus Areas -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Focus 1: Smart Alerts -->
                    <div
                        class="bg-white/10 backdrop-blur rounded-lg p-5 border border-white/20 hover:bg-white/15 transition-all">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                                <i class="pi pi-bell text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-white">Smart Alerts</h3>
                        </div>
                        <p class="text-sm text-white/80 mb-3">
                            Deteksi anomali otomatis dengan threshold dinamis dan durasi tracking
                        </p>
                        <div class="flex items-center gap-2">
                            <SeverityBadge severity="CRITICAL" />
                            <span class="text-xs text-white/70">{{ criticalAlerts.length }} Active</span>
                        </div>
                    </div>

                    <!-- Focus 2: Contextual Notifications -->
                    <div
                        class="bg-white/10 backdrop-blur rounded-lg p-5 border border-white/20 hover:bg-white/15 transition-all">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                                <i class="pi pi-comment text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-white">Contextual Notifications</h3>
                        </div>
                        <p class="text-sm text-white/80 mb-3">
                            Notifikasi dengan informasi lokasi, nilai, dan rekomendasi tindakan
                        </p>
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center">
                                <span class="text-xs font-bold text-white">{{ unreadCount }}</span>
                            </div>
                            <span class="text-xs text-white/70">Unread Messages</span>
                        </div>
                    </div>

                    <!-- Focus 3: Device Health -->
                    <div
                        class="bg-white/10 backdrop-blur rounded-lg p-5 border border-white/20 hover:bg-white/15 transition-all">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                                <i class="pi pi-heart text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-white">Device Health</h3>
                        </div>
                        <p class="text-sm text-white/80 mb-3">
                            Monitoring status online/offline, baterai, dan last-seen timestamp
                        </p>
                        <div class="flex items-center gap-3 text-xs text-white/90">
                            <div class="flex items-center gap-1">
                                <span class="w-2 h-2 rounded-full bg-green-400"></span>
                                <span>{{ summary.healthy }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="w-2 h-2 rounded-full bg-orange-400"></span>
                                <span>{{ summary.warning }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="w-2 h-2 rounded-full bg-red-400"></span>
                                <span>{{ summary.critical }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alert Panel -->
        <AlertPanel v-if="API_CONFIG.features.alertSystem" />

        <!-- Device Health Summary -->
        <Card v-if="API_CONFIG.features.deviceHealth && hasIssues" class="shadow-sm border-l-4 border-orange-500">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-exclamation-triangle text-orange-600"></i>
                    <span>Device Health Alert</span>
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div class="text-3xl font-bold text-green-600">{{ summary.healthy }}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Healthy</div>
                    </div>
                    <div class="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <div class="text-3xl font-bold text-orange-600">{{ summary.warning }}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Warning</div>
                    </div>
                    <div class="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                        <div class="text-3xl font-bold text-red-600">{{ summary.critical }}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Critical</div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Sensor Metrics Grid -->
        <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <i class="pi pi-chart-bar text-emerald-600"></i>
                Real-time Sensor Metrics
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <Card class="shadow-sm hover:shadow-md transition-shadow border-t-4 border-emerald-500">
                    <template #title>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 dark:text-gray-300">Suhu Udara</span>
                            <i class="pi pi-thermometer text-2xl text-emerald-500"></i>
                        </div>
                    </template>
                    <template #content>
                        <div class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {{ metrics.temperature.toFixed(1) }}°C
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Rata-rata area pemantauan
                        </p>
                    </template>
                </Card>

                <Card class="shadow-sm hover:shadow-md transition-shadow border-t-4 border-sky-500">
                    <template #title>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 dark:text-gray-300">Kelembapan</span>
                            <i class="pi pi-compass text-2xl text-sky-500"></i>
                        </div>
                    </template>
                    <template #content>
                        <div class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {{ metrics.humidity }}%
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Kondisi kelembapan terkini
                        </p>
                    </template>
                </Card>

                <Card class="shadow-sm hover:shadow-md transition-shadow border-t-4 border-amber-500">
                    <template #title>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 dark:text-gray-300">Kualitas Udara</span>
                            <i class="pi pi-cloud text-2xl text-amber-500"></i>
                        </div>
                    </template>
                    <template #content>
                        <div class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {{ metrics.airQualityIndex }}
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            AQI - Status Normal
                        </p>
                    </template>
                </Card>

                <Card class="shadow-sm hover:shadow-md transition-shadow border-t-4 border-red-500">
                    <template #title>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 dark:text-gray-300">Kadar CO₂</span>
                            <i class="pi pi-sitemap text-2xl text-red-500"></i>
                        </div>
                    </template>
                    <template #content>
                        <div class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {{ metrics.co2 }}
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            ppm - Dalam batas aman
                        </p>
                    </template>
                </Card>
            </div>
        </div>

        <!-- Chart Section -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-chart-line text-emerald-600"></i>
                    Tren Kualitas Udara (24 Jam)
                </div>
            </template>
            <template #content>
                <div class="h-64">
                    <!-- Loading state -->
                    <div v-if="isTrendLoading" class="h-full flex items-end gap-2 animate-pulse">
                        <div v-for="i in 6" :key="i" class="flex flex-col items-center flex-1 min-w-0">
                            <div class="h-4 w-6 bg-gray-200 dark:bg-gray-700 mb-2 rounded"></div>
                            <div class="w-full rounded-t-md bg-gray-200 dark:bg-gray-700 h-3"></div>
                            <span class="text-xs text-gray-300 dark:text-gray-500 mt-2">&nbsp;</span>
                        </div>
                    </div>

                    <!-- Render data -->
                    <div v-else-if="trend && trend.length" class="h-full flex items-end gap-2">
                        <div v-for="point in trend" :key="point.hour" class="flex flex-col items-center flex-1 min-w-0">
                            <div class="text-xs text-gray-900 dark:text-gray-100 mb-1 select-none font-semibold">
                                {{ point.aqi }}
                            </div>
                            <div class="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-400 dark:from-emerald-600 dark:to-emerald-500 transition-all border border-emerald-300 dark:border-emerald-700 shadow-sm"
                                :style="{ height: barHeight(point) }" :title="`AQI: ${point.aqi} at ${point.hour}`">
                            </div>
                            <span
                                class="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ point.hour }}</span>
                        </div>
                    </div>

                    <!-- No data -->
                    <div v-else class="h-full flex items-center justify-center">
                        <EmptyState icon="pi pi-chart-line" title="No Trend Data"
                            message="Tidak ada data tren untuk ditampilkan" />
                    </div>
                </div>
            </template>
        </Card>

        <!-- Device Status Table -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-server text-emerald-600"></i>
                    Status Perangkat IoT
                </div>
            </template>
            <template #content>
                <div class="overflow-auto">
                    <DataTable :value="healthList" class="text-sm" stripedRows>
                        <Column field="deviceId" header="ID Perangkat">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-microchip text-emerald-600"></i>
                                    <span class="font-mono font-semibold">{{ data.deviceId }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="location" header="Lokasi">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-map-marker text-gray-400 text-xs"></i>
                                    <span>{{ data.location }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="batteryLevel" header="Baterai">
                            <template #body="{ data }">
                                <div v-if="data.batteryLevel !== undefined" class="flex items-center gap-2">
                                    <i class="pi pi-bolt" :class="getBatteryClass(data.batteryLevel)"></i>
                                    <span class="font-semibold">{{ data.batteryLevel }}%</span>
                                </div>
                                <span v-else class="text-gray-400">N/A</span>
                            </template>
                        </Column>
                        <Column header="Status">
                            <template #body="{ data }">
                                <Tag :value="statusLabel(data.status)" :severity="statusSeverity(data.status)" />
                            </template>
                        </Column>
                        <Column v-if="API_CONFIG.features.deviceHealth" header="Health">
                            <template #body="{ data }">
                                <SeverityBadge :severity="data.healthStatus" />
                            </template>
                        </Column>
                        <Column header="Last Seen">
                            <template #body="{ data }">
                                <div class="flex items-center gap-1 text-xs">
                                    <i class="pi pi-clock text-gray-400"></i>
                                    <span>{{ formatRelativeTime(data.lastSeen) }}</span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, computed } from "vue";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import { IotService } from "../services/iotService";
import { API_CONFIG } from "../services/api.config";
import AlertPanel from "@/features/alert/AlertPanel.vue";
import SeverityBadge from "@/components/ui/SeverityBadge.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import { formatRelativeTime } from "@/utils/time";

const metrics = reactive({
    temperature: 0,
    humidity: 0,
    airQualityIndex: 0,
    co2: 0,
});

const trend = ref([]);
const isTrendLoading = ref(true);
const healthList = ref([]);
const summary = ref({
    total: 0,
    healthy: 0,
    warning: 0,
    critical: 0
});
const hasIssues = computed(() => summary.value.warning > 0 || summary.value.critical > 0);
const criticalAlerts = ref([]);
const unreadCount = ref(0);

let refreshInterval;

const maxAqi = computed(() =>
    trend.value.length ? Math.max(...trend.value.map((p) => p.aqi)) || 1 : 1
);

const barHeight = (point) => {
    const max = maxAqi.value || 1;
    const pct = (point.aqi / max) * 100;
    const height = Math.max(pct, 6);
    return height + "px";
};

const statusLabel = (status) => {
    switch (status) {
        case "online":
            return "Online";
        case "low_battery":
            return "Low Battery";
        case "offline":
            return "Offline";
        default:
            return status;
    }
};

const statusSeverity = (status) => {
    switch (status) {
        case "online":
            return "success";
        case "low_battery":
            return "warning";
        case "offline":
            return "danger";
        default:
            return "info";
    }
};

const getBatteryClass = (level) => {
    if (level < 20) return 'text-red-500';
    if (level < 50) return 'text-orange-500';
    return 'text-green-500';
};

async function loadData() {
    try {
        // Fetch all data in parallel
        const [
            metricsData,
            trendData,
            healthData,
            healthSummaryData,
            alertsData,
            notificationStatsData
        ] = await Promise.all([
            IotService.getDashboardMetrics(),
            IotService.getAirQualityTrend(),
            IotService.getDeviceHealth(),
            IotService.getHealthSummary(),
            IotService.getAlerts('CRITICAL'),
            IotService.getNotificationStats()
        ]);

        // Update metrics
        metrics.temperature = metricsData.temperature;
        metrics.humidity = metricsData.humidity;
        metrics.airQualityIndex = metricsData.airQualityIndex;
        metrics.co2 = metricsData.co2;

        // Update trend
        trend.value = trendData;
        isTrendLoading.value = false;

        // Update device health
        healthList.value = healthData;
        summary.value = healthSummaryData;

        // Update alerts and notifications
        criticalAlerts.value = alertsData;
        unreadCount.value = notificationStatsData.unread;

    } catch (error) {
        console.error('Failed to load dashboard data:', error);
        isTrendLoading.value = false;
    }
}

onMounted(async () => {
    await loadData();

    // Set up auto-refresh
    refreshInterval = setInterval(loadData, API_CONFIG.intervals.sensorRefresh);
});

onUnmounted(() => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
});
</script>
