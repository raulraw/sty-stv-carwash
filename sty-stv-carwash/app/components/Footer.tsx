'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black overflow-hidden pt-20 pb-12 border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(227,6,19,0.08)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Col 1 - Logo & Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/30">
                <Image 
                  src="/images/logo.jpg" 
                  alt="Sty & Stv Carwash" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-4xl font-extrabold tracking-tighter text-white">
                  ST<span className="text-[#e30613]">Y</span> 
                  <span className="text-white/40">&amp;</span> 
                  ST<span className="text-[#e30613]">V</span>
                </div>
                <div className="text-[#e30613] text-sm font-bold tracking-[4px] -mt-1">CARWASH</div>
              </div>
            </div>

            <p className="text-white/70 max-w-md leading-relaxed mb-8">
              De peste 20 de ani, ne dedicăm constant îmbunătățirii experienței clienților noștri. 
              Spălătorie auto hibrid modernă din Craiova cu 5 posturi performante.
            </p>

            {/* Iconițe */}
            <div className="flex gap-4 mb-8">
              <motion.a
                href="tel:+407xxxxxxxx"
                whileHover={{ scale: 1.1 }}
                className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e30613]/50 flex items-center justify-center text-2xl hover:bg-white/10 transition-all"
              >
                📞
              </motion.a>

              <motion.a
                href="https://www.instagram.com/sty.stv_carwash/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e30613]/50 flex items-center justify-center text-3xl hover:bg-white/10 transition-all"
              >
                📷
              </motion.a>
            </div>

            {/* Adresă */}
            <div>
              <p className="text-white/60 text-sm mb-1">📍 Adresă</p>
              <p className="text-white font-medium">Str. Câmpului Nr. 2, Craiova, Dolj</p>
              <a 
                href="https://maps.google.com/?q=Sty+Stv+Carwash+Craiova" 
                target="_blank"
                className="text-[#e30613] hover:underline text-sm mt-1 inline-block"
              >
                Vezi pe Google Maps →
              </a>
            </div>
          </div>

          {/* Col 2 - Navigare */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-white mb-6 text-lg">Navigare rapidă</h4>
            <ul className="space-y-3 text-white/70">
              {[
                { label: 'Servicii', href: '#servicii' },
                { label: 'Self Wash', href: '#selfwash' },
                { label: 'Servicii Personal', href: '#serviciu-complet' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Recenzii', href: '#recenzii' },
                { label: 'Galerie', href: '#galerie' },
                { label: 'Locație', href: '#contact' },
              ].map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={link.href} className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="text-[#e30613] group-hover:opacity-100 opacity-40">→</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Program */}
          <div className="lg:col-span-4">
            <h4 className="font-semibold text-white mb-6 text-lg">Program de lucru</h4>
            
            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
              <p className="text-[#e30613] text-sm font-semibold mb-4">SERVICIU CU PERSONAL</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>Luni – Vineri</span>
                  <span className="font-medium text-white">08:00 – 17:00</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Sâmbătă</span>
                  <span className="font-medium text-white">08:00 – 15:00</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Duminică</span>
                  <span>Închis</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <p className="text-[#e30613] text-sm font-semibold mb-4">SELF-WASH</p>
              <div className="flex justify-between text-white/80 text-sm">
                <span>Program zilnic</span>
                <span className="font-medium text-white">07:00 – 23:30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            <p>© {currentYear} Sty & Stv Carwash. Toate drepturile rezervate.</p>
          </div>
          
          <motion.a 
            href="https://www.instagram.com/raw_staicu.28/" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            POWERED BY <span className="text-[#e30613] font-medium">RAUL STAICU</span>
          </motion.a>

          <div className="text-[#e30613]/60 text-[10px] tracking-widest font-mono">
            TRADIȚIE • CALITATE • EXCELENȚĂ
          </div>
        </div>
      </div>

      {/* ANPC Section - Hover îmbunătățit */}
      <div className="mt-12 border-t border-white/10 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8 justify-center items-center">
          <a 
            href="https://anpc.ro/ce-este-sal/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-all duration-300 hover:-translate-y-1"
          >
            <img 
              src="https://blzwebsolutions.ro/wp-content/uploads/2024/04/anpc-sal.png" 
              alt="ANPC SAL" 
              className="w-[200px] opacity-90 group-hover:opacity-100 transition-all duration-300"
            />
          </a>

          <a 
            href="https://ec.europa.eu/consumers/odr" 
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-all duration-300 hover:-translate-y-1"
          >
            <img 
              src="https://blzwebsolutions.ro/wp-content/uploads/2024/04/anpc-sol.png" 
              alt="ANPC SOL" 
              className="w-[200px] opacity-90 group-hover:opacity-100 transition-all duration-300"
            />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e30613]/30 to-transparent" />
    </footer>
  );
}