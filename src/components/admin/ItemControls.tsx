import { Plus, Trash2 } from 'lucide-react';

interface ItemControlsProps {
  onAdd?: () => void;
  onRemove?: () => void;
  addLabel?: string;
  removeLabel?: string;
  className?: string;
}

export function ItemControls({ onAdd, onRemove, addLabel = 'Add', removeLabel = 'Remove', className = '' }: ItemControlsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 rounded-lg border border-border-subtle px-2.5 py-1.5 text-xs font-medium text-accent hover:bg-accent/10"
        >
          <Plus className="h-3.5 w-3.5" /> {addLabel}
        </button>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/10"
        >
          <Trash2 className="h-3.5 w-3.5" /> {removeLabel}
        </button>
      )}
    </div>
  );
}
