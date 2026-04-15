import { Project, Skill, Experience, Education } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aether OS',
    role: 'Lead Architect',
    duration: '6 Months',
    description: 'A decentralized operating system built for the next generation of spatial computing. It leverages WebAssembly for high-performance execution and post-quantum cryptography for data security.',
    keyFeatures: [
      'Decentralized identity management',
      'Wasm-based plugin architecture',
      'Spatial UI rendering engine'
    ],
    tags: ['React', 'WebAssembly', 'Rust'],
    link: '#'
  },
  {
    id: '2',
    title: 'Neural Bridge',
    role: 'Full Stack Engineer',
    duration: '4 Months',
    description: 'Real-time brain-computer interface visualization dashboard using neural telemetry. Designed to handle high-throughput data streams with sub-10ms latency for medical research.',
    keyFeatures: [
      'Real-time EEG data streaming',
      '3D neural mapping with Three.js',
      'Automated anomaly detection'
    ],
    tags: ['Three.js', 'TypeScript', 'Python'],
    link: '#'
  },
  {
    id: '3',
    title: 'Quantum Ledger',
    role: 'Security Specialist',
    duration: '8 Months',
    description: 'Post-quantum cryptographic wallet for secure multi-chain asset management. Implements lattice-based signatures to protect against future quantum computing threats.',
    keyFeatures: [
      'Multi-chain asset aggregation',
      'Lattice-based signature implementation',
      'Hardware security module integration'
    ],
    tags: ['Next.js', 'Solidity', 'Go'],
    link: '#'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    company: 'Stellar Systems Inc.',
    role: 'Senior Software Architect',
    period: '2023 - Present',
    description: 'Spearheading the development of next-generation cloud infrastructure and distributed systems.',
    achievements: [
      'Reduced system latency by 40% through microservices optimization.',
      'Led a team of 12 engineers in a complete platform migration.',
      'Implemented post-quantum security protocols across all APIs.'
    ]
  },
  {
    id: '2',
    company: 'Nebula Labs',
    role: 'Full Stack Developer',
    period: '2021 - 2023',
    description: 'Developed high-performance web applications and interactive data visualizations.',
    achievements: [
      'Built a real-time analytics dashboard used by 500k+ monthly users.',
      'Optimized React rendering performance, improving Lighthouse scores by 25 points.',
      'Integrated AI-driven predictive modeling into the core product.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: '1',
    institution: 'Tech Institute of Future',
    degree: 'Master of Science in Computer Science',
    period: '2019 - 2021',
    description: 'Specialized in Artificial Intelligence and Distributed Systems. Graduated with honors.'
  },
  {
    id: '2',
    institution: 'Global University of Design',
    degree: 'Bachelor of Science in Software Engineering',
    period: '2015 - 2019',
    description: 'Focused on UI/UX principles and scalable web architecture.'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, icon: 'Code' },
  { name: 'TypeScript', level: 90, icon: 'Terminal' },
  { name: 'Cloud Architecture', level: 85, icon: 'Globe' },
  { name: 'AI Integration', level: 80, icon: 'Cpu' },
  { name: 'UI/UX Design', level: 88, icon: 'Zap' }
];
