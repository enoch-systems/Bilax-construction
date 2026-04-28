"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const scrollRef = useRef<number>(0);
  const targetRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const ease = 0.08; // Lower = smoother/slower, Higher = snappier

    const smoothScroll = () => {
      scrollRef.current += (targetRef.current - scrollRef.current) * ease;
      
      // Apply scroll position
      window.scrollTo(0, scrollRef.current);
      
      // Continue animation loop
      rafRef.current = requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Calculate target with momentum feel
      const delta = e.deltaY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      targetRef.current = Math.max(0, Math.min(maxScroll, targetRef.current + delta));
    };

    const handleTouchStart = (e: TouchEvent) => {
      scrollRef.current = window.scrollY;
      targetRef.current = window.scrollY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Allow default touch behavior but update target
      targetRef.current = window.scrollY;
    };

    // Initialize
    scrollRef.current = window.scrollY;
    targetRef.current = window.scrollY;

    // Add event listeners with passive: false for wheel
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    // Start smooth scroll loop
    rafRef.current = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}
