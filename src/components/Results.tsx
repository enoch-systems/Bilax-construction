"use client";

import { useState, useEffect } from "react";

export default function Results() {
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    years: 0,
    satisfaction: 0
  });

  const targetCounts = {
    clients: 500,
    projects: 150,
    years: 14,
    satisfaction: 98
  };

  const stockData = [
    { name: "Oil", value: 85, change: "+2.4%" },
    { name: "Steel", value: 120, change: "+1.8%" },
    { name: "Cement", value: 95, change: "+3.2%" },
    { name: "Copper", value: 78, change: "+0.9%" },
    { name: "Aluminum", value: 65, change: "+1.5%" },
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

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

    return () => clearInterval(timer);
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
          Market <span className="font-semibold">Insights</span>
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6">
          Track real-time market trends in construction materials and commodities. Our partnerships give you access to valuable market intelligence.
        </p>
        
        <div className="space-y-4">
          {stockData.map((stock, index) => (
            <div key={index} className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-300">{stock.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white">${stock.value}</span>
                <span className="text-xs font-medium text-green-400">{stock.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
