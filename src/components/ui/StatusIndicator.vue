<!-- Status Indicator Component -->
<template>
  <div class="flex items-center gap-2">
    <span 
      class="inline-block w-2 h-2 rounded-full"
      :class="[dotClass, { 'animate-pulse': status === 'online' }]"
    ></span>
    <span class="text-sm" :class="textClass">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  status: 'online' | 'offline' | 'warning';
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: ''
});

const dotClass = computed(() => {
  switch (props.status) {
    case 'online':
      return 'bg-green-500';
    case 'offline':
      return 'bg-red-500';
    case 'warning':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
});

const textClass = computed(() => {
  switch (props.status) {
    case 'online':
      return 'text-green-700 dark:text-green-400';
    case 'offline':
      return 'text-red-700 dark:text-red-400';
    case 'warning':
      return 'text-orange-700 dark:text-orange-400';
    default:
      return 'text-gray-700 dark:text-gray-400';
  }
});

const defaultLabel = computed(() => {
  if (props.label) return props.label;
  return props.status.charAt(0).toUpperCase() + props.status.slice(1);
});
</script>
