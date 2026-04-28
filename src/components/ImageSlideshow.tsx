"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const cloudinaryImages = [
  "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316847/construction/about/eng1.png",
  "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316850/construction/about/eng2.png",
  "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316852/construction/about/eng3.png",
  "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316854/construction/about/eng4.png",
  "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316856/construction/about/eng5.png",
];

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cloudinaryImages.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-slate-900/50 min-h-[200px] md:min-h-[300px]">
      {cloudinaryImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Engineer ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {cloudinaryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-amber-400 w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
