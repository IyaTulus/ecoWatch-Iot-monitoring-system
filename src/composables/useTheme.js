import { ref } from "vue";
import { usePrimeVue } from "primevue/config";

const THEME_KEY = "ecowatch-theme";
const themeMode = ref(localStorage.getItem(THEME_KEY) || "system");

export function applyInitialTheme() {
  setTimeout(() => {
    const link = document.getElementById("theme-link");
    if (!link) return;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark =
      themeMode.value === "dark" ||
      (themeMode.value === "system" && prefersDark);

    applyHtmlClass(isDark);

    link.href = isDark
      ? "/node_modules/@primevue/themes/aura-dark/index.css"
      : "/node_modules/@primevue/themes/aura/index.css";
  });
}

export function useTheme() {
  const PrimeVue = usePrimeVue();

  const setTheme = (mode) => {
    themeMode.value = mode;
    localStorage.setItem(THEME_KEY, mode);

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = mode === "dark" || (mode === "system" && prefersDark);

    applyHtmlClass(isDark);

    const oldTheme = isDark ? "aura" : "aura-dark";
    const newTheme = isDark ? "aura-dark" : "aura";

    PrimeVue.changeTheme(oldTheme, newTheme, "theme-link", () =>
      console.log("Theme changed:", newTheme)
    );
  };

  return { themeMode, setTheme };
}

function applyHtmlClass(isDark) {
  if (isDark) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
}
