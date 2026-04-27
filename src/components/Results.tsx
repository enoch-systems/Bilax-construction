"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Results() {
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    years: 0,
    satisfaction: 0
  });
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const targetCounts = {
    clients: 500,
    projects: 150,
    years: 10,
    satisfaction: 98
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const startCounting = () => {
      setCounts({
        clients: 0,
        projects: 0,
        years: 0,
        satisfaction: 0
      });

      const timer = setInterval(() => {
        setCounts((prev) => {
          const newCounts = { ...prev };
          Object.keys(newCounts).forEach((key) => {
            const target = targetCounts[key as keyof typeof targetCounts];
            const increment = target / steps;
            if (newCounts[key as keyof typeof newCounts] < target) {
              newCounts[key as keyof typeof newCounts] = Math.min(
                Math.floor(newCounts[key as keyof typeof newCounts] + increment),
                target
              );
            }
          });
          return newCounts;
        });
      }, interval);

      return timer;
    };

    let countTimer = startCounting();

    const refreshTimer = setInterval(() => {
      clearInterval(countTimer);
      countTimer = startCounting();
    }, 6000);

    return () => {
      clearInterval(countTimer);
      clearInterval(refreshTimer);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="border-l-2 border-white/10 bg-slate-950/40 p-8 backdrop-blur-md transition-all hover:bg-slate-950/50">
        <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent mb-6" />
        <h3 className="text-2xl font-light tracking-tight text-white uppercase mb-4">
          Results <span className="font-semibold">For You</span>
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6">
          Bringing transparency, trust, and value to every property deal.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-100 mb-1 md:text-6xl">{counts.clients}+</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider md:text-sm">Satisfied Clients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-100 mb-1 md:text-6xl">{counts.projects}+</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider md:text-sm">Projects Completed</p>
          </div>
        </div>
      </div>

      <div className="border-l-2 border-white/10 bg-slate-950/40 p-8 backdrop-blur-md transition-all hover:bg-slate-950/50">
        <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent mb-6" />
        <h3 className="text-2xl font-light tracking-tight text-white uppercase mb-4">
          Real Estate <span className="font-semibold">Gets Real</span>
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6">
          Dedicated to delivering success and expectations in every transaction.
        </p>
        <div className="text-center">
          <p className="text-5xl font-bold text-amber-100 mb-2 md:text-7xl">14+</p>
          <p className="text-sm text-slate-400 uppercase tracking-wider md:text-base">Years Experience</p>
        </div>
      </div>

      <div className="border-l-2 border-white/10 bg-slate-950/40 p-8 backdrop-blur-md transition-all hover:bg-slate-950/50">
        <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent mb-6" />
        <h3 className="text-2xl font-light tracking-tight text-white uppercase mb-4">
          Meet <span className="font-semibold">CEO</span>
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6">
          Get to know the leadership behind Bilax Constructions and our vision for transforming Nigeria's construction landscape.
        </p>
        
        <div className="aspect-video w-full rounded-sm overflow-hidden border border-white/10">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/NIfAceqeUQk"
            title="Dr. Ayamele Ajuzie - CEO Bilax"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-slate-400 mt-4 text-center">Dr. Ayamele Ajuzie - CEO Bilax</p>
      </div>

      <div className="border-l-2 border-white/10 bg-slate-950/40 p-8 backdrop-blur-md transition-all hover:bg-slate-950/50">
        <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent mb-6" />
        <h3 className="text-2xl font-light tracking-tight text-white uppercase mb-4">
          Our <span className="font-semibold">Certifications</span>
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6">
          Committed to excellence through industry-recognized standards and professional accreditations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-300">ISO 9001:2015</span>
              </div>
              <motion.button
                onClick={() => setSelectedCert('ISO 9001:2015')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer text-xs px-2 py-1 rounded border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-100 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 transition-all"
              >
                View
              </motion.button>
            </div>
            <p className="text-xs text-slate-500 pl-4">Quality Management</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-300">ISO 14001:2015</span>
              </div>
              <motion.button
                onClick={() => setSelectedCert('ISO 14001:2015')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs px-2 py-1 rounded border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-100 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 transition-all"
              >
                View
              </motion.button>
            </div>
            <p className="text-xs text-slate-500 pl-4">Environmental Management</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-300">COREN Registered</span>
              </div>
              <motion.button
                onClick={() => setSelectedCert('COREN Registered')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs px-2 py-1 rounded border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-100 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 transition-all"
              >
                View
              </motion.button>
            </div>
            <p className="text-xs text-slate-500 pl-4">Engineering Regulation</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-300">NIA Member</span>
              </div>
              <motion.button
                onClick={() => setSelectedCert('NIA Member')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs px-2 py-1 rounded border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-100 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 transition-all"
              >
                View
              </motion.button>
            </div>
            <p className="text-xs text-slate-500 pl-4">Architects Institute</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-300">NIOB Certified</span>
              </div>
              <motion.button
                onClick={() => setSelectedCert('NIOB Certified')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs px-2 py-1 rounded border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-100 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 transition-all"
              >
                View
              </motion.button>
            </div>
            <p className="text-xs text-slate-500 pl-4">Builders Institute</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-300">QSR Certified</span>
              </div>
              <motion.button
                onClick={() => setSelectedCert('QSR Certified')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs px-2 py-1 rounded border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-100 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 transition-all"
              >
                View
              </motion.button>
            </div>
            <p className="text-xs text-slate-500 pl-4">Quality System Requirements</p>
          </div>
        </div>
      </div>

      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="max-w-2xl w-full mx-4 rounded-sm border border-white/10 bg-slate-900 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">{selectedCert}</h3>
              <motion.button
                onClick={() => setSelectedCert(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            <div className="bg-slate-950/50 rounded-sm p-8 flex items-center justify-center min-h-[300px] border border-white/5">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-400 mb-2">Certificate Document</p>
                <p className="text-sm text-slate-500">Official certification document for {selectedCert}</p>
                <p className="text-xs text-slate-600 mt-4">Upload actual certificate image to display here</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={() => setSelectedCert(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-sm border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-100"
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
