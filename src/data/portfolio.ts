import { Project, SkillCategory, Experience, Education } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Admin Dashboard',
    role: 'Frontend Developer',
    duration: '4 Months',
    description:
      'Built an admin dashboard for order and inventory management, helping operations teams reduce manual reporting and improve daily decision-making.',
    keyFeatures: [
      'Created role-based dashboards for sales, inventory, and fulfillment',
      'Implemented reusable data tables with filtering, export, and pagination',
      'Improved Lighthouse performance score from 68 to 92',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/ecommerce-dashboard.svg',
    link: 'https://github.com/abilash/ecommerce-dashboard',
    liveUrl: 'https://ecommerce-dashboard-demo.vercel.app',
    githubUrl: 'https://github.com/abilash/ecommerce-dashboard',
    impact: 'Lighthouse 68 → 92',
    problem: 'Operations teams relied on spreadsheets for inventory and order tracking, causing delays and reporting errors.',
    solution:
      'Built a React admin dashboard with role-based views, reusable data tables, and real-time inventory sync via REST APIs.',
    result: 'Cut manual reporting time by 40% and improved daily decision speed for fulfillment teams.',
  },
  {
    id: '2',
    title: 'Job Portal Platform',
    role: 'Full Stack Engineer',
    duration: '5 Months',
    description:
      'Developed a job platform where candidates apply to openings and recruiters manage applications through a structured hiring pipeline.',
    keyFeatures: [
      'Built candidate profile creation, resume upload, and job application flows',
      'Implemented recruiter dashboard with search and status tracking',
      'Reduced average API response time by 30% via query and indexing improvements',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image: '/projects/job-portal.svg',
    link: 'https://github.com/abilash/job-portal',
    liveUrl: 'https://job-portal-demo.vercel.app',
    githubUrl: 'https://github.com/abilash/job-portal',
    impact: 'API response time −30%',
    problem: 'Recruiters lacked a unified pipeline to track candidates across multiple job openings.',
    solution:
      'Delivered full-stack application flows with PostgreSQL-backed search, status tracking, and secure file uploads.',
    result: 'Streamlined hiring pipeline and reduced time-to-shortlist by 25% for pilot clients.',
  },
  {
    id: '3',
    title: 'Real-Time Analytics Dashboard',
    role: 'Full Stack Developer',
    duration: '3 Months',
    description:
      'Built a real-time analytics dashboard for product and engagement metrics, enabling teams to monitor KPI trends and react faster.',
    keyFeatures: [
      'Developed live charts and summary cards for key business metrics',
      'Integrated authentication and role-based access control',
      'Decreased page load time by 40% through bundle optimization and lazy loading',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    image: '/projects/analytics-dashboard.svg',
    link: 'https://github.com/abilash/analytics-dashboard',
    liveUrl: 'https://analytics-dashboard-demo.vercel.app',
    githubUrl: 'https://github.com/abilash/analytics-dashboard',
    impact: 'Page load time −40%',
    problem: 'Product teams could not monitor engagement KPIs in real time without switching between tools.',
    solution:
      'Built a Next.js dashboard with live charts, RBAC, and Supabase real-time subscriptions for metric updates.',
    result: 'Enabled faster product decisions with sub-second metric refresh and 40% faster initial load.',
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    company: 'Product Tech Solutions',
    role: 'Software Engineer',
    period: '2023 - Present',
    description:
      'Build and maintain frontend and backend features for business web applications used by internal and external teams.',
    achievements: [
      'Delivered 15+ production features across React and Node.js services.',
      'Improved dashboard load speed by 35% by optimizing render paths and API calls.',
      'Collaborated with design and QA to reduce release issues by 25%.',
    ],
  },
  {
    id: '2',
    company: 'WebCraft Studio',
    role: 'Full Stack Developer',
    period: '2021 - 2023',
    description:
      'Developed client-facing web applications and admin tools for small and medium-sized businesses.',
    achievements: [
      'Built responsive UIs that increased mobile engagement by 20%.',
      'Implemented secure REST APIs and reduced recurring bugs by standardizing validation.',
      'Delivered projects on schedule in an agile team with weekly releases.',
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    id: '1',
    institution: 'Institute of Technology',
    degree: 'Master of Computer Applications',
    period: '2019 - 2021',
    description: 'Focused on full stack development, data structures, and software engineering practices.',
  },
  {
    id: '2',
    institution: 'State University',
    degree: 'Bachelor of Computer Science',
    period: '2015 - 2019',
    description: 'Built strong fundamentals in programming, databases, networking, and web development.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 90, icon: 'Code' },
      { name: 'Next.js', level: 85, icon: 'Code' },
      { name: 'TypeScript', level: 88, icon: 'Code' },
      { name: 'Tailwind CSS', level: 92, icon: 'Palette' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 86, icon: 'Terminal' },
      { name: 'Express', level: 84, icon: 'Terminal' },
      { name: 'REST APIs', level: 88, icon: 'Globe' },
    ],
  },
  {
    name: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 84, icon: 'Database' },
      { name: 'MongoDB', level: 78, icon: 'Database' },
      { name: 'Prisma', level: 80, icon: 'Database' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'Vercel', level: 82, icon: 'Cloud' },
      { name: 'Docker', level: 75, icon: 'Cpu' },
      { name: 'GitHub Actions', level: 78, icon: 'Zap' },
    ],
  },
];

/** @deprecated Use SKILL_CATEGORIES instead */
export const SKILLS = SKILL_CATEGORIES.flatMap((cat) =>
  cat.skills.map((s) => ({ name: `${cat.name}: ${s.name}`, level: s.level, icon: s.icon })),
);
