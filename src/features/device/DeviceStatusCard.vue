<!-- Device Status Card Component -->
<template>
  <Card class="shadow-sm">
    <template #content>
      <div class="space-y-3">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 dark:text-gray-100">
              {{ health.deviceName }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ health.location }}
            </p>
          </div>
          <StatusIndicator 
            :status="getStatusIndicator(health.healthStatus)" 
          />
        </div>
        
        <div class="flex items-center gap-4 text-sm">
          <div v-if="health.batteryLevel !== undefined" class="flex items-center gap-1">
            <i class="pi pi-bolt" :class="getBatteryClass(health.batteryLevel)"></i>
            <span>{{ health.batteryLevel }}%</span>
          </div>
          
          <div class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <i class="pi pi-clock"></i>
            <span>{{ formatRelativeTime(health.lastSeen) }}</span>
          </div>
        </div>
        
        <div 
          v-if="health.healthStatus !== 'HEALTHY'"
          class="p-3 rounded-lg text-sm"
          :class="getHealthMessageClass(health.healthStatus)"
        >
          <div class="font-semibold mb-1">{{ health.healthMessage }}</div>
          <div class="text-xs">{{ health.healthRecommendation }}</div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import StatusIndicator from '@/components/ui/StatusIndicator.vue';
import { formatRelativeTime } from '@/utils/time';
import type { DeviceHealth } from '@/features/device/device.health.service';

interface Props {
  health: DeviceHealth;
}

defineProps<Props>();

const getStatusIndicator = (healthStatus: string): 'online' | 'offline' | 'warning' => {
  switch (healthStatus) {
    case 'HEALTHY':
      return 'online';
    case 'WARNING':
      return 'warning';
    case 'CRITICAL':
      return 'offline';
    default:
      return 'offline';
  }
};

const getBatteryClass = (level: number): string => {
  if (level < 20) return 'text-red-500';
  if (level < 50) return 'text-orange-500';
  return 'text-green-500';
};

const getHealthMessageClass = (healthStatus: string): string => {
  switch (healthStatus) {
    case 'WARNING':
      return 'bg-orange-50 dark:bg-orange-900/20 text-orange-900 dark:text-orange-100';
    case 'CRITICAL':
      return 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100';
    default:
      return 'bg-gray-50 dark:bg-gray-800';
  }
};
</script>
