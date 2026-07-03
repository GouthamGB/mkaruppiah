import React from "react";
import Link from "next/link";
import { HelpCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 rounded-2xl shadow-xl text-center space-y-6 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-red/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-brand-gold/10 blur-2xl pointer-events-none"></div>

        {/* Icon */}
        <div className="mx-auto h-16 w-16 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red animate-pulse">
          <HelpCircle className="h-10 w-10" />
        </div>

        {/* Title & Message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
            The product, category, or page you are looking for does not exist, is currently undergoing database updates, or has not been published yet.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-bold text-white bg-brand-red rounded-lg shadow-md hover:bg-brand-red/90 transition-colors w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
