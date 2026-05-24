'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import BlurText from './animations/BlurText';

// Tipuri
interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

// Hook-ul Google Reviews
function useGoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [overallRating, setOverallRating] = useState<number>(4.9);
  const [totalReviews, setTotalReviews] = useState<number>(247);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (data.reviews?.length) { 
          setReviews(data.reviews); 
          setIsLive(true); 
        }
        if (data.rating) setOverallRating(data.rating);
        if (data.user_ratings_total) setTotalReviews(data.user_ratings_total);
      })
      .catch(() => {});
  }, []);

  return { reviews, overallRating, totalReviews, isLive };
}

// Avatar
const AVATAR_GRADIENTS = [
  ['#e30613', '#ff4444'], ['#b91c1c', '#e30613'], ['#1e3a8a', '#3b82f6'],
  ['#065f46', '#10b981'], ['#581c87', '#a855f7'], ['#92400e', '#f59e0b'],
  ['#1e3a5f', '#0ea5e9'], ['#4a1d2b', '#e879a0'],
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const idx = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % AVATAR_GRADIENTS.length;
  const [from, to] = AVATAR_GRADIENTS[idx];

  return (
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 text-white font-bold text-[15px] tracking-wider select-none"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 4px 14px ${from}55` }}>
      {initials}
    </div>
  );
}

