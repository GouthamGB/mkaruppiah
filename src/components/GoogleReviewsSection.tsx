"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { GoogleReview, mockData } from "@/data/mockData";

// Google Colored "G" Icon
function GoogleGIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

// 5 Star Rating Display using brand-gold
function StarRating({ count = 5, size = "w-4 h-4" }: { count?: number; size?: string }) {
  return (
    <div className="flex items-center space-x-0.5 text-brand-gold">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${size} fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface GoogleReviewsSectionProps {
  initialReviews?: GoogleReview[];
}

export default function GoogleReviewsSection({
  initialReviews,
}: GoogleReviewsSectionProps) {
  const [reviews] = useState<GoogleReview[]>(
    initialReviews || mockData.googleReviews
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Site Theme Accurate */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h3 className="text-brand-gold text-sm font-bold uppercase tracking-widest">
            Client Feedback
          </h3>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Here&apos;s What Our Clients Have to Say
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Hear from satisfied builders, contractors, and homeowners who trust M. Karuppiah Group.
          </p>

          {/* Integrated Sleek Google Rating Pill */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-semibold text-slate-800 dark:text-slate-200">
              <GoogleGIcon className="w-4 h-4 shrink-0" />
              <StarRating count={5} size="w-3.5 h-3.5" />
              <span>4.9 / 5.0 Rating from 200+ Google Reviews</span>
            </div>
          </div>
        </div>

        {/* Full-width Carousel Slider */}
        <div className="relative w-full overflow-hidden px-1">
          {/* Left Navigation Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              aria-label="Previous reviews"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Navigation Arrow */}
          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              aria-label="Next reviews"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Slider Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
            }}
          >
            {reviews.map((rev) => {
              const isExpanded = expandedReviews[rev.id] || false;
              const isLong = rev.text.length > 130;

              return (
                <div
                  key={rev.id}
                  className="p-3 shrink-0"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="h-full flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-gold/40 transition-all duration-300">
                    <div>
                      {/* Card Top: Author, Relative Time & Google G icon */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {rev.authorImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={rev.authorImage}
                              alt={rev.authorName}
                              className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100 dark:ring-slate-800"
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-sm shrink-0 uppercase shadow-xs"
                              style={{ backgroundColor: rev.avatarBg || "#023f88" }}
                            >
                              {rev.authorName.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white capitalize truncate">
                              {rev.authorName}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {rev.relativeTime}
                            </p>
                          </div>
                        </div>
                        <GoogleGIcon className="w-5 h-5 shrink-0" />
                      </div>

                      {/* Stars & Verified Badge */}
                      <div className="flex items-center gap-1.5 mb-3.5">
                        <StarRating count={rev.rating} size="w-4 h-4" />
                        {rev.verified && (
                          <div className="inline-flex items-center text-sky-500" title="Verified Google Review">
                            <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {isLong && !isExpanded
                          ? `${rev.text.slice(0, 130)}...`
                          : rev.text}
                      </p>
                    </div>

                    {/* Read More toggle */}
                    {isLong && (
                      <div className="mt-3 pt-2">
                        <button
                          onClick={() => toggleExpand(rev.id)}
                          className="text-xs font-semibold text-brand-blue hover:text-brand-blue/80 hover:underline transition-colors"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Google Verified Badge */}
        <div className="flex justify-center sm:justify-end mt-4 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-md">
            <GoogleGIcon className="w-3.5 h-3.5" />
            <span>Verified Customer Reviews</span>
          </div>
        </div>

        {/* View More Reviews CTA button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-slate-950 bg-brand-gold hover:bg-brand-gold/90 rounded-md shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:scale-105 active:scale-95 transition-all duration-200 group"
          >
            <span>View More Reviews</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
