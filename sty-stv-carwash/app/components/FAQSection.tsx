'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import BlurText from './animations/BlurText';

const FAQS = [
  {
    id: 1,
    question: 'Care este diferența dintre Self-Wash și Serviciul Complet cu Personal?',
    answer:
      'La Self-Wash ai control total — tu operezi echipamentele la unul din cele 4 posturi moderne, în ritmul tău. Serviciul Complet cu Personal înseamnă că echipa noastră se ocupă integral de mașina ta: spălare exterioară, curățare interior, jante, tapițerie și finisaje premium. Ideal dacă vrei confort maxim și rezultate de detaliu.',
  },
  {
    id: 2,
    question: 'Câte programe are un post Self-Wash și ce includ?',
    answer:
      'Fiecare post dispune de 7 programe selectabile: Degresant, Super Spumă, Lanță cu Spumă, Spălare cu Presiune, Ceruire, Osmoză și Stop. Programul Stop este o pauză netaxabilă de 60 de secunde, disponibilă o singură dată per sesiune, ca să poți inspecta rezultatul.',
  },
  {
    id: 3,
    question: 'Ce înseamnă spălarea cu apă osmozată?',
    answer:
      'Apa osmozată este apă demineralizată prin osmoză inversă — procesul elimină calcarul și mineralele din apă. Rezultatul: caroseria se usucă fără pete albe sau urme de calcar, lăsând lacul cu un luciu de oglindă fără a necesita uscare manuală.',
  },
  {
    id: 4,
    question: 'Care este programul de lucru al serviciului cu personal?',
    answer:
      'Echipa noastră este disponibilă Luni–Vineri între 08:00–17:00 și Sâmbătă între 08:00–16:00. Duminica suntem închiși. Ultima intrare se acceptă cu 30 de minute înainte de închidere. Posturile Self-Wash au un program extins — verifică afișajul la locație.',
  },
  {
    id: 5,
    question: 'Unde sunt localizați și există loc de parcare în așteptare?',
    answer:
      'Sty & Stv Carwash se află în inima Craiovei, cu acces facil și spațiu de așteptare. Dispunem de parcare dedicată clienților pe toată durata serviciului. Adresa exactă și indicațiile GPS le găsești în secțiunea Contact.',
  },
  {
    id: 6,
    question: 'Puteți spăla orice tip de vehicul — SUV-uri, dube, mașini joase?',
    answer:
      'Da — echipamentele noastre sunt calibrate pentru o gamă largă de vehicule: autoturisme clasice, SUV-uri, crossover-uri și vehicule utilitare de dimensiuni medii. Pentru vehicule speciale sau foarte înalte, recomandăm să ne contactați în prealabil pentru a confirma compatibilitatea.',
  },
];

function AnimatedEyebrow({ inView }: { inView: boolean }) {
  const leftDash  = '──────────';
  const label     = '  FAQ  ';
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

function FAQCard({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.article
        layout
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative rounded-3xl overflow-hidden border backdrop-blur-2xl
          shadow-xl shadow-black/30 transition-colors duration-500
          ${isOpen
            ? 'bg-white/[0.11] border-white/25 shadow-black/40'
            : 'bg-white/[0.07] border-white/[0.13] hover:bg-white/[0.10] hover:border-white/20'
          }`}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px transition-all duration-500 pointer-events-none"
          style={{
            background: isOpen
              ? 'linear-gradient(90deg, transparent, #e30613aa, transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
          }}
        />

        {/* Glass shine — identic cu ProgramCard */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.03] to-transparent pointer-events-none rounded-3xl" />

        {/* Hover glow — identic cu ProgramCard */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(227,6,19,0.10) 0%, transparent 70%)' }}
        />

        {/* Question row */}
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="relative z-10 w-full flex items-center gap-5 px-7 py-6 text-left cursor-pointer"
        >
          {/* Index — același stil ca "Program 01" */}
          <div
            className="flex-shrink-0 text-[10px] font-bold tracking-[0.22em] uppercase w-8 text-center transition-colors duration-300"
            style={{ color: isOpen ? '#e30613' : 'rgba(255,255,255,0.25)', fontFamily: "'Outfit', sans-serif" }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          <span
            className="flex-1 font-extrabold text-[15px] md:text-[16px] leading-snug tracking-tight transition-colors duration-300"
            style={{
              color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.82)',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {faq.question}
          </span>

          {/* Plus rotit 45° când deschis */}
          <motion.div
            className="flex-shrink-0 w-8 h-8 rounded-2xl flex items-center justify-center border transition-colors duration-300"
            style={{
              background: isOpen ? 'rgba(227,6,19,0.15)' : 'rgba(255,255,255,0.06)',
              borderColor: isOpen ? 'rgba(227,6,19,0.40)' : 'rgba(255,255,255,0.12)',
            }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1V10M1 5.5H10"
                stroke={isOpen ? '#e30613' : 'rgba(255,255,255,0.45)'}
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height:  { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.28, delay: 0.08 },
              }}
              className="overflow-hidden"
            >
              <div className="relative z-10 px-7 pb-7">
                <div
                  className="mb-5 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.35), transparent)' }}
                />
                <p
                  className="text-[14.5px] leading-relaxed text-white/60"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const titleRef             = useRef<HTMLDivElement>(null);
  const titleInView          = useInView(titleRef, { once: true, margin: '-80px' });

  const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      <section
        id="faq"
        className="relative z-10 py-28 bg-black overflow-hidden"
        aria-labelledby="faq-title"
      >
        {/* Gradienți standard h-24 */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">

          {/* Header — identic cu WashProgramsSection */}
          <div ref={titleRef} className="text-center mb-14">
            <AnimatedEyebrow inView={titleInView} />
            <h2 id="faq-title" className="mb-5">
              <BlurText
                text="Întrebări frecvente"
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
              Tot ce trebuie să știi despre serviciile noastre, programele de spălare și cum funcționăm.
            </motion.p>
          </div>

          {/* FAQ cards */}
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                index={i}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-14 flex flex-col items-center gap-4"
          >
            <p className="text-white/35 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Nu ai găsit răspunsul?
            </p>
            <a
              href="#contact"
              className="relative px-10 py-4 rounded-full bg-[#e30613]/20 backdrop-blur-2xl border border-[#e30613]/50 text-white font-semibold text-base hover:bg-[#e30613]/30 hover:border-[#e30613]/70 active:scale-95 transition-all duration-300 shadow-lg shadow-[#e30613]/20 inline-flex items-center justify-center gap-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="text-xl">💬</span>
              <span className="relative z-10">Contactează-ne direct</span>
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}
