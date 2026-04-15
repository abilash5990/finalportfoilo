import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, ExternalLink, FileDown, Github, Linkedin, Lock, Mail, Save, SquarePen, X } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { EDUCATION, EXPERIENCE, PROJECTS, SKILLS } from './data/portfolio';
import { Education, Experience, Project } from './types';

type ProfileData = {
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

const ADMIN_MODE_KEY = 'portfolio-admin-mode';
const PROFILE_KEY = 'portfolio-profile';
const PROJECTS_KEY = 'portfolio-projects';
const EXPERIENCE_KEY = 'portfolio-experience';
const EDUCATION_KEY = 'portfolio-education';
const ADMIN_PASSCODE = 'portfolio2026';

const DEFAULT_PROFILE: ProfileData = {
  name: 'Abilash',
  role: 'Full Stack Developer',
  summary:
    'I build fast, accessible web applications with React, TypeScript, Node.js, and PostgreSQL. I focus on clean UI, strong performance, and reliable backend systems.',
  availability: 'Open to Frontend and Full Stack roles',
  stats: ['3+ years experience', 'Remote and onsite', 'Immediate joiner'],
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  emailAddress: 'hello@example.com',
  resumeUrl: '/resume.pdf',
};

function parseStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const value = localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function PortfolioContent() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ADMIN_MODE_KEY) === 'true';
  });
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<ProfileData>(() => parseStorage(PROFILE_KEY, DEFAULT_PROFILE));
  const [projects, setProjects] = useState<Project[]>(() => parseStorage(PROJECTS_KEY, PROJECTS));
  const [experience, setExperience] = useState<Experience[]>(() => parseStorage(EXPERIENCE_KEY, EXPERIENCE));
  const [education, setEducation] = useState<Education[]>(() => parseStorage(EDUCATION_KEY, EDUCATION));

  const [draftProfile, setDraftProfile] = useState<ProfileData>(profile);
  const [draftProjects, setDraftProjects] = useState<Project[]>(projects);
  const [draftExperience, setDraftExperience] = useState<Experience[]>(experience);
  const [draftEducation, setDraftEducation] = useState<Education[]>(education);

  const viewProfile = isEditing ? draftProfile : profile;
  const viewProjects = isEditing ? draftProjects : projects;
  const viewExperience = isEditing ? draftExperience : experience;
  const viewEducation = isEditing ? draftEducation : education;

  const displayRole = useMemo(() => `${viewProfile.name} - ${viewProfile.role}`, [viewProfile.name, viewProfile.role]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isShortcut = (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e';
      if (!isShortcut) return;
      e.preventDefault();
      if (isAdmin) return;
      const code = window.prompt('Enter admin passcode');
      if (code === ADMIN_PASSCODE) {
        setIsAdmin(true);
        localStorage.setItem(ADMIN_MODE_KEY, 'true');
      } else if (code) {
        window.alert('Incorrect passcode');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isAdmin]);

  const startEditing = () => {
    setDraftProfile(profile);
    setDraftProjects(projects.map((p) => ({ ...p })));
    setDraftExperience(experience.map((item) => ({ ...item, achievements: [...item.achievements] })));
    setDraftEducation(education.map((item) => ({ ...item })));
    setIsEditing(true);
  };

  const saveAll = () => {
    setProfile(draftProfile);
    setProjects(draftProjects);
    setExperience(draftExperience);
    setEducation(draftEducation);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(draftProfile));
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(draftProjects));
    localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(draftExperience));
    localStorage.setItem(EDUCATION_KEY, JSON.stringify(draftEducation));
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setDraftProfile(profile);
    setDraftProjects(projects.map((p) => ({ ...p })));
    setDraftExperience(experience.map((item) => ({ ...item, achievements: [...item.achievements] })));
    setDraftEducation(education.map((item) => ({ ...item })));
  };

  const exitAdminMode = () => {
    setIsEditing(false);
    setIsAdmin(false);
    localStorage.setItem(ADMIN_MODE_KEY, 'false');
  };

  return (
    <div className="min-h-screen selection:bg-accent/20">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-14 md:px-6 md:pt-20">
        {isAdmin && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-glass-bg p-3">
            <p className="text-sm text-secondary">
              Admin mode enabled. Use these controls to edit profile content and save locally.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {!isEditing ? (
                <button onClick={startEditing} className="btn-primary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
                  <SquarePen className="h-4 w-4" /> Edit
                </button>
              ) : (
                <>
                  <button onClick={saveAll} className="btn-primary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
                    <Save className="h-4 w-4" /> Save
                  </button>
                  <button onClick={cancelEditing} className="btn-secondary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
                    <X className="h-4 w-4" /> Cancel
                  </button>
                </>
              )}
              <button onClick={exitAdminMode} className="btn-secondary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
                <Lock className="h-4 w-4" /> Exit Admin
              </button>
            </div>
          </div>
        )}

        <section className="mb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            {isEditing ? (
              <input
                value={draftProfile.availability}
                onChange={(e) => setDraftProfile((prev) => ({ ...prev, availability: e.target.value }))}
                className="w-80 bg-transparent outline-none"
              />
            ) : (
              viewProfile.availability
            )}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-4xl font-bold tracking-tight text-primary md:text-6xl"
          >
            {isEditing ? (
              <div className="grid max-w-3xl grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  value={draftProfile.name}
                  onChange={(e) => setDraftProfile((prev) => ({ ...prev, name: e.target.value }))}
                  className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-base"
                />
                <input
                  value={draftProfile.role}
                  onChange={(e) => setDraftProfile((prev) => ({ ...prev, role: e.target.value }))}
                  className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-base"
                />
              </div>
            ) : (
              displayRole
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-secondary md:text-lg"
          >
            {isEditing ? (
              <textarea
                value={draftProfile.summary}
                onChange={(e) => setDraftProfile((prev) => ({ ...prev, summary: e.target.value }))}
                rows={4}
                className="w-full rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-base"
              />
            ) : (
              viewProfile.summary
            )}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 grid max-w-3xl grid-cols-1 gap-3 text-sm sm:grid-cols-3"
          >
            {viewProfile.stats.map((item, idx) => (
              <div key={`${item}-${idx}`} className="rounded-xl border border-border-subtle bg-glass-bg px-4 py-3 font-medium text-primary">
                {isEditing ? (
                  <input
                    value={draftProfile.stats[idx] ?? ''}
                    onChange={(e) =>
                      setDraftProfile((prev) => {
                        const nextStats = [...prev.stats];
                        nextStats[idx] = e.target.value;
                        return { ...prev, stats: nextStats };
                      })
                    }
                    className="w-full bg-transparent outline-none"
                  />
                ) : (
                  item
                )}
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={viewProfile.resumeUrl}
              download="Resume.pdf"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white"
            >
              Download Resume <FileDown className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${viewProfile.emailAddress}`}
              className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-3 font-semibold"
            >
              Contact Me <Mail className="h-4 w-4" />
            </a>
          </motion.div>
          {isEditing && (
            <div className="mt-4 grid max-w-3xl grid-cols-1 gap-3 md:grid-cols-2">
              <input
                value={draftProfile.githubUrl}
                onChange={(e) => setDraftProfile((prev) => ({ ...prev, githubUrl: e.target.value }))}
                className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                placeholder="GitHub URL"
              />
              <input
                value={draftProfile.linkedinUrl}
                onChange={(e) => setDraftProfile((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                placeholder="LinkedIn URL"
              />
              <input
                value={draftProfile.emailAddress}
                onChange={(e) => setDraftProfile((prev) => ({ ...prev, emailAddress: e.target.value }))}
                className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                placeholder="Email"
              />
              <input
                value={draftProfile.resumeUrl}
                onChange={(e) => setDraftProfile((prev) => ({ ...prev, resumeUrl: e.target.value }))}
                className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                placeholder="Resume URL"
              />
            </div>
          )}
        </section>

        <section id="experience" className="mb-24">
          <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Experience</h2>
          <div className="mt-8 space-y-5">
            {viewExperience.map((exp, expIdx) => (
              <article key={exp.id} className="rounded-2xl border border-border-subtle bg-glass-bg p-6 md:p-7">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    {isEditing ? (
                      <div className="grid grid-cols-1 gap-2">
                        <input
                          value={draftExperience[expIdx].role}
                          onChange={(e) =>
                            setDraftExperience((prev) => prev.map((item, i) => (i === expIdx ? { ...item, role: e.target.value } : item)))
                          }
                          className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                        />
                        <input
                          value={draftExperience[expIdx].company}
                          onChange={(e) =>
                            setDraftExperience((prev) => prev.map((item, i) => (i === expIdx ? { ...item, company: e.target.value } : item)))
                          }
                          className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
                        <p className="text-sm font-medium text-secondary">{exp.company}</p>
                      </>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      value={draftExperience[expIdx].period}
                      onChange={(e) =>
                        setDraftExperience((prev) => prev.map((item, i) => (i === expIdx ? { ...item, period: e.target.value } : item)))
                      }
                      className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="inline-flex items-center gap-1 text-xs font-medium text-muted">
                      <Briefcase className="h-3.5 w-3.5" /> {exp.period}
                    </p>
                  )}
                </div>
                {isEditing ? (
                  <textarea
                    value={draftExperience[expIdx].description}
                    onChange={(e) =>
                      setDraftExperience((prev) =>
                        prev.map((item, i) => (i === expIdx ? { ...item, description: e.target.value } : item)),
                      )
                    }
                    rows={3}
                    className="mb-4 w-full rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                  />
                ) : (
                  <p className="mb-4 text-sm leading-relaxed text-secondary">{exp.description}</p>
                )}
                <ul className="space-y-2 text-sm text-secondary">
                  {exp.achievements.map((achievement, achIdx) => (
                    <li key={`${achievement}-${achIdx}`} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {isEditing ? (
                        <input
                          value={draftExperience[expIdx].achievements[achIdx] ?? ''}
                          onChange={(e) =>
                            setDraftExperience((prev) =>
                              prev.map((item, i) => {
                                if (i !== expIdx) return item;
                                const nextAchievements = [...item.achievements];
                                nextAchievements[achIdx] = e.target.value;
                                return { ...item, achievements: nextAchievements };
                              }),
                            )
                          }
                          className="w-full rounded bg-transparent outline-none"
                        />
                      ) : (
                        <span>{achievement}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mb-24">
          <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Projects</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {viewProjects.map((project, projectIdx) => (
              <article key={project.id} className="flex flex-col rounded-2xl border border-border-subtle bg-glass-bg p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    isEditing ? (
                      <input
                        key={`${tag}-${projectIdx}`}
                        value={draftProjects[projectIdx].tags[project.tags.indexOf(tag)] ?? ''}
                        onChange={(e) =>
                          setDraftProjects((prev) =>
                            prev.map((item, i) => {
                              if (i !== projectIdx) return item;
                              const nextTags = [...item.tags];
                              nextTags[project.tags.indexOf(tag)] = e.target.value;
                              return { ...item, tags: nextTags };
                            }),
                          )
                        }
                        className="w-20 rounded-full border border-border-subtle bg-transparent px-2.5 py-1 text-xs"
                      />
                    ) : (
                      <span key={tag} className="rounded-full border border-border-subtle px-2.5 py-1 text-xs text-muted">
                        {tag}
                      </span>
                    )
                  ))}
                </div>
                {isEditing ? (
                  <>
                    <input
                      value={draftProjects[projectIdx].title}
                      onChange={(e) =>
                        setDraftProjects((prev) => prev.map((item, i) => (i === projectIdx ? { ...item, title: e.target.value } : item)))
                      }
                      className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <input
                      value={draftProjects[projectIdx].role}
                      onChange={(e) =>
                        setDraftProjects((prev) => prev.map((item, i) => (i === projectIdx ? { ...item, role: e.target.value } : item)))
                      }
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <textarea
                      value={draftProjects[projectIdx].description}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, description: e.target.value } : item)),
                        )
                      }
                      rows={4}
                      className="mt-3 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                    <p className="mt-1 text-sm text-secondary">{project.role}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">{project.description}</p>
                  </>
                )}
                <ul className="mt-4 space-y-2 text-sm text-secondary">
                  {project.keyFeatures.map((feature, featureIdx) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {isEditing ? (
                        <input
                          value={draftProjects[projectIdx].keyFeatures[featureIdx] ?? ''}
                          onChange={(e) =>
                            setDraftProjects((prev) =>
                              prev.map((item, i) => {
                                if (i !== projectIdx) return item;
                                const nextFeatures = [...item.keyFeatures];
                                nextFeatures[featureIdx] = e.target.value;
                                return { ...item, keyFeatures: nextFeatures };
                              }),
                            )
                          }
                          className="w-full rounded bg-transparent outline-none"
                        />
                      ) : (
                        <span>{feature}</span>
                      )}
                    </li>
                  ))}
                </ul>
                <a
                  href={isEditing ? '#' : project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  View Project <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="mb-24">
          <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Skills</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="rounded-xl border border-border-subtle bg-glass-bg px-4 py-3">
                <p className="text-sm font-semibold text-primary">{skill.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="mb-24">
          <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Education</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {viewEducation.map((edu, eduIdx) => (
              <article key={edu.id} className="rounded-2xl border border-border-subtle bg-glass-bg p-6">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      value={draftEducation[eduIdx].degree}
                      onChange={(e) =>
                        setDraftEducation((prev) => prev.map((item, i) => (i === eduIdx ? { ...item, degree: e.target.value } : item)))
                      }
                      className="w-full rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <input
                      value={draftEducation[eduIdx].institution}
                      onChange={(e) =>
                        setDraftEducation((prev) =>
                          prev.map((item, i) => (i === eduIdx ? { ...item, institution: e.target.value } : item)),
                        )
                      }
                      className="w-full rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <input
                      value={draftEducation[eduIdx].period}
                      onChange={(e) =>
                        setDraftEducation((prev) => prev.map((item, i) => (i === eduIdx ? { ...item, period: e.target.value } : item)))
                      }
                      className="w-full rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <textarea
                      value={draftEducation[eduIdx].description}
                      onChange={(e) =>
                        setDraftEducation((prev) =>
                          prev.map((item, i) => (i === eduIdx ? { ...item, description: e.target.value } : item)),
                        )
                      }
                      rows={3}
                      className="w-full rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-primary">{edu.degree}</h3>
                    <p className="mt-1 text-sm font-medium text-secondary">{edu.institution}</p>
                    <p className="mt-1 text-xs text-muted">{edu.period}</p>
                    <p className="mt-3 text-sm leading-relaxed text-secondary">{edu.description}</p>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-2xl border border-border-subtle bg-glass-bg p-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Let&apos;s work together</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
            I am available for Software Engineer opportunities. Reach out for roles in frontend or full stack development.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${viewProfile.emailAddress}`} className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white">
              <Mail className="h-4 w-4" /> Email Me
            </a>
            <a href={viewProfile.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-3 text-sm font-semibold">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={viewProfile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-3 text-sm font-semibold">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
