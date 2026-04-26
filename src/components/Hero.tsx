"use client";

import React, { useEffect, useRef } from "react";
import { Phone } from "lucide-react";

function getCloudinaryVideoUrl(publicId?: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName || !publicId) return null;
  return `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}`;
}

interface HeroProps {
  isMenuOpen: boolean;
  onOpenForm?: () => void;
}

export default function Hero({ isMenuOpen, onOpenForm }: HeroProps) {
  const video1Src = getCloudinaryVideoUrl(process.env.NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_1) ?? "/video1.mp4";
  const video2Src = getCloudinaryVideoUrl(process.env.NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_2) ?? "/video2.mp4";
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videos = [videoRef1.current, videoRef2.current, videoRef3.current].filter(Boolean) as HTMLVideoElement[];
    
    videos.forEach(video => {
      const handleCanPlay = () => {
        video.play().catch(err => {
          console.log('Autoplay prevented:', err);
        });
      };

      const handleError = () => {
        console.log('Video error, retrying...');
        setTimeout(() => {
          video.load();
          video.play().catch(() => {});
        }, 1000);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    });
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950">
      <div className="absolute inset-0 flex md:hidden">
        <video 
          ref={videoRef1}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-80"
        >
          <source src={video1Src} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 hidden md:flex">
        <video 
          ref={videoRef2}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-60"
        >
          <source src={video1Src} type="video/mp4" />
        </video>
        <video 
          ref={videoRef3}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="hidden lg:hidden h-full w-1/2 object-cover opacity-60"
        >
          <source src={video2Src} type="video/mp4" />
        </video>
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
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0ms' }}>Building The Spaces</span><br />
              <span className="inline-block font-semibold animate-fade-in-up" style={{ animationDelay: '200ms' }}>Your Vision Deserves</span>
            </h1>
            <p className="mb-12 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
              We transform ideas into enduring structures through meticulous planning, expert delivery, and a commitment to world-class craftsmanship.
            </p>
            <div className="flex flex-wrap gap-5">
              <button onClick={onOpenForm} className="cursor-pointer rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-11 md:text-base">
                Start Your Project
              </button>
              <a href="tel:+2349162919586" className="cursor-pointer inline-flex items-center gap-2 rounded-sm border border-white/20 px-9 py-3.5 text-sm font-medium text-slate-300 transition-all hover:border-white/40 hover:text-white md:px-11 md:text-base">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="relative w-full h-48 rounded-sm overflow-hidden">
              <video 
                ref={videoRef1}
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                controls={false}
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              >
                <source src={video2Src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />
            </div>
            <div className="border-l-2 border-white/10 bg-slate-950/40 p-6 backdrop-blur-md">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">Our Services</p>
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Building Construction</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Civil Engineering</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Renovation & Finishing</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Project Management</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Maintenance</span>
                <span className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white md:text-base"><span className="h-px w-6 bg-white/20" />Interior Decoration</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  );
}
