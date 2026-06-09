import { useRef, type ChangeEvent } from 'react';
import { Download, Lock, RotateCcw, Save, SquarePen, Upload, X } from 'lucide-react';
import { parsePortfolioImport, PortfolioData } from '../../utils/portfolioStorage';

interface AdminBarProps {
  isEditing: boolean;
  onStartEditing: () => void;
  onSave: () => void;
  onCancel: () => void;
  onExit: () => void;
  onExport: () => void;
  onImport: (data: PortfolioData) => void;
  onReset: () => void;
  onNotify: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function AdminBar({
  isEditing,
  onStartEditing,
  onSave,
  onCancel,
  onExit,
  onExport,
  onImport,
  onReset,
  onNotify,
}: AdminBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const data = parsePortfolioImport(text);
      if (!data) {
        onNotify('Invalid portfolio JSON file', 'error');
        return;
      }
      onImport(data);
      onNotify('Portfolio imported successfully', 'success');
    } catch {
      onNotify('Failed to read import file', 'error');
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Reset all portfolio content to defaults? This clears your local edits and cannot be undone.',
    );
    if (confirmed) onReset();
  };

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-glass-bg p-3">
      <p className="text-sm text-secondary">
        Admin mode enabled. Edit content, export/import JSON, or reset to defaults.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {!isEditing ? (
          <button onClick={onStartEditing} className="btn-primary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
            <SquarePen className="h-4 w-4" /> Edit
          </button>
        ) : (
          <>
            <button onClick={onSave} className="btn-primary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
              <Save className="h-4 w-4" /> Save
            </button>
            <button onClick={onCancel} className="btn-secondary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
              <X className="h-4 w-4" /> Cancel
            </button>
          </>
        )}
        <button onClick={onExport} className="btn-secondary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
          <Download className="h-4 w-4" /> Export
        </button>
        <button onClick={handleImportClick} className="btn-secondary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
          <Upload className="h-4 w-4" /> Import
        </button>
        <button onClick={handleReset} className="btn-secondary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button onClick={onExit} className="btn-secondary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
          <Lock className="h-4 w-4" /> Exit Admin
        </button>
        <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  );
}
