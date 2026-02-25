import React, { useEffect, useRef } from 'react';

// Hook to detect when element is in viewport
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
};

// Hook for dark mode toggle with immediate visual feedback
export const useDarkMode = () => {
  const [isDark, setIsDark] = React.useState(false);

  // Initialize on mount
  useEffect(() => {
    const stored = localStorage.getItem('isDarkMode');
    const prefersDark = 
      typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initial = stored !== null ? stored === 'true' : prefersDark;
    setIsDark(initial);
    
    // Apply immediately
    if (initial) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      
      // Apply to localStorage and DOM immediately
      localStorage.setItem('isDarkMode', String(next));
      
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
      
      return next;
    });
  };

  return { isDark, toggleDarkMode };
};
