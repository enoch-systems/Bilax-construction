"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Chief Emeka Nnamdi",
    role: "Real Estate Developer",
    location: "Lagos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "Bilax Constructions delivered our residential estate project ahead of schedule. Their attention to detail and commitment to quality is unmatched in Nigeria. I've worked with many construction companies, but Bilax stands out for their professionalism and transparency.",
    rating: 5,
  },
  {
    name: "Dr. (Mrs) Ngozi Adichie",
    role: "Hospital Administrator",
    location: "Enugu",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
    text: "When we needed to expand our medical facility, Bilax was our first choice. They understood our unique requirements and delivered a state-of-the-art hospital wing that exceeded our expectations. The team was responsive, skilled, and truly cared about our vision.",
    rating: 5,
  },
  {
    name: "Alhaji Ibrahim Musa",
    role: "Business Owner",
    location: "Kano",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
    text: "I hired Bilax for my commercial complex project, and I couldn't be happier. They handled everything from planning to completion with exceptional expertise. The building is not only beautiful but also structurally sound. Highly recommended!",
    rating: 5,
  },
  {
    name: "Mrs. Chioma Eze",
    role: "Homeowner",
    location: "Abuja",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    text: "Building our dream home with Bilax was a wonderful experience. They listened to our needs, offered valuable suggestions, and delivered exactly what we wanted. The quality of work is excellent, and the team was always professional and courteous.",
    rating: 5,
  },
  {
    name: "Engr. Olumide Bakare",
    role: "Project Consultant",
    location: "Ibadan",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    text: "As a construction consultant, I've worked with many companies across Nigeria. Bilax Constructions consistently delivers high-quality work on time and within budget. Their engineering standards are top-notch, and I recommend them without hesitation.",
    rating: 5,
  },
  {
    name: "Chief (Mrs) Victoria Okoro",
    role: "School Proprietor",
    location: "Port Harcourt",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "Bilax built our school campus, and the result is fantastic. The classrooms are spacious, the facilities are modern, and the entire structure is built to last. They were patient with our requirements and delivered beyond our expectations.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <main className="bg-slate-950 text-white">
      <Header />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
              Testimonials
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
          <h1 className="mb-6 text-center text-4xl font-light tracking-tight text-white uppercase md:text-6xl lg:text-7xl">
            What Our <span className="font-semibold">Clients Say</span>
          </h1>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-400 md:text-lg">
            Don't just take our word for it. Here's what our satisfied clients across Nigeria have to say about working with Bilax Constructions.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-sm border border-white/10 bg-slate-950/40 p-8 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-slate-900/60"
              >
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 text-base leading-relaxed text-slate-300 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-white">{testimonial.name}</h4>
                    <p className="text-xs text-amber-400/90">{testimonial.role}</p>
                    <p className="text-xs text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
