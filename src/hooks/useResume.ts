import { useCallback, useEffect, useRef, useState } from 'react';
import { downloadResumePdf, viewResumePdf } from '../utils/resume';
import {
  getResumeInfo,
  removeResumePdf,
  saveResumePdf,
  type ResumeInfo,
} from '../utils/resumeStorage';

const UPLOAD_FLASH_MS = 3000;

export function useResume() {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [justUploaded, setJustUploaded] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFlashTimer = () => {
    if (flashTimerRef.current) {
      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
    }
  };

  const loadResumeInfo = useCallback(async () => {
    const info = await getResumeInfo();
    setResumeInfo(info);
    return info;
  }, []);

  useEffect(() => {
    void loadResumeInfo();
    return () => clearFlashTimer();
  }, [loadResumeInfo]);

  const uploadResume = useCallback(async (file: File) => {
    if (file.type !== 'application/pdf') {
      throw new Error('Please select a PDF file.');
    }
    const info = await saveResumePdf(file);
    setResumeInfo(info);
    setJustUploaded(true);
    clearFlashTimer();
    flashTimerRef.current = setTimeout(() => {
      setJustUploaded(false);
      flashTimerRef.current = null;
    }, UPLOAD_FLASH_MS);
    return info;
  }, []);

  const removeResume = useCallback(async () => {
    await removeResumePdf();
    setResumeInfo(null);
    setJustUploaded(false);
    clearFlashTimer();
  }, []);

  const viewResume = useCallback(async () => {
    await viewResumePdf();
  }, []);

  const downloadResume = useCallback(async (name: string) => {
    await downloadResumePdf(name);
  }, []);

  return {
    hasCustomResume: resumeInfo !== null,
    resumeInfo,
    justUploaded,
    uploadResume,
    removeResume,
    viewResume,
    downloadResume,
  };
}
