import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { PORTFOLIO_DATA } from '../utils/data';

/**
 * Footer Component
 * Footer with social links and copyright
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: FaGithub,
      url: PORTFOLIO_DATA.social.github,
      label: 'GitHub',
    },
    {
      icon: FaLinkedinIn,
      url: PORTFOLIO_DATA.social.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: FaTwitter,
      url: PORTFOLIO_DATA.social.twitter,
      label: 'Twitter',
    },
  ];

  return (
    <footer className="bg-dark-900 border-t border-accent/20 glass dark:glass-dark">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">AKP Portfolio</h3>
            <p className="text-gray-400 text-sm">
              {PORTFOLIO_DATA.personal.title}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-4">Connect With Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: '#00d9ff' }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-accent transition-smooth"
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm text-center md:text-left"
            >
              © {currentYear} Adinath Kanha Padghan. All rights reserved.
            </motion.p>

            {/* Made with */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm"
            >
              Made with{' '}
              <span className="text-accentAlt">❤</span> using React, Vite & Tailwind CSS
            </motion.p>

            {/* Scroll to Top */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-smooth"
            >
              <FaArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
