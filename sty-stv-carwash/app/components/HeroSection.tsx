'use client';

import Aurora from './animations/Aurora';
import BlurText from './animations/BlurText';
import RotatingText from './animations/RotatingText';
import CountUp from './animations/CountUp';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 pt-24 sm:pt-20 pb-12 overflow-hidden">

      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          topColor="#ff2929"
          bottomColor="#234efb"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.5}
          noiseIntensity={0}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="color-dodge"
          quality="high"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* ─── MOBILE layout (< lg) ─────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center lg:hidden gap-8">

          {/* Title */}
          <div className="flex flex-wrap items-end justify-center gap-x-2 gap-y-0">
            <BlurText text="ST" delay={200} animateBy="letters" direction="top"
              className="text-[4rem] sm:text-[5rem] font-extrabold tracking-[-0.05em] leading-none text-white" />
            <BlurText text="Y" delay={320} animateBy="letters" direction="top"
              className="text-[4rem] sm:text-[5rem] font-extrabold tracking-[-0.05em] leading-none text-[#e30613]" />
            <span className="text-[4rem] sm:text-[5rem] font-extrabold tracking-[-0.05em] leading-none text-white/40">&amp;</span>
            <BlurText text="ST" delay={440} animateBy="letters" direction="top"
              className="text-[4rem] sm:text-[5rem] font-extrabold tracking-[-0.05em] leading-none text-white" />
            <BlurText text="V" delay={560} animateBy="letters" direction="top"
              className="text-[4rem] sm:text-[5rem] font-extrabold tracking-[-0.05em] leading-none text-[#e30613]" />
          </div>

          {/* "Înseamnă" + RotatingText */}
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-lg font-semibold text-white/80">Înseamnă</p>
            <div className="relative min-h-[56px] flex items-center">
              <RotatingText
                texts={['experiență', 'profesionalism', 'tradiție']}
                mainClassName="px-6 py-2.5 bg-[#e30613] text-white font-bold text-xl overflow-hidden rounded-xl shadow-xl shadow-red-900/50 transition-all duration-700 ease-out"
                staggerFrom="last"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: 'spring', damping: 35, stiffness: 320 }}
                rotationInterval={2200}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/65 max-w-xs sm:max-w-sm leading-relaxed font-light">
            De peste 2 decenii, ne-am dedicat constant îmbunătățirii experiențelor clienților noștri.
            Spălătorie auto modernă, hibrid, cu 5 posturi performante în inima Craiovei.
          </p>

          {/* Stats — horizontal scroll row on small screens, 3-col grid on sm+ */}
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {[
              { from: 0, to: 20,  suffix: '+',  label: 'Ani de experiență',  description: 'De când îngrijim mașinile craiovenilor' },
              { from: 0, to: 5,   suffix: '',   label: 'Posturi moderne',    description: 'Echipamente de ultimă generație' },
              { from: 0, to: 4.9, suffix: '★', decimals: true, label: 'Rating clienți', description: 'Bazat pe sute de recenzii' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-5"
              >
                {/* Big number left */}
                <div className="text-4xl font-bold text-white tracking-tighter flex items-baseline shrink-0">
                  <CountUp from={stat.from} to={stat.to} duration={2.2} separator="," startWhen={true} />
                  <span className="text-3xl text-[#e30613] ml-1">{stat.suffix}</span>
                </div>
                {/* Text right */}
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-white/90">{stat.label}</span>
                  <span className="text-[11px] text-white/45 leading-snug mt-0.5">{stat.description}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="w-full px-8 py-3.5 rounded-full bg-[#e30613]/20 backdrop-blur-2xl border border-[#e30613]/50 text-white font-semibold text-sm hover:bg-[#e30613]/30 hover:border-[#e30613]/70 active:scale-95 transition-all duration-300 shadow-lg shadow-[#e30613]/20"
            >
              Spală-ți mașina acum
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72, ease: 'easeOut' }}
              className="w-full px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/40 text-white font-semibold text-sm hover:bg-white/20 hover:border-white/60 active:scale-95 transition-all duration-300"
            >
              Vezi serviciile noastre
            </motion.button>
          </div>
        </div>

        {/* ─── DESKTOP layout (lg+) — unchanged ────────────────────────── */}
        <div className="hidden lg:grid grid-cols-2 gap-12 items-center">

          {/* Left — Title + text + buttons */}
          <div className="flex flex-col items-start text-left">

            <div className="mb-6 flex flex-wrap items-end justify-start gap-x-2 gap-y-1">
              <BlurText text="ST" delay={200} animateBy="letters" direction="top"
                className="text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-white" />
              <BlurText text="Y" delay={320} animateBy="letters" direction="top"
                className="text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-[#e30613]" />
              <span className="text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-white/40">&amp;</span>
              <BlurText text="ST" delay={440} animateBy="letters" direction="top"
                className="text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-white" />
              <BlurText text="V" delay={560} animateBy="letters" direction="top"
                className="text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-[#e30613]" />
            </div>

            <div className="mb-12 flex flex-row items-center justify-start gap-4 w-full">
              <p className="text-3xl font-semibold text-white/90 whitespace-nowrap">Înseamnă</p>
              <div className="relative min-h-[68px] flex items-center">
                <RotatingText
                  texts={['experiență', 'profesionalism', 'tradiție']}
                  mainClassName="px-8 md:px-10 py-3 bg-[#e30613] text-white font-bold text-2xl md:text-3xl overflow-hidden rounded-2xl shadow-xl shadow-red-900/50 transition-all duration-700 ease-out"
                  staggerFrom="last"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-1"
                  transition={{ type: 'spring', damping: 35, stiffness: 320 }}
                  rotationInterval={2200}
                />
              </div>
            </div>

            <p className="text-lg text-white/70 max-w-md leading-relaxed mb-12 font-light">
              De peste 2 decenii, ne-am dedicat constant îmbunătățirii experiențelor clienților noștri.<br />
              Spălătorie auto modernă, hibrid, cu 5 posturi performante în inima Craiovei.
            </p>

            <div className="flex flex-row gap-4">
              <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}>
                <button className="relative px-10 py-4 rounded-full bg-[#e30613]/20 backdrop-blur-2xl border border-[#e30613]/50 text-white font-semibold text-base hover:bg-[#e30613]/30 hover:border-[#e30613]/70 active:scale-95 transition-all duration-300 shadow-lg shadow-[#e30613]/20">
                  <span className="relative z-10">Spală-ți mașina acum</span>
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}>
                <button className="relative px-10 py-4 rounded-full bg-white/10 backdrop-blur-2xl border border-white/40 text-white font-semibold text-base hover:bg-white/20 hover:border-white/60 active:scale-95 transition-all duration-300">
                  <span className="relative z-10">Vezi serviciile noastre</span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right — Stats */}
          <div className="flex flex-col gap-5 items-end">
            {[
              { from: 0, to: 20,  suffix: '+',  label: 'Ani de experiență',  description: 'De când îngrijim mașinile craiovenilor' },
              { from: 0, to: 5,   suffix: '',   label: 'Posturi moderne',    description: 'Echipamente de ultimă generație' },
              { from: 0, to: 4.9, suffix: '★', decimals: true, label: 'Rating clienți', description: 'Bazat pe sute de recenzii' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-[320px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-7 hover:bg-white/15 hover:border-white/40 transition-all duration-300 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: 'backOut' }}
                  className="text-5xl font-bold text-white tracking-tighter mb-2 flex items-baseline"
                >
                  <CountUp from={stat.from} to={stat.to} duration={2.2} separator="," startWhen={true} />
                  <span className="text-4xl text-[#e30613] ml-1">{stat.suffix}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.75 + i * 0.15 }}
                  className="text-lg font-semibold text-white/90 tracking-wide mb-1"
                >
                  {stat.label}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.15 }}
                  className="text-sm text-white/50 leading-relaxed max-w-[220px]"
                >
                  {stat.description}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
