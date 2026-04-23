"use client";

import { useState, useEffect, useRef } from "react";

export default function Header() {
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

  return (
    <header ref={headerRef} className="relative z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col ">
          <img src="/logo.png" alt="jola" className="h-10 w-12" />
          <span className="text-sm font-medium"><span className="text-amber-400">Bilax</span> <span className="text-white">Constructions</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white hover:text-orange-500 transition-colors">About</a>
          <a href="#projects" className="text-white hover:text-orange-500 transition-colors">Projects</a>
          <a href="#" className="text-white hover:text-orange-500 transition-colors">Gallery</a>
          <a href="#" className="text-white hover:text-orange-500 transition-colors">Contact</a>
        </nav>

        <button className="hidden md:block bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
          Free Consultation
        </button>

        <button 
          className="md:hidden text-white border-2 border-white rounded-full p-2"
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
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
      )}

      <div 
        className={`md:hidden fixed top-0 right-0 bottom-0 w-80 bg-gray-900/95 transition-all duration-700 ease-in-out overflow-hidden z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col items-center gap-10 py-12">
          <a href="#" className="text-white hover:text-orange-500 transition-colors text-lg pt-16 border-b border-gray-700 pb-2 w-3/4 text-center">About</a>
          <a href="#projects" className="text-white hover:text-orange-500 transition-colors text-lg border-b border-gray-700 pb-2 w-3/4 text-center">Projects</a>
          <a href="#" className="text-white hover:text-orange-500 transition-colors text-lg border-b border-gray-700 pb-2 w-3/4 text-center">Gallery</a>
          <a href="#" className="text-white hover:text-orange-500 transition-colors text-lg border-b border-gray-700 pb-2 w-3/4 text-center">Contact</a>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors mt-6 text-lg">
            Free Consultation
          </button>
        </nav>
      </div>
    </header>
  );
}

