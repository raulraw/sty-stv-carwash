'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GOOGLE_REVIEW_URL =
  'https://www.google.com/maps/place/Spalatorie+Auto+Self+Service+Sty%26Stv/@44.3351003,23.7699136,14z/data=!4m10!1m2!2m1!1sSpalatoria+Self+Service+Sty+Stv+Craiova!3m6!1s0x4752d7bbc36adac5:0xd9dce63f77c4e911!8m2!3d44.3186197!4d23.8284993!15sCidTcGFsYXRvcmlhIFNlbGYgU2VydmljZSBTdHkgU3R2IENyYWlvdmFaKSInc3BhbGF0b3JpYSBzZWxmIHNlcnZpY2Ugc3R5IHN0diBjcmFpb3ZhkgEVc2VsZl9zZXJ2aWNlX2Nhcl93YXNomgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJwU2RWRnJOVWRqUkZaWVlWaFNjVkZ0VWtKVFJrSnlaSHBTUzFaR1JSQULgAQD6AQQIABBA!16s%2Fg%2F11wnd24g5r?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D';

// ─── Cookie helpers ───────────────────────────────────────────────────────────
const COOKIE_DISMISSED = 'review_nudge_dismissed'; // expiră după 7 zile (X apăsat)
const COOKIE_CONSENT   = 'cookie_consent_accepted'; // permanent (365 zile)

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <motion.svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#e30613"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.55 + i * 0.07, type: 'spring', stiffness: 400, damping: 15 }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

