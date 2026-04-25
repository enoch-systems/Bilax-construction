"use client";

import React, { useState, useEffect } from "react";

const images = [
  "/eng1.png",
  "/eng2.png",
  "/eng3.png",
  "/eng4.png",
  "/eng5.png",
];

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-sm">
      {images.map((src, index) => (
        <div
          key={src}
          className={`transition-all duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110 absolute inset-0"
          }`}
        >
          <img
            src={src}
            alt={`Construction ${index + 1}`}
            className="w-full h-auto md:w-2/3 md:mx-auto"
          />
        </div>
      ))}
    </div>
  );
}
