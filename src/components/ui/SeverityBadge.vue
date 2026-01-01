<!-- Severity Badge Component -->
<template>
  <Tag :value="severity" :severity="tagSeverity" :icon="icon" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Tag from 'primevue/tag';
import { getSeverityTag, getSeverityIcon } from '@/utils/severity';
import type { AlertSeverity } from '@/utils/severity';

interface Props {
  severity: AlertSeverity;
}

const props = defineProps<Props>();

const tagSeverity = computed(() => getSeverityTag(props.severity));
const icon = computed(() => getSeverityIcon(props.severity));
</script>
