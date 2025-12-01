<template>
    <Dropdown v-model="themeMode" :options="options" class="w-32 text-sm" optionLabel="label" optionValue="value" />
</template>

<script setup>
import Dropdown from "primevue/dropdown";
import { useTheme } from "../composables/useTheme";
import { computed } from "vue";

const { themeMode: modeRef, setTheme } = useTheme();

const themeMode = computed({
    get: () => modeRef.value,
    set: (val) => setTheme(val),
});

const options = [
    { label: "Terang", value: "light" },
    { label: "Gelap", value: "dark" },
    { label: "Sistem", value: "system" },
];
</script>
