<template>
    <div class="space-y-4 p-4">
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Perangkat IoT</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Menampilkan status perangkat yang terhubung</p>
        </div>

        <div class="card shadow-sm">
            <div class="p-4 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3 w-full max-w-xl">
                    <input v-model="query" type="text" placeholder="Cari perangkat (ID / lokasi)"
                        class="w-full p-2 rounded border border-gray-200 dark:border-gray-800 bg-transparent text-sm text-gray-700 dark:text-gray-200" />
                </div>

                <div class="flex items-center gap-2">
                    <Button label="Tambah Perangkat" icon="pi pi-plus" class="p-button-sm p-button-plain"
                        @click="openAddDialog" />
                </div>
            </div>

            <div v-if="isLoading" class="p-4">
                <div class="animate-pulse space-y-3">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>

            <div v-else>
                <div class="overflow-auto">
                    <DataTable :value="filteredDevices" class="text-sm" emptyMessage="Tidak ada perangkat ditemukan">
                    <Column field="id" header="ID Perangkat" />
                    <Column field="location" header="Lokasi" />
                    <Column field="battery" header="Baterai">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <div class="text-sm font-medium">{{ data.battery }}%</div>
                                <div class="w-24 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div :class="batteryFillClass(data.battery)"
                                        :style="{ width: Math.min(Math.max(data.battery, 0), 100) + '%' }"
                                        class="h-full rounded-full"></div>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column header="Status">
                        <template #body="{ data }">
                            <Tag :value="statusLabel(data.status)" :severity="statusSeverity(data.status)" />
                        </template>
                    </Column>
                    <Column header="Aksi" style="width:130px">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2 justify-end">
                                <Button icon="pi pi-eye" class="p-button-text p-button-sm" @click="viewDevice(data)" />
                                <Button :icon="isRebooting[data.id] ? 'pi pi-spin pi-refresh' : 'pi pi-refresh'"
                                    class="p-button-text p-button-sm" :disabled="isRebooting[data.id]"
                                    @click="rebootDevice(data)" />
                            </div>
                        </template>
                    </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Device Dialog -->
    <Dialog v-model:visible="showAdd" header="Tambah Perangkat" :modal="true" style="width:420px">
        <div class="space-y-3 p-2">
            <label class="text-xs text-gray-600 dark:text-gray-300">ID Perangkat</label>
            <InputText v-model="newDevice.id" class="w-full" />

            <label class="text-xs text-gray-600 dark:text-gray-300">Lokasi</label>
            <InputText v-model="newDevice.location" class="w-full" />

            <div class="flex gap-2 items-end">
                <div class="flex-1">
                    <label class="text-xs text-gray-600 dark:text-gray-300">Baterai (%)</label>
                    <InputNumber v-model="newDevice.battery" class="w-full" :min="0" :max="100" showButtons />
                </div>
                <div class="w-36">
                    <label class="text-xs text-gray-600 dark:text-gray-300">Status</label>
                    <InputText v-model="newDevice.status" class="w-full" />
                </div>
            </div>

            <div class="flex justify-end gap-2 mt-3">
                <Button label="Batal" class="p-button-text" @click="showAdd = false" />
                <Button label="Tambah" class="p-button-primary" @click="addDevice" />
            </div>
        </div>
    </Dialog>

    <!-- Device Details Dialog -->
    <Dialog v-model:visible="showDetails" header="Detail Perangkat" :modal="true" style="width:480px">
        <div v-if="selectedDevice" class="space-y-3 p-3">
            <div class="flex justify-between items-center">
                <div class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ selectedDevice.id }}</div>
                <Tag :value="statusLabel(selectedDevice.status)" :severity="statusSeverity(selectedDevice.status)" />
            </div>

            <div class="text-sm text-gray-600 dark:text-gray-300">Lokasi: <span
                    class="font-medium text-gray-800 dark:text-gray-100">{{ selectedDevice.location }}</span></div>
            <div class="text-sm text-gray-600 dark:text-gray-300">Baterai: <span
                    class="font-medium">{{ selectedDevice.battery }}%</span></div>
            <div class="text-sm text-gray-600 dark:text-gray-300" v-if="selectedDevice.power">Power: <span
                    class="font-medium">{{ selectedDevice.power }}</span></div>

            <div class="flex justify-end gap-2 mt-3">
                <Button label="Tutup" class="p-button-text" @click="showDetails = false" />
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import { IotService } from '../services/iotService';

const devices = ref([]);
const isLoading = ref(true);
const query = ref('');

const showAdd = ref(false);
const showDetails = ref(false);
const selectedDevice = ref(null);
const isRebooting = ref({});

const newDevice = ref({ id: '', location: '', battery: 100, status: 'online' });

const batteryFillClass = (value) => {
    if (value >= 75) return 'bg-emerald-500';
    if (value >= 30) return 'bg-amber-400';
    return 'bg-red-500';
};

const statusLabel = (status) => {
    switch (status) {
        case 'online': return 'Online';
        case 'low_battery': return 'Low Battery';
        case 'offline': return 'Offline';
        default: return status;
    }
};

const statusSeverity = (status) => {
    switch (status) {
        case 'online': return 'success';
        case 'low_battery': return 'warning';
        case 'offline': return 'danger';
        default: return 'info';
    }
};

onMounted(async () => {
    try {
        devices.value = await IotService.getDevices();
    } finally {
        isLoading.value = false;
    }
});

const filteredDevices = computed(() => {
    const q = query.value && query.value.toLowerCase();
    if (!q) return devices.value;
    return devices.value.filter(d => (d.id || '').toLowerCase().includes(q) || (d.location || '').toLowerCase().includes(q));
});

const openAddDialog = () => {
    newDevice.value = { id: '', location: '', battery: 100, status: 'online' };
    showAdd.value = true;
};

const addDevice = async () => {
    try {
        await IotService.addDevice(newDevice.value);
        devices.value = await IotService.getDevices();
        showAdd.value = false;
    } catch (err) {
        console.error('Failed to add device', err);
    }
};

const viewDevice = (d) => {
    selectedDevice.value = d;
    showDetails.value = true;
};

const rebootDevice = async (d) => {
    if (!d || !d.id) return;
    isRebooting.value = { ...isRebooting.value, [d.id]: true };
    try {
        const updated = await IotService.rebootDevice(d.id);
        if (updated) {
            devices.value = devices.value.map(x => (x.id === updated.id ? updated : x));
        }
    } finally {
        isRebooting.value = { ...isRebooting.value, [d.id]: false };
    }
};
</script>