// ─── Cookie Banner ────────────────────────────────────────────────────────────
function CookieBanner({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 pt-0 md:px-6 md:pb-6"
    >
      <div className="relative max-w-xl mx-auto md:mx-0 md:ml-auto md:mr-6 rounded-3xl overflow-hidden
                      bg-white/[0.09] backdrop-blur-3xl border border-white/[0.18]
                      shadow-2xl shadow-black/60 p-6">
        {/* Glass shimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.18] via-white/[0.03] to-transparent pointer-events-none rounded-3xl" />
        {/* Red top accent */}
        <div
          className="absolute top-0 left-6 right-6 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.7), transparent)' }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#e30613]/10 border border-[#e30613]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-lg">🍪</span>
            </div>
            <div>
              <p className="font-bold text-white text-[14px] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Folosim cookie-uri
              </p>
              <p className="text-white/55 text-[12.5px] leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Folosim cookie-uri pentru a îmbunătăți experiența ta pe site. Prin acceptare, ne permiți să afișăm un reminder pentru recenzia ta Google.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onDecline}
              className="px-5 py-2 rounded-full bg-white/[0.07] border border-white/[0.13] text-white/55 hover:text-white/80 
                         text-[12px] font-semibold transition-all duration-200 hover:bg-white/[0.12]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Refuz
            </button>
            <button
              onClick={onAccept}
              className="px-6 py-2 rounded-full bg-[#e30613]/20 border border-[#e30613]/50 text-white 
                         text-[12px] font-bold hover:bg-[#e30613]/30 hover:border-[#e30613]/70 
                         transition-all duration-200 shadow-lg shadow-[#e30613]/15"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Review Popup ─────────────────────────────────────────────────────────────
function ReviewPopup({ onClose, isMobile }: { onClose: () => void; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  const popupVariants = {
    desktop: {
      initial: { opacity: 0, scale: 0.82, y: 18, transformOrigin: 'bottom right' },
      animate: { opacity: 1, scale: 1, y: 0, transformOrigin: 'bottom right' },
      exit:    { opacity: 0, scale: 0.82, y: 18, transformOrigin: 'bottom right' },
    },
    mobile: {
      initial: { opacity: 0, y: '100%' },
      animate: { opacity: 1, y: 0 },
      exit:    { opacity: 0, y: '100%' },
    },
  };

  const v = isMobile ? popupVariants.mobile : popupVariants.desktop;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <motion.div
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed z-[9999]
          ${isMobile
            ? 'bottom-0 left-0 right-0 rounded-t-[2rem]'
            : 'bottom-28 right-6 w-[340px] rounded-[1.8rem]'
          }
          bg-[#0e0e0e]/95 backdrop-blur-3xl
          border border-white/[0.14] overflow-hidden
          shadow-2xl shadow-black/70
        `}
      >
        {/* Glass shimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.02] to-transparent pointer-events-none" />
        {/* Red top line */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.8), transparent)' }}
        />
        {/* Red glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(227,6,19,0.08) 0%, transparent 60%)' }}
        />

        {/* Mobile drag handle */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>
        )}

        <div className="relative z-10 p-7">
          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/[0.07] border border-white/[0.12]
                       flex items-center justify-center text-white/50 hover:text-white/90 transition-all z-20"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* Header — avatar + brand */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-[#e30613] flex items-center justify-center shadow-lg shadow-[#e30613]/30 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              {/* Online dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0e0e0e]">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-50" />
              </div>
            </div>
            <div>
              <p className="font-extrabold text-white text-[14px] leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Sty &amp; Stv Carwash
              </p>
              <p className="text-emerald-400 text-[11px] font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Activ acum
              </p>
            </div>
          </div>

          {/* Chat bubble messages */}
          <div className="flex flex-col gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -14, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="self-start max-w-[88%] bg-white/[0.09] border border-white/[0.12] rounded-[1.2rem] rounded-tl-md px-4 py-3"
            >
              <p className="text-white/85 text-[13.5px] leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Sperăm că ți-a plăcut experiența la noi! 🚗✨
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -14, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="self-start max-w-[90%] bg-white/[0.09] border border-white/[0.12] rounded-[1.2rem] rounded-tl-md px-4 py-3"
            >
              <p className="text-white/85 text-[13.5px] leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Orice recenzie pe Google înseamnă enorm pentru noi. Îți ia mai puțin de un minut! 🙏
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -14, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="self-start max-w-[80%] bg-white/[0.09] border border-white/[0.12] rounded-[1.2rem] rounded-tl-md px-4 py-3"
            >
              <Stars />
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-2xl
                       bg-[#e30613]/20 border border-[#e30613]/50 text-white font-bold text-[14px]
                       hover:bg-[#e30613]/30 hover:border-[#e30613]/70 transition-all duration-300
                       shadow-lg shadow-[#e30613]/15 overflow-hidden"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {/* Animated shimmer on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={hovered ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 0.5 }}
            />
            {/* Google G */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 relative z-10">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="relative z-10">Lasă o recenzie pe Google</span>
            <motion.span
              className="relative z-10 text-[#e30613]/80"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="text-center text-white/25 text-[11px] mt-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Mulțumim din suflet! 💙
          </motion.p>
        </div>
      </motion.div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReviewNudge() {
  const [consentStatus, setConsentStatus] = useState<'unknown' | 'accepted' | 'declined'>('unknown');
  const [showBubble, setShowBubble] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBuzzing, setIsBuzzing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buzzIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Read cookies on mount — logica e async (setTimeout 0) pentru a evita cascading renders
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);

      const consent   = getCookie(COOKIE_CONSENT);
      const dismissed = getCookie(COOKIE_DISMISSED);

      if (consent === '1' && !dismissed) {
        setConsentStatus('accepted');
        setTimeout(() => setShowBubble(true), 800);
      } else if (consent === '1' && dismissed === '1') {
        setConsentStatus('accepted');
      } else if (consent === '0') {
        setConsentStatus('declined');
      } else {
        setTimeout(() => setConsentStatus('unknown'), 2000);
      }
    }, 0);
  }, []);

  // Buzz effect — triggers every 6s while popup is closed
  useEffect(() => {
    if (!showBubble || isPopupOpen) return;

    const startBuzz = () => {
      setIsBuzzing(true);
      setTimeout(() => setIsBuzzing(false), 2000);
    };

    // Initial buzz after bubble appears
    const initialTimeout = setTimeout(startBuzz, 600);

    // Repeat every 6s
    buzzIntervalRef.current = setInterval(startBuzz, 6000);

    return () => {
      clearTimeout(initialTimeout);
      if (buzzIntervalRef.current) clearInterval(buzzIntervalRef.current);
    };
  }, [showBubble, isPopupOpen]);

  const handleAcceptCookies = () => {
    setCookie(COOKIE_CONSENT, '1', 365);
    setConsentStatus('accepted');
    setTimeout(() => setShowBubble(true), 400);
  };

  const handleDeclineCookies = () => {
    setCookie(COOKIE_CONSENT, '0', 365);
    setConsentStatus('declined');
  };

  const handleCloseBubble = () => {
    setCookie(COOKIE_DISMISSED, '1', 7); // reapare după 7 zile
    setShowBubble(false);
    setIsPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    if (buzzIntervalRef.current) clearInterval(buzzIntervalRef.current);
    setIsBuzzing(false);
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');

        @keyframes buzz {
          0%   { transform: rotate(0deg)   translate(0, 0); }
          10%  { transform: rotate(-6deg)  translate(-2px, -1px); }
          20%  { transform: rotate(6deg)   translate(2px, 1px); }
          30%  { transform: rotate(-5deg)  translate(-2px, 1px); }
          40%  { transform: rotate(5deg)   translate(2px, -1px); }
          50%  { transform: rotate(-4deg)  translate(-1px, 1px); }
          60%  { transform: rotate(4deg)   translate(1px, -1px); }
          70%  { transform: rotate(-3deg)  translate(-1px, 0); }
          80%  { transform: rotate(3deg)   translate(1px, 0); }
          90%  { transform: rotate(-1deg)  translate(0, 0); }
          100% { transform: rotate(0deg)   translate(0, 0); }
        }

        .buzz-anim {
          animation: buzz 0.4s ease-in-out 4;
        }
      `}</style>

      {/* ── Cookie Banner ── */}
      <AnimatePresence>
        {consentStatus === 'unknown' && (
          <CookieBanner onAccept={handleAcceptCookies} onDecline={handleDeclineCookies} />
        )}
      </AnimatePresence>

      {/* ── Floating Bubble ── */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            className="fixed bottom-6 right-6 z-[9997]"
            style={{ transformOrigin: 'bottom right' }}
          >
            <button
              onClick={handleOpenPopup}
              aria-label="Lasă o recenzie Google"
              className={`
                relative w-[58px] h-[58px] rounded-[20px]
                bg-[#e30613] text-white
                shadow-2xl shadow-[#e30613]/40
                flex items-center justify-center
                hover:scale-110 active:scale-95
                transition-transform duration-200
                ${isBuzzing && !isPopupOpen ? 'buzz-anim' : ''}
              `}
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-[20px] bg-[#e30613] animate-ping opacity-25" />

              {/* Message icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="relative z-10">
                <path
                  d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                  fill="white"
                  opacity="0.95"
                />
                <circle cx="8.5" cy="10" r="1.5" fill="#e30613" opacity="0.7" />
                <circle cx="12" cy="10" r="1.5" fill="#e30613" opacity="0.7" />
                <circle cx="15.5" cy="10" r="1.5" fill="#e30613" opacity="0.7" />
              </svg>

              {/* Badge "1" */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 500, damping: 15 }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border-2 border-[#e30613]
                           flex items-center justify-center"
              >
                <span className="text-[10px] font-black text-[#e30613]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  1
                </span>
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Review Popup ── */}
      <AnimatePresence>
        {isPopupOpen && (
          <ReviewPopup onClose={handleCloseBubble} isMobile={isMobile} />
        )}
      </AnimatePresence>
    </>
  );
}
