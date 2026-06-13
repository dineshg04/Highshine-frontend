import React from 'react'
import { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg"
import { trackNavClick, trackCtaClick } from "../services/analytics";
import { logVisitor , getCountryName } from '../api/axiosapi';

const Navbar = () => {

  const navLinks = [
  { label: "Home", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Industries", href: "#" },
  { label: "About Us", href: "#", active: true },
  { label: "Blogs", href: "#" },
  { label: "Our Works", href: "#" },
  { label: "Contact", href: "#" },
];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   const handleNavLinkClick = (label) => {
    trackNavClick(label);   // GA4 nav_click event
    setMenuOpen(false);
  };

  const handleContactClick = () => {
    // Navbar "Contact Us" is also a CTA — track it as cta_click with location "navbar"
    trackCtaClick({ label: "contact_us", location: "navbar" });
    logVisitor({ page: "/cta-click", referrer: document.referrer || "direct", country: getCountryName() });
  };


  return (
    <>
      <nav
      className={`sticky top-1.5 left-0 right-0 z-50 transition-all duration-300 mx-4  rounded-full pl-4 ${
        scrolled ? "bg-[#0d0b1e]/70  shadow-lg backdrop-blur-sm" : " border-t-4 border-x-0 border-t-brand-gold/20  shadow-lg/30 shadow-brand-gold backdrop-blur-xl  bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-11 h-7  rounded-sm flex items-center justify-center">
            <img src={Logo} alt='highShine logo' className='rounded-sm ' />
          </div>

        <div className='flex flex-col space-y-0 '>
            <span className="text-white font-extrabold text-lg">Highshine</span>
            <span className="text-white font-extrabold text-lg ">IT Solution</span>

        </div>
          
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleNavLinkClick(link.label)}
              className={`hover:text-brand-gold hover:font-medium transition-colors text-lg font-normal  `}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button 
        onClick={handleContactClick}
        className="hidden md:block bg-brand-gold hover:bg-[#f9a006] text-[#0d0b1e] font-semibold text-sm px-5 py-2 rounded-full transition-colors hover:scale-110 hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] ">
          Contact Us
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            {menuOpen ? (
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            ) : (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0b1e]/98 border-t border-purple-900/40 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors ${
                link.active ? "text-[#f5a623] font-semibold" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setMenuOpen(false)}
              onClick={() => handleNavLinkClick(link.label)}
            >
              {link.label}
            </a>
          ))}
          <button onClick={handleContactClick} className="mt-2 bg-[#f5a623] text-[#0d0b1e] font-semibold text-sm px-5 py-2 rounded-full w-full">
            Contact Us
          </button>
        </div>
      )}
    </nav>
    
    </>
  )
}

export default Navbar