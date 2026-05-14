'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { TouchEvent } from 'react';
import Masonry from '../components/animations/Masonry';
import BlurText from '../components/animations/BlurText';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LiquidGlassNavbar from '../components/LiquidGlassNavbar';
import Footer from '../components/Footer';

const galleryItems = [
  { id: "1",  img: "/images/1.webp",  url: "#", height: 580 },
  { id: "2",  img: "/images/2.webp",  url: "#", height: 420 },
  { id: "3",  img: "/images/3.webp",  url: "#", height: 650 },
  { id: "4",  img: "/images/4.webp",  url: "#", height: 480 },
  { id: "5",  img: "/images/5.webp",  url: "#", height: 720 },
  { id: "6",  img: "/images/6.webp",  url: "#", height: 390 },
  { id: "7",  img: "/images/7.webp",  url: "#", height: 550 },
  { id: "8",  img: "/images/8.webp",  url: "#", height: 680 },
  { id: "9",  img: "/images/9.webp",  url: "#", height: 430 },
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
  { id: "25", img: "/images/25.webp", url: "#", height: 470 },
  { id: "26", img: "/images/26.webp", url: "#", height: 540 },
  { id: "27", img: "/images/27.webp", url: "#", height: 600 },
  { id: "28", img: "/images/28.webp", url: "#", height: 450 },
  { id: "29", img: "/images/29.webp", url: "#", height: 520 },
  { id: "30", img: "/images/30.webp", url: "#", height: 640 },
  { id: "31", img: "/images/31.webp", url: "#", height: 520 },
  { id: "32", img: "/images/32.webp", url: "#", height: 580 },
  { id: "33", img: "/images/33.webp", url: "#", height: 430 },
  { id: "34", img: "/images/34.webp", url: "#", height: 690 },
  { id: "35", img: "/images/35.webp", url: "#", height: 470 },
  { id: "36", img: "/images/36.webp", url: "#", height: 540 },
  { id: "37", img: "/images/37.webp", url: "#", height: 600 },
  { id: "38", img: "/images/38.webp", url: "#", height: 450 },
  { id: "39", img: "/images/39.webp", url: "#", height: 520 },
  { id: "40", img: "/images/40.webp", url: "#", height: 640 },
];

const TOTAL = galleryItems.length;
const SWIPE_THRESHOLD = 50;


// ─── Desktop Nav Button ───────────────────────────────────────────────────────
function NavButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      aria-label={direction === 'prev' ? 'Imaginea anterioară' : 'Imaginea următoare'}
      className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 text-white/80 hover:text-white shadow-xl shadow-black/30 hover:bg-white/20 hover:border-white/35 active:bg-white/25 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-2xl" />
      <svg
        width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
        className="relative z-10"
        style={{ transform: direction === 'next' ? 'rotate(180deg)' : undefined }}
      >
        <path d="M11.5 3.5L6 9l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}

