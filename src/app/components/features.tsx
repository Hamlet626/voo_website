'use client';

import dynamic from 'next/dynamic';
// import { motion } from 'framer-motion'
// import { Users, Briefcase } from 'lucide-react'
import cusAnimation from '../../../public/lottie/customer_website.json';
import pvdAnimation from '../../../public/lottie/helper_website.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const featuresCustomers = [
  { title: 'Transparent Pricing & Availability', description: 'View prices, check availability, and book helpers that best fit your budget and schedule. No surprises, just straightforward pricing and hassle-free scheduling.' },
  { title: 'Explore Profiles & Reviews', description: "Get to know your helper before booking. Each profile includes details about their skills, experience, and services. Plus, customer reviews and ratings help you make an informed choice, ensuring you're choosing the right person for the job." },
  { title: 'Effortless Booking Process', description: "Our booking system is simple and efficient. Once you book, you can edit your appointment and wait for final approval before confirmation, ensuring everything is perfect." },
]

const featuresProviders = [
  { title: 'Share Your Personal Profile Link', description: "Easily showcase your skills and services with a personalized link, making it simple for customers to book and for you to track all your bookings in one place." },
  { title: 'Manage Your Time with Ease', description: 'Keep track of your scheduled jobs and block out availability directly from your calendar. Our platform keeps you organized so you can focus on delivering great service.' },
  { title: 'Guaranteed & Secure Payments', description: 'Payments are collected in advance, providing smooth experience and reliability for your work. No delays, no worries—just fast, hassle-free payouts you can trust.' },
]

// Reusable Feature Item
const FeatureItem = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
    <h3 className="text-2xl font-semibold text-green-600 mb-3">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const Feature = ({ id, title, description, features, animationData, reverse = false }: 
  { id:string, title: string, description: string, features:{title:string,description:string}[], animationData: any, reverse?: boolean }) => {
    return (
      <section id={id} className="relative py-20 bg-gradient-to-r from-green-50 to-green-100 rounded-t-[50px] shadow-lg -mt-16" >
      <h2 className="text-4xl font-bold text-center text-green-700 mb-16">{title}</h2>

      <div
        className={`container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 gap-12 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Feature List */}
        <div className="md:w-1/2 space-y-6">
          {features.map((feature, index) => (
            <FeatureItem key={index} title={feature.title} description={feature.description} />
          ))}
        </div>

        {/* Lottie Animation with floating effect */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md transform transition duration-500 hover:scale-110">
            <Lottie animationData={animationData} loop autoplay />
          </div>
        </div>
      </div>
    </section>
    );
  };
  
  const FeaturesSection = () => {
    return (
      <>
      <Feature id='customer-features'
      title="Grow Your Business, Easily and Securely" 
      description="Helping others has never been easier or more rewarding. With Voo, you can grow your business, stay organized, and get paid quickly and securely." 
      features={featuresProviders} animationData={pvdAnimation} reverse/>
      <Feature id='provider-features'
      title="Find the Help You Need, Whenever You Need It" 
      description="At Voo, we make it easy for you to connect with reliable and skilled helpers in your area. Whether you need a coach, a cleaner, or any other service, you’ll find the perfect fit."
       features={featuresCustomers} animationData={cusAnimation}/>
      </>
    );
  };

  export default FeaturesSection;