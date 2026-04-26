"use client";

import { useState, useEffect } from "react";

interface ProjectsProps {
  showViewAll?: boolean;
  showPagination?: boolean;
}

export default function Projects({ showViewAll = true, showPagination = true }: ProjectsProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      setProjectsPerPage(window.innerWidth >= 768 ? 12 : 10);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const projects = [
    { title: "Enugu City Tower", description: "Modern office complex in Enugu metropolis", videoId: "dQw4w9WgXcQ" },
    { title: "Owerri Gardens Estate", description: "Luxury apartment community in Owerri", videoId: "jNQXAC9IVRw" },
    { title: "Nnewi Industrial Park", description: "State-of-the-art manufacturing plant in Nnewi", videoId: "9bZkp7q19f0" },
    { title: "Umuahia Central Mall", description: "Retail center with 50+ stores in Umuahia", videoId: "kJQP7kiw5Fk" },
    { title: "Nsukka Medical Center", description: "Modern medical facility in Nsukka", videoId: "RgKAFK5djSk" },
    { title: "Abuja Residential Complex", description: "Luxury residential development in Abuja", videoId: "fJ9rUzIMcZQ" },
    { title: "Lagos Business District", description: "Commercial hub in Lagos Island", videoId: "hT_nvWreIhg" },
    { title: "Port Harcourt Oil Terminal", description: "Industrial facility in Port Harcourt", videoId: "CevxZvSJLk8" },
    { title: "Kano International Airport", description: "Modern airport infrastructure in Kano", videoId: "JGwWNGJdvx8" },
    { title: "Ibadan Shopping Mall", description: "Retail destination in Ibadan", videoId: "OPf0YbXqDm0" },
    { title: "Benin City Bridge", description: "Infrastructure project in Benin City", videoId: "YQHsXMglC9A" },
    { title: "Calabar Deep Sea Port", description: "Maritime infrastructure in Calabar", videoId: "PT2_F-1esPk" },
    { title: "Jos Plateau Resort", description: "Tourism facility in Jos", videoId: "nfWlot6h_JM" },
    { title: "Sokoto Solar Farm", description: "Renewable energy project in Sokoto", videoId: "hLQl3WQQoQ0" },
    { title: "Maiduguri Housing Estate", description: "Residential development in Maiduguri", videoId: "60ItHLz5WEA" },
    { title: "Warri Refinery Expansion", description: "Industrial project in Warri", videoId: "F1MD4z8uO_U" },
    { title: "Aba Textile Factory", description: "Manufacturing facility in Aba", videoId: "M7FIvfx5J10" },
    { title: "Kaduna Railway Station", description: "Transport infrastructure in Kaduna", videoId: "YqeW9_5kURI" },
    { title: "Yola Tech Hub", description: "Technology center in Yola", videoId: "hT_nvWreIhg" },
    { title: "Bauchi Cement Plant", description: "Industrial facility in Bauchi", videoId: "JGwWNGJdvx8" },
    { title: "Makurdi Bridge", description: "Infrastructure project in Makurdi", videoId: "OPf0YbXqDm0" },
    { title: "Akure Shopping Complex", description: "Retail center in Akure", videoId: "YQHsXMglC9A" },
    { title: "Gombe Water Treatment", description: "Infrastructure project in Gombe", videoId: "PT2_F-1esPk" },
    { title: "Jalingo Sports Complex", description: "Sports facility in Jalingo", videoId: "nfWlot6h_JM" },
    { title: "Dutse Government Complex", description: "Government building in Dutse", videoId: "hLQl3WQQoQ0" },
    { title: "Birnin Kebbi Market", description: "Commercial facility in Birnin Kebbi", videoId: "60ItHLz5WEA" },
    { title: "Lokoja Confluence Resort", description: "Tourism project in Lokoja", videoId: "F1MD4z8uO_U" },
    { title: "Osogbo Cultural Center", description: "Cultural facility in Osogbo", videoId: "M7FIvfx5J10" },
    { title: "Ado Ekiti University", description: "Educational facility in Ado Ekiti", videoId: "YqeW9_5kURI" },
    { title: "Ikeja Industrial Park", description: "Industrial zone in Ikeja", videoId: "hT_nvWreIhg" },
    { title: "Asaba River Port", description: "Maritime infrastructure in Asaba", videoId: "JGwWNGJdvx8" },
    { title: "Owerri Digital Hub", description: "Technology center in Owerri", videoId: "OPf0YbXqDm0" },
    { title: "Enugu Coal Plant", description: "Energy facility in Enugu", videoId: "YQHsXMglC9A" },
    { title: "Calabar Airport", description: "Aviation infrastructure in Calabar", videoId: "PT2_F-1esPk" },
    { title: "Uyo Stadium", description: "Sports facility in Uyo", videoId: "nfWlot6h_JM" },
    { title: "Port Harcourt Mall", description: "Retail center in Port Harcourt", videoId: "hLQl3WQQoQ0" },
    { title: "Kano Industrial Zone", description: "Manufacturing hub in Kano", videoId: "60ItHLz5WEA" },
    { title: "Ilorin Power Station", description: "Energy project in Ilorin", videoId: "F1MD4z8uO_U" },
    { title: "Sokoto Irrigation Scheme", description: "Agricultural project in Sokoto", videoId: "M7FIvfx5J10" },
    { title: "Maiduguri Hospital", description: "Healthcare facility in Maiduguri", videoId: "YqeW9_5kURI" },
    { title: "Warri Shopping Mall", description: "Retail center in Warri", videoId: "hT_nvWreIhg" },
    { title: "Aba Market Complex", description: "Commercial facility in Aba", videoId: "JGwWNGJdvx8" },
    { title: "Kaduna Industrial Estate", description: "Industrial zone in Kaduna", videoId: "OPf0YbXqDm0" },
    { title: "Yola Agricultural Hub", description: "Agribusiness center in Yola", videoId: "YQHsXMglC9A" },
    { title: "Bauchi Tourist Resort", description: "Tourism facility in Bauchi", videoId: "PT2_F-1esPk" },
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  return (
    <section id="projects" className="bg-gradient-to-b from-slate-950/95 to-slate-900/90 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center md:mb-16">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
              Our Work
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
          </div>
          <h2 className="mb-6 text-3xl font-light tracking-tight text-white uppercase md:text-5xl">
            <span className="font-semibold">Projects</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-xl">
            Explore our portfolio of successful construction projects that with the aesthetic
          </p>
        </div>

        {showPagination && totalPages > 1 && (
          <div className="mb-8 flex items-center justify-center gap-1 md:gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 ? true : false}
              className="px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2.5 md:px-4 md:py-3 rounded-sm border text-xs md:text-sm transition-all ${
                  currentPage === page
                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-400'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages ? true : false}
              className="px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        <div className="grid gap-6 grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {currentProjects.map((project, index) => {
            const [city, ...rest] = project.title.split(' ');
            const restOfTitle = rest.join(' ');
            return (
              <div key={index} className="group">
                <div className="relative mb-4 mx-auto w-11/12 overflow-hidden rounded-sm border border-white/10 bg-slate-900 cursor-pointer" onClick={() => setSelectedVideo(`https://www.youtube.com/embed/${project.videoId}`)}>
                  <img
                    src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                    alt={project.title}
                    className="h-24 w-full object-cover md:h-32"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="mb-0 pl-4 text-base font-light tracking-tight text-white uppercase md:text-lg cursor-pointer hover:text-amber-400 transition-colors" onClick={() => setSelectedVideo(`https://www.youtube.com/embed/${project.videoId}`)}>{city} <span className="font-semibold">{restOfTitle}</span></h3>
                <div className="mb-8 mx-auto w-full rounded-b-sm border-2 border-amber-300 border-t-0 p-4 cursor-pointer" style={{ borderLeft: '0.5px solid #373f51', borderRight: '0.5px solid #373f51', borderBottom: '0.5px solid #373f51', borderTop: 'none' }} onClick={() => setSelectedVideo(`https://www.youtube.com/embed/${project.videoId}`)}>
                  <p className="text-xs text-slate-400 md:text-sm">{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {showPagination && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-1 md:gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 ? true : false}
              className="px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2.5 md:px-4 md:py-3 rounded-sm border text-xs md:text-sm transition-all ${
                  currentPage === page
                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-400'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages ? true : false}
              className="px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {showViewAll && (
          <div className="mt-12 text-center md:mt-16">
            <a href="/projects" className="cursor-pointer rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-11 md:text-base inline-block">
              View All Projects
            </a>
          </div>
        )}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-6xl p-4">
            <button
              className="absolute -top-12 right-4 cursor-pointer text-slate-400 transition-colors hover:text-white"
              onClick={() => setSelectedVideo(null)}
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={selectedVideo}
              title="Project Video"
              className="aspect-video w-full rounded-sm"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
