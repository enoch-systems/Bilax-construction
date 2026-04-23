export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-orange-500 font-semibold mb-2 text-sm md:text-base">Our Work</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">See Our Projects</h2>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of successful construction projects that with the aesthetic
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" 
                alt="Commercial Building" 
                className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-medium text-sm md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Commercial Building</h3>
            <p className="text-gray-400 text-sm md:text-base mb-8">Modern office complex in downtown</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" 
                alt="Residential Complex" 
                className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-medium text-sm md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Residential Complex</h3>
            <p className="text-gray-400 text-sm md:text-base mb-8">Luxury apartment community</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" 
                alt="Industrial Facility" 
                className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-medium text-sm md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Industrial Facility</h3>
            <p className="text-gray-400 text-sm md:text-base mb-8">State-of-the-art manufacturing plant</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" 
                alt="Shopping Mall" 
                className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-medium text-sm md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Shopping Mall</h3>
            <p className="text-gray-400 text-sm md:text-base mb-8">Retail center with 50+ stores</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" 
                alt="Healthcare Center" 
                className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-medium text-sm md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Healthcare Center</h3>
            <p className="text-gray-400 text-sm md:text-base mb-8">Modern medical facility</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" 
                alt="Educational Campus" 
                className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-medium text-sm md:text-base">View Project</button>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Educational Campus</h3>
            <p className="text-gray-400 text-sm md:text-base mb-8">University complex with modern facilities</p>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <button className="bg-orange-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium hover:bg-orange-600 transition-colors text-sm md:text-base">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
