"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { HeroSlide } from "@/data/mockData";

interface HeroSlideshowProps {
  slides: HeroSlide[];
}

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative h-[80vh] min-h-[550px] w-full overflow-hidden bg-slate-950">
      {/* Background Images with Fade Effect */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {slide.image && (
            <Image
              src={slide.image}
              alt={slide.title || "M. Karuppiah Hero Slide"}
              fill
              priority={idx === 0}
              className="object-cover object-center"
            />
          )}
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/50 to-transparent"></div>
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6 text-white animate-fade-slow">
            <h4 className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
              Established in 1964
            </h4>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {slides[currentIndex].title}
              <span className="block text-brand-gold mt-1">
                {slides[currentIndex].subtitle}
              </span>
            </h1>
            <p className="text-md sm:text-lg lg:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl text-balance">
              {slides[currentIndex].description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-red rounded-md shadow-lg hover:bg-brand-red/90 transition-all duration-200 hover:scale-105"
              >
                Inquire Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white border-2 border-white/30 backdrop-blur-sm bg-white/5 rounded-md hover:bg-white hover:text-slate-950 hover:border-white transition-all duration-200 hover:scale-105"
              >
                Our Legacy
              </Link>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 mr-2 transition-colors">
                  <Play className="h-3 w-3 fill-white text-white ml-0.5" />
                </div>
                Watch Video
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-brand-red" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
}
