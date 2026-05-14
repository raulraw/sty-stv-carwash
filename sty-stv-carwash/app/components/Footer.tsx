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
                href="tel:+40742488300"
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
                className="w-11 h-11 rounded-2xl border border-white/10 hover:border-[#dc2743]/60 flex items-center justify-center transition-all"
                style={{ background: 'linear-gradient(135deg, rgba(240,148,51,0.18) 0%, rgba(220,39,67,0.18) 50%, rgba(188,24,136,0.18) 100%)' }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ig-footer-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-footer-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
            </div>

            {/* Adresă */}
            <div>
              <p className="text-white/60 text-sm mb-1">📍 Adresă</p>
              <p className="text-white font-medium">Str. Câmpului Nr. 2, Craiova, Dolj</p>
              <a 
                href="https://www.google.com/maps/place/Spalatorie+Auto+Self+Service+Sty%26Stv/@44.3187107,23.8195065,13z/data=!4m10!1m2!2m1!1sSty+Stv+Carwash+Craiova!3m6!1s0x4752d7bbc36adac5:0xd9dce63f77c4e911!8m2!3d44.3186197!4d23.8284993!15sChdTdHkgU3R2IENhcndhc2ggQ3JhaW92YVoZIhdzdHkgc3R2IGNhcndhc2ggY3JhaW92YZIBFXNlbGZfc2VydmljZV9jYXJfd2FzaJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQycFNkVkZyTlVkalJGWmFZVmhTY1ZGdFVrSlRSa0p5WkhwU1MxWkdSUkFC4AEA-gEECAAQQA!16s%2Fg%2F11wnd24g5r?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D" 
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
                { label: 'Servicii', href: '/#servicii' },
                { label: 'Self Wash', href: '/#programe' },
                { label: 'Servicii Personal', href: '/#serviciu-complet' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'Recenzii', href: '/#recenzii' },
                { label: 'Galerie', href: '/galerie' },
                { label: 'Locație', href: '/contact' },
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

      {/* ANPC Section */}
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
