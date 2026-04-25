"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Gallery from "@/components/Gallery";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMenuChange = (open: boolean) => {
    setIsMenuOpen(open);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoaded(true);
    
    // Handle hash scrolling for services section
    if (window.location.hash === '#services') {
      setTimeout(() => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <main className="bg-slate-950 text-white">
      <Header onMenuOpenChange={handleMenuChange} />
      <Hero isMenuOpen={isMenuOpen} />
      <section className={`relative transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <AboutUs />
      </section>
      <section className={`relative transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <Gallery />
      </section>
      <section className={`relative transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <Projects />
      </section>
      <section className={`transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <Footer />
      </section>
    </main>
  );
}
