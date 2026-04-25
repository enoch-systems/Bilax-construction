export default function Projects() {
  return (
    <section id="projects" className="bg-gradient-to-b from-slate-950/95 to-slate-900/90 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center md:mb-16">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
              Our Work
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
          <h2 className="mb-6 text-3xl font-light tracking-tight text-white uppercase md:text-5xl">
            See Our <span className="font-semibold">Projects</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-xl">
            Explore our portfolio of successful construction projects that with the aesthetic
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" 
                alt="Commercial Building" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Commercial <span className="font-semibold">Building</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">Modern office complex in downtown</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" 
                alt="Residential Complex" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Residential <span className="font-semibold">Complex</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">Luxury apartment community</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" 
                alt="Industrial Facility" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Industrial <span className="font-semibold">Facility</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">State-of-the-art manufacturing plant</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" 
                alt="Shopping Mall" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Shopping <span className="font-semibold">Mall</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">Retail center with 50+ stores</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" 
                alt="Healthcare Center" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Healthcare <span className="font-semibold">Center</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">Modern medical facility</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" 
                alt="Educational Campus" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Educational <span className="font-semibold">Campus</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">University complex with modern facilities</p>
          </div>
        </div>

        <div className="mt-12 text-center md:mt-16">
          <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-11 md:text-base">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
