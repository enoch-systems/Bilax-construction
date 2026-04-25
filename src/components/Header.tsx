"use client";

import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  onMenuOpenChange?: (open: boolean) => void;
}

export default function Header({ onMenuOpenChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    onMenuOpenChange?.(isOpen);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onMenuOpenChange]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gradient-to-b from-slate-950/95 to-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex flex-col">
          <img src="/logo.png" alt="Bilax Constructions logo" className="h-10 w-12 mb-1" />
          <span className="text-sm font-medium tracking-wide">
            <span className="text-amber-400/90">Bilax</span>{" "}
            <span className="text-slate-200">Constructions</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-slate-300 transition-colors hover:text-amber-400/90">About</a>
          <a href="#projects" className="text-sm font-medium text-slate-300 transition-colors hover:text-amber-400/90">Projects</a>
          <a href="#" className="text-sm font-medium text-slate-300 transition-colors hover:text-amber-400/90">Gallery</a>
          <a href="#" className="text-sm font-medium text-slate-300 transition-colors hover:text-amber-400/90">Contact</a>
        </nav>

        <button className="hidden rounded-sm border border-amber-500/30 bg-amber-500/10 px-7 py-2.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:block">
          Free Consultation
        </button>

        <button
          className="rounded-sm border border-white/20 p-2 text-slate-300 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`fixed left-4 right-4 top-1/2 -translate-y-1/2 z-[100] mt-76 overflow-hidden bg-slate-950 rounded-lg transition-all duration-500 ease-out md:hidden ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <button
          className="absolute top-4 right-4 rounded-sm border border-amber-500/30 bg-amber-500/10 p-2 text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex flex-col items-center gap-10 py-16">
          <a href="#" className="w-3/4 border-b border-white/10 pb-2 text-center text-lg text-slate-200 transition-colors hover:text-amber-400/90">About</a>
          <a href="#projects" className="w-3/4 border-b border-white/10 pb-2 text-center text-lg text-slate-200 transition-colors hover:text-amber-400/90">Projects</a>
          <a href="#" className="w-3/4 border-b border-white/10 pb-2 text-center text-lg text-slate-200 transition-colors hover:text-amber-400/90">Gallery</a>
          <a href="#" className="w-3/4 border-b border-white/10 pb-2 text-center text-lg text-slate-200 transition-colors hover:text-amber-400/90">Contact</a>
          <button className="mt-6 rounded-sm border border-amber-500/30 bg-amber-500/10 px-8 py-3 text-lg font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20">
            Free Consultation
          </button>
        </nav>
      </div>
    </header>
  );
}
