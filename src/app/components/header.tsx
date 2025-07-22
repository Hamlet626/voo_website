'use client';

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const t = useTranslations('HomePage');

    const pathname = usePathname();

  //   const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   // This effect runs only on the client, after initial render
  //   setIsClient(true);
  // }, []);
  
  // Define styles for active and inactive links for better readability
  const activeLinkStyle = "text-green-400 font-semibold border-b-2 border-green-400";
  const inactiveLinkStyle = "text-white font-medium hover:text-green-300 transition-colors";

  // Helper to check for active path, works with locales (e.g. /en/providers)
  const isPathActive = (path: string) => pathname.includes(path);
  
    return (
        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 sm:px-16 py-4 z-50">
        <meta name="apple-mobile-web-app-title" content="Voo" />
      {/* Logo & Brand Name */}
        <Link href="/" className="flex items-center space-x-2 drop-shadow-md">
        <Image
          src="/images/app_icon_nobg.svg"
          alt="Voo Logo"
          width={40}
          height={40}
          priority
        />
        <span className="text-2xl font-bold text-green-500 drop-shadow-md">
          {t('appName')}
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-8 ml-auto mr-8 sm:mr-20">
          <Link 
          href="/customers" 
          className={`py-2 ${//isClient && 
            isPathActive('/customers') ? activeLinkStyle : inactiveLinkStyle}`}
        >
          {t('header.customersButton')}
        </Link>
        <Link 
          href="/providers" 
          className={`py-2 ${//isClient && 
            isPathActive('/providers') ? activeLinkStyle : inactiveLinkStyle}`}
        >
          {t('header.helpersButton')}
          </Link>
        </div>
        
        {/* <div className="flex items-center">
          <Link
            href="https://voo-pro.web.app"
            className="px-5 py-2 text-white font-medium rounded-lg border border-white hover:bg-white hover:text-black transition"
          >
            Get Started
          </Link>
        </div> */}
     </header>
    );
  }