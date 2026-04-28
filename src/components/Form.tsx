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
        
        // Reset form after successful submission
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
          className="cursor-pointer absolute top-2 left-2 md:top-4 md:left-4 text-slate-400 hover:text-white transition-colors z-10 bg-slate-800/50 p-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}

      <div className="pt-12 md:pt-16 mb-6 md:mb-8">
        <h2 className="mb-3 md:mb-4 text-2xl font-light tracking-wide text-white uppercase md:text-3xl lg:text-4xl">
          Start Your <span className="font-semibold text-amber-400">Project</span>
        </h2>
        <p className="text-sm leading-relaxed text-slate-300 md:text-base">
          Tell us about your project and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="grid gap-5 md:gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold tracking-wide text-slate-200 md:text-base">
              Full Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold tracking-wide text-slate-200 md:text-base">
              Email Address <span className="text-amber-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold tracking-wide text-slate-200 md:text-base">
            Phone Number <span className="text-amber-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="grid gap-5 md:gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="projectType" className="mb-2 block text-sm font-semibold tracking-wide text-slate-200 md:text-base">
              Project Type <span className="text-amber-400">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white transition-all focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base"
            >
              <option value="">Select a service</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="mb-2 block text-sm font-semibold tracking-wide text-slate-200 md:text-base">
              Estimated Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white transition-all focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm md:text-base"
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold tracking-wide text-slate-200 md:text-base">
            Project Details <span className="text-amber-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-amber-500/50 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none text-sm md:text-base"
            placeholder="Describe your project, timeline, and any specific requirements..."
          />
        </div>

        {submitStatus === "success" && (
          <div className="rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400 text-sm md:text-base">
            Thank you! Your inquiry has been submitted successfully. We'll contact you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-sm md:text-base">
            Something went wrong. Please try again or call us directly.
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-md border border-amber-500/40 bg-amber-500/10 px-8 py-4 text-sm font-semibold tracking-wide text-amber-100 transition-all hover:border-amber-500/60 hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed md:text-base"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </motion.button>
      </form>
    </div>
  );
}
