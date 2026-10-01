import { useState } from 'react';
import { BookPlus } from 'lucide-react';
import type { ReadingStatus } from '../types';
import { STATUS_META, STATUS_ORDER } from '../types';

const MAX_TITLE_LENGTH = 60;

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => void;
  existingTitles: string[];
}

export function AddBookForm({ onAdd, existingTitles }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim().replace(/\s+/g, ' ');
    if (!trimmed) {
      setError('Please enter a book title.');
      return;
    }
    if (trimmed.length > MAX_TITLE_LENGTH) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }
    const normalized = trimmed.toLowerCase();
    if (existingTitles.some((t) => t.toLowerCase().replace(/\s+/g, ' ').trim() === normalized)) {
      setError('This book is already in your reading list.');
      return;
    }
    onAdd(trimmed, status);
    setTitle('');
    setStatus('want-to-read');
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center gap-2 text-stone-800">
        <BookPlus className="h-5 w-5 text-amber-600" aria-hidden />
        <h2 className="text-sm font-semibold tracking-tight">Add a book</h2>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Book title…"
            aria-label="Book title"
            maxLength={MAX_TITLE_LENGTH}
            className="min-w-0 flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ReadingStatus)}
            aria-label="Reading status"
            className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-xs font-medium text-red-600">{error}</p>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-stone-800 active:bg-stone-950"
        >
          <BookPlus className="h-4 w-4" aria-hidden />
          Add to list
        </button>
      </div>
    </form>
  );
}
