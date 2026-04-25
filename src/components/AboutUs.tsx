"use client";

import ImageSlideshow from "./ImageSlideshow";

export default function AboutUs() {

  return (
    <section className="bg-gradient-to-b from-slate-950/95 to-slate-900/90 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl bg-slate-950/40 p-10 backdrop-blur-md md:p-14">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
              About Us
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
          <div className="mb-0 md:mb-12">
            <ImageSlideshow />
          </div>
          <h2 className="mb-8 text-center text-3xl font-light tracking-tight text-white uppercase md:text-5xl">
            Our Reputation is as<br />
            <span className="font-semibold">Solid as Concrete</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-slate-400 md:text-xl">
            Conzone Construction transforms ideas into reality by creating spaces that inspire, connect, and uplift. With years of experience and a steadfast commitment to excellence, we bring every vision to life with precision and care.
          </p>
          <div className="flex justify-center">
            <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-11 md:text-base">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
