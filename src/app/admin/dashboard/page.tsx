"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Upload, Image as ImageIcon, Video, Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import ImageSkeleton from "@/components/ImageSkeleton";

const Header = dynamic(() => import("@/components/Header"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | "projects">("gallery");
  const router = useRouter();

  useEffect(() => {
    console.log('Dashboard useEffect triggered');
    console.log('Supabase client:', supabase);
    
    if (!supabase) {
      console.log('No supabase client, redirecting to login');
      router.push("/admin/login");
      return;
    }
  
    const checkAuth = async () => {
      console.log('Checking auth...');
      try {
        const { data: { session }, error } = await supabase!.auth.getSession();
        
        console.log('Session data:', session);
        console.log('Session error:', error);
        
        if (error) {
          console.error('Auth session error:', error);
          // Handle refresh token errors specifically
          if (error.message?.includes('Refresh Token Not Found') || 
              error.message?.includes('Invalid Refresh Token')) {
            // Clear any stored session and redirect to login
            await supabase!.auth.signOut();
            router.push("/admin/login");
            return;
          }
          router.push("/admin/login");
          return;
        }
        
        if (!session) {
          console.log('No session found, redirecting to login');
          router.push("/admin/login");
        } else {
          console.log('Session found, setting authenticated to true');
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push("/admin/login");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase!.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session ? 'session exists' : 'no session');
      console.log('Session details:', session);
      
      if (event === 'TOKEN_REFRESHED' && session) {
        // Token was successfully refreshed
        console.log('Token refreshed, setting authenticated to true');
        setIsAuthenticated(true);
        return;
      }
      
      if (event === 'SIGNED_OUT' || !session) {
        console.log('Signed out or no session, setting authenticated to false');
        setIsAuthenticated(false);
        router.push("/admin/login");
      } else if (session) {
        console.log('Session exists, setting authenticated to true');
        setIsAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);


  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="bg-slate-950 text-white min-h-screen">
      <Header />
      <section className="relative pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent" />
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/90">
                  Admin Panel
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-amber-500/50 to-transparent" />
              </div>
              <h1 className="text-4xl font-light tracking-tight text-white uppercase md:text-5xl">
                <span className="font-semibold">Dashboard</span>
              </h1>
            </div>
          </div>

          <div className="mb-8 flex gap-4 border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border transition-all ${
                activeTab === "gallery"
                  ? "border-amber-500/50 bg-amber-500/20 text-amber-400"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery Images
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border transition-all ${
                activeTab === "projects"
                  ? "border-amber-500/50 bg-amber-500/20 text-amber-400"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <Video className="w-4 h-4" />
              Projects
            </button>
          </div>

          {activeTab === "gallery" && <GalleryUploadForm />}
          {activeTab === "projects" && <ProjectUploadForm />}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function GalleryUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(12);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setGalleryImages(data);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setImagesPerPage(window.innerWidth >= 768 ? 20 : 14);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = galleryImages.length > 0 ? Math.ceil(galleryImages.length / imagesPerPage) : 0;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage);

  // Calculate page numbers to show (max 3)
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 3;
    
    if (totalPages <= maxPages) {
      // Show all pages if total is less than or equal to max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show 3 pages centered around current page
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, startPage + 2);
      
      // Adjust if we're at the start
      if (endPage - startPage < 2) {
        endPage = Math.min(totalPages, startPage + 2);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handleDeleteImage = async (imageSrc: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ src: imageSrc }),
      });

      if (response.ok) {
        setGalleryImages(galleryImages.filter(img => img.src !== imageSrc));
        setMessage('Image deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to delete image');
      }
    } catch (error) {
      setMessage('Failed to delete image. Please try again.');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", "Gallery Image");
    formData.append("category", "Gallery");

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Image uploaded successfully!");
        // Refresh gallery images
        const fetchResponse = await fetch('/api/gallery');
        const data = await fetchResponse.json();
        setGalleryImages(data);
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleEditImage = (image: any) => {
    setEditingImage(image);
    setShowEditModal(true);
  };

  const handleUpdateImage = async (title: string, category: string) => {
    if (!editingImage || !title || !category) return;

    setIsUploading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          src: editingImage.src,
          title,
          category
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Image updated successfully!");
        setShowEditModal(false);
        setEditingImage(null);
        // Refresh gallery images
        const fetchResponse = await fetch('/api/gallery');
        const data = await fetchResponse.json();
        setGalleryImages(data);
      } else {
        setMessage(data.error || "Update failed");
      }
    } catch (error) {
      setMessage("Update failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {message && (
        <div className={`mb-6 p-4 rounded-sm border ${message.includes("success") ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
          {message}
        </div>
      )}

      {/* Pagination Controls - Above */}
      {totalPages > 1 && (
        <div className="mb-6 flex items-center justify-center gap-2 md:gap-3">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border text-sm md:text-base transition-all ${
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
            disabled={currentPage === totalPages}
            className="cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {/* Upload Card */}
        <div className="group relative overflow-hidden rounded-sm border border-dashed border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 transition-all">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="upload-card"
            capture="environment"
            disabled={isUploading}
          />
          <label
            htmlFor="upload-card"
            className={`flex flex-col items-center justify-center h-full w-full aspect-square cursor-pointer p-4 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin mb-2 h-8 w-8 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xs font-medium text-amber-100 text-center">Uploading...</span>
              </>
            ) : (
              <>
                <Plus className="mb-2 h-8 w-8 text-amber-400" />
                <span className="text-xs font-medium text-amber-100 text-center">Add Image</span>
                <span className="text-xs text-amber-200/70 mt-1">Camera or Gallery</span>
              </>
            )}
          </label>
        </div>

        {/* Gallery Images */}
        {isLoading ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <ImageSkeleton key={i} />
            ))}
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400">No images in gallery yet.</p>
          </div>
        ) : (
          currentImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-sm border border-white/10 bg-slate-950/40 backdrop-blur-sm"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Dark Black Overlay */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                
                {/* Edit Button - Always visible at center */}
                <button
                  onClick={() => handleEditImage(image)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-black/50 border border-black/70 text-white rounded hover:bg-black/70 transition-all flex items-center gap-1 cursor-pointer"
                  title="Edit image"
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-xs">edit</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls - Below */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 md:gap-3">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border text-sm md:text-base transition-all ${
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
            disabled={currentPage === totalPages}
            className="cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingImage && (
        <ImageEditModal
          image={editingImage}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingImage(null);
          }}
          onUpdate={handleUpdateImage}
          isUploading={isUploading}
          onDeleteImage={handleDeleteImage}
        />
      )}
    </div>
  );
}

