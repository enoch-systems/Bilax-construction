"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", title: "Building Construction", category: "Construction" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", title: "Civil Engineering", category: "Engineering" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Renovation Project", category: "Renovation" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", title: "Project Management", category: "Management" },
  { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", title: "Maintenance Work", category: "Maintenance" },
  { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", title: "Interior Design", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1576523939626-419037e4819c?w=800&q=80", title: "Commercial Tower", category: "Commercial" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", title: "Modern Complex", category: "Commercial" },
  { src: "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80", title: "Residential Estate", category: "Residential" },
  { src: "https://images.unsplash.com/photo-1590644365608-8b2d5f2947b2?w=800&q=80", title: "Estate Development", category: "Residential" },
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80", title: "Medical Center", category: "Institutional" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", title: "University Campus", category: "Institutional" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Construction", "Engineering", "Renovation", "Management", "Maintenance", "Interior", "Commercial", "Residential", "Institutional"];

  const filteredImages = filter === "All" ? galleryImages : galleryImages.filter(img => img.category === filter);

  return (
    <main className="bg-slate-950 text-white">
      <Header />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
              Our Gallery
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
          <h1 className="mb-6 text-center text-4xl font-light tracking-tight text-white uppercase md:text-6xl lg:text-7xl">
            Project <span className="font-semibold">Showcase</span>
          </h1>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-400 md:text-lg">
            Browse through our portfolio of completed projects across Nigeria, showcasing our commitment to quality and excellence.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium transition-all md:text-base ${
                  filter === category
                    ? "border-amber-500/50 bg-amber-500/20 text-amber-100"
                    : "border-white/20 bg-white/5 text-slate-300 hover:border-white/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-950/60" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <p className="text-sm font-medium text-amber-100">Tap to view</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}

      <Footer />
    </main>
  );
}
