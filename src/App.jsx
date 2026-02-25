import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import LoadingAnimation from './components/LoadingAnimation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ResumeSection from './sections/ResumeSection';
import ContactSection from './sections/ContactSection';
import AOS from 'aos';

/**
 * Main App Component
 * Combines all sections and provides layout structure
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 70,
      easing: 'ease-out-cubic',
    });
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark-900 text-black dark:text-white transition-all duration-300 overflow-x-hidden">
      {/* Loading Animation */}
      <LoadingAnimation isLoading={isLoading} />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-0">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-100 dark:bg-dark-800 border-t border-gray-300 dark:border-accent/20 py-8 px-4">
        <div className="container-custom text-center">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            © 2026 Adinath Kanha Padghan. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
