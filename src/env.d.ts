/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USE_DUMMY_DATA: string;
  readonly VITE_ALERT_CHECK_INTERVAL: string;
  readonly VITE_DEVICE_HEALTH_CHECK_INTERVAL: string;
  readonly VITE_SENSOR_REFRESH_INTERVAL: string;
  readonly VITE_ENABLE_DEVICE_HEALTH: string;
  readonly VITE_ENABLE_ALERT_SYSTEM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
