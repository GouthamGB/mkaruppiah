"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, CalendarDays, Layers } from "lucide-react";
import { ProjectItem } from "@/data/mockData";
import { urlFor } from "@/sanity/client";

interface ProjectsGalleryProps {
  initialProjects: ProjectItem[];
}

const categories = [
  "All",
  "Educational Institutions",
  "Hospitals",
  "Hotels & Resorts",
  "Government Buildings",
  "Individual Houses",
  "Commercial Spaces",
];

export default function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Tabs Menu */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${
              activeCategory === cat
                ? "bg-brand-red text-white shadow-md hover:bg-brand-red/90"
                : "bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-brand-red hover:border-brand-red/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                {project.image && (
                  <Image
                    src={urlFor(project.image)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                )}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300"></div>
                {/* Category Badge overlay */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors">
                  {project.title}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5 text-brand-red shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1.5 text-brand-gold shrink-0" />
                    <span>Completed {project.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
          <Layers className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">No Projects Found</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            We are currently updating our database for {activeCategory} supplies.
          </p>
        </div>
      )}
    </div>
  );
}
