import React from "react";
import { Building2 } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";
import { sanityFetch } from "@/sanity/client";
import { ProjectItem } from "@/data/mockData";

export default async function ProjectsPage() {
  const projects = await sanityFetch<ProjectItem[]>({
    query: `*[_type == "projectItem"] | order(year desc) { id, title, category, location, year, image }`,
  });

  return (
    <div className="w-full">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Our Completed Projects</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            A Legacy of Premium Material Supplies & Construction Works
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="flex justify-center items-center space-x-2 text-brand-red">
              <Building2 className="h-5 w-5" />
              <span className="text-xs uppercase font-bold tracking-wider">Project Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Supplies and Infrastructure
            </h2>
            <p className="text-slate-650 dark:text-slate-400 text-md">
              We have proudly supplied premium bricks, cement, steel, tiles, and fittings to prominent government buildings, hospitals, schools, and private villa projects across Karaikkudi and Pudukkottai.
            </p>
          </div>

          {/* Interactive Gallery */}
          <ProjectsGallery initialProjects={projects} />
        </div>
      </section>
    </div>
  );
}
