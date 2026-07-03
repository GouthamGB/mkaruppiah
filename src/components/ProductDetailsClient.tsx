"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Share2, 
  FileText, 
  Calendar, 
  Weight, 
  Award, 
  MessageSquare, 
  Layers, 
  X 
} from "lucide-react";
import { urlFor } from "@/sanity/client";

interface ProductModel {
  name: string;
  brand: string;
  rating: number;
  projectsCount: number;
  image?: any;
  images?: any[];
  description: string;
  overview: string;
  capacity: string;
  year: string;
  power: string;
  grade: string;
  brochureUrl?: string;
  brochureFileUrl?: string;
}

interface ProductDetailsClientProps {
  categorySlug: string;
  categoryName: string;
  subcategorySlug: string;
  subcategoryName: string;
  model: ProductModel;
}

export default function ProductDetailsClient({
  categorySlug,
  categoryName,
  subcategorySlug,
  subcategoryName,
  model,
}: ProductDetailsClientProps) {
  const [showToast, setShowToast] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Amazon-style Zoom and Hover state
  const [lensStyle, setLensStyle] = useState<React.CSSProperties>({ display: "none" });
  const [zoomImageStyle, setZoomImageStyle] = useState<React.CSSProperties>({ display: "none" });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Lens is 40% of the container size (zoom level 2.5x)
    const lensWidth = rect.width * 0.4;
    const lensHeight = rect.height * 0.4;

    let lensX = mouseX - lensWidth / 2;
    let lensY = mouseY - lensHeight / 2;

    const maxLensX = rect.width - lensWidth;
    const maxLensY = rect.height - lensHeight;

    lensX = Math.max(0, Math.min(lensX, maxLensX));
    lensY = Math.max(0, Math.min(lensY, maxLensY));

    const pctX = maxLensX > 0 ? lensX / maxLensX : 0;
    const pctY = maxLensY > 0 ? lensY / maxLensY : 0;

    // Shift of zoomed image inside the Zoom Window is -pct * (scale - 1) * 100%
    const zoomImageX = -pctX * 150;
    const zoomImageY = -pctY * 150;

    setLensStyle({
      left: `${lensX}px`,
      top: `${lensY}px`,
      width: `${lensWidth}px`,
      height: `${lensHeight}px`,
      display: "block",
    });

    setZoomImageStyle({
      transform: `translate(${zoomImageX}%, ${zoomImageY}%) scale(2.5)`,
    });
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setLensStyle({ display: "none" });
    setZoomImageStyle({ display: "none" });
  };

  // Save handler is removed

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const brochureLink = model.brochureFileUrl || model.brochureUrl || "#";

  const isEquipment = categoryName.toLowerCase().includes("equipment") || categorySlug.toLowerCase().includes("equipment");
  const noun = isEquipment ? "equipment" : "products";

  // Build the list of images to display
  const galleryImages = React.useMemo(() => {
    if (model.images && model.images.length > 0) {
      return model.images;
    }
    return model.image ? [model.image] : [];
  }, [model.images, model.image]);

  const activeImage = galleryImages[activeImageIndex];

  // Navigation handlers for Lightbox
  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pb-32">
      {/* Top Banner and Breadcrumbs */}
      <section className="bg-slate-900 text-white pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-64 w-64 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-slate-200 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/products/${categorySlug}`} className="hover:text-slate-200 transition-colors">{categoryName}</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/products/${categorySlug}/${subcategorySlug}`} className="hover:text-slate-200 transition-colors">{subcategoryName}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-gold font-bold">{model.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2">
            <Link
              href={`/products/${categorySlug}/${subcategorySlug}`}
              className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-brand-red transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to {subcategoryName}
            </Link>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-8 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-xl flex items-center space-x-2 border border-slate-800 dark:border-slate-200 transition-all duration-350 animate-fade-slow">
          <span className="text-xs font-bold">📋 Link copied to clipboard!</span>
        </div>
      )}

      {/* Main Content Layout */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Image Gallery, Thumbnails, Actions */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Main Image Wrapper (holds the main image and absolute floating zoom window) */}
              <div className="relative w-full">
                
                {/* Main Image Frame with Share overlay */}
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-xl shadow-sm cursor-zoom-in group select-none z-10"
                >
                  {activeImage ? (
                    <Image
                      src={urlFor(activeImage)}
                      alt={model.name}
                      fill
                      className="object-contain p-4 select-none pointer-events-none"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                      <Layers className="h-16 w-16 text-slate-300 dark:text-slate-650" />
                    </div>
                  )}

                  {/* Lens overlay (displays inside the container) */}
                  {isZooming && activeImage && (
                    <div 
                      className="absolute hidden lg:block bg-brand-red/10 border border-brand-red/20 pointer-events-none z-20 rounded-md"
                      style={lensStyle}
                    />
                  )}
                  
                  {/* Floating Share button overlay on main image */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                    className="absolute top-4 right-4 bg-white dark:bg-slate-850 p-2 rounded-full shadow text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-700 z-25"
                    aria-label="Share product"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Floating Amazon-style Zoom Window (sibling positioned absolutely to the right) */}
                {isZooming && activeImage && (
                  <div className="absolute hidden lg:block left-[103%] top-0 w-[120%] h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-30 pointer-events-none animate-fade-slow">
                    <div className="relative w-full h-full">
                      <Image
                        src={urlFor(activeImage)}
                        alt={`${model.name} zoom`}
                        fill
                        className="object-contain p-4 select-none pointer-events-none"
                        style={{
                          transformOrigin: "0 0",
                          ...zoomImageStyle,
                        }}
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Click to see full view link */}
              {galleryImages.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="text-xs font-bold text-slate-500 hover:text-brand-red dark:text-slate-400 hover:underline transition-colors focus:outline-none"
                  >
                    Click to see full view
                  </button>
                </div>
              )}

              {/* Thumbnails Carousel */}
              {galleryImages.length >= 1 && (
                <div className="grid grid-cols-7 gap-2 sm:gap-3">
                  {galleryImages.slice(0, 7).map((img, idx) => {
                    const isActive = idx === activeImageIndex;
                    const isLast = idx === 6 && galleryImages.length > 7;
                    const remainingCount = galleryImages.length - 6;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (isLast) {
                            setIsLightboxOpen(true);
                          } else {
                            setActiveImageIndex(idx);
                          }
                        }}
                        onMouseEnter={() => {
                          if (!isLast) {
                            setActiveImageIndex(idx);
                          }
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-white dark:bg-slate-900 border transition-all duration-150 ${
                          isActive 
                            ? "border-2 border-brand-red ring-2 ring-brand-red/15" 
                            : "border-slate-200 dark:border-slate-850 hover:border-slate-400"
                        }`}
                      >
                        <Image
                          src={urlFor(img)}
                          alt={`${model.name} gallery image ${idx + 1}`}
                          fill
                          className="object-cover p-1 select-none pointer-events-none"
                        />
                        {isLast && (
                          <div className="absolute inset-0 bg-slate-900/75 flex items-center justify-center text-white font-extrabold text-sm sm:text-base z-10">
                            {remainingCount}+
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-sm transition-all duration-200 hover:border-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850"
                >
                  <Share2 className="h-4.5 w-4.5 text-slate-500" />
                  <span>Share</span>
                </button>

                <a
                  href={brochureLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-sm transition-all duration-200 hover:border-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                >
                  <FileText className="h-4.5 w-4.5 text-slate-500" />
                  <span>Brochure</span>
                </a>
              </div>
            </div>

            {/* Right Column: Title, Ratings, Specs, Overview */}
            <div className="lg:col-span-6 space-y-8">
              {/* Product Title and Rating Headers */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {/* Brand Tag */}
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-slate-200/50 dark:border-slate-700">
                    {model.brand}
                  </span>
                  
                  {/* Rating display is removed */}
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                  {model.name}
                </h2>
                
                <p className="text-slate-650 dark:text-slate-450 text-base leading-relaxed text-balance">
                  {model.description}
                </p>
              </div>

              {/* Specifications Grid */}
              {(model.capacity || (model.year && model.year !== "N/A" && model.year !== "empty") || (model.grade && model.grade !== "N/A" && model.grade !== "empty")) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Capacity */}
                  {model.capacity && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-5 rounded-xl flex items-start space-x-4 shadow-sm">
                      <div className="p-2.5 bg-brand-red/10 rounded-lg text-brand-red">
                        <Weight className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Capacity</span>
                        <h5 className="text-md font-bold text-slate-850 dark:text-slate-100">{model.capacity}</h5>
                      </div>
                    </div>
                  )}

                  {/* Year */}
                  {model.year && model.year !== "N/A" && model.year !== "empty" && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-5 rounded-xl flex items-start space-x-4 shadow-sm">
                      <div className="p-2.5 bg-brand-red/10 rounded-lg text-brand-red">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Year</span>
                        <h5 className="text-md font-bold text-slate-850 dark:text-slate-100">{model.year}</h5>
                      </div>
                    </div>
                  )}

                  {/* Grade */}
                  {model.grade && model.grade !== "N/A" && model.grade !== "empty" && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-5 rounded-xl flex items-start space-x-4 shadow-sm">
                      <div className="p-2.5 bg-brand-red/10 rounded-lg text-brand-red">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Grade</span>
                        <h5 className="text-md font-bold text-slate-850 dark:text-slate-100">{model.grade}</h5>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Overview Section */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                <h3 className="text-lg font-extrabold text-slate-950 dark:text-white tracking-tight">Overview</h3>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                  {model.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating/Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 w-full z-45 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Need this {noun.toLowerCase()}?</span>
            <span className="text-md font-extrabold text-slate-900 dark:text-white block">{model.name}</span>
          </div>

          <Link
            href={`/contacts?inquiry=${encodeURIComponent(model.name)}`}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-brand-red text-white text-sm font-bold rounded-lg shadow-md hover:bg-brand-red/90 transition-colors focus:outline-none"
          >
            <MessageSquare className="h-4.5 w-4.5 mr-2" />
            Request Quote
          </Link>
        </div>
      </div>

      {/* Fullscreen Dark Lightbox Modal */}
      {isLightboxOpen && galleryImages.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 animate-fade-slow"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar of Modal */}
          <div className="flex items-center justify-between text-white w-full max-w-7xl mx-auto z-50">
            <h3 className="font-extrabold text-base tracking-tight">{model.name} — Full Gallery</h3>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen view"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Center Main Modal Image with Navigation Arrows */}
          <div className="flex items-center justify-center flex-grow w-full max-w-7xl mx-auto gap-4 relative">
            {/* Prev Arrow */}
            {galleryImages.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-0 sm:left-4 z-50 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Lightbox Large Image */}
            <div className="relative aspect-[4/3] max-w-5xl max-h-[70vh] w-full select-none">
              <Image
                src={urlFor(galleryImages[activeImageIndex])}
                alt={`${model.name} full view`}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            {/* Next Arrow */}
            {galleryImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-0 sm:right-4 z-50 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors text-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar of Modal */}
          <div className="text-center text-slate-400 text-xs py-2 w-full z-50">
            Image {activeImageIndex + 1} of {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
