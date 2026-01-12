<!-- Enhanced Devices Page with Varied Data -->
<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <i class="pi pi-microchip text-2xl text-white"></i>
                    </div>
                    IoT Devices
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Manage and monitor all IoT devices in the network
                </p>
            </div>
            <div class="flex items-center gap-2">
                <Button label="Refresh" icon="pi pi-refresh" @click="loadDevices" severity="secondary" size="small" />
                <Button label="Add Device" icon="pi pi-plus" size="small" />
            </div>
        </div>

        <!-- Device Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card class="shadow-sm border-l-4 border-gray-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Devices</div>
                            <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ deviceStats.total }}
                            </div>
                        </div>
                        <i class="pi pi-server text-4xl text-gray-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-green-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Online</div>
                            <div class="text-3xl font-bold text-green-600">{{ deviceStats.online }}</div>
                        </div>
                        <i class="pi pi-check-circle text-4xl text-green-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-red-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Offline</div>
                            <div class="text-3xl font-bold text-red-600">{{ deviceStats.offline }}</div>
                        </div>
                        <i class="pi pi-times-circle text-4xl text-red-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-orange-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Low Battery</div>
                            <div class="text-3xl font-bold text-orange-600">{{ deviceStats.lowBattery }}</div>
                        </div>
                        <i class="pi pi-bolt text-4xl text-orange-500 opacity-20"></i>
                    </div>
                </template>
            </Card>
        </div>

        <!-- Devices Table -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-list text-emerald-600"></i>
                    All Devices
                </div>
            </template>
            <template #content>
                <div class="overflow-auto">
                    <DataTable :value="devices" class="text-sm" stripedRows :loading="isLoading">
                        <Column field="id" header="Device ID">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-microchip text-emerald-600"></i>
                                    <span class="font-mono font-semibold">{{ data.id }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="type" header="Type">
                            <template #body="{ data }">
                                <Tag :value="data.type" severity="info" />
                            </template>
                        </Column>
                        <Column field="location" header="Location">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-map-marker text-gray-400 text-xs"></i>
                                    <span>{{ data.location }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="battery" header="Battery">
                            <template #body="{ data }">
                                <div v-if="data.battery !== null && data.battery !== undefined"
                                    class="flex items-center gap-2">
                                    <i class="pi pi-bolt" :class="getBatteryClass(data.battery)"></i>
                                    <span class="font-semibold">{{ data.battery }}%</span>
                                </div>
                                <span v-else-if="data.power === 'AC'" class="text-blue-600 font-semibold">AC
                                    Power</span>
                                <span v-else class="text-gray-400">N/A</span>
                            </template>
                        </Column>
                        <Column header="Signal">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-wifi" :class="getSignalClass(data.signalStrength)"></i>
                                    <span class="text-xs">{{ data.signalStrength }} dBm</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="Status">
                            <template #body="{ data }">
                                <Tag :value="statusLabel(data.status)" :severity="statusSeverity(data.status)" />
                            </template>
                        </Column>
                        <Column header="Last Seen">
                            <template #body="{ data }">
                                <div class="flex items-center gap-1 text-xs">
                                    <i class="pi pi-clock text-gray-400"></i>
                                    <span>{{ formatRelativeTime(new Date(data.lastSeen)) }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="Actions">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <Button icon="pi pi-refresh" @click="rebootDevice(data.id)" severity="secondary"
                                        size="small" text rounded aria-label="Reboot"
                                        :disabled="data.status === 'offline'" />
                                    <Button icon="pi pi-eye" severity="info" size="small" text rounded
                                        aria-label="View Details" />
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
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { IotService } from '@/services/iotService';
import { formatRelativeTime } from '@/utils/time';

const devices = ref([]);
const deviceStats = ref({
    total: 0,
    online: 0,
    offline: 0,
    lowBattery: 0,
    avgBattery: 0,
    avgSignalStrength: 0
});
const isLoading = ref(false);

const loadDevices = async () => {
    isLoading.value = true;
    try {
        const [devicesData, stats] = await Promise.all([
            IotService.getDevices(),
            IotService.getDeviceStats()
        ]);
        devices.value = devicesData;
        deviceStats.value = stats;
    } catch (error) {
        console.error('Failed to load devices:', error);
    } finally {
        isLoading.value = false;
    }
};

const rebootDevice = async (deviceId) => {
    try {
        await IotService.rebootDevice(deviceId);
        await loadDevices(); // Reload to see updated status
    } catch (error) {
        console.error('Failed to reboot device:', error);
    }
};

const getBatteryClass = (level) => {
    if (level < 20) return 'text-red-500';
    if (level < 50) return 'text-orange-500';
    return 'text-green-500';
};

const getSignalClass = (strength) => {
    if (strength > -50) return 'text-green-500';
    if (strength > -70) return 'text-orange-500';
    return 'text-red-500';
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

onMounted(() => {
    loadDevices();
});
</script>
