"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function FormContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pre-populate subject from URL inquiry query parameter
  useEffect(() => {
    const inquiry = searchParams.get("inquiry");
    if (inquiry) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry regarding ${decodeURIComponent(inquiry)}`,
      }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-8 rounded-lg text-center space-y-4 animate-fade-slow">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 dark:text-emerald-500" />
        <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400">Message Sent Successfully</h3>
        <p className="text-slate-650 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to M. Karuppiah Group. Our representative will review your inquiry and get in touch with you shortly.
        </p>
        <div className="pt-4">
          <button
            onClick={() => setIsSuccess(false)}
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-450 border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 rounded-md hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-8 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh Kumar"
            className={`w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all ${
              errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. ramesh@gmail.com"
            className={`w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject Input */}
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Inquire about steel supply"
          className={`w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all ${
            errors.subject
              ? "border-red-500 focus:border-red-500"
              : "border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700"
          }`}
        />
        {errors.subject && (
          <p className="text-xs text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Your Message
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold lowercase tracking-wider ml-1">(min 10 chars)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your inquiry or details of building material requirements..."
          className={`w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all ${
            errors.message
              ? "border-red-500 focus:border-red-500"
              : "border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700"
          }`}
        />
        {errors.message && (
          <p className="text-xs text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-red rounded-md shadow-md hover:bg-brand-red/90 transition-colors focus:outline-none disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Inquiry
          </>
        )}
      </button>
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin h-8 w-8 text-brand-red" />
      </div>
    }>
      <FormContent />
    </Suspense>
  );
}
