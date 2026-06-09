import { type Dispatch, type SetStateAction } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getSkillIcon } from '../../utils/skillIcons';
import { SkillCategory } from '../../types';
import { ItemControls } from '../admin/ItemControls';

const ICON_OPTIONS = ['Code', 'Terminal', 'Globe', 'Cpu', 'Zap', 'Database', 'Cloud', 'Palette'];

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
  isEditing: boolean;
  draftSkillCategories: SkillCategory[];
  setDraftSkillCategories: Dispatch<SetStateAction<SkillCategory[]>>;
}

export default function SkillsSection({
  skillCategories,
  isEditing,
  draftSkillCategories,
  setDraftSkillCategories,
}: SkillsSectionProps) {
  const reducedMotion = useReducedMotion();
  const viewCategories = isEditing ? draftSkillCategories : skillCategories;

  return (
    <section id="skills" className="mb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Skills</h2>
        {isEditing && (
          <ItemControls
            addLabel="Add Category"
            onAdd={() =>
              setDraftSkillCategories((prev) => [
                ...prev,
                { name: 'New Category', skills: [{ name: 'Skill', level: 70, icon: 'Code' }] },
              ])
            }
          />
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {viewCategories.map((category, catIdx) => (
          <div key={`${category.name}-${catIdx}`} className="rounded-2xl border border-border-subtle bg-glass-bg p-6">
            {isEditing ? (
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <input
                  value={draftSkillCategories[catIdx].name}
                  onChange={(e) =>
                    setDraftSkillCategories((prev) =>
                      prev.map((c, i) => (i === catIdx ? { ...c, name: e.target.value } : c)),
                    )
                  }
                  className="rounded-lg border border-border-subtle bg-glass-bg px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-accent"
                />
                <ItemControls
                  addLabel="Add Skill"
                  removeLabel="Remove Category"
                  onAdd={() =>
                    setDraftSkillCategories((prev) =>
                      prev.map((c, i) =>
                        i === catIdx
                          ? { ...c, skills: [...c.skills, { name: 'New Skill', level: 70, icon: 'Code' }] }
                          : c,
                      ),
                    )
                  }
                  onRemove={() => setDraftSkillCategories((prev) => prev.filter((_, i) => i !== catIdx))}
                />
              </div>
            ) : (
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">{category.name}</h3>
            )}
            <div className="space-y-4">
              {category.skills.map((skill, skillIdx) => {
                const Icon = getSkillIcon(skill.icon);
                return (
                  <div key={`${skill.name}-${skillIdx}`}>
                    {isEditing ? (
                      <div className="mb-2 space-y-2 rounded-lg border border-border-subtle p-3">
                        <div className="flex flex-wrap gap-2">
                          <input
                            value={draftSkillCategories[catIdx].skills[skillIdx].name}
                            onChange={(e) =>
                              setDraftSkillCategories((prev) =>
                                prev.map((c, ci) => {
                                  if (ci !== catIdx) return c;
                                  const skills = c.skills.map((s, si) =>
                                    si === skillIdx ? { ...s, name: e.target.value } : s,
                                  );
                                  return { ...c, skills };
                                }),
                              )
                            }
                            className="flex-1 rounded border border-border-subtle bg-glass-bg px-2 py-1 text-sm"
                            placeholder="Skill name"
                          />
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={draftSkillCategories[catIdx].skills[skillIdx].level}
                            onChange={(e) =>
                              setDraftSkillCategories((prev) =>
                                prev.map((c, ci) => {
                                  if (ci !== catIdx) return c;
                                  const skills = c.skills.map((s, si) =>
                                    si === skillIdx ? { ...s, level: Number(e.target.value) } : s,
                                  );
                                  return { ...c, skills };
                                }),
                              )
                            }
                            className="w-16 rounded border border-border-subtle bg-glass-bg px-2 py-1 text-sm"
                          />
                          <select
                            value={draftSkillCategories[catIdx].skills[skillIdx].icon}
                            onChange={(e) =>
                              setDraftSkillCategories((prev) =>
                                prev.map((c, ci) => {
                                  if (ci !== catIdx) return c;
                                  const skills = c.skills.map((s, si) =>
                                    si === skillIdx ? { ...s, icon: e.target.value } : s,
                                  );
                                  return { ...c, skills };
                                }),
                              )
                            }
                            className="rounded border border-border-subtle bg-glass-bg px-2 py-1 text-sm"
                          >
                            {ICON_OPTIONS.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>
                        <ItemControls
                          removeLabel="Remove Skill"
                          onRemove={() =>
                            setDraftSkillCategories((prev) =>
                              prev.map((c, ci) => {
                                if (ci !== catIdx) return c;
                                return { ...c, skills: c.skills.filter((_, si) => si !== skillIdx) };
                              }),
                            )
                          }
                        />
                      </div>
                    ) : (
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                          <span className="text-sm font-medium text-primary">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted">{skill.level}%</span>
                      </div>
                    )}
                    {!isEditing && (
                      <div className="h-2 overflow-hidden rounded-full bg-border-subtle">
                        <motion.div
                          className="h-full rounded-full bg-accent"
                          initial={reducedMotion ? { width: `${skill.level}%` } : { width: 0 }}
                          whileInView={reducedMotion ? undefined : { width: `${skill.level}%` }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={reducedMotion ? undefined : { duration: 0.8, ease: 'easeOut' }}
                          style={{ width: reducedMotion ? `${skill.level}%` : undefined }}
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
