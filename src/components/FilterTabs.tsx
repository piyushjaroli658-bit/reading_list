import type { ReadingStatus } from '../types';
import { STATUS_META, STATUS_ORDER } from '../types';

export type FilterValue = 'all' | ReadingStatus;

interface FilterTabsProps {
  value: FilterValue;
  counts: Record<FilterValue, number>;
  onChange: (value: FilterValue) => void;
}

const TABS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  ...STATUS_ORDER.map((s) => ({ value: s as FilterValue, label: STATUS_META[s].label })),
];

export function FilterTabs({ value, counts, onChange }: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter books by status"
      className="flex flex-wrap gap-1.5"
    >
      {TABS.map((tab) => {
        const active = tab.value === value;
        const count = counts[tab.value] ?? 0;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={
              'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ' +
              (active
                ? 'border-stone-900 bg-stone-900 text-white'
                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900')
            }
          >
            {tab.label}
            <span
              className={
                'rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ' +
                (active
                  ? 'bg-white/20 text-white'
                  : 'bg-stone-100 text-stone-500')
              }
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
