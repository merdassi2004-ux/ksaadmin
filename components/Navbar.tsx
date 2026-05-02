"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Ambiance", href: "#ambiance" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark shadow-md shadow-primary/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="KSAR AYED Logo" className="h-12 w-12 object-contain rounded-full" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-wider hover:text-primary transition-colors text-light-muted"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#reservation"
            className="px-6 py-2 bg-primary text-dark font-semibold tracking-wider hover:bg-primary-dark transition-colors rounded-sm"
          >
            BOOK TABLE
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-light hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-dark-lighter border-t border-white/5 py-4 px-4 flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-center py-2 text-lg hover:text-primary bg-dark/50 rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservation"
              className="block text-center mt-2 px-6 py-3 bg-primary text-dark font-bold tracking-wider rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BOOK TABLE
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
