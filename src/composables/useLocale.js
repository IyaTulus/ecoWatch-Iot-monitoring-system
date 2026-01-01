// Safe Locale System with Try-Catch
import { ref, computed } from "vue";

// Get initial language from localStorage or default to Indonesian
let savedLocale = "id";
try {
  savedLocale = localStorage.getItem("locale") || "id";
} catch (e) {
  console.warn("Could not load locale from localStorage");
}

const currentLocale = ref(savedLocale);

// All translations in one place
const locales = {
  id: {
    nav: {
      dashboard: "Dashboard",
      alerts: "Smart Alerts",
      notifications: "Notifikasi",
      deviceHealth: "Kesehatan Perangkat",
      devices: "Perangkat",
      map: "Tampilan Peta",
      settings: "Pengaturan",
    },
    common: {
      save: "Simpan",
      cancel: "Batal",
      loading: "Memuat...",
      refresh: "Segarkan",
      online: "Online",
      offline: "Offline",
    },
    settings: {
      title: "Pengaturan",
      subtitle: "Konfigurasi preferensi dan opsi sistem",
      general: "Pengaturan Umum",
      language: "Bahasa",
      languageDesc: "Pilih bahasa yang Anda inginkan",
      selectLanguage: "Pilih Bahasa",
      indonesian: "Bahasa Indonesia",
      english: "English",
      theme: "Tema",
      themeDesc: "Pilih tema yang Anda sukai",
      light: "Terang",
      dark: "Gelap",
      system: "Sistem",
      notifications: "Pengaturan Notifikasi",
      enableNotif: "Aktifkan Notifikasi",
      enableNotifDesc: "Terima notifikasi real-time untuk alerts",
      notifSound: "Suara Notifikasi",
      notifSoundDesc: "Putar suara saat notifikasi baru tiba",
      emailAlerts: "Alert Email",
      emailAlertsDesc: "Kirim alert kritis via email",
      systemSettings: "Pengaturan Sistem",
      autoRefresh: "Refresh Otomatis",
      autoRefreshDesc: "Refresh data dashboard secara otomatis",
      refreshInterval: "Interval Refresh",
      refreshIntervalDesc: "Interval refresh data dalam detik",
      seconds: "detik",
      saveChanges: "Simpan Perubahan",
      settingsSaved: "Pengaturan berhasil disimpan!",
    },
  },
  en: {
    nav: {
      dashboard: "Dashboard",
      alerts: "Smart Alerts",
      notifications: "Notifications",
      deviceHealth: "Device Health",
      devices: "Devices",
      map: "Map View",
      settings: "Settings",
    },
    common: {
      save: "Save",
      cancel: "Cancel",
      loading: "Loading...",
      refresh: "Refresh",
      online: "Online",
      offline: "Offline",
    },
    settings: {
      title: "Settings",
      subtitle: "Configure system preferences and options",
      general: "General Settings",
      language: "Language",
      languageDesc: "Select your preferred language",
      selectLanguage: "Select Language",
      indonesian: "Indonesian",
      english: "English",
      theme: "Theme",
      themeDesc: "Choose your preferred theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      notifications: "Notification Settings",
      enableNotif: "Enable Notifications",
      enableNotifDesc: "Receive real-time notifications for alerts",
      notifSound: "Notification Sound",
      notifSoundDesc: "Play sound when new notifications arrive",
      emailAlerts: "Email Alerts",
      emailAlertsDesc: "Send critical alerts via email",
      systemSettings: "System Settings",
      autoRefresh: "Auto Refresh",
      autoRefreshDesc: "Automatically refresh dashboard data",
      refreshInterval: "Refresh Interval",
      refreshIntervalDesc: "Data refresh interval in seconds",
      seconds: "seconds",
      saveChanges: "Save Changes",
      settingsSaved: "Settings saved successfully!",
    },
  },
};

export function useLocale() {
  const t = (key) => {
    try {
      const keys = key.split(".");
      let value = locales[currentLocale.value];

      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          return key;
        }
      }

      return value || key;
    } catch (error) {
      console.error("Translation error:", error);
      return key;
    }
  };

  const setLocale = (locale) => {
    try {
      if (locales[locale]) {
        currentLocale.value = locale;
        localStorage.setItem("locale", locale);
      }
    } catch (error) {
      console.error("Set locale error:", error);
    }
  };

  const locale = computed(() => currentLocale.value);

  return {
    t,
    setLocale,
    locale,
  };
}
