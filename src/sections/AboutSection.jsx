import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { PORTFOLIO_DATA } from '../utils/data';

/**
 * About Section Component
 * Professional summary and background information
 */
export const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      data-aos="fade-up"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-transparent"
    >
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accentAlt rounded-full mt-4" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left - About Text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate Full Stack Java Developer driven by a love for building scalable, 
              robust applications. With expertise in both backend and frontend technologies, I create 
              complete solutions that solve real-world problems.
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Current Focus</h3>
              <ul className="space-y-3">
                {[
                  'Pursuing BE in AI & Data Science (Expected 2026)',
                  'Full Stack Development with Java and React',
                  'InfoBeans IT Excellence Program - Full Stack Training',
                  'Building production-grade applications',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-accent mt-1">▸</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right - Stats & Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { number: '3+', label: 'Projects Completed' },
                { number: '5+', label: 'Technologies' },
                { number: '100%', label: 'Dedication' },
                { number: '∞', label: 'Learning Drive' },
              ].map((stat, index) => (
                <Card
                  key={index}
                  delay={index * 0.1}
                  className="text-center hover:scale-105"
                >
                  <h4 className="text-3xl font-bold gradient-text mb-2">{stat.number}</h4>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </Card>
              ))}
            </div>

            {/* Education */}
            <Card delay={0.4} className="border-l-4 border-accent">
              <h4 className="text-xl font-bold text-white mb-2">Education</h4>
              {PORTFOLIO_DATA.education.map((edu, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-700 last:border-b-0">
                  <p className="font-semibold text-accent">
                    {edu.degree || edu.program}
                  </p>
                  <p className="text-sm text-gray-400">
                    {edu.field || edu.focus}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{edu.year}</p>
                </div>
              ))}
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default AboutSection;
