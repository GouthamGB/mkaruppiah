"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "CSR", href: "/csr" },
  { label: "Contact Us", href: "/contacts" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isHomepage = pathname === "/";
  const showScrolledState = isScrolled || !isHomepage;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-350 border-b ${
        showScrolledState
          ? "bg-white/95 shadow-md backdrop-blur-md py-3 border-slate-200/60 dark:border-slate-800"
          : "bg-transparent py-5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-12 w-16 overflow-hidden rounded-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="M. Karuppiah Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-tight transition-colors duration-200 ${
                showScrolledState ? "text-slate-800" : "text-white"
              } group-hover:text-brand-red`}>
                M. KARUPPIAH
              </span>
              <span className={`text-[10px] font-semibold -mt-1 uppercase tracking-wider transition-colors duration-200 ${
                showScrolledState ? "text-slate-500" : "text-slate-200/80"
              }`}>
                Pudukkottai & Karaikkudi
              </span>
            </div>
          </Link>

          {/* Desktop & Mobile Navigation / Menu Section */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation Links (moved to the right) */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2 items-center">
              {navLinks.map((link) => {
                if (link.label === "About Us") {
                  return (
                    <div key={link.href} className="relative group py-2">
                      <div
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium cursor-pointer select-none transition-all duration-200 ${
                          isActive(link.href)
                            ? showScrolledState
                              ? "text-brand-red bg-brand-red/5 font-semibold"
                              : "text-brand-gold bg-white/10 font-semibold"
                            : showScrolledState
                              ? "text-slate-600 hover:text-brand-red hover:bg-slate-50"
                              : "text-slate-100 hover:text-brand-gold hover:bg-white/10"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="h-3.5 w-3.5 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                      </div>
                      
                      {/* Hover Dropdown Menu styled with a golden top border */}
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-slate-900 border-t-4 border-brand-gold rounded-b-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-250 z-50 transform translate-y-2 group-hover:translate-y-0">
                        <div className="py-1">
                          <Link
                            href="/about"
                            className="block px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-red dark:hover:text-brand-red transition-colors"
                          >
                            Company Overview
                          </Link>
                          <Link
                            href="/about/our-strength"
                            className="block px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-red dark:hover:text-brand-red transition-colors"
                          >
                            Our Strength
                          </Link>
                          <Link
                            href="/about/careers"
                            className="block px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-red dark:hover:text-brand-red transition-colors"
                          >
                            Careers
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? showScrolledState
                          ? "text-brand-red bg-brand-red/5 font-semibold"
                          : "text-brand-gold bg-white/10 font-semibold"
                        : showScrolledState
                          ? "text-slate-600 hover:text-brand-red hover:bg-slate-50"
                          : "text-slate-100 hover:text-brand-gold hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Hamburger Menu Button (at the end) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                showScrolledState
                  ? "text-slate-500 hover:text-brand-red hover:bg-slate-100"
                  : "text-white hover:text-brand-gold hover:bg-white/10"
              } focus:outline-none`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Drawer (accessible on all viewport sizes) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-72 h-full bg-white dark:bg-slate-900 shadow-xl p-6 transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="M. Karuppiah Logo"
                width={36}
                height={28}
                className="object-contain"
              />
              <span className="font-bold text-slate-800 dark:text-white">M. KARUPPIAH</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-brand-red"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-3 py-6">
            {navLinks.map((link) => {
              if (link.label === "About Us") {
                return (
                  <div key={link.href} className="flex flex-col space-y-1">
                    <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      About Us
                    </span>
                    <Link
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className={`pl-6 pr-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                        pathname === "/about"
                          ? "text-brand-red bg-brand-red/5"
                          : "text-slate-700 dark:text-slate-300 hover:text-brand-red"
                      }`}
                    >
                      Company Overview
                    </Link>
                    <Link
                      href="/about/our-strength"
                      onClick={() => setIsOpen(false)}
                      className={`pl-6 pr-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                        pathname === "/about/our-strength"
                          ? "text-brand-red bg-brand-red/5"
                          : "text-slate-700 dark:text-slate-300 hover:text-brand-red"
                      }`}
                    >
                      Our Strength
                    </Link>
                    <Link
                      href="/about/careers"
                      onClick={() => setIsOpen(false)}
                      className={`pl-6 pr-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                        pathname === "/about/careers"
                          ? "text-brand-red bg-brand-red/5"
                          : "text-slate-700 dark:text-slate-300 hover:text-brand-red"
                      }`}
                    >
                      Careers
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-brand-red bg-brand-red/5"
                      : "text-slate-750 dark:text-slate-200 hover:text-brand-red"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <a
              href="tel:+919842422046"
              className="flex items-center text-slate-700 dark:text-slate-350 text-sm font-medium"
            >
              <PhoneCall className="h-4 w-4 mr-2 text-brand-gold animate-bounce" />
              <span>+91 98424 22046</span>
            </a>
            <Link
              href="/contacts"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 text-sm font-bold text-white bg-brand-red rounded-md shadow-md hover:bg-brand-red/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
