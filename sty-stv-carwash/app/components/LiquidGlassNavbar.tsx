'use client';

import React, { useState, useEffect } from 'react';
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

  // Status program spalatorie
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const openMinutes = 7 * 60;        // 07:00
      const closeMinutes = 23 * 60 + 30; // 23:30

      setIsOpen(currentMinutes >= openMinutes && currentMinutes < closeMinutes);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

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
    { href: '#servicii',         label: 'Servicii',    icon: '🧼' },
    { href: '#programe',         label: 'Self-Wash',   icon: '✋' },
    { href: '#serviciu-complet', label: 'Personal',    icon: '🧑‍🔧' },
    { href: '#galerie',          label: 'Galerie',     icon: '📸' },
    { href: '#contact',          label: 'Contact',     icon: '📍' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');
        .nav-brand { font-family: 'Outfit', sans-serif; }
        .nav-links-font { font-family: 'Nunito', sans-serif; }

        /* Animație optimizată undă glow */
        @keyframes statusWave {
          0% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 0.7; transform: scale(1.15); }
          100% { opacity: 0.4; transform: scale(0.8); }
        }
        
        .wave-glow {
          animation: statusWave 3s ease-in-out infinite;
        }
      `}</style>

      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)]"
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

            {/* Logo + Text */}
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

            {/* Center Links */}
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

            {/* RIGHT: Pilulă compactă cu animație optimizată */}
            <div className="flex-shrink-0 ml-auto relative z-10">
              <motion.div
                className={`relative px-4 py-2 rounded-3xl border backdrop-blur-xl shadow-inner overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300' 
                    : 'bg-red-500/10 border-red-400/30 text-red-300'
                }`}
                animate={isOpen ? { scale: [1, 1.015, 1] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Undă de glow */}
                {isOpen && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent wave-glow" />
                )}

                <div className="flex items-center gap-2 relative z-10">
                  <div className={`relative w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-red-400'}`}>
                    {isOpen && (
                      <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40" />
                    )}
                  </div>
                  <span className="font-semibold text-sm tracking-wider">
                    {isOpen ? 'Deschis' : 'Închis'}
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>

        <div className="absolute -inset-px bg-gradient-to-r from-[#e30613]/20 via-transparent to-[#e30613]/20 rounded-[60px] -z-10 blur-2xl opacity-50" aria-hidden="true" />
      </motion.nav>
    </>
  );
}