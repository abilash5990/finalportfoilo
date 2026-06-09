import { type Dispatch, type SetStateAction } from 'react';
import { motion } from 'motion/react';
import { FileDown, Mail } from 'lucide-react';
import { ProfileData } from '../../data/site.config';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToSection } from '../../utils/scroll';

interface HeroSectionProps {
  profile: ProfileData;
  isEditing: boolean;
  draftProfile: ProfileData;
  setDraftProfile: Dispatch<SetStateAction<ProfileData>>;
  displayRole: string;
  onResumeDownload: () => void;
}

export default function HeroSection({
  profile,
  isEditing,
  draftProfile,
  setDraftProfile,
  displayRole,
  onResumeDownload,
}: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="mb-24">
      <motion.p
        {...motionProps}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
      >
        {isEditing ? (
          <input
            value={draftProfile.availability}
            onChange={(e) => setDraftProfile((prev) => ({ ...prev, availability: e.target.value }))}
            className="w-80 bg-transparent outline-none"
          />
        ) : (
          profile.availability
        )}
      </motion.p>
      <motion.h1
        {...motionProps}
        transition={reducedMotion ? undefined : { delay: 0.08 }}
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
        {...motionProps}
        transition={reducedMotion ? undefined : { delay: 0.16 }}
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
          profile.summary
        )}
      </motion.p>
      <motion.div
        {...motionProps}
        transition={reducedMotion ? undefined : { delay: 0.24 }}
        className="mt-8 grid max-w-3xl grid-cols-1 gap-3 text-sm sm:grid-cols-3"
      >
        {profile.stats.map((item, idx) => (
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
        {...motionProps}
        transition={reducedMotion ? undefined : { delay: 0.32 }}
        className="mt-8 flex flex-wrap gap-3"
      >
        <a
          href={profile.resumeUrl}
          download="Resume.pdf"
          onClick={onResumeDownload}
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white"
        >
          Download Resume <FileDown className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-3 font-semibold"
        >
          Contact Me <Mail className="h-4 w-4" />
        </button>
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
  );
}
