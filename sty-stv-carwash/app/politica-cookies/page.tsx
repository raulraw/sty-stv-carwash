'use client';

import LiquidGlassNavbar from '../components/LiquidGlassNavbar';
import Footer from '../components/Footer';
import BlurText from '../components/animations/BlurText';
import { motion } from 'framer-motion';

const cookieTypes = [
  {
    type: 'Strict Necesare',
    color: '#34d399',
    icon: '🔒',
    canDisable: false,
    description: 'Aceste cookie-uri sunt esențiale pentru funcționarea site-ului și nu pot fi dezactivate. Ele nu stochează informații personale identificabile.',
    examples: [
      { name: 'review_nudge_dismissed', duration: '7 zile', scop: 'Reține dacă ai închis notificarea de recenzie, pentru a nu o afișa din nou imediat' },
      { name: 'cookie_consent_accepted', duration: '365 zile', scop: 'Reține preferința ta privind acceptarea cookie-urilor' },
    ],
  },
  {
    type: 'Funcționale',
    color: '#60a5fa',
    icon: '⚙️',
    canDisable: true,
    description: 'Cookie-urile funcționale îmbunătățesc experiența de navigare, reținând preferințele tale (ex. limba, setările de afișare).',
    examples: [
      { name: 'next-auth.session-token', duration: 'Sesiune', scop: 'Gestionarea sesiunii active pe site (dacă ești autentificat)' },
    ],
  },
  {
    type: 'Analitice (Google Analytics)',
    color: '#fbbf24',
    icon: '📊',
    canDisable: true,
    description: 'Ne ajută să înțelegem cum utilizatorii interacționează cu site-ul (paginile vizitate, durata sesiunii, sursa traficului). Datele sunt anonimizate.',
    examples: [
      { name: '_ga', duration: '2 ani', scop: 'Identifică utilizatori unici pentru Google Analytics' },
      { name: '_ga_XXXXXX', duration: '2 ani', scop: 'Menține starea sesiunii pentru Google Analytics 4' },
      { name: '_gid', duration: '24 ore', scop: 'Distinge utilizatorii unici în decurs de 24 de ore' },
    ],
  },
  {
    type: 'Cookie-uri Third-Party (Google Maps)',
    color: '#a78bfa',
    icon: '🗺️',
    canDisable: true,
    description: 'Pagina de contact include o hartă Google Maps. La încărcarea hărții, Google poate plasa propriile cookie-uri conform politicii sale de confidențialitate (policies.google.com).',
    examples: [
      { name: 'NID, 1P_JAR, CONSENT', duration: 'Variabil (6 luni – 2 ani)', scop: 'Cookie-uri plasate de Google pentru personalizarea hărților și preferințe Google' },
    ],
  },
];

const sections = [
  {
    title: 'Ce sunt cookie-urile?',
    content: `Un cookie este un fișier text mic, plasat pe dispozitivul dvs. (calculator, telefon, tabletă) de către un site web atunci când îl vizitați. Cookie-urile sunt stocate în browserul dvs. și permit site-ului să vă "recunoască" la vizitele ulterioare.

Cookie-urile nu sunt programe și nu pot accesa alte informații de pe dispozitivul dvs. Ele nu conțin viruși și nu pot rula cod malițios.`,
  },
  {
    title: 'De ce folosim cookie-uri?',
    content: `Site-ul Sty & Stv Carwash folosește cookie-uri pentru a:

- Asigura funcționarea corectă a site-ului
- Reține preferințele dvs. (ex. dacă ați acceptat sau refuzat cookie-urile)
- Afișa notificări relevante (ex. invitația de a lăsa o recenzie Google) fără a vă deranja repetat
- Înțelege cum este folosit site-ul și a-l îmbunătăți
- Oferi funcționalitate de hărți prin Google Maps`,
  },
  {
    title: 'Cum puteți gestiona cookie-urile?',
    content: `Aveți mai multe opțiuni pentru a controla cookie-urile:

1. Prin banner-ul de cookies — La prima vizită pe site, vă afișăm un banner prin care puteți accepta sau refuza cookie-urile non-esențiale.

2. Prin setările browserului — Puteți configura browserul să blocheze sau să șteargă cookie-urile:
   • Chrome: Setări → Confidențialitate și securitate → Cookie-uri
   • Firefox: Opțiuni → Confidențialitate & Securitate
   • Safari: Preferințe → Confidențialitate
   • Edge: Setări → Cookie-uri și permisiuni pentru site

3. Prin instrumente dedicate — Puteți folosi extensii de browser precum uBlock Origin sau Privacy Badger.

⚠️ Atenție: Blocarea cookie-urilor strict necesare poate afecta funcționarea corectă a site-ului.`,
  },
  {
    title: 'Actualizări ale politicii',
    content: `Ne rezervăm dreptul de a modifica această politică pentru a reflecta schimbările tehnice sau legislative. Data ultimei actualizări este indicată mai jos. Continuarea utilizării site-ului după o modificare constituie acceptarea noii politici.

Ultima actualizare: Mai 2025`,
  },
];

