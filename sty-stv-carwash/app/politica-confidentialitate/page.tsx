'use client';

import LiquidGlassNavbar from '../components/LiquidGlassNavbar';
import Footer from '../components/Footer';
import BlurText from '../components/animations/BlurText';
import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Cine suntem',
    content: `PRODPEL S.R.L., cu sediul în Str. Câmpului Nr. 2, Craiova, Dolj, înregistrată la Registrul Comerțului cu nr. J16/1418/24.03.2003, CUI RO15764987 (denumită în continuare "Sty & Stv Carwash", "noi" sau "compania"), este operatorul datelor cu caracter personal colectate prin intermediul site-ului sty-stv.ro.

Ne puteți contacta la: prodpel24@gmail.com sau la numerele de telefon 0742 488 300 / 0745 568 011.`,
  },
  {
    title: '2. Ce date colectăm',
    content: `Site-ul nostru nu colectează date cu caracter personal în mod direct prin formulare. Totuși, prin simpla vizitare a site-ului, pot fi colectate automat următoarele date tehnice:

- Adresa IP a dispozitivului dvs.
- Tipul și versiunea browserului
- Sistemul de operare
- Paginile vizitate și durata vizitei
- Sursa traficului (cum ați ajuns pe site)
- Datele de tip cookie (detaliate în Politica de Cookies)

Dacă ne contactați prin telefon, WhatsApp sau email, putem prelucra: numele dvs., numărul de telefon, adresa de email și conținutul mesajului trimis.`,
  },
  {
    title: '3. Scopul și temeiul legal al prelucrării',
    content: `Prelucrăm datele dvs. în următoarele scopuri:

- Funcționarea tehnică a site-ului — temei legal: interesul nostru legitim (art. 6 alin. 1 lit. f GDPR)
- Răspuns la solicitările dvs. — temei legal: executarea unui contract sau măsuri precontractuale (art. 6 alin. 1 lit. b GDPR)
- Îmbunătățirea serviciilor și a experienței de navigare — temei legal: interesul nostru legitim
- Afișarea hărților Google Maps — temei legal: consimțământul dvs. implicit prin vizitarea paginii de contact
- Gestionarea recenziilor Google — datele sunt procesate direct de Google conform propriei politici de confidențialitate`,
  },
  {
    title: '4. Cât timp păstrăm datele',
    content: `• Datele tehnice de navigare (loguri, cookie-uri de sesiune): maxim 12 luni
- Datele de contact transmise prin email/WhatsApp: pe durata necesară soluționării solicitării, și ulterior maxim 3 ani conform obligațiilor legale
- Cookie-urile de preferință: conform duratei specificate în Politica de Cookies

Nu vom păstra datele dvs. mai mult decât este necesar scopului pentru care au fost colectate.`,
  },
  {
    title: '5. Cu cine partajăm datele',
    content: `Nu vindem, nu închiriem și nu comercializăm datele dvs. personale. Putem partaja date cu:

- Google LLC — pentru servicii de hărți (Google Maps) și recenzii (Google Reviews). Google are propriile politici de confidențialitate disponibile la policies.google.com
- Furnizori de hosting/infrastructură — care procesează date strict în scopul găzduirii site-ului, în baza unor contracte de prelucrare a datelor (DPA)
- Autorități competente — exclusiv când suntem obligați legal

Toți partenerii noștri de prelucrare date sunt selectați cu atenție și au obligații contractuale de protecție a datelor.`,
  },
  {
    title: '6. Drepturile dvs.',
    content: `În conformitate cu GDPR (Regulamentul UE 2016/679), aveți următoarele drepturi:

- Dreptul de acces — puteți solicita o copie a datelor pe care le deținem despre dvs.
- Dreptul la rectificare — puteți cere corectarea datelor inexacte
- Dreptul la ștergere ("dreptul de a fi uitat") — în anumite condiții, puteți solicita ștergerea datelor
- Dreptul la restricționarea prelucrării — puteți solicita limitarea modului în care folosim datele
- Dreptul la portabilitate — puteți primi datele dvs. într-un format structurat
- Dreptul de opoziție — vă puteți opune prelucrării bazate pe interese legitime
- Dreptul de a retrage consimțământul — oricând, fără a afecta legalitatea prelucrării anterioare

Pentru exercitarea acestor drepturi, ne puteți contacta la: prodpel24@gmail.com

Aveți, de asemenea, dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP): www.dataprotection.ro`,
  },
  {
    title: '7. Securitatea datelor',
    content: `Implementăm măsuri tehnice și organizatorice adecvate pentru protecția datelor dvs., inclusiv:

- Conexiune securizată HTTPS (SSL/TLS)
- Acces restricționat la datele personale
- Actualizări regulate de securitate ale sistemelor

Deși depunem toate eforturile rezonabile, nicio transmisie de date pe internet nu poate fi garantată 100% securizată.`,
  },
  {
    title: '8. Transferuri internaționale de date',
    content: `Unele servicii pe care le utilizăm (precum Google) pot implica transferul datelor în afara Spațiului Economic European (SEE). Aceste transferuri se realizează cu garanții adecvate, inclusiv prin clauze contractuale standard aprobate de Comisia Europeană.`,
  },
  {
    title: '9. Modificări ale politicii',
    content: `Ne rezervăm dreptul de a actualiza această politică periodic pentru a reflecta modificările legislative sau ale practicilor noastre. Data ultimei actualizări este indicată la baza acestei pagini. Vă recomandăm să consultați periodic această pagină.`,
  },
  {
    title: '10. Contact',
    content: `Pentru orice întrebări legate de prelucrarea datelor dvs. personale sau pentru exercitarea drepturilor dvs., ne puteți contacta:

PRODPEL S.R.L. — Sty & Stv Carwash
Str. Câmpului Nr. 2, Craiova, Dolj
Email: prodpel24@gmail.com
Telefon: 0742 488 300`,
  },
];

export default function PoliticaConfidentialitate() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <LiquidGlassNavbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(227,6,19,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-white/50 text-xs tracking-widest uppercase mb-8"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e30613]" />
            GDPR · Regulamentul UE 2016/679
          </motion.div>

          <BlurText
            text="Politică de Confidențialitate"
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
            Transparența față de clienții noștri este o prioritate. Această politică explică cum colectăm, folosim și protejăm datele dvs.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/30 text-sm mt-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Ultima actualizare: Mai 2025
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-5">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden bg-white/[0.05] backdrop-blur-2xl border border-white/[0.10] p-8 md:p-10"
              >
                {/* Glass shimmer */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.10] via-white/[0.02] to-transparent pointer-events-none rounded-3xl" />
                {/* Red top line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(227,6,19,0.5), transparent)' }}
                />

                <div className="relative z-10">
                  <h2
                    className="text-[#e30613] font-bold text-sm tracking-[0.18em] uppercase mb-5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {section.title}
                  </h2>
                  <div className="h-px bg-white/[0.07] mb-6" />
                  <p
                    className="text-white/65 text-[14.5px] leading-[1.85] whitespace-pre-line"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/politica-cookies"
              className="px-8 py-3.5 rounded-full bg-white/[0.07] border border-white/[0.13] text-white/70 hover:text-white hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300 text-sm font-semibold inline-flex items-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              🍪 Vezi și Politica de Cookies
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