// ─── Lightbox Component ───────────────────────────────────────────────────────
interface LightboxProps {
  selectedIndex: number;
  direction: 1 | -1;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ selectedIndex, direction, onClose, onPrev, onNext }: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchMoved = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
  }, []);

  // Reset zoom on image change
  useEffect(() => {
    setIsZoomed(false);
    setDragOffset(0);
  }, [selectedIndex]);

  // Touch swipe handlers
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchMoved.current = false;
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isZoomed) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
      touchMoved.current = true;
      setDragOffset(dx);
    }
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (isZoomed) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    setDragOffset(0);

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? onNext() : onPrev();
    } else if (!touchMoved.current && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      // Pure tap → close on mobile
      onClose();
    }
    touchMoved.current = false;
  };

  const imageVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96, filter: 'blur(8px)' }),
    center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit:  (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96, filter: 'blur(8px)' }),
  };

  // ── MOBILE ───────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col select-none"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 pt-12 pb-3 bg-gradient-to-b from-black via-black/70 to-transparent shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#e30613]" style={{ boxShadow: '0 0 6px rgba(227,6,19,0.8)' }} />
              <span className="text-white/50 text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Sty &amp; Stv Carwash
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-sm tabular-nums">
                <span className="text-white font-bold">{selectedIndex + 1}</span>
                <span className="text-white/30"> / {TOTAL}</span>
              </span>
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.85 }}
                aria-label="Închide"
                className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center"
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Image — fills all remaining space, swipeable */}
          <div
            className="flex-1 relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={selectedIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ x: dragOffset, transition: touchMoved.current ? 'none' : undefined }}
              >
                <Image
                  src={galleryItems[selectedIndex].img}
                  alt={`Sty & Stv Carwash - fotografie ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={85}
                  priority
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Swipe indicator dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
              {(() => {
                const windowSize = Math.min(TOTAL, 9);
                const half = Math.floor(windowSize / 2);
                let start = Math.max(0, selectedIndex - half);
                if (start + windowSize > TOTAL) start = TOTAL - windowSize;
                return Array.from({ length: windowSize }).map((_, i) => {
                  const idx = start + i;
                  const active = idx === selectedIndex;
                  return (
                    <div
                      key={idx}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: active ? 18 : 5,
                        height: 5,
                        background: active ? '#e30613' : 'rgba(255,255,255,0.25)',
                      }}
                    />
                  );
                });
              })()}
            </div>
          </div>

          {/* Progress bar bottom */}
          <div className="px-5 pb-8 pt-2 bg-gradient-to-t from-black via-black/70 to-transparent shrink-0">
            <div className="h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#e30613]"
                animate={{ width: `${((selectedIndex + 1) / TOTAL) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 40 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-12 pointer-events-none"
      >
        <div
          className="relative pointer-events-auto w-full max-w-5xl rounded-[2rem] overflow-hidden bg-white/[0.07] backdrop-blur-3xl border border-white/[0.14] shadow-2xl shadow-black/70"
          onClick={e => e.stopPropagation()}
        >
          {/* Glass shimmer layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.14] via-white/[0.02] to-transparent pointer-events-none rounded-[2rem] z-10" />
          {/* Red top line accent */}
          <div
            className="absolute top-0 left-8 right-8 h-px z-20 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.65), transparent)' }}
          />

          {/* ── Header ── */}
          <div className="relative z-30 flex items-center justify-between px-7 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#e30613]" style={{ boxShadow: '0 0 8px rgba(227,6,19,0.8)' }} />
              <span className="text-white/65 text-[13px] font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Sty &amp; Stv Carwash
              </span>
              {/* Zoom hint text */}
              <motion.span
                key={String(isZoomed)}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-2 text-white/30 text-[11px] tracking-wide"
              >
                {isZoomed ? '— click pentru zoom out' : '— click pe imagine pentru zoom'}
              </motion.span>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.13] backdrop-blur-xl">
                <span className="text-white font-bold tabular-nums">{selectedIndex + 1}</span>
                <span className="text-white/30"> / </span>
                <span className="text-white/50 tabular-nums">{TOTAL}</span>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label="Închide"
                className="w-9 h-9 rounded-xl bg-[#e30613]/15 border border-[#e30613]/30 flex items-center justify-center text-white/80 hover:text-white"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* ── Image ── */}
          <div className="relative z-20 px-6 pb-4">
            <div
              className="relative w-full overflow-hidden rounded-[1.4rem] bg-black/30 border border-white/[0.07]"
              style={{ aspectRatio: '16/9' }}
            >
              <AnimatePresence custom={direction} mode="wait" initial={false}>
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.33, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {/* Zoom wrapper */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: isZoomed ? 2 : 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setIsZoomed(z => !z)}
                    style={{
                      cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                      transformOrigin: 'center center',
                    }}
                  >
                    <Image
                      src={galleryItems[selectedIndex].img}
                      alt={`Sty & Stv Carwash - fotografie ${selectedIndex + 1}`}
                      fill
                      className="object-contain select-none"
                      sizes="(max-width: 1024px) 90vw, 1280px"
                      quality={90}
                      priority
                      draggable={false}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Footer nav ── */}
          <div className="relative z-30 flex items-center justify-between px-7 pb-6">
            <div className="flex-1 mr-6 h-[3px] rounded-full bg-white/[0.08] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#e30613]"
                animate={{ width: `${((selectedIndex + 1) / TOTAL) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex gap-3">
              <NavButton direction="prev" onClick={onPrev} />
              <NavButton direction="next" onClick={onNext} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GaleriePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const isOpen = selectedIndex !== null;

  const openLightbox = useCallback((index: number) => {
    setDirection(1);
    setSelectedIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex(prev => {
      if (prev === null) return prev;
      setDirection(-1);
      return prev === 0 ? TOTAL - 1 : prev - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setSelectedIndex(prev => {
      if (prev === null) return prev;
      setDirection(1);
      return prev === TOTAL - 1 ? 0 : prev + 1;
    });
  }, []);

  // Keyboard
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, goToPrevious, goToNext, closeLightbox]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <LiquidGlassNavbar />

      <section className="pt-40 pb-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-20">
            <BlurText
              text="Galerie"
              delay={60}
              animateBy="words"
              direction="top"
              className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 justify-center"
            />
            <h1 className="sr-only">Galerie foto Sty & Stv Carwash Craiova</h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Rezultatele muncii noastre de peste 20 de ani. Mașini curate, clienți mulțumiți.
            </p>
          </div>

          <div className="relative w-full">
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

          <p className="text-center mt-14 text-white/40 text-sm tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Tradiție • Calitate • Atenție la detalii
          </p>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {isOpen && selectedIndex !== null && (
          <Lightbox
            key="lightbox"
            selectedIndex={selectedIndex}
            direction={direction}
            onClose={closeLightbox}
            onPrev={goToPrevious}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
