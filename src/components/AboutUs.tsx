export default function AboutUs() {
  return (
    <section className="py-12 md:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-8 md:gap-12">
          <div className="max-w-3xl">
            <p className="text-orange-500 font-semibold mb-2 text-sm md:text-base">About Us</p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Our Reputation is as Solid as Concrete
            </h2>
            <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
              Conzone Construction is about transforming ideas into reality. We're about creating spaces that inspire, connect, and uplift. With years of experience and a commitment to excellence, we bring your vision to life with precision and care.
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium hover:bg-orange-600 transition-colors text-sm md:text-base">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
