<!-- Professional IoT Dashboard Header -->
<template>
    <header class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
        <div class="px-6 py-4">
            <div class="flex items-center justify-between">
                <!-- Left: Brand & Title -->
                <div class="flex items-center gap-4">
                    <!-- Mobile Menu -->
                    <button @click="toggleMobileSidebar"
                        class="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <i class="pi pi-bars text-xl"></i>
                    </button>

                    <!-- Brand -->
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <i class="pi pi-shield text-2xl"></i>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold">ecoWatch IoT</h1>
                            <p class="text-xs text-emerald-100">Alert-Driven Monitoring System</p>
                        </div>
                    </div>
                </div>

                <!-- Right: System Info & Actions -->
                <div class="flex items-center gap-4">
                    <!-- System Status -->
                    <div class="hidden md:flex items-center gap-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span class="text-sm font-medium">{{ systemStatus.online }} Online</span>
                        </div>
                        <div class="w-px h-4 bg-white/20"></div>
                        <div class="flex items-center gap-2">
                            <i class="pi pi-exclamation-triangle text-yellow-300"></i>
                            <span class="text-sm font-medium">{{ systemStatus.activeAlerts }} Alerts</span>
                        </div>
                    </div>

                    <!-- Notifications -->
                    <RouterLink to="/notifications"
                        class="relative p-2.5 hover:bg-white/10 rounded-lg transition-colors">
                        <i class="pi pi-bell text-xl"></i>
                        <span v-if="systemStatus.unreadNotifications > 0"
                            class="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg">
                            {{ systemStatus.unreadNotifications }}
                        </span>
                    </RouterLink>

                    <!-- User Profile -->
                    <div class="flex items-center gap-3 pl-3 border-l border-white/20">
                        <div class="hidden sm:block text-right">
                            <div class="text-sm font-semibold">Admin User</div>
                            <div class="text-xs text-emerald-100">System Administrator</div>
                        </div>
                        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <i class="pi pi-user text-emerald-600 text-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useSidebar } from '../composables/useSidebar';
import { IotService } from '../services/iotService';

const { toggleMobileSidebar } = useSidebar();

const systemStatus = ref({
    online: 0,
    activeAlerts: 0,
    unreadNotifications: 0
});

let refreshInterval;

const loadSystemStatus = async () => {
    try {
        const [deviceStats, alertStats, notificationStats] = await Promise.all([
            IotService.getDeviceStats(),
            IotService.getAlertStats(),
            IotService.getNotificationStats()
        ]);

        systemStatus.value = {
            online: deviceStats.online,
            activeAlerts: alertStats.unacknowledged,
            unreadNotifications: notificationStats.unread
        };
    } catch (error) {
        console.error('Failed to load system status:', error);
    }
};

onMounted(() => {
    loadSystemStatus();
    refreshInterval = setInterval(loadSystemStatus, 30000);
});

onUnmounted(() => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
});
</script>
