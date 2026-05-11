'use client';

import { useState, useEffect, useCallback } from 'react';
import Masonry from './animations/Masonry';
import BlurText from './animations/BlurText';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  { id: "1", img: "/images/1.webp", url: "#", height: 580 },
  { id: "2", img: "/images/2.webp", url: "#", height: 420 },
  { id: "3", img: "/images/3.webp", url: "#", height: 650 },
  { id: "4", img: "/images/4.webp", url: "#", height: 480 },
  { id: "5", img: "/images/5.webp", url: "#", height: 720 },
  { id: "6", img: "/images/6.webp", url: "#", height: 390 },
  { id: "7", img: "/images/7.webp", url: "#", height: 550 },
  { id: "8", img: "/images/8.webp", url: "#", height: 680 },
  { id: "9", img: "/images/9.webp", url: "#", height: 430 },
  { id: "10", img: "/images/10.webp", url: "#", height: 590 },
  { id: "11", img: "/images/11.webp", url: "#", height: 500 },
  { id: "12", img: "/images/12.webp", url: "#", height: 620 },
  { id: "13", img: "/images/13.webp", url: "#", height: 450 },
  { id: "14", img: "/images/14.webp", url: "#", height: 700 },
  { id: "15", img: "/images/15.webp", url: "#", height: 480 },
  { id: "16", img: "/images/16.webp", url: "#", height: 530 },
  { id: "17", img: "/images/17.webp", url: "#", height: 610 },
  { id: "18", img: "/images/18.webp", url: "#", height: 470 },
  { id: "19", img: "/images/19.webp", url: "#", height: 560 },
  { id: "20", img: "/images/20.webp", url: "#", height: 640 },
  { id: "21", img: "/images/21.webp", url: "#", height: 520 },
  { id: "22", img: "/images/22.webp", url: "#", height: 580 },
  { id: "23", img: "/images/23.webp", url: "#", height: 430 },
  { id: "24", img: "/images/24.webp", url: "#", height: 690 },
];

const TOTAL = galleryItems.length;

