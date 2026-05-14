'use client';

import LiquidGlassNavbar from '../components/LiquidGlassNavbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import BlurText from '../components/animations/BlurText';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <LiquidGlassNavbar />

      {/* HERO */}
      <section className="relative h-[52vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/11.webp"
            alt="Sty & Stv Carwash Craiova - Contact"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

        <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl w-full">
          <BlurText
            text="Contact"
            delay={60}
            animateBy="words"
            direction="top"
            className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-white text-center w-full justify-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 font-light text-center w-full"
          >
            Suntem aici pentru tine. Scrie-ne sau sună-ne oricând.
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-[1600px] mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[320px_1fr_400px] gap-8 lg:gap-10">

          {/* COLOANA 1 — Carduri Contact */}
          <div className="space-y-5 flex flex-col">

            {/* Telefon */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] rounded-3xl p-7 hover:bg-white/[0.11] hover:border-white/25 transition-all flex-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.03] to-transparent rounded-3xl" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(227,6,19,0.15) 0%, transparent 70%)' }}
              />
              <div className="flex flex-col items-center justify-center text-center gap-3 relative z-10 h-full">
                <div className="w-12 h-12 bg-[#e30613]/10 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#e30613]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs tracking-widest mb-2">SUNĂ-NE</p>
                  <a href="tel:+40742488300" className="block text-lg font-semibold hover:text-[#e30613] transition-colors leading-snug">
                    0742 488 300
                  </a>
                  <a href="tel:+40745568011" className="block text-lg font-semibold hover:text-[#e30613] transition-colors leading-snug">
                    0745 568 011
                  </a>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] rounded-3xl p-7 hover:bg-white/[0.11] hover:border-white/25 transition-all flex-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.03] to-transparent rounded-3xl" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(37,211,102,0.12) 0%, transparent 70%)' }}
              />
              <div className="flex flex-col items-center justify-center text-center gap-3 relative z-10 h-full">
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs tracking-widest mb-2">WHATSAPP</p>
                  <a href="https://wa.me/40742488300" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-[#25D366] transition-colors">
                    0742 488 300
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Instagram */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] rounded-3xl p-7 hover:bg-white/[0.11] hover:border-white/25 transition-all flex-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.03] to-transparent rounded-3xl" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(193,53,132,0.15) 0%, transparent 70%)' }}
              />
              <div className="flex flex-col items-center justify-center text-center gap-3 relative z-10 h-full">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs tracking-widest mb-2">INSTAGRAM</p>
                  <a href="https://www.instagram.com/sty.stv_carwash/" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-[#e30613] transition-colors">
                    @sty.stv_carwash
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] rounded-3xl p-7 hover:bg-white/[0.11] hover:border-white/25 transition-all flex-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.03] to-transparent rounded-3xl" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(227,6,19,0.12) 0%, transparent 70%)' }}
              />
              <div className="flex flex-col items-center justify-center text-center gap-3 relative z-10 h-full">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2.01 2.01 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs tracking-widest mb-2">EMAIL</p>
                  <a href="mailto:contact@sty-stv.ro" className="text-lg font-semibold hover:text-[#e30613] transition-colors">
                    prodpel24@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLOANA 2 — Hartă cu filtru dark CSS */}
          <div className="flex flex-col">
            <div className="flex-1 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[680px]">
              <div
                className="absolute inset-0"
                style={{
                  filter: 'invert(92%) hue-rotate(180deg) saturate(1.5) brightness(0.85) contrast(1.05)',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.123!2d23.8284993!3d44.3186197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4752d7bbc36adac5%3A0xd9dce63f77c4e911!2sSpalatorie%20Auto%20Self%20Service%20Sty%26Stv!5e0!3m2!1sro!2sro!4v1710000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Fade edges pentru blending cu pagina */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none rounded-3xl z-10" />
            </div>
          </div>

          {/* COLOANA 3 — Date Fiscale + Program + Mesaj brand */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] rounded-3xl p-10 flex-1 overflow-hidden min-h-[680px] flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.13] via-white/[0.03] to-transparent rounded-3xl" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(227,6,19,0.18) 0%, transparent 70%)' }}
              />

              {/* DATE FISCALE */}
              <h3 className="text-[#e30613] font-bold tracking-[3px] text-sm mb-5 relative z-10">DATE FISCALE</h3>
              <div className="space-y-3 text-[13.5px] relative z-10">
                {[
                  ["Denumire completă", "PRODPEL S.R.L"],
                  ["CUI", "RO15764987"],
                  ["Nr. Reg. Comerțului", "J16/1418/24.03.2003"],
                  ["Adresă sediu", "Str. Câmpului Nr. 2, Craiova, Dolj"],
                  ["Telefon", "0742 488 300 / 0745 568 011"],
                  ["Email", "prodpel24@gmail.com"], 
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-baseline gap-4 pb-3 border-b border-white/[0.08] last:border-b-0">
                    <span className="text-white/50 flex-shrink-0 whitespace-nowrap">{label}</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            
              {/* SEPARATOR */}
              <div className="my-6 border-t border-white/[0.10] relative z-10" />

              {/* MESAJ BRAND — umple restul spațiului */}
              <div className="relative z-10 mt-auto">
                <div
                  className="rounded-2xl p-5 border border-white/[0.10]"
                  style={{ background: 'linear-gradient(135deg, rgba(227,6,19,0.08) 0%, rgba(255,255,255,0.03) 100%)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#e30613]/15 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#e30613]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/90 text-[13px] font-medium leading-relaxed text-center">
                        Mașina ta merită cel mai bun tratament.
                      </p>
                      <p className="text-white/45 text-[12px] mt-1 leading-relaxed text-center">
                        Echipamente profesionale, produse premium și grijă pentru fiecare detaliu — la fiecare vizită.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
