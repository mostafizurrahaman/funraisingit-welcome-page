import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://funraisingit.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00A3A6" },
    { media: "(prefers-color-scheme: dark)", color: "#008F91" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FunRaisingIt — Coming Soon | 100% Free VIP Founding Member Access",
    template: "%s | FunRaisingIt",
  },
  description:
    "FunRaisingIt is getting ready. Join our early access waitlist to claim your 100% Free VIP Founding Member status, priority launch access, and special networking invitations.",
  keywords: [
    "FunRaisingIt",
    "fundraising",
    "VIP founding member",
    "early access waitlist",
    "crowdfunding platform",
    "community fundraising",
    "creator campaigns",
    "launching soon",
    "100% free VIP upgrade",
  ],
  authors: [{ name: "FunRaisingIt Team", url: siteUrl }],
  creator: "FunRaisingIt",
  publisher: "FunRaisingIt",
  applicationName: "FunRaisingIt",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FunRaisingIt",
    title: "FunRaisingIt — Coming Soon | 100% Free VIP Founding Member Access",
    description:
      "Be the first to experience FunRaisingIt. Secure your spot on the early access waitlist and unlock exclusive 100% Free VIP Founding perks.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "FunRaisingIt - Coming Soon VIP Founding Access",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FunRaisingIt — Coming Soon | 100% Free VIP Founding Member Access",
    description:
      "Be the first to experience FunRaisingIt. Secure your spot on the early access waitlist and unlock exclusive 100% Free VIP Founding perks.",
    images: ["/logo.png"],
    creator: "@FunRaisingIt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "FunRaisingIt",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "FunRaisingIt",
      description:
        "FunRaisingIt is getting ready. Join our early access waitlist to claim your 100% Free VIP Founding Member upgrade.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: "1rem",
            },
          }}
        />
      </body>
    </html>
  );
}
