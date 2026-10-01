import { Check, ChevronDown, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Book, ReadingStatus } from '../types';
import { STATUS_META, STATUS_ORDER } from '../types';

interface BookCardProps {
  book: Book;
  onSetStatus: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onSetStatus, onRemove }: BookCardProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const meta = STATUS_META[book.status];

  return (
    <div className="card-in group relative flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:border-stone-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span
            className={'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ' + meta.badge}
          >
            <span className={'h-1.5 w-1.5 rounded-full ' + meta.dot} aria-hidden />
            {meta.label}
          </span>
          <h3 className="mt-2 break-words text-base font-semibold leading-snug text-stone-900">
            {book.title}
          </h3>
        </div>

        <button
          onClick={() => onRemove(book.id)}
          aria-label={`Remove ${book.title}`}
          className="shrink-0 rounded-lg p-1.5 text-stone-300 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900"
        >
          Change status
          <ChevronDown
            className={'h-3.5 w-3.5 transition-transform ' + (open ? 'rotate-180' : '')}
            aria-hidden
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute bottom-full left-0 z-10 mb-1.5 w-full overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg"
          >
            {STATUS_ORDER.map((s) => {
              const selected = s === book.status;
              return (
                <li key={s}>
                  <button
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onSetStatus(book.id, s);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-medium text-stone-700 hover:bg-stone-50"
                  >
                    <span className="flex items-center gap-2">
                      <span className={'h-1.5 w-1.5 rounded-full ' + STATUS_META[s].dot} aria-hidden />
                      {STATUS_META[s].label}
                    </span>
                    {selected && <Check className="h-3.5 w-3.5 text-stone-900" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
