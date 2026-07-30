import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, HeartPulse, Sprout, Leaf, HelpCircle, ArrowRight } from "lucide-react";
import { sanityFetch, urlFor } from "@/sanity/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const csrIconsMap: Record<string, React.ComponentType<any>> = {
  "rural educational support": BookOpen,
  "free healthcare & eye camps": HeartPulse,
  "agricultural assistance & training": Sprout,
  "green energy & afforestation": Leaf,
};

interface CsrPageData {
  initiatives: { title: string; slug?: { current: string }; description: string; image?: any }[];
}

export const dynamic = "force-dynamic";

export default async function CsrPage() {
  const data = await sanityFetch<CsrPageData>({
    query: `*[_type == "csr"][0] { initiatives }`,
  });

  const initiatives = data?.initiatives || [];

  return (
    <div className="w-full">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-brand-gold/5 blur-[80px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Corporate Social Responsibility</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            Giving Back to Pudukkottai & Karaikkudi Communities
          </p>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/80">
        <div>
          {initiatives.map((item, index) => {
            const key = item.title.toLowerCase();
            const Icon = csrIconsMap[key] || HelpCircle;
            const imageUrl = item.image ? urlFor(item.image) : "";
            const isEven = index % 2 === 0;
            const itemSlug = item.slug?.current || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            const detailsUrl = `/csr/${itemSlug}`;

            return (
              <div
                key={index}
                className={`py-24 md:py-32 ${
                  index !== 0 ? "border-t border-slate-200/40 dark:border-slate-800/40" : ""
                } ${
                  isEven ? "bg-white dark:bg-slate-900/30" : "bg-slate-50 dark:bg-slate-950"
                }`}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Photo Column - Takes 7 out of 12 columns (approx. 58%) */}
                    <div className={`w-full lg:col-span-7 ${isEven ? "" : "lg:order-2"}`}>
                      <div className="relative group w-full">
                        {/* Soft Glow Gradient Accent behind the image */}
                        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brand-red/25 via-brand-gold/15 to-brand-blue/20 dark:from-brand-red/10 dark:via-brand-gold/5 dark:to-brand-blue/10 opacity-70 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500"></div>
                        
                        <div className="relative h-[320px] sm:h-[450px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-250/50 dark:border-slate-800/80">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 58vw"
                              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-red/20 dark:from-brand-blue/10 dark:to-brand-red/10 flex items-center justify-center">
                              <Icon className="h-16 w-16 text-slate-400 dark:text-slate-600" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-slate-950/10"></div>
                        </div>
                      </div>
                    </div>

                    {/* Content Column - Takes 5 out of 12 columns (approx. 42%) */}
                    <div className={`w-full lg:col-span-5 space-y-6 ${isEven ? "" : "lg:order-1"}`}>
                      <div className="space-y-3">
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                          {item.title}
                        </h3>
                        <div className="h-1 w-16 bg-gradient-to-r from-brand-gold to-brand-red rounded-full"></div>
                      </div>

                      <p className="text-slate-650 dark:text-slate-350 text-lg leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-4">
                        <Link
                          href={detailsUrl}
                          className="inline-flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-widest text-brand-red dark:text-brand-gold hover:text-brand-red/80 hover:translate-x-1 transition-all duration-300 group/link"
                        >
                          <span>view details</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
