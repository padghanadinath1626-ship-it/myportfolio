import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Progress Bar Component
 * Shows skill level with animation
 */
export const AnimatedProgressBar = ({ skill, level, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{skill}</span>
        <span className="text-sm font-medium text-accent">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 dark:bg-dark-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: delay + 0.2 }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-accent to-accentAlt rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default AnimatedProgressBar;
