import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import AnimatedProgressBar from '../components/AnimatedProgressBar';
import { PORTFOLIO_DATA } from '../utils/data';

/**
 * Skills Section Component
 * Technical skills displayed as animated progress bars
 */
export const SkillsSection = () => {
  const allSkills = PORTFOLIO_DATA.skills.technical;

  return (
    <section
      id="skills"
      data-aos="fade-up"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50 dark:bg-transparent"
    >
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accentAlt rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Technical Skills</h3>
            <div className="space-y-4">
              {allSkills.map((skill, index) => (
                <AnimatedProgressBar
                  key={skill.name}
                  skill={skill.name}
                  level={skill.level}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Tools & Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {PORTFOLIO_DATA.skills.tools.map((tool, index) => (
                <Card key={tool} delay={index * 0.1} className="text-center">
                  <p className="font-semibold text-accent">{tool}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-20"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Expertise Areas</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Backend Development',
                skills: ['Java', 'Spring Boot', 'REST APIs', 'JWT Auth'],
              },
              {
                title: 'Frontend Development',
                skills: ['React', 'Framer Motion', 'Tailwind CSS', 'Responsive Design'],
              },
              {
                title: 'Database & Tools',
                skills: ['MySQL', 'Git', 'Docker', 'Postman'],
              },
            ].map((category, index) => (
              <Card key={category.title} delay={index * 0.1} className="hover:scale-105">
                <h4 className="text-xl font-bold text-accent mb-4">{category.title}</h4>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-gray-300 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 -left-32 w-64 h-64 bg-accentAlt/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default SkillsSection;
