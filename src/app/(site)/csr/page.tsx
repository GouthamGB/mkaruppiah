import React from "react";
import Image from "next/image";
import { BookOpen, HeartPulse, Sprout, Leaf, HelpCircle, Heart } from "lucide-react";
import { sanityFetch } from "@/sanity/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const csrIconsMap: Record<string, React.ComponentType<any>> = {
  "rural educational support": BookOpen,
  "free healthcare & eye camps": HeartPulse,
  "agricultural assistance & training": Sprout,
  "green energy & afforestation": Leaf,
};

interface CsrPageData {
  title: string;
  description: string;
  initiatives: { title: string; description: string }[];
}

export const dynamic = "force-dynamic";

export default async function CsrPage() {
  const data = await sanityFetch<CsrPageData>({
    query: `*[_type == "csr"][0] { title, description, initiatives }`,
  });

  const title = data?.title || "Empowering Pudukkottai & Karaikkudi";
  const description = data?.description || "";
  const initiatives = data?.initiatives || [];

  return (
    <div className="w-full">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Corporate Social Responsibility</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            Giving Back to Pudukkottai & Karaikkudi Communities
          </p>
        </div>
      </section>

      {/* Intro Overview */}
      <section className="py-20 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Graphic */}
            <div className="lg:col-span-5 relative h-[380px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-850">
              <Image
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop"
                alt="Community Support CSR"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/30"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-6 rounded-lg text-white">
                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-1">Our Commitment</span>
                <p className="text-sm font-semibold">Supporting local communities and promoting sustainable infrastructure for rural growth.</p>
              </div>
            </div>

            {/* Right Column Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 text-brand-red">
                <Heart className="h-5 w-5 fill-brand-red" />
                <span className="text-xs uppercase font-bold tracking-wider">Social Impact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {title}
              </h2>
              <p className="text-slate-700 dark:text-slate-350 text-md leading-relaxed text-balance">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-brand-red text-sm font-bold uppercase tracking-widest">
              Community Initiatives
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Sustained Local Action Plans
            </h3>
            <p className="text-slate-650 dark:text-slate-400 text-md">
              We focus on areas where we can make a direct, tangible difference in the lives of rural farmers, school children, and underprivileged families.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((item, index) => {
              const key = item.title.toLowerCase();
              const Icon = csrIconsMap[key] || HelpCircle;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 p-8 rounded-lg space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 rounded-lg bg-brand-red/10 dark:bg-brand-red/5 flex items-center justify-center text-brand-red">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                    {item.description}
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
