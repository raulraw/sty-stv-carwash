'use client';

import { motion } from 'framer-motion';
import BlurText from './animations/BlurText';
import Image from 'next/image';

const benefits = [
  {
    title: "20+ Ani Tradiție",
    desc: "De peste două decenii ne dedicăm constant îmbunătățirii experiențelor clienților noștri.",
    icon: "🌟",
    color: "#e30613"
  },
  {
    title: "Zonă Interioară Protejată",
    desc: "Spațiul dedicat spălării interioare este complet acoperit ca într-o hală — protejat de soare, ploaie, vânt și praf.",
    icon: "🏠",
    color: "#3b82f6"
  },
  {
    title: "Apă Osmozată Premium",
    desc: "Clătire finală cu apă purificată prin osmoză inversă — cel mai înalt standard. Rezultat de oglindă fără urme de calcar.",
    icon: "💎",
    color: "#22d3ee"
  },
  {
    title: "Produse Profesionale Concentrate",
    desc: "Soluții de top cu putere mare de curățare și concentrație ridicată. Eficiență maximă și protecție de lungă durată.",
    icon: "🧪",
    color: "#eab308"
  },
  {
    title: "Flexibilitate Maximă",
    desc: "Alege Self-Wash sau Serviciu Complet cu personal. Tu decizi: vrei control total sau vrei să te relaxezi complet.",
    icon: "🔄",
    color: "#c026d3"
  },
  {
    title: "Timp Generos & Preț Corect",
    desc: "Programe suficient de lungi și un raport calitate-preț excelent. Calitate profesională fără să plătești în exces.",
    icon: "⏱️",
    color: "#4ade80"
  }
];

export default function WhyChooseSection() {
  return (
    <section id="de-ce-noi" className="relative z-10 py-28 bg-black overflow-hidden">
      {/* Top & Bottom Blur Gradients */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Centrat */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="w-full flex justify-center">
            <BlurText
              text="De ce să alegi serviciile Sty & Stv"
              delay={60}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6"
            />
          </div>
          <p className="text-white/70 max-w-2xl text-lg md:text-xl">
            Tradiție, calitate și atenție la detalii — de peste 20 de ani.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Card Mare Stânga cu Imagine */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative bg-zinc-950 border border-white/[0.12] rounded-3xl overflow-hidden h-full min-h-[520px] group"
          >
            <div className="absolute inset-0">
              <Image 
                src="/images/33.webp" 
                alt="Spălătorie Sty & Stv Carwash" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Gradient mai puternic jos pentru text lizibil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
            </div>

            {/* Text centrat în mijlocul cardului */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-10 md:px-14 gap-5">
              <div className="text-6xl">🚗</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Mașina ta merită<br />ce e mai bun
              </h3>
              <p className="text-white/75 text-[15px] md:text-[15.5px] leading-relaxed max-w-xs">
                La Sty & Stv combinăm echipamente moderne, produse profesionale și experiența acumulată în peste 20 de ani.
              </p>
            </div>
          </motion.div>

          {/* Grid Carduri Dreapta */}
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] hover:border-white/30 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center"
              >
                {/* Glow Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{ 
                    background: `radial-gradient(ellipse at 50% 20%, ${benefit.color}25 0%, transparent 70%)` 
                  }}
                />

                <div className="text-5xl mb-6 transition-transform group-hover:scale-110">
                  {benefit.icon}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {benefit.title}
                </h4>

                <p className="text-white/70 leading-relaxed text-[15px] flex-1">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Line */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="inline-flex items-center gap-8 text-sm tracking-[3px] text-white/40 font-semibold">
            <div className="h-px w-12 bg-white/20" />
            TRADIȚIE • CALITATE • EXCELENȚĂ
            <div className="h-px w-12 bg-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
