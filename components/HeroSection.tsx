"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark to-[#1a1510]"
    >
      {/* Decorative gradient overlay instead of an image since photos were skipped */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-dark to-dark"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary font-sans uppercase tracking-[0.3em] font-semibold text-sm md:text-base mb-6"
        >
          RELAX. SIP. ENJOY.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-light mb-10 tracking-wide text-balance leading-tight"
        >
          KSAR AYED <br /> LOUNGE
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 mt-4"
        >
          <a
            href="#menu"
            className="px-10 py-4 border border-primary/50 text-light hover:bg-primary hover:text-dark hover:border-primary transition-all duration-300 font-semibold tracking-wider rounded-sm"
          >
            VIEW MENU
          </a>
          <a
            href="#reservation"
            className="px-10 py-4 bg-primary text-dark hover:bg-primary-dark transition-all duration-300 font-semibold tracking-wider rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            BOOK TABLE
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-light-muted text-xs uppercase tracking-widest mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
