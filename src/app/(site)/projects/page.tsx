import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch, urlFor } from "@/sanity/client";

const defaultCategoryCards = [
  { label: "Educational Institutions", image: "/images/categories/educational.jpg" },
  { label: "Hospitals", image: "/images/categories/hospitals.jpg" },
  { label: "Hotels & Resorts", image: "/images/categories/hotels.jpg" },
  { label: "Government Buildings", image: "/images/categories/government.jpg" },
  { label: "Individual Houses", image: "/images/categories/houses.jpg" },
  { label: "Commercial Spaces", image: "/images/categories/commercial.jpg" },
];

interface SanityCategory {
  _id: string;
  title: string;
  image?: unknown;
}

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  // Fetch categories from Sanity
  const sanityCategories = await sanityFetch<SanityCategory[]>({
    query: `*[_type == "projectCategory"] | order(title asc) {
      _id,
      title,
      image
    }`,
  });

  const categories = (sanityCategories && sanityCategories.length > 0)
    ? sanityCategories.map((cat) => ({
        label: cat.title,
        image: cat.image ? urlFor(cat.image) : "/images/placeholder.jpg",
      }))
    : defaultCategoryCards;

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif">Our Completed Projects</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            A Legacy of Premium Material Supplies & Construction Works
          </p>
        </div>
      </section>

      {/* Categories Grid Cards Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`/projects/category/${encodeURIComponent(cat.label)}`}
                className="group relative flex flex-col aspect-[4/3] w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-red transition-all duration-500 select-none"
              >
                {/* Image Frame */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-1"
                  />
                  {/* Dark overlay with bottom gradient that becomes richer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent group-hover:from-slate-950/95 transition-all duration-500"></div>
                </div>

                {/* Content Layer (Flex alignment at the bottom) */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8">
                  <div className="space-y-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {/* Decorative tiny top line */}
                    <div className="w-8 h-1 bg-brand-gold rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-75"></div>
                    
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                      {cat.label}
                    </h3>
                    
                    {/* Action CTA that fades/slides in on hover */}
                    <div className="flex items-center text-xs font-bold text-brand-gold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span>Explore Projects</span>
                      <svg
                        className="h-3.5 w-3.5 ml-1.5 transform translate-x-[-4px] group-hover:translate-x-0 transition-transform duration-500 ease-out"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
