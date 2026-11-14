import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Providers from "@/components/Providers";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const TITLE = "ApexHub Labs — Websites and business systems for US businesses";
const DESCRIPTION =
  "ApexHub Labs builds websites and business systems for US businesses, from Addis Ababa. See our work for American Prep Academy, a US K-12 tutoring provider.";

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
    default: TITLE,
    template: "%s · ApexHub Labs",
  },
  description: DESCRIPTION,
  keywords: [
    "websites for US businesses",
    "business systems",
    "software development",
    "web development",
    "learning platform",
    "client portal",
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
  // Resolved against metadataBase. (Next normalizes the root to the bare
  // origin, no trailing slash.)
  alternates: { canonical: "/" },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "ApexHub Labs",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "ApexHub Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
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
    <html
      lang="en"
      className={montserrat.variable}
      // Keeps in-page anchor scrolling smooth while route changes (home ↔ case
      // study) jump straight to the top, as Next did by default before v16.
      data-scroll-behavior="smooth"
    >
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
