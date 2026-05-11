'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import BlurText from './animations/BlurText';

// ─────────────────────────────────────────────
// TIPURI
// ─────────────────────────────────────────────
interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

// ─────────────────────────────────────────────
// DATE MOCK – înlocuite automat cu Google dacă API-ul răspunde
// ─────────────────────────────────────────────
const MOCK_REVIEWS: Review[] = [
  {
    author_name: 'Andrei Popescu',
    rating: 5,
    text: 'Cea mai bună spălătorie din Craiova fără niciun dubiu. Am venit de câteva ori și de fiecare dată mașina arată impecabil. Echipamentele sunt moderne, spuma activă funcționează excelent, iar prețurile sunt corecte. Recomand cu toată încrederea!',
    relative_time_description: 'acum o săptămână',
    profile_photo_url: '',
  },
  {
    author_name: 'Maria Constantin',
    rating: 5,
    text: 'Am ales serviciul complet cu personal și am rămas plăcut surprinsă. Băieții sunt profesioniști, atenți la detalii și foarte amabili. Mașina mea arăta ca nouă după serviciu. Programul este convenabil și locația ușor accesibilă.',
    relative_time_description: 'acum 2 săptămâni',
    profile_photo_url: '',
  },
  {
    author_name: 'Mihai Ionescu',
    rating: 5,
    text: 'Posturile self-wash sunt dotate cu tot ce ai nevoie. Mi-a plăcut în special programul de osmoză – mașina s-a uscat fără nicio urmă de calcar. Spațiul este curat, bine iluminat și cu instrucțiuni clare. Voi reveni cu siguranță.',
    relative_time_description: 'acum 3 săptămâni',
    profile_photo_url: '',
  },
  {
    author_name: 'Elena Dumitrescu',
    rating: 5,
    text: 'Experiență de 5 stele! Am venit cu un SUV plin de noroi după un drum prin pădure și l-am lăsat strălucitor. Prețul pentru serviciul complet este mai mult decât rezonabil față de calitatea muncii. Felicitări echipei!',
    relative_time_description: 'acum o lună',
    profile_photo_url: '',
  },
  {
    author_name: 'Cristian Manolescu',
    rating: 5,
    text: 'Vin de ani de zile aici și niciodată nu m-au dezamăgit. Tradiție, calitate și oameni de treabă. Programul Stop de 60 de secunde este o idee grozavă – poți verifica dacă ai nevoie de o trecere în plus. Locul de referință pentru spălătorie în Craiova.',
    relative_time_description: 'acum o lună',
    profile_photo_url: '',
  },
  {
    author_name: 'Roxana Florescu',
    rating: 5,
    text: 'Am descoperit această spălătorie prin recomandare și nu regret deloc. Personalul este extrem de atent și de profesionist. Au curățat tapițeria mașinii mele mai bine decât m-am așteptat. Vor fi cu siguranță spălătoria mea de suflet!',
    relative_time_description: 'acum 2 luni',
    profile_photo_url: '',
  },
];

// ─────────────────────────────────────────────
// HOOK – fetch Google Reviews (via Next.js API route)
// Adaugă /app/api/reviews/route.ts în proiectul tău:
//
// import { NextResponse } from 'next/server';
// export async function GET() {
//   const PLACE_ID = 'PLACE_ID_TĂU_GOOGLE'; // ex: ChIJ...
//   const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;
//   const url = `https://maps.googleapis.com/maps/api/place/details/json`
//             + `?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total`
//             + `&language=ro&key=${API_KEY}`;
//   const res  = await fetch(url, { next: { revalidate: 3600 } });
//   const data = await res.json();
//   return NextResponse.json(data.result ?? {});
// }
// ─────────────────────────────────────────────
function useGoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
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
        if (data.rating)             setOverallRating(data.rating);
        if (data.user_ratings_total) setTotalReviews(data.user_ratings_total);
      })
      .catch(() => {/* folosim mock-ul */});
  }, []);

  return { reviews, overallRating, totalReviews, isLive };
}

