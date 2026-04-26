"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    name: "Chinedu Okafor",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "With over 20 years of experience in the construction industry, Chinedu founded Bilax Constructions with a vision to transform Nigeria's construction landscape.",
  },
  {
    name: "Adaeze Nwosu",
    role: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Adaeze oversees all project operations, ensuring timely delivery and quality control across all our construction sites.",
  },
  {
    name: "Emeka Okonkwo",
    role: "Lead Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Emeka brings creative vision and technical expertise to every project, designing structures that are both beautiful and functional.",
  },
  {
    name: "Ngozi Eze",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Ngozi coordinates our project teams, managing resources and timelines to ensure successful project completion.",
  },
  {
    name: "Ifeanyi Obi",
    role: "Civil Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Ifeanyi leads our engineering team, ensuring structural integrity and compliance with all building regulations.",
  },
  {
    name: "Chioma Adebayo",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Chioma transforms interior spaces with her creative designs, creating environments that inspire and comfort.",
  },
];

export default function OurTeamPage() {
  return (
    <main className="bg-slate-950 text-white">
      <Header />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
              Our Team
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
          <h1 className="mb-6 text-center text-4xl font-light tracking-tight text-white uppercase md:text-6xl lg:text-7xl">
            Meet The <span className="font-semibold">Experts</span>
          </h1>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-400 md:text-lg">
            Our team of experienced professionals is dedicated to delivering exceptional construction services across Nigeria.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-sm border border-white/10 bg-slate-950/40 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-slate-900/60"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-light tracking-tight text-white uppercase md:text-2xl">
                    {member.name}
                  </h3>
                  <p className="mb-4 text-sm font-medium text-amber-400/90">{member.role}</p>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {member.bio}
                  </p>
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