// Stars
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 13, md: 18, lg: 22 };
  const px = sizeMap[size];
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={px} height={px} viewBox="0 0 24 24" fill={i <= rating ? '#e30613' : 'rgba(255,255,255,0.15)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const pct = total > 0 ? (count / total) * 100 : 0;

  return (
    <div ref={ref} className="flex items-center gap-3 group">
      <span className="text-white/50 text-[12px] w-5 text-right flex-shrink-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {label}
      </span>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="#e30613" aria-hidden="true" className="flex-shrink-0 opacity-70">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #e30613, #ff4444)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
      <span className="text-white/35 text-[11px] w-7 text-right flex-shrink-0 tabular-nums" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {count}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// CARD REVIEW
// ─────────────────────────────────────────────
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const MAX_CHARS = 200;
  const isLong = review.text.length > MAX_CHARS;
  const displayed = isLong
    ? review.text.slice(0, MAX_CHARS).trimEnd() + '…'
    : review.text;

  return (
    <article
      aria-label={`Recenzie de la ${review.author_name}`}
      className="group relative flex flex-col w-full rounded-3xl overflow-hidden
                 bg-white/[0.06] backdrop-blur-2xl
                 border border-white/[0.10]
                 hover:bg-white/[0.10] hover:border-white/[0.22]
                 transition-all duration-500 shadow-xl shadow-black/30
                 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2
                 p-7 cursor-default h-[380px]"   // ← înălțime fixă
    >
      {/* Glass shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-white/[0.02] to-transparent pointer-events-none rounded-3xl" />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(227,6,19,0.13) 0%, transparent 65%)' }}
      />

      {/* Top accent line — animată la hover */}
      <div
        className="absolute top-0 left-8 right-8 h-px transition-all duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.0), transparent)' }}
      />
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.8), transparent)' }}
      />

      <div className="relative z-10 flex flex-col h-full gap-5">

        {/* Rating row */}
        <div className="flex items-center gap-3">
          <Stars rating={review.rating} size="md" />
          {/* Google mini badge — lângă stele */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/[0.06] border border-white/[0.09]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-label="Google">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-white/30 text-[10px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Google
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p
            className="text-white/65 text-[13.5px] leading-[1.75] italic"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {displayed}
          </p>
          {isLong && (
            <a
              href="https://www.google.com/maps/place/Spalatorie+Auto+Self+Service+Sty%26Stv/@44.3351003,23.7699136,14z/data=!4m10!1m2!2m1!1sSpalatoria+Self+Service+Sty+Stv+Craiova!3m6!1s0x4752d7bbc36adac5:0xd9dce63f77c4e911!8m2!3d44.3186197!4d23.8284993!15sCidTcGFsYXRvcmlhIFNlbGYgU2VydmljZSBTdHkgU3R2IENyYWlvdmFaKSInc3BhbGF0b3JpYSBzZWxmIHNlcnZpY2Ugc3R5IHN0diBjcmFpb3ZhkgEVc2VsZl9zZXJ2aWNlX2Nhcl93YXNomgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJwU2RWRnJOVWRqUkZaWVlWaFNjVkZ0VWtKVFJrSnlaSHBTUzFaR1JSQULgAQD6AQQIABBA!16s%2Fg%2F11wnd24g5r?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-block text-[#e30613]/70 hover:text-[#e30613] text-[12px] font-semibold transition-colors duration-200 not-italic"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Citește tot pe Google Maps →
            </a>
          )}
        </div>

        {/* Separator */}
        <div
          className="h-px w-full opacity-40"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
        />

        {/* Footer: avatar + date */}
        <div className="flex items-center gap-3">
          <Avatar name={review.author_name} />
          <div className="flex-1 min-w-0">
            <p
              className="font-bold text-white text-[14px] truncate leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {review.author_name}
            </p>
            <p
              className="text-white/35 text-[11px] mt-0.5 whitespace-nowrap"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {review.relative_time_description}
            </p>
          </div>
        </div>

      </div>
    </article>
  );
}

// ─────────────────────────────────────────────
// EYEBROW ANIMAT
// ─────────────────────────────────────────────
function AnimatedEyebrow({ inView }: { inView: boolean }) {
  const leftDash = '──────────';
  const label = '  RECENZII  ';
  const rightDash = '──────────';
  const full = (leftDash + label + rightDash).split('');
  return (
    <div className="flex items-center justify-center mb-5 overflow-hidden" aria-hidden="true">
      {full.map((ch, i) => {
        const isDash = ch === '─';
        const isSpace = ch === ' ';
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: isDash ? 0.3 : isSpace ? 0 : 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.04 + i * 0.018, ease: 'easeOut' }}
            className="font-black text-3xl md:text-4xl tracking-[0.28em]"
            style={{ color: isDash ? '#ffffff' : '#e30613' }}
          >
            {ch}
          </motion.span>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// SUMMARY CARD — Rating + distribuție stele
// ─────────────────────────────────────────────
function SummaryCard({
  overallRating,
  totalReviews,
  inView,
}: {
  overallRating: number;
  totalReviews: number;
  inView: boolean;
}) {
  const ratingDist = [
    { label: '5', count: Math.round(totalReviews * 0.85) },
    { label: '4', count: Math.round(totalReviews * 0.10) },
    { label: '3', count: Math.round(totalReviews * 0.03) },
    { label: '2', count: Math.round(totalReviews * 0.01) },
    { label: '1', count: Math.round(totalReviews * 0.01) },
  ];

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 22, stiffness: 90 });
  const [displayed, setDisplayed] = useState('0.0');

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => motionVal.set(overallRating), 400);
    return () => clearTimeout(t);
  }, [inView, overallRating, motionVal]);

  useEffect(() => {
    return spring.on('change', v => setDisplayed(v.toFixed(1)));
  }, [spring]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden
                 bg-white/[0.07] backdrop-blur-2xl border border-white/[0.12]
                 shadow-xl shadow-black/30 p-8 flex flex-col gap-7"
    >
      {/* Glass shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.15] via-white/[0.02] to-transparent pointer-events-none rounded-3xl" />

      {/* Top red accent */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.8), transparent)' }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at 50% -5%, rgba(227,6,19,0.09) 0%, transparent 60%)' }}
      />

      <div className="relative z-10">
        {/* Big rating number */}
        <div className="text-center mb-1">
          <div
            className="text-[6.5rem] font-extrabold leading-none text-white tabular-nums tracking-tighter"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {displayed}
          </div>
        </div>

        {/* Stars row */}
        <div className="flex justify-center mb-3">
          <Stars rating={Math.round(overallRating)} size="lg" />
        </div>

        <p
          className="text-center text-/40 text-sm"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {totalReviews.toLocaleString('ro-RO')} recenzii Google
        </p>
      </div>

      {/* Distribution bars */}
      <div className="relative z-10 flex flex-col gap-3">
        {ratingDist.map(d => (
          <RatingBar key={d.label} label={d.label} count={d.count} total={totalReviews} />
        ))}
      </div>

      {/* CTA button */}
      <div className="relative z-10">
  <a
    href="https://www.google.com/maps/place/Spalatorie+Auto+Self+Service+Sty%26Stv/@44.3351003,23.7699136,14z/data=!4m10!1m2!2m1!1sSpalatoria+Self+Service+Sty+Stv+Craiova!3m6!1s0x4752d7bbc36adac5:0xd9dce63f77c4e911!8m2!3d44.3186197!4d23.8284993!15sCidTcGFsYXRvcmlhIFNlbGYgU2VydmljZSBTdHkgU3R2IENyYWlvdmFaKSInc3BhbGF0b3JpYSBzZWxmIHNlcnZpY2Ugc3R5IHN0diBjcmFpb3ZhkgEVc2VsZl9zZXJ2aWNlX2Nhcl93YXNomgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJwU2RWRnJOVWRqUkZaYVlWaFNjVkZ0VWtKVFJrSnlaSHBTUzFaR1JSQULgAQD6AQQIABBA!16s%2Fg%2F11wnd24g5r?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="group/btn relative w-full px-6 py-3.5 rounded-full
               bg-[#e30613]/15 backdrop-blur-2xl border border-[#e30613]/35
               text-white/85 hover:text-white font-semibold text-sm
               hover:bg-[#e30613]/25 hover:border-[#e30613]/55 active:scale-95
               transition-all duration-300 shadow-lg shadow-[#e30613]/10
               inline-flex items-center justify-center gap-2.5"
    style={{ fontFamily: "'Outfit', sans-serif" }}
  >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Lasă o recenzie
          <span className="group-hover/btn:translate-x-0.5 transition-transform duration-200">→</span>
        </a>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// CAROUSEL DESKTOP — simplu, autoplay, 3 carduri
// ─────────────────────────────────────────────
function ReviewsCarouselDesktop({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [displayed, setDisplayed] = useState(0);
  const pausedRef = useRef(false);
  const total = reviews.length;
  const VISIBLE = 3;

  const go = useCallback((next: number, direction: 1 | -1) => {
    if (transitioning) return;
    setDir(direction);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(next);
      setDisplayed(next);
      setTransitioning(false);
    }, 320);
  }, [transitioning]);

  const prev = () => go((current - 1 + total) % total, -1);
  const next = () => go((current + 1) % total, 1);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        go((current + 1) % total, 1);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [current, go, total]);

  const visible = [0, 1, 2].map(offset => reviews[(displayed + offset) % total]);

  return (
    <div
      className="flex flex-col gap-6"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Carduri */}
      <div
        className="grid grid-cols-3 gap-5 items-stretch"
        role="list"
        aria-label="Recenzii clienți"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning
            ? `translateX(${dir * -18}px)`
            : 'translateX(0)',
          transition: 'opacity 0.32s ease, transform 0.32s ease',
          textAlign: 'center'
        }}
      >
        {visible.map((review, i) => (
          <div key={`${displayed}-${i}`} role="listitem" className="flex">
            <ReviewCard review={review} index={i} />
          </div>
        ))}
      </div>

      {/* Navigare */}
      <div className="flex items-center justify-center gap-4">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Recenzie anterioară"
          className="w-9 h-9 rounded-full border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/25
                     flex items-center justify-center transition-all duration-250 text-white/60 hover:text-white"
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Navigare recenzii">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Recenzie ${i + 1}`}
              className="transition-all duration-350 rounded-full"
              style={{
                width: i === current ? 24 : 7,
                height: 7,
                background: i === current
                  ? 'linear-gradient(90deg, #e30613, #ff4444)'
                  : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Recenzie următoare"
          className="w-9 h-9 rounded-full border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/25
                     flex items-center justify-center transition-all duration-250 text-white/60 hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CAROUSEL MOBILE — simplu, autoplay
// ─────────────────────────────────────────────
function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [displayed, setDisplayed] = useState(0);
  const pausedRef = useRef(false);
  const total = reviews.length;

  const go = useCallback((next: number, direction: 1 | -1) => {
    if (transitioning) return;
    setDir(direction);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(next);
      setDisplayed(next);
      setTransitioning(false);
    }, 320);
  }, [transitioning]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        go((current + 1) % total, 1);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [current, go, total]);

  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
    >
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? `translateX(${dir * -18}px)` : 'translateX(0)',
          transition: 'opacity 0.32s ease, transform 0.32s ease',
        }}
      >
        <ReviewCard review={reviews[displayed]} index={0} />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Navigare recenzii">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 1 : -1)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Recenzie ${i + 1}`}
            className="transition-all duration-350 rounded-full"
            style={{
              width: i === current ? 24 : 7,
              height: 7,
              background: i === current
                ? 'linear-gradient(90deg, #e30613, #ff4444)'
                : 'rgba(255,255,255,0.18)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECȚIUNEA PRINCIPALĂ
// ─────────────────────────────────────────────
export default function ReviewContent() {
  const { reviews, overallRating, totalReviews, isLive } = useGoogleReviews();

  const summaryRef = useRef<HTMLDivElement>(null);
  const summaryInView = useInView(summaryRef, { once: true, margin: '-60px' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      {/* LAYOUT PRINCIPAL */}
      <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
        <div ref={summaryRef} className="lg:sticky lg:top-28">
          <SummaryCard overallRating={overallRating} totalReviews={totalReviews} inView={summaryInView} />
        </div>

        <div>
          {reviews.length > 0 ? (
            <>
              <div className="hidden md:block">
                <ReviewsCarouselDesktop reviews={reviews} />
              </div>
              <div className="md:hidden">
                <ReviewCarousel reviews={reviews} />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-48 text-white/30">Se încarcă recenziile...</div>
          )}
        </div>
      </div>

      {/* Footer recenziile */}
      <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-14">
        {/* Powered by Google + Actualizate la fiecare 24h - codul tău vechi */}
      </motion.div>
    </>
  );
}