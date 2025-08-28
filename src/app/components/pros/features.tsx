// src/components/HeroFeatures.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// --- Data for the features ---
// You can easily update the content or add more features here.
const features = [
  {
    id: 'website',
    name: 'Your Pro Website',
    title: 'Your Professional Website',
    description: 'Get a stunning, no-code website in minutes. Showcase your work and impress clients from the moment they land on your page.',
    visual: '/images/website_demo.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    )
  },
  {
    id: 'scheduling',
    name: 'Smart Scheduling',
    title: 'Effortless 24/7 Bookings',
    description: 'Set your availability and let clients book you online anytime. End the back-and-forth emails and never miss an opportunity.',
    visual: '/images/schedule_demo.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    )
  },
  {
    id: 'ai',
    name: 'AI Social Growth',
    title: 'Effortless Marketing, Real Growth',
    description: 'Simply upload your latest work, and our AI instantly crafts engaging posts. We even run targeted ad campaigns to put your services in front of new local clients.',
    visual: '/images/ai_sm_demo.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
    )
  },
  {
    id: 'messaging',
    name: 'Client Messaging',
    title: 'All Conversations, One Place',
    description: 'Keep every client message, file, and project approval organized and accessible. Say goodbye to scattered communication.',
    visual: '/images/book_demo.png',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    )
  },
];

type FeatureId = 'website' | 'scheduling' | 'ai' | 'messaging';

// --- App Store Links ---
const APPLE_STORE_LINK = "https://apps.apple.com/us/app/voo-pro-百事通店商/id6740048998";
const GOOGLE_PLAY_LINK = "https://play.google.com/store/apps/details?id=dev.voo.providers";
const WEB_APP_LINK = "/signup";

export default function ProsFeatures() {

  const t = useTranslations('PvdPage');
  
  // const services = t.raw('features') as {string:v as { label:string, title: string; description: string }};

  const [activeFeature, setActiveFeature] = useState<FeatureId>('website');
  
  // State for the dynamic Call To Action button
  const [cta, setCta] = useState({
    href: WEB_APP_LINK,
    text: t('hero.ctaWeb'),
    target: '_self'
  });

  // This effect runs only on the client to detect the user's OS
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      setCta({
        href: GOOGLE_PLAY_LINK,
        text: t('hero.ctaGoogle'),
        target: '_blank'
      });
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setCta({
        href: APPLE_STORE_LINK,
        text: t('hero.ctaApple'),
        target: '_blank'
      });
    }
    // If not mobile, the default state for the web app is used.
  }, []);


  const currentFeature = features.find((f) => f.id === activeFeature);

  return (
    <section className="w-full bg-gray-900 text-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Pane: The Promise */}
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8">
              <Link 
                href={cta.href} 
                target={cta.target}
                rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="inline-block bg-green-500 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300"
              >
                {cta.text}
              </Link>
            </div>
          </div>

          {/* Right Pane: The Interactive Showcase */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-2xl">
            {/* Feature Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id as FeatureId)}
                  className={`flex-grow sm:flex-grow-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${
                    activeFeature === feature.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {feature.icon}
                  {t(`features.${feature.id}.label`)}
                </button>
              ))}
            </div>

            {/* Visual and Text Content */}
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeFeature === feature.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {currentFeature && activeFeature === feature.id && (
                    <>
                      <Image
                        src={currentFeature.visual}
                        alt={`${currentFeature.title} mockup`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                        <h3 className="text-xl font-bold text-white">{t(`features.${feature.id}.title`)}</h3>
                        <p className="text-sm text-gray-200 mt-2">{t(`features.${feature.id}.description`)}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}