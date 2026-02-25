import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Loading Animation Component
 * Shows on app startup
 */
export const LoadingAnimation = ({ isLoading }) => {
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 0,
      transitionEnd: {
        display: 'none',
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0 },
    show: { scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isLoading ? 'hidden' : 'show'}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed inset-0 bg-dark-900 z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              animate="show"
              transition={{
                delay: i * 0.2,
                duration: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-accent to-accentAlt"
            />
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-accent font-semibold"
        >
          Loading Portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
