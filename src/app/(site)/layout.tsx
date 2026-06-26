import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-grow pt-[84px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
