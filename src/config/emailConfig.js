// EmailJS configuration.
// You can either set these via a .env file with VITE_EMAILJS_* entries
// or edit these values directly in this file for local testing.

export const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_b4dd0xh',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_eh7h7oi',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '5zvtcui_xnbSnxB94',
};

export default EMAIL_CONFIG;
