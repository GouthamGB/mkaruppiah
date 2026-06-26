"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { urlFor } from "@/sanity/client";

export interface AwardItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  title: string;
  description: string;
  order?: number;
}

interface AwardsCarouselProps {
  initialAwards?: AwardItem[];
}

export default function AwardsCarousel({ initialAwards }: AwardsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const displayAwards = initialAwards || [];

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < maxScrollLeft - 10);

    // Calculate active dot index (approximate based on item width)
    const cardWidth = el.scrollWidth / displayAwards.length;
    const index = Math.min(
      displayAwards.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(index);
  }, [displayAwards.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState);
      updateScrollState();
      // Double check scroll state after a delay for hydration settling
      const timer = setTimeout(updateScrollState, 500);
      return () => {
        el.removeEventListener("scroll", updateScrollState);
        clearTimeout(timer);
      };
    }
  }, [updateScrollState]);

  if (displayAwards.length === 0) {
    return null;
  }

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    // Scroll by roughly 1 item width
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIdx = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.scrollWidth / displayAwards.length;
    el.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full space-y-8 select-none">
      {/* Slider Viewport Container */}
      <div className="relative group/carousel">
        {/* Left Control Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors duration-250 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Right Control Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors duration-250 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {displayAwards.map((item, idx) => (
            <div
              key={idx}
              className="flex-none w-[280px] sm:w-[320px] md:w-[280px] lg:w-[290px] xl:w-[300px] snap-start"
            >
              {/* Award Card Wrapper */}
              <div className="group relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Certificate/Trophy Image */}
                <div className="relative h-full w-full p-4 flex items-center justify-center bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(item.image)}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-102"
                  />
                </div>

                {/* Hover Card Overlay (Slides up from the bottom on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out space-y-2">
                    <div className="inline-flex h-8 w-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                      <Award className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-md sm:text-lg font-bold text-brand-gold leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-balance">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators / Dots */}
      <div className="flex justify-center items-center space-x-2">
        {displayAwards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIdx(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "w-8 bg-brand-red" : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
