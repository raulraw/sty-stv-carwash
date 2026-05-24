'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import BlurText from './animations/BlurText';
import dynamic from 'next/dynamic';

const ReviewContent = dynamic(() => import('./ReviewContent'), {
  ssr: false,
  loading: () => <div className="h-[620px] bg-black/30 rounded-3xl" />,
});

export default function ReviewsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section id="recenzii" className="relative z-10 py-28 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/29.webp')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/80" />

      {/* Top Blur */}
      <div 
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }} 
      />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />

      {/* Bottom Blur */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', maskImage: 'linear-gradient(to top, black 0%, transparent 100%)' }} 
      />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />

      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(227,6,19,0.04) 0%, transparent 60%)' }} />

      <div className="relative z-30 max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-14">
          <BlurText
            text="Ce spun clienții noștri"
            delay={60}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white justify-center"
          />
        </div>

        <ReviewContent />
      </div>
    </section>
  );
}