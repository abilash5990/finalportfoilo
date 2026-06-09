import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, FileText } from 'lucide-react';
import type { ResumeInfo } from '../../utils/resumeStorage';
import { formatFileSize } from '../../utils/formatFileSize';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ResumeStatusProps {
  hasCustomResume: boolean;
  resumeInfo: ResumeInfo | null;
  justUploaded: boolean;
}

export default function ResumeStatus({ hasCustomResume, resumeInfo, justUploaded }: ResumeStatusProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {hasCustomResume && resumeInfo ? (
        <motion.div
          key={`uploaded-${resumeInfo.fileName}-${resumeInfo.uploadedAt}`}
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className={`mt-2 flex items-start gap-2 rounded-lg border px-3 py-2 text-xs ${
            justUploaded
              ? 'border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400'
              : 'border-accent/30 bg-accent/5 text-accent'
          }`}
        >
          <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${justUploaded ? 'animate-pulse' : ''}`} />
          <div>
            <p className="font-medium">
              {justUploaded ? 'Uploaded successfully' : 'Custom resume active'}
            </p>
            <p className="mt-0.5 text-secondary">
              {resumeInfo.fileName} · {formatFileSize(resumeInfo.fileSize)}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="fallback"
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mt-2 flex items-start gap-2 rounded-lg border border-border-subtle bg-glass-bg px-3 py-2 text-xs text-muted"
        >
          <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <p>Using <span className="font-medium text-secondary">public/resume.pdf</span> — upload a PDF to override on this device.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
