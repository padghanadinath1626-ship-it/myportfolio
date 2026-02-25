import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Typewriter Effect Component
 * Animated text typing effect
 */
export const TypewriterEffect = ({ texts, speed = 100, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (textIndex >= texts.length) return;

    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, textIndex, isDeleting, texts, speed]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="gradient-text font-bold"
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-accent"
      >
        |
      </motion.span>
    </motion.span>
  );
};

export default TypewriterEffect;