export default function PoliticaCookies() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <LiquidGlassNavbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(227,6,19,0.10)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-white/50 text-xs tracking-widest uppercase mb-8"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="text-lg">🍪</span>
            Transparență · Directiva ePrivacy
          </motion.div>

          <BlurText
            text="Politică de Cookies"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white justify-center mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Aflați ce cookie-uri folosim, de ce le folosim și cum le puteți gestiona sau dezactiva.
          </motion.p>
        </div>
      </section>

      {/* Intro sections */}
      <section className="pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-5">
            {sections.slice(0, 2).map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden bg-white/[0.05] backdrop-blur-2xl border border-white/[0.10] p-8 md:p-10"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.10] via-white/[0.02] to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-0 left-6 right-6 h-px pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.5), transparent)' }} />
                <div className="relative z-10">
                  <h2 className="text-[#e30613] font-bold text-sm tracking-[0.18em] uppercase mb-5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {section.title}
                  </h2>
                  <div className="h-px bg-white/[0.07] mb-6" />
                  <p className="text-white/65 text-[14.5px] leading-[1.85] whitespace-pre-line"
                    style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie types table */}
      <section className="pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-extrabold text-white mb-8 text-center"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Tipurile de cookie-uri pe care le folosim
          </motion.h2>

          <div className="flex flex-col gap-6">
            {cookieTypes.map((ct, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden bg-white/[0.05] backdrop-blur-2xl border border-white/[0.10] p-8 md:p-10"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.10] via-white/[0.02] to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-0 left-6 right-6 h-px pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${ct.color}80, transparent)` }} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ct.icon}</span>
                      <h3 className="font-extrabold text-white text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {ct.type}
                      </h3>
                    </div>
                    <span
                      className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                      style={{
                        color: ct.canDisable ? 'rgba(255,255,255,0.5)' : ct.color,
                        borderColor: ct.canDisable ? 'rgba(255,255,255,0.12)' : `${ct.color}50`,
                        background: ct.canDisable ? 'rgba(255,255,255,0.04)' : `${ct.color}15`,
                      }}
                    >
                      {ct.canDisable ? 'Opțional' : 'Necesar'}
                    </span>
                  </div>

                  <p className="text-white/60 text-[14px] leading-relaxed mb-6"
                    style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {ct.description}
                  </p>

                  {/* Cookie list */}
                  <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
                    <div className="grid grid-cols-[1fr_auto_2fr] gap-4 px-5 py-3 bg-white/[0.05] border-b border-white/[0.08]">
                      {['Nume cookie', 'Durată', 'Scop'].map((h) => (
                        <span key={h} className="text-[11px] font-bold tracking-widest uppercase text-white/30"
                          style={{ fontFamily: "'Outfit', sans-serif" }}>{h}</span>
                      ))}
                    </div>
                    {ct.examples.map((ex, j) => (
                      <div
                        key={j}
                        className="grid grid-cols-[1fr_auto_2fr] gap-4 px-5 py-4 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.03] transition-colors"
                      >
                        <span className="font-mono text-[12px] text-white/70 break-all">{ex.name}</span>
                        <span className="text-[12px] text-white/45 whitespace-nowrap"
                          style={{ fontFamily: "'Nunito', sans-serif" }}>{ex.duration}</span>
                        <span className="text-[13px] text-white/55 leading-relaxed"
                          style={{ fontFamily: "'Nunito', sans-serif" }}>{ex.scop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Remaining sections + CTA */}
      <section className="pb-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-5">
            {sections.slice(2).map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden bg-white/[0.05] backdrop-blur-2xl border border-white/[0.10] p-8 md:p-10"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.10] via-white/[0.02] to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute top-0 left-6 right-6 h-px pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.5), transparent)' }} />
                <div className="relative z-10">
                  <h2 className="text-[#e30613] font-bold text-sm tracking-[0.18em] uppercase mb-5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {section.title}
                  </h2>
                  <div className="h-px bg-white/[0.07] mb-6" />
                  <p className="text-white/65 text-[14.5px] leading-[1.85] whitespace-pre-line"
                    style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/politica-confidentialitate"
              className="px-8 py-3.5 rounded-full bg-white/[0.07] border border-white/[0.13] text-white/70 hover:text-white hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300 text-sm font-semibold inline-flex items-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              🔒 Politică de Confidențialitate
            </a>

            <a
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-[#e30613]/15 border border-[#e30613]/40 text-white hover:bg-[#e30613]/25 hover:border-[#e30613]/60 transition-all duration-300 text-sm font-semibold inline-flex items-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              📩 Contactează-ne
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}