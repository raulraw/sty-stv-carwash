'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ─────────────────────────────────────────────
// StatusPill Component (mutat în afară)
// ─────────────────────────────────────────────
const StatusPill = ({ compact = false, isOpen }: { compact?: boolean; isOpen: boolean }) => (
  <motion.div
    className={`relative rounded-3xl border backdrop-blur-xl shadow-inner overflow-hidden transition-all duration-300 ${
      compact ? 'px-2.5 py-1' : 'px-3 py-1.5'
    } ${
      isOpen
        ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300'
        : 'bg-red-500/10 border-red-400/30 text-red-300'
    }`}
    animate={isOpen ? { scale: [1, 1.015, 1] } : {}}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  >
    {isOpen && (
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        style={{ animation: 'statusWave 3s ease-in-out infinite' }} 
      />
    )}
    
    <div className="flex items-center gap-1.5 relative z-10">
      <div className={`relative rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-red-400'} ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}>
        {isOpen && <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40" />}
      </div>
      <span className={`font-semibold tracking-wider ${compact ? 'text-[11px]' : 'text-xs'}`}>
        {isOpen ? 'Deschis' : 'Închis'}
      </span>
    </div>
  </motion.div>
);

export default function LiquidGlassNavbar() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Desktop scroll transforms
  const maxWidth    = useTransform(scrollY, [0, 300], ['1400px', '860px']);
  const paddingX    = useTransform(scrollY, [0, 300], ['48px', '16px']);
  const textOpacity = useTransform(scrollY, [0, 140], [1, 0]);
  const textMaxWidth   = useTransform(scrollY, [140, 260], ['180px', '0px']);
  const textMarginLeft = useTransform(scrollY, [140, 260], ['12px', '0px']);
  const logoSize    = useTransform(scrollY, [0, 300], [58, 42]);

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const cur = now.getHours() * 60 + now.getMinutes();
      setIsOpen(cur >= 7 * 60 && cur < 23 * 60 + 30);
    };
    checkStatus();
    const iv = setInterval(checkStatus, 60000);
    return () => clearInterval(iv);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => { if (mobileMenuOpen) setMobileMenuOpen(false); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/#servicii',         label: 'Servicii',  icon: '🧼' },
    { href: '/#programe',         label: 'Self-Wash', icon: '✋' },
    { href: '/#serviciu-complet', label: 'Personal',  icon: '🧑‍🔧' },
    { href: '/galerie',          label: 'Galerie',   icon: '📸' },
    { href: '/contact',          label: 'Contact',   icon: '📍' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');
        .nav-brand      { font-family: 'Outfit', sans-serif; }
        .nav-links-font { font-family: 'Nunito', sans-serif; }

        @keyframes statusWave {
          0%   { opacity: 0.4; transform: scale(0.8); }
          50%  { opacity: 0.7; transform: scale(1.15); }
          100% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>

      {/* DESKTOP NAVBAR */}
      <motion.nav
        className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)]"
        style={{ maxWidth }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        role="navigation"
        aria-label="Navigare principală Sty & Stv Carwash"
      >
        <motion.div
          className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[60px] shadow-2xl shadow-black/40"
          style={{ paddingLeft: paddingX, paddingRight: paddingX, paddingTop: '12px', paddingBottom: '12px' }}
          initial={{ scaleX: 0.92, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-[60px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 pointer-events-none rounded-[60px]" />

          <div className="relative flex items-center h-[54px]">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 relative z-10" aria-label="Sty & Stv Carwash - Pagina principală">
              <motion.div style={{ width: logoSize, height: logoSize }} className="relative rounded-3xl overflow-hidden border-2 border-white/30 shadow-inner flex-shrink-0">
                <Image src="/images/logo.jpg" alt="Logo Sty & Stv Carwash Craiova" fill className="object-cover" priority />
              </motion.div>
              <motion.div className="nav-brand flex flex-col leading-none overflow-hidden whitespace-nowrap" style={{ opacity: textOpacity, maxWidth: textMaxWidth, marginLeft: textMarginLeft }}>
                <div className="font-extrabold text-[28px] text-white tracking-wide" style={{ letterSpacing: '-0.5px' }}>
                  ST<span className="text-[#e30613]">Y</span><span className="text-white/50 mx-1 font-light">&amp;</span>ST<span className="text-[#e30613]">V</span>
                </div>
                <div className="text-[#e30613]/90 text-[10.5px] font-bold mt-0.5" style={{ letterSpacing: '5px', fontFamily: "'Outfit', sans-serif" }}>
                  CARWASH
                </div>
              </motion.div>
            </Link>

            {/* Center links */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none" aria-label="Meniu navigare">
              {navLinks.map((link, i) => (
                <motion.div key={i} className="pointer-events-auto" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.05 }}>
                  <Link href={link.href} className="nav-links-font group flex items-center gap-2 px-4 py-2.5 rounded-3xl text-white/85 hover:text-white transition-all duration-300 text-[15.5px] font-semibold whitespace-nowrap relative hover:bg-white/20 active:scale-95">
                    <span className="text-[18px] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" aria-hidden="true">{link.icon}</span>
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Status pill desktop */}
            <div className="flex-shrink-0 ml-auto relative z-10">
              <StatusPill compact isOpen={isOpen} />
            </div>
          </div>
        </motion.div>

        <div className="absolute -inset-px bg-gradient-to-r from-[#e30613]/20 via-transparent to-[#e30613]/20 rounded-[60px] -z-10 blur-2xl opacity-50" aria-hidden="true" />
      </motion.nav>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-3 mt-3 relative"
        >
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[28px] shadow-2xl shadow-black/50 px-4 py-3">
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/8 to-transparent pointer-events-none rounded-[28px]" />
            <div className="absolute -inset-px bg-gradient-to-r from-[#e30613]/15 via-transparent to-[#e30613]/15 rounded-[28px] -z-10 blur-xl opacity-60" />

            <div className="relative flex items-center justify-between">
              {/* Logo + brand */}
              <Link href="/" className="flex items-center gap-3" aria-label="Sty & Stv Carwash">
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/30 shadow-inner flex-shrink-0">
                  <Image src="/images/logo.jpg" alt="Logo Sty & Stv Carwash" fill className="object-cover" priority />
                </div>
                <div className="nav-brand flex flex-col leading-none">
                  <div className="font-extrabold text-[20px] text-white" style={{ letterSpacing: '-0.5px' }}>
                    ST<span className="text-[#e30613]">Y</span>
                    <span className="text-white/40 mx-0.5 font-light text-[16px]">&amp;</span>
                    ST<span className="text-[#e30613]">V</span>
                  </div>
                  <div className="text-[#e30613]/80 text-[8px] font-bold mt-0.5" style={{ letterSpacing: '4px' }}>
                    CARWASH
                  </div>
                </div>
              </Link>

              {/* Right: status + hamburger */}
              <div className="flex items-center gap-2">
                <StatusPill compact isOpen={isOpen} />

                {/* Hamburger */}
                <motion.button
                  onClick={() => setMobileMenuOpen(o => !o)}
                  whileTap={{ scale: 0.88 }}
                  aria-label={mobileMenuOpen ? 'Închide meniu' : 'Deschide meniu'}
                  aria-expanded={mobileMenuOpen}
                  className="relative w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-[5px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl pointer-events-none" />
                  <motion.span
                    className="block w-[18px] h-[1.8px] bg-white rounded-full origin-center"
                    animate={mobileMenuOpen ? { rotate: 45, y: 3.4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    className="block w-[18px] h-[1.8px] bg-white rounded-full"
                    animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block w-[18px] h-[1.8px] bg-white rounded-full origin-center"
                    animate={mobileMenuOpen ? { rotate: -45, y: -3.4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1]"
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mx-3 mt-2"
              >
                <div className="relative bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[24px] shadow-2xl shadow-black/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />
                  <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.6), transparent)' }} />

                  <div className="relative z-10 py-3 px-2">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.25, ease: 'easeOut' }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="nav-links-font flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/85 hover:text-white hover:bg-white/15 active:bg-white/20 transition-all duration-200 text-[16px] font-semibold"
                        >
                          <span className="text-[22px] w-7 text-center" aria-hidden="true">{link.icon}</span>
                          <span>{link.label}</span>
                          <svg className="ml-auto w-4 h-4 text-white/25" fill="none" viewBox="0 0 16 16">
                            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </motion.div>
                    ))}

                    <div className="mx-4 my-2 h-px bg-white/10" />

                    <div className="px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/40 text-[12px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        <span>🕐</span>
                        <span>Program: 07:00 – 23:30</span>
                      </div>
                      <StatusPill isOpen={isOpen} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}