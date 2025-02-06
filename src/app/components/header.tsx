import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 sm:px-16 py-4 z-50">
        <meta name="apple-mobile-web-app-title" content="Voo" />
      {/* Logo & Brand Name */}
        <div className="flex items-center space-x-2 drop-shadow-md">
          {/* Icon */}
          <Image
          src="/images/app_icon_nobg.svg"
          alt="Voo Logo"
          width={40}
          height={40}
          priority
          />
          <span className="text-2xl font-bold text-green-500 drop-shadow-md">
          Voo
        </span>
        </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 ml-auto mr-8 sm:mr-20">
          <Link href="#customer-features" className="text-white font-medium hover:underline">
            Customers
          </Link>
          <Link href="#provider-features" className="text-white font-medium hover:underline">
            Helpers
          </Link>
        </div>
        
        <div className="flex items-center">
          <Link
            href="https://voo-pro.web.app"
            className="px-5 py-2 text-white font-medium rounded-lg border border-white hover:bg-white hover:text-black transition"
          >
            Get Started
          </Link>
        </div>
     </header>
    );
  }