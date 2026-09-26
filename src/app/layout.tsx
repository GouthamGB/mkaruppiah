import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "M. Karuppiah | Building Materials & Construction Solutions",
  description: "Established in 1964, M. Karuppiah Group is a trusted partner for quality building materials, cement, steel, bricks, paints, fuels, and complete construction solutions in Pudukkottai & Karaikkudi.",
  keywords: "M. Karuppiah, Pudukkottai, Karaikkudi, Building Materials, Cement, Steel, Tiles, Granites, Sanitaryware, Paints, Chainlink Fencing, Fuels, Construction, Real Estate",
  metadataBase: new URL("https://www.mkaruppiah.com"),
  openGraph: {
    title: "M. Karuppiah | Building Materials & Construction Solutions",
    description: "Your trusted partner for quality building materials, strong relationships, and complete construction solutions in Pudukkottai & Karaikkudi.",
    url: "https://www.mkaruppiah.com",
    siteName: "M. Karuppiah Group",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "M. Karuppiah Group Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <head>
        {/* Preconnect to Sanity CDN & External CDNs for Instant Asset Handshakes */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white selection:bg-brand-gold/30 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
