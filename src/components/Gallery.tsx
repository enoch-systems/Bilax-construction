"use client";

import React, { useState } from "react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", label: "Building Construction" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", label: "Civil Engineering" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", label: "Renovation & Finishing" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80", label: "Project Management" },
  { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80", label: "Maintenance" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="services" className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 py-20 md:py-28 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
              What We Offer
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryImages.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-sm cursor-pointer aspect-square border border-white/10 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setSelectedImage(item.src)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-medium text-amber-100 text-center bg-slate-900/80 backdrop-blur-sm py-1.5 px-3 rounded-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
}