function ImageEditModal({ image, isOpen, onClose, onUpdate, isUploading, onDeleteImage }: {
  image: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (title: string, category: string) => void;
  isUploading: boolean;
  onDeleteImage: (imageSrc: string) => void;
}) {
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(image.src);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    onDeleteImage(image.src);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImage) {
      // Handle image replacement
      // This would need a new API endpoint for image replacement
      console.log('Replace image:', newImage);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4" onClick={handleBackdropClick}>
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-white hover:text-amber-400 transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Image Preview - Clickable with icon overlay */}
        <div className="mb-6 flex justify-center">
          <div className="relative group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="change-photo"
            />
            <label htmlFor="change-photo" className="cursor-pointer">
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-600/50 shadow-lg w-64 h-80">
                <Image 
                  src={preview} 
                  alt="Preview" 
                  fill
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-100 flex items-center justify-center">
                  <Upload className="w-12 h-12 text-white" />
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <button
            type="submit"
            disabled={isUploading}
            className="w-full rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-6 py-2.5 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={handleDeleteImage}
            className="w-full px-6 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-semibold hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
          >
            Delete Image
          </button>
        </form>

        {/* Delete Warning Modal */}
        {showDeleteWarning && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-2xl flex items-center justify-center p-6" onClick={(e) => e.stopPropagation()}>
            <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 max-w-sm w-full text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Delete Image?</h4>
              <p className="text-slate-400 mb-6">Are you sure you want to delete this image? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteWarning(false)}
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [errors, setErrors] = useState({ title: "", description: "", videoId: "" });

  // Function to extract YouTube video ID from various URL formats
  const extractYouTubeId = (input: string): string => {
    if (!input) return "";
    
    // If it's already just an ID (no special characters), return as is
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }
    
    // Try to extract ID from various URL formats
    const patterns = [
      /(?:youtube\.com\/shorts\/([a-zA-Z0-9_-]{11}))/,
      /(?:youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11}))/,
      /(?:youtube\.com\/embed\/([a-zA-Z0-9_-]{11}))/,
      /(?:youtu\.be\/([a-zA-Z0-9_-]{11}))/,
      /(?:youtube\.com\/v\/([a-zA-Z0-9_-]{11}))/,
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    // If no match, return the original input
    return input;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 12 : 10);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = projects.length > 0 ? Math.ceil(projects.length / itemsPerPage) : 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 3;
    
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, startPage + 2);
      
      if (endPage - startPage < 2) {
        endPage = Math.min(totalPages, startPage + 2);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handleDeleteProject = async (projectTitle: string) => {
    setShowDeleteWarning(true);
  };

  const confirmDelete = async () => {
    if (!editingProject) return;

    try {
      const response = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId: editingProject.videoId }),
      });

      if (response.ok) {
        // Refresh projects
        const fetchResponse = await fetch('/api/projects');
        const data = await fetchResponse.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setShowDeleteWarning(false);
      setShowEditModal(false);
    }
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors = {
      title: !title ? "Title is required" : "",
      description: !description ? "Description is required" : "",
      videoId: !videoId ? "Video ID is required" : ""
    };
    
    setErrors(newErrors);
    
    if (newErrors.title || newErrors.description || newErrors.videoId) {
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, videoId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Project added successfully!");
        setTitle("");
        setDescription("");
        setVideoId("");
        setShowAddModal(false);
        // Refresh projects list
        const fetchResponse = await fetch('/api/projects');
        const data = await fetchResponse.json();
        setProjects(data);
      } else {
        setMessage(data.error || "Failed to add project");
      }
    } catch (error) {
      setMessage("Failed to add project. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {message && (
        <div className={`mb-6 p-4 rounded-sm border ${message.includes("success") ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
          {message}
        </div>
      )}

      {/* Add Project Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-8 flex items-center justify-center gap-2 rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed md:text-base"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>

      {/* Pagination Controls - Above */}
      {totalPages > 1 && (
        <div className="mb-6 flex items-center justify-center gap-2 md:gap-3">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border text-sm md:text-base transition-all ${
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
            disabled={currentPage === totalPages}
            className="cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ImageSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400">No projects yet.</p>
          </div>
        ) : (
          currentProjects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-sm border border-white/10 bg-slate-950/40 backdrop-blur-sm"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Edit Button */}
                <button
                  onClick={() => handleEditProject(project)}
                  className="absolute top-2 right-2 p-2 bg-black/50 border border-black/70 text-white rounded hover:bg-black/70 transition-all cursor-pointer"
                  title="Edit project"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls - Below */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 md:gap-3">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border text-sm md:text-base transition-all ${
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
            disabled={currentPage === totalPages}
            className="cursor-pointer px-4 py-3 md:px-6 md:py-4 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingProject && (
        <ProjectEditModal
          project={editingProject}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingProject(null);
          }}
          onDelete={() => {
            setShowDeleteWarning(true);
          }}
        />
      )}

      {/* Delete Warning Modal */}
      {showDeleteWarning && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Delete Project?</h4>
            <p className="text-slate-400 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteWarning(false)}
                className="flex-1 px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white hover:text-amber-400 transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <h3 className="text-xl font-semibold text-white mb-6">Add Project</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="project-title" className="block text-sm font-medium text-slate-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  id="project-title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors(prev => ({ ...prev, title: "" }));
                  }}
                  className={`w-full rounded-sm border px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 resize-none ${errors.title ? "border-red-500/50 bg-red-500/10 focus:border-red-500/50 focus:ring-red-500/50" : "border-slate-700 bg-slate-800/50 focus:border-amber-500/50 focus:ring-amber-500/50"}`}
                  placeholder="Enugu City Tower"
                />
                {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors(prev => ({ ...prev, description: "" }));
                  }}
                  rows={4}
                  className={`w-full rounded-sm border px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 resize-none ${errors.description ? "border-red-500/50 bg-red-500/10 focus:border-red-500/50 focus:ring-red-500/50" : "border-slate-700 bg-slate-800/50 focus:border-amber-500/50 focus:ring-amber-500/50"}`}
                  placeholder="Modern office complex in Enugu metropolis"
                />
                {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="videoId" className="block text-sm font-medium text-slate-300 mb-2">
                  YouTube Video URL or ID
                </label>
                <input
                  type="text"
                  id="videoId"
                  value={videoId}
                  onChange={(e) => {
                    const extractedId = extractYouTubeId(e.target.value);
                    setVideoId(extractedId);
                    setErrors(prev => ({ ...prev, videoId: "" }));
                  }}
                  className={`w-full rounded-sm border px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 resize-none ${errors.videoId ? "border-red-500/50 bg-red-500/10 focus:border-red-500/50 focus:ring-red-500/50" : "border-slate-700 bg-slate-800/50 focus:border-amber-500/50 focus:ring-amber-500/50"}`}
                  placeholder="https://www.youtube.com/shorts/cXu5UOszOyU or cXu5UOszOyU"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Paste any YouTube URL (shorts, watch, embed, youtu.be) and the ID will be auto-extracted
                </p>
                {errors.videoId && <p className="mt-1 text-xs text-red-400">{errors.videoId}</p>}
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed md:text-base"
              >
                <Plus className="w-4 h-4" />
                {isUploading ? "Adding..." : "Add Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectEditModal({ project, isOpen, onClose, onDelete }: {
  project: any;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [videoId, setVideoId] = useState(project.videoId);
  const [isUploading, setIsUploading] = useState(false);

  // Function to extract YouTube video ID from various URL formats
  const extractYouTubeId = (input: string): string => {
    if (!input) return "";
    
    // If it's already just an ID (no special characters), return as is
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }
    
    // Try to extract ID from various URL formats
    const patterns = [
      /(?:youtube\.com\/shorts\/([a-zA-Z0-9_-]{11}))/,
      /(?:youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11}))/,
      /(?:youtube\.com\/embed\/([a-zA-Z0-9_-]{11}))/,
      /(?:youtu\.be\/([a-zA-Z0-9_-]{11}))/,
      /(?:youtube\.com\/v\/([a-zA-Z0-9_-]{11}))/,
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    // If no match, return the original input
    return input;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const response = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          videoId: project.videoId,
          title,
          description,
        }),
      });

      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-white hover:text-amber-400 transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h3 className="text-xl font-semibold text-white mb-6">Edit Project</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-sm border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-sm border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              YouTube Video URL or ID
            </label>
            <input
              type="text"
              value={videoId}
              onChange={(e) => setVideoId(extractYouTubeId(e.target.value))}
              className="w-full rounded-sm border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="https://www.youtube.com/shorts/cXu5UOszOyU or cXu5UOszOyU"
            />
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-6 py-2.5 text-sm font-medium text-amber-100 transition-all duration-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="w-full px-6 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-semibold hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
            >
              Delete Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
