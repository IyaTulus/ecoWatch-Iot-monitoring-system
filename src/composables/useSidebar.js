// src/composables/useSidebar.js
import { ref } from "vue";

// collapsed = compact sidebar on large screens (w-16) | open/closed mobile overlay
const isSidebarCollapsed = ref(false);
const isMobileOpen = ref(false);

export function useSidebar() {
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  };

  const openMobileSidebar = () => {
    isMobileOpen.value = true;
  };

  const closeMobileSidebar = () => {
    isMobileOpen.value = false;
  };

  const toggleMobileSidebar = () => {
    isMobileOpen.value = !isMobileOpen.value;
  };

  return {
    isSidebarCollapsed,
    toggleSidebar,
    isMobileOpen,
    openMobileSidebar,
    closeMobileSidebar,
    toggleMobileSidebar,
  };
}
