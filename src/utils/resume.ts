import { SITE } from '../data/site.config';
import { getResumePdf } from './resumeStorage';

export const FALLBACK_RESUME_PATH = SITE.resumePath;

export function getResumeFileName(name: string) {
  const safe = name.trim().replace(/\s+/g, '_').replace(/[^\w-]/g, '') || 'Resume';
  return `${safe}_Resume.pdf`;
}

export async function getActiveResumeBlob(): Promise<Blob> {
  const custom = await getResumePdf();
  if (custom) return custom;

  const response = await fetch(FALLBACK_RESUME_PATH);
  if (!response.ok) {
    throw new Error('Resume not found. Upload a PDF in admin mode or add public/resume.pdf');
  }
  return response.blob();
}

export async function viewResumePdf() {
  const blob = await getActiveResumeBlob();
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener,noreferrer');
  setTimeout(() => URL.revokeObjectURL(url), 120000);
}

export async function downloadResumePdf(name: string) {
  const blob = await getActiveResumeBlob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = getResumeFileName(name);
  anchor.click();
  URL.revokeObjectURL(url);
}
