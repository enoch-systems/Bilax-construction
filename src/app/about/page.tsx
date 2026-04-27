"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AboutUs from "@/components/AboutUs";

const storyBlocks = [
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    title: "Our Beginning",
    text: "Founded in 2010, Bilax Constructions was established with a simple yet powerful vision: to transform Nigeria's construction landscape through quality, integrity, and innovation. What started as a small family business has grown into a trusted industry leader over 14+ years, built on the foundation of delivering exceptional results for every client. Our journey from humble beginnings to becoming a preferred construction partner speaks to our unwavering commitment to excellence.",
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    title: "Growth & Expansion",
    text: "Over the past 14+ years, we have expanded our capabilities and expertise, taking on increasingly complex projects across residential, commercial, and industrial sectors. With 500+ satisfied clients and 150+ completed projects, our growth has been driven by our commitment to excellence and the trust we've earned from clients who return to us time and again. From small renovations to large-scale developments, our expertise spans the full spectrum of construction services.",
  },
  {
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    title: "Our Philosophy",
    text: "At Bilax Constructions, we believe that every structure we build should stand as a testament to quality craftsmanship. With COREN registration, ISO certifications, and membership in prestigious industry bodies like NIA and NIOB, we combine traditional building methods with modern techniques to create spaces that are not only functional but also inspiring. Our team of skilled professionals brings passion and precision to every project, ensuring results that exceed expectations.",
  },
  {
    image: "https://images.unsplash.com/photo-1576523939626-419037e4819c?w=800&q=80",
    title: "Looking Forward",
    text: "As we continue to grow, our commitment to excellence remains unwavering. We are constantly exploring new technologies and sustainable practices to deliver better results for our clients. With a 98% client satisfaction rate and a proven track record of success, the future of construction is exciting, and Bilax Constructions is proud to be at the forefront of building Nigeria's tomorrow. We invite you to be part of our continued journey of excellence.",
  },
];

export default function AboutPage() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <main className="bg-slate-950 text-white">
      <Header />
      <div className="pt-20">
        <AboutUs showButton={false} showFullText={true} />
      </div>
      
      <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {storyBlocks.map((block, index) => (
            <div
              key={index}
              className={`mb-20 grid gap-8 md:gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <img
                  src={block.image}
                  alt={block.title}
                  className={`w-full rounded-sm object-cover ${
                    index === 0 ? "-mt-20 h-80 md:h-96 lg:h-[500px]" : "h-64 md:h-80 lg:h-96"
                  }`}
                />
              </div>
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="mb-4 text-2xl font-light tracking-tight text-white uppercase md:text-3xl">
                  {block.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-400 md:text-lg">
                  {block.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
