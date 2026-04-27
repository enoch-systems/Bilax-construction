"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface HeaderProps {
  onMenuOpenChange?: (open: boolean) => void;
}

export default function Header({ onMenuOpenChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [cameFromAdmin, setCameFromAdmin] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };

    if (isOpen || isAccountDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isAccountDropdownOpen]);

  useEffect(() => {
    onMenuOpenChange?.(isOpen);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onMenuOpenChange]);

  useEffect(() => {
    if (!supabase) {
      setIsAdmin(false);
      return;
    }

    const checkAdminAuth = async () => {
      const { data: { session } } = await supabase!.auth.getSession();
      setIsAdmin(!!session);
    };

    checkAdminAuth();

    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      const isAdminUser = !!session;
      setIsAdmin(isAdminUser);
      
      // When admin logs out, ensure all states are reset
      if (!isAdminUser) {
        setCameFromAdmin(false);
        localStorage.removeItem('cameFromAdmin');
        setIsAccountDropdownOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Check if we came from admin pages
    const referrer = document.referrer;
    if (referrer && referrer.includes('/admin') && !isAdminPage && isAdmin) {
      setCameFromAdmin(true);
    }
    
    // Also check localStorage for persistent tracking
    const cameFromAdminStorage = localStorage.getItem('cameFromAdmin');
    if (cameFromAdminStorage === 'true' && !isAdminPage && isAdmin) {
      setCameFromAdmin(true);
    }
    
    // Reset when going back to admin pages
    if (isAdminPage) {
      setCameFromAdmin(false);
      localStorage.removeItem('cameFromAdmin');
    }
  }, [pathname, isAdmin, isAdminPage]);

  // Store the cameFromAdmin state when navigating from admin to user mode
  useEffect(() => {
    if (cameFromAdmin && !isAdminPage) {
      localStorage.setItem('cameFromAdmin', 'true');
    }
  }, [cameFromAdmin, isAdminPage]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-white/5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex flex-col cursor-pointer group">
          <img src="/logo.png" alt="Bilax Constructions logo" className="h-10 w-12 mb-1 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-sm font-medium tracking-wide">
            <span className="text-amber-400/90 group-hover:text-amber-400 transition-colors">Bilax</span>{" "}
            <span className="text-slate-200 group-hover:text-white transition-colors">Constructions</span>
          </span>
        </a>
      
        <nav className="hidden items-center gap-1 md:flex">
          {!isAdminPage ? (
            <>
              <Link href="/" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Home
                {pathname === "/" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/about" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/about" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                About
                {pathname === "/about" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/services" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/services" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Services
                {pathname === "/services" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/projects" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/projects" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Projects
                {pathname === "/projects" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/gallery" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/gallery" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Gallery
                {pathname === "/gallery" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/ourteam" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/ourteam" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Our Team
                {pathname === "/ourteam" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              <Link href="/testimonials" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/testimonials" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                Testimonials
                {pathname === "/testimonials" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
              </Link>
              {!isAdmin && (
                <Link href="/contact" className={`relative px-4 py-2 text-xs font-semibold transition-all duration-500 ${pathname === "/contact" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                  Contact
                  {pathname === "/contact" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                </Link>
              )}
            </>
          ) : (
            <button
              onClick={() => {
                setCameFromAdmin(true);
                localStorage.setItem('cameFromAdmin', 'true');
                router.push("/");
              }}
              className="px-4 py-2 text-xs font-semibold transition-all duration-500 rounded-sm border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/20 hover:text-white cursor-pointer"
            >
              View in User Mode
            </button>
          )}
        </nav>

        {isAdmin && !isAdminPage ? (
          <motion.div
            ref={accountDropdownRef}
            className="hidden md:flex relative"
          >
            <motion.button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-6 py-2.5 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              View as Admin
            </motion.button>
            {isAccountDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 rounded-sm border border-slate-700 bg-slate-800/95 backdrop-blur-sm shadow-xl z-50"
              >
                <Link
                  href="/admin/dashboard"
                  target="_blank"
                  onClick={() => setIsAccountDropdownOpen(false)}
                  className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    try {
                      console.log("Desktop logout button clicked");
                      if (supabase) {
                        console.log("Signing out from Supabase...");
                        const { error } = await supabase.auth.signOut();
                        if (error) {
                          console.error("Supabase sign out error:", error);
                        } else {
                          console.log("Successfully signed out");
                        }
                      } else {
                        console.log("Supabase not available");
                      }
                      setIsAccountDropdownOpen(false);
                      setCameFromAdmin(false);
                      localStorage.removeItem('cameFromAdmin');
                      console.log("Redirecting to home...");
                      router.push("/");
                    } catch (err) {
                      console.error("Logout error:", err);
                    }
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors border-t border-slate-700"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : isAdmin && isAdminPage ? (
          <div ref={accountDropdownRef} className="hidden md:flex relative">
            <motion.button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-6 py-2.5 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              My Account
            </motion.button>
            {isAccountDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 rounded-sm border border-slate-700 bg-slate-800/95 backdrop-blur-sm shadow-xl z-50"
              >
                <Link
                  href="/admin/dashboard"
                  target="_blank"
                  onClick={() => setIsAccountDropdownOpen(false)}
                  className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    if (supabase) {
                      await supabase.auth.signOut();
                    }
                    setIsAccountDropdownOpen(false);
                    setCameFromAdmin(false);
                    localStorage.removeItem('cameFromAdmin');
                    router.push("/");
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors border-t border-slate-700"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : cameFromAdmin && isAdmin ? (
          <motion.button
            onClick={() => router.push("/admin/dashboard")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer hidden rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-6 py-2.5 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 md:block"
          >
            View as Admin
          </motion.button>
        ) : (
          <motion.a
            href="https://wa.me/2349162919586?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20consultation%20for%20my%20construction%20project."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer hidden rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-6 py-2.5 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 md:block"
          >
            Free Consultation
          </motion.a>
        )}

        <motion.button
          className="cursor-pointer rounded-sm border border-white/20 p-2 text-slate-300 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
              <span className="text-sm font-medium tracking-wide">
                <span className="text-amber-400/90">Bilax</span>{" "}
                <span className="text-slate-200">Constructions</span>
              </span>
              <motion.button
                className="cursor-pointer p-2 text-slate-400 transition-all duration-300 hover:text-white"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                    >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pt-8">
              {!isAdminPage ? (
                <>
                  <Link href="/" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                    Home
                    {pathname === "/" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                  </Link>
                  <Link href="/about" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/about" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                    About
                    {pathname === "/about" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                  </Link>
                  <Link href="/services" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/services" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                    Services
                    {pathname === "/services" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                  </Link>
                  <Link href="/projects" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/projects" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                    Projects
                    {pathname === "/projects" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                  </Link>
                  <Link href="/gallery" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/gallery" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                    Gallery
                    {pathname === "/gallery" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                  </Link>
                  <Link href="/ourteam" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/ourteam" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                    Our Team
                    {pathname === "/ourteam" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                  </Link>
                  <Link href="/testimonials" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/testimonials" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                    Testimonials
                    {pathname === "/testimonials" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                  </Link>
                  {!isAdmin && (
                    <Link href="/contact" onClick={() => setIsOpen(false)} className={`relative px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 ${pathname === "/contact" ? "text-amber-400" : "text-slate-400 hover:text-white"}`}>
                      Contact
                      {pathname === "/contact" && <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
                    </Link>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setCameFromAdmin(true);
                    localStorage.setItem('cameFromAdmin', 'true');
                    router.push("/");
                  }}
                  className="px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-500 rounded-sm border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/20 hover:text-white cursor-pointer"
                >
                  View in User Mode
                </button>
              )}
            </nav>

            <div className="px-6 py-8 border-t border-white/5">
              {isAdmin && !isAdminPage ? (
                <div className="space-y-3">
                  <motion.button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/admin/dashboard");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer block w-full rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-8 py-4 text-center text-base font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    View as Admin
                  </motion.button>
                </div>
              ) : isAdmin && isAdminPage ? (
                <div className="space-y-3">
                  <motion.button
                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer block w-full rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-8 py-4 text-center text-base font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    My Account
                  </motion.button>
                  {isAccountDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-sm border border-slate-700 bg-slate-800/95 backdrop-blur-sm shadow-xl overflow-hidden"
                    >
                      <Link
                        href="/admin/dashboard"
                        target="_blank"
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={async () => {
                          try {
                            console.log("Mobile logout button clicked");
                            if (supabase) {
                              console.log("Signing out from Supabase...");
                              const { error } = await supabase.auth.signOut();
                              if (error) {
                                console.error("Supabase sign out error:", error);
                              } else {
                                console.log("Successfully signed out");
                              }
                            } else {
                              console.log("Supabase not available");
                            }
                            setIsAccountDropdownOpen(false);
                            setIsOpen(false);
                            setCameFromAdmin(false);
                            localStorage.removeItem('cameFromAdmin');
                            console.log("Redirecting to home...");
                            router.push("/");
                          } catch (err) {
                            console.error("Mobile logout error:", err);
                          }
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors border-t border-slate-700"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : cameFromAdmin && isAdmin ? (
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/admin/dashboard");
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer block w-full rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-8 py-4 text-center text-base font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  View as Admin
                </motion.button>
              ) : (
                <motion.a
                  href="https://wa.me/2349162919586?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20consultation%20for%20my%20construction%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer block w-full rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-8 py-4 text-center text-base font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  Free Consultation
                </motion.a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
