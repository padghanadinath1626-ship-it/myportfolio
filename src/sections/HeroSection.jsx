import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaFileDownload, FaFacebookF } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../components/Button';
import TypewriterEffect from '../components/TypewriterEffect';
import { PORTFOLIO_DATA } from '../utils/data';

/**
 * Hero Section Component
 * Main landing section with typewriter effect and CTA buttons
 */
export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section
      id="home"
      data-aos="fade-in"
      className="min-h-screen pt-24 sm:pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-white dark:bg-transparent"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accentAlt/10 rounded-full blur-3xl animate-glow" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container-custom"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5 sm:gap-6 order-2 md:order-1">
            <motion.div variants={itemVariants}>
              <p className="text-accent font-semibold text-base sm:text-lg mb-2">Welcome to my portfolio</p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 text-gray-900 dark:text-white leading-tight">
                Hey, I'm{' '}
                <span className="gradient-text">{PORTFOLIO_DATA.personal.name}</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="min-h-[56px] sm:min-h-[64px]">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                <TypewriterEffect
                  texts={[
                    'Full Stack Java Developer',
                    'AI & Data Science Student',
                    'Problem Solver',
                  ]}
                  speed={50}
                />
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
              {PORTFOLIO_DATA.personal.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                icon={FiArrowRight}
                className="w-full sm:w-auto"
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={FaFileDownload}
                className="w-full sm:w-auto"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = PORTFOLIO_DATA.resume;
                  link.download = 'Adinath_Padghan_Resume.pdf';
                  link.click();
                }}
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
              <motion.a
                href={PORTFOLIO_DATA.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg glass dark:glass-dark hover:text-accent transition-smooth"
              >
                <FaGithub size={22} />
              </motion.a>
              <motion.a
                href={PORTFOLIO_DATA.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg glass dark:glass-dark hover:text-accent transition-smooth"
              >
                <FaLinkedinIn size={22} />
              </motion.a>
              <motion.a
                href={PORTFOLIO_DATA.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg glass dark:glass-dark hover:text-accent transition-smooth"
              >
                <FaFacebookF size={22} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Photo with Enhanced Animation */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="flex items-center justify-center order-1 md:order-2 mb-4 md:mb-0"
          >
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-96 md:h-96">
              {/* Animated gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-accentAlt to-accent bg-[length:200%_200%] animate-pulse opacity-60 blur-md"
              />
              {/* Profile Image Container */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className="absolute inset-2 rounded-full overflow-hidden border-4 border-dark-900 shadow-xl md:shadow-2xl shadow-accent/50"
              >
                <img
                  src={PORTFOLIO_DATA.personal.profileImage}
                  alt={PORTFOLIO_DATA.personal.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Glow effect */}
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-accentAlt/20 blur-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        >
          <p className="text-accent text-sm font-semibold">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-accent rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
