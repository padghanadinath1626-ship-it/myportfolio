import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Button Component
 * Supports multiple variants, sizes, and animations
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  isLoading = false,
  icon: Icon,
  ...props
}) => {
  const baseClasses =
    'font-medium rounded-lg transition-smooth flex items-center gap-2 justify-center text-center';

  const variants = {
    primary:
      'bg-gradient-to-r from-accent to-accentAlt text-dark-900 hover:shadow-lg hover:shadow-accent/50',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 dark:bg-dark-700 dark:hover:bg-dark-600',
    outline: 'border-2 border-accent text-accent hover:bg-accent/10',
    ghost: 'text-accent hover:bg-accent/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-6 sm:px-8 py-3 text-base sm:text-lg',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.03 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.97 }}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {Icon && !isLoading && <Icon size={20} />}
      {children}
    </motion.button>
  );
};

export default Button;
