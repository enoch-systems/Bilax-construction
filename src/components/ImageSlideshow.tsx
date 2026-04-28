"use client";

import React, { useState, useEffect } from "react";

// Optimized Cloudinary URLs with auto-format and quality
const images = [
  "https://res.cloudinary.com/djdbcoyot/image/upload/f_auto,q_auto,w_800/construction/about/eng1.png",
  "https://res.cloudinary.com/djdbcoyot/image/upload/f_auto,q_auto,w_800/construction/about/eng2.png",
  "https://res.cloudinary.com/djdbcoyot/image/upload/f_auto,q_auto,w_800/construction/about/eng3.png",
  "https://res.cloudinary.com/djdbcoyot/image/upload/f_auto,q_auto,w_800/construction/about/eng4.png",
  "https://res.cloudinary.com/djdbcoyot/image/upload/f_auto,q_auto,w_800/construction/about/eng5.png",
];

// Fallback images in case Cloudinary fails
const fallbackImages = [
  "/images/about/eng1.png",
  "/images/about/eng2.png",
  "/images/about/eng3.png",
  "/images/about/eng4.png",
  "/images/about/eng5.png",
];

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    // Preload images
    const preloadImages = () => {
      images.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, index]));
        };
        img.onerror = () => {
          setFailedImages((prev) => new Set([...prev, index]));
        };
        img.src = src;
      });
    };
    preloadImages();

    // Check if all images are ready
    const checkReady = setInterval(() => {
      if (loadedImages.size > 0 || failedImages.size === images.length) {
        setImagesReady(true);
        clearInterval(checkReady);
      }
    }, 100);

    // Start slideshow after initial load
    const slideshowTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }, 500);

    return () => {
      clearInterval(checkReady);
      clearTimeout(slideshowTimer);
    };
  }, [loadedImages.size, failedImages.size]);

  const getImageSrc = (index: number) => {
    if (failedImages.has(index)) {
      return fallbackImages[index];
    }
    return images[index];
  };

  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-slate-900/50 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
      {/* Loading Skeleton */}
      {!imagesReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-700/50 mb-4"></div>
            <div className="w-32 h-2 bg-slate-700/50 rounded"></div>
          </div>
        </div>
      )}

      {/* Images */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`transition-all duration-1000 ease-in-out ${
            index === currentIndex && imagesReady
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110 absolute inset-0"
          }`}
        >
          <img
            src={getImageSrc(index)}
            alt={`Bilax Team ${index + 1}`}
            className="w-full h-auto md:w-2/3 md:mx-auto object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImages[index]) {
                target.src = fallbackImages[index];
              }
            }}
          />
        </div>
      ))}

      {/* Image Navigation Dots */}
      {imagesReady && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-amber-500 w-4"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
