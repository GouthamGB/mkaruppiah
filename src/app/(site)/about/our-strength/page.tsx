import React from "react";
import Image from "next/image";
import { Briefcase } from "lucide-react";
import { sanityFetch, urlFor } from "@/sanity/client";
import { Director } from "@/data/mockData";

export const metadata = {
  title: "Our Strength | M. Karuppiah Group",
  description: "Learn about the core pillars of strength, legacy of trust, logistics excellence, and quality standards that make M. Karuppiah Group the preferred choice for construction supplies.",
};

interface OurStrengthPageData {
  directors: Director[];
}

export const dynamic = "force-dynamic";

export default async function OurStrengthPage() {
  const data = await sanityFetch<OurStrengthPageData>({
    query: `*[_type == "aboutPage"][0] { directors }`,
  });

  const directors = data?.directors || [];

  return (
    <div className="w-full">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-red/10 blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Our Strength</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest max-w-2xl mx-auto">
            Guided by Experienced, Values-Driven Leadership
          </p>
        </div>
      </section>

      {/* Board of Directors / Team - Styled with Title "Our Strength" */}
      {directors.length > 0 && (
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
      )}
    </div>
  );
}
