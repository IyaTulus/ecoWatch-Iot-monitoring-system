<!-- Smart Alerts Page -->
<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <i class="pi pi-bell text-2xl text-white"></i>
                    </div>
                    Smart Alerts
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Deteksi anomali otomatis dengan threshold dinamis dan duration tracking
                </p>
            </div>
            <div class="flex items-center gap-2">
                <Button label="Refresh" icon="pi pi-refresh" @click="refresh" severity="secondary" size="small" />
            </div>
        </div>

        <!-- Alert Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card class="shadow-sm border-l-4 border-red-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Critical Alerts</div>
                            <div class="text-3xl font-bold text-red-600">{{ criticalAlerts.length }}</div>
                        </div>
                        <i class="pi pi-exclamation-circle text-4xl text-red-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-orange-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Warning Alerts</div>
                            <div class="text-3xl font-bold text-orange-600">{{ warningAlerts.length }}</div>
                        </div>
                        <i class="pi pi-exclamation-triangle text-4xl text-orange-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-blue-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Info Alerts</div>
                            <div class="text-3xl font-bold text-blue-600">{{ infoAlerts.length }}</div>
                        </div>
                        <i class="pi pi-info-circle text-4xl text-blue-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-gray-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Active</div>
                            <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ alerts.length }}</div>
                        </div>
                        <i class="pi pi-chart-bar text-4xl text-gray-500 opacity-20"></i>
                    </div>
                </template>
            </Card>
        </div>

        <!-- Alert Rules Info -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-shield text-emerald-600"></i>
                    Active Alert Rules
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="pi pi-thermometer text-red-600"></i>
                            <span class="font-semibold text-red-900 dark:text-red-100">Temperature Rules</span>
                        </div>
                        <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <li>• CRITICAL: > 35°C (5 min duration)</li>
                            <li>• WARNING: > 30°C (10 min duration)</li>
                            <li>• WARNING: < 15°C (10 min duration)</li>
                        </ul>
                    </div>

                    <div
                        class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="pi pi-compass text-blue-600"></i>
                            <span class="font-semibold text-blue-900 dark:text-blue-100">Humidity Rules</span>
                        </div>
                        <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <li>• WARNING: < 30% (10 min duration)</li>
                            <li>• WARNING: > 85% (10 min duration)</li>
                        </ul>
                    </div>

                    <div
                        class="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="pi pi-cloud text-amber-600"></i>
                            <span class="font-semibold text-amber-900 dark:text-amber-100">Air Quality Rules</span>
                        </div>
                        <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <li>• CRITICAL: AQI > 150 (immediate)</li>
                            <li>• WARNING: AQI > 100 (immediate)</li>
                            <li>• INFO: AQI > 50 (immediate)</li>
                        </ul>
                    </div>

                    <div
                        class="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="pi pi-sitemap text-purple-600"></i>
                            <span class="font-semibold text-purple-900 dark:text-purple-100">CO₂ Rules</span>
                        </div>
                        <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <li>• CRITICAL: > 1500 ppm (5 min duration)</li>
                            <li>• WARNING: > 1000 ppm (10 min duration)</li>
                        </ul>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Active Alerts Panel -->
        <AlertPanel />

        <!-- Empty State -->
        <Card v-if="alerts.length === 0" class="shadow-sm">
            <template #content>
                <EmptyState icon="pi pi-check-circle" title="No Active Alerts"
                    message="Semua parameter sensor dalam kondisi normal. Sistem akan otomatis mendeteksi anomali." />
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { IotService } from '@/services/iotService';
import AlertPanel from '@/features/alert/AlertPanel.vue';
import EmptyState from '@/components/ui/EmptyState.vue';

const alerts = ref([]);
const alertStats = ref({
    total: 0,
    critical: 0,
    warning: 0,
    info: 0,
    unacknowledged: 0
});
const isLoading = ref(false);

const criticalAlerts = computed(() => alerts.value.filter(a => a.severity === 'CRITICAL'));
const warningAlerts = computed(() => alerts.value.filter(a => a.severity === 'WARNING'));
const infoAlerts = computed(() => alerts.value.filter(a => a.severity === 'INFO'));

const loadAlerts = async () => {
    isLoading.value = true;
    try {
        const [alertsData, stats] = await Promise.all([
            IotService.getAlerts(),
            IotService.getAlertStats()
        ]);
        alerts.value = alertsData;
        alertStats.value = stats;
    } catch (error) {
        console.error('Failed to load alerts:', error);
    } finally {
        isLoading.value = false;
    }
};

const refresh = () => {
    loadAlerts();
};

onMounted(() => {
    loadAlerts();
});
</script>
