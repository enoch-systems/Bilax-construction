"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";

const testimonials = [
  {
    name: "Chief Emeka Nnamdi",
    handle: "@emekka_nnamdi",
    role: "Real Estate Developer",
    location: "Lagos",
    image: "/noface.jfif",
    text: "Bilax Constructions delivered our residential estate project ahead of schedule. Their attention to detail and commitment to quality is unmatched in Nigeria. I've worked with many construction companies, but Bilax stands out for their professionalism and transparency.",
    rating: 5,
    time: "2 weeks ago",
    likes: 24,
  },
  {
    name: "Dr. (Mrs) Ngozi Adichie",
    handle: "@dr_adichie",
    role: "Hospital Administrator",
    location: "Enugu",
    image: "/noface.jfif",
    text: "When we needed to expand our medical facility, Bilax was our first choice. They understood our unique requirements and delivered a state-of-the-art hospital wing that exceeded our expectations. The team was responsive, skilled, and truly cared about our vision.",
    rating: 5,
    time: "3 months ago",
    likes: 18,
  },
  {
    name: "Alhaji Ibrahim Musa",
    handle: "@ibrahim_musa",
    role: "Business Owner",
    location: "Kano",
    image: "/noface.jfif",
    text: "I hired Bilax for my commercial complex project, and I couldn't be happier. They handled everything from planning to completion with exceptional expertise. The building is not only beautiful but also structurally sound. Highly recommended!",
    rating: 5,
    time: "6 months ago",
    likes: 31,
  },
  {
    name: "Mrs. Chioma Eze",
    handle: "@chioma_eze",
    role: "Homeowner",
    location: "Abuja",
    image: "/noface.jfif",
    text: "Building our dream home with Bilax was a wonderful experience. They listened to our needs, offered valuable suggestions, and delivered exactly what we wanted. The quality of work is excellent, and the team was always professional and courteous.",
    rating: 5,
    time: "8 months ago",
    likes: 15,
  },
  {
    name: "Engr. Olumide Bakare",
    handle: "@engr_bakare",
    role: "Project Consultant",
    location: "Ibadan",
    image: "/noface.jfif",
    text: "As a construction consultant, I've worked with many companies across Nigeria. Bilax Constructions consistently delivers high-quality work on time and within budget. Their engineering standards are top-notch, and I recommend them without hesitation.",
    rating: 5,
    time: "1 year ago",
    likes: 86,
  },
  {
    name: "Mrs. Chidinma Eze",
    handle: "@chidinma_eze",
    role: "Supermarket Owner",
    location: "Onitsha",
    image: "/noface.jfif",
    text: "Bilax constructed our supermarket with excellent retail space design. The customer flow and storage areas are perfectly planned. Our business has grown significantly since the expansion.",
    rating: 5,
    time: "1 year ago",
    likes: 79,
  },
  {
    name: "Engr. Musa Abdullahi",
    handle: "@engr_musa",
    role: "Construction Manager",
    location: "Kaduna",
    image: "/noface.jfif",
    text: "I've supervised several projects with Bilax as the main contractor. Their professionalism and technical expertise are outstanding. They deliver quality work consistently.",
    rating: 5,
    time: "1 year ago",
    likes: 88,
  },
  {
    name: "Chief (Mrs) Victoria Okoro",
    handle: "@victoria_okoro",
    role: "School Proprietor",
    location: "Port Harcourt",
    image: "/noface.jfif",
    text: "Bilax built our school campus, and the result is fantastic. The classrooms are spacious, the facilities are modern, and the entire structure is built to last. They were patient with our requirements and delivered beyond our expectations.",
    rating: 5,
    time: "2 years ago",
    likes: 84,
  },
  {
    name: "Arc. Tunde Ojo",
    handle: "@arch_tunde",
    role: "Architect",
    location: "Lagos",
    image: "/noface.jfif",
    text: "Working with Bilax on the luxury apartment project was seamless. Their execution of our architectural vision was flawless. The attention to structural integrity while maintaining aesthetic appeal is remarkable.",
    rating: 5,
    time: "2 years ago",
    likes: 77,
  },
  {
    name: "Mrs. Adaeze Nwankwo",
    handle: "@adaeze_nwankwo",
    role: "Beauty Salon Owner",
    location: "Port Harcourt",
    image: "/noface.jfif",
    text: "My beauty salon was built by Bilax with exquisite attention to detail. The ambiance and functionality are perfect for my business. Clients always compliment the space!",
    rating: 5,
    time: "2 years ago",
    likes: 81,
  },
  {
    name: "Barr. Fatima Ahmed",
    handle: "@fatima_ahmed",
    role: "Legal Practitioner",
    location: "Kaduna",
    image: "/noface.jfif",
    text: "Bilax constructed our law firm's headquarters with exceptional professionalism. The project was completed on time, and the quality exceeded our expectations. Their team's expertise is truly commendable.",
    rating: 5,
    time: "3 years ago",
    likes: 76,
  },
  {
    name: "Mr. Chinedu Okonkwo",
    handle: "@chinedu_okonkwo",
    role: "Manufacturing CEO",
    location: "Onitsha",
    image: "/noface.jfif",
    text: "Our factory expansion project was handled by Bilax, and the results speak for themselves. Their industrial construction expertise is unmatched. The facility now operates at maximum efficiency thanks to their excellent work.",
    rating: 5,
    time: "3 years ago",
    likes: 89,
  },
  {
    name: "Mrs. Aisha Bello",
    handle: "@aisha_bello",
    role: "Hotel Manager",
    location: "Abuja",
    image: "/noface.jfif",
    text: "Bilax renovated our hotel to international standards. The transformation was incredible, and guest satisfaction has significantly improved. Their team's dedication to quality is truly impressive.",
    rating: 5,
    time: "3 years ago",
    likes: 82,
  },
  {
    name: "Chief Olusegun Adebayo",
    handle: "@chief_adebayo",
    role: "Agricultural Investor",
    location: "Ibadan",
    image: "/noface.jfif",
    text: "Bilax constructed our agricultural processing facility with excellent industrial standards. The project was complex but handled professionally. Our operations have improved significantly.",
    rating: 5,
    time: "3 years ago",
    likes: 74,
  },
  {
    name: "Engr. Segun Adeyemi",
    handle: "@segun_adeyemi",
    role: "Civil Engineer",
    location: "Ibadan",
    image: "/noface.jfif",
    text: "I've collaborated with Bilax on multiple infrastructure projects. Their technical competence and project management skills are exceptional. They deliver quality work consistently.",
    rating: 5,
    time: "4 years ago",
    likes: 85,
  },
  {
    name: "Dr. Ibrahim Sule",
    handle: "@dr_sule",
    role: "University Professor",
    location: "Minna",
    image: "/noface.jfif",
    text: "Bilax constructed our research facility with precision and expertise. The laboratory spaces meet all international standards. Their commitment to educational infrastructure development is commendable.",
    rating: 5,
    time: "4 years ago",
    likes: 72,
  },
  {
    name: "Mrs. Grace Okafor",
    handle: "@grace_okafor",
    role: "Restaurant Owner",
    location: "Owerri",
    image: "/noface.jfif",
    text: "Our restaurant construction was handled beautifully by Bilax. The design and execution were perfect, creating an inviting atmosphere for our customers. Highly recommend their services!",
    rating: 5,
    time: "4 years ago",
    likes: 78,
  },
  {
    name: "Chief Obiora Nwosu",
    handle: "@chief_nwosu",
    role: "Industrialist",
    location: "Aba",
    image: "/noface.jfif",
    text: "Bilax built our manufacturing plant with exceptional quality. The project was complex, but their team handled every challenge professionally. Our production capacity has doubled since completion.",
    rating: 5,
    time: "4 years ago",
    likes: 91,
  },
  {
    name: "Mrs. Ngozi Okeke",
    handle: "@ngozi_okeke",
    role: "Pharmacist",
    location: "Enugu",
    image: "/noface.jfif",
    text: "Our pharmacy construction by Bilax was completed to the highest standards. The layout is perfect for our operations, and the building quality is exceptional. Very professional team!",
    rating: 5,
    time: "5 years ago",
    likes: 73,
  },
  {
    name: "Alhaji Kabiru Yusuf",
    handle: "@kabiru_yusuf",
    role: "Real Estate Investor",
    location: "Kano",
    image: "/noface.jfif",
    text: "I've invested in multiple properties built by Bilax. Their construction quality and attention to detail have consistently delivered excellent returns. They're my go-to construction company.",
    rating: 5,
    time: "6 years ago",
    likes: 28,
  },
  {
    name: "Dr. Amaka Obi",
    handle: "@dr_obi",
    role: "Medical Director",
    location: "Lagos",
    image: "/noface.jfif",
    text: "Bilax constructed our clinic with excellent medical facility standards. The workflow and patient experience have improved significantly. Their understanding of healthcare construction is impressive.",
    rating: 5,
    time: "6 years ago",
    likes: 22,
  },
  {
    name: "Mr. Emeka Okoro",
    handle: "@emeka_okoro",
    role: "Tech Startup Founder",
    location: "Lagos",
    image: "/noface.jfif",
    text: "Our tech hub was built by Bilax with modern infrastructure and excellent design. The space now houses our growing team perfectly. Their construction quality is top-notch.",
    rating: 5,
    time: "6 years ago",
    likes: 19,
  },
  {
    name: "Mrs. Halima Ibrahim",
    handle: "@halima_ibrahim",
    role: "Fashion Designer",
    location: "Abuja",
    image: "/noface.jfif",
    text: "Bilax built my fashion studio with incredible attention to detail. The space is both functional and beautiful, perfect for creative work. Their team understood my vision perfectly.",
    rating: 5,
    time: "7 years ago",
    likes: 12,
  },
  {
    name: "Chief Biodun Adeleke",
    handle: "@chief_adeleke",
    role: "Bank Executive",
    location: "Ibadan",
    image: "/noface.jfif",
    text: "Our bank branch construction by Bilax was executed flawlessly. The security features and professional design meet all banking standards. Excellent work from start to finish.",
    rating: 5,
    time: "7 years ago",
    likes: 12,
  },
];

