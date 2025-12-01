<!-- src/components/layout/Sidebar.vue -->
<template>
    <!-- mobile overlay -->
    <div v-if="isMobileOpen" class="fixed inset-0 z-30 md:hidden" @click="closeMobileSidebar">
        <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <aside :class="[
        'bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 flex flex-col transition-all duration-300',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        isMobileOpen ? 'fixed left-0 top-0 z-40 w-64 translate-x-0' : 'md:static md:translate-x-0 -translate-x-full md:transform-none'
    ]">
        <!-- Brand + Toggle -->
        <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-2" v-if="!isSidebarCollapsed">
                <i class="pi pi-leaf text-emerald-500 text-xl"></i>
                <span class="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    EcoWatch
                </span>
            </div>
            <div class="flex items-center gap-2">
                <button class="p-button p-button-text p-0 hidden md:inline-flex" type="button" @click="toggleSidebar">
                    <i class="pi" :class="isSidebarCollapsed ? 'pi-angle-right' : 'pi-angle-left'"></i>
                </button>

                <!-- mobile close button shown when overlay is open -->
                <button v-if="isMobileOpen" class="p-button p-button-text p-0 md:hidden" type="button"
                    @click="closeMobileSidebar">
                    <i class="pi pi-times"></i>
                </button>
            </div>
        </div>

        <!-- Menu -->
        <nav class="mt-4 flex-1">
            <ul class="space-y-1 px-2">
                <li v-for="item in menuItems" :key="item.label">
                    <RouterLink :to="item.to"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        :class="isActive(item.to)
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'">
                        @click="isMobileOpen ? closeMobileSidebar() : undefined">
                        <i class="pi text-base" :class="item.icon"></i>
                        <span v-if="!isSidebarCollapsed || isMobileOpen">{{ item.label }}</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { useRoute, RouterLink } from "vue-router";
import { useSidebar } from "../composables/useSidebar";

const route = useRoute();
const { isSidebarCollapsed, toggleSidebar, isMobileOpen, closeMobileSidebar } = useSidebar();

const menuItems = [
    { label: "Dashboard", icon: "pi-chart-line", to: { name: "dashboard" } },
    { label: "Perangkat", icon: "pi-microchip", to: { name: "devices" } },
    { label: "Peta Sensor", icon: "pi-map-marker", to: { name: "map" } },
    { label: "Notifikasi", icon: "pi-bell", to: { name: "notifications" } },
    { label: "Pengaturan", icon: "pi-cog", to: { name: "settings" } },
];

const isActive = (to) => {
    return route.name === to.name;
};
</script>
