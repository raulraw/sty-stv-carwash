'use client';

import LiquidGlassNavbar from './components/LiquidGlassNavbar';
import HeroSection from './components/HeroSection';
import WashProgramsSection from './components/WashProgramsSection';
import ChooseServiceSection from './components/ChooseServiceSection';
import PersonalServiceSection from './components/PersonalServiceSection';
import FAQSection from './components/FAQSection';
import ReviewsSection from './components/ReviewsSection';


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <LiquidGlassNavbar />
      <HeroSection />
      <ChooseServiceSection />
      <WashProgramsSection />
      <PersonalServiceSection />
      <FAQSection />
      <ReviewsSection />
    </main>
  );
}