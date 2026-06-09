export const SITE = {
  name: 'Abilash',
  role: 'Full Stack Developer',
  title: 'Abilash — Full Stack Developer',
  description:
    'Full Stack Developer building fast, accessible web applications with React, TypeScript, Node.js, and PostgreSQL.',
  url: 'https://abilash.dev',
  ogImage: '/og-image.svg',
  email: 'hello@abilash.dev',
  githubUrl: 'https://github.com/abilash',
  linkedinUrl: 'https://linkedin.com/in/abilash',
  resumePath: '/resume.pdf',
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ID as string | undefined,
};

export type ProfileData = {
  name: string;
  role: string;
  summary: string;
  availability: string;
  stats: string[];
  githubUrl: string;
  linkedinUrl: string;
  emailAddress: string;
  resumeUrl: string;
};

export const DEFAULT_PROFILE: ProfileData = {
  name: SITE.name,
  role: SITE.role,
  summary:
    'I build fast, accessible web applications with React, TypeScript, Node.js, and PostgreSQL. I focus on clean UI, strong performance, and reliable backend systems.',
  availability: 'Open to Frontend and Full Stack roles',
  stats: ['15+ production features shipped', '35% faster dashboard loads', '3+ years experience'],
  githubUrl: SITE.githubUrl,
  linkedinUrl: SITE.linkedinUrl,
  emailAddress: SITE.email,
  resumeUrl: SITE.resumePath,
};

export const NAV_ITEMS = ['Experience', 'Projects', 'Skills', 'Education', 'Contact'] as const;
