import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anand's Dry Cleaners & Laundries — Care Beyond Clean",
  description:
    "Premium dry cleaning and laundry services with exceptional care, craftsmanship, and attention to detail. Experience the transformation of every garment with Anand's.",
  keywords: [
    "dry cleaning",
    "laundry",
    "premium",
    "garment care",
    "Anand's",
    "stain removal",
    "professional cleaning",
  ],
  openGraph: {
    title: "Anand's Dry Cleaners & Laundries",
    description: "Care Beyond Clean — Premium dry cleaning and laundry services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@300,400,500,600,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-body overflow-x-hidden">{children}</body>
    </html>
  );
}
