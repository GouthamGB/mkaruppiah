import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, ThumbsUp, Building, HelpCircle } from "lucide-react";
import HeroSlideshow from "@/components/HeroSlideshow";
import CategoryListClient from "@/components/CategoryListClient";
import { sanityFetch } from "@/sanity/client";
import { HeroSlide, Product, CoreValue } from "@/data/mockData";

// Define icons map for Core Values
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueIconsMap: Record<string, React.ComponentType<any>> = {
  trust: ShieldCheck,
  quality: Award,
  commitment: ThumbsUp,
  "one-stop solutions": Building,
};

interface HomePageData {
  title: string;
  subtitle: string;
  description: string;
  slides: HeroSlide[];
  mission: string;
  vision: string;
  coreValues: CoreValue[];
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch home page data and products list
  const pageData = await sanityFetch<HomePageData>({
    query: `*[_type == "homePage"][0] { title, subtitle, description, slides, mission, vision, coreValues }`,
  });

  const products = await sanityFetch<Product[]>({
    query: `*[_type == "product"] | order(_createdAt asc) { id, name, "slug": slug.current, description, image }`,
  });


  console.log('pageData?.slides', pageData?.slides)
  // Fallbacks if queries return empty
  const slides = pageData?.slides || [];
  const mission = pageData?.mission || "";
  const vision = pageData?.vision || "";
  const coreValues = pageData?.coreValues || [];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Slideshow Section */}
      <HeroSlideshow
        slides={slides}
        fallbackTitle={pageData?.title}
        fallbackSubtitle={pageData?.subtitle}
        fallbackDescription={pageData?.description}
      />

      {/* 2. Products Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-brand-red text-sm font-bold uppercase tracking-widest">
              Our Products & Supplies
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              One-Stop Supplier for All Building Needs
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-md max-w-2xl mx-auto">
              We manufacture and distribute premium-grade materials to power your construction projects from foundation to finish.
            </p>
          </div>

          {/* Cards Grid with Controls */}
          <CategoryListClient products={products} />
        </div>
      </section>

      {/* 3. Mission & Vision Section */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        {/* Background decorative glowing circles */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-red/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Header Column */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-brand-gold text-sm font-bold uppercase tracking-widest">
                Our Purpose
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Driving Construction Forward Since 1964
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed text-balance">
                Our mission and vision define who we are and our legacy. We build enduring relations and supply the foundational blocks for modern infrastructures.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 hover:border-slate-700 transition-colors"
                >
                  Read Our Full Story
                </Link>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-slate-900/80 border border-slate-800/80 backdrop-blur-md p-8 rounded-lg space-y-4 hover:border-slate-750 transition-all">
                <div className="h-10 w-10 rounded-md bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <span className="text-lg font-bold">M</span>
                </div>
                <h4 className="text-2xl font-extrabold text-white">Our Mission</h4>
                <p className="text-slate-300 text-sm leading-relaxed leading-loose italic">
                  &ldquo;{mission}&rdquo;
                </p>
                <div className="pt-4 text-xs text-slate-500 font-medium">
                  Focused on excellence, consistency, and customer trust.
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-gradient-to-br from-brand-red to-brand-red/90 border border-brand-red/40 p-8 rounded-lg space-y-4 shadow-xl transform hover:scale-[1.01] transition-all">
                <div className="h-10 w-10 rounded-md bg-white/10 flex items-center justify-center text-white">
                  <span className="text-lg font-bold">V</span>
                </div>
                <h4 className="text-2xl font-extrabold text-white">Our Vision</h4>
                <p className="text-white/90 text-sm leading-relaxed leading-loose">
                  &ldquo;{vision}&rdquo;
                </p>
                <div className="pt-4 text-xs text-brand-gold/80 font-bold uppercase tracking-wider">
                  The ultimate building mart monopoly
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-brand-red text-sm font-bold uppercase tracking-widest">
              Core Principles
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Values That Build Relationships
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-md max-w-2xl mx-auto">
              Our culture is governed by four core values that have earned us the trust of architects, contractors, and builders for over 60 years.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const key = value.title.toLowerCase();
              const Icon = valueIconsMap[key] || HelpCircle;
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/80 p-8 rounded-lg space-y-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-brand-red/10 dark:bg-brand-red/5 flex items-center justify-center text-brand-red">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {value.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
