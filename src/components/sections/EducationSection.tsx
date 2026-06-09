import { type Dispatch, type SetStateAction } from 'react';
import { Education } from '../../types';
import { createEmptyEducation } from '../../utils/portfolioStorage';
import { ItemControls } from '../admin/ItemControls';

interface EducationSectionProps {
  education: Education[];
  isEditing: boolean;
  draftEducation: Education[];
  setDraftEducation: Dispatch<SetStateAction<Education[]>>;
}

export default function EducationSection({
  education,
  isEditing,
  draftEducation,
  setDraftEducation,
}: EducationSectionProps) {
  const viewEducation = isEditing ? draftEducation : education;

  return (
    <section id="education" className="mb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Education</h2>
        {isEditing && (
          <ItemControls
            addLabel="Add Education"
            onAdd={() => setDraftEducation((prev) => [...prev, createEmptyEducation()])}
          />
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {viewEducation.map((edu, eduIdx) => (
          <article key={edu.id} className="rounded-2xl border border-border-subtle bg-glass-bg p-6">
            {isEditing ? (
              <div className="space-y-2">
                <ItemControls
                  removeLabel="Remove"
                  onRemove={() => setDraftEducation((prev) => prev.filter((_, i) => i !== eduIdx))}
                  className="mb-2"
                />
                <input
                  value={draftEducation[eduIdx].degree}
                  onChange={(e) =>
                    setDraftEducation((prev) =>
                      prev.map((item, i) => (i === eduIdx ? { ...item, degree: e.target.value } : item)),
                    )
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
                    setDraftEducation((prev) =>
                      prev.map((item, i) => (i === eduIdx ? { ...item, period: e.target.value } : item)),
                    )
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
  );
}
