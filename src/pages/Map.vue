<!-- Enhanced Map View with Device Markers -->
<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        <i class="pi pi-map text-2xl text-white"></i>
                    </div>
                    Device Map View
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Real-time location and status of all IoT devices
                </p>
            </div>
            <div class="flex items-center gap-2">
                <Button label="Refresh" icon="pi pi-refresh" @click="refreshMap" severity="secondary" size="small" />
            </div>
        </div>

        <!-- Map Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card class="shadow-sm border-l-4 border-blue-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Devices</div>
                            <div class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ devices.length }}</div>
                        </div>
                        <i class="pi pi-map-marker text-4xl text-blue-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-green-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Online</div>
                            <div class="text-3xl font-bold text-green-600">{{ onlineDevices }}</div>
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
                            <div class="text-3xl font-bold text-red-600">{{ offlineDevices }}</div>
                        </div>
                        <i class="pi pi-times-circle text-4xl text-red-500 opacity-20"></i>
                    </div>
                </template>
            </Card>

            <Card class="shadow-sm border-l-4 border-purple-500">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Zones</div>
                            <div class="text-3xl font-bold text-purple-600">{{ uniqueZones }}</div>
                        </div>
                        <i class="pi pi-globe text-4xl text-purple-500 opacity-20"></i>
                    </div>
                </template>
            </Card>
        </div>

        <!-- Map Container -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-map-marker text-blue-600"></i>
                    Device Locations
                </div>
            </template>
            <template #content>
                <div v-if="isLoading" class="h-[600px] flex items-center justify-center">
                    <div class="text-center">
                        <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-3"></i>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Loading map...</div>
                    </div>
                </div>

                <div v-else class="relative">
                    <div id="map" class="h-[600px] w-full rounded-lg overflow-hidden"></div>
                    <div v-if="errorMessage"
                        class="absolute inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-gray-900/80 rounded-lg">
                        <div class="text-center p-6">
                            <i class="pi pi-exclamation-circle text-4xl text-red-500 mb-3"></i>
                            <div class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</div>
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Device Legend -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-info-circle text-blue-600"></i>
                    Map Legend
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">Online Device</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">Offline Device</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">Low Battery</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">AC Powered</span>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IotService } from '../services/iotService';

const isLoading = ref(true);
const errorMessage = ref('');
const map = ref(null);
const markers = ref([]);
const devices = ref([]);

const onlineDevices = computed(() => devices.value.filter(d => d.status === 'online').length);
const offlineDevices = computed(() => devices.value.filter(d => d.status === 'offline').length);
const uniqueZones = computed(() => {
    const zones = new Set(devices.value.map(d => d.location.split(' - ')[0]));
    return zones.size;
});

// Custom marker icons
const createCustomIcon = (color) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
};

const getMarkerColor = (device) => {
    if (device.status === 'offline') return '#ef4444'; // red
    if (device.battery !== null && device.battery < 20) return '#f97316'; // orange
    if (device.power === 'AC') return '#3b82f6'; // blue
    return '#22c55e'; // green
};

const initMap = async () => {
    try {
        devices.value = await IotService.getDevices();

        // Filter devices with valid coordinates
        const validDevices = devices.value.filter(d => d.coordinates && d.coordinates.lat && d.coordinates.lng);

        if (validDevices.length === 0) {
            errorMessage.value = 'No devices with location data available';
            isLoading.value = false;
            return;
        }

        // Calculate center
        const avgLat = validDevices.reduce((sum, d) => sum + d.coordinates.lat, 0) / validDevices.length;
        const avgLng = validDevices.reduce((sum, d) => sum + d.coordinates.lng, 0) / validDevices.length;

        isLoading.value = false;
        await nextTick();

        const el = document.getElementById('map');
        if (!el) throw new Error('Map container not found');

        // Initialize map
        map.value = L.map('map').setView([avgLat, avgLng], 14);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(map.value);

        // Add markers
        const markerGroup = [];
        validDevices.forEach((device) => {
            const color = getMarkerColor(device);
            const icon = createCustomIcon(color);

            const marker = L.marker([device.coordinates.lat, device.coordinates.lng], { icon })
                .addTo(map.value);

            const popupContent = `
                <div class="p-2 min-w-[200px]">
                    <div class="font-bold text-base mb-2">${device.id}</div>
                    <div class="space-y-1 text-sm">
                        <div class="flex items-center gap-2">
                            <i class="pi pi-map-marker text-gray-500"></i>
                            <span>${device.location}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="pi pi-microchip text-gray-500"></i>
                            <span>${device.type}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="pi pi-circle-fill text-${device.status === 'online' ? 'green' : 'red'}-500"></i>
                            <span class="capitalize">${device.status}</span>
                        </div>
                        ${device.battery !== null ? `
                        <div class="flex items-center gap-2">
                            <i class="pi pi-bolt text-gray-500"></i>
                            <span>Battery: ${device.battery}%</span>
                        </div>
                        ` : ''}
                        ${device.power === 'AC' ? `
                        <div class="flex items-center gap-2">
                            <i class="pi pi-bolt text-blue-500"></i>
                            <span>AC Powered</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent);
            markerGroup.push(marker);
        });

        // Fit bounds to show all markers
        if (markerGroup.length > 0) {
            const group = L.featureGroup(markerGroup);
            map.value.fitBounds(group.getBounds().pad(0.1));
        }

        markers.value = markerGroup;

    } catch (err) {
        console.error('Failed to load map/devices', err);
        errorMessage.value = 'Failed to load map. Please check your connection.';
        isLoading.value = false;
    }
};

const refreshMap = () => {
    if (map.value) {
        map.value.remove();
        map.value = null;
    }
    markers.value = [];
    errorMessage.value = '';
    isLoading.value = true;
    initMap();
};

onMounted(() => {
    initMap();
});

onUnmounted(() => {
    if (map.value) {
        try {
            map.value.remove();
        } catch (e) {
            // ignore
        }
        map.value = null;
    }
});
</script>

<style scoped>
:deep(.leaflet-popup-content-wrapper) {
    border-radius: 8px;
    padding: 0;
}

:deep(.leaflet-popup-content) {
    margin: 0;
}
</style>
