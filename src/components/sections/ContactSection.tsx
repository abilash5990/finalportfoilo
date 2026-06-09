import { Github, Linkedin, Mail } from 'lucide-react';
import { ProfileData } from '../../data/site.config';
import ContactForm from '../contact/ContactForm';

interface ContactSectionProps {
  profile: ProfileData;
  onFormSuccess: () => void;
  onFormError: (message: string) => void;
}

export default function ContactSection({ profile, onFormSuccess, onFormError }: ContactSectionProps) {
  return (
    <section id="contact" className="rounded-2xl border border-border-subtle bg-glass-bg p-8 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Let&apos;s work together</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
        I am available for Software Engineer opportunities. Reach out for roles in frontend or full stack development.
      </p>

      <ContactForm onSuccess={onFormSuccess} onError={onFormError} />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`mailto:${profile.emailAddress}`}
          className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-3 text-sm font-semibold"
        >
          <Mail className="h-4 w-4" /> Email Me
        </a>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-3 text-sm font-semibold"
        >
          <Github className="h-4 w-4" /> GitHub
        </a>
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-3 text-sm font-semibold"
        >
          <Linkedin className="h-4 w-4" /> LinkedIn
        </a>
      </div>
    </section>
  );
}
