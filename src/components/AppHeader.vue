<!-- src/components/layout/AppHeader.vue -->
<template>
    <header
        class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div>
            <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Monitoring Area Hutan Kota
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
                Update terakhir: Baru saja
            </p>
        </div>

        <div class="flex items-center gap-4">
            <ThemeSwitcher />
            <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600 dark:text-gray-300">Admin</span>
                <div
                    class="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-semibold">
                    AD
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import ThemeSwitcher from "./ThemeSwitcher.vue";
</script>
