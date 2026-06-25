import React from "react";
import { Mail, Phone, Clock, MapPin, Contact, Landmark } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { sanityFetch } from "@/sanity/client";
import { Office } from "@/data/mockData";

interface ContactPageData {
  email: string;
  phonePudukkottai: string;
  phoneKaraikudi: string;
  weekdaysHours: string;
  sundayHours: string;
  offices: Office[];
}

export default async function ContactsPage() {
  const data = await sanityFetch<ContactPageData>({
    query: `*[_type == "contact"][0] { email, phonePudukkottai, phoneKaraikudi, weekdaysHours, sundayHours, offices }`,
  });

  const email = data?.email || "info@mkaruppiah.com";
  const offices = data?.offices || [];
  const weekdaysHours = data?.weekdaysHours || "Mon - Sat: 6:00 AM - 8:00 PM";
  const sundayHours = data?.sundayHours || "Sun: 6:00 AM - 12:00 PM";

  return (
    <div className="w-full">
      {/* Banner / Title Header */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            Reach Out to M. Karuppiah Pudukkottai & Karaikkudi Offices
          </p>
        </div>
      </section>

      {/* Main Form & Contact details section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-brand-red">
                  <Contact className="h-5 w-5" />
                  <span className="text-xs uppercase font-bold tracking-wider">Get in Touch</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                  Office Addresses & Hotlines
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Have questions about custom chainlink fencing manufacturing or wholesale cement/steel supplies? Write to us, call our representatives, or visit our yards directly.
                </p>
              </div>

              {/* Office Addresses list */}
              <div className="space-y-6">
                {offices.map((office, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-6 rounded-lg space-y-3"
                  >
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                      <Landmark className="h-4 w-4 mr-2 text-brand-red" />
                      {office.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-slate-400 shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-brand-gold shrink-0" />
                      <a href={`tel:${office.phone.replace(/\s+/g, "")}`} className="hover:text-brand-red">
                        {office.phone}
                      </a>
                    </p>
                  </div>
                ))}
              </div>

              {/* Office Hours Card */}
              <div className="bg-slate-900 text-white p-6 rounded-lg space-y-4">
                <h4 className="text-md font-bold uppercase tracking-wider text-brand-gold">
                  Business Office Hours
                </h4>
                <div className="space-y-2 text-sm text-slate-300">
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-brand-red shrink-0" />
                    <span>{weekdaysHours}</span>
                  </p>
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-brand-red shrink-0" />
                    <span>{sundayHours}</span>
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center space-x-2 text-xs text-slate-500">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <a href={`mailto:${email}`} className="hover:text-brand-gold">
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
