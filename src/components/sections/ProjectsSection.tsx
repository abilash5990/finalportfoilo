import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { ExternalLink, Github, ImageUp } from 'lucide-react';
import { Project } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { createEmptyProject } from '../../utils/portfolioStorage';
import { readImageAsDataUrl } from '../../utils/imageUpload';
import ProjectModal from '../projects/ProjectModal';
import { ItemControls } from '../admin/ItemControls';

interface ProjectsSectionProps {
  projects: Project[];
  isEditing: boolean;
  draftProjects: Project[];
  setDraftProjects: Dispatch<SetStateAction<Project[]>>;
  onImageError?: (message: string) => void;
}

export default function ProjectsSection({
  projects,
  isEditing,
  draftProjects,
  setDraftProjects,
  onImageError,
}: ProjectsSectionProps) {
  const reducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const viewProjects = isEditing ? draftProjects : projects;

  const handleImageUpload = async (projectIdx: number, file: File) => {
    try {
      const dataUrl = await readImageAsDataUrl(file);
      setDraftProjects((prev) =>
        prev.map((item, i) => (i === projectIdx ? { ...item, image: dataUrl } : item)),
      );
    } catch (err) {
      onImageError?.(err instanceof Error ? err.message : 'Failed to upload image');
    }
  };

  return (
    <section id="projects" className="mb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Projects</h2>
        {isEditing && (
          <ItemControls addLabel="Add Project" onAdd={() => setDraftProjects((prev) => [...prev, createEmptyProject()])} />
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {viewProjects.map((project, projectIdx) => {
          const liveUrl = project.liveUrl ?? project.link;
          return (
            <article
              key={project.id}
              className={`flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-glass-bg ${
                !isEditing && !reducedMotion ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg' : ''
              }`}
            >
              {isEditing ? (
                <div className="border-b border-border-subtle p-4">
                  <img
                    src={draftProjects[projectIdx].image}
                    alt={`${project.title} preview`}
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[project.id]?.click()}
                    className="btn-secondary mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle px-3 py-2 text-sm"
                  >
                    <ImageUp className="h-4 w-4" /> Upload Image
                  </button>
                  <input
                    ref={(el) => {
                      fileInputRefs.current[project.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      e.target.value = '';
                      if (file) void handleImageUpload(projectIdx, file);
                    }}
                  />
                  <p className="mt-2 text-xs text-muted">Max 800 KB. Stored as base64 in local storage.</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="block w-full text-left"
                  aria-label={`View details for ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                </button>
              )}

              <div className="flex flex-1 flex-col p-6">
                {isEditing && (
                  <ItemControls
                    removeLabel="Remove Project"
                    onRemove={() => setDraftProjects((prev) => prev.filter((_, i) => i !== projectIdx))}
                    className="mb-3"
                  />
                )}
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) =>
                    isEditing ? (
                      <div key={`${tag}-${tagIdx}`} className="flex items-center gap-1">
                        <input
                          value={draftProjects[projectIdx].tags[tagIdx] ?? ''}
                          onChange={(e) =>
                            setDraftProjects((prev) =>
                              prev.map((item, i) => {
                                if (i !== projectIdx) return item;
                                const nextTags = [...item.tags];
                                nextTags[tagIdx] = e.target.value;
                                return { ...item, tags: nextTags };
                              }),
                            )
                          }
                          className="w-20 rounded-full border border-border-subtle bg-transparent px-2.5 py-1 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setDraftProjects((prev) =>
                              prev.map((item, i) => {
                                if (i !== projectIdx) return item;
                                return { ...item, tags: item.tags.filter((_, ti) => ti !== tagIdx) };
                              }),
                            )
                          }
                          className="text-xs text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <span key={tag} className="rounded-full border border-border-subtle px-2.5 py-1 text-xs text-muted">
                        {tag}
                      </span>
                    ),
                  )}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, tags: [...item.tags, ''] } : item)),
                        )
                      }
                      className="rounded-full border border-dashed border-border-subtle px-2.5 py-1 text-xs text-muted"
                    >
                      + tag
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <>
                    <input
                      value={draftProjects[projectIdx].title}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, title: e.target.value } : item)),
                        )
                      }
                      className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <input
                      value={draftProjects[projectIdx].role}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, role: e.target.value } : item)),
                        )
                      }
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <input
                      value={draftProjects[projectIdx].duration}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, duration: e.target.value } : item)),
                        )
                      }
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                      placeholder="Duration"
                    />
                    <input
                      value={draftProjects[projectIdx].impact ?? ''}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, impact: e.target.value } : item)),
                        )
                      }
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                      placeholder="Impact metric"
                    />
                    <input
                      value={draftProjects[projectIdx].liveUrl ?? ''}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) =>
                            i === projectIdx ? { ...item, liveUrl: e.target.value, link: e.target.value } : item,
                          ),
                        )
                      }
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                      placeholder="Live demo URL"
                    />
                    <input
                      value={draftProjects[projectIdx].githubUrl ?? ''}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, githubUrl: e.target.value } : item)),
                        )
                      }
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                      placeholder="GitHub URL"
                    />
                    <textarea
                      value={draftProjects[projectIdx].description}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, description: e.target.value } : item)),
                        )
                      }
                      rows={3}
                      className="mt-3 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <textarea
                      value={draftProjects[projectIdx].problem ?? ''}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, problem: e.target.value } : item)),
                        )
                      }
                      rows={2}
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                      placeholder="Problem"
                    />
                    <textarea
                      value={draftProjects[projectIdx].solution ?? ''}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, solution: e.target.value } : item)),
                        )
                      }
                      rows={2}
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                      placeholder="Solution"
                    />
                    <textarea
                      value={draftProjects[projectIdx].result ?? ''}
                      onChange={(e) =>
                        setDraftProjects((prev) =>
                          prev.map((item, i) => (i === projectIdx ? { ...item, result: e.target.value } : item)),
                        )
                      }
                      rows={2}
                      className="mt-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                      placeholder="Result"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                    <p className="mt-1 text-sm text-secondary">
                      {project.role} · {project.duration}
                    </p>
                    {project.impact && (
                      <p className="mt-2 inline-flex w-fit rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                        {project.impact}
                      </p>
                    )}
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">{project.description}</p>
                  </>
                )}

                <ul className="mt-4 space-y-2 text-sm text-secondary">
                  {project.keyFeatures.map((feature, featureIdx) => (
                    <li key={`${feature}-${featureIdx}`} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {isEditing ? (
                        <div className="flex flex-1 items-center gap-2">
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
                          <button
                            type="button"
                            onClick={() =>
                              setDraftProjects((prev) =>
                                prev.map((item, i) => {
                                  if (i !== projectIdx) return item;
                                  return { ...item, keyFeatures: item.keyFeatures.filter((_, fi) => fi !== featureIdx) };
                                }),
                              )
                            }
                            className="shrink-0 text-xs text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span>{feature}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {isEditing && (
                  <ItemControls
                    addLabel="Add Feature"
                    onAdd={() =>
                      setDraftProjects((prev) =>
                        prev.map((item, i) =>
                          i === projectIdx ? { ...item, keyFeatures: [...item.keyFeatures, ''] } : item,
                        ),
                      )
                    }
                    className="mt-3"
                  />
                )}

                {!isEditing && (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-semibold text-accent hover:underline"
                    >
                      View details
                    </button>
                    {liveUrl && liveUrl !== '#' && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
