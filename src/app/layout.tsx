import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";


const app_description = `
Voo Pro – Grow Your Service Business with Ease!
Voo Pro is the ultimate app for service providers looking to expand their business and connect with customers effortlessly. Whether you're a cleaner, handyman, coach, plumber, electrician, or car mechanic, Voo Pro helps you manage bookings, receive secure payments, and grow your client base—all in one place.

Why Choose Voo Pro?

✅ Get More Clients – Join a thriving marketplace where customers are actively searching for your services.

✅ Your Own Website – Instantly get a personalized website link to showcase your services, prices, and customer reviews. Share it anywhere to attract more clients!

✅ Easy Scheduling – Manage appointments, accept or decline bookings, and set your availability in just a few taps.

✅ Secure Payments – Receive payments seamlessly with multiple payment options, ensuring hassle-free transactions.

✅ Real-Time Chat – Communicate with clients instantly to discuss details, pricing, and custom requests.

✅ Boost Your Earnings – Set your own rates, offer special deals, and maximize your income with flexible pricing.

✅ Manage Your Profile – Build a professional profile with ratings and customer reviews to stand out from the competition.

Start Earning Today!

Download Voo Pro now and take your service business to the next level. Join thousands of professionals who are already growing their customer base and boosting their income with Voo Pro!

🚀 Sign up, get booked, and grow your business today!
`;

export const metadata: Metadata = {
  title: "Voo  Your Go-To Service Providers | Find Freelance Services Easily",
  description: app_description,
  keywords: [
    "Voo",
    "Service Providers",
    "Freelance Services",
    "Booking App",
    "Payment Processing",
    "Customer Communication",
    "Earnings Boost",
    "Professional Profiles",
    "Grow Your Business",
    "Service Marketplace",
    "Online Booking",
    "Secure Payments",
    "Customer Reviews",
    "Earn More",
    "service","marketplace",
    "booking","pay","management",
    "business","handyman",
    "local","cleaning","coach",
    "housekeep","repair"
  ],
  icons:{
    icon: [
      {
        url: "/images/app_icon_nobg.svg", 
        href: "/images/app_icon_nobg.svg", 
      },
    ],
  },
  openGraph: {
    title: "Voo  Your Go-To Service Providers | Find Freelance Services Easily",
    description: app_description,
    url: "https://voo-pro.web.app", // Replace with your actual app URL
    siteName: "Voo -- Your Service & Business App",
    images: [
      {
        url: "/images/app_icon.png", // Add an appropriate image
        width: 630,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle", // Add your Twitter handle
    title: "Voo Your Go-To Service Providers | Find Freelance Services Easily",
    description: app_description,
    images: "/images/app_icon.png", // Add an appropriate image
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
