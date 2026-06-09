export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  duration: string;
  keyFeatures: string[];
  tags: string[];
  image: string;
  link: string;
  liveUrl?: string;
  githubUrl?: string;
  problem?: string;
  solution?: string;
  result?: string;
  impact?: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
