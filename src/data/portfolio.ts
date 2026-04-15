import { Project, Skill, Experience, Education } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Admin Dashboard',
    role: 'Frontend Developer',
    duration: '4 Months',
    description: 'Built an admin dashboard for order and inventory management, helping operations teams reduce manual reporting and improve daily decision-making.',
    keyFeatures: [
      'Created role-based dashboards for sales, inventory, and fulfillment',
      'Implemented reusable data tables with filtering, export, and pagination',
      'Improved Lighthouse performance score from 68 to 92'
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://example.com'
  },
  {
    id: '2',
    title: 'Job Portal Platform',
    role: 'Full Stack Engineer',
    duration: '5 Months',
    description: 'Developed a job platform where candidates apply to openings and recruiters manage applications through a structured hiring pipeline.',
    keyFeatures: [
      'Built candidate profile creation, resume upload, and job application flows',
      'Implemented recruiter dashboard with search and status tracking',
      'Reduced average API response time by 30% via query and indexing improvements'
    ],
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: 'https://example.com'
  },
  {
    id: '3',
    title: 'Real-Time Analytics Dashboard',
    role: 'Full Stack Developer',
    duration: '3 Months',
    description: 'Built a real-time analytics dashboard for product and engagement metrics, enabling teams to monitor KPI trends and react faster.',
    keyFeatures: [
      'Developed live charts and summary cards for key business metrics',
      'Integrated authentication and role-based access control',
      'Decreased page load time by 40% through bundle optimization and lazy loading'
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    link: 'https://example.com'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    company: 'Product Tech Solutions',
    role: 'Software Engineer',
    period: '2023 - Present',
    description: 'Build and maintain frontend and backend features for business web applications used by internal and external teams.',
    achievements: [
      'Delivered 15+ production features across React and Node.js services.',
      'Improved dashboard load speed by 35% by optimizing render paths and API calls.',
      'Collaborated with design and QA to reduce release issues by 25%.'
    ]
  },
  {
    id: '2',
    company: 'WebCraft Studio',
    role: 'Full Stack Developer',
    period: '2021 - 2023',
    description: 'Developed client-facing web applications and admin tools for small and medium-sized businesses.',
    achievements: [
      'Built responsive UIs that increased mobile engagement by 20%.',
      'Implemented secure REST APIs and reduced recurring bugs by standardizing validation.',
      'Delivered projects on schedule in an agile team with weekly releases.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: '1',
    institution: 'Institute of Technology',
    degree: 'Master of Computer Applications',
    period: '2019 - 2021',
    description: 'Focused on full stack development, data structures, and software engineering practices.'
  },
  {
    id: '2',
    institution: 'State University',
    degree: 'Bachelor of Computer Science',
    period: '2015 - 2019',
    description: 'Built strong fundamentals in programming, databases, networking, and web development.'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Frontend: React, Next.js, TypeScript, Tailwind CSS', level: 90, icon: 'Code' },
  { name: 'Backend: Node.js, Express, REST APIs', level: 86, icon: 'Terminal' },
  { name: 'Database: PostgreSQL, MongoDB, Prisma', level: 84, icon: 'Globe' },
  { name: 'Cloud/DevOps: Vercel, Render, Docker, GitHub Actions', level: 78, icon: 'Cpu' },
  { name: 'Testing & Quality: Jest, React Testing Library, Postman', level: 75, icon: 'Zap' }
];
