// Simple i18n Composable - Safe Version
import { ref } from "vue";

// Default to Indonesian
const currentLanguage = ref("id");

// Try to load from localStorage
try {
  const saved = localStorage.getItem("language");
  if (saved) currentLanguage.value = saved;
} catch (e) {
  console.warn("Could not load language from localStorage");
}

// Simple translations object
const translations = {
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
    settings: {
      title: "Pengaturan",
      subtitle: "Konfigurasi preferensi dan opsi sistem",
      general: "Pengaturan Umum",
      language: "Bahasa",
      languageDescription: "Pilih bahasa yang Anda inginkan",
      selectLanguage: "Pilih Bahasa",
      indonesian: "Bahasa Indonesia",
      english: "English",
      theme: "Tema",
      themeDescription: "Pilih tema yang Anda sukai",
      light: "Terang",
      dark: "Gelap",
      system: "Sistem",
      notifications: "Pengaturan Notifikasi",
      enableNotifications: "Aktifkan Notifikasi",
      notificationSound: "Suara Notifikasi",
      emailAlerts: "Alert Email",
      autoRefresh: "Refresh Otomatis",
      refreshInterval: "Interval Refresh",
      seconds: " detik",
      saveChanges: "Simpan Perubahan",
      settingsSaved: "Pengaturan berhasil disimpan",
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
    settings: {
      title: "Settings",
      subtitle: "Configure system preferences and options",
      general: "General Settings",
      language: "Language",
      languageDescription: "Select your preferred language",
      selectLanguage: "Select Language",
      indonesian: "Indonesian",
      english: "English",
      theme: "Theme",
      themeDescription: "Choose your preferred theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      notifications: "Notification Settings",
      enableNotifications: "Enable Notifications",
      notificationSound: "Notification Sound",
      emailAlerts: "Email Alerts",
      autoRefresh: "Auto Refresh",
      refreshInterval: "Refresh Interval",
      seconds: " seconds",
      saveChanges: "Save Changes",
      settingsSaved: "Settings saved successfully",
    },
  },
};

export function useI18n() {
  const t = (key) => {
    try {
      const keys = key.split(".");
      let value = translations[currentLanguage.value];

      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          return key;
        }
      }

      return value || key;
    } catch (error) {
      return key;
    }
  };

  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang;
      try {
        localStorage.setItem("language", lang);
      } catch (e) {
        console.warn("Could not save language to localStorage");
      }
    }
  };

  return {
    t,
    setLanguage,
    language: currentLanguage,
  };
}
