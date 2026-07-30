import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { sanityFetch } from "@/sanity/client";
import CsrMediaGallery from "@/components/CsrMediaGallery";

interface Initiative {
  title: string;
  description: string;
  image?: any;
  media?: { type: string; image?: any; videoUrl?: string }[];
}

interface InitiativeDetailsProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export default async function InitiativeDetailsPage({ params }: InitiativeDetailsProps) {
  const { slug } = params;

  const initiative = await sanityFetch<Initiative>({
    query: `*[_type == "csr"][0].initiatives[slug.current == $slug][0] { title, description, image, media }`,
    params: { slug },
  });

  if (!initiative) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-36 pb-20 flex flex-col items-center justify-center">
        <div className="max-w-md text-center space-y-6 px-4">
          <div className="inline-flex h-16 w-16 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-brand-red">
            <Heart className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Initiative Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            We couldn&apos;t retrieve the details for this initiative. It might have been updated or the link is incorrect.
          </p>
          <Link
            href="/csr"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-brand-red hover:bg-brand-red/90 shadow-md transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CSR Initiatives
          </Link>
        </div>
      </div>
    );
  }

  // Combine main image with media gallery if media gallery is empty
  const mediaGallery = initiative.media || [];
  if (initiative.image && mediaGallery.length === 0) {
    mediaGallery.unshift({ type: "image", image: initiative.image });
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-32 pb-24 animate-fade-slow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation & Breadcrumb Header */}
        <div className="space-y-6 border-b border-slate-200/60 dark:border-slate-800/80 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href="/csr"
              className="inline-flex items-center text-sm font-bold text-slate-655 dark:text-slate-350 hover:text-brand-red dark:hover:text-brand-gold transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Initiatives List
            </Link>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
              <Link href="/csr" className="hover:text-brand-red">CSR</Link>
              <span>/</span>
              <span className="text-slate-600 dark:text-slate-350">{initiative.title}</span>
            </div>
          </div>

          {/* Centered Initiative Title Block */}
          <div className="space-y-4 pt-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {initiative.title}
            </h1>
            
            {/* Elegant Inline Metadata Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450 pt-1">
              <span className="text-brand-red dark:text-brand-gold">Active Ongoing Initiative</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>Pudukkottai & Karaikkudi, TN</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>CSR & Community Development</span>
            </div>
          </div>
        </div>

        {/* Full Width Media Gallery Section */}
        {mediaGallery.length > 0 && (
          <div className="w-full">
            <CsrMediaGallery media={mediaGallery} />
          </div>
        )}

        {/* Story Narrative Layout Section (Centered for readability) */}
        <div className="max-w-4xl mx-auto space-y-12 pt-6">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Vision & Impact
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-brand-gold to-brand-red rounded-full"></div>
            
            {/* Lead Narrative Description */}
            <p className="text-slate-750 dark:text-slate-200 text-lg sm:text-xl leading-relaxed whitespace-pre-line">
              {initiative.description}
            </p>
          </div>

          {/* Styled Call to Action Section */}
          <div className="border-t border-slate-200/60 dark:border-slate-800/80 pt-16 text-center max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Partner with us on this initiative
            </h3>
            <p className="text-slate-550 dark:text-slate-400 text-base leading-relaxed">
              If you represent a local organization, school, or community group, or want to collaborate with us on this initiative, reach out directly to our team.
            </p>
            <div className="pt-2">
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-slate-950 dark:bg-slate-900 hover:bg-brand-red dark:hover:bg-brand-red border border-slate-800 dark:border-slate-700 hover:border-brand-red dark:hover:border-brand-red shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Get in Touch & Collaborate</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
