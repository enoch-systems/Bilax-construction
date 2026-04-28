"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface FormProps {
  onClose?: () => void;
}

export default function Form({ onClose }: FormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const projectTypes = [
    "Building Construction",
    "Civil Engineering",
    "Renovation & Finishing",
    "Project Management",
    "Maintenance",
    "Interior Decoration",
  ];

  const budgetRanges = [
    "Under ₦5,000,000",
    "₦5,000,000 - ₦10,000,000",
    "₦10,000,000 - ₦25,000,000",
    "₦25,000,000 - ₦50,000,000",
    "₦50,000,000 - ₦100,000,000",
    "Over ₦100,000,000",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        
        // Reset form and route to home after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            projectType: "",
            budget: "",
            message: "",
          });
          setSubmitStatus("idle");
          onClose?.();
          router.push('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full mx-auto">
      {onClose && (
        <motion.button
          onClick={() => {
            onClose();
            router.push('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer absolute top-2 left-2 text-slate-400 hover:text-white transition-all duration-300 z-10 bg-slate-800/60 p-2.5 rounded-full backdrop-blur-md border border-slate-700/50"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}

      <div className="pt-16 md:pt-20 mb-8 md:mb-10">
        <div className="text-center mb-8">
          <h2 className="mb-3 text-2xl font-light tracking-wide text-white uppercase md:text-3xl lg:text-4xl">
            Start Your <span className="font-semibold text-amber-400">Project</span>
          </h2>
          <p className="text-xs leading-relaxed text-slate-500 max-w-md mx-auto font-normal">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-400 transition-all duration-300 focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-400 transition-all duration-300 focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-400 transition-all duration-300 focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base"
            placeholder="e.g 08036719928"
          />
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="projectType" className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              Project Type <span className="text-red-400">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              className={`w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3 transition-all duration-300 focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base ${!formData.projectType ? 'text-slate-500' : 'text-white'}`}
            >
              <option value="">Select a service</option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-slate-800 text-white">
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="budget" className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              Estimated Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3 transition-all duration-300 focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base ${!formData.budget ? 'text-slate-500' : 'text-white'}`}
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range} className="bg-slate-800 text-white">
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
            Project Details <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-400 transition-all duration-300 focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none text-sm md:text-base"
            placeholder="Enter your project details, timeline, and requirements..."
          />
        </div>

        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4 text-green-400 text-sm md:text-base backdrop-blur-sm"
          >
            Thank you! Your inquiry has been submitted successfully. We'll contact you soon.
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-400 text-sm md:text-base backdrop-blur-sm"
          >
            Something went wrong. Please try again or call us directly.
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-amber-600/10 px-8 py-4 text-sm font-semibold tracking-wide text-amber-100 transition-all duration-300 hover:border-amber-500/60 hover:from-amber-500/20 hover:to-amber-600/20 focus:outline-none focus:ring-2 focus:ring-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed md:text-base shadow-lg shadow-amber-500/10"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Inquiry"
          )}
        </motion.button>
      </form>
    </div>
  );
}
