"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

const services = [
  {
    title: "Residential Construction",
    description: "Building dream homes with precision and quality. From luxury villas to affordable housing, we deliver exceptional residential projects that meet your unique needs and exceed expectations.",
    image: "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316778/construction/services/residential.jpg",
  },
  {
    title: "Commercial Construction",
    description: "Creating functional and inspiring commercial spaces. Our expertise includes office buildings, retail centers, hotels, and mixed-use developments designed for business success.",
    image: "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316771/construction/services/commercial.jpg",
  },
  {
    title: "Industrial Construction",
    description: "Specialized construction for industrial facilities including factories, warehouses, processing plants, and manufacturing centers built to operational excellence standards.",
    image: "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316774/construction/services/industrial_building.jpg",
  },
  {
    title: "Renovation & Remodeling",
    description: "Transforming existing spaces into modern, functional environments. We handle renovations of all scales with minimal disruption to your daily operations.",
    image: "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316777/construction/services/renovation.jpg",
  },
  {
    title: "Project Management",
    description: "Comprehensive project management services ensuring your construction project is delivered on time, within budget, and to the highest quality standards.",
    image: "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316775/construction/services/projectmanagement.jpg",
  },
  {
    title: "Consulting Services",
    description: "Expert construction consulting for feasibility studies, cost estimation, design review, and technical guidance throughout your project lifecycle.",
    image: "https://res.cloudinary.com/djdbcoyot/image/upload/v1777316773/construction/services/consulting.jpg",
  },
];

export default function ServicesPage() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <main className="bg-slate-950 text-white">
      <Header />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
              What We Offer
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
          <h1 className="mb-6 text-center text-4xl font-light tracking-tight text-white uppercase md:text-6xl">
            Our <span className="font-semibold">Services</span>
          </h1>
          <p className="mx-auto mb-16 max-w-3xl text-center text-lg text-slate-400 md:text-xl">
            Comprehensive construction solutions tailored to meet your specific needs, delivered with excellence and professionalism.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group border-l-2 border-white/10 bg-slate-950/40 backdrop-blur-md transition-all hover:bg-slate-950/50 hover:border-amber-500/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-light tracking-tight text-white uppercase">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isAdminPage && (
        <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="mb-6 text-3xl font-light tracking-tight text-white uppercase md:text-4xl">
              Ready to Start Your <span className="font-semibold">Project?</span>
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg text-slate-400">
              Contact us today for a free consultation and let's discuss how we can bring your construction vision to life.
            </p>
            <a
              href="https://wa.me/2349162919586?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20consultation%20for%20my%20construction%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer inline-block rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-8 py-3 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 md:px-10 md:text-base"
            >
              Free Consultation
            </a>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
