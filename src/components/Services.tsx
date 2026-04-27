"use client";

interface ServicesProps {
  isMenuOpen?: boolean;
  showViewAllButton?: boolean;
}

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

export default function Services({ isMenuOpen = false, showViewAllButton = true }: ServicesProps) {
  return (
    <section id="services" className={`relative py-20 md:py-28 transition-all duration-500 ${isMenuOpen ? "backdrop-blur-2xl opacity-20 scale-95" : ""}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
            What We Offer
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
        </div>
        <h2 className="mb-6 text-center text-3xl font-light tracking-tight text-white uppercase md:text-5xl">
          Our <span className="font-semibold">Services</span>
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-slate-400 md:text-xl">
          Comprehensive construction solutions tailored to meet your specific needs, delivered with excellence and professionalism.
        </p>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group border-l-2 border-white/10 bg-slate-950/40 backdrop-blur-md transition-all hover:bg-slate-950/50 hover:border-amber-500/30"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showViewAllButton && (
          <div className="flex justify-center">
            <a
              href="/services"
              className="cursor-pointer rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-8 py-3 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 md:px-10 md:text-base"
            >
              View All Services
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
