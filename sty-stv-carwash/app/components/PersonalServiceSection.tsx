'use client';

import { motion } from 'framer-motion';
import BlurText from './animations/BlurText';
import Image from 'next/image';

export default function PersonalServiceSection() {
  return (
    <section 
      id="serviciu-complet" 
      className="relative z-10 py-28 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/2.jpg"
          alt="Serviciu Complet cu Personal Sty & Stv Carwash Craiova"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
      </div>

      {/* Gradient sus */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Titlu principal */}
        <div className="text-center mb-16">
          <BlurText
            text="Serviciu Complet cu Personal"
            delay={60}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white justify-center"
          />
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
            Confort maxim. Rezultate profesionale. Mașina ta în mâini sigure.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Columna stângă */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Program de lucru */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/[0.08] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🕒</div>
                <h3 className="text-2xl font-bold text-white">Program Personal</h3>
              </div>
              
              <div className="space-y-4 text-white/80">
                <div className="flex justify-between">
                  <span>Luni – Vineri</span>
                  <span className="font-semibold text-white">08:00 – 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sâmbătă</span>
                  <span className="font-semibold text-white">08:00 – 16:00</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Duminică</span>
                  <span>Închis</span>
                </div>
              </div>
              <p className="text-xs text-white/50 mt-6">* Ultima intrare cu 30 minute înainte de închidere</p>
            </motion.div>

            {/* Ce include serviciul complet */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Ce facem pentru tine:</h3>
              
              <div className="space-y-5">
                {[
                  { icon: "🚿", title: "Spălare Exterioară Premium", desc: "Spălare completă cu spumă activă, curățare jante, uscare profesională sau la cerere" },
                  { icon: "🧹", title: "Curățare Interior Detaliată", desc: "Aspirare puternică, curățare tapițerie, bord, geamuri, plastice și zone greu accesibile" },
                  { icon: "✨", title: "Finisaje & Protecție", desc: "Dressing cauciucuri, polish interior, parfum premium" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="text-4xl flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-1.5">{item.title}</h4>
                      <p className="text-white/70 text-[15px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Columna dreaptă - Card Principal */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] rounded-3xl p-10 md:p-14 h-full flex flex-col"
            >
              {/* Iconița în DREAPTA titlului */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                  De ce să alegi serviciul cu personal?
                </h3>
                <div className="text-[#e30613] text-6xl flex-shrink-0">🧑‍🔧</div>
              </div>

              <ul className="space-y-5 text-white/80 flex-1">
                {[
                  "Echipă experimentată cu peste 20 ani de practică",
                  "Atenție la detalii și finisaje de calitate premium",
                  "Timp economisit – tu te relaxezi, noi ne ocupăm de tot",
                  "Rezultate superioare față de spălarea self-wash",
                  "Personal amabil și profesionist",
                  "Flexibilitate – poți alege exact serviciile dorite"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#e30613] text-xl leading-none mt-0.5">✔</span>
                    <span className="leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Buton stil Hero Section */}
              <div className="mt-auto pt-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a 
                    href="#contact"
                    className="relative px-10 py-4 rounded-full bg-[#e30613]/20 backdrop-blur-2xl border border-[#e30613]/50 text-white font-semibold text-base hover:bg-[#e30613]/30 hover:border-[#e30613]/70 active:scale-95 transition-all duration-300 shadow-lg shadow-[#e30613]/20 inline-flex items-center justify-center gap-3"
                  >
                    <span className="text-2xl">📞</span>
                    <span className="relative z-10">Informații suplimentare</span>
                  </a>
                </motion.div>
                <p className="text-center text-white/50 text-sm mt-4">Răspundem rapid la telefon sau WhatsApp</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gradient jos */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
}