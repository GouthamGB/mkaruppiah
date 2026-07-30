"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon } from "lucide-react";
import { urlFor } from "@/sanity/client";

interface MediaItem {
  type: string;
  image?: any;
  videoUrl?: string;
}

interface CsrMediaGalleryProps {
  media: MediaItem[];
}

export default function CsrMediaGallery({ media }: CsrMediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  if (!media || media.length === 0) return null;

  const currentItem = media[currentIndex];

  // Helper to extract YouTube video ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Helper to extract Vimeo ID
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  // Helper to get thumbnail URL for media item
  const getThumbnailUrl = (item: MediaItem) => {
    if (item.image) {
      return urlFor(item.image);
    }
    if (item.type === "video" && item.videoUrl) {
      const ytId = getYoutubeId(item.videoUrl);
      if (ytId) {
        return `https://img.youtube.com/vi/${ytId}/0.jpg`;
      }
    }
    return "";
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  // Render the active media player/viewer
  const renderActiveMedia = () => {
    if (currentItem.type === "video" && currentItem.videoUrl) {
      const ytId = getYoutubeId(currentItem.videoUrl);
      const vimeoId = getVimeoId(currentItem.videoUrl);

      if (ytId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1`}
            title="YouTube video player"
            className="w-full h-full absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        );
      }

      if (vimeoId) {
        return (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1`}
            title="Vimeo video player"
            className="w-full h-full absolute inset-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }

      // Direct MP4 fallback
      return (
        <video
          src={currentItem.videoUrl}
          controls
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      );
    }

    // Default to Image
    const activeImgUrl = getThumbnailUrl(currentItem);
    return activeImgUrl ? (
      <Image
        src={activeImgUrl}
        alt="Active CSR Media"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 70vw"
        priority
      />
    ) : (
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
        <ImageIcon className="h-12 w-12 text-slate-400" />
      </div>
    );
  };

  const prevIndex = currentIndex === 0 ? media.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === media.length - 1 ? 0 : currentIndex + 1;

  const prevItem = media[prevIndex] || { type: "image" };
  const nextItem = media[nextIndex] || { type: "image" };

  return (
    <div className="w-full">
      {/* Styles block for spring physics & dynamic slide animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideNext {
          0% { opacity: 0.3; transform: translateX(120px) scale(0.9); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slidePrev {
          0% { opacity: 0.3; transform: translateX(-120px) scale(0.9); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-spring-next {
          animation: slideNext 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-spring-prev {
          animation: slidePrev 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}} />

      {/* Big Active Media Display Viewport with Side Previews */}
      <div className="flex items-center justify-between gap-4 w-full">
        
        {/* Left Item (Smaller, Faded - Clickable with Arrow Overlay) */}
        <div 
          onClick={handlePrev}
          className="w-[15%] md:w-[18%] hidden sm:block cursor-pointer transition-all duration-500 ease-out transform scale-90 hover:scale-95 opacity-50 hover:opacity-85 relative h-[180px] md:h-[260px] lg:h-[320px] rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 shadow-md bg-slate-900 flex-shrink-0 group/left"
        >
          {getThumbnailUrl(prevItem) ? (
            <img
              src={getThumbnailUrl(prevItem)}
              alt="Previous media preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover/left:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-500">
              <ImageIcon className="h-8 w-8" />
            </div>
          )}
          
          {/* Overlay Faded Background & Arrow */}
          <div className="absolute inset-0 bg-slate-950/45 group-hover/left:bg-slate-950/30 transition-all duration-300 flex items-center justify-center">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-slate-900/90 border border-slate-700/50 text-white flex items-center justify-center shadow-lg transform translate-x-2 group-hover/left:translate-x-0 transition-transform duration-300">
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
          
          {prevItem.type === "video" && (
            <div className="absolute bottom-3 left-3 p-1 rounded-full bg-slate-900/80 border border-slate-700/50 text-white">
              <Play className="h-3 w-3 fill-white" />
            </div>
          )}
        </div>

        {/* Center Main Active Media */}
        <div className="flex-1 w-full sm:max-w-[70%] md:max-w-[64%] relative group">
          {/* Soft Glow Gradient Accent behind the image */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-brand-red/20 via-brand-gold/10 to-brand-blue/15 dark:from-brand-red/10 dark:via-brand-gold/5 dark:to-brand-blue/10 opacity-70 blur-xl group-hover:opacity-95 transition duration-500"></div>

          {/* Key triggers remount of the inner card causing CSS keyframe to re-run */}
          <div 
            key={`${currentIndex}-${direction}`}
            className={`relative h-[280px] sm:h-[420px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-250/50 dark:border-slate-800/80 bg-slate-950 ${
              direction === "next" ? "animate-spring-next" : "animate-spring-prev"
            }`}
          >
            {renderActiveMedia()}

            {/* Info Page Counter Badge */}
            <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-200 border border-slate-800 shadow-md z-20">
              {currentIndex + 1} / {media.length}
            </div>
          </div>
        </div>

        {/* Right Item (Smaller, Faded - Clickable with Arrow Overlay) */}
        <div 
          onClick={handleNext}
          className="w-[15%] md:w-[18%] hidden sm:block cursor-pointer transition-all duration-500 ease-out transform scale-90 hover:scale-95 opacity-50 hover:opacity-85 relative h-[180px] md:h-[260px] lg:h-[320px] rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 shadow-md bg-slate-900 flex-shrink-0 group/right"
        >
          {getThumbnailUrl(nextItem) ? (
            <img
              src={getThumbnailUrl(nextItem)}
              alt="Next media preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover/right:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-500">
              <ImageIcon className="h-8 w-8" />
            </div>
          )}
          
          {/* Overlay Faded Background & Arrow */}
          <div className="absolute inset-0 bg-slate-950/45 group-hover/right:bg-slate-950/30 transition-all duration-300 flex items-center justify-center">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-slate-900/90 border border-slate-700/50 text-white flex items-center justify-center shadow-lg transform -translate-x-2 group-hover/right:translate-x-0 transition-transform duration-300">
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>

          {nextItem.type === "video" && (
            <div className="absolute bottom-3 right-3 p-1 rounded-full bg-slate-900/80 border border-slate-700/50 text-white">
              <Play className="h-3 w-3 fill-white" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
