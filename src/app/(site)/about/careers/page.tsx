"use client";

import React from "react";
import { Sparkles, Heart, ShieldCheck } from "lucide-react";

const perks = [
  {
    icon: ShieldCheck,
    title: "Legacy & Stability",
    description: "Be part of a brand that has earned regional trust for over 60 years. We offer secure, long-term careers and professional stability.",
  },
  {
    icon: Heart,
    title: "Positive Work Culture",
    description: "We treat our employees like family. Work in a supportive environment that prioritizes safety, respect, and work-life balance.",
  },
  {
    icon: Sparkles,
    title: "Growth Opportunities",
    description: "We promote from within. Gain experience across our diverse business verticals: retail, distribution, manufacturing, and real estate.",
  },
];

export default function CareersPage() {
  return (
    <div className="w-full">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-red/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Careers & Opportunities</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest max-w-2xl mx-auto">
            Join the Legacy. Shape the Future of Pudukkottai & Karaikkudi
          </p>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="py-20 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-brand-red text-sm font-bold uppercase tracking-widest">Life at M. Karuppiah</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {"Why You'll Love Working Here"}
            </h3>
            <p className="text-slate-650 dark:text-slate-400 text-md">
              We believe our employees are our greatest strength. Our legacy of 60+ years is built on their loyalty, hard work, and technical expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-905 border border-slate-200/40 dark:border-slate-800 p-8 rounded-lg space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-905 dark:text-white">{perk.title}</h4>
                  <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">{perk.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
