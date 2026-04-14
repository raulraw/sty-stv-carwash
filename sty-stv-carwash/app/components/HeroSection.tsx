'use client';

import Aurora from './animations/Aurora';
import BlurText from './animations/BlurText';
import RotatingText from './animations/RotatingText';
import CountUp from './animations/CountUp';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center px-6 pt-20 overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* PARTEA STÂNGĂ – Titlu + Texte */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div className="mb-6 flex flex-wrap items-end justify-center lg:justify-start gap-x-2 gap-y-1">
            <BlurText
              text="ST"
              delay={200}
              animateBy="letters"
              direction="top"
              className="text-[5.2rem] md:text-[6.5rem] lg:text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-white"
            />
            <BlurText
              text="Y"
              delay={320}
              animateBy="letters"
              direction="top"
              className="text-[5.2rem] md:text-[6.5rem] lg:text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-[#e30613]"
            />
            <span className="text-[5.2rem] md:text-[6.5rem] lg:text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-[#e30613]"> &amp; </span>
            <BlurText
              text="ST"
              delay={440}
              animateBy="letters"
              direction="top"
              className="text-[5.2rem] md:text-[6.5rem] lg:text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-white"
            />
            <BlurText
              text="V"
              delay={560}
              animateBy="letters"
              direction="top"
              className="text-[5.2rem] md:text-[6.5rem] lg:text-[7.2rem] font-extrabold tracking-[-0.05em] leading-none text-[#e30613]"
            />
          </div>

          {/* Înseamnă + RotatingText */}
          <div className="mb-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
            <p className="text-2xl md:text-3xl font-semibold text-white/90 whitespace-nowrap">
              Înseamnă
            </p>
            <div className="relative min-h-[68px] flex items-center">
              <RotatingText
                texts={['experiență', 'profesionalism', 'tradiție']}
                mainClassName="px-8 md:px-10 py-3 bg-[#e30613] text-white font-bold text-2xl md:text-3xl overflow-hidden rounded-2xl shadow-xl shadow-red-900/50 transition-all duration-700 ease-out"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 35, stiffness: 320 }}
                rotationInterval={2200}
              />
            </div>
          </div>

          {/* Descriere actualizată cu stilul tău oficial */}
          <p className="text-base md:text-lg text-white/70 max-w-md leading-relaxed mb-12 font-light px-4 lg:px-0">
            De peste 2 decenii, ne-am dedicat constant îmbunătățirii experiențelor clienților noștri.<br />
            Spălătorie auto modernă, hibrid, cu 5 posturi performante în inima Craiovei.
          </p>

          {/* Butoane */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
            >
              <button className="relative px-10 py-4 rounded-full bg-[#e30613]/20 backdrop-blur-2xl border border-[#e30613]/50 text-white font-semibold text-base hover:bg-[#e30613]/30 hover:border-[#e30613]/70 active:scale-95 transition-all duration-300 shadow-lg shadow-[#e30613]/20 w-full sm:w-auto">
                <span className="relative z-10">Spală-ți mașina acum</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <button className="relative px-10 py-4 rounded-full bg-white/10 backdrop-blur-2xl border border-white/40 text-white font-semibold text-base hover:bg-white/20 hover:border-white/60 active:scale-95 transition-all duration-300 w-full sm:w-auto">
                <span className="relative z-10">Vezi serviciile noastre</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* PARTEA DREAPTĂ – Statistici */}
        <div className="flex flex-col gap-5 items-center lg:items-end">
          {[
            { from: 0, to: 20, suffix: '+', label: 'Ani de experiență', description: 'De când îngrijim mașinile craiovenilor' },
            { from: 0, to: 5, suffix: '', label: 'Posturi moderne', description: 'Echipamente de ultimă generație' },
            { from: 0, to: 4.9, suffix: '★', decimals: true, label: 'Rating clienți', description: 'Bazat pe sute de recenzii' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="w-full max-w-[320px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-7 hover:bg-white/15 hover:border-white/40 transition-all duration-300 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + i * 0.15,
                  ease: "backOut",
                }}
                className="text-5xl font-bold text-white tracking-tighter mb-2 flex items-baseline"
              >
                <CountUp
                  from={stat.from}
                  to={stat.to}
                  duration={2.2}
                  separator=","
                  startWhen={true}
                />
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
    </section>
  );
}