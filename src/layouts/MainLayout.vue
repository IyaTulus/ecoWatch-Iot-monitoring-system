<!-- src/layouts/MainLayout.vue -->
<template>
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main -->
        <div class="flex-1 flex flex-col transition-all duration-300">
            <AppHeader />

            <main class="p-6">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import AppHeader from "../components/AppHeader.vue";
</script>
