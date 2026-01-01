<!-- Alert Panel Component -->
<template>
  <Card v-if="alerts.length > 0" class="shadow-sm">
    <template #title>
      <div class="flex items-center justify-between">
        <span>Active Alerts</span>
        <Tag :value="`${unacknowledgedCount} unacknowledged`" severity="warn" />
      </div>
    </template>
    <template #content>
      <div class="space-y-3">
        <div
          v-for="alert in sortedAlerts"
          :key="alert.id"
          class="p-4 rounded-lg border"
          :class="getAlertClass(alert.severity)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <i :class="getSeverityIcon(alert.severity)" class="text-lg"></i>
                <Tag :value="alert.severity" :severity="getSeverityTag(alert.severity)" />
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatRelativeTime(alert.triggeredAt) }}
                </span>
              </div>
              
              <h4 class="font-semibold mb-1">{{ alert.message }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Device: {{ alert.deviceId }} | 
                {{ getParameterName(alert.parameter) }}: {{ alert.currentValue }}{{ getUnit(alert.parameter) }}
                (Threshold: {{ formatThreshold(alert.threshold, alert.parameter) }})
              </p>
              
              <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                <strong>Recommendation:</strong> {{ alert.recommendation }}
              </div>
            </div>
            
            <Button
              v-if="!alert.acknowledgedAt"
              label="Acknowledge"
              size="small"
              severity="secondary"
              @click="handleAcknowledge(alert.id)"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { useAlert } from './useAlert';
import { getSeverityTag, getSeverityIcon } from '@/utils/severity';
import { formatRelativeTime } from '@/utils/time';
import type { Alert } from './alert.engine';
import type { AlertSeverity } from './alert.rules';

const { alerts, unacknowledgedCount, acknowledge } = useAlert();

const sortedAlerts = computed(() => {
  return [...alerts.value].sort((a, b) => {
    // Sort by severity first (CRITICAL > WARNING > INFO)
    const severityOrder = { CRITICAL: 3, WARNING: 2, INFO: 1 };
    const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
    if (severityDiff !== 0) return severityDiff;
    
    // Then by time (newest first)
    return new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime();
  });
});

const handleAcknowledge = (alertId: string) => {
  acknowledge(alertId);
};

const getAlertClass = (severity: AlertSeverity) => {
  switch (severity) {
    case 'CRITICAL':
      return 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10';
    case 'WARNING':
      return 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/10';
    case 'INFO':
      return 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10';
    default:
      return 'border-gray-300 dark:border-gray-700';
  }
};

const getParameterName = (parameter: string): string => {
  const names: Record<string, string> = {
    temperature: 'Temperature',
    humidity: 'Humidity',
    aqi: 'Air Quality',
    co2: 'CO₂'
  };
  return names[parameter] || parameter;
};

const getUnit = (parameter: string): string => {
  const units: Record<string, string> = {
    temperature: '°C',
    humidity: '%',
    aqi: ' AQI',
    co2: ' ppm'
  };
  return units[parameter] || '';
};

const formatThreshold = (threshold: number | [number, number], parameter: string): string => {
  const unit = getUnit(parameter);
  if (typeof threshold === 'number') {
    return `${threshold}${unit}`;
  }
  return `${threshold[0]}-${threshold[1]}${unit}`;
};
</script>
