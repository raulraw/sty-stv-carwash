'use client';

import Aurora from './components/animations/Aurora';
import LiquidGlassNavbar from './components/LiquidGlassNavbar';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      
      {/* Aurora Background - rămâne fix pe toată pagina */}
      <Aurora 
        colorStops={['#e30613', '#ff5e00', '#8b00ff']} 
        amplitude={1.3} 
        blend={0.65} 
        speed={0.9} 
      />

      {/* Navbar Liquid Glass */}
      <LiquidGlassNavbar />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            STY &amp; STV <span className="text-[#e30613]">CARWASH</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto">
            De peste 20 de ani ne dedicăm constant îmbunătățirii experiențelor clienților noștri.
          </p>
          <p className="mt-4 text-xl text-white/70">
            Spălătorie auto hibrid modernă din Craiova • 5 posturi performante • Self-wash &amp; Serviciu complet cu personal dedicat
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#e30613] hover:bg-red-700 transition-all px-10 py-4 rounded-full text-lg font-semibold">
              Spală-ți mașina acum
            </button>
            <button className="border border-white/60 hover:bg-white/10 transition-all px-10 py-4 rounded-full text-lg font-semibold">
              Vezi serviciile noastre
            </button>
          </div>
        </div>
      </section>

      {/* SECȚIUNI RANDOM PENTRU SCROLL */}
      
      {/* Secțiunea 1 - Experiența noastră */}
      <section className="relative z-10 py-24 bg-black/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">De peste 20 de ani alături de tine</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <div className="h-2 w-12 bg-[#e30613] rounded-full mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Calitate constantă</h3>
                <p className="text-white/70 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Secțiunea 3 - Self Wash vs Serviciu Complet */}
      <section className="relative z-10 py-24 bg-black/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-12">Alege cum vrei să-ți speli mașina</h2>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12">
              <h3 className="text-3xl font-semibold mb-6 text-[#e30613]">Self-Wash</h3>
              <p className="text-lg text-white/70 mb-8">
                4 posturi moderne, echipamente de ultimă generație, ușor de utilizat de către clienți.
              </p>
              <button className="text-sm uppercase tracking-widest border-b border-white/40 pb-1 hover:border-white transition">
                Află mai multe →
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-[#e30613] text-xs px-4 py-1 rounded-full">Recomandat</div>
              <h3 className="text-3xl font-semibold mb-6">Serviciu Complet cu Personal</h3>
              <p className="text-lg text-white/70 mb-8">
                Ultimul post este dedicat clienților care doresc confort maxim. 
                Echipa noastră caldă și profesionistă se ocupă de mașina ta.
              </p>
              <button className="text-sm uppercase tracking-widest border-b border-white/40 pb-1 hover:border-white transition">
                Rezervă acum →
              </button>
            </div>
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

      {/* Secțiunea Footer */}
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