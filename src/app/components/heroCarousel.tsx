"use client"
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './HeroCarousel.module.css';
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";



const AppEntry=({text,playLink,appleLink, isPvd}:{text: string, playLink: string, appleLink: string, isPvd:boolean})=>{
// {/* Store Buttons */}
    const t = useTranslations('HomePage');
const buttonStyle=`flex items-center gap-3 px-5 py-3 ${isPvd?'bg-gray-500':'bg-gray-300'} ${isPvd?'text-gray-200':'text-black'} font-semibold rounded-lg shadow-md hover:bg-gray-400 transition text-lg`;
  return <>
    <p className="text-gray-300 mt-8 text-lg">
          {text+' →'}
        </p>
    <div className="flex gap-4 mt-2">
      {/* Google Play Button */}
      <Link href={playLink} target="_blank">
        <button className={buttonStyle}>
          <Image
            src="/images/playstore.svg"
            alt="Google Play"
            width={28}
            height={28}
          />
          {t('googlePlay')}
        </button>
      </Link>

      {/* Apple Store Button */}
      <Link href={appleLink} target="_blank">
        <button className={buttonStyle}>
          <Image
            src="/images/applestore.svg"
            alt="Apple Store"
            width={28}
            height={28}
          />
          {t('appleStore')}
        </button>
      </Link>
    </div>
  </>
}



const HeroCarousel = ()=>{
  // State to manage the index of the currently displayed content block.
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  // useRef to store the carousel interval ID, allowing it to be cleared.
  const intervalRef = useRef<number | null>(null);

  // Function to start the automatic content carousel.
  // It clears any existing interval before setting a new one.
  const startCarousel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      // Cycle through content blocks
      setCurrentContentIndex(prevIndex => (prevIndex + 1) % contentBlocks.length);
    }, 10000); // Content changes every 10 seconds
  }, []);

  // Function to stop the automatic content carousel.
  const stopCarousel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Function to update the displayed content based on the URL hash.
  // If a valid hash is found, it sets the content and stops the carousel.
  // Otherwise, it starts (or resumes) the carousel.
  const updateContentBasedOnHash = useCallback(() => {
    const hash = window.location.hash.substring(1); // Get hash without '#'
    const matchedIndex = contentBlocks.findIndex(block => block.hash === hash);

    if (matchedIndex !== -1) {
      // If a valid hash is found, display that content and stop the carousel.
      setCurrentContentIndex(matchedIndex);
      stopCarousel();
    } else {
      // If no valid hash, start/resume the carousel.
      startCarousel();
    }
  }, [startCarousel, stopCarousel]);

  // Effect hook to handle initial load and hash changes.
  useEffect(() => {
    // Call on component mount to set initial content.
    updateContentBasedOnHash();

    // Add event listener for 'hashchange' to react to URL hash changes.
    window.addEventListener('hashchange', updateContentBasedOnHash);

    // Cleanup function: remove event listener and stop carousel when component unmounts.
    return () => {
      window.removeEventListener('hashchange', updateContentBasedOnHash);
      stopCarousel();
    };
  }, [updateContentBasedOnHash, stopCarousel]); // Dependencies for useEffect

    
  const t = useTranslations('HomePage');
  const contentBlocks = [
    {
        id: 'customer',
        hash: 'customerApp',
        heading: t('customer.heading'),
        body: t('customer.body'),
        tagline: t('customer.tagline'),
        appEntryProps: {
            text: t('customer.appEntry'),
            playLink: 'https://play.google.com/store/apps/details?id=dev.voo.customers',
            appleLink: 'https://apps.apple.com/us/app/百事通-您需要的生活服务/id6747854851',
            isPvd: false
        }
    },
    {
        id: 'provider',
        hash: 'providerApp',
        heading: t('provider.heading'),
        body: t('provider.body'),
        tagline: t('provider.tagline'),
        appEntryProps: {
            text: t('provider.appEntry'),
            playLink: 'https://play.google.com/store/apps/details?id=dev.voo.providers',
            appleLink: 'https://apps.apple.com/us/app/voo-pro-百事通店商/id6740048998',
            isPvd: true
        }
    }
  ];

  // Get the current content block to display based on the state.
  const currentContent = contentBlocks[currentContentIndex];

  return <>
  <div className={'absolute left-8 sm:left-32 top-1/2 -translate-y-1/2 pl-0 w-[90%] sm:w-1/3 sm:min-w-[500px] text-white drop-shadow-md '}>
    <AnimatePresence mode="wait">
        <motion.div
          key={currentContent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        //   className="text-center"
        >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          {currentContent.heading}
        </h1>
        <p className="text-base sm:text-xl mb-4 sm:mb-8 text-gray-200">
          {currentContent.body}
        </p>

        {/* Optional Tagline */}
        {currentContent.tagline && (
          <p className="text-sm sm:text-md italic mt-2 mb-8 sm:mb-16 text-gray-400">
            {currentContent.tagline}
          </p>
        )}

        {/* Conditional rendering for CTA buttons or AppEntry component */}
        <AppEntry {...currentContent.appEntryProps} />
        </motion.div>
        </AnimatePresence>
      </div>

      {/* Visual indicators for carousel position - now linear progression bars */}
      <div className="absolute bottom-8 left-8 sm:left-32 w-[90%] sm:w-1/3 sm:min-w-[500px] flex space-x-3 z-20">
        {contentBlocks.map((_, index) => (
          <button
            key={index}
            // Outer container for the bar, defines its static size and background
            className="w-full h-2.5 rounded-full bg-gray-700 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => {
              setCurrentContentIndex(index); // Set content to clicked slide
              stopCarousel(); // Stop automatic carousel
              window.location.hash = contentBlocks[index].hash; // Update URL hash
            }}
            aria-label={`Show ${contentBlocks[index].id} content`}
          >
            {/* Inner div for the progress fill */}
            <div
              className={`absolute top-0 left-0 h-full bg-green-500 rounded-full
                ${index === currentContentIndex
                  ? (intervalRef.current ? styles.progressFill : 'w-full') // Active: animate if autoplay, else full
                  : 'w-0' // Inactive: no fill
                }`}
              // Ensure instant fill on click if not autoplaying (override animation if present)
              style={index === currentContentIndex && !intervalRef.current ? { width: '100%', transition: 'none' } : {}}
            ></div>
          </button>
        ))}
      </div>
      </>;
}

export default HeroCarousel