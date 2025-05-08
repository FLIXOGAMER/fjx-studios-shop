import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const isActive = (path) => router.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-3xl font-black tracking-tight">FJX</span>
              <span className="ml-2 text-lg font-medium text-gray-600">Studios</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className={`nav-link ${isActive('/') ? 'text-black font-semibold' : 'text-gray-600'}`}>
                Home
              </span>
            </Link>
            <Link href="/products">
              <span className={`nav-link ${isActive('/products') ? 'text-black font-semibold' : 'text-gray-600'}`}>
                Produkte
              </span>
            </Link>
            {/* Weitere Navlinks hier */}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/">
              <div className={`block py-2 ${isActive('/') ? 'font-semibold' : ''}`}>
                Home
              </div>
            </Link>
            <Link href="/products">
              <div className={`block py-2 ${isActive('/products') ? 'font-semibold' : ''}`}>
                Produkte
              </div>
            </Link>
            {/* Weitere Mobile-Links hier */}
          </div>
        )}
      </div>
    </header>
  );
}
