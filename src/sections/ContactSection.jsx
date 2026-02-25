import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import EMAIL_CONFIG from '../config/emailConfig';
import Card from '../components/Card';
import Button from '../components/Button';
import { validateEmail } from '../utils/helpers';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../utils/data';

/**
 * Contact Section Component
 * Contact form with EmailJS integration
 */
export const ContactSection = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS
  React.useEffect(() => {
    // Initialize EmailJS using config file or env vars
    const PUBLIC_KEY = EMAIL_CONFIG.PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields',
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Read EmailJS config from env (Vite): VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
      const SERVICE_ID = EMAIL_CONFIG.SERVICE_ID || import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
      const TEMPLATE_ID = EMAIL_CONFIG.TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const PUBLIC_KEY = EMAIL_CONFIG.PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        setSubmitStatus({
          type: 'error',
          message:
            'EmailJS not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env or edit src/config/emailConfig.js.',
        });
        setIsLoading(false);
        return;
      }

      // Send email using EmailJS sendForm
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      formRef.current.reset();
    } catch (error) {
      // Log error details for debugging (400 responses show useful info)
      // eslint-disable-next-line no-console
      console.error('EmailJS send error:', error);

      // Extract useful info when available
      const status = error && (error.status || error.statusCode || error.statusText);
      const text = error && (error.text || error.message || JSON.stringify(error));

      setSubmitStatus({
        type: 'error',
        message: `Failed to send message.${status ? ` Status: ${status}.` : ''} ${text ? text : ''}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="contact"
      data-aos="fade-up"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-transparent"
    >
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            I'm always open to new opportunities and interesting projects. Feel free to reach out!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accentAlt rounded-full mt-4 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-14 sm:mb-16"
        >
          {/* Contact Info Cards */}
          {[
            {
              icon: FiMail,
              label: 'Email',
              value: PORTFOLIO_DATA.personal.email,
              href: `mailto:${PORTFOLIO_DATA.personal.email}`,
            },
            {
              icon: FiPhone,
              label: 'Phone',
              value: PORTFOLIO_DATA.personal.phone,
              href: `tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, '')}`,
            },
            {
              icon: FiMapPin,
              label: 'Location',
              value: PORTFOLIO_DATA.personal.location,
              href: '#',
            },
          ].map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={index}
                href={contact.href}
                variants={containerVariants}
                className="group"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card delay={index * 0.1} className="text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-smooth">
                      <Icon size={24} className="text-accent" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{contact.label}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-accent transition-smooth">
                    {contact.value}
                  </p>
                </Card>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-2 border-accent/30">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-smooth"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-smooth"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-smooth resize-none"
                />
              </div>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-sm font-semibold ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-accentAlt/5 rounded-full blur-3xl" />
    </section>
  );
};

export default ContactSection;
