import React from "react";
import Image from "next/image";
import { Award, Briefcase, Users, History } from "lucide-react";
import { sanityFetch, urlFor } from "@/sanity/client";
import { Director } from "@/data/mockData";

interface AboutPageData {
  history: string;
  directors: Director[];
  awards: string[];
}

export default async function AboutPage() {
  const data = await sanityFetch<AboutPageData>({
    query: `*[_type == "aboutPage"][0] { history, directors, awards }`,
  });

  const historyText = data?.history || "";
  const directors = data?.directors || [];
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

      {/* Board of Directors / Team */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="flex justify-center items-center space-x-2 text-brand-red">
              <Users className="h-5 w-5" />
              <span className="text-xs uppercase font-bold tracking-wider">Leadership Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Board of Directors
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-md">
              Guided by experienced, values-driven leaders who continue our legacy of trust and forward-thinking industry expertise.
            </p>
          </div>

          {/* Directors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directors.map((member, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Portrait Wrapper */}
                <div className="relative h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {member.image && (
                    <Image
                      src={urlFor(member.image)}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-60"></div>
                </div>

                {/* Info Content */}
                <div className="p-6 space-y-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-brand-red text-sm font-semibold flex items-center">
                    <Briefcase className="h-3.5 w-3.5 mr-1.5 text-brand-gold" />
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognitions */}
      {awards.length > 0 && (
        <section className="py-20 bg-white dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="flex justify-center items-center space-x-2 text-brand-red">
                <Award className="h-5 w-5" />
                <span className="text-xs uppercase font-bold tracking-wider">Achievements</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Awards & Recognitions
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-md">
                Recognized across the region for excellence in building materials distribution, real estate partnership, and corporate citizenship.
              </p>
            </div>

            {/* Awards Timeline/List */}
            <div className="max-w-4xl mx-auto space-y-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800 p-6 rounded-lg hover:border-brand-gold/30 transition-all"
                >
                  <div className="h-10 w-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-950 dark:text-white">
                      {award.split(" - ")[0]}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {award.split(" - ")[1] || "Regional recognition for corporate excellence and quality supplies."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
