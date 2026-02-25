import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { PORTFOLIO_DATA } from '../utils/data';

/**
 * Projects Section Component
 * Showcases portfolio projects with animated cards
 */
export const ProjectsSection = () => {
  const projects = PORTFOLIO_DATA.projects;

  return (
    <section
      id="projects"
      data-aos="fade-up"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-transparent"
    >
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accentAlt rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }} whileHover={{ y: -4 }}>
              <div className="group h-full">
                {/* Project Card */}
                <div className="glass dark:glass-dark rounded-xl overflow-hidden h-full flex flex-col transition-smooth group-hover:border-accent border border-gray-600 hover:shadow-lg hover:shadow-accent/20">
                  {/* Project Header with Icon */}
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.15)' }}
                    className="bg-gradient-to-r from-accent/20 to-accentAlt/20 p-4 sm:p-6 flex items-center justify-between border-b border-accent/20"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="text-5xl"
                    >
                      {project.image}
                    </motion.span>
                    <motion.div
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-2xl">✨</span>
                    </motion.div>
                  </motion.div>
                  {/* Project Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col gap-4">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent transition-smooth">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm sm:text-base flex-1 line-clamp-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-xs font-semibold bg-accent/20 text-accent rounded-full border border-accent/40 hover:border-accent cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="my-4 pt-4 border-t border-gray-700">
                      <p className="text-sm font-semibold text-accent mb-2">Key Features:</p>
                      <ul className="space-y-1 text-sm text-gray-400">
                        {project.features.slice(0, 2).map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">→</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons: only show code link */}
                    <div className="flex gap-3 mt-auto">
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-700 text-white hover:bg-accent hover:text-dark-900 transition-smooth font-semibold text-sm"
                      >
                        <FaGithub size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Interested in seeing more?
          </p>
          <motion.a
            href="https://github.com/adinathpa2975?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 rounded-lg border-2 border-accent text-accent hover:bg-accent hover:text-dark-900 transition-smooth font-semibold"
          >
            View All Projects on GitHub →
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-accentAlt/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default ProjectsSection;