// Nav arrow button
function NavButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      aria-label={direction === 'prev' ? 'Imaginea anterioară' : 'Imaginea următoare'}
      className="
        relative flex items-center justify-center
        w-12 h-12 rounded-2xl
        bg-white/10 backdrop-blur-2xl
        border border-white/20
        text-white/80 hover:text-white
        shadow-xl shadow-black/30
        transition-colors duration-200
        hover:bg-white/20 hover:border-white/35
        active:bg-white/25
        overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-2xl" />
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
        className="relative z-10"
        style={{ transform: direction === 'next' ? 'rotate(180deg)' : undefined }}
      >
        <path
          d="M11.5 3.5L6 9l5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const isOpen = selectedIndex !== null;

  const openLightbox = (index: number) => {
    setDirection(1);
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const goTo = useCallback(
    (newIndex: number) => {
      if (selectedIndex === null) return;
      setDirection(newIndex > selectedIndex ? 1 : -1);
      setSelectedIndex(newIndex);
    },
    [selectedIndex]
  );

  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return;
    goTo(selectedIndex === 0 ? TOTAL - 1 : selectedIndex - 1);
  }, [selectedIndex, goTo]);

  const goToNext = useCallback(() => {
    if (selectedIndex === null) return;
    goTo(selectedIndex === TOTAL - 1 ? 0 : selectedIndex + 1);
  }, [selectedIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, goToPrevious, goToNext, closeLightbox]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.97,
      filter: 'blur(6px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.97,
      filter: 'blur(6px)',
    }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      <section
        id="galerie"
        className="relative z-10 py-24 bg-black overflow-hidden"
        aria-labelledby="gallery-section-title"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-16">
            <BlurText
              text="Galerie"
              delay={60}
              animateBy="words"
              direction="top"
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 justify-center"
            />
            <h2 id="gallery-section-title" className="sr-only">
              Galerie foto Sty &amp; Stv Carwash Craiova
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Rezultatele muncii noastre de peste 20 de ani. Mașini curate, clienți mulțumiți.
            </p>
          </div>

          {/* Masonry Grid - Dimensiune DINAMICĂ */}
          <div className="relative w-full min-h-[700px] md:min-h-[850px]" role="list" aria-label="Galerie foto spălătorie auto">
            <Masonry
              items={galleryItems}
              ease="power3.out"
              duration={0.7}
              stagger={0.035}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.965}
              blurToFocus={true}
              onImageClick={openLightbox}
            />
          </div>

          <p
            className="text-center mt-12 text-white/40 text-sm tracking-wide"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Tradiție • Calitate • Atenție la detalii
          </p>
        </div>

        {/* LIGHTBOX cu spațiu față de navbar */}
        <AnimatePresence>
          {isOpen && selectedIndex !== null && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl"
                onClick={closeLightbox}
                aria-hidden="true"
              />

              <motion.div
                key="lightbox-card"
                role="dialog"
                aria-modal="true"
                aria-label={`Imagine ${selectedIndex + 1} din ${TOTAL}`}
                initial={{ opacity: 0, scale: 0.88, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="
                  fixed inset-0 z-50
                  flex items-start justify-center
                  pointer-events-none
                  pt-20 sm:pt-28 p-4 sm:p-8
                "
              >
                <div
                  className="
                    relative pointer-events-auto
                    w-full max-w-4xl
                    rounded-[2rem] overflow-hidden
                    bg-white/[0.08] backdrop-blur-3xl
                    border border-white/[0.18]
                    shadow-2xl shadow-black/60
                  "
                  onClick={e => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.18] via-white/[0.04] to-transparent pointer-events-none rounded-[2rem] z-10" />

                  <div
                    className="absolute top-0 left-8 right-8 h-px z-20 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.7), transparent)' }}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none rounded-[2rem] z-10"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(227,6,19,0.10) 0%, transparent 60%)' }}
                  />

                  {/* Header bar */}
                  <div className="relative z-30 flex items-center justify-between px-6 pt-5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#e30613]" style={{ boxShadow: '0 0 8px rgba(227,6,19,0.8)' }} />
                      <span className="text-white/70 text-[13px] font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Sty &amp; Stv Carwash
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.14] backdrop-blur-xl">
                        <span className="text-white font-bold text-[15px] tabular-nums">{selectedIndex + 1}</span>
                        <span className="text-white/30 text-[13px]">/</span>
                        <span className="text-white/50 text-[13px] tabular-nums">{TOTAL}</span>
                      </div>

                      <motion.button
                        onClick={closeLightbox}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.93 }}
                        aria-label="Închide galeria"
                        className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#e30613]/15 border border-[#e30613]/35 text-white/80 hover:text-white hover:bg-[#e30613]/25 hover:border-[#e30613]/55 transition-colors duration-200 shadow-lg shadow-[#e30613]/10 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-xl" />
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="relative z-10">
                          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Image area */}
                  <div className="relative z-20 px-5 pb-5">
                    <div className="relative w-full overflow-hidden rounded-[1.25rem] bg-white/[0.04] border border-white/[0.10]" style={{ aspectRatio: '16/10' }}>
                      <AnimatePresence custom={direction} mode="wait" initial={false}>
                        <motion.div
                          key={selectedIndex}
                          custom={direction}
                          variants={imageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={galleryItems[selectedIndex].img}
                            alt={`Sty & Stv Carwash Craiova – fotografie ${selectedIndex + 1} din ${TOTAL}`}
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, 900px"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Footer nav */}
                  <div className="relative z-30 flex items-center justify-between px-6 pb-6">
                    <div className="flex-1 mr-6 h-[3px] rounded-full bg-white/[0.08] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-[#e30613]"
                        animate={{ width: `${((selectedIndex + 1) / TOTAL) * 100}%` }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <NavButton direction="prev" onClick={goToPrevious} />
                      <NavButton direction="next" onClick={goToNext} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}