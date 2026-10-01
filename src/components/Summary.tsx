import { BookOpen, BookmarkCheck, CheckCircle2 } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export function Summary({ total, reading, finished }: SummaryProps) {
  const stats = [
    {
      label: 'Total Books',
      value: total,
      icon: BookOpen,
      accent: 'bg-stone-100 text-stone-700',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookmarkCheck,
      accent: 'bg-sky-100 text-sky-700',
    },
    {
      label: 'Finished',
      value: finished,
      icon: CheckCircle2,
      accent: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-stone-200 bg-white p-3.5 text-center shadow-sm sm:flex-row sm:gap-3 sm:text-left"
          >
            <div
              className={'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ' + stat.accent}
            >
              <Icon className="h-4.5 w-4.5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold leading-none text-stone-900 sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-medium leading-tight text-stone-500 sm:text-xs">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
