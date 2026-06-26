import React from "react";
import Image from "next/image";
import { Award, History } from "lucide-react";
import { sanityFetch, urlFor } from "@/sanity/client";
import AwardsCarousel from "@/components/AwardsCarousel";

interface AboutPageData {
  about: {
    history: string;
  } | null;
  awards: any[];
}

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const data = await sanityFetch<AboutPageData>({
    query: `{
      "about": *[_type == "aboutPage"][0] { history },
      "awards": *[_type == "award"] | order(order asc)
    }`,
  });

  const historyText = data?.about?.history || "";
  const awards = data?.awards || [];

  return (
    <div className="w-full">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About Us & Legacy</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            Over 60 Years of Building Trust, Quality & Relationships
          </p>
        </div>
      </section>

      {/* History & Timeline */}
      <section className="py-20 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 text-brand-red">
                <History className="h-5 w-5" />
                <span className="text-xs uppercase font-bold tracking-wider">Our Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Established in 1964
              </h2>
              <p className="text-slate-700 dark:text-slate-350 text-md leading-relaxed text-balance">
                {historyText}
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-3xl font-extrabold text-brand-red">1964</h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Year Founded</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-brand-gold">100+</h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Projects Supplied</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-brand-blue">60+</h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Years Legacy</p>
                </div>
              </div>
            </div>

            {/* Collage/Graphic Column */}
            <div className="lg:col-span-5 relative h-[380px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-850">
              <Image
                src="https://images.unsplash.com/photo-1541829011-831c3a743345?q=80&w=800&auto=format&fit=crop"
                alt="M. Karuppiah Construction Heritage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-6 rounded-lg text-white">
                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-1">Company Strength</span>
                <p className="text-sm font-semibold">Reliability built on generations of dedication and premium quality standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognitions Carousel Section */}
      <section className="py-24 bg-brand-light dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Our Awards and Recognitions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium">
              Recognizing Excellence in Real Estate
            </p>
          </div>

          {/* Interactive Awards Slider Component */}
          <AwardsCarousel initialAwards={awards} />
        </div>
      </section>
    </div>
  );
}
