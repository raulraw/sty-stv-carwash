'use client';

import { motion } from 'framer-motion';
import BlurText from './animations/BlurText';
import Image from 'next/image';

export default function ChooseServiceSection() {
  return (
    <section 
      id="servicii" 
      className="relative z-10 py-28 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/servicii.jpg"
          alt="Spălătorie auto Sty & Stv Carwash Craiova"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Titlu */}
        <div className="text-center mb-16">
          <BlurText
            text="Alege cum dorești să-ți răsfeți mașina"
            delay={60}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white justify-center"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card Self-Wash - BUTON ALB */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col h-full bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] 
                       rounded-3xl overflow-hidden hover:bg-white/[0.11] hover:border-white/25 
                       transition-all duration-500 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/40 
                       hover:-translate-y-2 p-10 sm:p-12"
          >
            <div className="flex-1">
              <div className="text-[#e30613] text-5xl mb-6">✋</div>
              <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tight">
                Self-Wash
              </h3>
              <p className="text-white/70 text-[15.5px] leading-relaxed">
                5 posturi moderne cu echipamente de ultimă generație. 
                Tu controlezi procesul complet – rapid, economic și satisfăcător.
              </p>
            </div>

            <div className="mt-10">
              <motion.a 
                href="#programe"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-10 py-4 rounded-full bg-white/10 backdrop-blur-2xl border border-white/40 text-white font-semibold text-base hover:bg-white/20 hover:border-white/60 active:scale-95 transition-all duration-300 shadow-lg shadow-white/10 inline-flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <span className="relative z-10">Descoperă Self-Wash</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Card Serviciu Complet cu Personal - BUTON ROȘU */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col h-full bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] 
                       rounded-3xl overflow-hidden hover:bg-white/[0.11] hover:border-white/25 
                       transition-all duration-500 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/40 
                       hover:-translate-y-2 p-10 sm:p-12 relative"
          >
            {/* Badge Recomandat */}
            <motion.div 
              className="absolute top-7 right-7 bg-[#e30613] text-white text-xs font-bold px-5 py-1.5 rounded-full tracking-widest shadow-lg"
              animate={{ 
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 0 0 rgba(227, 6, 19, 0.4)",
                  "0 0 0 12px rgba(227, 6, 19, 0)",
                  "0 0 0 0 rgba(227, 6, 19, 0)"
                ]
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              RECOMANDAT
            </motion.div>

            <div className="flex-1">
              <div className="text-[#e30613] text-5xl mb-6">🧑‍🔧</div>
              <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tight">
                Serviciu Complet cu Personal
              </h3>
              <p className="text-white/70 text-[15.5px] leading-relaxed">
                Ultimul post este dedicat confortului maxim. Echipa noastră experimentată și prietenoasă 
                se ocupă integral de mașina ta cu atenție și profesionalism.
              </p>
            </div>

            <div className="mt-10">
              <motion.a 
                href="#serviciu-complet"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-10 py-4 rounded-full bg-[#e30613]/20 backdrop-blur-2xl border border-[#e30613]/50 text-white font-semibold text-base hover:bg-[#e30613]/30 hover:border-[#e30613]/70 active:scale-95 transition-all duration-300 shadow-lg shadow-[#e30613]/20 inline-flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <span className="relative z-10">Descoperă serviciile personalului</span>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
}