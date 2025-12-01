<template>
    <div class="p-4 space-y-4">
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Peta Sensor</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Menampilkan lokasi perangkat IoT</p>
        </div>

        <div class="card shadow-sm p-0 overflow-hidden rounded">
            <div v-if="isLoading" class="h-96 flex items-center justify-center">
                <div class="text-sm text-gray-500 dark:text-gray-400">Memuat peta…</div>
            </div>

            <div v-else class="relative">
                <div id="map" class="h-96 w-full"></div>
                <div v-if="errorMessage" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div class="bg-white/80 dark:bg-gray-900/80 rounded px-3 py-1 text-sm text-red-500">
                        {{ errorMessage }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
import { IotService } from '../services/iotService';

const isLoading = ref(true);
const errorMessage = ref('');
const map = ref(null);
const markers = ref([]);

// Fix default icon paths for Vite/bundlers
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

onMounted(async () => {
    try {
        const devices = await IotService.getDevices();

        // compute average center from devices that have numeric coords, otherwise use a sensible default
        const coords = (devices || []).filter(d => typeof d.latitude === 'number' && typeof d.longitude === 'number');
        const defaultCenter = [-6.200000, 106.816666];
        const center = coords.length
            ? [coords.reduce((s, d) => s + d.latitude, 0) / coords.length, coords.reduce((s, d) => s + d.longitude, 0) / coords.length]
            : defaultCenter;

        // render the map container first (clear loading) then initialize Leaflet
        isLoading.value = false;

        await nextTick();

        // ensure DOM has rendered the #map container
        const el = document.getElementById('map');
        if (!el) throw new Error('Map container not found');

        map.value = L.map('map').setView(center, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map.value);

        // add markers
        const group = [];
        coords.forEach((d) => {
            const marker = L.marker([d.latitude, d.longitude]).addTo(map.value);
            marker.bindPopup(`<div class=\"text-sm\"><strong>${d.id}</strong><div>${d.location}</div><div>Status: ${d.status}</div><div>Baterai: ${d.battery}%</div></div>`);
            group.push(marker);
        });

        if (group.length) {
            const g = L.featureGroup(group);
            map.value.fitBounds(g.getBounds().pad(0.2));
        } else {
            // no markers — show a friendly message next to the map
            errorMessage.value = 'Tidak ada lokasi perangkat tersedia untuk ditampilkan pada peta.';
        }
    } catch (err) {
        console.error('Failed to load map/devices', err);
        errorMessage.value = 'Gagal memuat peta — periksa koneksi atau konfigurasi device.';
    } finally {
        // ensure loading flagged off
        isLoading.value = false;
    }

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
});
</script>
