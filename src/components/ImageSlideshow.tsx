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
    <div className="relative w-full overflow-hidden rounded-sm">
      {cloudinaryImages.map((src, index) => (
        <div
          key={src}
          className={`transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 relative" : "opacity-0 absolute inset-0"
          }`}
        >
          <Image
            src={src}
            alt={`Engineer ${index + 1}`}
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>
      ))}
      
    </div>
  );
}
