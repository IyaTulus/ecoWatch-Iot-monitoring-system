<!-- src/layouts/MainLayout.vue -->
<template>
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main -->
        <div class="flex-1 flex flex-col transition-all duration-300" :class="sidebarMargin">
            <AppHeader />

            <main class="p-6 flex-1">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterView } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import AppHeader from "../components/AppHeader.vue";
import { useSidebar } from "../composables/useSidebar";

const { isSidebarCollapsed } = useSidebar();

const sidebarMargin = computed(() => {
    return isSidebarCollapsed.value ? 'md:ml-16' : 'md:ml-64';
});
</script>
