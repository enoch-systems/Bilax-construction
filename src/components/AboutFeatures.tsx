export default function AboutFeatures() {
  return (
    <section className="bg-gradient-to-b from-slate-950/95 to-slate-900/90 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-l-2 border-white/10 bg-slate-950/40 p-8 backdrop-blur-md transition-all hover:bg-slate-950/50">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent mb-6" />
            <h3 className="text-2xl font-light tracking-tight text-white uppercase mb-4">
              Results <span className="font-semibold">For You</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Bringing transparency, trust, and value to every property deal.
            </p>
          </div>

          <div className="border-l-2 border-white/10 bg-slate-950/40 p-8 backdrop-blur-md transition-all hover:bg-slate-950/50">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent mb-6" />
            <h3 className="text-2xl font-light tracking-tight text-white uppercase mb-4">
              Real Estate <span className="font-semibold">Gets Real</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Dedicated to delivering success and expectations in every transaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
