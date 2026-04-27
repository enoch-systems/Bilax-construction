"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  videoId: string;
}

interface ProjectsProps {
  showViewAll?: boolean;
  showPagination?: boolean;
}

export default function Projects({ showViewAll = true, showPagination = true }: ProjectsProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(10);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  const totalPages = projects.length > 0 ? Math.ceil(projects.length / projectsPerPage) : 0;
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

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-slate-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400">No projects yet.</p>
          </div>
        ) : (
          <>
            {showPagination && totalPages > 1 && (
          <div className="mb-8 flex items-center justify-center gap-1 md:gap-2">
            <motion.button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 ? true : false}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => setCurrentPage(page)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border text-xs md:text-sm transition-all ${
                  currentPage === page
                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-400'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {page}
              </motion.button>
            ))}
            <motion.button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages ? true : false}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
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
            <motion.button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 ? true : false}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => setCurrentPage(page)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border text-xs md:text-sm transition-all ${
                  currentPage === page
                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-400'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {page}
              </motion.button>
            ))}
            <motion.button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages ? true : false}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-3 py-2.5 md:px-4 md:py-3 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}

        {showViewAll && (
          <div className="mt-12 text-center md:mt-16">
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 md:px-11 md:text-base inline-block"
            >
              View All Projects
            </motion.a>
          </div>
        )}
          </>
        )}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-6xl p-4">
            <motion.button
              className="absolute -top-12 right-4 cursor-pointer text-slate-400 transition-colors hover:text-white"
              onClick={() => setSelectedVideo(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
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
