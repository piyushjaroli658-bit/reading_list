import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
        <BookOpen className="h-7 w-7" aria-hidden />
      </div>
      <p className="mt-4 text-base font-semibold text-stone-800">
        Your reading list is empty. Add your first book.
      </p>
      <p className="mt-1 text-sm text-stone-500">
        Use the form above to start building your list.
      </p>
    </div>
  );
}
