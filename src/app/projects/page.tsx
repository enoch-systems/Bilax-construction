"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMenuChange = (open: boolean) => {
    setIsMenuOpen(open);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoaded(true);
  }, []);

  return (
    <main className="bg-slate-950 text-white min-h-screen">
      <Header onMenuOpenChange={handleMenuChange} />
      <section className={`relative pt-20 transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <Projects showViewAll={false} />
      </section>
      <section className={`transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <Footer />
      </section>
    </main>
  );
}
