// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import DashboardView from "../pages/Dashboard.vue";
import AlertsView from "../pages/Alerts.vue";
import DeviceHealthView from "../pages/DeviceHealth.vue";
import DevicesView from "../pages/Devices.vue";
import MapView from "../pages/Map.vue";
import NotificationsView from "../pages/Notifications.vue";
import SettingsView from "../pages/Settings.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "dashboard", component: DashboardView },
      { path: "alerts", name: "alerts", component: AlertsView },
      {
        path: "notifications",
        name: "notifications",
        component: NotificationsView,
      },
      {
        path: "device-health",
        name: "device-health",
        component: DeviceHealthView,
      },
      { path: "devices", name: "devices", component: DevicesView },
      { path: "map", name: "map", component: MapView },
      { path: "settings", name: "settings", component: SettingsView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
