import React from "react";

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="w-full max-w-4xl h-32 bg-slate-100 rounded-xl mb-8"></div>
      
      {/* Grid Content Skeleton */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 bg-slate-100 rounded-lg"></div>
        <div className="h-64 bg-slate-100 rounded-lg"></div>
        <div className="h-64 bg-slate-100 rounded-lg"></div>
      </div>
    </div>
  );
}
