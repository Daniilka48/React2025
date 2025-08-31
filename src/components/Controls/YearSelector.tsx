import { memo, useMemo } from 'react';
import type { Country } from '../../types';
import './Controls.css';

type Props = {
  year: number | 'latest';
  onChange: (year: number | 'latest') => void;
  countries: Country[];
};

function YearSelectorImpl({ year, onChange, countries }: Props) {
  const years = useMemo(() => {
    const set = new Set<number>();
    for (const c of countries) for (const y of c.years) set.add(y.year);
    return Array.from(set).sort((a, b) => a - b);
  }, [countries]);

  return (
    <div className="controls-row">
      <label className="controls-label">Year:</label>
      <select
        className="controls-select"
        value={year === 'latest' ? 'latest' : String(year)}
        onChange={(e) => {
          const v =
            e.target.value === 'latest' ? 'latest' : Number(e.target.value);
          onChange(v);
        }}
      >
        <option value="latest">Latest</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(YearSelectorImpl);
