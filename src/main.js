// src/main.js
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { applyInitialTheme } from "./composables/useTheme";
import App from "./App.vue";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import "./assets/main.css";
import router from "./router";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".dark",
      cssLayer: false,
    },
  },
});

app.use(router);
// applyInitialTheme will set the HTML .dark class and load the correct
// PrimeVue theme CSS before the app becomes visible.
applyInitialTheme();
app.mount("#app");
