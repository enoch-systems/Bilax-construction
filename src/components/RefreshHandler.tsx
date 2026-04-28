"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RefreshHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if page was refreshed (not initial load)
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && 
      (navigationEntries[0] as PerformanceNavigationTiming).type === "reload";
    
    // Also check for legacy browsers
    const isLegacyReload = performance.navigation && 
      (performance.navigation as any).type === 1;

    if (isReload || isLegacyReload) {
      // If not on home page, redirect to home
      if (pathname !== "/") {
        router.push("/");
      }
      // Always scroll to top on refresh
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, router]);

  return null;
}
