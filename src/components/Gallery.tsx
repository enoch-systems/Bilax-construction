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
