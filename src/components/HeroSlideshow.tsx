"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { HeroSlide, mockData } from "@/data/mockData";
import { urlFor } from "@/sanity/client";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSlideshowProps {
  slides?: HeroSlide[];
}

export default function HeroSlideshow({ slides: propSlides }: HeroSlideshowProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Guarantee slides fallback to mockData if none provided or array is empty
  const slides = propSlides && propSlides.length > 0 ? propSlides : mockData.hero.slides;

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // 6 seconds slide loop duration
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const imageUrl = currentSlide?.image ? urlFor(currentSlide.image) : "";

  // Static fallback render during SSR to prevent hydration mismatch errors
  if (!mounted) {
    return (
      <section className="relative h-screen min-h-[550px] w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-10">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={currentSlide.title || "M. Karuppiah Hero Slide"}
              fill
              priority
              className="object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent"></div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl space-y-6 text-white">
              <h4 className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
                {currentSlide.subtitle || "Established in 1964"}
              </h4>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h1>
              <p className="text-md sm:text-lg lg:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl text-balance">
                {currentSlide.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {currentSlide.btnText1 && (
                  <Link
                    href={currentSlide.btnLink1 || "/contacts"}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-red rounded-md shadow-lg hover:bg-brand-red/90 transition-all duration-200"
                  >
                    {currentSlide.btnText1}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
                {currentSlide.btnText2 && (
                  <Link
                    href={currentSlide.btnLink2 || "/about"}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white border-2 border-white/30 backdrop-blur-sm bg-white/5 rounded-md hover:bg-white hover:text-slate-950 hover:border-white transition-all duration-200"
                  >
                    {currentSlide.btnText2}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen min-h-[550px] w-full overflow-hidden bg-slate-950">
      {/* Background Images with Framer Motion Cross-fade */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-10"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={currentSlide.title || "M. Karuppiah Hero Slide"}
              fill
              priority
              className="object-cover object-center"
            />
          )}
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* AnimatePresence for text overlay container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-3xl space-y-6 text-white"
            >
              {/* Subtitle - Fades down from Top */}
              <motion.h4
                variants={{
                  hidden: { y: -30, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                  exit: { y: -20, opacity: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest"
              >
                {currentSlide.subtitle || "Established in 1964"}
              </motion.h4>

              {/* Title - Fades up from Bottom */}
              <motion.h1
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                  exit: { y: -30, opacity: 0 }
                }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
              >
                {currentSlide.title}
              </motion.h1>

              {/* Description - Fades up from Bottom */}
              <motion.p
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                  exit: { y: -20, opacity: 0 }
                }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-md sm:text-lg lg:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl text-balance"
              >
                {currentSlide.description}
              </motion.p>

              {/* Action Buttons - Fades up from Bottom */}
              <motion.div
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                  exit: { y: -10, opacity: 0 }
                }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {currentSlide.btnText1 && (
                  <Link
                    href={currentSlide.btnLink1 || "/contacts"}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-red rounded-md shadow-lg hover:bg-brand-red/90 transition-all duration-200 hover:scale-105"
                  >
                    {currentSlide.btnText1}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
                {currentSlide.btnText2 && (
                  <Link
                    href={currentSlide.btnLink2 || "/about"}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white border-2 border-white/30 backdrop-blur-sm bg-white/5 rounded-md hover:bg-white hover:text-slate-950 hover:border-white transition-all duration-200 hover:scale-105"
                  >
                    {currentSlide.btnText2}
                  </Link>
                )}
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-slate-350 hover:text-white transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 mr-2 transition-colors">
                    <Play className="h-3 w-3 fill-white text-white ml-0.5" />
                  </div>
                  Watch Video
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
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
                idx === currentIndex ? "w-8 bg-brand-red" : "bg-white/40 hover:bg-white/70 w-2"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
}
