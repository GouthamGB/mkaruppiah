import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Layers } from "lucide-react";
import { sanityFetch, urlFor } from "@/sanity/client";

interface CategoryPageProps {
  params: {
    name: string;
  };
}

export const dynamic = "force-dynamic";

export default async function CategoryProjectsPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.name);

  // Fetch projects belonging to this category
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = await sanityFetch<any[]>({
    query: `*[_type == "projectItem" && coalesce(category->title, category) == $categoryName] | order(year desc) {
      _id,
      id,
      title,
      "category": coalesce(category->title, category),
      image
    }`,
    params: { categoryName },
  });

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif">{categoryName}</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            Portfolio Showcase
          </p>
        </div>
      </section>

      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-red dark:text-slate-400 transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Categories
        </Link>
      </div>

      {/* Projects Grid Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project._id || project.id}
                  href={`/projects/${project._id || project.id}`}
                  className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {project.image ? (
                      <Image
                        src={urlFor(project.image)}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <Layers className="h-10 w-10 text-slate-350 dark:text-slate-650" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300"></div>
                    {/* Category Badge overlay */}
                    <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                      {project.category}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between bg-white dark:bg-slate-900">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors duration-200 leading-snug">
                      {project.title}
                    </h4>
                    <div className="flex items-center text-xs font-bold text-brand-red uppercase tracking-wider mt-4">
                      <span>View Details</span>
                      <svg
                        className="h-3.5 w-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 max-w-2xl mx-auto">
              <Layers className="mx-auto h-12 w-12 text-slate-350 dark:text-slate-650 mb-4 animate-pulse" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">No Projects Found</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We are currently updating our database for {categoryName} projects. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
