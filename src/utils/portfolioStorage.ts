import { DEFAULT_PROFILE, ProfileData } from '../data/site.config';
import { EDUCATION, EXPERIENCE, PROJECTS, SKILL_CATEGORIES } from '../data/portfolio';
import { Education, Experience, Project, SkillCategory } from '../types';

export const STORAGE_KEYS = {
  adminMode: 'portfolio-admin-mode',
  profile: 'portfolio-profile',
  projects: 'portfolio-projects',
  experience: 'portfolio-experience',
  education: 'portfolio-education',
  skills: 'portfolio-skills',
} as const;

export type PortfolioData = {
  profile: ProfileData;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
};

export type PortfolioExport = PortfolioData & {
  version: 1;
  exportedAt: string;
};

export function getDefaultPortfolioData(): PortfolioData {
  return {
    profile: { ...DEFAULT_PROFILE, stats: [...DEFAULT_PROFILE.stats] },
    projects: PROJECTS.map((p) => ({ ...p, keyFeatures: [...p.keyFeatures], tags: [...p.tags] })),
    experience: EXPERIENCE.map((e) => ({ ...e, achievements: [...e.achievements] })),
    education: EDUCATION.map((e) => ({ ...e })),
    skillCategories: SKILL_CATEGORIES.map((c) => ({
      ...c,
      skills: c.skills.map((s) => ({ ...s })),
    })),
  };
}

export function parseStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const value = localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function persistPortfolioData(data: PortfolioData) {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(data.profile));
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(data.projects));
  localStorage.setItem(STORAGE_KEYS.experience, JSON.stringify(data.experience));
  localStorage.setItem(STORAGE_KEYS.education, JSON.stringify(data.education));
  localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(data.skillCategories));
}

export function clearPortfolioStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    if (key !== STORAGE_KEYS.adminMode) localStorage.removeItem(key);
  });
}

export function loadPortfolioData(): PortfolioData {
  const defaults = getDefaultPortfolioData();
  return {
    profile: parseStorage(STORAGE_KEYS.profile, defaults.profile),
    projects: parseStorage(STORAGE_KEYS.projects, defaults.projects),
    experience: parseStorage(STORAGE_KEYS.experience, defaults.experience),
    education: parseStorage(STORAGE_KEYS.education, defaults.education),
    skillCategories: parseStorage(STORAGE_KEYS.skills, defaults.skillCategories),
  };
}

export function buildPortfolioExport(data: PortfolioData): PortfolioExport {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    ...data,
  };
}

export function parsePortfolioImport(raw: string): PortfolioData | null {
  try {
    const parsed = JSON.parse(raw) as Partial<PortfolioExport>;
    if (!parsed.profile || !Array.isArray(parsed.projects) || !Array.isArray(parsed.experience)) {
      return null;
    }
    return {
      profile: parsed.profile,
      projects: parsed.projects,
      experience: parsed.experience ?? [],
      education: parsed.education ?? [],
      skillCategories: parsed.skillCategories ?? getDefaultPortfolioData().skillCategories,
    };
  } catch {
    return null;
  }
}

export function downloadPortfolioJson(data: PortfolioData) {
  const exportData = buildPortfolioExport(data);
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `portfolio-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createEmptyProject(): Project {
  return {
    id: createId(),
    title: 'New Project',
    role: 'Your Role',
    duration: '3 Months',
    description: 'Describe the project and your contribution.',
    keyFeatures: ['Key feature or outcome'],
    tags: ['React'],
    image: '/projects/ecommerce-dashboard.svg',
    link: '#',
    liveUrl: '#',
    githubUrl: '#',
    impact: '',
    problem: '',
    solution: '',
    result: '',
  };
}

export function createEmptyExperience(): Experience {
  return {
    id: createId(),
    company: 'Company Name',
    role: 'Job Title',
    period: '2024 - Present',
    description: 'Describe your responsibilities.',
    achievements: ['Achievement with measurable impact'],
  };
}

export function createEmptyEducation(): Education {
  return {
    id: createId(),
    institution: 'Institution Name',
    degree: 'Degree',
    period: '2020 - 2024',
    description: 'Relevant coursework or focus areas.',
  };
}
