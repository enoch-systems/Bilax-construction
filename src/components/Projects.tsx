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
                src="https://images.unsplash.com/photo-1576523939626-419037e4819c?w=600&q=80" 
                alt="Enugu City Tower" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-100 transition-opacity duration-300">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Enugu <span className="font-semibold">City Tower</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">Modern office complex in Enugu metropolis</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80" 
                alt="Owerri Gardens Estate" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-100 transition-opacity duration-300">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Owerri <span className="font-semibold">Gardens Estate</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">Luxury apartment community in Owerri</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" 
                alt="Nnewi Industrial Park" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-100 transition-opacity duration-300">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Nnewi <span className="font-semibold">Industrial Park</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">State-of-the-art manufacturing plant in Nnewi</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" 
                alt="Umuahia Central Mall" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-100 transition-opacity duration-300">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Umuahia <span className="font-semibold">Central Mall</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">Retail center with 50+ stores in Umuahia</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" 
                alt="Nsukka Medical Center" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-100 transition-opacity duration-300">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Nsukka <span className="font-semibold">Medical Center</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">Modern medical facility in Nsukka</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80" 
                alt="Afikpo University Campus" 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-100 transition-opacity duration-300">
                <button className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-6 md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-light tracking-tight text-white uppercase md:text-xl">Afikpo <span className="font-semibold">University Campus</span></h3>
            <p className="mb-8 text-sm text-slate-400 md:text-base">University complex with modern facilities in Afikpo</p>
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