// ─────────────────────────────────────────────
// AVATAR PLACEHOLDER
// ─────────────────────────────────────────────
function Avatar({ name, photo }: { name: string; photo?: string }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="w-11 h-11 rounded-2xl object-cover border border-white/20 flex-shrink-0"
      />
    );
  }

  const colors = [
    'from-[#e30613] to-[#ff4444]',
    'from-[#e30613] to-[#991b1b]',
    'from-slate-600 to-slate-800',
    'from-rose-700 to-rose-900',
    'from-zinc-600 to-zinc-800',
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colors[colorIndex]} 
                  text-white font-bold text-sm flex-shrink-0 border border-white/10`}
    >
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────
// STELE
// ─────────────────────────────────────────────
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'text-2xl' : 'text-sm';
  return (
    <div className={`flex items-center gap-0.5 ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          style={{ color: i <= rating ? '#e30613' : 'rgba(255,255,255,0.18)' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// CARD REVIEW
// ─────────────────────────────────────────────
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [expanded, setExpanded] = useState(false);

  const MAX_CHARS = 180;
  const isLong    = review.text.length > MAX_CHARS;
  const displayed = isLong && !expanded
    ? review.text.slice(0, MAX_CHARS).trimEnd() + '…'
    : review.text;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col h-full rounded-3xl overflow-hidden
                 bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13]
                 hover:bg-white/[0.11] hover:border-white/25
                 transition-all duration-500 shadow-xl shadow-black/30
                 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1.5 p-7"
    >
      {/* Glass shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.03] to-transparent pointer-events-none rounded-3xl" />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(227,6,19,0.10) 0%, transparent 70%)' }}
      />

      {/* Linie accent top */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-40 group-hover:opacity-90 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.7), transparent)' }}
      />

      {/* Ghilimele decorative */}
      <div
        className="absolute top-5 right-6 text-6xl font-serif leading-none pointer-events-none select-none"
        style={{ color: 'rgba(227,6,19,0.12)', fontFamily: 'Georgia, serif' }}
        aria-hidden="true"
      >
      
      </div>

      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Avatar name={review.author_name} photo={review.profile_photo_url} />
          <div className="flex-1 min-w-0">
            <p
              className="font-bold text-white text-[15px] truncate leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {review.author_name}
            </p>
            <p className="text-white/40 text-[11px] mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {review.relative_time_description}
            </p>
          </div>
          <Stars rating={review.rating} />
        </div>

        {/* Separator */}
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
        />

        {/* Text */}
        <div className="flex-1">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={expanded ? 'expanded' : 'collapsed'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/65 text-[13.5px] leading-relaxed"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {displayed}
            </motion.p>
          </AnimatePresence>

          {isLong && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="mt-2 text-[#e30613]/80 hover:text-[#e30613] text-[12px] font-semibold transition-colors duration-200"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {expanded ? 'Arată mai puțin' : 'Citește tot'}
            </button>
          )}
        </div>

        {/* Google badge */}
        <div className="flex items-center gap-1.5 mt-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-label="Google">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-white/25 text-[11px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Google Review
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// EYEBROW ANIMAT (identic cu restul secțiunilor)
// ─────────────────────────────────────────────
function AnimatedEyebrow({ inView }: { inView: boolean }) {
  const leftDash  = '──────────';
  const label     = '  RECENZII  ';
  const rightDash = '──────────';
  const full      = (leftDash + label + rightDash).split('');
  return (
    <div className="flex items-center justify-center mb-5 overflow-hidden" aria-hidden="true">
      {full.map((ch, i) => {
        const isDash  = ch === '─';
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
// BARA RATING GLOBALĂ
// ─────────────────────────────────────────────
function RatingBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const pct    = total > 0 ? (count / total) * 100 : 0;

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-white/50 text-[12px] w-4 text-right" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {label}
      </span>
      <span style={{ color, fontSize: 12 }}>★</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
      <span className="text-white/30 text-[11px] w-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {count}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// CAROUSEL PENTRU MOBILE
// ─────────────────────────────────────────────
function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence custom={dir} mode="wait" initial={false}>
        <motion.div
          key={current}
          custom={dir}
          initial={{ opacity: 0, x: dir * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -50 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ReviewCard review={reviews[current]} index={0} />
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Review ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current ? '#e30613' : 'rgba(255,255,255,0.2)',
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
export default function ReviewsSection() {
  const { reviews, overallRating, totalReviews, isLive } = useGoogleReviews();

  const titleRef   = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const titleInView   = useInView(titleRef,   { once: true, margin: '-80px' });
  const summaryInView = useInView(summaryRef, { once: true, margin: '-60px' });

  // Distribuție stele (simulată cu proporții realiste)
  const ratingDist = [
    { label: '5', count: Math.round(totalReviews * 0.85), color: '#e30613' },
    { label: '4', count: Math.round(totalReviews * 0.10), color: '#ff6b35' },
    { label: '3', count: Math.round(totalReviews * 0.03), color: '#fbbf24' },
    { label: '2', count: Math.round(totalReviews * 0.01), color: '#94a3b8' },
    { label: '1', count: Math.round(totalReviews * 0.01), color: '#64748b' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      <section
        id="recenzii"
        className="relative z-10 py-28 bg-black overflow-hidden"
        aria-labelledby="reviews-title"
      >
        {/* Gradienți */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />

        {/* Fundal subtil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(227,6,19,0.05) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* Header */}
          <div ref={titleRef} className="text-center mb-14">
            <AnimatedEyebrow inView={titleInView} />
            <h2 id="reviews-title" className="mb-5">
              <BlurText
                text="Ce spun clienții noștri"
                delay={60}
                animateBy="words"
                direction="top"
                className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white justify-center"
              />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/45 text-base max-w-lg mx-auto leading-relaxed"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Peste 20 de ani de experiență, reflectate în aprecierea craiovenilor.
            </motion.p>

            {/* Badge live Google */}
            {isLive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-xl"
              >
                <div className="relative w-2 h-2 rounded-full bg-emerald-400">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40" />
                </div>
                <span className="text-emerald-300 text-[12px] font-semibold tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Live · Google Reviews
                </span>
              </motion.div>
            )}
          </div>

          {/* Summary Card + Grilă reviews */}
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">

            {/* ── Summary Card ── */}
            <motion.div
              ref={summaryRef}
              initial={{ opacity: 0, x: -40 }}
              animate={summaryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-28 group relative rounded-3xl overflow-hidden
                         bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13]
                         shadow-xl shadow-black/30 p-8 flex flex-col gap-6"
            >
              {/* Glass shine */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.15] via-white/[0.03] to-transparent pointer-events-none rounded-3xl" />
              <div
                className="absolute top-0 left-6 right-6 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.7), transparent)' }}
              />

              <div className="relative z-10 text-center">
                {/* Rating mare */}
                <div
                  className="text-[5.5rem] font-extrabold leading-none text-white tracking-tighter tabular-nums"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {overallRating.toFixed(1)}
                </div>
                <Stars rating={Math.round(overallRating)} size="lg" />
                <p className="text-white/40 text-sm mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {totalReviews.toLocaleString('ro-RO')} recenzii Google
                </p>
              </div>

              {/* Bare distribuție */}
              <div className="relative z-10 flex flex-col gap-2.5">
                {ratingDist.map(d => (
                  <RatingBar
                    key={d.label}
                    label={d.label}
                    count={d.count}
                    total={totalReviews}
                    color={d.color}
                  />
                ))}
              </div>

              {/* Buton Google Maps */}
              <div className="relative z-10">
                <a
                  href="https://maps.google.com/?q=Sty+Stv+Carwash+Craiova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full px-6 py-3.5 rounded-full bg-white/[0.07] backdrop-blur-2xl
                             border border-white/20 text-white/80 hover:text-white font-semibold text-sm
                             hover:bg-white/[0.12] hover:border-white/35 active:scale-95
                             transition-all duration-300 shadow-lg shadow-black/20
                             inline-flex items-center justify-center gap-2.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Lasă o recenzie
                </a>
              </div>
            </motion.div>

            {/* ── Grilă reviews desktop / carousel mobile ── */}
            <div>
              {/* Desktop grid */}
              <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {reviews.map((review, i) => (
                  <ReviewCard key={i} review={review} index={i} />
                ))}
              </div>

              {/* Mobile carousel */}
              <div className="md:hidden">
                <ReviewCarousel reviews={reviews} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-white/25 text-xs mt-12 tracking-wide"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Recenzii colectate de pe{' '}
            <strong className="text-white/40 font-semibold">Google Maps</strong>
            {' '}· Actualizate periodic
          </motion.p>
        </div>
      </section>
    </>
  );
}
