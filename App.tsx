import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Showcase } from './components/Showcase';
import { Payment } from './components/Payment';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { ProblemSolution } from './components/ProblemSolution';
import { ComparisonTable } from './components/ComparisonTable';
import { FAQ } from './components/FAQ';
import { BackgroundMusic } from './components/BackgroundMusic';
import { SplashScreen } from './components/SplashScreen';
import { THEMES } from './constants'; // <-- Importação dos temas adicionada aqui

const App: React.FC = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  // --- O PRÉ-CARREGADOR FANTASMA ---
  // Baixa todas as imagens da vitrine em segundo plano enquanto a Splash Screen está na tela
  useEffect(() => {
    THEMES.forEach((theme) => {
      theme.screenshots.forEach((shot) => {
        const img = new Image();
        img.src = shot.url;
      });
    });
  }, []);
  // ---------------------------------

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Intercept anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          lenis.scrollTo(href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  return (
    <div className="min-h-screen bg-byte-navy text-white selection:bg-byte-purple selection:text-white font-sans">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-byte-cyan to-byte-purple z-[60] origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onStart={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      
      {!showSplash && (
        <>
          <BackgroundMusic />
          <Navbar />
          <main>
            <Hero currentThemeIndex={currentThemeIndex} />
            <ProblemSolution />
            <Features />
            <Showcase currentThemeIndex={currentThemeIndex} setCurrentThemeIndex={setCurrentThemeIndex} />
            <ComparisonTable />
            <FAQ />
            <Payment />
          </main>
          <Footer />
          <ChatWidget />
        </>
      )}
    </div>
  );
};

export default App;
