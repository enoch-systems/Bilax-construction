"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show loader on actual page refresh (reload type)
    const navigationEntries = performance.getEntriesByType('navigation');
    const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming;
    
    // Only show if it's a reload (refresh)
    if (navigationEntry?.type === 'reload') {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes zoom-out {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes zoom-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .loader-zoom-out {
          animation: zoom-out 0.8s ease-in-out forwards;
        }
        .loader-zoom-in {
          animation: zoom-in 0.6s ease-out forwards;
        }
      `}</style>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950">
          <div className="loader-zoom-in">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}
      {!isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950 pointer-events-none loader-zoom-out">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <div className="h-2 w-2 rounded-full bg-amber-400" />
          </div>
        </div>
      )}
    </>
  );
}
