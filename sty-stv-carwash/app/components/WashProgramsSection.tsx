'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from './animations/CountUp';
import BlurText from './animations/BlurText';

const Icons = {
  Degresant: () => <span className="text-4xl">🧼</span>,
  SuperSpuma: () => <span className="text-4xl">🫧</span>,
  Lanta: () => <span className="text-4xl">🚿</span>,
  Presiune: () => <span className="text-4xl">💨</span>,
  Ceruire: () => <span className="text-4xl">✨</span>,
  Osmoza: () => <span className="text-4xl">💧</span>,
  Stop: () => <span className="text-4xl">⏸️</span>,
};

const PROGRAMS = [
  {
    id: 1,
    Icon: Icons.Degresant,
    name: 'Degresant',
    description: 'Îndepărtează uleiurile, grăsimile și murdăria persistentă de pe caroserie, pregătind suprafața pentru etapele următoare.',
    seconds: 90,
    accent: '#ff6b35',
    isStop: false,
  },
  {
    id: 2,
    Icon: Icons.SuperSpuma,
    name: 'Super Spumă',
    description: 'Spumă activă cu densitate ridicată care penetrează adânc în pori, înmuiind particulele de mizerie fără a zgâria lacul.',
    seconds: 90,
    accent: '#4fc3f7',
    isStop: false,
  },
  {
    id: 3,
    Icon: Icons.Lanta,
    name: 'Lanță cu Spumă',
    description: 'Jet puternic cu spumă activă aplicat direct pe suprafețe, asigurând o curățare uniformă și profundă pe toată caroseria.',
    seconds: 90,
    accent: '#a78bfa',
    isStop: false,
  },
  {
    id: 4,
    Icon: Icons.Presiune,
    name: 'Spălare cu Presiune',
    description: 'Jet de apă la presiune înaltă care elimină complet reziduurile de spumă și murdărie, lăsând suprafața perfect curată.',
    seconds: 140,
    accent: '#34d399',
    isStop: false,
  },
  {
    id: 5,
    Icon: Icons.Ceruire,
    name: 'Ceruire',
    description: 'Ceară profesională aplicată uniform formează un strat protector care oferă luciu intens și protejează lacul de factori externi.',
    seconds: 90,
    accent: '#fbbf24',
    isStop: false,
  },
  {
    id: 6,
    Icon: Icons.Osmoza,
    name: 'Osmoză',
    description: 'Apă demineralizată prin osmoză inversă pentru clătirea finală — elimină urmele de calcar și lasă caroseria cu luciu de oglindă.',
    seconds: 120,
    accent: '#38bdf8',
    isStop: false,
  },
  {
    id: 7,
    Icon: Icons.Stop,
    name: 'Stop',
    description: 'Pauză netaxabilă care îți oferă timp să inspectezi rezultatul sau să pregătești mașina pentru etapa dorită.',
    seconds: 60,
    accent: '#94a3b8',
    isStop: true,
  },
];

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function ProgramCard({
  program,
  index,
}: {
  program: (typeof PROGRAMS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { Icon } = program;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`Program ${program.name} — ${formatTime(program.seconds)}`}
      className="group relative flex flex-col w-full h-full rounded-3xl overflow-hidden
                 bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13]
                 hover:bg-white/[0.11] hover:border-white/25
                 active:bg-white/[0.14] active:border-white/30
                 transition-all duration-500 ease-out
                 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/40
                 hover:-translate-y-1.5 active:scale-[0.985]
                 max-w-full mx-auto px-4 sm:px-0"
    >
      {/* Glow effect - vizibil și pe mobil la atingere */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-75 
                   transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${program.accent}25 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Linie accent deasupra */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-45 group-hover:opacity-100 
                   group-active:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${program.accent}, transparent)` }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.03] to-transparent pointer-events-none rounded-3xl" />

      <div className="relative z-10 flex flex-col h-full p-6 sm:p-7">
        <div className="flex justify-center mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/15
                       backdrop-blur-xl transition-all duration-300 group-hover:scale-110 active:scale-105"
            style={{ background: `${program.accent}1a`, color: program.accent }}
          >
            <Icon />
          </div>
        </div>

        <div
          className="text-[10px] font-bold tracking-[0.25em] uppercase text-center mb-2"
          style={{ color: `${program.accent}70` }}
        >
          {program.isStop ? 'Pauză' : `Program 0${program.id}`}
        </div>

        <h3 className="text-lg font-extrabold text-white tracking-tight text-center mb-4 leading-snug">
          {program.name}
        </h3>

        <p className="text-[13px] text-white/55 leading-relaxed text-center flex-1">
          {program.description}
        </p>

        {program.isStop && (
          <div className="flex justify-center mt-4">
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
              style={{ color: program.accent, borderColor: `${program.accent}45`, background: `${program.accent}12` }}
            >
              Netaxabil
            </span>
          </div>
        )}

        <div
          className="mt-5 mb-4 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${program.accent}30, transparent)` }}
        />

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/30 font-semibold">Durată</span>
          <div
            className="flex items-baseline gap-1 font-extrabold text-[2rem] leading-none tabular-nums"
            style={{ color: program.accent }}
          >
            <CountUp from={0} to={program.seconds} duration={1.6} delay={index * 0.07 + 0.25} startWhen={true} />
            <span className="text-sm font-semibold text-white/40 ml-0.5">sec</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function AnimatedEyebrow({ inView }: { inView: boolean }) {
  const leftDash = '──────────';
  const label = '  SELF-WASH  ';
  const rightDash = '──────────';
  const full = (leftDash + label + rightDash).split('');

  return (
    <div className="flex items-center justify-center mb-5 overflow-hidden" aria-label="Posturi Self-Wash" role="presentation">
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

export default function WashProgramsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  const ROW1 = PROGRAMS.slice(0, 4);
  const ROW2 = PROGRAMS.slice(4);

  return (
    <section
      id="programe"
      className="relative z-10 py-28 bg-black/70 backdrop-blur-sm overflow-hidden"
      aria-labelledby="wash-programs-title"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <AnimatedEyebrow inView={titleInView} />

          <h2 id="wash-programs-title" className="mb-5">
            <BlurText
              text="Programe de spălare"
              delay={60}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white justify-center"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-white/45 text-base max-w-lg mx-auto leading-relaxed"
          >
            Fiecare post dispune de 7 programe selectabile, concepute pentru
            o curățare completă și profesională.
          </motion.p>
        </div>

        {/* Row 1 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 px-2 sm:px-0"
          role="list"
          aria-label="Programe spălare 1-4"
        >
          {ROW1.map((program, i) => (
            <div key={program.id} role="listitem" className="flex">
              <ProgramCard program={program} index={i} />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div
          className="flex flex-wrap justify-center gap-6 px-2 sm:px-0"
          role="list"
          aria-label="Programe spălare 5-7"
        >
          {ROW2.map((program, i) => (
            <div
              key={program.id}
              role="listitem"
              className="flex w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-15px)]"
            >
              <ProgramCard program={program} index={ROW1.length + i} />
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-white/25 text-xs mt-10 tracking-wide"
        >
          * Programul{' '}
          <strong className="text-white/45 font-semibold">Stop</strong>{' '}
          este o pauză netaxabilă de 60 de secunde, disponibilă o singură dată per sesiune.
        </motion.p>
      </div>
    </section>
  );
}