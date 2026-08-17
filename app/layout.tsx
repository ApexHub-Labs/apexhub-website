import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const SITE_URL = "https://apexhublabs.com";

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
  alternates: { canonical: "/" },
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
    </html>
  );
}
