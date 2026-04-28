"use client";

import { useEffect } from "react";

export default function RefreshHandler() {
  useEffect(() => {
    // Check if page was refreshed (not initial load)
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && 
      (navigationEntries[0] as PerformanceNavigationTiming).type === "reload";
    
    // Also check for legacy browsers
    const isLegacyReload = performance.navigation && 
      (performance.navigation as any).type === 1;

    if (isReload || isLegacyReload) {
      // Scroll to top of current page on refresh
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return null;
}
