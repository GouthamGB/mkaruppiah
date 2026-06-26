"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Clock, Calendar, ShieldCheck } from "lucide-react";
import { mockData } from "@/data/mockData";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-900">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="M. Karuppiah Logo"
                width={40}
                height={32}
                className="object-contain bg-white p-0.5 rounded-sm"
              />
              <div className="flex flex-col">
                <span className="text-md font-bold tracking-tight text-white">M. KARUPPIAH</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider -mt-1">
                  Pudukkottai & Karaikkudi
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed text-balance">
              M. Karuppiah Group is a trusted partner serving the construction, infrastructure, agriculture, and energy sectors for over six decades.
            </p>
            <div className="flex space-x-4 items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 border border-slate-800">
                <span className="text-brand-gold text-lg font-bold">60+</span>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Years Experience</h4>
                <p className="text-sm font-bold text-white">Trusted Industry Legacy</p>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white text-md font-bold tracking-wide uppercase mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-red">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-red transition-colors duration-200">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-red transition-colors duration-200">
                  About Us & History
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-red transition-colors duration-200">
                  Our Completed Projects
                </Link>
              </li>
              <li>
                <Link href="/csr" className="hover:text-brand-red transition-colors duration-200">
                  CSR Initiatives
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-brand-red transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Offices & Contacts Column */}
          <div>
            <h3 className="text-white text-md font-bold tracking-wide uppercase mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-red">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block mb-0.5">Pudukkottai Office:</span>
                  <span className="text-slate-400 text-xs leading-relaxed">
                    {mockData.contact.offices[0].address}
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block mb-0.5">Karaikkudi Office:</span>
                  <span className="text-slate-400 text-xs leading-relaxed">
                    {mockData.contact.offices[1].address}
                  </span>
                </div>
              </li>
              <li className="flex items-center space-x-3 border-t border-slate-900 pt-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <a href={`mailto:${mockData.contact.email}`} className="hover:text-brand-red text-xs">
                  {mockData.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours Column */}
          <div>
            <h3 className="text-white text-md font-bold tracking-wide uppercase mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-red">
              Office Hours
            </h3>
            <div className="space-y-4 text-sm bg-slate-900/40 border border-slate-900 p-4 rounded-md">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-brand-gold shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Weekdays</h4>
                  <p className="text-xs text-slate-400">{mockData.contact.officeHours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-brand-gold shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Sundays</h4>
                  <p className="text-xs text-slate-400">{mockData.contact.officeHours.sunday}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2 border-t border-slate-800 text-[11px] text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Open Early for Contractors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Sub-footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} M. Karuppiah Group. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/studio" className="hover:text-brand-red transition-colors flex items-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
              Admin Studio
            </Link>
            <span>•</span>
            <span className="text-slate-600">Pudukkottai & Karaikkudi, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
