"use client";

import { useState } from "react";

interface FormProps {
  onClose?: () => void;
}

export default function Form({ onClose }: FormProps) {
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

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
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
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {onClose && (
        <button
          onClick={onClose}
          className="cursor-pointer absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="mb-8">
        <h2 className="mb-3 text-3xl font-light tracking-tight text-white uppercase md:text-4xl">
          Start Your <span className="font-semibold">Project</span>
        </h2>
        <p className="text-slate-400">
          Tell us about your project and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="cursor-pointer w-full rounded-sm border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="cursor-pointer w-full rounded-sm border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-300">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="cursor-pointer w-full rounded-sm border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            placeholder="+234 916 291 9586"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-slate-300">
              Project Type *
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              className="cursor-pointer w-full rounded-sm border border-white/20 bg-slate-900/50 px-4 py-3 text-white transition-all focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
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
            <label htmlFor="budget" className="mb-2 block text-sm font-medium text-slate-300">
              Estimated Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="cursor-pointer w-full rounded-sm border border-white/20 bg-slate-900/50 px-4 py-3 text-white transition-all focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
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
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
            Project Details *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="cursor-pointer w-full rounded-sm border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none"
            placeholder="Describe your project, timeline, and any specific requirements..."
          />
        </div>

        {submitStatus === "success" && (
          <div className="rounded-sm border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400">
            Thank you! Your inquiry has been submitted successfully. We'll contact you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
            Something went wrong. Please try again or call us directly.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full rounded-sm border border-amber-500/30 bg-amber-500/10 px-9 py-3.5 text-sm font-medium text-amber-100 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed md:text-base"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}
