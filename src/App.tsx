import { useMemo, useState } from 'react';
import { Library } from 'lucide-react';
import { useReadingList } from './useReadingList';
import { AddBookForm } from './components/AddBookForm';
import { FilterTabs } from './components/FilterTabs';
import type { FilterValue } from './components/FilterTabs';
import { BookCard } from './components/BookCard';
import { EmptyState } from './components/EmptyState';
import { Summary } from './components/Summary';
import { STATUS_ORDER } from './types';

function App() {
  const { books, addBook, setStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<FilterValue>('all');

  const counts = useMemo(() => {
    const c: Record<FilterValue, number> = {
      all: books.length,
      'want-to-read': 0,
      reading: 0,
      finished: 0,
    };
    for (const b of books) c[b.status]++;
    return c;
  }, [books]);

  const visibleBooks = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  const hasBooks = books.length > 0;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white">
            <Library className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Reading List</h1>
            <p className="text-xs text-stone-500">
              {hasBooks
                ? `${books.length} book${books.length === 1 ? '' : 's'} on your shelf`
                : 'Keep track of what you read'}
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <AddBookForm
          onAdd={addBook}
          existingTitles={books.map((b) => b.title)}
        />

        {hasBooks && (
          <div className="mt-6 space-y-6">
            <Summary
              total={counts.all}
              reading={counts.reading}
              finished={counts.finished}
            />
            <FilterTabs value={filter} counts={counts} onChange={setFilter} />
          </div>
        )}

        <div className="mt-5">
          {!hasBooks ? (
            <EmptyState />
          ) : visibleBooks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 px-6 py-12 text-center">
              <p className="text-sm font-medium text-stone-600">
                No books in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onSetStatus={setStatus}
                  onRemove={removeBook}
                />
              ))}
            </div>
          )}
        </div>

        {hasBooks && (
          <p className="mt-8 text-center text-xs text-stone-400">
            Saved on this device — no account needed.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
