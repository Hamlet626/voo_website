import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";


export const metadata: Metadata = {
  title: "Your Go-To Service Providers | Find Freelance Services Easily",
  description:
    "Discover a wide range of freelance services including racket stringing, coaching, housekeeping, delivery, nanny, and much more. Find trusted professionals for your needs.",
  openGraph: {
    title: "Your Go-To Service Providers | Find Freelance Services Easily",
    description:
      "Discover a wide range of freelance services including racket stringing, coaching, housekeeping, delivery, nanny, and much more. Find trusted professionals for your needs.",
    url: "https://www.yourapp.com", // Replace with your actual app URL
    siteName: "Your Service App",
    images: [
      {
        url: "/images/og-image.jpg", // Add an appropriate image
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle", // Add your Twitter handle
    title: "Your Go-To Service Providers | Find Freelance Services Easily",
    description:
      "Discover a wide range of freelance services including racket stringing, coaching, housekeeping, delivery, nanny, and much more. Find trusted professionals for your needs.",
    images: "/images/og-image.jpg", // Add an appropriate image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900">

        <main>{children}</main>

        <Footer/>
      </body>
    </html>
  );
}
