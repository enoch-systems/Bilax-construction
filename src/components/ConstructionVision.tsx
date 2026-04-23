export default function ConstructionVision() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-orange-500 font-semibold mb-2">About Us</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Construction Your Vision
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1541976590-713941681591?w=600&q=80" 
                alt="Project Planning" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Project Planning</h3>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80" 
                alt="Superior Craft" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Superior Craft</h3>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src="https://images.unsplash.com/photo-1590644365608-8b2d5f2947b2?w=600&q=80" 
                alt="Estate Construction" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Estate Construction</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
