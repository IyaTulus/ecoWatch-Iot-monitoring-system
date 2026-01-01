<!-- Empty State Component -->
<template>
  <div class="flex flex-col items-center justify-center py-12 px-4">
    <i :class="icon" class="text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
    <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
      {{ message }}
    </p>
    <Button 
      v-if="actionLabel" 
      :label="actionLabel" 
      @click="$emit('action')"
      severity="secondary"
    />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

interface Props {
  icon?: string;
  title: string;
  message: string;
  actionLabel?: string;
}

withDefaults(defineProps<Props>(), {
  icon: 'pi pi-inbox'
});

defineEmits<{
  action: [];
}>();
</script>