export default function TestimonialsPage() {
  const [showCommentModal, setShowCommentModal] = useState(false);
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-sm border border-white/10 bg-slate-950/40 p-6 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-slate-900/60"
              >
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white truncate">{testimonial.name}</h4>
                      <span className="text-xs text-slate-500 truncate">{testimonial.handle}</span>
                    </div>
                    <p className="text-xs text-slate-400">{testimonial.role} • {testimonial.location}</p>
                  </div>
                </div>
                
                <p className="mb-4 text-sm leading-relaxed text-slate-300">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{testimonial.time}</span>
                  <motion.button className="flex items-center gap-1 hover:text-amber-400 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onHoverStart={() => console.log('hover started!')}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {testimonial.likes}
                  </motion.button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              onClick={() => setShowCommentModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log('hover started!')}
              className="cursor-pointer inline-flex items-center gap-2 rounded-sm border border-amber-500/30 bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your Review
            </motion.button>
          </div>
        </div>
      </section>

      {showCommentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm"
          onClick={() => setShowCommentModal(false)}
        >
          <div
            className="max-w-md w-full mx-4 rounded-sm border border-white/10 bg-slate-900 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-xl font-semibold text-white">Add Your Review</h3>
            <p className="mb-6 text-slate-400">
              To leave a review, you must have worked with us on a project. Please contact us if you'd like to share your experience.
            </p>
            <div className="flex gap-4">
              <motion.button
                onClick={() => setShowCommentModal(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer flex-1 rounded-sm border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-100"
              >
                Close
              </motion.button>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer flex-1 rounded-sm border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-100 text-center transition-all hover:border-amber-500/50 hover:bg-amber-500/20"
              >
                Contact Us
              </motion.a>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
