import React from 'react';
import { PORTFOLIO_DATA } from '../utils/data';

export const ResumeSection = () => {
  const resumeHref = PORTFOLIO_DATA.resume || '/Adinath_Kanha_Padghan_Resume (1) (2).pdf';

  return (
    <section id="resume" data-aos="fade-up" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-transparent">
      <div className="container-custom text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">My <span className="gradient-text">Resume</span></h2>
        <p className="text-gray-300 mb-8">Download a copy of my resume below.</p>
        <a
          href={resumeHref}
          download
          className="inline-block px-6 py-3 bg-accent text-black font-semibold rounded-md hover:opacity-90"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default ResumeSection;
