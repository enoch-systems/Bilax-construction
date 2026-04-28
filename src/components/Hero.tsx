"use client";

import React, { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";


interface HeroProps {
  isMenuOpen: boolean;
  onOpenForm?: () => void;
}

export default function Hero({ isMenuOpen, onOpenForm }: HeroProps) {
  // Cloudinary video URL - myherovid from public folder
  const video1Src = "https://res.cloudinary.com/djdbcoyot/video/upload/q_auto:good,vc_auto/v1/hero-videos/hero-videos/myherovid.mp4?_a=BAMAPqTI0";
  const videoRef1 = useRef<HTMLVideoElement>(null);

  return (
    <>
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950">
      <div className="absolute inset-0 flex md:hidden">
        <video 
          ref={videoRef1}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-80"
          src={video1Src}
        />
      </div>
      <div className="absolute inset-0 hidden md:flex">
        <video 
          ref={videoRef1}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-60"
          src={video1Src}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/97 via-slate-950/85 to-slate-900/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(251,146,60,0.05),transparent_60%),radial-gradient(circle_at_75%_85%,rgba(14,165,233,0.04),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

      <div className={`relative z-0 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-16 pt-54 md:pt-50 transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
                Premium Construction Partner
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
            </div>
            <h1 className="mb-8 text-5xl font-light tracking-tight text-white uppercase md:text-7xl lg:text-8xl">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
                className="inline-block"
              >
                Building The Spaces
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="inline-block font-semibold"
              >
                Your Vision Deserves
              </motion.span>
            </h1>
            <p className="mb-12 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
              We transform ideas into enduring structures through meticulous planning, expert delivery, and a commitment to world-class craftsmanship.
            </p>
            <div className="flex flex-wrap gap-5">
              <motion.button 
                onClick={onOpenForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="cursor-pointer rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-11 md:text-base"
              >
                Start Your Project
              </motion.button>
              <motion.a 
                href="tel:+2349162919586"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="cursor-pointer inline-flex items-center gap-2 rounded-sm border border-white/20 px-9 py-3.5 text-sm font-medium text-slate-300 transition-all hover:border-white/40 hover:text-white md:px-11 md:text-base"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </motion.a>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="border-l-2 border-white/10 bg-slate-950/40 p-6 backdrop-blur-md">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">Our Services</p>
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Residential Construction</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Commercial Construction</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Industrial Construction</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Renovation & Remodeling</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Project Management</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Consulting Services</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  );
}
