import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="flex-grow pt-[84px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
