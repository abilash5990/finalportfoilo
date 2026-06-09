const DB_NAME = 'portfolio-resume-db';
const STORE_NAME = 'resume';
const RESUME_KEY = 'pdf';
const DB_VERSION = 2;

export type ResumeRecord = {
  blob: Blob;
  fileName: string;
  fileSize: number;
  uploadedAt: number;
};

export type ResumeInfo = {
  fileName: string;
  fileSize: number;
  uploadedAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error ?? new Error('Failed to open resume database'));
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

function normalizeRecord(result: unknown): ResumeRecord | null {
  if (!result) return null;
  if (typeof result === 'object' && result !== null && 'blob' in result) {
    const record = result as ResumeRecord;
    if (record.blob instanceof Blob) return record;
  }
  if (result instanceof Blob) {
    const name = result instanceof File ? result.name : 'resume.pdf';
    return {
      blob: result,
      fileName: name,
      fileSize: result.size,
      uploadedAt: Date.now(),
    };
  }
  return null;
}

export async function saveResumePdf(file: File): Promise<ResumeInfo> {
  const record: ResumeRecord = {
    blob: file,
    fileName: file.name,
    fileSize: file.size,
    uploadedAt: Date.now(),
  };
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(record, RESUME_KEY);
    tx.oncomplete = () => {
      db.close();
      resolve({
        fileName: record.fileName,
        fileSize: record.fileSize,
        uploadedAt: record.uploadedAt,
      });
    };
    tx.onerror = () => reject(tx.error ?? new Error('Failed to save resume'));
  });
}

export async function getResumeRecord(): Promise<ResumeRecord | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).get(RESUME_KEY);
    request.onsuccess = () => {
      db.close();
      resolve(normalizeRecord(request.result));
    };
    request.onerror = () => reject(request.error ?? new Error('Failed to read resume'));
  });
}

export async function getResumePdf(): Promise<Blob | null> {
  const record = await getResumeRecord();
  return record?.blob ?? null;
}

export async function getResumeInfo(): Promise<ResumeInfo | null> {
  const record = await getResumeRecord();
  if (!record) return null;
  return {
    fileName: record.fileName,
    fileSize: record.fileSize,
    uploadedAt: record.uploadedAt,
  };
}

export async function removeResumePdf(): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(RESUME_KEY);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => reject(tx.error ?? new Error('Failed to remove resume'));
  });
}

export async function hasResumePdf(): Promise<boolean> {
  const record = await getResumeRecord();
  return record !== null;
}
