import Image from "next/image";
import Hero from "./components/hero";
import Features from "./components/features";
import ServicesSection from "./components/services";


const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Freelance Services",
  "provider": {
    "@type": "Organization",
    "name": "Your Service App",
    "url": "https://www.yourapp.com",
    "logo": "https://www.yourapp.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-5555",
      "contactType": "customer service",
    },
  },
  "description":
    "Discover a wide range of freelance services including racket stringing, coaching, housekeeping, delivery, nanny, and more.",
};


export default function Home() {
  return (
    <div>
      <Hero/>
      <Features/>

      {/* Services Section */}
      <ServicesSection/>
    </div>
  );
}
