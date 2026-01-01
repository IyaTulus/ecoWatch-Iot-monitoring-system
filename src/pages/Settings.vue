<!-- Settings Page with Working Language and Theme -->
<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <i class="pi pi-cog text-2xl text-white"></i>
                    </div>
                    {{ t('settings.title') }}
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {{ t('settings.subtitle') }}
                </p>
            </div>
        </div>

        <!-- General Settings -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-sliders-h text-purple-600"></i>
                    {{ t('settings.general') }}
                </div>
            </template>
            <template #content>
                <div class="space-y-6">
                    <!-- Language Selection -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {{ t('settings.language') }}
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ t('settings.languageDesc') }}
                            </p>
                        </div>
                        <div class="md:col-span-2">
                            <Dropdown v-model="selectedLanguage" :options="languageOptions" optionLabel="label"
                                optionValue="value" :placeholder="t('settings.selectLanguage')" class="w-full md:w-80"
                                @change="handleLanguageChange" />
                        </div>
                    </div>

                    <Divider />

                    <!-- Theme Selection -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {{ t('settings.theme') }}
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ t('settings.themeDesc') }}
                            </p>
                        </div>
                        <div class="md:col-span-2">
                            <SelectButton v-model="selectedTheme" :options="themeOptions" optionLabel="label"
                                optionValue="value" class="flex-wrap" @change="handleThemeChange" />
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Notification Settings -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-bell text-purple-600"></i>
                    {{ t('settings.notifications') }}
                </div>
            </template>
            <template #content>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {{ t('settings.enableNotif') }}
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ t('settings.enableNotifDesc') }}
                            </p>
                        </div>
                        <InputSwitch v-model="notificationSettings.enabled" />
                    </div>

                    <Divider />

                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {{ t('settings.notifSound') }}
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ t('settings.notifSoundDesc') }}
                            </p>
                        </div>
                        <InputSwitch v-model="notificationSettings.sound" />
                    </div>

                    <Divider />

                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {{ t('settings.emailAlerts') }}
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ t('settings.emailAlertsDesc') }}
                            </p>
                        </div>
                        <InputSwitch v-model="notificationSettings.email" />
                    </div>
                </div>
            </template>
        </Card>

        <!-- System Settings -->
        <Card class="shadow-sm">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-server text-purple-600"></i>
                    {{ t('settings.systemSettings') }}
                </div>
            </template>
            <template #content>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {{ t('settings.autoRefresh') }}
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ t('settings.autoRefreshDesc') }}
                            </p>
                        </div>
                        <InputSwitch v-model="systemSettings.autoRefresh" />
                    </div>

                    <Divider />

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {{ t('settings.refreshInterval') }}
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ t('settings.refreshIntervalDesc') }}
                            </p>
                        </div>
                        <div class="md:col-span-2">
                            <div class="flex items-center gap-3">
                                <Slider v-model="systemSettings.refreshInterval" :min="10" :max="120" :step="10"
                                    class="w-full md:w-80" />
                                <span class="text-sm font-semibold text-gray-900 dark:text-gray-100 min-w-[80px]">
                                    {{ systemSettings.refreshInterval }} {{ t('settings.seconds') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Save Button -->
        <div class="flex justify-end">
            <Button :label="t('settings.saveChanges')" icon="pi pi-check" @click="saveSettings" severity="success" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import InputSwitch from 'primevue/inputswitch';
import Slider from 'primevue/slider';
import Divider from 'primevue/divider';
import { useLocale } from '../composables/useLocale';
import { useTheme } from '../composables/useTheme';

const { t, setLocale, locale } = useLocale();
const { themeMode, setTheme } = useTheme();

const selectedLanguage = ref('id');
const languageOptions = [
    { label: 'Bahasa Indonesia', value: 'id' },
    { label: 'English', value: 'en' }
];

const selectedTheme = ref('system');
const themeOptions = [
    { label: 'Terang', value: 'light' },
    { label: 'Gelap', value: 'dark' },
    { label: 'Sistem', value: 'system' }
];

const notificationSettings = ref({
    enabled: true,
    sound: true,
    email: false
});

const systemSettings = ref({
    autoRefresh: true,
    refreshInterval: 30
});

const handleLanguageChange = () => {
    setLocale(selectedLanguage.value);
    // Force component re-render
    window.location.reload();
};

const handleThemeChange = () => {
    setTheme(selectedTheme.value);
};

const saveSettings = () => {
    // Save notification and system settings
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings.value));
    localStorage.setItem('systemSettings', JSON.stringify(systemSettings.value));

    alert(t('settings.settingsSaved'));
};

onMounted(() => {
    // Load saved settings
    selectedLanguage.value = locale.value;
    selectedTheme.value = themeMode.value;

    const savedNotifications = localStorage.getItem('notificationSettings');
    if (savedNotifications) {
        notificationSettings.value = JSON.parse(savedNotifications);
    }

    const savedSystem = localStorage.getItem('systemSettings');
    if (savedSystem) {
        systemSettings.value = JSON.parse(savedSystem);
    }
});
</script>
