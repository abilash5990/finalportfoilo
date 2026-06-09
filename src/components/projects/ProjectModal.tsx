import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X } from 'lucide-react';
import { Project } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const liveUrl = project?.liveUrl ?? project?.link;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border-subtle bg-glass-bg shadow-2xl"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10"
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="aspect-video w-full object-cover"
            />

            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border-subtle px-2.5 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 id="project-modal-title" className="text-2xl font-bold text-primary md:text-3xl">
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-secondary">
                {project.role} · {project.duration}
              </p>
              {project.impact && (
                <p className="mt-3 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {project.impact}
                </p>
              )}

              <p className="mt-4 text-sm leading-relaxed text-secondary">{project.description}</p>

              {project.problem && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Problem</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Solution</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">{project.solution}</p>
                </div>
              )}
              {project.result && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Result</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">{project.result}</p>
                </div>
              )}

              <ul className="mt-6 space-y-2 text-sm text-secondary">
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Live Demo <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-border-subtle px-4 py-2.5 text-sm font-semibold"
                  >
                    GitHub <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
