<!-- Device Health Page -->
<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <i class="pi pi-heart text-2xl text-white"></i>
                    </div>
                    Device Health Monitoring
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Monitoring status online/offline, baterai, dan last-seen timestamp
                </p>
            </div>
        </div>

        <!-- Health Summary -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card class="shadow-sm border-l-4 border-gray-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Devices</div>
                            <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ summary.total }}</div>
                        </div>
                        <i class="pi pi-server text-4xl text-gray-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-green-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Healthy</div>
                            <div class="text-3xl font-bold text-green-600">{{ summary.healthy }}</div>
                        </div>
                        <i class="pi pi-check-circle text-4xl text-green-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-orange-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Warning</div>
                            <div class="text-3xl font-bold text-orange-600">{{ summary.warning }}</div>
                        </div>
                        <i class="pi pi-exclamation-triangle text-4xl text-orange-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-red-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Critical</div>
                            <div class="text-3xl font-bold text-red-600">{{ summary.critical }}</div>
                        </div>
                        <i class="pi pi-times-circle text-4xl text-red-500 opacity-20"></i>
                    </div>
                </template>
            </Card>
        </div>

        <!-- Health Rules -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-shield text-emerald-600"></i>
                    Health Monitoring Rules
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        class="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                        <div class="flex items-center gap-2 mb-3">
                            <i class="pi pi-clock text-orange-600 text-xl"></i>
                            <span class="font-semibold text-orange-900 dark:text-orange-100">Offline Detection</span>
                        </div>
                        <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                            <li class="flex items-start gap-2">
                                <span class="font-semibold text-orange-600">WARNING:</span>
                                <span>No data received > 5 minutes</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="font-semibold text-red-600">CRITICAL:</span>
                                <span>Device offline > 15 minutes</span>
                            </li>
                        </ul>
                    </div>

                    <div
                        class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div class="flex items-center gap-2 mb-3">
                            <i class="pi pi-bolt text-blue-600 text-xl"></i>
                            <span class="font-semibold text-blue-900 dark:text-blue-100">Battery Monitoring</span>
                        </div>
                        <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                            <li class="flex items-start gap-2">
                                <span class="font-semibold text-orange-600">WARNING:</span>
                                <span>Battery level < 20%</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="font-semibold text-red-600">CRITICAL:</span>
                                <span>Battery level < 10%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Critical Devices -->
        <Card v-if="criticalDevices.length > 0" class="shadow-sm border-l-4 border-red-500">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-exclamation-circle text-red-600"></i>
                    Critical Devices ({{ criticalDevices.length }})
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DeviceStatusCard v-for="device in criticalDevices" :key="device.deviceId" :health="device" />
                </div>
            </template>
        </Card>

        <!-- Warning Devices -->
        <Card v-if="warningDevices.length > 0" class="shadow-sm border-l-4 border-orange-500">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-exclamation-triangle text-orange-600"></i>
                    Warning Devices ({{ warningDevices.length }})
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DeviceStatusCard v-for="device in warningDevices" :key="device.deviceId" :health="device" />
                </div>
            </template>
        </Card>

        <!-- Healthy Devices -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-green-600"></i>
                    Healthy Devices ({{ healthyDevices.length }})
                </div>
            </template>
            <template #content>
                <div v-if="healthyDevices.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DeviceStatusCard v-for="device in healthyDevices" :key="device.deviceId" :health="device" />
                </div>
                <EmptyState v-else icon="pi pi-inbox" title="No Healthy Devices"
                    message="Tidak ada perangkat dalam kondisi sehat saat ini" />
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Card from 'primevue/card';
import { IotService } from '@/services/iotService';
import DeviceStatusCard from '@/features/device/DeviceStatusCard.vue';
import EmptyState from '@/components/ui/EmptyState.vue';

const healthList = ref([]);
const summary = ref({
    total: 0,
    healthy: 0,
    warning: 0,
    critical: 0
});
const isLoading = ref(false);

const healthyDevices = computed(() =>
    healthList.value.filter(h => h.healthStatus === 'HEALTHY')
);

const warningDevices = computed(() =>
    healthList.value.filter(h => h.healthStatus === 'WARNING')
);

const criticalDevices = computed(() =>
    healthList.value.filter(h => h.healthStatus === 'CRITICAL')
);

const loadDeviceHealth = async () => {
    isLoading.value = true;
    try {
        const [health, stats] = await Promise.all([
            IotService.getDeviceHealth(),
            IotService.getHealthSummary()
        ]);
        healthList.value = health;
        summary.value = stats;
    } catch (error) {
        console.error('Failed to load device health:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    loadDeviceHealth();
});
</script>
