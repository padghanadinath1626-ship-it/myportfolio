import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

/**
 * Scroll to Top Button Component
 * Animated button that appears when scrolling down
 */
export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-accentAlt text-dark-900 flex items-center justify-center font-bold shadow-lg"
      >
        <FiArrowUp size={20} />
      </motion.button>
    </motion.div>
  );
};

export default ScrollToTop;
