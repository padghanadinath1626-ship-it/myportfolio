import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Card Component
 * Used for projects, skills, and other content cards
 */
export const Card = ({
  children,
  className = '',
  hover = true,
  delay = 0,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -6, boxShadow: '0 14px 28px rgba(0, 217, 255, 0.16)' } : {}}
      whileTap={hover ? { scale: 0.99 } : {}}
      onClick={onClick}
      className={`glass dark:glass-dark rounded-xl p-4 sm:p-6 transition-smooth cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
