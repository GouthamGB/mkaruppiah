import React from "react";
import Link from "next/link";
import { ArrowLeft, Quote, Star, ArrowRight, PhoneCall } from "lucide-react";
import { sanityFetch, urlFor } from "@/sanity/client";
import { Testimonial, mockData } from "@/data/mockData";

export const dynamic = "force-static";

export const metadata = {
  title: "Client Testimonials | M. Karuppiah Group",
  description: "Read what satisfied homeowners, builders, and contractors have to say about working with M. Karuppiah Group.",
};

// Site Theme-Accurate Minimalist Avatar Icon
function AvatarIcon() {
  return (
    <div className="w-16 h-16 rounded-full bg-brand-gold/15 dark:bg-brand-gold/20 border-2 border-brand-gold/30 flex items-center justify-center text-brand-blue dark:text-brand-gold shadow-xs">
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
      </svg>
    </div>
  );
}

export default async function TestimonialsPage() {
  // Query testimonials from Sanity CMS, fallback to curated mockData
  const testimonials = await sanityFetch<Testimonial[]>({
    query: `*[_type == "testimonial"] | order(coalesce(orderRank, order, 999) asc, _createdAt asc) {
      _id,
      name,
      quote,
      avatar,
      role,
      location
    }`,
  });

  const list = testimonials && testimonials.length > 0 ? testimonials : mockData.testimonials;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* 1. Signature Hero Banner matching site theme */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-blue/20 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-brand-gold/10 blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="flex justify-center mb-2">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-brand-gold transition-colors py-1 px-3 rounded-full bg-white/5 border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Here&apos;s What Our Clients Have to Say
          </h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            Hear from Satisfied Homeowners, Builders & Contractors
          </p>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed pt-1">
            Over six decades of trusted partnerships in building materials, infrastructure support, and dependable customer relationships.
          </p>
        </div>
      </section>

      {/* 2. Testimonials Cards Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((item, idx) => {
              const avatarUrl = item.avatar ? urlFor(item.avatar) : null;

              return (
                <div
                  key={item._id || item.id || idx}
                  className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Decorative Quote Mark */}
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-gold/15 dark:text-brand-gold/25 group-hover:text-brand-gold/40 transition-colors" />

                  {/* Top Avatar & Stars */}
                  <div>
                    <div className="flex justify-center mb-5">
                      {avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={avatarUrl}
                          alt={item.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold/40 shadow-sm"
                        />
                      ) : (
                        <AvatarIcon />
                      )}
                    </div>

                    {/* 5 Stars */}
                    <div className="flex justify-center items-center gap-1 mb-5 text-brand-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    {/* Quote Content */}
                    <div className="text-center mb-6">
                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-normal">
                        {item.quote}
                      </p>
                    </div>
                  </div>

                  {/* Author / Client Info */}
                  <div className="text-center pt-5 border-t border-slate-100 dark:border-slate-800/80">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight group-hover:text-brand-blue dark:group-hover:text-brand-gold transition-colors">
                      {item.name}
                    </h3>
                    {(item.role || item.location) && (
                      <p className="text-xs font-semibold text-brand-blue dark:text-brand-gold mt-1 uppercase tracking-wider">
                        {item.role}
                        {item.role && item.location && " • "}
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Bottom Call-To-Action Banner matching site theme */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 via-transparent to-brand-gold/15 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Ready to Build Your Next Project with Us?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Get in touch with our team for bulk cement, structural steel, construction materials, and heavy equipment rentals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-slate-950 bg-brand-gold hover:bg-brand-gold/90 rounded-md shadow-lg shadow-brand-gold/25 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <a
              href="tel:+919443312345"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-white border-2 border-brand-blue/70 bg-brand-blue/40 hover:bg-brand-blue hover:border-brand-blue rounded-md backdrop-blur-sm transition-all duration-200"
            >
              <PhoneCall className="mr-2 w-4 h-4 text-brand-gold" />
              <span>Call Pudukkottai Office</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
