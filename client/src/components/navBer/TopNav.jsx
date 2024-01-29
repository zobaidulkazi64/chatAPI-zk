'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link'



const NavigationBar = () => {
  const [isScrolled, setScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`bg-blue-500 p-4 flex items-center justify-between ${isScrolled ? 'fixed top-4 w-full' : 'bottom-1'} z-10`}>

      {/* Left Side - Login Button */}
      <div className="flex items-center text-2xl">
        <Link href='/' className="text-white">Logo</Link>
      </div>

      {/* Center - Menu Items (visible for larger screens) */}
      <div className="hidden lg:flex-grow lg:flex lg:items-center lg:justify-center">
        <Link href='/' className="text-white mx-4 cursor-pointer">About</Link>
        <Link href='/' className="text-white mx-4 cursor-pointer">Price</Link>
        <Link href='/' className="text-white mx-4 cursor-pointer">Contacts</Link>
        <Link href='/' className="text-white mx-4 cursor-pointer">Help</Link>
      </div>

      {/* Right Side - Logo and Menu Icon */}
      <div className="flex items-center">

        {/* Logo */}
        <div className="flex items-center text-2xl">
        <Link href='/login' className="text-white">Sign Up</Link>
      </div>
        {/* Menu Icon for Mobile */}
        <button
          onClick={handleMenuToggle}
          className="text-white lg:hidden focus:outline-none"
        >
          {isMenuOpen ? 'Hide' : 'Menu'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          onClick={handleMenuClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
          {/* Mobile Menu Items */}
          <div className="flex flex-col items-center mt-16">
            <Link href='/' className="text-white mb-4 cursor-pointer" onClick={handleMenuClose}>About</Link>
            <Link href='/' className="text-white mb-4 cursor-pointer" onClick={handleMenuClose}>Price</Link>
            <Link href='/' className="text-white mb-4 cursor-pointer" onClick={handleMenuClose}>Contacts</Link>
            <Link href='/' className="text-white mb-4 cursor-pointer" onClick={handleMenuClose}>Help</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
