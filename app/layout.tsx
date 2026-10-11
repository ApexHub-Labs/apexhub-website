import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Providers from "@/components/Providers";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// Public address the site is actually served from. Drives metadataBase, so
// canonical / OG URLs always match the live host (vercel.app today, the real
// domain later). Falls back to the current preview URL if the env is missing.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://apexhub-labs.vercel.app";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

// Only send analytics from the real production deployment. Preview builds and
// local dev stay off even though the env var is present there.
const gaEnabled =
  !!GA_ID &&
  (process.env.NEXT_PUBLIC_VERCEL_ENV
    ? process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ApexHub Labs — Build. Transform. Innovate.",
    template: "%s · ApexHub Labs",
  },
  description:
    "ApexHub Labs is a digital innovation company. We help organizations build their digital presence, create business systems, bring software products to life, and turn innovation into real-world solutions.",
  keywords: [
    "digital innovation",
    "software development",
    "web development",
    "business systems",
    "LMS",
    "CRM",
    "ERP",
    "mobile apps",
    "SaaS",
    "digital transformation",
    "Ethiopia",
    "ApexHub Labs",
  ],
  authors: [{ name: "ApexHub Labs" }],
  creator: "ApexHub Labs",
  applicationName: "ApexHub Labs",
  // Resolved against metadataBase, so the canonical always matches the live
  // host. (Next normalizes the root to the bare origin, no trailing slash.)
  alternates: { canonical: "/" },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ApexHub Labs — Build. Transform. Innovate.",
    description:
      "A digital innovation and transformation partner. We build digital presence, business systems, software products and innovative solutions.",
    siteName: "ApexHub Labs",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "ApexHub Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ApexHub Labs — Build. Transform. Innovate.",
    description:
      "A digital innovation and transformation partner. Build. Transform. Innovate.",
    images: ["/og.svg"],
  },
  icons: {
    icon: [{ url: "/mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/mark.svg" }],
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ApexHub Labs",
  url: SITE_URL,
  slogan: "Build. Transform. Innovate.",
  logo: `${SITE_URL}/logo-light.png`,
  description:
    "Digital innovation company helping organizations build digital presence, business systems, software products and innovative solutions.",
  sameAs: [
    "https://www.linkedin.com/company/apexhub-labs",
    "https://www.facebook.com/apexhublabs",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
      {gaEnabled && GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
