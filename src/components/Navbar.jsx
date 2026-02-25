import React from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useCustomHooks';
import { PORTFOLIO_DATA } from '../utils/data';

/**
 * Navbar Component
 * Sticky navigation with dark mode toggle and mobile menu
 */
export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    // Remove # from href
    const sectionId = href.startsWith('#') ? href.substring(1) : href;
    const target = document.querySelector(`#${sectionId}`);
    if (target) {
      // Scroll with offset for fixed navbar
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-dark-900/95 border-b border-gray-200 dark:border-accent/20 backdrop-blur-md transition-all duration-300"
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-accentAlt"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
      <div className="container-custom flex justify-between items-center h-16 sm:h-20">
        {/* Logo */}
        <motion.a
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl font-bold gradient-text"
        >
          AKP
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08, duration: 0.3 }}
              className="text-black dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-smooth relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-accentAlt"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            <a
              href={PORTFOLIO_DATA.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-400 hover:text-accent transition-smooth"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={PORTFOLIO_DATA.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-400 hover:text-accent transition-smooth"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href={PORTFOLIO_DATA.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-400 hover:text-accent transition-smooth"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href={PORTFOLIO_DATA.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-400 hover:text-accent transition-smooth"
            >
              <FaFacebookF size={20} />
            </a>
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2.5 rounded-lg font-bold transition-all duration-300 flex items-center justify-center"
            style={{
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(234, 179, 8, 0.2)',
              color: isDark ? '#60a5fa' : '#fbbf24',
              border: `2px solid ${isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(251, 191, 36, 0.5)'}`
            }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2.5 rounded-lg border border-gray-300 dark:border-accent/30 text-black dark:text-accent"
        >
          {isMobileMenuOpen ? (
            <FiX size={24} className="text-black dark:text-accent" />
          ) : (
            <FiMenu size={24} className="text-black dark:text-accent" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={
          isMobileMenuOpen
            ? { opacity: 1, height: 'auto' }
            : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-accent/20"
      >
        <div className="container-custom py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="text-black dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-smooth py-2.5 px-1 rounded-md"
            >
              {item.label}
            </motion.a>
          ))}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <a
              href={PORTFOLIO_DATA.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-400 hover:text-accent transition-smooth"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={PORTFOLIO_DATA.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-400 hover:text-accent transition-smooth"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href={PORTFOLIO_DATA.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-400 hover:text-accent transition-smooth"
            >
              <FaFacebookF size={20} />
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg font-bold transition-all duration-300"
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                color: isDark ? '#60a5fa' : '#fbbf24',
              }}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
