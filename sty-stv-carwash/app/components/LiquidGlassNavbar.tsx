'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LiquidGlassNavbar() {
  const [isDark, setIsDark] = useState(true);
  const { scrollY } = useScroll();

  const maxWidth = useTransform(scrollY, [0, 300], ['1400px', '860px']);
  const paddingX = useTransform(scrollY, [0, 300], ['48px', '16px']);

  const textOpacity = useTransform(scrollY, [0, 140], [1, 0]);
  const textMaxWidth = useTransform(scrollY, [140, 260], ['180px', '0px']);
  const textMarginLeft = useTransform(scrollY, [140, 260], ['12px', '0px']);

  const logoSize = useTransform(scrollY, [0, 300], [58, 42]);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { href: '#servicii', label: 'Servicii',  icon: '🧼' },
    { href: '#selfwash', label: 'Self-Wash', icon: '✋' },
    { href: '#preturi',  label: 'Prețuri',   icon: '💰' },
    { href: '#galerie',  label: 'Galerie',   icon: '📸' },
    { href: '#contact',  label: 'Contact',   icon: '📍' },
  ];

  return (
    <>
      {/*
        Font frumos: Outfit pentru brand + linkuri (geometric, curat, modern),
        Nunito pentru subtext (rotunjit, lizibil).
        Ambele gratuite pe Google Fonts — SEO friendly, no render blocking cu display=swap.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');
        .nav-brand { font-family: 'Outfit', sans-serif; }
        .nav-links-font { font-family: 'Nunito', sans-serif; }
      `}</style>

      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)]"
        style={{ maxWidth }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        /* SEO: rol de navigatie principal */
        role="navigation"
        aria-label="Navigare principală Sty & Stv Carwash"
      >
        <motion.div
          className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[60px] shadow-2xl shadow-black/40"
          style={{
            paddingLeft: paddingX,
            paddingRight: paddingX,
            paddingTop: '12px',
            paddingBottom: '12px',
          }}
          initial={{ scaleX: 0.92, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Liquid Glass layere */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-[60px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 pointer-events-none rounded-[60px]" />

          {/*
            Container cu pozitie relativa — linkurile sunt absolute centrate
            fata de INTREGUL navbar, nu fata de spatiul flexbox ramas.
            Astfel nu se misca niciodata, indiferent de animatia capetelor.
          */}
          <div className="relative flex items-center h-[54px]">

            {/* ── LEFT: Logo + Text ── */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 relative z-10"
              aria-label="Sty & Stv Carwash - Pagina principală"
            >
              <motion.div
                style={{ width: logoSize, height: logoSize }}
                className="relative rounded-3xl overflow-hidden border-2 border-white/30 shadow-inner flex-shrink-0"
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Logo Sty & Stv Carwash Craiova"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              <motion.div
                className="nav-brand flex flex-col leading-none overflow-hidden whitespace-nowrap"
                style={{
                  opacity: textOpacity,
                  maxWidth: textMaxWidth,
                  marginLeft: textMarginLeft,
                }}
              >
                {/* Font marit + letter-spacing mai mare = lizibilitate maxima */}
                <div className="font-extrabold text-[28px] text-white tracking-wide" style={{ letterSpacing: '-0.5px' }}>
                  ST<span className="text-[#e30613]">Y</span>
                  <span className="text-white/50 mx-1 font-light">&amp;</span>
                  ST<span className="text-[#e30613]">V</span>
                </div>
                <div
                  className="text-[#e30613]/90 text-[10.5px] font-bold mt-0.5"
                  style={{ letterSpacing: '5px', fontFamily: "'Outfit', sans-serif" }}
                >
                  CARWASH
                </div>
              </motion.div>
            </Link>

            {/*
              ── CENTER: Linkuri ABSOLUT centrate ──
              position: absolute, left: 50%, transform: translateX(-50%)
              => centrate fata de latimea totala a navbar-ului.
              pointer-events: none pe container, auto pe fiecare link individual
              ca sa nu blocheze click-urile pe logo/switch din spate.
              Rezultat: linkurile NU SE MISCA niciodata, indiferent de animatie.
            */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none"
              aria-label="Meniu navigare"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={i}
                  className="pointer-events-auto"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="nav-links-font group flex items-center gap-2 px-4 py-2.5 rounded-3xl text-white/85 hover:text-white transition-all duration-300 text-[15.5px] font-semibold whitespace-nowrap relative hover:bg-white/20 active:scale-95"
                  >
                    <span
                      className="text-[18px] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
                      aria-hidden="true"
                    >
                      {link.icon}
                    </span>
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-3xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-10" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* ── RIGHT: Theme Switch ── */}
            <div className="flex-shrink-0 ml-auto relative z-10">
              <motion.button
                className="relative w-[72px] h-[38px] bg-white/15 border border-white/30 rounded-full flex items-center p-[3px] cursor-pointer backdrop-blur-xl shadow-inner hover:bg-white/25 transition-colors duration-200"
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isDark ? 'Activează modul luminos' : 'Activează modul întunecat'}
                aria-pressed={!isDark}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#e30613]/10 via-transparent to-white/10 rounded-full pointer-events-none" />
                <motion.div
                  className="w-8 h-8 rounded-2xl shadow-xl flex items-center justify-center border border-white/40 relative z-10 flex-shrink-0"
                  animate={{
                    x: isDark ? 30 : 0,
                    backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                >
                  <motion.span
                    animate={{ rotate: isDark ? 0 : 180 }}
                    transition={{ duration: 0.4 }}
                    className="text-[18px] leading-none"
                    aria-hidden="true"
                  >
                    {isDark ? '🌙' : '☀️'}
                  </motion.span>
                </motion.div>
              </motion.button>
            </div>

          </div>
        </motion.div>

        {/* Glow rosu exterior */}
        <div className="absolute -inset-px bg-gradient-to-r from-[#e30613]/20 via-transparent to-[#e30613]/20 rounded-[60px] -z-10 blur-2xl opacity-50" aria-hidden="true" />
      </motion.nav>
    </>
  );
}