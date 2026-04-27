"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AboutUs from "@/components/AboutUs";

export default function AboutPage() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <main className="bg-slate-950 text-white">
      <Header />
      <div className="pt-20">
        <AboutUs showButton={false} showFullText={true} />
      </div>
      
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
