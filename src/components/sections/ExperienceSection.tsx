import { type Dispatch, type SetStateAction } from 'react';
import { Briefcase } from 'lucide-react';
import { Experience } from '../../types';
import { createEmptyExperience } from '../../utils/portfolioStorage';
import { ItemControls } from '../admin/ItemControls';

interface ExperienceSectionProps {
  experience: Experience[];
  isEditing: boolean;
  draftExperience: Experience[];
  setDraftExperience: Dispatch<SetStateAction<Experience[]>>;
}

export default function ExperienceSection({
  experience,
  isEditing,
  draftExperience,
  setDraftExperience,
}: ExperienceSectionProps) {
  const viewExperience = isEditing ? draftExperience : experience;

  return (
    <section id="experience" className="mb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Experience</h2>
        {isEditing && (
          <ItemControls
            addLabel="Add Job"
            onAdd={() => setDraftExperience((prev) => [...prev, createEmptyExperience()])}
          />
        )}
      </div>
      <div className="mt-8 space-y-5">
        {viewExperience.map((exp, expIdx) => (
          <article key={exp.id} className="rounded-2xl border border-border-subtle bg-glass-bg p-6 md:p-7">
            {isEditing && (
              <ItemControls
                removeLabel="Remove Job"
                onRemove={() => setDraftExperience((prev) => prev.filter((_, i) => i !== expIdx))}
                className="mb-4"
              />
            )}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                {isEditing ? (
                  <div className="grid grid-cols-1 gap-2">
                    <input
                      value={draftExperience[expIdx].role}
                      onChange={(e) =>
                        setDraftExperience((prev) =>
                          prev.map((item, i) => (i === expIdx ? { ...item, role: e.target.value } : item)),
                        )
                      }
                      className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-sm"
                    />
                    <input
                      value={draftExperience[expIdx].company}
                      onChange={(e) =>
                        setDraftExperience((prev) =>
                          prev.map((item, i) => (i === expIdx ? { ...item, company: e.target.value } : item)),
                        )
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
                    setDraftExperience((prev) =>
                      prev.map((item, i) => (i === expIdx ? { ...item, period: e.target.value } : item)),
                    )
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
                    <div className="flex flex-1 items-center gap-2">
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
                      <button
                        type="button"
                        onClick={() =>
                          setDraftExperience((prev) =>
                            prev.map((item, i) => {
                              if (i !== expIdx) return item;
                              return { ...item, achievements: item.achievements.filter((_, ai) => ai !== achIdx) };
                            }),
                          )
                        }
                        className="shrink-0 text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <span>{achievement}</span>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <ItemControls
                addLabel="Add Achievement"
                onAdd={() =>
                  setDraftExperience((prev) =>
                    prev.map((item, i) =>
                      i === expIdx ? { ...item, achievements: [...item.achievements, ''] } : item,
                    ),
                  )
                }
                className="mt-3"
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
