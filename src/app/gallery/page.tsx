"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import ImageSkeleton from "@/components/ImageSkeleton";

const Header = dynamic(() => import("@/components/Header"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(12);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setImagesPerPage(window.innerWidth >= 768 ? 16 : 8);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setGalleryImages(data);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchGalleryData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = galleryImages.length > 0 ? Math.ceil(galleryImages.length / imagesPerPage) : 0;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage);

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
          {isLoading ? (
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ImageSkeleton key={i} />
              ))}
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400">No images in gallery yet.</p>
            </div>
          ) : (
            <>
              {totalPages > 1 && (
            <div className="mb-8 flex items-center justify-center gap-1 md:gap-2">
              <motion.button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 ? true : false}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border text-xs md:text-sm transition-all ${
                    currentPage === page
                      ? 'border-amber-500/50 bg-amber-500/20 text-amber-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
              <motion.button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages ? true : false}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          )}

          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-950/60" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <p className="text-sm font-medium text-amber-100">Tap to view</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-1 md:gap-2">
              <motion.button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 ? true : false}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border text-xs md:text-sm transition-all ${
                    currentPage === page
                      ? 'border-amber-500/50 bg-amber-500/20 text-amber-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
              <motion.button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages ? true : false}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          )}
            </>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Selected"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
