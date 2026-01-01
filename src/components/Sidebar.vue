<!-- Enhanced Sidebar with Alert-Driven Structure -->
<template>
    <!-- mobile overlay -->
    <div v-if="isMobileOpen" class="fixed inset-0 z-30 md:hidden" @click="closeMobileSidebar">
        <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <aside :class="[
        'bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 fixed top-0 left-0 h-full flex flex-col transition-all duration-300 z-20',
        isSidebarCollapsed ? 'w-16' : 'w-64',
        isMobileOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'
    ]">
        <!-- Brand + Toggle -->
        <div class="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-2" v-if="!isSidebarCollapsed">
                <div
                    class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <i class="pi pi-shield text-white text-sm"></i>
                </div>
                <span
                    class="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    ecoWatch
                </span>
            </div>
            <div class="flex items-center gap-2">
                <button class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hidden md:inline-flex" type="button"
                    @click="toggleSidebar">
                    <i class="pi text-sm" :class="isSidebarCollapsed ? 'pi-angle-right' : 'pi-angle-left'"></i>
                </button>

                <!-- mobile close button -->
                <button v-if="isMobileOpen" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
                    type="button" @click="closeMobileSidebar">
                    <i class="pi pi-times text-sm"></i>
                </button>
            </div>
        </div>

        <!-- Menu -->
        <nav class="mt-2 flex-1 overflow-y-auto">
            <!-- Main Section -->
            <div class="px-2 mb-4">
                <div v-if="!isSidebarCollapsed"
                    class="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Main
                </div>
                <ul class="space-y-1">
                    <li>
                        <RouterLink to="/"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            :class="isActive('dashboard')
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
                            @click="isMobileOpen ? closeMobileSidebar() : undefined">
                            <i class="pi pi-home text-base"></i>
                            <span v-if="!isSidebarCollapsed || isMobileOpen">{{ t('nav.dashboard') }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>

            <!-- Alert-Driven Core Features -->
            <div class="px-2 mb-4">
                <div v-if="!isSidebarCollapsed"
                    class="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Alert-Driven Core
                </div>
                <ul class="space-y-1">
                    <li>
                        <RouterLink to="/alerts"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group"
                            :class="isActive('alerts')
                                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
                            @click="isMobileOpen ? closeMobileSidebar() : undefined">
                            <i class="pi pi-bell text-base"></i>
                            <span v-if="!isSidebarCollapsed || isMobileOpen" class="flex-1">{{ t('nav.alerts') }}</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/notifications"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            :class="isActive('notifications')
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
                            @click="isMobileOpen ? closeMobileSidebar() : undefined">
                            <i class="pi pi-comment text-base"></i>
                            <span v-if="!isSidebarCollapsed || isMobileOpen" class="flex-1">Notifikasi</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/device-health"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            :class="isActive('device-health')
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
                            @click="isMobileOpen ? closeMobileSidebar() : undefined">
                            <i class="pi pi-heart text-base"></i>
                            <span v-if="!isSidebarCollapsed || isMobileOpen" class="flex-1">Kesehatan Perangkat</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>

            <!-- Monitoring Section -->
            <div class="px-2 mb-4">
                <div v-if="!isSidebarCollapsed"
                    class="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Monitoring
                </div>
                <ul class="space-y-1">
                    <li>
                        <RouterLink to="/devices"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            :class="isActive('devices')
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
                            @click="isMobileOpen ? closeMobileSidebar() : undefined">
                            <i class="pi pi-microchip text-base"></i>
                            <span v-if="!isSidebarCollapsed || isMobileOpen">{{ t('nav.devices') }}</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/map"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            :class="isActive('map')
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
                            @click="isMobileOpen ? closeMobileSidebar() : undefined">
                            <i class="pi pi-map-marker text-base"></i>
                            <span v-if="!isSidebarCollapsed || isMobileOpen">{{ t('nav.map') }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>

            <!-- Settings Section -->
            <div class="px-2">
                <div v-if="!isSidebarCollapsed"
                    class="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    System
                </div>
                <ul class="space-y-1">
                    <li>
                        <RouterLink to="/settings"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            :class="isActive('settings')
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
                            @click="isMobileOpen ? closeMobileSidebar() : undefined">
                            <i class="pi pi-cog text-base"></i>
                            <span v-if="!isSidebarCollapsed || isMobileOpen">{{ t('nav.settings') }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Footer Info -->
        <div v-if="!isSidebarCollapsed" class="p-4 border-t border-gray-200 dark:border-gray-800">
            <div class="text-xs text-gray-500 dark:text-gray-400">
                <div class="font-semibold mb-1">System Status</div>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>All Systems Online</span>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { useSidebar } from '../composables/useSidebar';
import { useLocale } from '../composables/useLocale';

const route = useRoute();
const { isSidebarCollapsed, isMobileOpen, toggleSidebar, closeMobileSidebar } = useSidebar();
const { t } = useLocale();

const isActive = (path) => {
    const currentPath = route.path.toLowerCase();
    if (path === 'dashboard') return currentPath === '/';
    return currentPath.includes(path.toLowerCase());
};
</script>
