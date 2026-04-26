"use client";

import ImageSlideshow from "./ImageSlideshow";
import Link from "next/link";
import Results from "./Results";

interface AboutUsProps {
  showButton?: boolean;
  showFullText?: boolean;
}

export default function AboutUs({ showButton = true, showFullText = false }: AboutUsProps) {

  return (
    <section className="bg-gradient-to-b from-slate-950/95 to-slate-900/90 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
            About Us
          </p>
          
          <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />

        </div>
          <p className="mb-2 text-center text-sm font-medium text-gray-600 uppercase tracking-[0.2em] md:text-base">
              Est. 2010
            </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-950/40 p-10 backdrop-blur-md md:p-14">
            <div className="mb-0 md:mb-12">
              <ImageSlideshow />
            </div>
            <h2 className="mb-4 text-center text-2xl font-light tracking-tight text-white uppercase mb-4">
              Our Reputation is as<br />
              <span className="font-semibold">Solid as Concrete</span>
            </h2>
          
           
            <div className="-mx-16 px-9 md:-mx-14 md:px-14">
              <p className="mb-12 text-left text-base leading-relaxed text-slate-400 md:text-xl">
                Founded with a vision to transform Nigeria's construction landscape, Bilax Constructions has grown from a small family business into a leading construction company over 14+ years. Our journey began with a simple belief: every structure we build should stand as a testament to quality, integrity, and innovation.
                {showFullText && " Over the years, we have completed numerous projects across residential, commercial, and industrial sectors, earning the trust of clients through consistent delivery and exceptional craftsmanship. Today, we continue to push boundaries, embracing modern techniques while honoring the timeless principles of construction excellence."}
              </p>
            </div>
            {showButton && (
              <div className="flex justify-center">
                <Link href="/about" className="cursor-pointer rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-11 md:text-base">
                  Learn More
                </Link>
              </div>
            )}
          </div>

          <Results />
        </div>
      </div>
    </section>
  );
}
