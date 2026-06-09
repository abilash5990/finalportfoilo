import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { SITE } from '../../data/site.config';

interface ContactFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

type FormState = { name: string; email: string; message: string };

const INITIAL: FormState = { name: '', email: '', message: '' };

export default function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formId = SITE.formspreeEndpoint;
    if (!formId) {
      onError('Contact form is not configured. Set VITE_FORMSPREE_ID in .env.local');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setForm(INITIAL);
      setErrors({});
      onSuccess();
    } catch {
      onError('Failed to send message. Please try again or email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg space-y-4 text-left" noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-primary">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full rounded-xl border border-border-subtle bg-glass-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
          autoComplete="name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-primary">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full rounded-xl border border-border-subtle bg-glass-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-primary">
          Message
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          rows={4}
          className="w-full rounded-xl border border-border-subtle bg-glass-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {submitting ? 'Sending...' : 'Send Message'} <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
