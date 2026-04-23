import Header from "./Header";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-gray-900">
      <div className="absolute inset-0 flex md:hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-20 right-4 w-32 h-40 object-cover opacity-60 rounded-lg"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 hidden md:flex">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-1/2 h-full object-cover opacity-40"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-1/2 h-full object-cover opacity-40"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>
      </div>
      
      <Header />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 pt-32 flex-1 flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Building the Shape You've Always Wanted
          </h1>
          <p className="text-base md:text-xl text-gray-300 mb-8 leading-relaxed">
            Construction is about transforming ideas into reality. It's about creating spaces that inspire, connect, and uplift.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <button className="bg-orange-500 text-white px-6 py-3 md:px-8 rounded-full font-medium hover:bg-orange-600 transition-colors text-sm md:text-base">
              Start your project
            </button>
            <button className="border-2 border-white text-white px-6 py-3 md:px-8 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-colors text-sm md:text-base">
              Call now
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 md:pt-8 mt-64 md:mt-0">
          <p className="text-gray-400 text-xs md:text-sm mb-4 text-right md:text-center">Our Services</p>
          <div className="flex flex-col gap-4 md:gap-6 items-center justify-end md:justify-center">
            <span className="flex items-center gap-2 text-white font-normal text-sm md:text-xl whitespace-nowrap"><span className="w-2 h-2 bg-orange-500 rounded-full"></span>Interior Design</span>
            <span className="flex items-center gap-2 text-white font-normal text-sm md:text-xl"><span className="w-2 h-2 bg-orange-500 rounded-full"></span>Construction</span>
            <span className="flex items-center gap-2 text-white font-normal text-sm md:text-xl"><span className="w-2 h-2 bg-orange-500 rounded-full"></span>Architecture</span>
            <span className="flex items-center gap-2 text-white font-normal text-sm md:text-xl"><span className="w-2 h-2 bg-orange-500 rounded-full"></span>Engineering</span>
            <span className="flex items-center gap-2 text-white font-normal text-sm md:text-xl"><span className="w-2 h-2 bg-orange-500 rounded-full"></span>Renovation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
