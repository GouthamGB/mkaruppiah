import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Calendar, Building2, User, Maximize2, Layers } from "lucide-react";
import { sanityFetch, urlFor } from "@/sanity/client";

interface Project {
  _id: string;
  id?: string;
  title: string;
  category: string;
  location?: string;
  year?: string;
  image?: unknown;
  description?: string;
  client?: string;
  area?: string;
}

interface ProjectDetailsPageProps {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = params;

  const project = await sanityFetch<Project>({
    query: `*[_type == "projectItem" && (_id == $id || id == $id)][0] { _id, id, title, "category": coalesce(category->title, category), location, year, image, description, client, area }`,
    params: { id },
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-36 pb-20 flex flex-col items-center justify-center">
        <div className="max-w-md text-center space-y-6 px-4">
          <div className="inline-flex h-16 w-16 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-brand-red">
            <Layers className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Project Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {"We couldn't retrieve the details for this project. It might have been deleted or the link is incorrect."}
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-brand-red hover:bg-brand-red/90 shadow-md transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div className="flex items-center">
          <Link
            href={`/projects/category/${encodeURIComponent(project.category)}`}
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-red dark:text-slate-400 transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to {project.category}
          </Link>
        </div>

        {/* Project Title & Category Header */}
        <div className="space-y-4">
          <span className="inline-flex bg-brand-red/10 border border-brand-red/20 text-brand-red px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight max-w-4xl">
            {project.title}
          </h1>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image showcase */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900">
              {project.image ? (
                <Image
                  src={urlFor(project.image)}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <Building2 className="h-20 w-20 text-slate-300 dark:text-slate-700 animate-pulse" />
                </div>
              )}
            </div>

            {/* Description box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Description</h2>
              <p className="text-slate-700 dark:text-slate-300 text-md leading-relaxed whitespace-pre-line text-justify">
                {project.description || (
                  `This completed project represents one of M. Karuppiah Group's key material supplies or infrastructure contributions. We supplied premium structural materials, cement, TMT reinforcement steel, tiles, and fittings to match rigorous industrial standards and construction timelines. Our dedication to superior material grades and logistics support ensured seamless execution and lasting structural integrity.`
                )}
              </p>
            </div>
          </div>

          {/* Right Column: Specification details sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/60 dark:border-slate-800 shadow-md space-y-6 sticky top-28">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                Specifications
              </h3>
              
              <div className="space-y-6">
                {/* Category Spec */}
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 mr-4">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.category}</span>
                  </div>
                </div>

                {/* Location Spec */}
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Location</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.location || "Pudukkottai / Karaikudi, Tamil Nadu"}</span>
                  </div>
                </div>

                {/* Year Completed Spec */}
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mr-4">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Year Completed</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.year || "2024"}</span>
                  </div>
                </div>

                {/* Client Spec */}
                {project.client && (
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 mr-4">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.client}</span>
                    </div>
                  </div>
                )}

                {/* Area Spec */}
                {project.area && (
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mr-4">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Built Area</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.area} sq. ft.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Inquiry CTA */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/contacts"
                  className="block w-full text-center py-3 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Inquire About This Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
