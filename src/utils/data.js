// Portfolio data
export const PORTFOLIO_DATA = {
  personal: {
    name: 'Adinath Kanha Padghan',
    title: 'Full Stack Java Developer | AI & Data Science Student',
    location: 'Pune, Maharashtra, India',
    email: 'padghanadinath2975@gmail.com',
    phone: '+91 8788483307',
    bio: 'Passionate Full Stack Java Developer with expertise in Spring Boot and React. Currently pursuing BE in AI & Data Science. Experienced in building scalable applications with modern web technologies and implementing secure authentication systems.',
    profileImage: '/WhatsApp Image 2026-02-25 at 3.51.34 PM.jpeg',
  },
  
  skills: {
    technical: [
      { name: 'Java', level: 70 },
      { name: 'Spring Boot', level: 60 },
      { name: 'React', level: 70 },
      { name: 'MySQL', level: 70 },
      { name: 'Python', level: 60 },
      { name: 'REST APIs', level: 70 },
      { name: 'JWT Authentication', level: 60 },
      { name: 'Git', level: 80 },
    ],
    tools: ['VS Code', 'Postman', 'MySQL Workbench', 'Git', 'Docker', 'Vite'],
  },

  projects: [
    {
      id: 1,
      name: 'Smart Community Hub',
      description: 'Social issue reporting platform enabling citizens to report infrastructure problems like water, garbage, roads, and electricity issues. Municipality admin dashboard for managing and resolving issues with real-time status updates.',
      technologies: ['Spring Boot', 'React', 'JWT', 'MySQL', 'REST APIs'],
      image: '🏘️',
      links: {
        github: 'https://github.com/adinathpa2975/smart_community_hub',
      },
      features: [
        'Real-time issue reporting',
        'Admin dashboard for management',
        'Status tracking system',
        'User authentication',
        'Location-based filtering',
      ],
    },
    {
      id: 2,
      name: 'StayBook',
      description: 'Comprehensive hotel room booking platform with admin panel for hotel management and user booking interface. Integrated payment gateway and OTP verification for secure transactions.',
      technologies: ['Spring Boot', 'React', 'MySQL', 'Razorpay', 'JWT'],
      image: '🏨',
      links: {
        github: 'https://github.com/adinathpa2975/staybook',
      },
      features: [
        'Hotel and room management',
        'Razorpay payment integration',
        'Email OTP verification',
        'Booking confirmation',
        'Room availability calendar',
      ],
    },
    {
      id: 3,
      name: 'Task Bridge',
      description: 'Multi-role task allocation system with specialized dashboards for Admin, Manager, HR, and Employee roles. Role-based access control and task workflow management.',
      technologies: ['Spring Boot', 'React', 'JWT', 'MySQL', 'Role-Based Auth'],
      image: '📋',
      links: {
        github: 'https://github.com/padghanadinath1626-ship-it/taskbridge_new',
      },
      features: [
        'Multi-role authentication',
        'Role-based dashboards',
        'Task assignment and tracking',
        'Progress monitoring',
        'Team collaboration tools',
      ],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Engineering (BE)',
      field: 'AI & Data Science',
      institution: 'University',
      year: '2022 - 2026',
      details: 'Pursuing specialized education in AI and Data Science with focus on machine learning and data analytics.',
    },
    {
      program: 'InfoBeans IT Excellence Program',
      focus: 'Full Stack Development',
      year: '2024 - Present',
      details: 'Intensive training program covering Full Stack Java Development, modern web frameworks, and industry practices.',
    },
  ],

  experience: [
    {
      role: 'Full Stack Developer Intern',
      company: 'InfoBeans',
      duration: '2024 - Present',
      description: 'Developing full-stack applications using Spring Boot and React with focus on clean code and best practices.',
    },
  ],

  social: {
    github: 'https://github.com/adinathpa2975?tab=repositories',
    linkedin: 'https://www.linkedin.com/in/adinath-padghan-07866a363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    twitter: 'https://x.com/DefIsbm52602',
    facebook:'https://m.facebook.com/100030368190416/',
    email: 'isbmdef@gmail.com',
  },

  // Path to resume PDF placed in the `public` folder. Update if you rename the file.
  resume: '/Adinath_Kanha_Padghan_Resume (1) (2).pdf',
};
