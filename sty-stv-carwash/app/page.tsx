'use client';

import LiquidGlassNavbar from './components/LiquidGlassNavbar';
import HeroSection from './components/HeroSection';
import WashProgramsSection from './components/WashProgramsSection';
import ChooseServiceSection from './components/ChooseServiceSection';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      <LiquidGlassNavbar />

      {/* HERO SECTION – acum ca componentă separată */}
      <HeroSection />

      {/* NOUA SECȚIUNE - plasată înainte de programele de spălare */}
      <ChooseServiceSection />

      {/* SECȚIUNI RANDOM PENTRU SCROLL – rămân neschimbate */}
      
      <WashProgramsSection />

      {/* Secțiunea 2 - Posturile noastre */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">5 Posturi Moderne</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center">
                <div className="text-6xl mb-6">🚘</div>
                <h3 className="text-2xl font-semibold mb-3">Postul {i + 1}</h3>
                <p className="text-white/60">Echipament performant • Produse profesionale • Ușor de utilizat</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secțiunea 4 - Galerie fictivă */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center text-4xl">
                🖼️ Imagine {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/10 bg-black/80">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-2xl font-medium mb-2">Sty &amp; Stv Carwash</p>
          <p className="text-white/60">Craiova • De peste 20 de ani • Spălătorie auto hibrid</p>
          <p className="mt-10 text-sm text-white/40">© 2026 Sty &amp; Stv Carwash. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </main>
  );
}