<!-- src/views/DashboardView.vue -->
<template>
    <div class="space-y-6">
        <!-- Grid cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card class="shadow-sm">
                <template #title>
                    <div class="flex items-center justify-between">
                        <span>Suhu Udara</span>
                        <i class="pi pi-thermometer text-emerald-500"></i>
                    </div>
                </template>
                <template #content>
                    <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {{ metrics.temperature.toFixed(1) }}°C
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Rata-rata area pemantauan
                    </p>
                </template>
            </Card>

            <Card class="shadow-sm">
                <template #title>
                    <div class="flex items-center justify-between">
                        <span>Kelembapan Tanah</span>
                        <i class="pi pi-compass text-sky-500"></i>
                    </div>
                </template>
                <template #content>
                    <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {{ metrics.humidity }}%
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Kondisi kelembapan terkini
                    </p>
                </template>
            </Card>

            <Card class="shadow-sm">
                <template #title>
                    <div class="flex items-center justify-between">
                        <span>Kualitas Udara</span>
                        <i class="pi pi-cloud text-amber-500"></i>
                    </div>
                </template>
                <template #content>
                    <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {{ metrics.airQualityIndex }} AQI
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Status: Normal
                    </p>
                </template>
            </Card>

            <Card class="shadow-sm">
                <template #title>
                    <div class="flex items-center justify-between">
                        <span>Kadar CO₂</span>
                        <i class="pi pi-sitemap text-red-500"></i>
                    </div>
                </template>
                <template #content>
                    <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {{ metrics.co2 }} ppm
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Dalam batas aman
                    </p>
                </template>
            </Card>
        </div>

        <!-- Chart dummy -->
        <Card class="shadow-sm">
            <template #title>
                Tren Kualitas Udara (24 Jam)
            </template>
            <template #content>
                <div class="h-64">
                    <!-- If we have trend data render a simple bar chart. Otherwise show a friendly placeholder. -->
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
                            <!-- numeric value displayed above bar for clarity -->
                            <div class="text-xs text-gray-900 dark:text-gray-100 mb-1 select-none">{{ point.aqi }}</div>

                            <!-- bar (min height to keep tiny values visible) -->
                            <div class="w-full rounded-t-md bg-emerald-500 dark:bg-emerald-400 transition-all border border-emerald-200 dark:border-emerald-700"
                                :style="{ height: barHeight(point) }" :title="`AQI: ${point.aqi} at ${point.hour}`">
                            </div>

                            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ point.hour }}</span>
                        </div>
                    </div>

                    <!-- No data -->
                    <div v-else class="h-full flex items-center justify-center">
                        <div class="text-sm text-gray-500 dark:text-gray-400 select-none">Tidak ada data tren untuk
                            ditampilkan</div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Device table -->
        <Card class="shadow-sm">
            <template #title>
                Status Perangkat IoT
            </template>
            <template #content>
                <div class="overflow-auto">
                    <DataTable :value="deviceList" class="text-sm">
                    <Column field="id" header="ID Perangkat" />
                    <Column field="location" header="Lokasi" />
                    <Column field="battery" header="Baterai">
                        <template #body="{ data }">
                            {{ data.battery }}%
                        </template>
                    </Column>
                    <Column header="Status">
                        <template #body="{ data }">
                            <Tag :value="statusLabel(data.status)" :severity="statusSeverity(data.status)" />
                        </template>
                    </Column>
                    </DataTable>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import { IotService } from "../services/iotService";

const metrics = reactive({
    temperature: 0,
    humidity: 0,
    airQualityIndex: 0,
    co2: 0,
});

const trend = ref([]);
const isTrendLoading = ref(true);
const deviceList = ref([]);

const maxAqi = computed(() =>
    trend.value.length ? Math.max(...trend.value.map((p) => p.aqi)) || 1 : 1
);

const barHeight = (point) => {
    const max = maxAqi.value || 1;
    const pct = (point.aqi / max) * 100;
    // Ensure very small bars still visible in the UI
    const height = Math.max(pct, 6);

    console.log("height : ", height);

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

onMounted(async () => {
    const m = await IotService.getDashboardMetrics();
    metrics.temperature = m.temperature;
    metrics.humidity = m.humidity;
    metrics.airQualityIndex = m.airQualityIndex;
    metrics.co2 = m.co2;

    trend.value = await IotService.getAirQualityTrend();
    isTrendLoading.value = false;
    deviceList.value = await IotService.getDevices();
});
</script>
