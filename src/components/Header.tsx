"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  onMenuOpenChange?: (open: boolean) => void;
}

export default function Header({ onMenuOpenChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-white/5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex flex-col cursor-pointer group">
          <img src="/logo.png" alt="Bilax Constructions logo" className="h-10 w-12 mb-1 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-sm font-medium tracking-wide">
            <span className="text-amber-400/90 group-hover:text-amber-400 transition-colors">Bilax</span>{" "}
            <span className="text-slate-200 group-hover:text-white transition-colors">Constructions</span>
          </span>
        </a>
      
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
            Home
            {pathname === "/" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
          </Link>
          <Link href="/about" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/about" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
            About
            {pathname === "/about" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
          </Link>
          <a href="/#services" className="relative px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all duration-500">
            Services
          </a>
          <Link href="/projects" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/projects" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
            Projects
            {pathname === "/projects" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
          </Link>
          <Link href="/gallery" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/gallery" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
            Gallery
            {pathname === "/gallery" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
          </Link>
          <Link href="/ourteam" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/ourteam" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
            Our Team
            {pathname === "/ourteam" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
          </Link>
          <Link href="/testimonials" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/testimonials" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
            Testimonials
            {pathname === "/testimonials" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
          </Link>
          <Link href="/contact" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/contact" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
            Contact
            {pathname === "/contact" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
          </Link>
        </nav>

        <a
          href="https://wa.me/2349162919586?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20consultation%20for%20my%20construction%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hidden rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-6 py-2.5 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 md:block"
        >
          Free Consultation
        </a>

        <button
          className="cursor-pointer rounded-sm border border-white/20 p-2 text-slate-300 md:hidden"
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
        <div className="md:hidden fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
              <span className="text-lg font-medium tracking-wide">
                <span className="text-amber-400/90">Bilax</span>{" "}
                <span className="text-slate-200">Constructions</span>
              </span>
              <button
                className="cursor-pointer p-2 text-slate-400 transition-all duration-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pt-8">
              <Link href="/" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Home
                {pathname === "/" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/about" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                About
                {pathname === "/about" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <a href="/#services" onClick={() => setIsOpen(false)} className="relative px-6 py-3 text-sm font-semibold tracking-tight text-slate-400 hover:text-white transition-all duration-500">
                Services
              </a>
              <Link href="/projects" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/projects" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Projects
                {pathname === "/projects" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/gallery" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/gallery" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Gallery
                {pathname === "/gallery" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/ourteam" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/ourteam" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Our Team
                {pathname === "/ourteam" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/testimonials" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/testimonials" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Testimonials
                {pathname === "/testimonials" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/contact" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Contact
                {pathname === "/contact" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
            </nav>

            <div className="px-6 py-8 border-t border-white/5">
              <a
                href="https://wa.me/2349162919586?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20consultation%20for%20my%20construction%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer block w-full rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-8 py-4 text-center text-base font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20"
              >
                Free Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
