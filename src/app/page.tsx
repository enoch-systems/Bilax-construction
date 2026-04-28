"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Projects from "@/components/Projects";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import Form from "@/components/Form";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  const handleMenuChange = (open: boolean) => {
    setIsMenuOpen(open);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    document.body.style.overflow = 'unset';
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
      <Hero isMenuOpen={isMenuOpen} onOpenForm={handleOpenForm} />
      <section className={`relative transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <AboutUs />
      </section>
      <Services isMenuOpen={isMenuOpen} showViewAllButton={false} />
      <section className={`relative transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <Gallery />
      </section>
      <section className={`relative transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <Projects showPagination={false} />
      </section>
      <section className={`transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <Footer />
      </section>
      <WhatsAppButton />

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 md:p-6">
          <div className="relative w-full max-w-lg rounded-lg border border-white/10 bg-slate-950/98 p-3 md:p-6 shadow-2xl max-h-[95vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <Form onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </main>
  );
}
